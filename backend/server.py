from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Ride N' Nice API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class JoinRequestCreate(BaseModel):
    name: str = Field(min_length=1, max_length=80)
    email: EmailStr
    car: str = Field(min_length=1, max_length=120)
    instagram: Optional[str] = Field(default=None, max_length=60)
    message: Optional[str] = Field(default=None, max_length=600)


class JoinRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    car: str
    instagram: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "Ride N' Nice API — ride together, stay family."}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(payload: StatusCheckCreate):
    status_obj = StatusCheck(**payload.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r.get('timestamp'), str):
            r['timestamp'] = datetime.fromisoformat(r['timestamp'])
    return rows


@api_router.post("/join", response_model=JoinRequest, status_code=201)
async def create_join_request(payload: JoinRequestCreate):
    obj = JoinRequest(**payload.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    try:
        await db.join_requests.insert_one(doc)
    except Exception as e:
        logger.exception("join insert failed")
        raise HTTPException(status_code=500, detail="No se pudo guardar tu solicitud. Inténtalo de nuevo.") from e
    return obj


@api_router.get("/join", response_model=List[JoinRequest])
async def list_join_requests():
    rows = await db.join_requests.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    for r in rows:
        if isinstance(r.get('created_at'), str):
            r['created_at'] = datetime.fromisoformat(r['created_at'])
    return rows


@api_router.get("/events")
async def list_events():
    # Static curated upcoming events for the crew
    return {
        "events": [
            {
                "id": "evt-001",
                "date": "2026-01-17",
                "day": "17",
                "month": "ENE",
                "title": "Quedada Nocturna — Puerto",
                "location": "Paseo Marítimo, Vigo",
                "time": "22:00",
                "type": "Meet",
            },
            {
                "id": "evt-002",
                "date": "2026-02-08",
                "day": "08",
                "month": "FEB",
                "title": "Ruta Invernal — Sierra",
                "location": "Ancares · Galicia",
                "time": "09:30",
                "type": "Route",
            },
            {
                "id": "evt-003",
                "date": "2026-03-15",
                "day": "15",
                "month": "MAR",
                "title": "Track Day · Cabañeros",
                "location": "Circuito de Cabañeros",
                "time": "08:00",
                "type": "Track",
            },
            {
                "id": "evt-004",
                "date": "2026-04-26",
                "day": "26",
                "month": "ABR",
                "title": "Spring Meet — Rías Baixas",
                "location": "Playa de Samil, Vigo",
                "time": "17:00",
                "type": "Meet",
            },
        ]
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
