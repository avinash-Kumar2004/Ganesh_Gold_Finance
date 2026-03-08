import { useEffect, useRef, useState } from "react";

const POLICIES = [
  { icon: "⚖️", name: "Fair Practices Code" },
  { icon: "🤝", name: "Code of Conduct" },
  { icon: "📊", name: "Interest Rate Policy" },
  { icon: "🔒", name: "Privacy Policy" },
  { icon: "🛡️", name: "Vigil Mechanism" },
  { icon: "👥", name: "Policy for Investors" },
  { icon: "📈", name: "Securities Trading Rules" },
  { icon: "📱", name: "App Disclaimer" },
  { icon: "🏛️", name: "Auction Policy" },
  { icon: "📋", name: "Loan Policy" },
  { icon: "✅", name: "Code of Fair Practices" },
  { icon: "📜", name: "Terms & Conditions" },
  { icon: "🌱", name: "CSR Policy" },
  { icon: "🔍", name: "Statutory Auditors Policy" },
  { icon: "🌍", name: "Human Rights Policy" },
  { icon: "🤲", name: "Diversity & Equal Opportunity" },
  { icon: "📣", name: "Responsible Advocacy" },
  { icon: "🫱", name: "Stakeholders Engagement" },
];

function PolicyCard({ icon, name, index, visible }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 7,
        padding: "clamp(5px,.7vw,8px) clamp(6px,.9vw,10px)",
        background: hov ? "rgba(139,105,20,0.08)" : "rgba(139,105,20,0.03)",
        border: `1px solid ${hov ? "rgba(139,105,20,0.3)" : "rgba(139,105,20,0.1)"}`,
        borderRadius: 7,
        cursor: "default",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: `opacity .4s ease ${(index % 9) * 45}ms, transform .4s cubic-bezier(.34,1.1,.64,1) ${(index % 9) * 45}ms, background .2s, border-color .2s`,
        position: "relative", overflow: "hidden",
      }}
    >
      {/* hover top line */}
      <div style={{
        position: "absolute", top: 0,
        left: hov ? "0%" : "50%", right: hov ? "0%" : "50%",
        height: 1.5,
        background: "linear-gradient(90deg,#8B6914,#D4A017,#8B6914)",
        transition: "left .3s ease, right .3s ease",
      }} />
      <span style={{ fontSize: "clamp(.7rem,1vw,.85rem)", flexShrink: 0 }}>{icon}</span>
      <span style={{
        fontSize: "clamp(.48rem,.68vw,.6rem)",
        fontWeight: 600, color: hov ? "#5C3D0A" : "#7A6040",
        lineHeight: 1.3, letterSpacing: ".01em",
        transition: "color .2s",
      }}>{name}</span>
      <span style={{
        marginLeft: "auto", fontSize: ".55rem",
        color: hov ? "rgba(139,105,20,.6)" : "rgba(139,105,20,.2)",
        flexShrink: 0, transition: "color .2s",
      }}>→</span>
    </div>
  );
}

