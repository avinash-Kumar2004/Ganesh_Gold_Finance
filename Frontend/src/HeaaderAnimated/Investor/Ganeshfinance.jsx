import { useEffect, useRef, useState } from "react";

function useCount(to, dur = 1800, run = false) {
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

export default function EditorialSlide() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  const cr  = useCount(21,  1600, step >= 2);
  const ret = useCount(100, 1400, step >= 2);
  const yr  = useCount(6,   1200, step >= 2);

  useEffect(() => {
    const run = () => {
      setStep(0);
      setTimeout(() => setStep(1), 60);
      setTimeout(() => setStep(2), 280);
      setTimeout(() => setStep(3), 620);
      setTimeout(() => setStep(4), 900);
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
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,300;1,600&family=Josefin+Sans:wght@300;400;600;700&display=swap');

        @keyframes ed-up    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes ed-left  { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes ed-right { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes ed-fade  { from{opacity:0} to{opacity:1} }
        @keyframes ed-line  { from{transform:scaleY(0)} to{transform:scaleY(1)} }
        @keyframes ed-hline { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes ed-spin  { to{transform:rotate(360deg)} }
        @keyframes ed-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes ed-shine {
          0%   { background-position: -300% 0; }
          100% { background-position:  300% 0; }
        }
        @keyframes ed-ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes ed-dot   { 0%,100%{opacity:.3} 50%{opacity:1} }

        .ed-btn {
          cursor:pointer; border:none; outline:none;
          transition: transform .2s cubic-bezier(.34,1.5,.64,1), box-shadow .2s;
        }
        .ed-btn:hover { transform:translateY(-2px) scale(1.04); }
      `}</style>

      <div
        ref={ref}
        style={{
          width: "100%",
          boxSizing: "border-box",
          /* Cream-on-dark — unexpected for finance */
          background: "#F5F0E8",
          fontFamily: "'Josefin Sans', system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
          padding: "0",
        }}
      >
        {/* ── Diagonal dark panel left ── */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, bottom: 0,
          width: "42%",
          background: "linear-gradient(160deg, #0C0A06 0%, #1A1208 100%)",
          clipPath: "polygon(0 0, 100% 0, 85% 100%, 0 100%)",
          zIndex: 0,
        }} />

        {/* ── Gold ruled line top ── */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(90deg, #8B6914, #D4A017, #F5C842, #D4A017, #8B6914)",
          zIndex: 10,
        }} />

        {/* ── Subtle grain texture ── */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.018,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }} />

        {/* ══ CONTENT GRID ══ */}
        <div style={{
          position: "relative", zIndex: 2,
          display: "grid",
          gridTemplateColumns: "40% 1fr",
          minHeight: "clamp(240px, 32vw, 440px)",
        }}>

          {/* ════ LEFT: Dark panel content ════ */}
          <div style={{
            padding: "clamp(18px,2.6vw,28px) clamp(16px,2.2vw,24px) clamp(16px,2.2vw,22px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            color: "#F5F0E8",
          }}>

            {/* Logo + brand */}
            <div style={{
              opacity: step >= 1 ? 1 : 0,
              animation: step >= 1 ? "ed-left .45s ease both" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <img src="/half logo.png" alt=""
                  style={{ width: "clamp(22px,2.8vw,32px)", height: "clamp(22px,2.8vw,32px)", borderRadius: "50%", objectFit: "contain" }}
                  onError={e => e.target.style.display = "none"}
                />
                <div style={{
                  width: 1,
                  height: "clamp(18px,2.5vw,26px)",
                  background: "rgba(212,160,23,0.4)",
                }} />
                <div>
                  <div style={{
                    fontSize: "clamp(.54rem,.75vw,.64rem)",
                    fontWeight: 700, letterSpacing: ".18em",
                    textTransform: "uppercase", color: "#D4A017",
                    lineHeight: 1.2,
                  }}>Ganesh Finance</div>
                  <div style={{
                    fontSize: "clamp(.4rem,.55vw,.5rem)",
                    color: "rgba(245,240,232,.3)",
                    letterSpacing: ".1em", textTransform: "uppercase",
                  }}>NBFC · Est. 2019</div>
                </div>
              </div>

              {/* Eyebrow */}
              <div style={{
                display: "flex", alignItems: "center", gap: 6, marginBottom: 6,
              }}>
                <div style={{ width: 20, height: 1, background: "#D4A017" }} />
                <span style={{
                  fontSize: "clamp(.42rem,.58vw,.52rem)",
                  letterSpacing: ".2em", textTransform: "uppercase",
                  color: "rgba(212,160,23,.65)", fontWeight: 600,
                }}>Investor Brief</span>
              </div>

              {/* Big serif headline */}
              <h2 style={{
                margin: 0,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.3rem,2.6vw,2.2rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                color: "#F5F0E8",
                letterSpacing: "-.01em",
              }}>
                Pure Gold.<br />
                <em style={{ fontStyle: "italic", color: "#D4A017" }}>Pure Ownership.</em>
              </h2>
            </div>

            {/* Vertical stat strip */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(4px,.6vw,7px)",
              marginTop: "clamp(8px,1.2vw,12px)",
            }}>
              {[
                { val: `₹${cr}Cr+`, label: "Assets Under Management", delay: 0 },
                { val: `${ret}%`,   label: "Equity Owned by Founders", delay: 80 },
                { val: `${yr} Yrs`, label: "Debt-Free Track Record",   delay: 160 },
              ].map((s) => (
                <div key={s.label} style={{
                  display: "flex", alignItems: "baseline", gap: "clamp(6px,1vw,10px)",
                  opacity: step >= 2 ? 1 : 0,
                  animation: step >= 2 ? `ed-left .4s ease ${s.delay}ms both` : "none",
                }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.1rem,2vw,1.65rem)",
                    fontWeight: 600, color: "#D4A017", lineHeight: 1,
                    minWidth: "clamp(52px,7vw,80px)",
                  }}>{s.val}</span>
                  <span style={{
                    fontSize: "clamp(.42rem,.58vw,.52rem)",
                    color: "rgba(245,240,232,.35)",
                    letterSpacing: ".1em", textTransform: "uppercase",
                    lineHeight: 1.4, fontWeight: 600,
                  }}>{s.label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* ════ RIGHT: Cream content ════ */}
          <div style={{
            padding: "clamp(18px,2.6vw,28px) clamp(18px,2.6vw,28px) clamp(16px,2.2vw,22px) clamp(20px,2.8vw,32px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "clamp(10px,1.4vw,16px)",
          }}>

            {/* Top: tagline + description */}
            <div style={{
              opacity: step >= 2 ? 1 : 0,
              animation: step >= 2 ? "ed-right .5s ease both" : "none",
            }}>
              <div style={{
                fontSize: "clamp(.48rem,.68vw,.58rem)",
                fontWeight: 700, letterSpacing: ".2em",
                textTransform: "uppercase", color: "#8B6914",
                marginBottom: 5,
              }}>Why Ganesh Finance</div>

              <p style={{
                margin: 0,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(.85rem,1.5vw,1.2rem)",
                fontWeight: 300,
                color: "#2A1F08",
                lineHeight: 1.65,
                letterSpacing: ".01em",
              }}>
                We built India's sovereign gold NBFC the hard way —
                no shortcuts, no borrowed capital, no outside pressure.{" "}
                <strong style={{ fontWeight: 600 }}>Six years. One vision. Zero debt.</strong>
              </p>
            </div>

            {/* Pillars — horizontal 3-col */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "clamp(6px,1vw,10px)",
            }}>
              {[
                { icon: "🔐", title: "No Investors",  body: "100% promoter equity. No dilution.",         delay: 0   },
                { icon: "🚫", title: "Zero Loans",    body: "We lend — but we never borrow.",             delay: 80  },
                { icon: "📈", title: "Day-1 Profit",  body: "Bootstrapped & cashflow-positive always.",   delay: 160 },
              ].map((p) => (
                <div key={p.title} style={{
                  padding: "clamp(7px,1vw,10px) clamp(6px,.9vw,9px)",
                  background: "rgba(139,105,20,0.06)",
                  border: "1px solid rgba(139,105,20,0.15)",
                  borderRadius: 8,
                  opacity: step >= 3 ? 1 : 0,
                  transform: step >= 3 ? "translateY(0)" : "translateY(12px)",
                  transition: `all .4s ease ${p.delay}ms`,
                }}>
                  <div style={{ fontSize: "clamp(.85rem,1.3vw,1.1rem)", marginBottom: 3 }}>{p.icon}</div>
                  <div style={{
                    fontSize: "clamp(.52rem,.72vw,.62rem)",
                    fontWeight: 700, color: "#5C3D0A",
                    textTransform: "uppercase", letterSpacing: ".1em",
                    marginBottom: 2,
                  }}>{p.title}</div>
                  <div style={{
                    fontSize: "clamp(.46rem,.64vw,.56rem)",
                    color: "#7A6040", lineHeight: 1.5, fontWeight: 300,
                  }}>{p.body}</div>
                </div>
              ))}
            </div>

            {/* Bottom: CTA + badges */}
            <div style={{
              display: "flex", alignItems: "center",
              gap: "clamp(5px,.8vw,9px)", flexWrap: "wrap",
              opacity: step >= 4 ? 1 : 0,
              transform: step >= 4 ? "translateY(0)" : "translateY(8px)",
              transition: "all .4s ease",
            }}>
              <button className="ed-btn" style={{
                padding: "clamp(5px,.8vw,8px) clamp(14px,2vw,20px)",
                background: "linear-gradient(135deg,#8B6914,#D4A017,#8B6914)",
                backgroundSize: "200% 100%",
                borderRadius: 5,
                fontFamily: "'Josefin Sans',sans-serif",
                fontSize: "clamp(.52rem,.74vw,.64rem)",
                fontWeight: 700, textTransform: "uppercase",
                letterSpacing: ".12em", color: "#F5F0E8",
                boxShadow: "0 4px 14px rgba(139,105,20,.3)",
              }}>Invest With Us →</button>

              <button className="ed-btn" style={{
                padding: "clamp(4px,.7vw,7px) clamp(12px,1.7vw,17px)",
                background: "transparent",
                border: "1px solid rgba(139,105,20,.3)",
                borderRadius: 5,
                fontFamily: "'Josefin Sans',sans-serif",
                fontSize: "clamp(.52rem,.74vw,.64rem)",
                fontWeight: 500, textTransform: "uppercase",
                letterSpacing: ".1em", color: "#7A5C1A",
                boxShadow: "none",
              }}>Learn More</button>

              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
                {/* Live dot */}
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <div style={{
                    width: 5, height: 5, borderRadius: "50%", background: "#22a86b",
                    animation: "ed-dot 2s ease infinite",
                  }} />
                  <span style={{
                    fontSize: "clamp(.4rem,.54vw,.5rem)",
                    fontWeight: 600, color: "#7A6040",
                    letterSpacing: ".1em", textTransform: "uppercase",
                  }}>Seeking Partners</span>
                </div>
                <div style={{ width: 1, height: 10, background: "rgba(139,105,20,.2)" }} />
                <span style={{
                  fontSize: "clamp(.4rem,.54vw,.5rem)",
                  color: "#9A8060", letterSpacing: ".08em", textTransform: "uppercase",
                }}>🏛️ RBI Regulated</span>
              </div>
            </div>

          </div>
        </div>

        {/* ══ BOTTOM TICKER — dark strip ══ */}
        <div style={{
          background: "#0C0A06",
          borderTop: "1px solid rgba(212,160,23,.12)",
          padding: "clamp(4px,.6vw,6px) 0",
          overflow: "hidden",
          opacity: step >= 4 ? 1 : 0,
          transition: "opacity .4s ease",
        }}>
          <div style={{
            display: "flex", gap: 40, width: "max-content",
            animation: "ed-ticker 24s linear infinite",
            userSelect: "none",
          }}>
            {[...Array(2)].map((_, r) => (
              <div key={r} style={{ display: "flex", gap: 40, alignItems: "center" }}>
                {[
                  "Zero External Debt", "Self-Funded Since 2019", "No Outside Investors",
                  "Gold Loan NBFC", "100% Founder-Owned", "RBI Regulated",
                  "Profitable Since Day 1", "Organically Expanding",
                ].map((t, i) => (
                  <span key={i} style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    fontSize: "clamp(.4rem,.56vw,.5rem)",
                    fontWeight: 500, color: "rgba(212,160,23,.3)",
                    letterSpacing: ".14em", textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}>
                    <span style={{ color: "#8B6914", fontSize: ".34rem" }}>◆</span>
                    {t}
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