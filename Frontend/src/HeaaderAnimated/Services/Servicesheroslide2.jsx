import { useEffect, useRef, useState } from "react";

// ══════════════════════════════════════════════════════════════════
// DATA
// ══════════════════════════════════════════════════════════════════
const SERVICES = [
  { id: "gold-loan",       label: "Gold Loan",            accent: "#C8960C" },
  { id: "personal-loan",   label: "Personal Loan",        accent: "#B91C1C" },
  { id: "housing",         label: "Housing Finance",      accent: "#B91C1C" },
  { id: "insurance",       label: "Insurance",            accent: "#C8960C" },
  { id: "vehicle",         label: "Vehicle Loan",         accent: "#B91C1C" },
  { id: "mutual-funds",    label: "Mutual Funds",         accent: "#C8960C" },
  { id: "sme-loan",        label: "SME Loan",             accent: "#B91C1C" },
  { id: "gold-flexi",      label: "Gold Flexi Credit",    accent: "#C8960C" },
  { id: "digital",         label: "Digital & Cashless",   accent: "#C8960C" },
  { id: "micro-finance",   label: "Micro Finance",        accent: "#B91C1C" },
  { id: "money-transfer",  label: "Money Transfer",       accent: "#C8960C" },
  { id: "pan-card",        label: "PAN Card",             accent: "#B91C1C" },
];

