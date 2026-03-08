import { useEffect, useRef, useState } from "react";

// ══════════════════════════════════════════════════════════════════
// GANESH FINANCE LOGO — SVG recreation from uploaded image
// ══════════════════════════════════════════════════════════════════
function GFLogo({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="100" fill="#E8201A"/>
      {/* TOP bar - G */}
      <rect x="22" y="22" width="72" height="18" rx="6" fill="white"/>
      {/* LEFT vertical - G */}
      <rect x="22" y="22" width="18" height="88" rx="6" fill="white"/>
      {/* BOTTOM inset bar - G */}
      <rect x="40" y="92" width="54" height="18" rx="6" fill="white"/>
      {/* SMALL DOT - bottom left */}
      <rect x="22" y="138" width="20" height="20" rx="5" fill="white"/>
      {/* TOP bar - right glyph */}
      <rect x="104" y="22" width="74" height="18" rx="6" fill="white"/>
      {/* RIGHT vertical - full height */}
      <rect x="160" y="22" width="18" height="156" rx="6" fill="white"/>
      {/* MIDDLE bar - right glyph */}
      <rect x="104" y="88" width="56" height="18" rx="6" fill="white"/>
      {/* BOTTOM bar - right glyph */}
      <rect x="104" y="158" width="56" height="18" rx="6" fill="white"/>
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════
// FLOATING COIN SVG
// ══════════════════════════════════════════════════════════════════
function GoldCoin({ size = 36, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={style}>
      <circle cx="30" cy="30" r="28" fill="#D4A017" opacity="0.9"/>
      <circle cx="30" cy="30" r="22" fill="#F5C842"/>
      <circle cx="30" cy="30" r="18" fill="#D4A017"/>
      <text x="30" y="35" textAnchor="middle" fontSize="16" fontWeight="900"
        fill="#fff" fontFamily="Georgia,serif">₹</text>
    </svg>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════
export default function GoldHeroSlide() {
  const ref                 = useRef(null);
  const cycleRef            = useRef(null);
  const [inView, setInView] = useState(false);
  const [cycle, setCycle]   = useState(0);
  const [step, setStep]     = useState(0);
  // step: 0=reset 1=bg+logo 2=headline 3=subtext+coins 4=cta+stats

  const runCycle = () => {
    setStep(0);
    setCycle(c => c + 1);
    setTimeout(() => setStep(1), 60);
    setTimeout(() => setStep(2), 320);
    setTimeout(() => setStep(3), 600);
    setTimeout(() => setStep(4), 900);
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
    cycleRef.current = setInterval(runCycle, 4500);
    return () => clearInterval(cycleRef.current);
  }, [inView]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

        /* bg sweep */
        @keyframes gh-bg {
          from { opacity:0; }
          to   { opacity:1; }
        }
        /* logo drop */
        @keyframes gh-logo {
          from { opacity:0; transform: translateY(-28px) scale(0.7); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
        /* headline slam — left to right reveal */
        @keyframes gh-headline {
          from { opacity:0; transform: translateX(-40px) skewX(-6deg); }
          to   { opacity:1; transform: translateX(0) skewX(0deg); }
        }
        /* subline up */
        @keyframes gh-sub {
          from { opacity:0; transform: translateY(20px); }
          to   { opacity:1; transform: translateY(0); }
        }
        /* coin float in */
        @keyframes gh-coin-in {
          from { opacity:0; transform: translateY(40px) scale(0.5) rotate(-20deg); }
          to   { opacity:1; transform: translateY(0) scale(1) rotate(0deg); }
        }
        /* idle coin float */
        @keyframes gh-coin-float {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33%      { transform: translateY(-8px) rotate(4deg); }
          66%      { transform: translateY(-4px) rotate(-2deg); }
        }
        /* cta pop */
        @keyframes gh-cta {
          from { opacity:0; transform: scale(0.8); }
          to   { opacity:1; transform: scale(1); }
        }
        /* shimmer on headline */
        @keyframes gh-shimmer {
          0%   { background-position: -300% 0; }
          100% { background-position: 300% 0; }
        }
        /* stat count up feel */
        @keyframes gh-stat {
          from { opacity:0; transform: translateY(12px); }
          to   { opacity:1; transform: translateY(0); }
        }
        /* diagonal shine sweep */
        @keyframes gh-shine {
          0%   { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(300%) skewX(-20deg); }
        }
        /* pulse ring */
        @keyframes gh-pulse {
          0%   { transform: scale(1); opacity:0.6; }
          100% { transform: scale(1.8); opacity:0; }
        }

        .gh-cta-btn {
          transition: transform 0.22s cubic-bezier(.34,1.5,.64,1), box-shadow 0.22s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .gh-cta-btn:hover {
          transform: translateY(-3px) scale(1.06);
          box-shadow: 0 12px 32px rgba(0,0,0,0.35) !important;
        }
        .gh-cta-btn::after {
          content: '';
          position: absolute; top:0; left:0; right:0; bottom:0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%);
          transform: translateX(-100%) skewX(-20deg);
          animation: gh-shine 2.5s ease 1.5s infinite;
        }
      `}</style>

      <div
        ref={ref}
        style={{
          width: "100%",
          minHeight: 400,
          background: step >= 1
            ? "linear-gradient(135deg, #B91C1C 0%, #8B0000 60%, #6b0000 100%)"
            : "#8B0000",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          fontFamily: "'DM Sans', system-ui, sans-serif",
          transition: "background 0.5s ease",
          animation: step >= 1 ? "gh-bg 0.4s ease both" : "none",
        }}
      >

        {/* ── Diagonal texture lines ── */}
        {[0,1,2,3,4,5].map(i => (
          <div key={i} style={{
            position: "absolute",
            top: `${-30 + i * 22}%`, left: "-10%",
            width: "120%", height: "1px",
            background: "rgba(255,255,255,0.04)",
            transform: "rotate(-18deg)",
            pointerEvents: "none",
          }}/>
        ))}

        {/* ── Bottom gold strip ── */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 4,
          background: "linear-gradient(90deg, #D4A017, #F5C842, #D4A017)",
          zIndex: 2,
        }}/>

        {/* ── BG glow circle ── */}
        <div style={{
          position: "absolute", top: "50%", left: "38%",
          transform: "translate(-50%,-50%)",
          width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,160,23,0.12) 0%, transparent 65%)",
          pointerEvents: "none",
        }}/>

        {/* ═══════════════════════════════════════════════════
            LEFT — Logo + headline
        ═══════════════════════════════════════════════════ */}
        <div style={{
          flex: 1,
          padding: "28px 0 28px 5vw",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          position: "relative", zIndex: 3,
        }}>

          {/* Logo + brand name row */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            opacity: step >= 1 ? 1 : 0,
            animation: step >= 1 ? "gh-logo 0.5s cubic-bezier(.34,1.3,.64,1) both" : "none",
          }}>
            <div style={{ position: "relative" }}>
              <GFLogo size={48}/>
              {/* Pulse ring */}
              {step >= 1 && (
                <div style={{
                  position: "absolute", inset: -4,
                  borderRadius: "50%",
                  border: "2px solid rgba(255,255,255,0.3)",
                  animation: "gh-pulse 2s ease 0.5s infinite",
                }}/>
              )}
            </div>
            <div>
              <div style={{
                fontSize: "clamp(0.9rem,1.6vw,1.15rem)",
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "0.02em",
                lineHeight: 1.1,
              }}>
                Ganesh Finance
              </div>
              <div style={{
                fontSize: "0.6rem", fontWeight: 500,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}>
                Est. 2019 · India
              </div>
            </div>
          </div>

          {/* Main headline */}
          <div
            key={`h-${cycle}`}
            style={{
              opacity: step >= 2 ? 1 : 0,
              animation: step >= 2 ? "gh-headline 0.5s cubic-bezier(.34,1.05,.64,1) both" : "none",
            }}
          >
            <div style={{
              fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
              fontSize: "clamp(1.6rem,4.2vw,3rem)",
              fontWeight: 900,
              lineHeight: 1,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              background: "linear-gradient(90deg, #F5C842 0%, #FFE066 40%, #D4A017 70%, #F5C842 100%)",
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "gh-shimmer 3s linear 0.8s infinite",
            }}>
              Put Your Gold
            </div>
            <div style={{
              fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
              fontSize: "clamp(1.3rem,3.2vw,2.3rem)",
              fontWeight: 800,
              lineHeight: 1.05,
              textTransform: "uppercase",
              color: "#fff",
              letterSpacing: "0.01em",
            }}>
              To Work For You
            </div>
          </div>

          {/* Subline */}
          <p
            key={`s-${cycle}`}
            style={{
              margin: 0,
              fontSize: "clamp(0.68rem,1.1vw,0.88rem)",
              color: "rgba(255,255,255,0.75)",
              fontWeight: 400,
              lineHeight: 1.6,
              maxWidth: 360,
              opacity: step >= 3 ? 1 : 0,
              animation: step >= 3 ? "gh-sub 0.45s ease both" : "none",
            }}
          >
            Instant gold loans · Highest per-gram value ·<br/>
            <strong style={{ color: "#F5C842" }}>Trusted by thousands since 2019.</strong>
          </p>

          {/* CTA button + stats */}
          <div style={{
            display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
            marginTop: 4,
            opacity: step >= 4 ? 1 : 0,
            animation: step >= 4 ? "gh-cta 0.4s cubic-bezier(.34,1.3,.64,1) both" : "none",
          }}>
            {/* CTA */}
            <button
              className="gh-cta-btn"
              style={{
                padding: "10px 22px",
                background: "linear-gradient(135deg, #F5C842, #D4A017)",
                border: "none", outline: "none",
                borderRadius: 8,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "clamp(0.75rem,1.2vw,0.95rem)",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#6b0000",
                boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
              }}
            >
              Get Gold Loan →
            </button>

            {/* Stat pills */}
            {[
              { v: "₹21Cr+", l: "Portfolio" },
              { v: "2+",     l: "Branches"  },
              { v: "98%",    l: "Retention" },
            ].map((s, i) => (
              <div key={s.l} style={{
                opacity: step >= 4 ? 1 : 0,
                animation: step >= 4
                  ? `gh-stat 0.35s ease ${i * 80 + 100}ms both`
                  : "none",
              }}>
                <div style={{
                  fontSize: "clamp(0.85rem,1.4vw,1.1rem)",
                  fontWeight: 800,
                  color: "#F5C842",
                  lineHeight: 1.1,
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}>
                  {s.v}
                </div>
                <div style={{
                  fontSize: "0.55rem", fontWeight: 500,
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                  letterSpacing: "0.07em",
                }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════
            RIGHT — Floating gold coins + decorative
        ═══════════════════════════════════════════════════ */}
        <div style={{
          width: "clamp(160px, 28vw, 320px)",
          flexShrink: 0,
          position: "relative",
          height: 260,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>

          {/* Large center coin */}
          {step >= 3 && (
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              animation: "gh-coin-in 0.55s cubic-bezier(.34,1.2,.64,1) 0s both, gh-coin-float 3.5s ease 0.6s infinite",
            }}>
              <GoldCoin size={90}/>
            </div>
          )}

          {/* Orbiting coins */}
          {step >= 3 && [
            { size: 44, top: "12%",  left: "18%",  delay: "0.1s", floatDelay: "0.3s" },
            { size: 38, top: "10%",  left: "62%",  delay: "0.18s", floatDelay: "0.7s" },
            { size: 50, top: "68%",  left: "10%",  delay: "0.26s", floatDelay: "1.1s" },
            { size: 36, top: "72%",  left: "66%",  delay: "0.14s", floatDelay: "0.5s" },
            { size: 28, top: "38%",  left: "5%",   delay: "0.22s", floatDelay: "0.9s" },
            { size: 30, top: "42%",  left: "80%",  delay: "0.3s",  floatDelay: "1.4s" },
          ].map((c, i) => (
            <div key={i} style={{
              position: "absolute",
              top: c.top, left: c.left,
              animation: `gh-coin-in 0.5s cubic-bezier(.34,1.2,.64,1) ${c.delay} both, gh-coin-float 3s ease ${c.floatDelay} infinite`,
            }}>
              <GoldCoin size={c.size}/>
            </div>
          ))}

          {/* Subtle ring decoration behind coins */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 160, height: 160,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.08)",
            pointerEvents: "none",
          }}/>
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 230, height: 230,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.04)",
            pointerEvents: "none",
          }}/>
        </div>

      </div>
    </>
  );
}