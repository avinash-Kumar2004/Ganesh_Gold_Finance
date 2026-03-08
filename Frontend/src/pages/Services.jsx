import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../Common/Navbaar"; // ← exports LanguageContext + useLanguage

// ═══════════════════════════════════════════════════════════════════════════════
// ─── SERVICE TRANSLATIONS
// Each service has translations per language code.
// "label" key in TRANSLATIONS matches the service id.
// ═══════════════════════════════════════════════════════════════════════════════
const SERVICE_TRANSLATIONS = {
  en: {
    section_title:         "Services We Provide",
    "gold-flexi-credit":   "Gold Flexi Credit",
    "credit-score":        "Credit Score",
    "gold-loan":           "Gold Loan",
    "gold-loan-at-home":   "#Gold Loan at Home",
    "housing-finance":     "Housing Finance",
    "personal-loan":       "Personal Loan",
    "small-business-loan": "Small Business Loan",
    "insurance":           "Insurance",
    "sme-loan":            "SME Loan",
    "corporate-business-loan": "Corporate Business Loan",
    "vehicle-loan":        "Vehicle Loan",
    "mutual-funds":        "Mutual Funds",
    "money-transfer":      "Money Transfer",
    "ncd":                 "NCD",
    "custom-offers":       "Custom Offers",
    "pan-card":            "PAN Card",
    "micro-finance":       "Micro Finance",
    "digital-cashless":    "Digital & Cashless",
    "milligram-rewards":   "Milligram Rewards",
    "nps":                 "NPS",
    "bank-mapping":        "Bank Mapping",
  },
  hi: {
    section_title:         "हमारी सेवाएं",
    "gold-flexi-credit":   "गोल्ड फ्लेक्सी क्रेडिट",
    "credit-score":        "क्रेडिट स्कोर",
    "gold-loan":           "गोल्ड लोन",
    "gold-loan-at-home":   "#घर पर गोल्ड लोन",
    "housing-finance":     "हाउसिंग फाइनेंस",
    "personal-loan":       "पर्सनल लोन",
    "small-business-loan": "लघु व्यवसाय ऋण",
    "insurance":           "बीमा",
    "sme-loan":            "SME लोन",
    "corporate-business-loan": "कॉर्पोरेट बिज़नेस लोन",
    "vehicle-loan":        "वाहन ऋण",
    "mutual-funds":        "म्यूचुअल फंड",
    "money-transfer":      "मनी ट्रांसफर",
    "ncd":                 "NCD",
    "custom-offers":       "कस्टम ऑफर",
    "pan-card":            "पैन कार्ड",
    "micro-finance":       "माइक्रो फाइनेंस",
    "digital-cashless":    "डिजिटल और कैशलेस",
    "milligram-rewards":   "मिलीग्राम रिवार्ड्स",
    "nps":                 "NPS",
    "bank-mapping":        "बैंक मैपिंग",
  },
  mr: {
    section_title:         "आमच्या सेवा",
    "gold-flexi-credit":   "गोल्ड फ्लेक्सी क्रेडिट",
    "credit-score":        "क्रेडिट स्कोर",
    "gold-loan":           "गोल्ड कर्ज",
    "gold-loan-at-home":   "#घरी गोल्ड कर्ज",
    "housing-finance":     "गृहनिर्माण वित्त",
    "personal-loan":       "वैयक्तिक कर्ज",
    "small-business-loan": "लघु व्यवसाय कर्ज",
    "insurance":           "विमा",
    "sme-loan":            "SME कर्ज",
    "corporate-business-loan": "कॉर्पोरेट व्यवसाय कर्ज",
    "vehicle-loan":        "वाहन कर्ज",
    "mutual-funds":        "म्युच्युअल फंड",
    "money-transfer":      "पैसे हस्तांतरण",
    "ncd":                 "NCD",
    "custom-offers":       "सानुकूल ऑफर",
    "pan-card":            "पॅन कार्ड",
    "micro-finance":       "सूक्ष्म वित्त",
    "digital-cashless":    "डिजिटल आणि कॅशलेस",
    "milligram-rewards":   "मिलीग्राम पुरस्कार",
    "nps":                 "NPS",
    "bank-mapping":        "बँक मॅपिंग",
  },
  gu: {
    section_title:         "અમારી સેવાઓ",
    "gold-flexi-credit":   "ગોલ્ડ ફ્લેક્સી ક્રેડિટ",
    "credit-score":        "ક્રેડિટ સ્કોર",
    "gold-loan":           "ગોલ્ડ લોન",
    "gold-loan-at-home":   "#ઘરે ગોલ્ડ લોન",
    "housing-finance":     "હાઉસિંગ ફાઇનાન્સ",
    "personal-loan":       "પર્સનલ લોન",
    "small-business-loan": "નાના વ્યવસાય ઋણ",
    "insurance":           "વીમો",
    "sme-loan":            "SME લોન",
    "corporate-business-loan": "કોર્પોરેટ બિઝનેસ લોન",
    "vehicle-loan":        "વાહન ઋણ",
    "mutual-funds":        "મ્યુચ્યુઅલ ફંડ",
    "money-transfer":      "મની ટ્રાન્સફર",
    "ncd":                 "NCD",
    "custom-offers":       "કસ્ટમ ઑફર",
    "pan-card":            "પૅન કાર્ડ",
    "micro-finance":       "માઇક્રો ફાઇનાન્સ",
    "digital-cashless":    "ડિજિટલ અને કેશલેસ",
    "milligram-rewards":   "મિલીગ્રામ રિવૉર્ડ્સ",
    "nps":                 "NPS",
    "bank-mapping":        "બૅન્ક મૅપિંગ",
  },
  te: {
    section_title:         "మా సేవలు",
    "gold-flexi-credit":   "గోల్డ్ ఫ్లెక్సీ క్రెడిట్",
    "credit-score":        "క్రెడిట్ స్కోర్",
    "gold-loan":           "గోల్డ్ లోన్",
    "gold-loan-at-home":   "#ఇంట్లో గోల్డ్ లోన్",
    "housing-finance":     "హౌసింగ్ ఫైనాన్స్",
    "personal-loan":       "వ్యక్తిగత రుణం",
    "small-business-loan": "చిన్న వ్యాపార రుణం",
    "insurance":           "బీమా",
    "sme-loan":            "SME లోన్",
    "corporate-business-loan": "కార్పొరేట్ బిజినెస్ లోన్",
    "vehicle-loan":        "వాహన రుణం",
    "mutual-funds":        "మ్యూచువల్ ఫండ్స్",
    "money-transfer":      "మనీ ట్రాన్స్ఫర్",
    "ncd":                 "NCD",
    "custom-offers":       "కస్టమ్ ఆఫర్లు",
    "pan-card":            "పాన్ కార్డ్",
    "micro-finance":       "మైక్రో ఫైనాన్స్",
    "digital-cashless":    "డిజిటల్ & క్యాష్‌లెస్",
    "milligram-rewards":   "మిల్లీగ్రామ్ రివార్డ్స్",
    "nps":                 "NPS",
    "bank-mapping":        "బ్యాంక్ మ్యాపింగ్",
  },
  ta: {
    section_title:         "எங்கள் சேவைகள்",
    "gold-flexi-credit":   "தங்க ஃப்ளெக்சி கிரெடிட்",
    "credit-score":        "கடன் மதிப்பெண்",
    "gold-loan":           "தங்கக் கடன்",
    "gold-loan-at-home":   "#வீட்டில் தங்கக் கடன்",
    "housing-finance":     "வீட்டு நிதி",
    "personal-loan":       "தனிப்பட்ட கடன்",
    "small-business-loan": "சிறு வணிகக் கடன்",
    "insurance":           "காப்பீடு",
    "sme-loan":            "SME கடன்",
    "corporate-business-loan": "கார்ப்பரேட் வணிகக் கடன்",
    "vehicle-loan":        "வாகனக் கடன்",
    "mutual-funds":        "மியூச்சுவல் ஃபண்ட்",
    "money-transfer":      "பணப் பரிமாற்றம்",
    "ncd":                 "NCD",
    "custom-offers":       "தனிப்பயன் சலுகைகள்",
    "pan-card":            "பான் கார்டு",
    "micro-finance":       "நுண்ணிய நிதி",
    "digital-cashless":    "டிஜிட்டல் & கேஷ்லெஸ்",
    "milligram-rewards":   "மில்லிகிராம் வெகுமதிகள்",
    "nps":                 "NPS",
    "bank-mapping":        "வங்கி மேப்பிங்",
  },
  kn: {
    section_title:         "ನಮ್ಮ ಸೇವೆಗಳು",
    "gold-flexi-credit":   "ಗೋಲ್ಡ್ ಫ್ಲೆಕ್ಸಿ ಕ್ರೆಡಿಟ್",
    "credit-score":        "ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್",
    "gold-loan":           "ಗೋಲ್ಡ್ ಲೋನ್",
    "gold-loan-at-home":   "#ಮನೆಯಲ್ಲಿ ಗೋಲ್ಡ್ ಲೋನ್",
    "housing-finance":     "ಹೌಸಿಂಗ್ ಫೈನಾನ್ಸ್",
    "personal-loan":       "ವೈಯಕ್ತಿಕ ಸಾಲ",
    "small-business-loan": "ಸಣ್ಣ ವ್ಯಾಪಾರ ಸಾಲ",
    "insurance":           "ವಿಮೆ",
    "sme-loan":            "SME ಸಾಲ",
    "corporate-business-loan": "ಕಾರ್ಪೊರೇಟ್ ವ್ಯಾಪಾರ ಸಾಲ",
    "vehicle-loan":        "ವಾಹನ ಸಾಲ",
    "mutual-funds":        "ಮ್ಯೂಚುವಲ್ ಫಂಡ್",
    "money-transfer":      "ಹಣ ವರ್ಗಾವಣೆ",
    "ncd":                 "NCD",
    "custom-offers":       "ಕಸ್ಟಮ್ ಆಫರ್‌ಗಳು",
    "pan-card":            "ಪ್ಯಾನ್ ಕಾರ್ಡ್",
    "micro-finance":       "ಸೂಕ್ಷ್ಮ ಹಣಕಾಸು",
    "digital-cashless":    "ಡಿಜಿಟಲ್ & ಕ್ಯಾಶ್‌ಲೆಸ್",
    "milligram-rewards":   "ಮಿಲ್ಲಿಗ್ರಾಮ್ ರಿವಾರ್ಡ್ಸ್",
    "nps":                 "NPS",
    "bank-mapping":        "ಬ್ಯಾಂಕ್ ಮ್ಯಾಪಿಂಗ್",
  },
  as: {
    section_title:         "আমাৰ সেৱাসমূহ",
    "gold-flexi-credit":   "গোল্ড ফ্লেক্সি ক্ৰেডিট",
    "credit-score":        "ক্ৰেডিট স্কোৰ",
    "gold-loan":           "গোল্ড লোন",
    "gold-loan-at-home":   "#ঘৰতে গোল্ড লোন",
    "housing-finance":     "হাউজিং ফাইনেন্স",
    "personal-loan":       "ব্যক্তিগত ঋণ",
    "small-business-loan": "ক্ষুদ্ৰ ব্যৱসায় ঋণ",
    "insurance":           "বীমা",
    "sme-loan":            "SME লোন",
    "corporate-business-loan": "কৰ্পোৰেট বিজনেছ লোন",
    "vehicle-loan":        "বাহন ঋণ",
    "mutual-funds":        "মিউচুৱেল ফাণ্ড",
    "money-transfer":      "টকা হস্তান্তৰ",
    "ncd":                 "NCD",
    "custom-offers":       "কাষ্টম অফাৰ",
    "pan-card":            "পেন কাৰ্ড",
    "micro-finance":       "মাইক্ৰো ফাইনেন্স",
    "digital-cashless":    "ডিজিটেল আৰু কেশলেছ",
    "milligram-rewards":   "মিলিগ্ৰাম ৰিৱাৰ্ড",
    "nps":                 "NPS",
    "bank-mapping":        "বেংক মেপিং",
  },
  ur: {
    section_title:         "ہماری خدمات",
    "gold-flexi-credit":   "گولڈ فلیکسی کریڈٹ",
    "credit-score":        "کریڈٹ اسکور",
    "gold-loan":           "گولڈ لون",
    "gold-loan-at-home":   "#گھر پر گولڈ لون",
    "housing-finance":     "ہاؤسنگ فائنانس",
    "personal-loan":       "ذاتی قرضہ",
    "small-business-loan": "چھوٹے کاروبار کا قرضہ",
    "insurance":           "بیمہ",
    "sme-loan":            "SME لون",
    "corporate-business-loan": "کارپوریٹ بزنس لون",
    "vehicle-loan":        "گاڑی کا قرضہ",
    "mutual-funds":        "میوچوئل فنڈز",
    "money-transfer":      "رقم کی منتقلی",
    "ncd":                 "NCD",
    "custom-offers":       "خصوصی آفرز",
    "pan-card":            "پین کارڈ",
    "micro-finance":       "مائیکرو فائنانس",
    "digital-cashless":    "ڈیجیٹل اور کیش لیس",
    "milligram-rewards":   "ملی گرام ریوارڈز",
    "nps":                 "NPS",
    "bank-mapping":        "بینک میپنگ",
  },
};

