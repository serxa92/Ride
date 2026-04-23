"""Backend API tests for Ride N' Nice landing page."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://racing-routes.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Root ----------
class TestRoot:
    def test_root_welcome(self, client):
        r = client.get(f"{API}/", timeout=20)
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert isinstance(data["message"], str)
        assert len(data["message"]) > 0


# ---------- Events ----------
class TestEvents:
    def test_events_shape(self, client):
        r = client.get(f"{API}/events", timeout=20)
        assert r.status_code == 200
        data = r.json()
        assert "events" in data
        events = data["events"]
        assert isinstance(events, list)
        assert len(events) >= 4
        required = {"day", "month", "title", "location", "time", "type"}
        for e in events:
            assert required.issubset(e.keys()), f"missing keys in event: {e}"


# ---------- Join ----------
class TestJoin:
    payload_valid = {
        "name": "TEST_Rider",
        "email": "TEST_rider@example.com",
        "car": "TEST Golf GTI Mk7",
        "instagram": "@test_rider",
        "message": "TEST message - ride together",
    }

    def test_join_create_valid(self, client):
        r = client.post(f"{API}/join", json=self.payload_valid, timeout=20)
        assert r.status_code == 201, r.text
        data = r.json()
        assert data["name"] == self.payload_valid["name"]
        assert data["email"] == self.payload_valid["email"]
        assert data["car"] == self.payload_valid["car"]
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        assert "created_at" in data

    def test_join_invalid_email(self, client):
        bad = {**self.payload_valid, "email": "not-an-email"}
        r = client.post(f"{API}/join", json=bad, timeout=20)
        assert r.status_code == 422

    def test_join_missing_required(self, client):
        # Missing name, email, car
        for missing in ["name", "email", "car"]:
            p = {**self.payload_valid}
            p.pop(missing)
            r = client.post(f"{API}/join", json=p, timeout=20)
            assert r.status_code == 422, f"expected 422 when missing {missing}, got {r.status_code}"

    def test_join_list_persistence_and_no_id_leak(self, client):
        # Create one to be sure list has something
        r_create = client.post(f"{API}/join", json={
            **self.payload_valid,
            "email": "TEST_rider2@example.com",
        }, timeout=20)
        assert r_create.status_code == 201

        r = client.get(f"{API}/join", timeout=20)
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        assert len(rows) >= 1
        # No Mongo _id leak
        for row in rows:
            assert "_id" not in row
            assert "id" in row
            assert "created_at" in row
        # Sorted desc by created_at
        created = [row["created_at"] for row in rows]
        assert created == sorted(created, reverse=True), "join list not sorted desc by created_at"
