import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const SLIDES = {
  "/":                    ["/Home/slide1.png",      "/Home/slide2.png",      "/Home/slide3.png"],
  "/about":               ["/About/slide1.jpg",     "/About/slide2.jpg",     "/About/slide3.jpg"],
  "/services":            ["/Services/slide1.jpg",  "/Services/slide2.jpg",  "/Services/slide3.jpg"],
  "/investors":           ["/Investors/slide1.jpg", "/Investors/slide2.jpg", "/Investors/slide3.jpg"],
  "/policy":              ["/Policy/slide1.jpg",    "/Policy/slide2.jpg",    "/Policy/slide3.jpg"],
  "/careers":             ["/Careers/slide1.jpg",   "/Careers/slide2.jpg",   "/Careers/slide3.jpg"],
  "/digital-initiatives": ["/Digital/slide1.jpg",   "/Digital/slide2.jpg",   "/Digital/slide3.jpg"],
  "/contact":             ["/Contact/slide1.jpg",   "/Contact/slide2.jpg",   "/Contact/slide3.jpg"],
};

export default function Slider() {
  const { pathname } = useLocation();
  const images = SLIDES[pathname] ?? SLIDES["/"];
  const [current, setCurrent] = useState(0);
  const timer = useRef(null);

  useEffect(() => { setCurrent(0); }, [pathname]);

  useEffect(() => {
    timer.current = setInterval(() => {
      setCurrent(p => (p + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer.current);
  }, [pathname]);

  const goTo = (i) => {
    clearInterval(timer.current);
    setCurrent(i);
    timer.current = setInterval(() => {
      setCurrent(p => (p + 1) % images.length);
    }, 5000);
  };

  return (
    <div style={{ background: "#fff" }}>

      {/* ── Slider container — exactly your CSS ── */}
      <div style={{
        width: "100vw",
        margin: "0px auto",
        overflow: "hidden",
        aspectRatio: "16 / 9",
        maxHeight: "75vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}>
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`slide-${i + 1}`}
            draggable={false}
            style={{
              width: "100%",
              height: "100%",
              margin: "2px auto",
              objectPosition: "center",
              objectFit: "fill",
              position: "absolute",
              top: 0,
              left: 0,
              opacity: i === current ? 1 : 0,
              transition: "opacity 0.5s ease-in-out",
            }}
          />
        ))}
      </div>

      {/* ── Dots — neeche center ── */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "8px",
        padding: "8px 0 12px",
        background: "#fff",
      }}>
        {images.map((_, i) => (
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