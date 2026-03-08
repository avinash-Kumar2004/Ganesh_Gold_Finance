import { useEffect, useRef, useState } from "react";

// ══════════════════════════════════════════════════════════════════
// SERVICES DATA
// ══════════════════════════════════════════════════════════════════
const SERVICES = [
  {
    id: "gold-loan", label: "Gold Loan", accent: "#D4A017",
    icon: (c) => (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <ellipse cx="20" cy="28" rx="11" ry="3.5" stroke={c} strokeWidth="1.5" fill="none"/>
        <path d="M9 28C9 28 9 17 20 13C31 17 31 28 31 28" stroke={c} strokeWidth="1.5" fill="none"/>
        <circle cx="20" cy="12" r="4" stroke={c} strokeWidth="1.5" fill="none"/>
        <path d="M18 12h4M20 10v4" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "gold-flexi", label: "Gold Flexi Credit", accent: "#D4A017",
    icon: (c) => (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <rect x="4" y="11" width="32" height="20" rx="4" stroke={c} strokeWidth="1.5" fill="none"/>
        <rect x="4" y="17" width="32" height="4" fill={c} opacity="0.2"/>
        <circle cx="28" cy="26" r="3.5" stroke={c} strokeWidth="1.3" fill="none"/>
        <circle cx="32" cy="26" r="3.5" stroke={c} strokeWidth="1.3" fill="none" opacity="0.5"/>
        <path d="M8 26h8" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "personal-loan", label: "Personal Loan", accent: "#e87070",
    icon: (c) => (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <circle cx="20" cy="13" r="6" stroke={c} strokeWidth="1.5" fill="none"/>
        <path d="M7 34C7 26 12 22 20 22C28 22 33 26 33 34" stroke={c} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M26 16l5-5M31 11h-3M31 11v3" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "housing", label: "Housing Finance", accent: "#e87070",
    icon: (c) => (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <path d="M4 18L20 5l16 13V36H27V26H13v10H4Z" stroke={c} strokeWidth="1.5" fill="none"/>
        <rect x="16" y="26" width="8" height="10" stroke={c} strokeWidth="1.2" fill="none" opacity="0.6"/>
        <rect x="8" y="22" width="5" height="5" stroke={c} strokeWidth="1" fill="none" opacity="0.45"/>
        <rect x="27" y="22" width="5" height="5" stroke={c} strokeWidth="1" fill="none" opacity="0.45"/>
      </svg>
    ),
  },
  {
    id: "insurance", label: "Insurance", accent: "#D4A017",
    icon: (c) => (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <path d="M20 4L34 10V22C34 31 27 36 20 39C13 36 6 31 6 22V10Z" stroke={c} strokeWidth="1.5" fill="none"/>
        <path d="M13 21l5 5 9-10" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "vehicle", label: "Vehicle Loan", accent: "#e87070",
    icon: (c) => (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <rect x="3" y="17" width="34" height="11" rx="3" stroke={c} strokeWidth="1.5" fill="none"/>
        <path d="M7 17l4-7H29l4 7" stroke={c} strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
        <circle cx="11" cy="28" r="4" stroke={c} strokeWidth="1.5" fill="none"/>
        <circle cx="29" cy="28" r="4" stroke={c} strokeWidth="1.5" fill="none"/>
        <rect x="16" y="11" width="8" height="6" rx="1" stroke={c} strokeWidth="1.1" fill="none" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: "mutual-funds", label: "Mutual Funds", accent: "#D4A017",
    icon: (c) => (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <path d="M5 33L13 20l8 5 8-13 6-6" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <circle cx="13" cy="20" r="2.2" fill={c}/>
        <circle cx="21" cy="25" r="2.2" fill={c}/>
        <circle cx="29" cy="12" r="2.2" fill={c}/>
        <path d="M5 33h30M5 6v27" stroke={c} strokeWidth="0.8" opacity="0.2"/>
      </svg>
    ),
  },
  {
    id: "digital", label: "Digital & Cashless", accent: "#D4A017",
    icon: (c) => (
      <svg viewBox="0 0 40 40" fill="none" width="26" height="26">
        <rect x="6" y="8" width="28" height="24" rx="4" stroke={c} strokeWidth="1.5" fill="none"/>
        <circle cx="20" cy="20" r="6" stroke={c} strokeWidth="1.3" fill="none"/>
        <path d="M20 16v8M16 20h8" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M20 14V8M26 20h8M20 26v6M14 20H6" stroke={c} strokeWidth="0.9" strokeLinecap="round" opacity="0.35"/>
      </svg>
    ),
  },
];

// ══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════
export default function ServicesHeroSlide() {
  const ref                   = useRef(null);
  const cycleRef              = useRef(null);
  const [inView, setInView]   = useState(false);
  const [cycle, setCycle]     = useState(0);
  const [phase, setPhase]     = useState(0); // 0=hidden 1=header 2=cards 3=footer

  const runCycle = () => {
    setPhase(0);
    setCycle(c => c + 1);
    setTimeout(() => setPhase(1), 60);
    setTimeout(() => setPhase(2), 280);
    setTimeout(() => setPhase(3), 900);
  };

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); runCycle(); }
      else {
        setInView(false); setPhase(0);
        clearInterval(cycleRef.current);
      }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    cycleRef.current = setInterval(runCycle, 3800);
    return () => clearInterval(cycleRef.current);
  }, [inView]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        /* ── header reveal ── */
        @keyframes sh-curtain {
          from { clip-path: inset(0 100% 0 0); opacity:0; }
          to   { clip-path: inset(0 0% 0 0);   opacity:1; }
        }
        /* ── word by word ── */
        @keyframes sh-word {
          from { opacity:0; transform: translateY(18px) skewY(3deg); }
          to   { opacity:1; transform: translateY(0)    skewY(0deg); }
        }
        /* ── card reveal ── */
        @keyframes sh-card-rise {
          from { opacity:0; transform: translateY(36px) scale(0.92); filter: blur(4px); }
          to   { opacity:1; transform: translateY(0)    scale(1);    filter: blur(0px); }
        }
        /* ── icon spin-in ── */
        @keyframes sh-icon-spin {
          from { opacity:0; transform: scale(0.4) rotate(-20deg); }
          to   { opacity:1; transform: scale(1)   rotate(0deg); }
        }
        /* ── underline draw ── */
        @keyframes sh-line-draw {
          from { transform: scaleX(0); transform-origin: left; }
          to   { transform: scaleX(1); transform-origin: left; }
        }
        /* ── footer slide ── */
        @keyframes sh-footer {
          from { opacity:0; transform: translateY(10px); }
          to   { opacity:1; transform: translateY(0); }
        }
        /* ── ticker scroll ── */
        @keyframes sh-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        /* ── card hover ── */
        .sh-card-btn {
          transition:
            transform 0.28s cubic-bezier(.34,1.5,.64,1),
            box-shadow 0.28s ease,
            border-color 0.2s ease,
            background 0.2s ease;
        }
        .sh-card-btn:hover {
          transform: translateY(-8px) scale(1.06) !important;
          box-shadow: 0 20px 44px rgba(0,0,0,0.38), 0 0 0 1px rgba(212,160,23,0.25) !important;
          border-color: rgba(212,160,23,0.35) !important;
          background: rgba(255,255,255,0.07) !important;
        }
        .sh-card-btn:hover .sh-icon-wrap {
          background: rgba(212,160,23,0.15) !important;
          border-color: rgba(212,160,23,0.4) !important;
        }
      `}</style>

      {/* ── OUTER WRAPPER ── */}
      <div
        ref={ref}
        style={{
          width: "100%",
          background: "linear-gradient(160deg, #0e1118 0%, #161c24 55%, #0e1118 100%)",
          padding: "36px 5vw 28px",
          boxSizing: "border-box",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
          minHeight: 260,
        }}
      >

        {/* ── Background texture: subtle grid ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}/>

        {/* ── Gold accent glow — top left ── */}
        <div style={{
          position: "absolute", top: -80, left: -60, zIndex: 0, pointerEvents: "none",
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,160,23,0.1) 0%, transparent 65%)",
        }}/>
        {/* ── Red glow — bottom right ── */}
        <div style={{
          position: "absolute", bottom: -60, right: -40, zIndex: 0, pointerEvents: "none",
          width: 260, height: 260, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(185,28,28,0.1) 0%, transparent 65%)",
        }}/>

        {/* ══ HEADER ════════════════════════════════════════════ */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 14,
          marginBottom: 24,
          position: "relative", zIndex: 1,
        }}>
          {/* Left — brand + title */}
          <div>
            {/* Brand label */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              marginBottom: 10,
              opacity: phase >= 1 ? 1 : 0,
              animation: phase >= 1 ? "sh-footer 0.4s ease both" : "none",
            }}>
              <div style={{ width: 20, height: 1.5, background: "#D4A017", borderRadius: 99 }}/>
              <span style={{
                fontSize: "0.6rem", fontWeight: 600,
                letterSpacing: "0.18em", textTransform: "uppercase",
                color: "#D4A017",
              }}>
                Ganesh Finance · Est. 2019
              </span>
              <div style={{ width: 20, height: 1.5, background: "#D4A017", borderRadius: 99 }}/>
            </div>

            {/* Main heading — Playfair Display */}
            <div style={{ overflow: "hidden" }}>
              <h2
                key={`h-${cycle}`}
                style={{
                  margin: 0, lineHeight: 1.15,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(1.2rem,2.6vw,1.75rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.01em",
                  color: "#f5f0e8",
                  opacity: phase >= 1 ? 1 : 0,
                  animation: phase >= 1 ? "sh-word 0.5s cubic-bezier(.34,1.1,.64,1) both" : "none",
                }}
              >
                Services{" "}
                <em style={{
                  color: "#D4A017",
                  fontStyle: "italic",
                  fontWeight: 700,
                }}>
                  We Provide
                </em>
              </h2>
            </div>

            {/* Animated underline */}
            <div style={{
              height: 2, width: 56, marginTop: 9, borderRadius: 99,
              background: "linear-gradient(90deg,#D4A017,#B91C1C)",
              transformOrigin: "left",
              transform: phase >= 1 ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 0.55s cubic-bezier(.34,1.1,.64,1) 0.25s",
            }}/>

            {/* Sub */}
            <p style={{
              margin: "8px 0 0",
              fontSize: "clamp(0.62rem,0.88vw,0.74rem)",
              color: "rgba(255,255,255,0.4)",
              fontWeight: 300,
              letterSpacing: "0.02em",
              opacity: phase >= 1 ? 1 : 0,
              animation: phase >= 1 ? "sh-footer 0.45s ease 0.3s both" : "none",
            }}>
              Comprehensive financial solutions — crafted for every need.
            </p>
          </div>

          {/* Right — stat pills */}
          <div style={{
            display: "flex", gap: 10, flexWrap: "wrap",
            alignItems: "flex-start",
            opacity: phase >= 1 ? 1 : 0,
            animation: phase >= 1 ? "sh-footer 0.45s ease 0.35s both" : "none",
          }}>
            {[
              { n: "21+",  l: "Services"  },
              { n: "2019", l: "Est."      },
              { n: "2+",   l: "Branches"  },
            ].map(s => (
              <div key={s.l} style={{
                padding: "7px 14px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 10,
                textAlign: "center",
                backdropFilter: "blur(6px)",
              }}>
                <div style={{
                  fontSize: "clamp(0.9rem,1.4vw,1.05rem)",
                  fontWeight: 800,
                  color: "#D4A017",
                  letterSpacing: "-0.01em",
                  fontFamily: "'Playfair Display', serif",
                }}>
                  {s.n}
                </div>
                <div style={{
                  fontSize: "0.56rem", fontWeight: 500,
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  marginTop: 2,
                }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ CARDS GRID ════════════════════════════════════════ */}
        <div
          key={`grid-${cycle}`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gap: "clamp(6px,1vw,12px)",
            position: "relative", zIndex: 1,
          }}
        >
          {SERVICES.map((svc, i) => (
            <div
              key={svc.id}
              className="sh-card-btn"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 9,
                padding: "15px 7px 13px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 14,
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                backdropFilter: "blur(8px)",
                cursor: "default",
                // staggered fly-in when phase >= 2
                opacity: phase >= 2 ? 1 : 0,
                animation: phase >= 2
                  ? `sh-card-rise 0.5s cubic-bezier(.34,1.1,.64,1) ${i * 48}ms both`
                  : "none",
              }}
            >
              {/* Icon */}
              <div
                className="sh-icon-wrap"
                style={{
                  width: 52, height: 52,
                  borderRadius: 12,
                  background: `rgba(${svc.accent === "#D4A017" ? "212,160,23" : "232,112,112"},0.08)`,
                  border: `1px solid ${svc.accent}28`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  transition: "background 0.2s, border-color 0.2s",
                  // icon itself spins in
                  animation: phase >= 2
                    ? `sh-icon-spin 0.4s cubic-bezier(.34,1.3,.64,1) ${i * 48 + 80}ms both`
                    : "none",
                }}
              >
                {svc.icon(svc.accent)}
              </div>

              {/* Label */}
              <span style={{
                fontSize: "clamp(0.52rem,0.68vw,0.61rem)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.055em",
                color: "rgba(255,255,255,0.7)",
                textAlign: "center",
                lineHeight: 1.35,
              }}>
                {svc.label}
              </span>

              {/* Bottom accent dot */}
              <div style={{
                width: 18, height: 2, borderRadius: 99,
                background: svc.accent,
                opacity: 0.5,
              }}/>
            </div>
          ))}
        </div>

        {/* ══ SCROLLING TICKER ══════════════════════════════════ */}
        <div style={{
          marginTop: 20,
          overflow: "hidden",
          position: "relative", zIndex: 1,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 14,
          opacity: phase >= 3 ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}>
          <div style={{
            display: "flex",
            gap: 32,
            animation: "sh-ticker 18s linear infinite",
            width: "max-content",
            userSelect: "none",
          }}>
            {/* Duplicate for seamless loop */}
            {[...Array(2)].map((_, rep) => (
              <div key={rep} style={{ display: "flex", gap: 32, alignItems: "center" }}>
                {SERVICES.concat(SERVICES).map((s, i) => (
                  <span key={`${rep}-${i}`} style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    fontSize: "0.6rem", fontWeight: 600,
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}>
                    <span style={{ color: "#D4A017", fontSize: "0.5rem" }}>◆</span>
                    {s.label}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ══ BOTTOM ROW ════════════════════════════════════════ */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 14,
          flexWrap: "wrap",
          gap: 8,
          position: "relative", zIndex: 1,
          opacity: phase >= 3 ? 1 : 0,
          transition: "opacity 0.4s ease 0.1s",
        }}>
          <span style={{
            fontSize: "0.57rem",
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.04em",
          }}>
            *All services subject to eligibility. Ganesh Finance, Est. 2019.
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{
              fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#D4A017",
            }}>
              Explore All
            </span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
              stroke="#D4A017" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        </div>

      </div>
    </>
  );
}