// Helper: get translated label for a service id
function getLabel(lang, id) {
  return (
    SERVICE_TRANSLATIONS[lang]?.[id] ??
    SERVICE_TRANSLATIONS["en"][id] ??
    id
  );
}
function getSectionTitle(lang) {
  return (
    SERVICE_TRANSLATIONS[lang]?.section_title ??
    SERVICE_TRANSLATIONS["en"].section_title
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── SERVICE DATA — icons from /public/services/
// ═══════════════════════════════════════════════════════════════════════════════
const SERVICES = [
  { id: "gold-flexi-credit",       icon: "service/cred-1.png",  route: "/services/gold-flexi-credit" },
  { id: "credit-score",            icon: "service/cred-4.png",  route: "/services/credit-score" },
  { id: "gold-loan",               icon: "service/cred-2.png",  route: "/services/gold-loan" },
  { id: "gold-loan-at-home",       icon: "service/cred-3.png",  route: "/services/gold-loan-at-home" },
  { id: "housing-finance",         icon: "service/cred-3s.png",  route: "/services/housing-finance" },
  { id: "personal-loan",           icon: "service/cred-4.png",  route: "/services/personal-loan" },
  { id: "small-business-loan",     icon: "service/cred-6.png",  route: "/services/small-business-loan" },
  { id: "insurance",               icon: "service/cred-5.png",  route: "/services/insurance" },
  { id: "sme-loan",                icon: "service/cred-1.png",  route: "/services/sme-loan" },
  { id: "corporate-business-loan", icon: "service/cred-1.png", route: "/services/corporate-business-loan" },
  { id: "vehicle-loan",            icon: "service/cred-7.png", route: "/services/vehicle-loan" },
  { id: "mutual-funds",            icon: "service/cred-9.png", route: "/services/mutual-funds" },
  { id: "money-transfer",          icon: "service/cred-10.png", route: "/services/money-transfer" },
  { id: "ncd",                     icon: "service/cred-11.png", route: "/services/ncd" },
  { id: "custom-offers",           icon: "service/cred-11.webp", route: "/services/custom-offers" },
  { id: "pan-card",                icon: "service/cred-12.png", route: "/services/pan-card" },
  { id: "micro-finance",           icon: "service/cred-1.png", route: "/services/micro-finance" },
  { id: "digital-cashless",        icon: "service/cred-10.png", route: "/services/digital-cashless" },
  { id: "milligram-rewards",       icon: "service/cred-11.png", route: "/services/milligram-rewards" },
  { id: "nps",                     icon: "service/cred-4.png", route: "/services/nps" },
  { id: "bank-mapping",            icon: "service/cred-15.png", route: "/services/bank-mapping" },
];

// ─── Responsive visible count (desktop carousel) ──────────────────────────────
function getVisibleCount() {
  if (typeof window === "undefined") return 7;
  const w = window.innerWidth;
  if (w < 1280) return 6;
  return 7;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ServiceCard
// ═══════════════════════════════════════════════════════════════════════════════
function ServiceCard({ service, onClick, compact = false, lang = "en" }) {
  const [imgErr, setImgErr]     = useState(false);
  const [hovered, setHovered]   = useState(false);
  const label                   = getLabel(lang, service.id);
  const isRTL                   = lang === "ur";

  return (
    <button
      onClick={() => onClick(service.route)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={label}
      dir={isRTL ? "rtl" : "ltr"}
      className="flex flex-col items-center justify-start bg-white rounded-2xl border outline-none select-none w-full focus-visible:ring-2 focus-visible:ring-red-400"
      style={{
        padding: compact ? "10px 6px 8px" : "14px 8px 12px",
        gap: compact ? 6 : 10,
        borderColor: hovered ? "rgba(185,28,28,0.2)" : "#ededed",
        boxShadow: hovered
          ? "0 8px 28px rgba(185,28,28,0.12), 0 2px 8px rgba(0,0,0,0.06)"
          : "0 1px 5px rgba(0,0,0,0.055)",
        transform: hovered ? "translateY(-5px) scale(1.035)" : "translateY(0) scale(1)",
        transition: "all 0.22s cubic-bezier(.34,1.56,.64,1)",
        cursor: "pointer",
      }}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center rounded-xl flex-shrink-0"
        style={{
          width: compact ? 52 : 64,
          height: compact ? 52 : 64,
          background: hovered ? "linear-gradient(135deg,#fff7ed,#fef9ee)" : "#f7f7f7",
          border: hovered ? "1.5px solid rgba(212,160,23,0.28)" : "1.5px solid #efefef",
          transition: "all 0.22s ease",
          overflow: "hidden",
        }}
      >
        {!imgErr ? (
          <img
            src={`/${service.icon}`}
            alt={label}
            onError={() => setImgErr(true)}
            style={{ width: compact ? 36 : 44, height: compact ? 36 : 44, objectFit: "contain" }}
          />
        ) : (
          <span style={{ fontSize: compact ? 24 : 30 }}>💰</span>
        )}
      </div>

      {/* Label — transitions smoothly when language changes */}
      <span
        className="font-bold uppercase text-center leading-tight"
        style={{
          fontSize: compact ? "0.6rem" : "0.65rem",
          letterSpacing: "0.05em",
          color: hovered ? "#991B1B" : "#B91C1C",
          transition: "color 0.18s",
          wordBreak: "break-word",
          maxWidth: compact ? 76 : 94,
          // Script-aware: reduce letter-spacing for Indic scripts
          ...(lang !== "en" && { letterSpacing: "0.02em" }),
        }}
      >
        {label}
      </span>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Arrow
// ═══════════════════════════════════════════════════════════════════════════════
function Arrow({ dir, onClick }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      aria-label={dir === "left" ? "Previous services" : "Next services"}
      className="flex-shrink-0 flex items-center justify-center rounded-full bg-white outline-none focus-visible:ring-2 focus-visible:ring-red-400"
      style={{
        width: 38, height: 38,
        border: "2px solid #e5e7eb",
        boxShadow: "0 2px 10px rgba(0,0,0,0.09)",
        transform: pressed ? "scale(0.9)" : "scale(1)",
        transition: "transform 0.12s ease",
        cursor: "pointer", zIndex: 10,
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="#B91C1C" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        {dir === "left"
          ? <polyline points="15 18 9 12 15 6" />
          : <polyline points="9 18 15 12 9 6" />}
      </svg>
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Dots
// ═══════════════════════════════════════════════════════════════════════════════
function Dots({ total, active }) {
  return (
    <div className="flex items-center justify-center gap-1.5 mt-4">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          height: 5,
          width: i === active ? 22 : 5,
          borderRadius: 99,
          background: i === active ? "linear-gradient(90deg,#B91C1C,#D4A017)" : "#e2e2e2",
          transition: "width 0.3s cubic-bezier(.34,1.56,.64,1), background 0.2s",
        }} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Desktop Carousel
// ═══════════════════════════════════════════════════════════════════════════════
function DesktopCarousel({ onNavigate, lang }) {
  const [idx, setIdx]       = useState(0);
  const [vis, setVis]       = useState(getVisibleCount());
  const [paused, setPaused] = useState(false);
  const autoRef             = useRef(null);

  const maxIdx    = SERVICES.length - vis;
  const totalDots = Math.ceil(SERVICES.length / vis);
  const activeDot = Math.min(Math.round(idx / Math.max(vis, 1)), totalDots - 1);

  useEffect(() => {
    const fn = () => setVis(getVisibleCount());
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  useEffect(() => {
    if (idx > SERVICES.length - vis) setIdx(Math.max(0, SERVICES.length - vis));
  }, [vis]);

  const startAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      if (!paused) setIdx(p => (p >= maxIdx ? 0 : p + 1));
    }, 5000);
  }, [paused, maxIdx]);

  useEffect(() => { startAuto(); return () => clearInterval(autoRef.current); }, [startAuto]);

  const go = (dir) => {
    setIdx(p => dir === "right" ? (p >= maxIdx ? 0 : p + 1) : (p <= 0 ? maxIdx : p - 1));
    startAuto();
  };

  return (
    <div
      className="hidden lg:flex flex-col items-center w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center gap-3" style={{ width: "95vw", maxWidth: 1580 }}>
        <Arrow dir="left" onClick={() => go("left")} />

        <div className="flex-1 overflow-hidden rounded-2xl bg-white"
          style={{
            boxShadow: "0 4px 32px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
            border: "1px solid #efefef",
            padding: "18px 10px",
          }}
        >
          <div className="flex"
            style={{
              transform: `translateX(${-(idx * (100 / vis))}%)`,
              transition: "transform 0.42s cubic-bezier(0.25,0.46,0.45,0.94)",
              willChange: "transform",
            }}
          >
            {SERVICES.map((s, i) => (
              <div key={s.id}
                style={{
                  flex: `0 0 ${100 / vis}%`,
                  maxWidth: `${100 / vis}%`,
                  padding: "0 5px",
                  borderRight: i < SERVICES.length - 1 ? "1px solid #f3f3f3" : "none",
                  boxSizing: "border-box",
                }}
              >
                <ServiceCard service={s} onClick={onNavigate} lang={lang} />
              </div>
            ))}
          </div>
        </div>

        <Arrow dir="right" onClick={() => go("right")} />
      </div>
      <Dots total={totalDots} active={activeDot} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Mobile 2-col Grid
// ═══════════════════════════════════════════════════════════════════════════════
function MobileGrid({ onNavigate, lang }) {
  return (
    <div className="lg:hidden w-full px-3 sm:px-5">
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {SERVICES.map(s => (
          <ServiceCard key={s.id} service={s} onClick={onNavigate} compact lang={lang} />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
export default function Services() {
  const navigate        = useNavigate();
  const { lang }        = useLanguage();          // ← live language from Navbar context
  const handleNav       = (route) => navigate(route);
  const title           = getSectionTitle(lang);
  const isRTL           = lang === "ur";

  return (
    <>
      <style>{`
        @keyframes headIn {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section className="w-full py-3 bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
        {/* ── Heading ── */}
        <div
          className="text-center mb-7"
          style={{ animation: "headIn 0.45s ease both" }}
          key={lang}   /* re-animate on language change */
        >
          <h2
            className="font-extrabold uppercase text-gray-900 tracking-widest"
            style={{ fontSize: "clamp(1.1rem, 2.8vw, 1.55rem)" }}
          >
            {title}
          </h2>
          <div
            className="mx-auto mt-2 rounded-full"
            style={{ width: 48, height: 3, background: "linear-gradient(90deg,#B91C1C 0%,#D4A017 100%)" }}
          />
        </div>

        {/* ── Desktop carousel ── */}
        <DesktopCarousel onNavigate={handleNav} lang={lang} />

        {/* ── Mobile 2-col grid ── */}
        <MobileGrid onNavigate={handleNav} lang={lang} />
      </section>
    </>
  );
}