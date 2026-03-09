import { useState } from "react";
import { Link } from "react-router-dom";

// ══════════════════════════════════════════════════════════════════
// FOOTER DATA
// ══════════════════════════════════════════════════════════════════
const FOOTER_COLUMNS = [
  {
    id: "services",
    heading: "Services",
    links: [
      { label: "Gold Loan", href: "/services/gold-loan" },
      { label: "Gold Flexi Credit", href: "/services/gold-flexi-credit" },
      { label: "Gold Loan at Home", href: "/services/gold-loan-at-home" },
      { label: "Housing Finance", href: "/services/housing-finance" },
      { label: "Personal Loan", href: "/services/personal-loan" },
      { label: "Small Business Loan", href: "/services/small-business-loan" },
      { label: "SME Loan", href: "/services/sme-loan" },
      { label: "Corporate Business Loan", href: "/services/corporate-business-loan" },
      { label: "Vehicle Loan", href: "/services/vehicle-loan" },
      { label: "Insurance", href: "/services/insurance" },
      { label: "Mutual Funds", href: "/services/mutual-funds" },
      { label: "Money Transfer", href: "/services/money-transfer" },
      { label: "Credit Score", href: "/services/credit-score" },
    ],
  },
  {
    id: "tools",
    heading: "Tools & Calculator",
    links: [
      { label: "Gold Loan Calculator", href: "/calculators/gold-loan" },
      { label: "Personal Loan Calculator", href: "/calculators/personal-loan" },
      { label: "Home Loan EMI Calculator", href: "/calculators/home-loan" },
      { label: "Mutual Fund Calculator", href: "/calculators/mutual-fund" },
      { label: "CIBIL Score Check", href: "/services/credit-score" },
      { label: "Gold Rate Today", href: "/gold-rate" },
    ],
    subHeading: "News",
    subLinks: [
      { label: "News Board", href: "/news" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "Press", href: "/press" },
      { label: "Safe Banking Practices", href: "/safe-banking" },
    ],
    extraHeading: "Blog",
    extraLinks: [
      { label: "All Blogs", href: "/blogs" },
      { label: "Gold Loan Insights", href: "/blogs/gold-loan" },
      { label: "Investment Tips", href: "/blogs/investment" },
    ],
  },
  {
    id: "corporate",
    heading: "Corporate",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Vision & Mission", href: "/about#mission" },
      { label: "Our Directors", href: "/about#directors" },
      { label: "Corporate Ethos", href: "/about#ethos" },
      { label: "Milestones", href: "/about#milestones" },
      { label: "Social Responsibility", href: "/csr" },
      { label: "Careers", href: "/careers" },
    ],
    subHeading: "Customer Service",
    subLinks: [
      { label: "Customer Service", href: "/contact" },
      { label: "Queries / Feedback", href: "/contact#feedback" },
      { label: "Complaints", href: "/contact#complaints" },
      { label: "Branch Locator", href: "/branches" },
      { label: "CKYCR Awareness", href: "/ckycr" },
    ],
  },
  {
    id: "policy",
    heading: "Policy",
    links: [
      { label: "Fair Practices Code", href: "/policy/fair-practices" },
      { label: "Code of Conduct", href: "/policy/conduct" },
      { label: "Interest Rate Policy", href: "/policy/interest-rate" },
      { label: "Privacy Policy", href: "/policy/privacy" },
      { label: "Loan Policy", href: "/policy/loan" },
      { label: "Terms and Conditions", href: "/policy/terms" },
      { label: "Grievance Redressal", href: "/policy/grievance" },
      { label: "Auction Policy", href: "/policy/auction" },
    ],
    subHeading: "Sitemap",
    subLinks: [
      { label: "Sitemap", href: "/sitemap" },
    ],
  },
  {
    id: "contact",
    heading: "Contact",
    links: [
      { label: "General Queries", href: "/contact" },
      { label: "Branch Locator", href: "/branches" },
      { label: "Customer Grievance", href: "/contact#grievance" },
    ],
  },
];

// Social icons SVGs
const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

