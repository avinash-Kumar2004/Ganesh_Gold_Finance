import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import StatsBanner from "../HeaaderAnimated/About/Statsbanner";
import GrowthSlide from "../HeaaderAnimated/About/Growthslide";
import ServicesSection from "../HeaaderAnimated/Services/Servicessection";
import ServicesHeroSlide2 from "../HeaaderAnimated/Services/Servicesheroslide2";
import GoldHeroSlide from "../HeaaderAnimated/Services/Goldheroslide";
import InvestorHeroSlide from "../HeaaderAnimated/Investor/Investorheroslide";
import SovereignGoldSlide from "../HeaaderAnimated/Investor/Ganeshfinance sovereign";
import EditorialSlide from "../HeaaderAnimated/Investor/Ganeshfinance";
import PolicySection from "../HeaaderAnimated/policy/GaneshfinancePloiyc";
import PromoSlide from "../HeaaderAnimated/policy/Ganeshfinance";
import CareersSlide from "../HeaaderAnimated/Carriers/Ganeshfinance";
import CareersSlide2 from "../HeaaderAnimated/Carriers/GaneshfinanceCarriesr";
import DigitalInitiativeSlide from "../HeaaderAnimated/Digital/GaneshfinanceFinancee";
import InstantGoldLoanSlide from "../HeaaderAnimated/Digital/GaneshfinanceDigitl";
import GaneshFinanceContact from "../HeaaderAnimated/Contact/Ganeshfinancecontact";
// ─── Slide config ─────────────────────────────────────────────────────────────
// Use { type: "component", component: <JSX> } for animated slides
// Use { type: "image", src: "..." } for image slides
const SLIDES = {
  "/": [
    { type: "image", src: "/Home/slide1.png" },
    { type: "image", src: "/Home/slide2.png" },
    { type: "image", src: "/Home/slide3.png" },
  ],
  "/about": [
    { type: "component", component: <StatsBanner /> },  // ← animated stats
    { type: "image",     src: "/About/slide-3.png" },
    { type: "component",     component:<GrowthSlide/> },  
  ],
"/services": [
  { type: "component", component: <ServicesSection/> },
  { type: "component",   component: <GoldHeroSlide/> },
  { type: "component", component: <ServicesHeroSlide2/> },  // ← src → component
],  "/investors":           [{ type: "component", component: <InvestorHeroSlide/> }, { type: "component", component: <SovereignGoldSlide/> }, { type: "component", component: <EditorialSlide/> }],
  "/policy":              [{ type: "component", component:<PolicySection/>    }, { type: "component", component: <PromoSlide/>    }],
  "/careers":             [{ type: "component", component: <CareersSlide/>   }, { type: "component", component: <CareersSlide2/>  }],
  "/digital-initiatives": [{ type: "component",component: <DigitalInitiativeSlide/>  }, { type: "component", component: <InstantGoldLoanSlide/> }],
  "/contact":             [{ type: "component", component: <GaneshFinanceContact/>   }],
};

export default function Slider() {
  const { pathname } = useLocation();
  const slides = SLIDES[pathname] ?? SLIDES["/"];
  const [current, setCurrent] = useState(0);
  const timer = useRef(null);

  useEffect(() => { setCurrent(0); }, [pathname]);

  const startTimer = (slideList) => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setCurrent(p => (p + 1) % slideList.length);
    }, 7000);
  };

  useEffect(() => {
    startTimer(slides);
    return () => clearInterval(timer.current);
  }, [pathname]);

  const goTo = (i) => {
    setCurrent(i);
    startTimer(slides);
  };

  const activeSlide = slides[current];

  return (
    <div style={{ background: "#fff" }}>

      {/* ── Slide area ── */}
      <div style={{
        width: "99vw",
        margin: "0 auto",
        overflow: "hidden",
        position: "relative",
        background: "#f4f4f4",
      }}>
        {slides.map((slide, i) => (
          <div
            key={i}
            style={{
              position: i === 0 ? "relative" : "absolute",
              top: 0, left: 0,
              width: "100%",
              opacity: i === current ? 1 : 0,
              pointerEvents: i === current ? "auto" : "none",
              transition: "opacity 0.55s ease-in-out",
              zIndex: i === current ? 1 : 0,
            }}
          >
            {slide.type === "image" ? (
              <img
                src={slide.src}
                alt={`slide-${i + 1}`}
                draggable={false}
                style={{
                  width: "100%",
                  aspectRatio: "16/9",
                  maxHeight: "50vh",
                  objectFit: "fill",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            ) : (
              // Component slide — no fixed height, renders naturally
              <div style={{ width: "100%" }}>
                {slide.component}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Dots ── */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        padding: "8px 0 12px",
        background: "#fff",
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            style={{
              width:        i === current ? "22px" : "9px",
              height:       "9px",
              borderRadius: "999px",
              border:       "none",
              cursor:       "pointer",
              background:   i === current ? "#dc2626" : "#d1d5db",
              transition:   "all 0.3s ease",
              padding:      0,
            }}
          />
        ))}
      </div>

    </div>
  );
}