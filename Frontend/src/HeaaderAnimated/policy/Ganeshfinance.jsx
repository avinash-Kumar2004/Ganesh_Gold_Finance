import { useEffect, useRef, useState } from "react";

function useCount(to, dur = 1600, run = false) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) { setV(0); return; }
    let s = null;
    const f = (t) => {
      if (!s) s = t;
      const p = Math.min((t - s) / dur, 1);
      setV(Math.floor((1 - Math.pow(2, -10 * p)) * to));
      if (p < 1) requestAnimationFrame(f); else setV(to);
    };
    requestAnimationFrame(f);
  }, [run, to]);
  return v;
}

export default function PromoSlide() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  const cr  = useCount(21,  1600, step >= 2);
  const cl  = useCount(500, 1800, step >= 2);
  const yr  = useCount(6,   1200, step >= 2);

  useEffect(() => {
    const run = () => {
      setStep(0);
      setTimeout(() => setStep(1), 60);
      setTimeout(() => setStep(2), 300);
      setTimeout(() => setStep(3), 600);
      setTimeout(() => setStep(4), 880);
    };
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) run(); else setStep(0); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,600&family=Josefin+Sans:wght@300;400;600;700&display=swap');

        @keyframes pr-left   { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes pr-right  { from{opacity:0;transform:translateX(20px)}  to{opacity:1;transform:translateX(0)} }
        @keyframes pr-up     { from{opacity:0;transform:translateY(16px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes pr-fade   { from{opacity:0} to{opacity:1} }
        @keyframes pr-ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes pr-pulse  { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.06)} }
        @keyframes pr-shine  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        @keyframes pr-spin   { to{transform:rotate(360deg)} }
        @keyframes pr-dot    { 0%,100%{opacity:.4} 50%{opacity:1} }
        @keyframes pr-flare  {
          0%   { opacity:0; transform:translateX(-60px) skewX(-20deg); }
          40%  { opacity:.18; }
          100% { opacity:0; transform:translateX(120vw) skewX(-20deg); }
        }

        .pr-cta {
          cursor:pointer; border:none; outline:none;
          transition: transform .2s cubic-bezier(.34,1.5,.64,1), box-shadow .2s;
        }
        .pr-cta:hover { transform:translateY(-2px) scale(1.05); }
      `}</style>

      <div
        ref={ref}
        style={{
          width: "100%", boxSizing: "border-box",
          background: "#F5F0E8",
          fontFamily: "'Josefin Sans', system-ui, sans-serif",
          position: "relative", overflow: "hidden",
          padding: "0",
        }}
      >
        {/* Gold top rule */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(90deg,#8B6914,#D4A017,#F5C842,#D4A017,#8B6914)",
          zIndex: 10,
        }} />

        {/* Red diagonal LEFT panel */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: "45%",
          background: "linear-gradient(155deg,#7A0A0A 0%,#B91C1C 45%,#9B1515 100%)",
          clipPath: "polygon(0 0,100% 0,80% 100%,0 100%)",
          zIndex: 0,
        }} />

        {/* Light flare sweep animation on red panel */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: "50%",
          zIndex: 1, pointerEvents: "none", overflow: "hidden",
          clipPath: "polygon(0 0,100% 0,80% 100%,0 100%)",
        }}>
          <div style={{
            position: "absolute", top: 0, bottom: 0, width: "60px",
            background: "linear-gradient(90deg,transparent,rgba(255,255,255,.12),transparent)",
            animation: "pr-flare 5s ease-in-out 1.2s infinite",
          }} />
        </div>

        {/* Subtle hex pattern on cream side */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='42'%3E%3Cpolygon points='24,2 46,13 46,36 24,47 2,36 2,13' fill='none' stroke='%23C8860A' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "48px 42px",
        }} />

        {/* Grain */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.015,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }} />

        {/* ══ SAME GRID ══ */}
        <div style={{
          position: "relative", zIndex: 2,
          display: "grid",
          gridTemplateColumns: "42% 1fr",
          minHeight: "clamp(240px,32vw,440px)",
        }}>

          {/* ── LEFT: Red panel ── */}
          <div style={{
            padding: "clamp(18px,2.6vw,28px) clamp(14px,2vw,22px) clamp(16px,2.2vw,22px)",
            display: "flex", flexDirection: "column",
            justifyContent: "space-between",
            color: "#FFF5F5",
          }}>

            {/* Brand */}
            <div style={{
              opacity: step >= 1 ? 1 : 0,
              animation: step >= 1 ? "pr-left .45s ease both" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <img src="/half logo.png" alt=""
                  style={{ width: "clamp(22px,2.8vw,32px)", height: "clamp(22px,2.8vw,32px)", borderRadius: "50%", objectFit: "contain", border: "1.5px solid rgba(255,200,50,.3)" }}
                  onError={e => e.target.style.display = "none"}
                />
                <div style={{ width: 1, height: "clamp(18px,2.5vw,26px)", background: "rgba(255,200,50,.35)" }} />
                <div>
                  <div style={{ fontSize: "clamp(.54rem,.75vw,.64rem)", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#FFD632", lineHeight: 1.2 }}>Ganesh Finance</div>
                  <div style={{ fontSize: "clamp(.4rem,.55vw,.5rem)", color: "rgba(255,245,245,.3)", letterSpacing: ".1em", textTransform: "uppercase" }}>Gold Loan NBFC · Est. 2019</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <div style={{ width: 20, height: 1, background: "rgba(255,210,50,.5)" }} />
                <span style={{ fontSize: "clamp(.42rem,.58vw,.52rem)", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(255,210,50,.7)", fontWeight: 600 }}>Gold Loan Partner</span>
              </div>

              {/* Headline */}
              <h2 style={{
                margin: 0,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.3rem,2.6vw,2.2rem)",
                fontWeight: 700, lineHeight: 1.05,
                color: "#FFF5F5", letterSpacing: "-.01em",
              }}>
                Your Gold,<br />
                <em style={{ fontStyle: "italic", color: "#FFD632" }}>Our Promise.</em>
              </h2>

              <p style={{
                margin: "6px 0 0",
                fontSize: "clamp(.44rem,.62vw,.54rem)",
                color: "rgba(255,245,245,.35)",
                lineHeight: 1.65, fontWeight: 300,
              }}>
                Fast approvals · Lowest rates · Doorstep service
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(4px,.6vw,7px)" }}>
              {[
                { val: `₹${cr}Cr+`, label: "Gold Loans Disbursed", delay: 0   },
                { val: `${cl}+`,    label: "Happy Customers",       delay: 80  },
                { val: `${yr} Yrs`, label: "Trusted Experience",    delay: 160 },
              ].map((s) => (
                <div key={s.label} style={{
                  display: "flex", alignItems: "baseline", gap: "clamp(6px,1vw,10px)",
                  opacity: step >= 2 ? 1 : 0,
                  animation: step >= 2 ? `pr-left .4s ease ${s.delay}ms both` : "none",
                }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.1rem,2vw,1.65rem)",
                    fontWeight: 700, color: "#FFD632", lineHeight: 1,
                    minWidth: "clamp(48px,6.5vw,72px)",
                  }}>{s.val}</span>
                  <span style={{
                    fontSize: "clamp(.42rem,.58vw,.52rem)",
                    color: "rgba(255,245,245,.32)",
                    letterSpacing: ".1em", textTransform: "uppercase",
                    lineHeight: 1.4, fontWeight: 600,
                  }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Cream panel ── */}
          <div style={{
            padding: "clamp(18px,2.6vw,28px) clamp(16px,2.2vw,26px) clamp(14px,2vw,22px) clamp(18px,2.5vw,30px)",
            display: "flex", flexDirection: "column",
            justifyContent: "space-between",
            gap: "clamp(8px,1.2vw,14px)",
          }}>

            {/* Promo tagline */}
            <div style={{
              opacity: step >= 2 ? 1 : 0,
              animation: step >= 2 ? "pr-right .5s ease both" : "none",
            }}>
              <div style={{
                fontSize: "clamp(.46rem,.65vw,.56rem)",
                fontWeight: 700, letterSpacing: ".18em",
                textTransform: "uppercase", color: "#B91C1C",
                marginBottom: 5,
              }}>Why Choose Us</div>

              <p style={{
                margin: 0,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(.85rem,1.5vw,1.2rem)",
                fontWeight: 300, color: "#2A1208",
                lineHeight: 1.65, letterSpacing: ".01em",
              }}>
                Get a gold loan in <strong style={{ fontWeight: 700, color: "#B91C1C" }}>30 minutes</strong> — no paperwork hassle, no hidden charges.{" "}
                <strong style={{ fontWeight: 600 }}>Your gold stays safe. Your cash arrives fast.</strong>
              </p>
            </div>

            {/* 3 promo features */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "clamp(6px,1vw,10px)",
            }}>
              {[
                { icon: "⚡", title: "30 Min",     body: "Instant approval & disbursal",     delay: 0   },
                { icon: "🔒", title: "100% Safe",  body: "Gold kept in secured vaults",       delay: 80  },
                { icon: "💰", title: "Low Rates",  body: "Competitive & fully transparent",   delay: 160 },
              ].map((p) => (
                <div key={p.title} style={{
                  padding: "clamp(7px,1vw,10px) clamp(6px,.9vw,9px)",
                  background: "rgba(185,28,28,0.05)",
                  border: "1px solid rgba(185,28,28,0.12)",
                  borderRadius: 8,
                  opacity: step >= 3 ? 1 : 0,
                  transform: step >= 3 ? "translateY(0)" : "translateY(12px)",
                  transition: `all .4s ease ${p.delay}ms`,
                }}>
                  <div style={{ fontSize: "clamp(.85rem,1.3vw,1.1rem)", marginBottom: 3 }}>{p.icon}</div>
                  <div style={{ fontSize: "clamp(.52rem,.72vw,.62rem)", fontWeight: 700, color: "#B91C1C", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 2 }}>{p.title}</div>
                  <div style={{ fontSize: "clamp(.46rem,.64vw,.56rem)", color: "#7A4040", lineHeight: 1.5, fontWeight: 300 }}>{p.body}</div>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div style={{
              display: "flex", alignItems: "center",
              gap: "clamp(5px,.8vw,9px)", flexWrap: "wrap",
              opacity: step >= 4 ? 1 : 0,
              transition: "opacity .4s ease",
            }}>
              <button className="pr-cta" style={{
                padding: "clamp(5px,.8vw,8px) clamp(14px,2vw,20px)",
                background: "linear-gradient(135deg,#9B1515,#B91C1C,#9B1515)",
                backgroundSize: "200% 100%",
                borderRadius: 5,
                fontFamily: "'Josefin Sans',sans-serif",
                fontSize: "clamp(.52rem,.74vw,.64rem)",
                fontWeight: 700, textTransform: "uppercase",
                letterSpacing: ".12em", color: "#FFF5F5",
                boxShadow: "0 4px 16px rgba(185,28,28,.35)",
              }}>Get Loan Now →</button>

              <button className="pr-cta" style={{
                padding: "clamp(4px,.7vw,7px) clamp(12px,1.7vw,17px)",
                background: "transparent",
                border: "1px solid rgba(185,28,28,.3)",
                borderRadius: 5,
                fontFamily: "'Josefin Sans',sans-serif",
                fontSize: "clamp(.52rem,.74vw,.64rem)",
                fontWeight: 500, textTransform: "uppercase",
                letterSpacing: ".1em", color: "#B91C1C",
                boxShadow: "none",
              }}>Know More</button>

              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#22a86b", animation: "pr-dot 2s ease infinite" }} />
                <span style={{ fontSize: "clamp(.4rem,.54vw,.5rem)", fontWeight: 600, color: "#7A4040", letterSpacing: ".1em", textTransform: "uppercase" }}>Branches Open</span>
                <div style={{ width: 1, height: 10, background: "rgba(185,28,28,.2)" }} />
                <span style={{ fontSize: "clamp(.4rem,.54vw,.5rem)", color: "#9A6060", letterSpacing: ".08em", textTransform: "uppercase" }}>🏛️ RBI Regulated</span>
              </div>
            </div>

          </div>
        </div>

        {/* Ticker — dark red */}
        <div style={{
          background: "#7A0A0A",
          borderTop: "1px solid rgba(255,210,50,.15)",
          padding: "clamp(4px,.6vw,6px) 0",
          overflow: "hidden",
          opacity: step >= 4 ? 1 : 0,
          transition: "opacity .4s ease",
        }}>
          <div style={{
            display: "flex", gap: 40, width: "max-content",
            animation: "pr-ticker 22s linear infinite",
            userSelect: "none",
          }}>
            {[...Array(2)].map((_, r) => (
              <div key={r} style={{ display: "flex", gap: 40, alignItems: "center" }}>
                {["Gold Loan in 30 Min","Zero Hidden Charges","Doorstep Service","Lowest Interest Rate",
                  "Secure Vaults","RBI Regulated","Trusted Since 2019","Apply Today"].map((t, i) => (
                  <span key={i} style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    fontSize: "clamp(.4rem,.56vw,.5rem)", fontWeight: 500,
                    color: "rgba(255,210,50,.35)", letterSpacing: ".14em",
                    textTransform: "uppercase", whiteSpace: "nowrap",
                  }}>
                    <span style={{ color: "#FFD632", fontSize: ".34rem" }}>◆</span>{t}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}