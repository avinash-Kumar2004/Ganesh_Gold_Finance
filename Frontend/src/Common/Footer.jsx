import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../Common/Navbaar"; // ← LanguageContext from Navbar

// ══════════════════════════════════════════════════════════════════
// MULTILINGUAL FOOTER TRANSLATIONS
// ══════════════════════════════════════════════════════════════════
const FOOTER_TRANSLATIONS = {
  en: {
    securityNotice: "Security Notice:",
    securityText: "Beware of fraudulent calls, emails, or messages claiming to offer loans in the name of Shree Ganesh Finance. We never ask for upfront fees or OTPs. Our official communication is only through",
    followUs: "Follow Us On",
    downloadApp: "Download Our App",
    appTagline: "ONE APP · MANY BENEFITS",
    quickContact: "Quick Contact",
    tollfree: "1800 123 4567 (Toll-Free)",
    findBranch: "Find Nearest Branch",
    branchHours: "Mon–Sat · 9:30 AM – 6:00 PM",
    getItOn: "GET IT ON",
    downloadOn: "Download on the",
    copyright: `© ${new Date().getFullYear()} Shree Ganesh Finance. All Rights Reserved.`,
    privacyPolicy: "Privacy Policy",
    terms: "Terms",
    sitemap: "Sitemap",
    regInfo: "RBI Registered NBFC · IRDAI Corp. Agent · AMFI Registered",
    columns: {
      services: {
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
      tools: {
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
      corporate: {
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
      policy: {
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
        subLinks: [{ label: "Sitemap", href: "/sitemap" }],
      },
      contact: {
        heading: "Contact",
        links: [
          { label: "General Queries", href: "/contact" },
          { label: "Branch Locator", href: "/branches" },
          { label: "Customer Grievance", href: "/contact#grievance" },
        ],
      },
    },
  },

  // ─── HINDI ───────────────────────────────────────────────────────
  hi: {
    securityNotice: "सुरक्षा नोटिस:",
    securityText: "श्री गणेश फाइनेंस के नाम पर ऋण देने का दावा करने वाले फर्जी कॉल, ईमेल या संदेशों से सावधान रहें। हम कभी भी अग्रिम शुल्क या OTP नहीं मांगते। हमारा आधिकारिक संचार केवल",
    followUs: "हमें फॉलो करें",
    downloadApp: "हमारा ऐप डाउनलोड करें",
    appTagline: "एक ऐप · अनेक लाभ",
    quickContact: "त्वरित संपर्क",
    tollfree: "1800 123 4567 (टोल-फ्री)",
    findBranch: "नजदीकी शाखा खोजें",
    branchHours: "सोम–शनि · सुबह 9:30 – शाम 6:00",
    getItOn: "पर प्राप्त करें",
    downloadOn: "पर डाउनलोड करें",
    copyright: `© ${new Date().getFullYear()} श्री गणेश फाइनेंस। सर्वाधिकार सुरक्षित।`,
    privacyPolicy: "गोपनीयता नीति",
    terms: "नियम एवं शर्तें",
    sitemap: "साइटमैप",
    regInfo: "RBI पंजीकृत NBFC · IRDAI कॉर्प. एजेंट · AMFI पंजीकृत",
    columns: {
      services: {
        heading: "सेवाएं",
        links: [
          { label: "गोल्ड लोन", href: "/services/gold-loan" },
          { label: "गोल्ड फ्लेक्सी क्रेडिट", href: "/services/gold-flexi-credit" },
          { label: "घर पर गोल्ड लोन", href: "/services/gold-loan-at-home" },
          { label: "हाउसिंग फाइनेंस", href: "/services/housing-finance" },
          { label: "पर्सनल लोन", href: "/services/personal-loan" },
          { label: "स्माल बिजनेस लोन", href: "/services/small-business-loan" },
          { label: "SME लोन", href: "/services/sme-loan" },
          { label: "कॉर्पोरेट बिजनेस लोन", href: "/services/corporate-business-loan" },
          { label: "वाहन लोन", href: "/services/vehicle-loan" },
          { label: "बीमा", href: "/services/insurance" },
          { label: "म्युचुअल फंड", href: "/services/mutual-funds" },
          { label: "मनी ट्रांसफर", href: "/services/money-transfer" },
          { label: "क्रेडिट स्कोर", href: "/services/credit-score" },
        ],
      },
      tools: {
        heading: "टूल्स और कैलकुलेटर",
        links: [
          { label: "गोल्ड लोन कैलकुलेटर", href: "/calculators/gold-loan" },
          { label: "पर्सनल लोन कैलकुलेटर", href: "/calculators/personal-loan" },
          { label: "होम लोन EMI कैलकुलेटर", href: "/calculators/home-loan" },
          { label: "म्युचुअल फंड कैलकुलेटर", href: "/calculators/mutual-fund" },
          { label: "CIBIL स्कोर चेक", href: "/services/credit-score" },
          { label: "आज का सोने का भाव", href: "/gold-rate" },
        ],
        subHeading: "समाचार",
        subLinks: [
          { label: "न्यूज़ बोर्ड", href: "/news" },
          { label: "न्यूज़लेटर", href: "/newsletter" },
          { label: "प्रेस", href: "/press" },
          { label: "सुरक्षित बैंकिंग प्रथाएं", href: "/safe-banking" },
        ],
        extraHeading: "ब्लॉग",
        extraLinks: [
          { label: "सभी ब्लॉग", href: "/blogs" },
          { label: "गोल्ड लोन जानकारी", href: "/blogs/gold-loan" },
          { label: "निवेश टिप्स", href: "/blogs/investment" },
        ],
      },
      corporate: {
        heading: "कॉर्पोरेट",
        links: [
          { label: "हमारे बारे में", href: "/about" },
          { label: "हमारा दृष्टिकोण और मिशन", href: "/about#mission" },
          { label: "हमारे निदेशक", href: "/about#directors" },
          { label: "कॉर्पोरेट आचार", href: "/about#ethos" },
          { label: "मील के पत्थर", href: "/about#milestones" },
          { label: "सामाजिक उत्तरदायित्व", href: "/csr" },
          { label: "करियर", href: "/careers" },
        ],
        subHeading: "ग्राहक सेवा",
        subLinks: [
          { label: "ग्राहक सेवा", href: "/contact" },
          { label: "प्रश्न / फीडबैक", href: "/contact#feedback" },
          { label: "शिकायतें", href: "/contact#complaints" },
          { label: "शाखा लोकेटर", href: "/branches" },
          { label: "CKYCR जागरूकता", href: "/ckycr" },
        ],
      },
      policy: {
        heading: "नीति",
        links: [
          { label: "उचित आचार संहिता", href: "/policy/fair-practices" },
          { label: "आचार संहिता", href: "/policy/conduct" },
          { label: "ब्याज दर नीति", href: "/policy/interest-rate" },
          { label: "गोपनीयता नीति", href: "/policy/privacy" },
          { label: "ऋण नीति", href: "/policy/loan" },
          { label: "नियम और शर्तें", href: "/policy/terms" },
          { label: "शिकायत निवारण", href: "/policy/grievance" },
          { label: "नीलामी नीति", href: "/policy/auction" },
        ],
        subHeading: "साइटमैप",
        subLinks: [{ label: "साइटमैप", href: "/sitemap" }],
      },
      contact: {
        heading: "संपर्क",
        links: [
          { label: "सामान्य प्रश्न", href: "/contact" },
          { label: "शाखा लोकेटर", href: "/branches" },
          { label: "ग्राहक शिकायत", href: "/contact#grievance" },
        ],
      },
    },
  },

  // ─── MARATHI ─────────────────────────────────────────────────────
  mr: {
    securityNotice: "सुरक्षा सूचना:",
    securityText: "श्री गणेश फायनान्सच्या नावाने कर्ज देण्याचा दावा करणाऱ्या बनावट कॉल, ईमेल किंवा संदेशांपासून सावध राहा. आम्ही कधीही आगाऊ शुल्क किंवा OTP मागत नाही. आमचा अधिकृत संपर्क केवळ",
    followUs: "आम्हाला फॉलो करा",
    downloadApp: "आमचे अॅप डाउनलोड करा",
    appTagline: "एक अॅप · अनेक फायदे",
    quickContact: "त्वरित संपर्क",
    tollfree: "1800 123 4567 (टोल-फ्री)",
    findBranch: "जवळची शाखा शोधा",
    branchHours: "सोम–शनि · सकाळी 9:30 – संध्याकाळी 6:00",
    getItOn: "वर मिळवा",
    downloadOn: "वर डाउनलोड करा",
    copyright: `© ${new Date().getFullYear()} श्री गणेश फायनान्स. सर्व हक्क राखीव.`,
    privacyPolicy: "गोपनीयता धोरण",
    terms: "अटी व शर्ती",
    sitemap: "साइटमॅप",
    regInfo: "RBI नोंदणीकृत NBFC · IRDAI कॉर्प. एजंट · AMFI नोंदणीकृत",
    columns: {
      services: {
        heading: "सेवा",
        links: [
          { label: "गोल्ड लोन", href: "/services/gold-loan" },
          { label: "गोल्ड फ्लेक्सी क्रेडिट", href: "/services/gold-flexi-credit" },
          { label: "घरी गोल्ड लोन", href: "/services/gold-loan-at-home" },
          { label: "हाऊसिंग फायनान्स", href: "/services/housing-finance" },
          { label: "वैयक्तिक कर्ज", href: "/services/personal-loan" },
          { label: "लघु व्यवसाय कर्ज", href: "/services/small-business-loan" },
          { label: "SME कर्ज", href: "/services/sme-loan" },
          { label: "कॉर्पोरेट व्यवसाय कर्ज", href: "/services/corporate-business-loan" },
          { label: "वाहन कर्ज", href: "/services/vehicle-loan" },
          { label: "विमा", href: "/services/insurance" },
          { label: "म्युच्युअल फंड", href: "/services/mutual-funds" },
          { label: "पैसे हस्तांतरण", href: "/services/money-transfer" },
          { label: "क्रेडिट स्कोर", href: "/services/credit-score" },
        ],
      },
      tools: {
        heading: "टूल्स आणि कॅल्क्युलेटर",
        links: [
          { label: "गोल्ड लोन कॅल्क्युलेटर", href: "/calculators/gold-loan" },
          { label: "वैयक्तिक कर्ज कॅल्क्युलेटर", href: "/calculators/personal-loan" },
          { label: "गृह कर्ज EMI कॅल्क्युलेटर", href: "/calculators/home-loan" },
          { label: "म्युच्युअल फंड कॅल्क्युलेटर", href: "/calculators/mutual-fund" },
          { label: "CIBIL स्कोर तपासा", href: "/services/credit-score" },
          { label: "आजचा सोन्याचा दर", href: "/gold-rate" },
        ],
        subHeading: "बातम्या",
        subLinks: [
          { label: "न्यूज बोर्ड", href: "/news" },
          { label: "न्यूजलेटर", href: "/newsletter" },
          { label: "प्रेस", href: "/press" },
          { label: "सुरक्षित बँकिंग पद्धती", href: "/safe-banking" },
        ],
        extraHeading: "ब्लॉग",
        extraLinks: [
          { label: "सर्व ब्लॉग", href: "/blogs" },
          { label: "गोल्ड लोन माहिती", href: "/blogs/gold-loan" },
          { label: "गुंतवणूक टिप्स", href: "/blogs/investment" },
        ],
      },
      corporate: {
        heading: "कॉर्पोरेट",
        links: [
          { label: "आमच्याबद्दल", href: "/about" },
          { label: "आमची दृष्टी आणि ध्येय", href: "/about#mission" },
          { label: "आमचे संचालक", href: "/about#directors" },
          { label: "कॉर्पोरेट नीती", href: "/about#ethos" },
          { label: "टप्पे", href: "/about#milestones" },
          { label: "सामाजिक जबाबदारी", href: "/csr" },
          { label: "करिअर", href: "/careers" },
        ],
        subHeading: "ग्राहक सेवा",
        subLinks: [
          { label: "ग्राहक सेवा", href: "/contact" },
          { label: "प्रश्न / अभिप्राय", href: "/contact#feedback" },
          { label: "तक्रारी", href: "/contact#complaints" },
          { label: "शाखा लोकेटर", href: "/branches" },
          { label: "CKYCR जागरूकता", href: "/ckycr" },
        ],
      },
      policy: {
        heading: "धोरण",
        links: [
          { label: "उचित व्यवहार संहिता", href: "/policy/fair-practices" },
          { label: "आचारसंहिता", href: "/policy/conduct" },
          { label: "व्याज दर धोरण", href: "/policy/interest-rate" },
          { label: "गोपनीयता धोरण", href: "/policy/privacy" },
          { label: "कर्ज धोरण", href: "/policy/loan" },
          { label: "अटी व शर्ती", href: "/policy/terms" },
          { label: "तक्रार निवारण", href: "/policy/grievance" },
          { label: "लिलाव धोरण", href: "/policy/auction" },
        ],
        subHeading: "साइटमॅप",
        subLinks: [{ label: "साइटमॅप", href: "/sitemap" }],
      },
      contact: {
        heading: "संपर्क",
        links: [
          { label: "सामान्य चौकशी", href: "/contact" },
          { label: "शाखा लोकेटर", href: "/branches" },
          { label: "ग्राहक तक्रार", href: "/contact#grievance" },
        ],
      },
    },
  },

  // ─── GUJARATI ────────────────────────────────────────────────────
  gu: {
    securityNotice: "સુરક્ષા નોટિસ:",
    securityText: "શ્રી ગણેશ ફાઇનાન્સના નામે લોન આપવાનો દાવો કરતા છેતરપિંડીના કૉલ, ઇમેઇલ અથવા સંદેશાઓથી સાવધ રહો. અમે ક્યારેય અગ્રિમ ફી અથવા OTP માંગતા નથી. અમારો સત્તાવાર સંપર્ક માત્ર",
    followUs: "અમને ફૉલો કરો",
    downloadApp: "અમારી એપ ડાઉનલોડ કરો",
    appTagline: "એક એપ · અનેક ફાયદા",
    quickContact: "ઝડપી સંપર્ક",
    tollfree: "1800 123 4567 (ટોલ-ફ્રી)",
    findBranch: "નજીકની શાખા શોધો",
    branchHours: "સોમ–શનિ · સવારે 9:30 – સાંજે 6:00",
    getItOn: "પર મેળવો",
    downloadOn: "પર ડાઉનલોડ કરો",
    copyright: `© ${new Date().getFullYear()} શ્રી ગણેશ ફાઇનાન્સ. સર્વ હક્કો સુરક્ષિત.`,
    privacyPolicy: "ગોપનીયતા નીતિ",
    terms: "નિયમો અને શરતો",
    sitemap: "સાઇટમૅપ",
    regInfo: "RBI નોંધાયેલ NBFC · IRDAI કૉર્પ. એજન્ટ · AMFI નોંધાયેલ",
    columns: {
      services: {
        heading: "સેવાઓ",
        links: [
          { label: "ગોલ્ડ લોન", href: "/services/gold-loan" },
          { label: "ગોલ્ડ ફ્લેક્સી ક્રેડિટ", href: "/services/gold-flexi-credit" },
          { label: "ઘરે ગોલ્ડ લોન", href: "/services/gold-loan-at-home" },
          { label: "હાઉસિંગ ફાઇનાન્સ", href: "/services/housing-finance" },
          { label: "પર્સનલ લોન", href: "/services/personal-loan" },
          { label: "સ્મોલ બિઝનેસ લોન", href: "/services/small-business-loan" },
          { label: "SME લોન", href: "/services/sme-loan" },
          { label: "કૉર્પોરેટ બિઝનેસ લોન", href: "/services/corporate-business-loan" },
          { label: "વાહન લોન", href: "/services/vehicle-loan" },
          { label: "વીમો", href: "/services/insurance" },
          { label: "મ્યુચ્યુઅલ ફંડ", href: "/services/mutual-funds" },
          { label: "મની ટ્રાન્સફર", href: "/services/money-transfer" },
          { label: "ક્રેડિટ સ્કોર", href: "/services/credit-score" },
        ],
      },
      tools: {
        heading: "ટૂલ્સ અને કૅલ્ક્યુલેટર",
        links: [
          { label: "ગોલ્ડ લોન કૅલ્ક્યુલેટર", href: "/calculators/gold-loan" },
          { label: "પર્સનલ લોન કૅલ્ક્યુલેટર", href: "/calculators/personal-loan" },
          { label: "હોમ લોન EMI કૅલ્ક્યુલેટર", href: "/calculators/home-loan" },
          { label: "મ્યુચ્યુઅલ ફંડ કૅલ્ક્યુલેટર", href: "/calculators/mutual-fund" },
          { label: "CIBIL સ્કોર તપાસો", href: "/services/credit-score" },
          { label: "આજના સોનાના ભાવ", href: "/gold-rate" },
        ],
        subHeading: "સમાચાર",
        subLinks: [
          { label: "ન્યૂઝ બોર્ડ", href: "/news" },
          { label: "ન્યૂઝલેટર", href: "/newsletter" },
          { label: "પ્રેસ", href: "/press" },
          { label: "સુરક્ષિત બૅન્કિંગ પ્રથા", href: "/safe-banking" },
        ],
        extraHeading: "બ્લૉગ",
        extraLinks: [
          { label: "બધા બ્લૉગ", href: "/blogs" },
          { label: "ગોલ્ડ લોન માહિતી", href: "/blogs/gold-loan" },
          { label: "રોકાણ ટિપ્સ", href: "/blogs/investment" },
        ],
      },
      corporate: {
        heading: "કૉર્પોરેટ",
        links: [
          { label: "અમારા વિશે", href: "/about" },
          { label: "અમારું વિઝન અને મિશન", href: "/about#mission" },
          { label: "અમારા ડિરેક્ટર્સ", href: "/about#directors" },
          { label: "કૉર્પોરેટ મૂલ્યો", href: "/about#ethos" },
          { label: "સીમાચિહ્નો", href: "/about#milestones" },
          { label: "સામાજિક જવાબદારી", href: "/csr" },
          { label: "કારકિર્દી", href: "/careers" },
        ],
        subHeading: "ગ્રાહક સેવા",
        subLinks: [
          { label: "ગ્રાહક સેવા", href: "/contact" },
          { label: "પ્રશ્નો / પ્રતિભાવ", href: "/contact#feedback" },
          { label: "ફરિયાદો", href: "/contact#complaints" },
          { label: "શાખા લોકેટર", href: "/branches" },
          { label: "CKYCR જાગૃતિ", href: "/ckycr" },
        ],
      },
      policy: {
        heading: "નીતિ",
        links: [
          { label: "ઉચિત વ્યવહાર સંહિતા", href: "/policy/fair-practices" },
          { label: "આચારસંહિતા", href: "/policy/conduct" },
          { label: "વ્યાજ દર નીતિ", href: "/policy/interest-rate" },
          { label: "ગોપનીયતા નીતિ", href: "/policy/privacy" },
          { label: "લોન નીતિ", href: "/policy/loan" },
          { label: "નિયમો અને શરતો", href: "/policy/terms" },
          { label: "ફરિયાદ નિવારણ", href: "/policy/grievance" },
          { label: "હરાજી નીતિ", href: "/policy/auction" },
        ],
        subHeading: "સાઇટમૅપ",
        subLinks: [{ label: "સાઇટમૅપ", href: "/sitemap" }],
      },
      contact: {
        heading: "સંપર્ક",
        links: [
          { label: "સામાન્ય પ્રશ્નો", href: "/contact" },
          { label: "શાખા લોકેટર", href: "/branches" },
          { label: "ગ્રાહક ફરિયાદ", href: "/contact#grievance" },
        ],
      },
    },
  },

  // ─── TELUGU ──────────────────────────────────────────────────────
  te: {
    securityNotice: "భద్రతా నోటీసు:",
    securityText: "శ్రీ గణేష్ ఫైనాన్స్ పేరుతో రుణాలు అందించాలని దావా చేసే మోసపూరిత కాల్‌లు, ఇమెయిల్‌లు లేదా సందేశాల పట్ల జాగ్రత్తగా ఉండండి. మేము ముందస్తు రుసుమలు లేదా OTPలు ఎప్పుడూ అడగము. మా అధికారిక కమ్యూనికేషన్ కేవలం",
    followUs: "మాను ఫాలో చేయండి",
    downloadApp: "మా యాప్ డౌన్‌లోడ్ చేయండి",
    appTagline: "ఒక యాప్ · అనేక ప్రయోజనాలు",
    quickContact: "త్వరిత సంప్రదింపు",
    tollfree: "1800 123 4567 (టోల్-ఫ్రీ)",
    findBranch: "సమీప శాఖ కనుగొనండి",
    branchHours: "సోమ–శని · ఉ. 9:30 – సా. 6:00",
    getItOn: "లో పొందండి",
    downloadOn: "లో డౌన్‌లోడ్ చేయండి",
    copyright: `© ${new Date().getFullYear()} శ్రీ గణేష్ ఫైనాన్స్. సర్వహక్కులు సురక్షితం.`,
    privacyPolicy: "గోప్యతా విధానం",
    terms: "నిబంధనలు మరియు షరతులు",
    sitemap: "సైట్‌మ్యాప్",
    regInfo: "RBI నమోదిత NBFC · IRDAI కార్పొరేట్ ఏజెంట్ · AMFI నమోదిత",
    columns: {
      services: {
        heading: "సేవలు",
        links: [
          { label: "గోల్డ్ లోన్", href: "/services/gold-loan" },
          { label: "గోల్డ్ ఫ్లెక్సీ క్రెడిట్", href: "/services/gold-flexi-credit" },
          { label: "ఇంట్లో గోల్డ్ లోన్", href: "/services/gold-loan-at-home" },
          { label: "హౌసింగ్ ఫైనాన్స్", href: "/services/housing-finance" },
          { label: "వ్యక్తిగత రుణం", href: "/services/personal-loan" },
          { label: "స్మాల్ బిజినెస్ లోన్", href: "/services/small-business-loan" },
          { label: "SME లోన్", href: "/services/sme-loan" },
          { label: "కార్పొరేట్ బిజినెస్ లోన్", href: "/services/corporate-business-loan" },
          { label: "వాహన రుణం", href: "/services/vehicle-loan" },
          { label: "బీమా", href: "/services/insurance" },
          { label: "మ్యూచువల్ ఫండ్స్", href: "/services/mutual-funds" },
          { label: "మనీ ట్రాన్స్ఫర్", href: "/services/money-transfer" },
          { label: "క్రెడిట్ స్కోర్", href: "/services/credit-score" },
        ],
      },
      tools: {
        heading: "టూల్స్ & కాల్క్యులేటర్",
        links: [
          { label: "గోల్డ్ లోన్ కాల్క్యులేటర్", href: "/calculators/gold-loan" },
          { label: "వ్యక్తిగత రుణ కాల్క్యులేటర్", href: "/calculators/personal-loan" },
          { label: "హోమ్ లోన్ EMI కాల్క్యులేటర్", href: "/calculators/home-loan" },
          { label: "మ్యూచువల్ ఫండ్ కాల్క్యులేటర్", href: "/calculators/mutual-fund" },
          { label: "CIBIL స్కోర్ చెక్", href: "/services/credit-score" },
          { label: "నేటి బంగారు ధర", href: "/gold-rate" },
        ],
        subHeading: "వార్తలు",
        subLinks: [
          { label: "న్యూస్ బోర్డ్", href: "/news" },
          { label: "న్యూస్‌లెటర్", href: "/newsletter" },
          { label: "ప్రెస్", href: "/press" },
          { label: "సురక్షిత బ్యాంకింగ్ పద్ధతులు", href: "/safe-banking" },
        ],
        extraHeading: "బ్లాగ్",
        extraLinks: [
          { label: "అన్ని బ్లాగ్‌లు", href: "/blogs" },
          { label: "గోల్డ్ లోన్ అంతర్దృష్టులు", href: "/blogs/gold-loan" },
          { label: "పెట్టుబడి చిట్కాలు", href: "/blogs/investment" },
        ],
      },
      corporate: {
        heading: "కార్పొరేట్",
        links: [
          { label: "మా గురించి", href: "/about" },
          { label: "మా దృష్టి & లక్ష్యం", href: "/about#mission" },
          { label: "మా డైరెక్టర్లు", href: "/about#directors" },
          { label: "కార్పొరేట్ విలువలు", href: "/about#ethos" },
          { label: "మైలురాళ్ళు", href: "/about#milestones" },
          { label: "సామాజిక బాధ్యత", href: "/csr" },
          { label: "ఉద్యోగాలు", href: "/careers" },
        ],
        subHeading: "కస్టమర్ సర్వీస్",
        subLinks: [
          { label: "కస్టమర్ సర్వీస్", href: "/contact" },
          { label: "ప్రశ్నలు / అభిప్రాయం", href: "/contact#feedback" },
          { label: "ఫిర్యాదులు", href: "/contact#complaints" },
          { label: "శాఖ లోకేటర్", href: "/branches" },
          { label: "CKYCR అవగాహన", href: "/ckycr" },
        ],
      },
      policy: {
        heading: "విధానాలు",
        links: [
          { label: "న్యాయమైన అభ్యాస నియమావళి", href: "/policy/fair-practices" },
          { label: "ప్రవర్తన నియమావళి", href: "/policy/conduct" },
          { label: "వడ్డీ రేటు విధానం", href: "/policy/interest-rate" },
          { label: "గోప్యతా విధానం", href: "/policy/privacy" },
          { label: "రుణ విధానం", href: "/policy/loan" },
          { label: "నిబంధనలు మరియు షరతులు", href: "/policy/terms" },
          { label: "ఫిర్యాదు పరిష్కారం", href: "/policy/grievance" },
          { label: "వేలం విధానం", href: "/policy/auction" },
        ],
        subHeading: "సైట్‌మ్యాప్",
        subLinks: [{ label: "సైట్‌మ్యాప్", href: "/sitemap" }],
      },
      contact: {
        heading: "సంప్రదింపు",
        links: [
          { label: "సాధారణ విచారణలు", href: "/contact" },
          { label: "శాఖ లోకేటర్", href: "/branches" },
          { label: "కస్టమర్ ఫిర్యాదు", href: "/contact#grievance" },
        ],
      },
    },
  },

  // ─── TAMIL ───────────────────────────────────────────────────────
  ta: {
    securityNotice: "பாதுகாப்பு அறிவிப்பு:",
    securityText: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ் பெயரில் கடன் வழங்குவதாக கூறும் மோசடி அழைப்புகள், மின்னஞ்சல்கள் அல்லது செய்திகளில் இருந்து எச்சரிக்கையாக இருங்கள். நாங்கள் ஒருபோதும் முன்கூட்டிய கட்டணம் அல்லது OTP கேட்கமாட்டோம். எங்கள் அதிகாரப்பூர்வ தொடர்பு மட்டுமே",
    followUs: "எங்களை பின்தொடருங்கள்",
    downloadApp: "எங்கள் ஆப்பை பதிவிறக்கவும்",
    appTagline: "ஒரு ஆப் · பல நன்மைகள்",
    quickContact: "விரைவு தொடர்பு",
    tollfree: "1800 123 4567 (டோல்-ஃப்ரீ)",
    findBranch: "அருகிலுள்ள கிளை கண்டுபிடிக்கவும்",
    branchHours: "திங்கள்–சனி · காலை 9:30 – மாலை 6:00",
    getItOn: "இல் பெறுங்கள்",
    downloadOn: "இல் பதிவிறக்கவும்",
    copyright: `© ${new Date().getFullYear()} ஸ்ரீ கணேஷ் ஃபைனான்ஸ். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.`,
    privacyPolicy: "தனியுரிமை கொள்கை",
    terms: "விதிமுறைகள் மற்றும் நிபந்தனைகள்",
    sitemap: "சைட்மேப்",
    regInfo: "RBI பதிவு செய்யப்பட்ட NBFC · IRDAI கார்ப். ஏஜென்ட் · AMFI பதிவு செய்யப்பட்டது",
    columns: {
      services: {
        heading: "சேவைகள்",
        links: [
          { label: "கோல்டு லோன்", href: "/services/gold-loan" },
          { label: "கோல்டு ஃப்ளெக்ஸி கிரெடிட்", href: "/services/gold-flexi-credit" },
          { label: "வீட்டில் கோல்டு லோன்", href: "/services/gold-loan-at-home" },
          { label: "ஹவுசிங் ஃபைனான்ஸ்", href: "/services/housing-finance" },
          { label: "தனிப்பட்ட கடன்", href: "/services/personal-loan" },
          { label: "சிறு வணிக கடன்", href: "/services/small-business-loan" },
          { label: "SME கடன்", href: "/services/sme-loan" },
          { label: "கார்ப்பரேட் வணிக கடன்", href: "/services/corporate-business-loan" },
          { label: "வாகன கடன்", href: "/services/vehicle-loan" },
          { label: "காப்பீடு", href: "/services/insurance" },
          { label: "மியூச்சுவல் ஃபண்ட்ஸ்", href: "/services/mutual-funds" },
          { label: "பண பரிமாற்றம்", href: "/services/money-transfer" },
          { label: "கிரெடிட் ஸ்கோர்", href: "/services/credit-score" },
        ],
      },
      tools: {
        heading: "கருவிகள் & கணிப்பான்",
        links: [
          { label: "கோல்டு லோன் கணிப்பான்", href: "/calculators/gold-loan" },
          { label: "தனிப்பட்ட கடன் கணிப்பான்", href: "/calculators/personal-loan" },
          { label: "வீட்டு கடன் EMI கணிப்பான்", href: "/calculators/home-loan" },
          { label: "மியூச்சுவல் ஃபண்ட் கணிப்பான்", href: "/calculators/mutual-fund" },
          { label: "CIBIL ஸ்கோர் சரிபார்க்க", href: "/services/credit-score" },
          { label: "இன்றைய தங்க விலை", href: "/gold-rate" },
        ],
        subHeading: "செய்திகள்",
        subLinks: [
          { label: "செய்தி பலகை", href: "/news" },
          { label: "செய்திமடல்", href: "/newsletter" },
          { label: "பத்திரிகை", href: "/press" },
          { label: "பாதுகாப்பான வங்கி நடைமுறைகள்", href: "/safe-banking" },
        ],
        extraHeading: "வலைப்பதிவு",
        extraLinks: [
          { label: "அனைத்து வலைப்பதிவுகள்", href: "/blogs" },
          { label: "கோல்டு லோன் நுண்ணறிவுகள்", href: "/blogs/gold-loan" },
          { label: "முதலீட்டு குறிப்புகள்", href: "/blogs/investment" },
        ],
      },
      corporate: {
        heading: "கார்ப்பரேட்",
        links: [
          { label: "எங்களைப் பற்றி", href: "/about" },
          { label: "எங்கள் தொலைநோக்கு & நோக்கம்", href: "/about#mission" },
          { label: "எங்கள் இயக்குநர்கள்", href: "/about#directors" },
          { label: "கார்ப்பரேட் மதிப்புகள்", href: "/about#ethos" },
          { label: "மைல்கற்கள்", href: "/about#milestones" },
          { label: "சமூக பொறுப்பு", href: "/csr" },
          { label: "வாழ்க்கை வாய்ப்புகள்", href: "/careers" },
        ],
        subHeading: "வாடிக்கையாளர் சேவை",
        subLinks: [
          { label: "வாடிக்கையாளர் சேவை", href: "/contact" },
          { label: "கேள்விகள் / கருத்து", href: "/contact#feedback" },
          { label: "புகார்கள்", href: "/contact#complaints" },
          { label: "கிளை கண்டுபிடிப்பான்", href: "/branches" },
          { label: "CKYCR விழிப்புணர்வு", href: "/ckycr" },
        ],
      },
      policy: {
        heading: "கொள்கை",
        links: [
          { label: "நியாயமான நடைமுறை நெறிமுறை", href: "/policy/fair-practices" },
          { label: "நடத்தை நெறிமுறை", href: "/policy/conduct" },
          { label: "வட்டி விகித கொள்கை", href: "/policy/interest-rate" },
          { label: "தனியுரிமை கொள்கை", href: "/policy/privacy" },
          { label: "கடன் கொள்கை", href: "/policy/loan" },
          { label: "விதிமுறைகள் மற்றும் நிபந்தனைகள்", href: "/policy/terms" },
          { label: "குறைதீர்வு", href: "/policy/grievance" },
          { label: "ஏலக் கொள்கை", href: "/policy/auction" },
        ],
        subHeading: "சைட்மேப்",
        subLinks: [{ label: "சைட்மேப்", href: "/sitemap" }],
      },
      contact: {
        heading: "தொடர்பு",
        links: [
          { label: "பொதுவான கேள்விகள்", href: "/contact" },
          { label: "கிளை கண்டுபிடிப்பான்", href: "/branches" },
          { label: "வாடிக்கையாளர் புகார்", href: "/contact#grievance" },
        ],
      },
    },
  },

  // ─── KANNADA ─────────────────────────────────────────────────────
  kn: {
    securityNotice: "ಭದ್ರತಾ ಸೂಚನೆ:",
    securityText: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಹೆಸರಿನಲ್ಲಿ ಸಾಲ ನೀಡುವುದಾಗಿ ಹೇಳುವ ಮೋಸದ ಕರೆಗಳು, ಇಮೇಲ್‌ಗಳು ಅಥವಾ ಸಂದೇಶಗಳ ಬಗ್ಗೆ ಎಚ್ಚರಿಕೆ ವಹಿಸಿ. ನಾವು ಎಂದಿಗೂ ಮುಂಗಡ ಶುಲ್ಕ ಅಥವಾ OTP ಕೇಳುವುದಿಲ್ಲ. ನಮ್ಮ ಅಧಿಕೃತ ಸಂಪರ್ಕ ಮಾತ್ರ",
    followUs: "ನಮ್ಮನ್ನು ಅನುಸರಿಸಿ",
    downloadApp: "ನಮ್ಮ ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    appTagline: "ಒಂದು ಆ್ಯಪ್ · ಅನೇಕ ಪ್ರಯೋಜನಗಳು",
    quickContact: "ತ್ವರಿತ ಸಂಪರ್ಕ",
    tollfree: "1800 123 4567 (ಟೋಲ್-ಫ್ರೀ)",
    findBranch: "ಹತ್ತಿರದ ಶಾಖೆ ಹುಡುಕಿ",
    branchHours: "ಸೋಮ–ಶನಿ · ಬೆ. 9:30 – ಸಂ. 6:00",
    getItOn: "ನಲ್ಲಿ ಪಡೆಯಿರಿ",
    downloadOn: "ನಲ್ಲಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
    copyright: `© ${new Date().getFullYear()} ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್. ಎಲ್ಲ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.`,
    privacyPolicy: "ಗೌಪ್ಯತಾ ನೀತಿ",
    terms: "ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು",
    sitemap: "ಸೈಟ್‌ಮ್ಯಾಪ್",
    regInfo: "RBI ನೋಂದಾಯಿತ NBFC · IRDAI ಕಾರ್ಪ್. ಏಜೆಂಟ್ · AMFI ನೋಂದಾಯಿತ",
    columns: {
      services: {
        heading: "ಸೇವೆಗಳು",
        links: [
          { label: "ಗೋಲ್ಡ್ ಲೋನ್", href: "/services/gold-loan" },
          { label: "ಗೋಲ್ಡ್ ಫ್ಲೆಕ್ಸಿ ಕ್ರೆಡಿಟ್", href: "/services/gold-flexi-credit" },
          { label: "ಮನೆಯಲ್ಲಿ ಗೋಲ್ಡ್ ಲೋನ್", href: "/services/gold-loan-at-home" },
          { label: "ಹೌಸಿಂಗ್ ಫೈನಾನ್ಸ್", href: "/services/housing-finance" },
          { label: "ವೈಯಕ್ತಿಕ ಸಾಲ", href: "/services/personal-loan" },
          { label: "ಸ್ಮಾಲ್ ಬಿಸಿನೆಸ್ ಲೋನ್", href: "/services/small-business-loan" },
          { label: "SME ಲೋನ್", href: "/services/sme-loan" },
          { label: "ಕಾರ್ಪೊರೇಟ್ ಬಿಸಿನೆಸ್ ಲೋನ್", href: "/services/corporate-business-loan" },
          { label: "ವಾಹನ ಸಾಲ", href: "/services/vehicle-loan" },
          { label: "ವಿಮೆ", href: "/services/insurance" },
          { label: "ಮ್ಯೂಚುಯಲ್ ಫಂಡ್ಸ್", href: "/services/mutual-funds" },
          { label: "ಹಣ ವರ್ಗಾವಣೆ", href: "/services/money-transfer" },
          { label: "ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್", href: "/services/credit-score" },
        ],
      },
      tools: {
        heading: "ಟೂಲ್ಸ್ & ಕ್ಯಾಲ್ಕುಲೇಟರ್",
        links: [
          { label: "ಗೋಲ್ಡ್ ಲೋನ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್", href: "/calculators/gold-loan" },
          { label: "ವೈಯಕ್ತಿಕ ಸಾಲ ಕ್ಯಾಲ್ಕುಲೇಟರ್", href: "/calculators/personal-loan" },
          { label: "ಹೋಮ್ ಲೋನ್ EMI ಕ್ಯಾಲ್ಕುಲೇಟರ್", href: "/calculators/home-loan" },
          { label: "ಮ್ಯೂಚುಯಲ್ ಫಂಡ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್", href: "/calculators/mutual-fund" },
          { label: "CIBIL ಸ್ಕೋರ್ ಪರಿಶೀಲನೆ", href: "/services/credit-score" },
          { label: "ಇಂದಿನ ಚಿನ್ನದ ದರ", href: "/gold-rate" },
        ],
        subHeading: "ಸುದ್ದಿ",
        subLinks: [
          { label: "ನ್ಯೂಸ್ ಬೋರ್ಡ್", href: "/news" },
          { label: "ನ್ಯೂಸ್‌ಲೆಟರ್", href: "/newsletter" },
          { label: "ಪ್ರೆಸ್", href: "/press" },
          { label: "ಸುರಕ್ಷಿತ ಬ್ಯಾಂಕಿಂಗ್ ಅಭ್ಯಾಸಗಳು", href: "/safe-banking" },
        ],
        extraHeading: "ಬ್ಲಾಗ್",
        extraLinks: [
          { label: "ಎಲ್ಲಾ ಬ್ಲಾಗ್‌ಗಳು", href: "/blogs" },
          { label: "ಗೋಲ್ಡ್ ಲೋನ್ ಒಳನೋಟಗಳು", href: "/blogs/gold-loan" },
          { label: "ಹೂಡಿಕೆ ಸಲಹೆಗಳು", href: "/blogs/investment" },
        ],
      },
      corporate: {
        heading: "ಕಾರ್ಪೊರೇಟ್",
        links: [
          { label: "ನಮ್ಮ ಬಗ್ಗೆ", href: "/about" },
          { label: "ನಮ್ಮ ದೃಷ್ಟಿ & ಮಿಷನ್", href: "/about#mission" },
          { label: "ನಮ್ಮ ನಿರ್ದೇಶಕರು", href: "/about#directors" },
          { label: "ಕಾರ್ಪೊರೇಟ್ ಮೌಲ್ಯಗಳು", href: "/about#ethos" },
          { label: "ಮೈಲುಗಲ್ಲುಗಳು", href: "/about#milestones" },
          { label: "ಸಾಮಾಜಿಕ ಜವಾಬ್ದಾರಿ", href: "/csr" },
          { label: "ವೃತ್ತಿ", href: "/careers" },
        ],
        subHeading: "ಗ್ರಾಹಕ ಸೇವೆ",
        subLinks: [
          { label: "ಗ್ರಾಹಕ ಸೇವೆ", href: "/contact" },
          { label: "ಪ್ರಶ್ನೆಗಳು / ಅಭಿಪ್ರಾಯ", href: "/contact#feedback" },
          { label: "ದೂರುಗಳು", href: "/contact#complaints" },
          { label: "ಶಾಖೆ ಲೋಕೇಟರ್", href: "/branches" },
          { label: "CKYCR ಜಾಗೃತಿ", href: "/ckycr" },
        ],
      },
      policy: {
        heading: "ನೀತಿ",
        links: [
          { label: "ನ್ಯಾಯಯುತ ಅಭ್ಯಾಸ ಸಂಹಿತೆ", href: "/policy/fair-practices" },
          { label: "ನಡವಳಿಕೆ ಸಂಹಿತೆ", href: "/policy/conduct" },
          { label: "ಬಡ್ಡಿ ದರ ನೀತಿ", href: "/policy/interest-rate" },
          { label: "ಗೌಪ್ಯತಾ ನೀತಿ", href: "/policy/privacy" },
          { label: "ಸಾಲ ನೀತಿ", href: "/policy/loan" },
          { label: "ನಿಯಮಗಳು ಮತ್ತು ಷರತ್ತುಗಳು", href: "/policy/terms" },
          { label: "ದೂರು ನಿವಾರಣೆ", href: "/policy/grievance" },
          { label: "ಹರಾಜು ನೀತಿ", href: "/policy/auction" },
        ],
        subHeading: "ಸೈಟ್‌ಮ್ಯಾಪ್",
        subLinks: [{ label: "ಸೈಟ್‌ಮ್ಯಾಪ್", href: "/sitemap" }],
      },
      contact: {
        heading: "ಸಂಪರ್ಕ",
        links: [
          { label: "ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು", href: "/contact" },
          { label: "ಶಾಖೆ ಲೋಕೇಟರ್", href: "/branches" },
          { label: "ಗ್ರಾಹಕ ದೂರು", href: "/contact#grievance" },
        ],
      },
    },
  },

  // ─── ASSAMESE ────────────────────────────────────────────────────
  as: {
    securityNotice: "সুৰক্ষা জাননী:",
    securityText: "শ্ৰী গণেশ ফাইনেন্সৰ নামত ঋণ প্ৰদানৰ দাবী কৰা প্ৰতাৰণামূলক কল, ইমেইল বা বাৰ্তাৰ পৰা সাৱধান থাকক। আমি কেতিয়াও আগতীয়া মাচুল বা OTP নিবিচাৰো। আমাৰ চৰকাৰী যোগাযোগ কেৱল",
    followUs: "আমাক অনুসৰণ কৰক",
    downloadApp: "আমাৰ এপ ডাউনলোড কৰক",
    appTagline: "এটা এপ · বহু সুবিধা",
    quickContact: "দ্ৰুত যোগাযোগ",
    tollfree: "1800 123 4567 (টোল-ফ্ৰী)",
    findBranch: "নিকটবৰ্তী শাখা বিচাৰক",
    branchHours: "সোম–শনি · ৰাতিপুৱা 9:30 – সন্ধিয়া 6:00",
    getItOn: "ত পাওক",
    downloadOn: "ত ডাউনলোড কৰক",
    copyright: `© ${new Date().getFullYear()} শ্ৰী গণেশ ফাইনেন্স। সকলো অধিকাৰ সংৰক্ষিত।`,
    privacyPolicy: "গোপনীয়তা নীতি",
    terms: "চৰ্তাৱলী",
    sitemap: "চাইটমেপ",
    regInfo: "RBI পঞ্জীভুক্ত NBFC · IRDAI কৰ্প. এজেন্ট · AMFI পঞ্জীভুক্ত",
    columns: {
      services: {
        heading: "সেৱাসমূহ",
        links: [
          { label: "গোল্ড লোন", href: "/services/gold-loan" },
          { label: "গোল্ড ফ্লেক্সি ক্রেডিট", href: "/services/gold-flexi-credit" },
          { label: "ঘৰত গোল্ড লোন", href: "/services/gold-loan-at-home" },
          { label: "হাউচিং ফাইনেন্স", href: "/services/housing-finance" },
          { label: "ব্যক্তিগত ঋণ", href: "/services/personal-loan" },
          { label: "ক্ষুদ্ৰ ব্যৱসায় ঋণ", href: "/services/small-business-loan" },
          { label: "SME ঋণ", href: "/services/sme-loan" },
          { label: "কৰ্পোৰেট ব্যৱসায় ঋণ", href: "/services/corporate-business-loan" },
          { label: "বাহন ঋণ", href: "/services/vehicle-loan" },
          { label: "বীমা", href: "/services/insurance" },
          { label: "মিউচুৱেল ফান্ড", href: "/services/mutual-funds" },
          { label: "টকা হস্তান্তৰ", href: "/services/money-transfer" },
          { label: "ক্রেডিট স্কোৰ", href: "/services/credit-score" },
        ],
      },
      tools: {
        heading: "সঁজুলি আৰু কেলকুলেটৰ",
        links: [
          { label: "গোল্ড লোন কেলকুলেটৰ", href: "/calculators/gold-loan" },
          { label: "ব্যক্তিগত ঋণ কেলকুলেটৰ", href: "/calculators/personal-loan" },
          { label: "গৃহ ঋণ EMI কেলকুলেটৰ", href: "/calculators/home-loan" },
          { label: "মিউচুৱেল ফান্ড কেলকুলেটৰ", href: "/calculators/mutual-fund" },
          { label: "CIBIL স্কোৰ পৰীক্ষা", href: "/services/credit-score" },
          { label: "আজিৰ সোণৰ দাম", href: "/gold-rate" },
        ],
        subHeading: "বাতৰি",
        subLinks: [
          { label: "নিউজ বোৰ্ড", href: "/news" },
          { label: "নিউজলেটাৰ", href: "/newsletter" },
          { label: "প্ৰেছ", href: "/press" },
          { label: "সুৰক্ষিত বেংকিং পদ্ধতি", href: "/safe-banking" },
        ],
        extraHeading: "ব্লগ",
        extraLinks: [
          { label: "সকলো ব্লগ", href: "/blogs" },
          { label: "গোল্ড লোন তথ্য", href: "/blogs/gold-loan" },
          { label: "বিনিয়োগ টিপছ", href: "/blogs/investment" },
        ],
      },
      corporate: {
        heading: "কৰ্পোৰেট",
        links: [
          { label: "আমাৰ বিষয়ে", href: "/about" },
          { label: "আমাৰ দৃষ্টিভংগি আৰু লক্ষ্য", href: "/about#mission" },
          { label: "আমাৰ পৰিচালকসকল", href: "/about#directors" },
          { label: "কৰ্পোৰেট মূল্যবোধ", href: "/about#ethos" },
          { label: "মাইলৰ খুঁটি", href: "/about#milestones" },
          { label: "সামাজিক দায়বদ্ধতা", href: "/csr" },
          { label: "কেৰিয়াৰ", href: "/careers" },
        ],
        subHeading: "গ্ৰাহক সেৱা",
        subLinks: [
          { label: "গ্ৰাহক সেৱা", href: "/contact" },
          { label: "প্ৰশ্ন / মতামত", href: "/contact#feedback" },
          { label: "অভিযোগ", href: "/contact#complaints" },
          { label: "শাখা লোকেটৰ", href: "/branches" },
          { label: "CKYCR সচেতনতা", href: "/ckycr" },
        ],
      },
      policy: {
        heading: "নীতি",
        links: [
          { label: "ন্যায্য আচৰণ বিধি", href: "/policy/fair-practices" },
          { label: "আচৰণ বিধি", href: "/policy/conduct" },
          { label: "সুদৰ হাৰ নীতি", href: "/policy/interest-rate" },
          { label: "গোপনীয়তা নীতি", href: "/policy/privacy" },
          { label: "ঋণ নীতি", href: "/policy/loan" },
          { label: "চৰ্তাৱলী", href: "/policy/terms" },
          { label: "অভিযোগ নিষ্পত্তি", href: "/policy/grievance" },
          { label: "নিলাম নীতি", href: "/policy/auction" },
        ],
        subHeading: "চাইটমেপ",
        subLinks: [{ label: "চাইটমেপ", href: "/sitemap" }],
      },
      contact: {
        heading: "যোগাযোগ",
        links: [
          { label: "সাধাৰণ প্ৰশ্ন", href: "/contact" },
          { label: "শাখা লোকেটৰ", href: "/branches" },
          { label: "গ্ৰাহক অভিযোগ", href: "/contact#grievance" },
        ],
      },
    },
  },

  // ─── URDU ────────────────────────────────────────────────────────
  ur: {
    securityNotice: "سیکیورٹی نوٹس:",
    securityText: "شری گنیش فائنانس کے نام پر قرضہ دینے کا دعوی کرنے والی جعلی کالز، ای میل یا پیغامات سے ہوشیار رہیں۔ ہم کبھی بھی پیشگی فیس یا OTP نہیں مانگتے۔ ہماری سرکاری رابطہ صرف",
    followUs: "ہمیں فالو کریں",
    downloadApp: "ہماری ایپ ڈاؤن لوڈ کریں",
    appTagline: "ایک ایپ · بہت سے فوائد",
    quickContact: "فوری رابطہ",
    tollfree: "1800 123 4567 (ٹول-فری)",
    findBranch: "قریبی شاخ تلاش کریں",
    branchHours: "پیر–ہفتہ · صبح 9:30 – شام 6:00",
    getItOn: "پر حاصل کریں",
    downloadOn: "پر ڈاؤن لوڈ کریں",
    copyright: `© ${new Date().getFullYear()} شری گنیش فائنانس۔ جملہ حقوق محفوظ ہیں۔`,
    privacyPolicy: "رازداری کی پالیسی",
    terms: "شرائط و ضوابط",
    sitemap: "سائٹ میپ",
    regInfo: "RBI رجسٹرڈ NBFC · IRDAI کارپ. ایجنٹ · AMFI رجسٹرڈ",
    columns: {
      services: {
        heading: "خدمات",
        links: [
          { label: "گولڈ لون", href: "/services/gold-loan" },
          { label: "گولڈ فلیکسی کریڈٹ", href: "/services/gold-flexi-credit" },
          { label: "گھر پر گولڈ لون", href: "/services/gold-loan-at-home" },
          { label: "ہاؤسنگ فائنانس", href: "/services/housing-finance" },
          { label: "ذاتی قرضہ", href: "/services/personal-loan" },
          { label: "چھوٹا کاروباری قرضہ", href: "/services/small-business-loan" },
          { label: "SME قرضہ", href: "/services/sme-loan" },
          { label: "کارپوریٹ بزنس لون", href: "/services/corporate-business-loan" },
          { label: "گاڑی قرضہ", href: "/services/vehicle-loan" },
          { label: "بیمہ", href: "/services/insurance" },
          { label: "میوچول فنڈز", href: "/services/mutual-funds" },
          { label: "رقم کی منتقلی", href: "/services/money-transfer" },
          { label: "کریڈٹ اسکور", href: "/services/credit-score" },
        ],
      },
      tools: {
        heading: "ٹولز اور کیلکولیٹر",
        links: [
          { label: "گولڈ لون کیلکولیٹر", href: "/calculators/gold-loan" },
          { label: "ذاتی قرضہ کیلکولیٹر", href: "/calculators/personal-loan" },
          { label: "ہوم لون EMI کیلکولیٹر", href: "/calculators/home-loan" },
          { label: "میوچول فنڈ کیلکولیٹر", href: "/calculators/mutual-fund" },
          { label: "CIBIL اسکور چیک", href: "/services/credit-score" },
          { label: "آج کی سونے کی قیمت", href: "/gold-rate" },
        ],
        subHeading: "خبریں",
        subLinks: [
          { label: "نیوز بورڈ", href: "/news" },
          { label: "نیوز لیٹر", href: "/newsletter" },
          { label: "پریس", href: "/press" },
          { label: "محفوظ بینکنگ طریقے", href: "/safe-banking" },
        ],
        extraHeading: "بلاگ",
        extraLinks: [
          { label: "تمام بلاگز", href: "/blogs" },
          { label: "گولڈ لون بصیرت", href: "/blogs/gold-loan" },
          { label: "سرمایہ کاری کی تجاویز", href: "/blogs/investment" },
        ],
      },
      corporate: {
        heading: "کارپوریٹ",
        links: [
          { label: "ہمارے بارے میں", href: "/about" },
          { label: "ہماری وژن اور مشن", href: "/about#mission" },
          { label: "ہمارے ڈائریکٹرز", href: "/about#directors" },
          { label: "کارپوریٹ اقدار", href: "/about#ethos" },
          { label: "سنگ میل", href: "/about#milestones" },
          { label: "سماجی ذمہ داری", href: "/csr" },
          { label: "کیریئر", href: "/careers" },
        ],
        subHeading: "کسٹمر سروس",
        subLinks: [
          { label: "کسٹمر سروس", href: "/contact" },
          { label: "سوالات / رائے", href: "/contact#feedback" },
          { label: "شکایات", href: "/contact#complaints" },
          { label: "شاخ لوکیٹر", href: "/branches" },
          { label: "CKYCR آگاہی", href: "/ckycr" },
        ],
      },
      policy: {
        heading: "پالیسی",
        links: [
          { label: "منصفانہ عمل ضابطہ", href: "/policy/fair-practices" },
          { label: "ضابطہ اخلاق", href: "/policy/conduct" },
          { label: "سود کی شرح پالیسی", href: "/policy/interest-rate" },
          { label: "رازداری کی پالیسی", href: "/policy/privacy" },
          { label: "قرضہ پالیسی", href: "/policy/loan" },
          { label: "شرائط و ضوابط", href: "/policy/terms" },
          { label: "شکایت ازالہ", href: "/policy/grievance" },
          { label: "نیلامی پالیسی", href: "/policy/auction" },
        ],
        subHeading: "سائٹ میپ",
        subLinks: [{ label: "سائٹ میپ", href: "/sitemap" }],
      },
      contact: {
        heading: "رابطہ",
        links: [
          { label: "عمومی سوالات", href: "/contact" },
          { label: "شاخ لوکیٹر", href: "/branches" },
          { label: "صارف کی شکایت", href: "/contact#grievance" },
        ],
      },
    },
  },
};

// ── Helper: get translation with English fallback ─────────────────
function ft(lang) {
  return FOOTER_TRANSLATIONS[lang] || FOOTER_TRANSLATIONS["en"];
}

// Social icons
const SOCIALS = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    svg: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com",
    svg: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    svg: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    svg: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" /></svg>),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    svg: (<svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>),
  },
];

// ── Mobile Accordion ──────────────────────────────────────────────
function MobileAccordion({ col }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left">
        <span className="text-xs font-black tracking-widest uppercase text-white">{col.heading}</span>
        <span className={`w-5 h-5 flex items-center justify-center text-white/50 transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </span>
      </button>
      <div className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ maxHeight: open ? "600px" : "0px", opacity: open ? 1 : 0 }}>
        <div className="pb-4 space-y-2.5">
          {col.links.map((l) => (
            <Link key={l.label} to={l.href} className="block text-xs text-white/55 hover:text-red-400 transition-colors duration-200 leading-relaxed">{l.label}</Link>
          ))}
          {col.subHeading && (
            <>
              <p className="text-[10px] font-black tracking-widest uppercase text-white/30 pt-3 pb-1">{col.subHeading}</p>
              {col.subLinks?.map((l) => (
                <Link key={l.label} to={l.href} className="block text-xs text-white/55 hover:text-red-400 transition-colors duration-200">{l.label}</Link>
              ))}
            </>
          )}
          {col.extraHeading && (
            <>
              <p className="text-[10px] font-black tracking-widest uppercase text-white/30 pt-3 pb-1">{col.extraHeading}</p>
              {col.extraLinks?.map((l) => (
                <Link key={l.label} to={l.href} className="block text-xs text-white/55 hover:text-red-400 transition-colors duration-200">{l.label}</Link>
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
  const { lang } = useLanguage();
  const T = ft(lang);
  const isRtl = lang === "ur";

  // Build columns array from translation
  const FOOTER_COLUMNS = [
    { id: "services",   ...T.columns.services  },
    { id: "tools",      ...T.columns.tools     },
    { id: "corporate",  ...T.columns.corporate },
    { id: "policy",     ...T.columns.policy    },
    { id: "contact",    ...T.columns.contact   },
  ];

  return (
    <footer className="w-full bg-[#1a1a1a] text-white" dir={isRtl ? "rtl" : "ltr"}>

      {/* ── Top warning bar ── */}
      <div className="bg-[#111] border-b border-white/10 px-4 sm:px-8 lg:px-10 py-3">
        <p className="text-[11px] text-white/40 leading-5 max-w-[1400px] mx-auto text-center sm:text-left">
          <span className="text-yellow-500 font-bold">⚠ {T.securityNotice}</span>{" "}
          {T.securityText}{" "}
          <a href="mailto:info@shreegf.com" className="text-red-400 hover:underline font-medium">info@shreegf.com</a>.
        </p>
      </div>

      {/* ── Main footer content ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 pt-10 sm:pt-14 pb-8">

        {/* ══ DESKTOP LAYOUT ══ */}
        <div className="hidden lg:grid grid-cols-[1.2fr_1fr_1fr_1fr_0.9fr] gap-8 xl:gap-12 pb-10 border-b border-white/10">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.id}>
              <h4 className="text-[11px] font-black tracking-[0.18em] uppercase text-white mb-4">{col.heading}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.href} className="text-[13px] text-white/55 hover:text-red-400 transition-colors duration-200 leading-relaxed">{l.label}</Link>
                  </li>
                ))}
              </ul>
              {col.subHeading && (
                <div className="mt-6">
                  <h4 className="text-[11px] font-black tracking-[0.18em] uppercase text-white mb-4">{col.subHeading}</h4>
                  <ul className="space-y-2">
                    {col.subLinks?.map((l) => (
                      <li key={l.label}><Link to={l.href} className="text-[13px] text-white/55 hover:text-red-400 transition-colors duration-200">{l.label}</Link></li>
                    ))}
                  </ul>
                </div>
              )}
              {col.extraHeading && (
                <div className="mt-6">
                  <h4 className="text-[11px] font-black tracking-[0.18em] uppercase text-white mb-4">{col.extraHeading}</h4>
                  <ul className="space-y-2">
                    {col.extraLinks?.map((l) => (
                      <li key={l.label}><Link to={l.href} className="text-[13px] text-white/55 hover:text-red-400 transition-colors duration-200">{l.label}</Link></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ══ MOBILE ACCORDION LAYOUT ══ */}
        <div className="lg:hidden pb-6 border-b border-white/10">
          {FOOTER_COLUMNS.map((col) => <MobileAccordion key={col.id} col={col} />)}
        </div>

        {/* ── Bottom row: Social + App Download + Contact ── */}
        <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Social */}
          <div>
            <p className="text-[11px] font-black tracking-[0.18em] uppercase text-white mb-4">{T.followUs}</p>
            <div className="flex items-center gap-2.5 flex-wrap">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-red-900/30">
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* App Download */}
          <div>
            <p className="text-[11px] font-black tracking-[0.18em] uppercase text-white mb-4">{T.downloadApp}</p>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/10 flex-shrink-0 border border-white/10">
                <img src="/half logo.png" alt="Shree Ganesh Finance" className="w-full h-full object-contain p-1" />
              </div>
              <div className="flex flex-col gap-2">
                <a href="#" className="flex items-center gap-2 bg-black border border-white/20 hover:border-white/40 rounded-lg px-3 py-1.5 transition-all duration-200 hover:bg-white/5 group">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white/70 group-hover:text-white flex-shrink-0">
                    <path d="M3.18 23.76c.3.17.64.24.99.2l12.6-11.96L13.6 9l-10.42 14.76zM.5 1.6C.19 1.96 0 2.48 0 3.12v17.76c0 .64.19 1.16.51 1.52L.6 22.5 12.56 10.5v-.28L.6 1.7l-.1-.1zM19.97 9.5l-2.98-1.73L13.6 11l3.4 3.44 3-1.74c.85-.49.85-1.3 0-1.78l.01-.02zM3.18.24L15.78 12.2 12.6 9 .6 1.5A1.16 1.16 0 013.18.24z" />
                  </svg>
                  <div>
                    <p className="text-[8px] text-white/40 leading-none">{T.getItOn}</p>
                    <p className="text-[11px] font-bold text-white leading-tight">Google Play</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-2 bg-black border border-white/20 hover:border-white/40 rounded-lg px-3 py-1.5 transition-all duration-200 hover:bg-white/5 group">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white/70 group-hover:text-white flex-shrink-0">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  <div>
                    <p className="text-[8px] text-white/40 leading-none">{T.downloadOn}</p>
                    <p className="text-[11px] font-bold text-white leading-tight">App Store</p>
                  </div>
                </a>
              </div>
            </div>
            <p className="text-[10px] text-white/30 mt-2.5 tracking-wide">{T.appTagline}</p>
          </div>

          {/* Quick Contact */}
          <div>
            <p className="text-[11px] font-black tracking-[0.18em] uppercase text-white mb-4">{T.quickContact}</p>
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
                {T.tollfree}
              </a>
              <Link to="/branches" className="flex items-center gap-2.5 text-[13px] text-white/55 hover:text-red-400 transition-colors duration-200 group">
                <span className="w-7 h-7 rounded-lg bg-white/5 group-hover:bg-red-600/20 flex items-center justify-center flex-shrink-0 transition-colors">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </span>
                {T.findBranch}
              </Link>
              <p className="text-[11px] text-white/25 pl-9">{T.branchHours}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10 bg-[#111]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 order-2 sm:order-1">
            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
              <img src="/half logo.png" alt="Shree Ganesh Finance" className="w-full h-full object-contain p-0.5" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-white/60 leading-tight">Shree Ganesh Finance</p>
              <p className="text-[10px] text-white/30 leading-tight">{T.regInfo}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 order-1 sm:order-2 text-center">
            <p className="text-[11px] text-white/30">{T.copyright}</p>
            <div className="flex items-center gap-3">
              <Link to="/policy/privacy" className="text-[11px] text-white/40 hover:text-red-400 transition-colors">{T.privacyPolicy}</Link>
              <span className="text-white/20 text-xs">·</span>
              <Link to="/policy/terms" className="text-[11px] text-white/40 hover:text-red-400 transition-colors">{T.terms}</Link>
              <span className="text-white/20 text-xs">·</span>
              <Link to="/sitemap" className="text-[11px] text-white/40 hover:text-red-400 transition-colors">{T.sitemap}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}