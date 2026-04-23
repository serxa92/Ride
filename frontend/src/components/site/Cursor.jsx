import { useEffect, useState } from "react";

// Minimalist custom cursor (dot + trailing ring). Desktop only.
export default function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    if (!mq.matches) return;

    let rafId;
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    const tick = () => {
      setRing((r) => ({
        x: r.x + (pos.x - r.x) * 0.18,
        y: r.y + (pos.y - r.y) * 0.18,
      }));
      rafId = requestAnimationFrame(tick);
    };
    const over = (e) => {
      const t = e.target;
      if (t.closest && t.closest("[data-cursor='hover']")) setHovering(true);
    };
    const out = (e) => {
      const t = e.target;
      if (t.closest && t.closest("[data-cursor='hover']")) setHovering(false);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseout", out);
    rafId = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
      cancelAnimationFrame(rafId);
    };
  }, [pos.x, pos.y]);

  if (!enabled) return null;

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          transform: `translate(${pos.x - 4}px, ${pos.y - 4}px) scale(${hovering ? 0 : 1})`,
        }}
      />
      <div
        className="cursor-ring"
        style={{
          transform: `translate(${ring.x - 20}px, ${ring.y - 20}px) scale(${hovering ? 1.8 : 1})`,
        }}
      />
    </>
  );
}