// ── Mobile Accordion Item ──
function MobileAccordion({ col }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-xs font-black tracking-widest uppercase text-white">
          {col.heading}
        </span>
        <span className={`w-5 h-5 flex items-center justify-center text-white/50 transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ maxHeight: open ? "600px" : "0px", opacity: open ? 1 : 0 }}
      >
        <div className="pb-4 space-y-2.5">
          {col.links.map((l) => (
            <Link key={l.label} to={l.href} className="block text-xs text-white/55 hover:text-red-400 transition-colors duration-200 leading-relaxed">
              {l.label}
            </Link>
          ))}
          {col.subHeading && (
            <>
              <p className="text-[10px] font-black tracking-widest uppercase text-white/30 pt-3 pb-1">{col.subHeading}</p>
              {col.subLinks?.map((l) => (
                <Link key={l.label} to={l.href} className="block text-xs text-white/55 hover:text-red-400 transition-colors duration-200">
                  {l.label}
                </Link>
              ))}
            </>
          )}
          {col.extraHeading && (
            <>
              <p className="text-[10px] font-black tracking-widest uppercase text-white/30 pt-3 pb-1">{col.extraHeading}</p>
              {col.extraLinks?.map((l) => (
                <Link key={l.label} to={l.href} className="block text-xs text-white/55 hover:text-red-400 transition-colors duration-200">
                  {l.label}
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN FOOTER COMPONENT
// ══════════════════════════════════════════════════════════════════
export default function Footer() {
  return (
    <footer className="w-full bg-[#1a1a1a] text-white">

      {/* ── Top warning bar ── */}
      <div className="bg-[#111] border-b border-white/10 px-4 sm:px-8 lg:px-10 py-3">
        <p className="text-[11px] text-white/40 leading-5 max-w-[1400px] mx-auto text-center sm:text-left">
          <span className="text-yellow-500 font-bold">⚠ Security Notice:</span>{" "}
          Beware of fraudulent calls, emails, or messages claiming to offer loans in the name of Shree Ganesh Finance.
          We never ask for upfront fees or OTPs. Our official communication is only through{" "}
          <a href="mailto:info@shreegf.com" className="text-red-400 hover:underline font-medium">info@shreegf.com</a>.
        </p>
      </div>

      {/* ── Main footer content ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 pt-10 sm:pt-14 pb-8">

        {/* ══ DESKTOP LAYOUT ══ */}
        <div className="hidden lg:grid grid-cols-[1.2fr_1fr_1fr_1fr_0.9fr] gap-8 xl:gap-12 pb-10 border-b border-white/10">

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.id}>
              <h4 className="text-[11px] font-black tracking-[0.18em] uppercase text-white mb-4">
                {col.heading}
              </h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.href}
                      className="text-[13px] text-white/55 hover:text-red-400 transition-colors duration-200 leading-relaxed"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {col.subHeading && (
                <div className="mt-6">
                  <h4 className="text-[11px] font-black tracking-[0.18em] uppercase text-white mb-4">
                    {col.subHeading}
                  </h4>
                  <ul className="space-y-2">
                    {col.subLinks?.map((l) => (
                      <li key={l.label}>
                        <Link to={l.href} className="text-[13px] text-white/55 hover:text-red-400 transition-colors duration-200">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {col.extraHeading && (
                <div className="mt-6">
                  <h4 className="text-[11px] font-black tracking-[0.18em] uppercase text-white mb-4">
                    {col.extraHeading}
                  </h4>
                  <ul className="space-y-2">
                    {col.extraLinks?.map((l) => (
                      <li key={l.label}>
                        <Link to={l.href} className="text-[13px] text-white/55 hover:text-red-400 transition-colors duration-200">
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ══ MOBILE ACCORDION LAYOUT ══ */}
        <div className="lg:hidden pb-6 border-b border-white/10">
          {FOOTER_COLUMNS.map((col) => (
            <MobileAccordion key={col.id} col={col} />
          ))}
        </div>

        {/* ── Bottom row: Social + App Download ── */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Social */}
          <div>
            <p className="text-[11px] font-black tracking-[0.18em] uppercase text-white mb-4">
              Follow Us On
            </p>
            <div className="flex items-center gap-2.5 flex-wrap">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-red-900/30"
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* App Download */}
          <div>
            <p className="text-[11px] font-black tracking-[0.18em] uppercase text-white mb-4">
              Download Our App
            </p>
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/10 flex-shrink-0 border border-white/10">
                <img
                  src="/half logo.png"
                  alt="Shree Ganesh Finance"
                  className="w-full h-full object-contain p-1"
                />
              </div>

              <div className="flex flex-col gap-2">
                {/* Google Play */}
                <a
                  href="#"
                  className="flex items-center gap-2 bg-black border border-white/20 hover:border-white/40 rounded-lg px-3 py-1.5 transition-all duration-200 hover:bg-white/5 group"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white/70 group-hover:text-white flex-shrink-0">
                    <path d="M3.18 23.76c.3.17.64.24.99.2l12.6-11.96L13.6 9l-10.42 14.76zM.5 1.6C.19 1.96 0 2.48 0 3.12v17.76c0 .64.19 1.16.51 1.52L.6 22.5 12.56 10.5v-.28L.6 1.7l-.1-.1zM19.97 9.5l-2.98-1.73L13.6 11l3.4 3.44 3-1.74c.85-.49.85-1.3 0-1.78l.01-.02zM3.18.24L15.78 12.2 12.6 9 .6 1.5A1.16 1.16 0 013.18.24z" />
                  </svg>
                  <div>
                    <p className="text-[8px] text-white/40 leading-none">GET IT ON</p>
                    <p className="text-[11px] font-bold text-white leading-tight">Google Play</p>
                  </div>
                </a>

                {/* App Store */}
                <a
                  href="#"
                  className="flex items-center gap-2 bg-black border border-white/20 hover:border-white/40 rounded-lg px-3 py-1.5 transition-all duration-200 hover:bg-white/5 group"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white/70 group-hover:text-white flex-shrink-0">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div>
                    <p className="text-[8px] text-white/40 leading-none">Download on the</p>
                    <p className="text-[11px] font-bold text-white leading-tight">App Store</p>
                  </div>
                </a>
              </div>
            </div>
            <p className="text-[10px] text-white/30 mt-2.5 tracking-wide">ONE APP · MANY BENEFITS</p>
          </div>

          {/* Quick contact */}
          <div>
            <p className="text-[11px] font-black tracking-[0.18em] uppercase text-white mb-4">
              Quick Contact
            </p>
            <div className="space-y-2.5">
              <a href="mailto:info@shreegf.com" className="flex items-center gap-2.5 text-[13px] text-white/55 hover:text-red-400 transition-colors duration-200 group">
                <span className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-red-600/20 flex items-center justify-center flex-shrink-0 transition-colors">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                info@shreegf.com
              </a>
              <a href="tel:18001234567" className="flex items-center gap-2.5 text-[13px] text-white/55 hover:text-red-400 transition-colors duration-200 group">
                <span className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-red-600/20 flex items-center justify-center flex-shrink-0 transition-colors">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </span>
                1800 123 4567 (Toll-Free)
              </a>
              <Link to="/branches" className="flex items-center gap-2.5 text-[13px] text-white/55 hover:text-red-400 transition-colors duration-200 group">
                <span className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-red-600/20 flex items-center justify-center flex-shrink-0 transition-colors">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </span>
                Find Nearest Branch
              </Link>
              <p className="text-[11px] text-white/25 pl-9">Mon–Sat · 9:30 AM – 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10 bg-[#111]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Logo + Reg info */}
          <div className="flex items-center gap-3 order-2 sm:order-1">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
              <img src="/half logo.png" alt="Shree Ganesh Finance" className="w-full h-full object-contain p-0.5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-white/60 leading-tight">Shree Ganesh Finance</p>
              <p className="text-[10px] text-white/30 leading-tight">RBI Registered NBFC · IRDAI Corp. Agent · AMFI Registered</p>
            </div>
          </div>

          {/* Copyright + links */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 order-1 sm:order-2 text-center">
            <p className="text-[11px] text-white/30">
              © {new Date().getFullYear()} Shree Ganesh Finance. All Rights Reserved.
            </p>
            <div className="flex items-center gap-3">
              <Link to="/policy/privacy" className="text-[11px] text-white/40 hover:text-red-400 transition-colors">Privacy Policy</Link>
              <span className="text-white/20 text-xs">·</span>
              <Link to="/policy/terms" className="text-[11px] text-white/40 hover:text-red-400 transition-colors">Terms</Link>
              <span className="text-white/20 text-xs">·</span>
              <Link to="/sitemap" className="text-[11px] text-white/40 hover:text-red-400 transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}