export default function PolicySlide() {
  const ref = useRef(null);
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState("");

  const filtered = POLICIES.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    const run = () => {
      setStep(0); setVisible(false);
      setTimeout(() => setStep(1), 60);
      setTimeout(() => setStep(2), 300);
      setTimeout(() => { setStep(3); setVisible(true); }, 560);
      setTimeout(() => setStep(4), 850);
    };
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) run(); else { setStep(0); setVisible(false); } },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;0,700;1,600&family=Josefin+Sans:wght@300;400;600;700&display=swap');

        @keyframes pl-left  { from{opacity:0;transform:translateX(-18px)} to{opacity:1;transform:translateX(0)} }
        @keyframes pl-right { from{opacity:0;transform:translateX(18px)} to{opacity:1;transform:translateX(0)} }
        @keyframes pl-up    { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pl-ticker{ from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes pl-dot   { 0%,100%{opacity:.3} 50%{opacity:1} }
        @keyframes pl-shine { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

        .pl-search { transition: border-color .2s, background .2s; }
        .pl-search::placeholder { color: rgba(90,60,10,.35); }
        .pl-search:focus { outline:none; border-color:rgba(139,105,20,.5) !important; }
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
        {/* Gold top line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: "linear-gradient(90deg,#8B6914,#D4A017,#F5C842,#D4A017,#8B6914)",
          zIndex: 10,
        }} />

        {/* Diagonal dark left panel */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: "38%",
          background: "linear-gradient(160deg,#0C0A06 0%,#1A1208 100%)",
          clipPath: "polygon(0 0,100% 0,82% 100%,0 100%)",
          zIndex: 0,
        }} />

        {/* Grain */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.015,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }} />

        {/* ══ SAME GRID STRUCTURE AS EDITORIAL ══ */}
        <div style={{
          position: "relative", zIndex: 2,
          display: "grid",
          gridTemplateColumns: "38% 1fr",
          /* EXACT same minHeight as editorial slide */
          minHeight: "clamp(240px, 32vw, 440px)",
        }}>

          {/* ── LEFT: dark panel ── */}
          <div style={{
            padding: "clamp(18px,2.6vw,28px) clamp(14px,2vw,22px) clamp(16px,2.2vw,22px)",
            display: "flex", flexDirection: "column",
            justifyContent: "space-between",
            color: "#F5F0E8",
          }}>

            {/* Brand */}
            <div style={{
              opacity: step >= 1 ? 1 : 0,
              animation: step >= 1 ? "pl-left .45s ease both" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <img src="/half logo.png" alt=""
                  style={{ width: "clamp(22px,2.8vw,32px)", height: "clamp(22px,2.8vw,32px)", borderRadius: "50%", objectFit: "contain" }}
                  onError={e => e.target.style.display = "none"}
                />
                <div style={{ width: 1, height: "clamp(18px,2.5vw,26px)", background: "rgba(212,160,23,.4)" }} />
                <div>
                  <div style={{ fontSize: "clamp(.54rem,.75vw,.64rem)", fontWeight: 700, letterSpacing: ".18em", textTransform: "uppercase", color: "#D4A017", lineHeight: 1.2 }}>Ganesh Finance</div>
                  <div style={{ fontSize: "clamp(.4rem,.55vw,.5rem)", color: "rgba(245,240,232,.3)", letterSpacing: ".1em", textTransform: "uppercase" }}>NBFC · Est. 2019</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <div style={{ width: 20, height: 1, background: "#D4A017" }} />
                <span style={{ fontSize: "clamp(.42rem,.58vw,.52rem)", letterSpacing: ".2em", textTransform: "uppercase", color: "rgba(212,160,23,.65)", fontWeight: 600 }}>Governance</span>
              </div>

              <h2 style={{
                margin: 0,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(1.3rem,2.6vw,2.2rem)",
                fontWeight: 700, lineHeight: 1.05,
                color: "#F5F0E8", letterSpacing: "-.01em",
              }}>
                Policies &<br />
                <em style={{ fontStyle: "italic", color: "#D4A017" }}>Compliance.</em>
              </h2>

              <p style={{
                margin: "8px 0 0",
                fontSize: "clamp(.44rem,.62vw,.54rem)",
                color: "rgba(245,240,232,.28)",
                lineHeight: 1.65, fontWeight: 300,
              }}>
                Transparent governance at every level — all policies RBI-compliant & publicly accessible.
              </p>
            </div>

            {/* Stats bottom */}
            <div style={{
              display: "flex", flexDirection: "column",
              gap: "clamp(4px,.6vw,7px)",
            }}>
              {[
                { val: "18", label: "Active Policies",     delay: 0   },
                { val: "RBI", label: "Regulated Framework", delay: 80  },
                { val: "100%", label: "Public Disclosure",  delay: 160 },
              ].map((s) => (
                <div key={s.label} style={{
                  display: "flex", alignItems: "baseline", gap: "clamp(6px,1vw,10px)",
                  opacity: step >= 2 ? 1 : 0,
                  animation: step >= 2 ? `pl-left .4s ease ${s.delay}ms both` : "none",
                }}>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.1rem,2vw,1.65rem)",
                    fontWeight: 600, color: "#D4A017", lineHeight: 1,
                    minWidth: "clamp(42px,6vw,68px)",
                  }}>{s.val}</span>
                  <span style={{
                    fontSize: "clamp(.42rem,.58vw,.52rem)",
                    color: "rgba(245,240,232,.32)",
                    letterSpacing: ".1em", textTransform: "uppercase",
                    lineHeight: 1.4, fontWeight: 600,
                  }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: cream panel ── */}
          <div style={{
            padding: "clamp(18px,2.6vw,28px) clamp(16px,2.2vw,26px) clamp(14px,2vw,22px) clamp(18px,2.5vw,30px)",
            display: "flex", flexDirection: "column",
            justifyContent: "space-between",
            gap: "clamp(8px,1.2vw,14px)",
          }}>

            {/* Search + count */}
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between", gap: 10,
              opacity: step >= 2 ? 1 : 0,
              animation: step >= 2 ? "pl-right .45s ease both" : "none",
            }}>
              <div style={{
                fontSize: "clamp(.46rem,.65vw,.56rem)",
                fontWeight: 700, letterSpacing: ".16em",
                textTransform: "uppercase", color: "#8B6914",
              }}>All Policies</div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  padding: "2px 9px",
                  background: "rgba(139,105,20,.08)",
                  border: "1px solid rgba(139,105,20,.15)",
                  borderRadius: 99,
                  fontSize: "clamp(.44rem,.62vw,.54rem)",
                  fontWeight: 600, color: "#8B6914",
                }}>{filtered.length} policies</div>

                <input
                  className="pl-search"
                  type="text"
                  placeholder="Search…"
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  style={{
                    padding: "clamp(3px,.5vw,5px) clamp(8px,1.1vw,11px)",
                    background: "rgba(139,105,20,.05)",
                    border: "1px solid rgba(139,105,20,.2)",
                    borderRadius: 5,
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: "clamp(.46rem,.64vw,.56rem)",
                    color: "#5C3D0A",
                    width: "clamp(80px,12vw,130px)",
                  }}
                />
              </div>
            </div>

            {/* Policy grid */}
            <div style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "clamp(4px,.6vw,7px)",
              alignContent: "start",
            }}>
              {filtered.length > 0 ? filtered.map((p, i) => (
                <PolicyCard key={p.name} icon={p.icon} name={p.name} index={i} visible={visible} />
              )) : (
                <div style={{
                  gridColumn: "1/-1", textAlign: "center",
                  padding: "20px",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(.8rem,1.3vw,1rem)",
                  fontStyle: "italic",
                  color: "rgba(90,60,10,.3)",
                }}>No policies found for "{filter}"</div>
              )}
            </div>

            {/* Footer chips */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap",
              opacity: step >= 4 ? 1 : 0,
              transition: "opacity .4s ease",
            }}>
              {["RBI Compliant", "Publicly Disclosed", "Regularly Updated"].map((tag) => (
                <div key={tag} style={{
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "2px 8px",
                  background: "rgba(139,105,20,.05)",
                  border: "1px solid rgba(139,105,20,.12)",
                  borderRadius: 99,
                }}>
                  <span style={{ fontSize: ".45rem", color: "#22a86b" }}>✓</span>
                  <span style={{
                    fontSize: "clamp(.4rem,.55vw,.5rem)",
                    fontWeight: 600, color: "#8B7040",
                    letterSpacing: ".08em", textTransform: "uppercase",
                  }}>{tag}</span>
                </div>
              ))}
              <div style={{ marginLeft: "auto" }}>
                <span style={{ fontSize: "clamp(.38rem,.52vw,.48rem)", color: "rgba(90,60,10,.25)", letterSpacing: ".03em" }}>
                  *All policies governed under RBI's NBFC framework.
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Ticker — same as editorial */}
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
            animation: "pl-ticker 24s linear infinite",
            userSelect: "none",
          }}>
            {[...Array(2)].map((_, r) => (
              <div key={r} style={{ display: "flex", gap: 40, alignItems: "center" }}>
                {["Fair Practices", "RBI Compliant", "Investor Policy", "Privacy Protected",
                  "Zero Tolerance", "Public Disclosure", "Ethical Lending", "Transparent Governance"].map((t, i) => (
                  <span key={i} style={{
                    display: "inline-flex", alignItems: "center", gap: 7,
                    fontSize: "clamp(.4rem,.56vw,.5rem)", fontWeight: 500,
                    color: "rgba(212,160,23,.3)", letterSpacing: ".14em",
                    textTransform: "uppercase", whiteSpace: "nowrap",
                  }}>
                    <span style={{ color: "#8B6914", fontSize: ".34rem" }}>◆</span>{t}
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