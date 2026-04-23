import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Check, Loader2, AlertCircle, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { IMG, WHATSAPP_URL } from "../../lib/data";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const EMPTY = { name: "", email: "", car: "", instagram: "", message: "" };

export default function Join() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [err, setErr] = useState("");

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!form.name || !form.email || !form.car) {
      setErr("Rellena nombre, email y coche, mínimo.");
      return;
    }
    setStatus("loading");
    try {
      await axios.post(`${API}/join`, {
        name: form.name.trim(),
        email: form.email.trim(),
        car: form.car.trim(),
        instagram: form.instagram.trim() || null,
        message: form.message.trim() || null,
      });
      setStatus("success");
      toast.success("¡Bienvenido a la crew! Te contactamos pronto.");
      setForm(EMPTY);
      setTimeout(() => setStatus("idle"), 4500);
    } catch (e2) {
      setStatus("error");
      const detail = e2?.response?.data?.detail;
      const msg = typeof detail === "string" ? detail : "No se pudo enviar. Revisa los datos.";
      setErr(msg);
      toast.error(msg);
      setTimeout(() => setStatus("idle"), 3500);
    }
  };

  return (
    <section
      id="unete"
      data-testid="join-form-section"
      className="relative bg-ink-950 py-24 md:py-40 border-t border-ink-700 overflow-hidden"
    >
      {/* Side image strip */}
      <div className="absolute inset-y-0 right-0 w-1/3 hidden lg:block opacity-30">
        <img src={IMG.meet} alt="" className="w-full h-full object-cover mono-img" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-ink-950/70 to-ink-950" />
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between mb-10 md:mb-16">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-300">
            § 06 / Onboarding
          </span>
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-ink-500">
            Apply → Crew
          </span>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-12">
          <div className="col-span-12 lg:col-span-5">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-display uppercase leading-[0.82] tracking-tighter text-6xl sm:text-7xl md:text-[8rem]"
            >
              ÚNETE
              <br />
              <span className="text-ink-500">A LA</span>
              <br />
              CREW
            </motion.h2>
            <p className="mt-6 text-ink-300 max-w-md text-sm md:text-base leading-relaxed">
              Cuéntanos quién eres y qué conduces. Si encajas con el rollo,
              te metemos en el grupo y te pasamos las próximas quedadas.
            </p>

            <ul className="mt-10 space-y-3 font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-ink-200">
              <li className="flex items-center gap-3">
                <span className="w-6 h-px bg-white" /> No cuota · solo buen rollo
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-px bg-white" /> Respeto en la carretera
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-px bg-white" /> Cualquier coche vale
              </li>
            </ul>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer noopener"
              data-testid="join-wa-shortcut"
              data-cursor="hover"
              className="group mt-10 inline-flex items-center gap-3 border border-white px-5 py-4 font-mono text-[11px] tracking-[0.25em] uppercase hover:bg-white hover:text-black transition-colors"
            >
              <MessageCircle size={16} />
              Atajo · Grupo de WhatsApp
              <span className="w-2 h-2 bg-white group-hover:bg-black transition-colors" />
            </a>
          </div>

          <form
            onSubmit={submit}
            data-testid="join-form"
            className="col-span-12 lg:col-span-7 flex flex-col gap-8"
          >
            <Field
              label="Nombre"
              id="name"
              value={form.name}
              onChange={update("name")}
              placeholder="Tu nombre"
              required
              testid="join-input-name"
            />
            <Field
              label="Email"
              id="email"
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="tucorreo@algo.com"
              required
              testid="join-input-email"
            />
            <Field
              label="Coche"
              id="car"
              value={form.car}
              onChange={update("car")}
              placeholder="VW Golf GTI MK6, Honda Civic EP3..."
              required
              testid="join-input-car"
            />
            <Field
              label="Instagram (opcional)"
              id="instagram"
              value={form.instagram}
              onChange={update("instagram")}
              placeholder="@tuhandle"
              testid="join-input-instagram"
            />

            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-300"
              >
                Mensaje (opcional)
              </label>
              <textarea
                id="message"
                rows={4}
                data-testid="join-input-message"
                value={form.message}
                onChange={update("message")}
                placeholder="Cuéntanos algo — de dónde eres, qué rutas has hecho..."
                className="w-full bg-transparent border-0 border-b-2 border-ink-700 focus:border-white outline-none py-3 resize-none text-ink-50 placeholder:text-ink-500 text-base md:text-lg font-body transition-colors"
              />
            </div>

            {err && (
              <div
                data-testid="join-error"
                className="flex items-center gap-2 text-sm font-mono tracking-wider uppercase text-ink-100"
              >
                <AlertCircle size={14} />
                {err}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              data-testid="join-submit-button"
              data-cursor="hover"
              className="group w-full flex items-center justify-center gap-3 border border-white py-6 md:py-8 font-display uppercase text-2xl md:text-4xl tracking-tight hover:bg-white hover:text-black transition-colors disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  ENVIANDO...
                </>
              ) : status === "success" ? (
                <>
                  <Check size={22} />
                  BIENVENIDO A LA CREW
                </>
              ) : (
                <>
                  ENVIAR SOLICITUD
                  <span className="w-3 h-3 bg-white group-hover:bg-black transition-colors" />
                </>
              )}
            </button>

            <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-500">
              Al enviar aceptas que un admin te escriba por email o IG.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, type = "text", value, onChange, placeholder, required, testid }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-300"
      >
        {label} {required && <span className="text-white">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        data-testid={testid}
        className="w-full bg-transparent border-0 border-b-2 border-ink-700 focus:border-white outline-none py-3 text-ink-50 placeholder:text-ink-500 text-lg md:text-xl font-body transition-colors"
      />
    </div>
  );
}
