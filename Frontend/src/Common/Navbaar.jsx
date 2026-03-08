import { useState, useEffect, useRef, createContext, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";

// ═══════════════════════════════════════════════════════════════════════════════
// ─── LANGUAGE CONTEXT
// Wrap App.jsx with <LanguageProvider><BrowserRouter>...
// Use anywhere: const { t, lang } = useLanguage();
// ═══════════════════════════════════════════════════════════════════════════════
export const LanguageContext = createContext({ lang: "en", setLang: () => {}, t: (k) => k });
export const useLanguage = () => useContext(LanguageContext);

const TRANSLATIONS = {
  en: {
    home: "Home", about: "About Us", services: "Services",
    investors: "Investors", policy: "Policy", careers: "Careers",
    digital: "Digital Initiatives", contact: "Contact",
    search_placeholder: "Search services, loans, policies...",
    quick_links: "Quick Links", whatsapp_chat: "Chat on WhatsApp",
    select_lang: "Language", gold_loan: "Gold Loan",
    personal_loan: "Personal Loan", insurance: "Insurance",
    money_transfer: "Money Transfer", fixed_deposit: "Fixed Deposit",
    search_results_for: "results for", no_results: "No results found. Try another keyword.",
  },
  hi: {
    home: "होम", about: "हमारे बारे में", services: "सेवाएं",
    investors: "निवेशक", policy: "नीति", careers: "करियर",
    digital: "डिजिटल पहल", contact: "संपर्क करें",
    search_placeholder: "सेवाएं, ऋण, नीतियां खोजें...",
    quick_links: "त्वरित लिंक", whatsapp_chat: "WhatsApp पर चैट करें",
    select_lang: "भाषा", gold_loan: "गोल्ड लोन",
    personal_loan: "पर्सनल लोन", insurance: "बीमा",
    money_transfer: "मनी ट्रांसफर", fixed_deposit: "फिक्स्ड डिपॉजिट",
    search_results_for: "के लिए परिणाम", no_results: "कोई परिणाम नहीं मिला।",
  },
  mr: {
    home: "मुख्यपृष्ठ", about: "आमच्याबद्दल", services: "सेवा",
    investors: "गुंतवणूकदार", policy: "धोरण", careers: "करिअर",
    digital: "डिजिटल उपक्रम", contact: "संपर्क",
    search_placeholder: "सेवा, कर्जे, धोरणे शोधा...",
    quick_links: "जलद दुवे", whatsapp_chat: "WhatsApp वर चॅट करा",
    select_lang: "भाषा", gold_loan: "गोल्ड लोन",
    personal_loan: "वैयक्तिक कर्ज", insurance: "विमा",
    money_transfer: "पैसे हस्तांतरण", fixed_deposit: "मुदत ठेव",
    search_results_for: "साठी निकाल", no_results: "कोणतेही निकाल नाहीत.",
  },
  gu: {
    home: "હોમ", about: "અમારા વિશે", services: "સેવાઓ",
    investors: "રોકાણકારો", policy: "નીતિ", careers: "કારકિર્દી",
    digital: "ડિજિટલ પહેલ", contact: "સંપર્ક",
    search_placeholder: "સેવાઓ, લોન, નીતિઓ શોધો...",
    quick_links: "ઝડપી લિંક્સ", whatsapp_chat: "WhatsApp પર ચૅટ કરો",
    select_lang: "ભાષા", gold_loan: "ગોલ્ડ લોન",
    personal_loan: "પર્સનલ લોન", insurance: "વીમો",
    money_transfer: "મની ટ્રાન્સફર", fixed_deposit: "ફિક્સ્ડ ડિપોઝિટ",
    search_results_for: "માટે પરિણામો", no_results: "કોઈ પરિણામ મળ્યું નથી.",
  },
  te: {
    home: "హోమ్", about: "మా గురించి", services: "సేవలు",
    investors: "పెట్టుబడిదారులు", policy: "పాలసీ", careers: "ఉద్యోగాలు",
    digital: "డిజిటల్ చొరవలు", contact: "సంప్రదించండి",
    search_placeholder: "సేవలు, రుణాలు వెతకండి...",
    quick_links: "త్వరిత లింకులు", whatsapp_chat: "WhatsApp లో చాట్",
    select_lang: "భాష", gold_loan: "గోల్డ్ లోన్",
    personal_loan: "వ్యక్తిగత రుణం", insurance: "బీమా",
    money_transfer: "మనీ ట్రాన్స్ఫర్", fixed_deposit: "స్థిర డిపాజిట్",
    search_results_for: "కోసం ఫలితాలు", no_results: "ఫలితాలు కనుగొనబడలేదు.",
  },
  ta: {
    home: "முகப்பு", about: "எங்களைப் பற்றி", services: "சேவைகள்",
    investors: "முதலீட்டாளர்கள்", policy: "கொள்கை", careers: "வாழ்க்கை வாய்ப்புகள்",
    digital: "டிஜிட்டல் முயற்சிகள்", contact: "தொடர்பு கொள்ளுங்கள்",
    search_placeholder: "சேவைகள், கடன்கள் தேடுங்கள்...",
    quick_links: "விரைவு இணைப்புகள்", whatsapp_chat: "WhatsApp இல் அரட்டை",
    select_lang: "மொழி", gold_loan: "தங்கக் கடன்",
    personal_loan: "தனிப்பட்ட கடன்", insurance: "காப்பீடு",
    money_transfer: "பணப் பரிமாற்றம்", fixed_deposit: "நிரந்தர வைப்பு",
    search_results_for: "க்கான முடிவுகள்", no_results: "முடிவுகள் இல்லை.",
  },
  kn: {
    home: "ಮುಖ್ಯಪುಟ", about: "ನಮ್ಮ ಬಗ್ಗೆ", services: "ಸೇವೆಗಳು",
    investors: "ಹೂಡಿಕೆದಾರರು", policy: "ನೀತಿ", careers: "ವೃತ್ತಿ",
    digital: "ಡಿಜಿಟಲ್ ಉಪಕ್ರಮಗಳು", contact: "ಸಂಪರ್ಕಿಸಿ",
    search_placeholder: "ಸೇವೆಗಳು, ಸಾಲಗಳು ಹುಡುಕಿ...",
    quick_links: "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು", whatsapp_chat: "WhatsApp ನಲ್ಲಿ ಚಾಟ್",
    select_lang: "ಭಾಷೆ", gold_loan: "ಗೋಲ್ಡ್ ಲೋನ್",
    personal_loan: "ವೈಯಕ್ತಿಕ ಸಾಲ", insurance: "ವಿಮೆ",
    money_transfer: "ಹಣ ವರ್ಗಾವಣೆ", fixed_deposit: "ಸ್ಥಿರ ಠೇವಣಿ",
    search_results_for: "ಗಾಗಿ ಫಲಿತಾಂಶಗಳು", no_results: "ಯಾವುದೇ ಫಲಿತಾಂಶಗಳಿಲ್ಲ.",
  },
  as: {
    home: "হোম", about: "আমাৰ বিষয়ে", services: "সেৱাসমূহ",
    investors: "বিনিয়োগকাৰী", policy: "নীতি", careers: "কেৰিয়াৰ",
    digital: "ডিজিটেল উদ্যোগ", contact: "যোগাযোগ",
    search_placeholder: "সেৱা, ঋণ, নীতি বিচাৰক...",
    quick_links: "দ্ৰুত লিংক", whatsapp_chat: "WhatsApp ত চেট কৰক",
    select_lang: "ভাষা", gold_loan: "গোল্ড লোন",
    personal_loan: "ব্যক্তিগত ঋণ", insurance: "বীমা",
    money_transfer: "টকা হস্তান্তৰ", fixed_deposit: "স্থায়ী আমানত",
    search_results_for: "ৰ বাবে ফলাফল", no_results: "কোনো ফলাফল পোৱা নগ'ল।",
  },
  ur: {
    home: "ہوم", about: "ہمارے بارے میں", services: "خدمات",
    investors: "سرمایہ کار", policy: "پالیسی", careers: "کیریئر",
    digital: "ڈیجیٹل اقدامات", contact: "رابطہ کریں",
    search_placeholder: "خدمات، قرضے، پالیسیاں تلاش کریں...",
    quick_links: "فوری لنکس", whatsapp_chat: "WhatsApp پر چیٹ کریں",
    select_lang: "زبان", gold_loan: "گولڈ لون",
    personal_loan: "ذاتی قرضہ", insurance: "بیمہ",
    money_transfer: "رقم کی منتقلی", fixed_deposit: "فکسڈ ڈپازٹ",
    search_results_for: "کے نتائج", no_results: "کوئی نتیجہ نہیں ملا۔",
  },
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");
  const t = (key) => TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS["en"][key] ?? key;
  // RTL support for Urdu
  useEffect(() => {
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ─── CONFIG
// ═══════════════════════════════════════════════════════════════════════════════
const WHATSAPP_NUMBER = "917703843898";
const WHATSAPP_DISPLAY = "+91-7703843898";

const LANGUAGES = [
  { code: "en", label: "English",  flag: "🇬🇧" },
  { code: "hi", label: "हिंदी",   flag: "🇮🇳" },
  { code: "mr", label: "मराठी",   flag: "🇮🇳" },
  { code: "gu", label: "ગુજરાતી", flag: "🇮🇳" },
  { code: "te", label: "తెలుగు",  flag: "🇮🇳" },
  { code: "ta", label: "தமிழ்",   flag: "🇮🇳" },
  { code: "kn", label: "ಕನ್ನಡ",   flag: "🇮🇳" },
  { code: "as", label: "অসমীয়া", flag: "🇮🇳" },
  { code: "ur", label: "اردو",    flag: "🇵🇰" },
];

const SEARCH_POOL = [
  { label: "Gold Loan",           path: "/services/gold-loan",       category: "Services"   },
  { label: "Personal Loan",       path: "/services/personal-loan",   category: "Services"   },
  { label: "Insurance",           path: "/services/insurance",       category: "Services"   },
  { label: "Money Transfer",      path: "/services/money-transfer",  category: "Services"   },
  { label: "Fixed Deposit",       path: "/services/fixed-deposit",   category: "Services"   },
  { label: "About Us",            path: "/about",                    category: "Company"    },
  { label: "Investors",           path: "/investors",                category: "Corporate"  },
  { label: "Policy",              path: "/policy",                   category: "Corporate"  },
  { label: "Careers",             path: "/careers",                  category: "Join Us"    },
  { label: "Digital Initiatives", path: "/digital-initiatives",      category: "Innovation" },
  { label: "Contact Us",          path: "/contact",                  category: "Support"    },
];

// ═══════════════════════════════════════════════════════════════════════════════
// ─── ICONS
// ═══════════════════════════════════════════════════════════════════════════════
const WAIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
const SearchIco = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-[17px] h-[17px] flex-shrink-0">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const XIcon = ({ cls = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={cls}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const GlobeIco = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 flex-shrink-0">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
  </svg>
);
const ChevIco = ({ open, up = false }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
    className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${up ? (open ? "rotate-0" : "rotate-180") : (open ? "rotate-180" : "rotate-0")}`}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const BarsIco = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const ArrowIco = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 flex-shrink-0">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════════
// ─── HIGHLIGHT MATCHING TEXT
// ═══════════════════════════════════════════════════════════════════════════════
const Highlight = ({ text, q }) => {
  if (!q.trim()) return <span>{text}</span>;
  const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return (
    <span>
      {text.split(re).map((part, i) =>
        re.test(part)
          ? <mark key={i} className="bg-yellow-200 text-yellow-900 rounded-[3px] px-0.5 font-bold not-italic">{part}</mark>
          : <span key={i}>{part}</span>
      )}
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ─── INLINE SEARCH OVERLAY
// ═══════════════════════════════════════════════════════════════════════════════
const InlineSearch = ({ open, onClose }) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  const results = query.trim()
    ? SEARCH_POOL.filter((d) =>
        d.label.toLowerCase().includes(query.toLowerCase()) ||
        d.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (open) { setQuery(""); setTimeout(() => inputRef.current?.focus(), 60); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const h = (e) => { if (!wrapRef.current?.contains(e.target)) onClose(); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [open, onClose]);

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  const quickKeys = ["gold_loan", "personal_loan", "insurance", "money_transfer", "fixed_deposit"];

  return (
    <div className={`fixed inset-0 z-[200] transition-all duration-300 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div className={`absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} onClick={onClose} />
      <div ref={wrapRef}
        className={`absolute top-0 left-0 right-0 bg-white shadow-2xl transition-all duration-300 ease-out ${open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"}`}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Input Row */}
          <div className="flex items-center gap-3 h-16 sm:h-[72px] lg:h-[76px] border-b border-gray-100">
            <span className="text-red-500"><SearchIco /></span>
            <input ref={inputRef} type="text" value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search_placeholder")}
              className="flex-1 text-gray-800 text-base sm:text-lg font-semibold outline-none placeholder-gray-300 bg-transparent" />
            {query && (
              <button onClick={() => setQuery("")}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors">
                <XIcon cls="w-3.5 h-3.5" />
              </button>
            )}
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
              <XIcon />
            </button>
          </div>
          {/* Results */}
          <div className="py-4 pb-6">
            {!query.trim() ? (
              <>
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">{t("quick_links")}</p>
                <div className="flex flex-wrap gap-2">
                  {quickKeys.map((k) => (
                    <button key={k} onClick={() => setQuery(t(k))}
                      className="px-3.5 py-2 rounded-full border border-red-100 bg-red-50/60 text-red-700 text-xs font-semibold hover:bg-red-100 hover:border-red-300 transition-all">
                      {t(k)}
                    </button>
                  ))}
                </div>
              </>
            ) : results.length > 0 ? (
              <>
                <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">
                  {results.length} {t("search_results_for")} &ldquo;{query}&rdquo;
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {results.map((item) => (
                    <a key={item.path} href={item.path} onClick={onClose}
                      className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-gray-100 hover:border-red-200 hover:bg-red-50/50 transition-all group">
                      <div>
                        <p className="text-sm font-semibold text-gray-800 group-hover:text-red-700 transition-colors">
                          <Highlight text={item.label} q={query} />
                        </p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{item.category}</p>
                      </div>
                      <span className="text-gray-300 group-hover:text-red-500 transition-colors"><ArrowIco /></span>
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-gray-400 py-2 italic">{t("no_results")}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ─── LANGUAGE SELECTOR — Smart drop-up/drop-down based on position
// ═══════════════════════════════════════════════════════════════════════════════
const LangSelector = ({ dark = false, forceUp = false }) => {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(forceUp);
  const ref = useRef(null);
  const current = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    const h = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Detect if there is room below — if not, drop up
  const handleToggle = () => {
    if (!open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      // 9 languages × ~40px each ≈ 360px
      setDropUp(spaceBelow < 380 || forceUp);
    }
    setOpen((v) => !v);
  };

  const menuPositionCls = dropUp
    ? "bottom-full top-auto mb-2 origin-bottom"
    : "top-full bottom-auto mt-2 origin-top";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={handleToggle}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all duration-200 ${
          dark
            ? "border-white/20 text-white/75 hover:bg-white/10 hover:text-white hover:border-white/40"
            : "border-gray-200 text-gray-600 hover:border-red-300 hover:bg-red-50 hover:text-red-700"
        }`}
      >
        <GlobeIco />
        <span className="hidden sm:inline max-w-[72px] truncate">{current.label}</span>
        {/* Arrow flips: points up when menu is above, down when below */}
        <ChevIco open={open} up={dropUp} />
      </button>

      {open && (
        <div
          className={`absolute right-0 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[999] ${menuPositionCls}`}
          style={{ animation: "dropIn .15s ease-out forwards" }}
        >
          {/* Scrollable list — max-height to keep it inside viewport */}
          <div className="max-h-[320px] overflow-y-auto">
            {LANGUAGES.map((lng) => (
              <button
                key={lng.code}
                onClick={() => { setLang(lng.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  current.code === lng.code
                    ? "bg-red-50 text-red-700 font-bold"
                    : "text-gray-700 hover:bg-gray-50 font-medium"
                } ${lng.code === "ur" ? "text-right" : ""}`}
                dir={lng.code === "ur" ? "rtl" : "ltr"}
              >
                <span className="text-base">{lng.flag}</span>
                <span className="flex-1 text-left">{lng.label}</span>
                {current.code === lng.code && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ─── MAIN NAVBAR
// ═══════════════════════════════════════════════════════════════════════════════
export default function Navbar() {
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const NAV_LINKS = [
    { key: "home",      path: "/" },
    { key: "about",     path: "/about" },
    { key: "services",  path: "/services" },
    { key: "investors", path: "/investors" },
    { key: "policy",    path: "/policy" },
    { key: "careers",   path: "/careers" },
    { key: "digital",   path: "/digital-initiatives" },
    { key: "contact",   path: "/contact" },
  ];

  useEffect(() => { setMobileOpen(false); setSearchOpen(false); }, [location.pathname]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I need assistance.")}`;

  return (
    <>
      {/* ════ TOP BAR ════ */}
      <div className="bg-gradient-to-r from-gray-900 via-[#1c1c1c] to-gray-900">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 flex items-center justify-between sm:justify-end gap-5 py-[7px]">

          {/* WhatsApp */}
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 group select-none">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 group-hover:bg-green-500/35 transition-all">
              <span className="text-green-400 group-hover:scale-110 transition-transform inline-flex"><WAIcon /></span>
            </span>
            <span className="text-[11px] font-medium text-white/55 group-hover:text-white/80 transition-colors hidden sm:block">
              {t("whatsapp_chat")}:
            </span>
            <span className="text-xs sm:text-[13px] font-bold text-green-400 group-hover:text-green-300 transition-colors tracking-wide">
              {WHATSAPP_DISPLAY}
            </span>
          </a>

          <div className="hidden sm:block w-px h-4 bg-white/15" />

          {/* Language — top bar, drops DOWN (always enough space above) */}
          <LangSelector dark forceUp={false} />
        </div>
      </div>

      {/* ════ STICKY HEADER ════ */}
      <header className={`sticky top-0 z-[100] bg-white transition-all duration-300 border-b border-gray-100 ${scrolled ? "shadow-[0_4px_28px_rgba(0,0,0,0.09)]" : "shadow-sm"}`}>
        <nav className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex items-center h-16 sm:h-[70px] lg:h-[76px] justify-between">

            {/* ── Logo — LEFT corner with padding ── */}
            <NavLink to="/" className="flex items-center flex-shrink-0 group focus:outline-none pl-0 pr-6 lg:pr-10">
             <img
  src="/logo.png"
  alt="Logo"
  className="h-18 sm:h-20 lg:h-24 relative top-2.5 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
/>
              {/* Fallback */}
              <div style={{ display: "none" }} className="items-center gap-2.5">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-red-600 via-red-700 to-yellow-500 flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-lg leading-none">M</span>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-red-700 font-black text-sm sm:text-base tracking-tight">GANESH</span>
                  <span className="text-yellow-600 font-bold text-[10px] sm:text-xs tracking-[0.18em] uppercase">Finance</span>
                </div>
              </div>
            </NavLink>

            {/* ── Desktop Nav Links — RIGHT side ── */}
            <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 justify-end pl-4">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.path} to={link.path} end={link.path === "/"}
                  className={({ isActive }) =>
                    `relative text-[12.5px] xl:text-[13px] font-semibold tracking-wide transition-all duration-200 px-2.5 xl:px-3 py-2 rounded-lg whitespace-nowrap group ${
                      isActive ? "text-red-700 bg-red-50" : "text-gray-600 hover:text-red-700 hover:bg-red-50/70"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {t(link.key)}
                      <span className={`absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-red-600 to-yellow-500 transition-all duration-300 ${
                        isActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-100"
                      }`} />
                    </>
                  )}
                </NavLink>
              ))}

              {/* Search inline nav item */}
              <button onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 text-[12.5px] xl:text-[13px] font-semibold text-gray-600 hover:text-red-700 hover:bg-red-50/70 px-2.5 xl:px-3 py-2 rounded-lg transition-all duration-200">
                <SearchIco />
                <span>Search</span>
              </button>
            </div>

            {/* ── Mobile: Search + Hamburger ── */}
            <div className="flex lg:hidden items-center gap-1.5 ml-auto">
              <button onClick={() => setSearchOpen(true)} aria-label="Search"
                className="flex items-center justify-center w-9 h-9 rounded-xl text-gray-600 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all">
                <SearchIco />
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu"
                className="flex items-center justify-center w-9 h-9 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-700 border border-transparent hover:border-red-100 transition-all">
                {mobileOpen ? <XIcon cls="w-5 h-5" /> : <BarsIco />}
              </button>
            </div>
          </div>
        </nav>

        {/* Bottom accent line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-red-500/25 to-transparent" />
      </header>

      {/* ════ MOBILE DRAWER ════ */}
      <div className={`fixed inset-0 z-[150] lg:hidden ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div className={`absolute inset-0 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileOpen(false)} />

        <div className={`absolute top-0 right-0 h-full w-[280px] sm:w-[310px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>

          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-br from-red-50 via-white to-yellow-50 border-b border-gray-100">
            <NavLink to="/" onClick={() => setMobileOpen(false)}>
              <img src="/logo.png" alt="Logo" className="h-9 w-auto object-contain"
                onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
              <div style={{ display: "none" }} className="items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-600 to-yellow-500 flex items-center justify-center">
                  <span className="text-white font-black">M</span>
                </div>
                <span className="text-red-700 font-black text-sm">GANESH <span className="text-yellow-600">FINANCE</span></span>
              </div>
            </NavLink>
            <button onClick={() => setMobileOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
              <XIcon cls="w-4 h-4" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex-1 overflow-y-auto py-2">
            {NAV_LINKS.map((link, i) => (
              <NavLink key={link.path} to={link.path} end={link.path === "/"}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-5 py-3.5 text-[13px] font-semibold transition-all duration-150 border-r-[3px] ${
                    isActive ? "border-red-600 bg-red-50/80 text-red-700" : "border-transparent text-gray-700 hover:bg-gray-50 hover:text-red-600 hover:border-red-200"
                  }`
                }
                style={{ transitionDelay: mobileOpen ? `${i * 28}ms` : "0ms" }}
              >
                {t(link.key)}
                <ArrowIco />
              </NavLink>
            ))}
          </div>

          {/* Drawer Footer — language here uses forceUp=true so it always drops UP */}
          <div className="px-5 py-4 border-t border-gray-100 bg-gray-50/80 space-y-3">
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 w-full px-4 py-3 rounded-xl bg-green-500 hover:bg-green-600 active:scale-[0.98] text-white font-bold text-sm transition-all shadow-md shadow-green-100">
              <WAIcon />
              <span>{WHATSAPP_DISPLAY}</span>
              <span className="ml-auto text-green-100 text-[11px] font-normal">WhatsApp</span>
            </a>
            <div className="flex items-center gap-2">
              <GlobeIco />
              <span className="text-xs text-gray-500 font-medium">{t("select_lang")}:</span>
              {/* forceUp=true → dropdown always goes UP in footer */}
              <LangSelector dark={false} forceUp={true} />
            </div>
          </div>
        </div>
      </div>

      {/* ════ SEARCH ════ */}
      <InlineSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ════ KEYFRAMES ════ */}
      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: scale(0.96) translateY(-4px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
      `}</style>
    </>
  );
}