// Icons
const ICONS = {
  "gold-loan": (c) => (
    <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
      <ellipse cx="16" cy="22" rx="9" ry="3" stroke={c} strokeWidth="1.4" fill="none"/>
      <path d="M7 22C7 22 7 13 16 10C25 13 25 22 25 22" stroke={c} strokeWidth="1.4" fill="none"/>
      <circle cx="16" cy="9" r="3" stroke={c} strokeWidth="1.3" fill="none"/>
    </svg>
  ),
  "personal-loan": (c) => (
    <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
      <circle cx="16" cy="10" r="5" stroke={c} strokeWidth="1.4" fill="none"/>
      <path d="M5 28C5 21 9 17 16 17C23 17 27 21 27 28" stroke={c} strokeWidth="1.4" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  "housing": (c) => (
    <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
      <path d="M3 14L16 3l13 11V29H21V20H11v9H3Z" stroke={c} strokeWidth="1.4" fill="none"/>
    </svg>
  ),
  "insurance": (c) => (
    <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
      <path d="M16 3L27 8V18C27 24 22 28 16 30C10 28 5 24 5 18V8Z" stroke={c} strokeWidth="1.4" fill="none"/>
      <path d="M11 16l4 4 7-8" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "vehicle": (c) => (
    <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
      <rect x="2" y="13" width="28" height="9" rx="2.5" stroke={c} strokeWidth="1.4" fill="none"/>
      <path d="M5 13l3-5H24l3 5" stroke={c} strokeWidth="1.4" strokeLinejoin="round" fill="none"/>
      <circle cx="8" cy="22" r="3" stroke={c} strokeWidth="1.3" fill="none"/>
      <circle cx="24" cy="22" r="3" stroke={c} strokeWidth="1.3" fill="none"/>
    </svg>
  ),
  "mutual-funds": (c) => (
    <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
      <path d="M4 26L10 16l7 4 7-10 4-5" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="10" cy="16" r="1.8" fill={c}/>
      <circle cx="17" cy="20" r="1.8" fill={c}/>
      <circle cx="24" cy="10" r="1.8" fill={c}/>
    </svg>
  ),
  "sme-loan": (c) => (
    <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
      <rect x="3" y="14" width="11" height="15" rx="1.5" stroke={c} strokeWidth="1.4" fill="none"/>
      <rect x="11" y="7" width="18" height="22" rx="1.5" stroke={c} strokeWidth="1.4" fill="none"/>
      <path d="M15 13h10M15 17h10M15 21h7" stroke={c} strokeWidth="1.1" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
  "gold-flexi": (c) => (
    <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
      <rect x="3" y="9" width="26" height="16" rx="3" stroke={c} strokeWidth="1.4" fill="none"/>
      <rect x="3" y="14" width="26" height="4" fill={c} opacity="0.15"/>
      <circle cx="22" cy="21" r="3" stroke={c} strokeWidth="1.2" fill="none"/>
      <circle cx="25" cy="21" r="3" stroke={c} strokeWidth="1.2" fill="none" opacity="0.5"/>
    </svg>
  ),
  "digital": (c) => (
    <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
      <rect x="4" y="6" width="24" height="20" rx="3.5" stroke={c} strokeWidth="1.4" fill="none"/>
      <circle cx="16" cy="16" r="5" stroke={c} strokeWidth="1.3" fill="none"/>
      <path d="M16 13v6M13 16h6" stroke={c} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  "micro-finance": (c) => (
    <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
      <circle cx="16" cy="16" r="12" stroke={c} strokeWidth="1.4" fill="none"/>
      <path d="M16 10v12M12 14h8M12 18h8" stroke={c} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  "money-transfer": (c) => (
    <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
      <rect x="3" y="9" width="26" height="16" rx="3" stroke={c} strokeWidth="1.4" fill="none"/>
      <circle cx="16" cy="17" r="4" stroke={c} strokeWidth="1.2" fill="none"/>
      <path d="M24 13l3 2-3 2M8 15l-3 2 3 2" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  "pan-card": (c) => (
    <svg viewBox="0 0 32 32" fill="none" width="20" height="20">
      <rect x="2" y="7" width="28" height="20" rx="2.5" stroke={c} strokeWidth="1.4" fill="none"/>
      <rect x="5" y="10" width="8" height="8" rx="1.5" fill={c} opacity="0.15" stroke={c} strokeWidth="1.1"/>
      <path d="M16 13h11M16 17h8M16 21h11M5 21h8" stroke={c} strokeWidth="1.1" strokeLinecap="round" opacity="0.55"/>
    </svg>
  ),
};

// ══════════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════════
export default function ServicesHeroSlide2() {
  const ref                 = useRef(null);
  const cycleRef            = useRef(null);
  const [inView, setInView] = useState(false);
  const [cycle, setCycle]   = useState(0);
  const [step, setStep]     = useState(0);
  // step 0=reset, 1=left panel in, 2=cards in, 3=divider+footer

  const runCycle = () => {
    setStep(0);
    setCycle(c => c + 1);
    setTimeout(() => setStep(1), 60);
    setTimeout(() => setStep(2), 300);
    setTimeout(() => setStep(3), 860);
  };

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); runCycle(); }
      else { setInView(false); setStep(0); clearInterval(cycleRef.current); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    cycleRef.current = setInterval(runCycle, 4000);
    return () => clearInterval(cycleRef.current);
  }, [inView]);

  // Split into two rows of 6
  const row1 = SERVICES.slice(0, 6);
  const row2 = SERVICES.slice(6, 12);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');

        @keyframes sh2-panel {
          from { opacity:0; transform: translateX(-32px); }
          to   { opacity:1; transform: translateX(0); }
        }
        @keyframes sh2-tag {
          from { opacity:0; letter-spacing: 0.3em; }
          to   { opacity:1; letter-spacing: 0.15em; }
        }
        @keyframes sh2-title-reveal {
          from { opacity:0; transform: translateY(24px) skewX(-4deg); }
          to   { opacity:1; transform: translateY(0) skewX(0deg); }
        }
        @keyframes sh2-card-flip {
          from { opacity:0; transform: translateY(30px) rotateX(12deg) scale(0.94); }
          to   { opacity:1; transform: translateY(0)   rotateX(0deg)  scale(1); }
        }
        @keyframes sh2-divider {
          from { transform: scaleX(0); transform-origin: left; }
          to   { transform: scaleX(1); transform-origin: left; }
        }
        @keyframes sh2-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes sh2-dot-pulse {
          0%,100% { opacity: 0.4; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.6); }
        }
        @keyframes sh2-badge-in {
          from { opacity:0; transform: scale(0.7) rotate(-8deg); }
          to   { opacity:1; transform: scale(1)   rotate(0deg); }
        }
        @keyframes sh2-float {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-4px); }
        }

        .sh2-card {
          transition:
            transform 0.3s cubic-bezier(.34,1.5,.64,1),
            box-shadow 0.3s ease,
            border-color 0.22s,
            background 0.22s;
          cursor: default;
          perspective: 600px;
        }
        .sh2-card:hover {
          transform: translateY(-9px) scale(1.07) !important;
          box-shadow: 0 18px 40px rgba(185,28,28,0.18), 0 4px 12px rgba(0,0,0,0.08) !important;
          border-color: rgba(200,150,12,0.45) !important;
        }
        .sh2-card:hover .sh2-icon-bg {
          transform: scale(1.1) rotate(6deg);
        }
        .sh2-icon-bg {
          transition: transform 0.3s cubic-bezier(.34,1.5,.64,1);
        }
      `}</style>

      <div
        ref={ref}
        style={{
          width: "100%",
          background: "#faf7f2",
          borderTop: "3px solid #B91C1C",
          padding: "0",
          boxSizing: "border-box",
          fontFamily: "'Outfit', system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          minHeight: 270,
        }}
      >
        {/* ── LEFT PANEL — accent column ── */}
        <div
          style={{
            width: "clamp(120px, 14vw, 180px)",
            flexShrink: 0,
            background: "linear-gradient(170deg, #B91C1C 0%, #7f1010 100%)",
            padding: "28px 16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
            opacity: step >= 1 ? 1 : 0,
            animation: step >= 1 ? "sh2-panel 0.5s cubic-bezier(.34,1.1,.64,1) both" : "none",
          }}
        >
          {/* Diagonal texture lines */}
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{
              position: "absolute",
              top: `${-10 + i * 30}%`, left: "-20%",
              width: "150%", height: "1px",
              background: "rgba(255,255,255,0.06)",
              transform: "rotate(-25deg)",
              pointerEvents: "none",
            }}/>
          ))}

          {/* Brand vertical text */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.5)",
              marginBottom: 12,
              opacity: step >= 1 ? 1 : 0,
              animation: step >= 1 ? "sh2-tag 0.6s ease 0.15s both" : "none",
            }}>
              Ganesh Finance
            </div>

            <div style={{
              width: 28, height: 2, background: "#D4A017",
              borderRadius: 99, marginBottom: 10,
              transform: step >= 1 ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "transform 0.4s ease 0.3s",
            }}/>

            <p style={{
              margin: 0,
              fontSize: "clamp(0.55rem,0.8vw,0.66rem)",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.5,
              fontWeight: 300,
              opacity: step >= 1 ? 1 : 0,
              transition: "opacity 0.4s ease 0.4s",
            }}>
              Est.<br/>2019
            </p>
          </div>

          {/* Big number */}
          <div style={{
            position: "relative", zIndex: 1, textAlign: "center",
            animation: step >= 1 ? "sh2-badge-in 0.5s cubic-bezier(.34,1.3,.64,1) 0.2s both" : "none",
            opacity: step >= 1 ? 1 : 0,
          }}>
            <div style={{
              fontSize: "clamp(2rem,3.5vw,2.8rem)",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1,
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}>
              21
            </div>
            <div style={{
              fontSize: "0.55rem", fontWeight: 600,
              color: "#D4A017",
              letterSpacing: "0.12em", textTransform: "uppercase",
              marginTop: 2,
            }}>
              Services
            </div>
          </div>

          {/* Animated dots */}
          <div style={{
            display: "flex", flexDirection: "column", gap: 5, alignItems: "center",
            position: "relative", zIndex: 1,
          }}>
            {[0,1,2].map(i => (
              <div key={i} style={{
                width: 4, height: 4, borderRadius: "50%",
                background: "#D4A017",
                animation: `sh2-dot-pulse 1.6s ease ${i * 0.28}s infinite`,
              }}/>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL — main content ── */}
        <div style={{
          flex: 1,
          padding: "24px 20px 18px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          overflow: "hidden",
        }}>

          {/* Header row */}
          <div style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}>
            <div>
              <span style={{
                fontSize: "0.6rem", fontWeight: 600,
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: "#B91C1C",
                opacity: step >= 1 ? 1 : 0,
                animation: step >= 1 ? "sh2-tag 0.5s ease 0.1s both" : "none",
              }}>
                Our Services
              </span>

              <h2
                key={`t-${cycle}`}
                style={{
                  margin: "5px 0 0",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(1.2rem,2.5vw,1.7rem)",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: "#1a1008",
                  letterSpacing: "-0.01em",
                  lineHeight: 1.15,
                  opacity: step >= 1 ? 1 : 0,
                  animation: step >= 1 ? "sh2-title-reveal 0.5s cubic-bezier(.34,1.1,.64,1) 0.18s both" : "none",
                }}
              >
                Comprehensive Financial{" "}
                <span style={{
                  fontStyle: "normal",
                  background: "linear-gradient(90deg,#B91C1C,#C8960C)",
                  backgroundSize: "200% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "sh2-shimmer 2.5s linear 1s infinite",
                }}>
                  Solutions
                </span>
              </h2>

              {/* Underline */}
              <div style={{
                height: "2px", width: 44, marginTop: 7, borderRadius: 99,
                background: "linear-gradient(90deg,#B91C1C,#C8960C)",
                transformOrigin: "left",
                transform: step >= 1 ? "scaleX(1)" : "scaleX(0)",
                transition: "transform 0.5s cubic-bezier(.34,1.1,.64,1) 0.3s",
              }}/>
            </div>

            {/* Trust badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "7px 14px",
              background: "#fff",
              border: "1px solid #e8e0d0",
              borderRadius: 10,
              boxShadow: "0 2px 12px rgba(185,28,28,0.06)",
              opacity: step >= 1 ? 1 : 0,
              animation: step >= 1 ? "sh2-badge-in 0.45s cubic-bezier(.34,1.3,.64,1) 0.35s both" : "none",
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "linear-gradient(135deg,#B91C1C,#7f1010)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L20 6V13C20 17.4 16.4 21 12 22C7.6 21 4 17.4 4 13V6Z" stroke="white" strokeWidth="1.8" fill="none"/>
                  <path d="M8 12l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "0.62rem", fontWeight: 700, color: "#1a1008", lineHeight: 1.2 }}>
                  Trusted Brand
                </div>
                <div style={{ fontSize: "0.52rem", color: "#9ca3af", letterSpacing: "0.05em" }}>
                  Since 2019
                </div>
              </div>
            </div>
          </div>

          {/* ── ROW 1 of cards ── */}
          <div
            key={`r1-${cycle}`}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6,1fr)",
              gap: "clamp(5px,0.9vw,10px)",
            }}
          >
            {row1.map((svc, i) => (
              <ServiceCard key={svc.id} svc={svc} i={i} step={step} />
            ))}
          </div>

          {/* Divider with label */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            opacity: step >= 3 ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}>
            <div style={{
              flex: 1, height: 1,
              background: "linear-gradient(90deg,#e8e0d0,transparent)",
              transformOrigin: "left",
              transform: step >= 3 ? "scaleX(1)" : "scaleX(0)",
              transition: "transform 0.5s ease",
              animation: step >= 3 ? "sh2-divider 0.5s ease both" : "none",
            }}/>
            <span style={{
              fontSize: "0.54rem", color: "#c4b89a",
              fontWeight: 500, letterSpacing: "0.1em",
              textTransform: "uppercase", whiteSpace: "nowrap",
            }}>
              & more
            </span>
            <div style={{
              flex: 1, height: 1,
              background: "linear-gradient(90deg,transparent,#e8e0d0)",
            }}/>
          </div>

          {/* ── ROW 2 of cards ── */}
          <div
            key={`r2-${cycle}`}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6,1fr)",
              gap: "clamp(5px,0.9vw,10px)",
            }}
          >
            {row2.map((svc, i) => (
              <ServiceCard key={svc.id} svc={svc} i={i + 7} step={step} />
            ))}
          </div>

          {/* Footer */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: 6,
            opacity: step >= 3 ? 1 : 0,
            transition: "opacity 0.35s ease 0.1s",
          }}>
            <p style={{
              margin: 0, fontSize: "0.55rem", color: "#c4b89a",
              letterSpacing: "0.03em",
            }}>
              *All services subject to eligibility. Ganesh Finance, Est. 2019.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{
                fontSize: "0.58rem", fontWeight: 700,
                color: "#B91C1C", letterSpacing: "0.09em", textTransform: "uppercase",
              }}>
                View All Services
              </span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                stroke="#B91C1C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

// ── Card sub-component ────────────────────────────────────────────
function ServiceCard({ svc, i, step }) {
  const [hov, setHov] = useState(false);
  const Icon = ICONS[svc.id];

  return (
    <div
      className="sh2-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 7,
        padding: "12px 6px 10px",
        background: hov ? "#fff" : "#ffffff",
        border: `1px solid ${hov ? "rgba(200,150,12,0.4)" : "#ede8e0"}`,
        borderRadius: 12,
        boxShadow: hov
          ? "0 18px 40px rgba(185,28,28,0.15), 0 4px 12px rgba(0,0,0,0.07)"
          : "0 1px 4px rgba(0,0,0,0.04)",
        opacity: step >= 2 ? 1 : 0,
        animation: step >= 2
          ? `sh2-card-flip 0.48s cubic-bezier(.34,1.05,.64,1) ${i * 45}ms both`
          : "none",
        transformPerspective: "600px",
      }}
    >
      {/* Icon */}
      <div
        className="sh2-icon-bg"
        style={{
          width: 44, height: 44,
          borderRadius: 10,
          background: hov
            ? `${svc.accent}18`
            : "#f7f3ec",
          border: `1px solid ${hov ? svc.accent + "40" : "#ede8e0"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.22s, border-color 0.22s",
        }}
      >
        {Icon && Icon(hov ? svc.accent : "#b0a080")}
      </div>

      {/* Label */}
      <span style={{
        fontSize: "clamp(0.5rem,0.65vw,0.59rem)",
        fontWeight: hov ? 700 : 600,
        textTransform: "uppercase",
        letterSpacing: "0.045em",
        color: hov ? svc.accent : "#7a6a54",
        textAlign: "center",
        lineHeight: 1.3,
        transition: "color 0.2s, font-weight 0.1s",
      }}>
        {svc.label}
      </span>

      {/* Accent dot */}
      <div style={{
        width: hov ? 20 : 12, height: 2,
        borderRadius: 99,
        background: hov ? svc.accent : "#e8dfd0",
        transition: "width 0.25s cubic-bezier(.34,1.5,.64,1), background 0.2s",
      }}/>
    </div>
  );
}