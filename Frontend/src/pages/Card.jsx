// ─────────────────────────────────────────────────────────────────────────────
// Card.jsx  —  Gold Loan Schemes  |  Ganesh Fincorp  v4 FINAL
// Location: src/component/Card.jsx
//
// Language now works because we import useLanguage from ../Common/Navbaar
// — the SAME context instance that App.jsx's <LanguageProvider> provides.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// ── THE FIX: import useLanguage from Navbaar (same context as Navbar) ─────────
import { useLanguage } from "../Common/Navbaar";

// ─────────────────────────────────────────────────────────────────────────────
// UI LABELS — 9 languages (Gold Loan section text)
// ─────────────────────────────────────────────────────────────────────────────
const UI = {
  en: { eyebrow:"Ganesh Fincorp", title:"Gold Loan Schemes", subtitle:"Trusted financial solutions backed by the value of your gold.", all_schemes:"All Schemes", learn_more:"Learn More", show_more:"View All Schemes", show_less:"Show Less", enquire_now:"Enquire Now", know_more:"Know More" },
  hi: { eyebrow:"गणेश फिनकॉर्प", title:"गोल्ड लोन योजनाएं", subtitle:"आपके सोने की कीमत पर भरोसेमंद वित्तीय समाधान।", all_schemes:"सभी योजनाएं", learn_more:"और जानें", show_more:"सभी योजनाएं देखें", show_less:"कम दिखाएं", enquire_now:"अभी पूछताछ करें", know_more:"अधिक जानें" },
  mr: { eyebrow:"गणेश फिनकॉर्प", title:"गोल्ड लोन योजना", subtitle:"तुमच्या सोन्याच्या मूल्यावर आधारित विश्वासार्ह आर्थिक उपाय.", all_schemes:"सर्व योजना", learn_more:"अधिक जाणा", show_more:"सर्व योजना पाहा", show_less:"कमी दाखवा", enquire_now:"आता चौकशी करा", know_more:"अधिक माहिती" },
  gu: { eyebrow:"ગણેશ ફિનકોર્પ", title:"ગોલ્ડ લોન યોજનાઓ", subtitle:"તમારા સોનાના મૂલ્ય પર આધારિત વિશ્વસનીય નાણાકીય ઉકેલો.", all_schemes:"બધી યોજનાઓ", learn_more:"વધુ જાણો", show_more:"બધી યોજનાઓ જુઓ", show_less:"ઓછું દર્શાવો", enquire_now:"હવે પૂછપરછ કરો", know_more:"વધુ માહિતી" },
  te: { eyebrow:"గణేష్ ఫిన్‌కార్ప్", title:"గోల్డ్ లోన్ పథకాలు", subtitle:"మీ బంగారం విలువపై నమ్మదగిన ఆర్థిక పరిష్కారాలు.", all_schemes:"అన్ని పథకాలు", learn_more:"మరింత తెలుసుకోండి", show_more:"అన్ని పథకాలు చూడండి", show_less:"తక్కువ చూపించు", enquire_now:"ఇప్పుడు విచారించండి", know_more:"మరింత సమాచారం" },
  ta: { eyebrow:"கணேஷ் ஃபின்கார்ப்", title:"தங்கக் கடன் திட்டங்கள்", subtitle:"உங்கள் தங்கத்தின் மதிப்பை அடிப்படையாகக் கொண்ட நம்பகமான நிதி தீர்வுகள்.", all_schemes:"அனைத்து திட்டங்கள்", learn_more:"மேலும் அறிக", show_more:"அனைத்து திட்டங்களும் காண்க", show_less:"குறைவாக காட்டு", enquire_now:"இப்போது விசாரிக்கவும்", know_more:"மேலும் தகவல்" },
  kn: { eyebrow:"ಗಣೇಶ್ ಫಿನ್‌ಕಾರ್ಪ್", title:"ಗೋಲ್ಡ್ ಲೋನ್ ಯೋಜನೆಗಳು", subtitle:"ನಿಮ್ಮ ಚಿನ್ನದ ಮೌಲ್ಯದ ಮೇಲೆ ನಂಬಿಕೆಯ ಹಣಕಾಸು ಪರಿಹಾರಗಳು.", all_schemes:"ಎಲ್ಲಾ ಯೋಜನೆಗಳು", learn_more:"ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ", show_more:"ಎಲ್ಲಾ ಯೋಜನೆಗಳನ್ನು ನೋಡಿ", show_less:"ಕಡಿಮೆ ತೋರಿಸು", enquire_now:"ಈಗ ವಿಚಾರಿಸಿ", know_more:"ಹೆಚ್ಚಿನ ಮಾಹಿತಿ" },
  as: { eyebrow:"গণেশ ফিনকৰ্প", title:"গোল্ড লোন আঁচনিসমূহ", subtitle:"আপোনাৰ সোণৰ মূল্যৰ ওপৰত ভিত্তি কৰি বিশ্বস্ত আৰ্থিক সমাধান।", all_schemes:"সকলো আঁচনি", learn_more:"অধিক জানক", show_more:"সকলো আঁচনি চাওক", show_less:"কম দেখুৱাওক", enquire_now:"এতিয়াই সুধিব", know_more:"অধিক তথ্য" },
  ur: { eyebrow:"گنیش فن کارپ", title:"گولڈ لون اسکیمیں", subtitle:"آپ کے سونے کی قیمت پر مبنی قابل اعتماد مالی حل۔", all_schemes:"تمام اسکیمیں", learn_more:"مزید جانیں", show_more:"تمام اسکیمیں دیکھیں", show_less:"کم دکھائیں", enquire_now:"ابھی دریافت کریں", know_more:"مزید معلومات" },
};

const lbl = (lang, key) => (UI[lang] || UI.en)[key] || UI.en[key] || key;

// ─────────────────────────────────────────────────────────────────────────────
// SCHEME DATA
// ─────────────────────────────────────────────────────────────────────────────
const BASE_DETAILS = {
  MOL: ["Online Gold Loan (OGL) Facility available","Loan Amount ₹1,500 to ₹50,000","Tenure: 12 Months","Free Insurance for pledged gold ornaments","Lowest interest rate at 13.9% p.a. if 100% interest paid monthly"],
  MUL: ["Online Gold Loan (OGL) Facility available","Loan Amount Min ₹1,500","Flexible repayment tenure","Free Insurance for pledged gold ornaments","Competitive interest rates for higher loan amounts"],
  MDL: ["Online Gold Loan (OGL) facility available","Loan Amount: ₹75,000 to ₹5 crores","Tenure: 12 Months","Free Insurance for pledged gold ornaments","Premium scheme with exclusive benefits for high-value customers"],
  MML: ["Online Gold Loan (OGL) Facility available","Loan Amount: ₹1,500 to ₹1 lakh","Tenure: 12 Months","Free Insurance for pledged gold ornaments","Designed for small business and personal needs"],
  MAL: ["Online Gold Loan (OGL) facility available","Offered at branches in South India","Competitive interest rates","Free Insurance for pledged gold ornaments","Exclusively tailored for South Indian customers"],
  MHP: ["Online Gold Loan (OGL) facility available","Offered at branches in North India","High value loan with premium benefits","Free Insurance for pledged gold ornaments","Exclusively tailored for North Indian customers"],
  MHL: ["Online Gold Loan (OGL) facility available","Designed for high-value loan seekers","Flexible tenure options","Free Insurance for pledged gold ornaments","Dedicated relationship manager support"],
  MBS: ["Online Gold Loan (OGL) facility available","Tailored for large-scale business needs","High loan amount with flexible tenure","Free Insurance for pledged gold ornaments","Dedicated business support team"],
  BVS: ["Online Gold Loan (OGL) facility available","Best value for money scheme","Competitive interest rates","Free Insurance for pledged gold ornaments","Ideal for customers seeking maximum value"],
  HVR: ["Online Gold Loan (OGL) facility available","Special scheme for existing high-value customers","Exclusive retention offers","Free Insurance for pledged gold ornaments","Loyalty rewards and benefits"],
};

const SCHEMES_BY_LANG = {
  en: [
    {id:"MOL",title:"Ganesh One Percent Loan",        h:["Online Gold Loan (OGL) Facility available","Loan Amount ₹1,500 to ₹50,000"]},
    {id:"MUL",title:"Ganesh Ultimate Loan",            h:["Online Gold Loan (OGL) Facility available","Loan Amount Min ₹1,500"]},
    {id:"MDL",title:"Ganesh Delight Loan",             h:["Online Gold Loan (OGL) facility available","Loan Amount: ₹75,000 to ₹5 crores"]},
    {id:"MML",title:"Ganesh Mudra Loan",               h:["Online Gold Loan (OGL) Facility available","Loan Amount: ₹1,500 to ₹1 lakh"]},
    {id:"MAL",title:"Ganesh Advantage Loan",           h:["Online Gold Loan (OGL) facility available","Offered at branches in South India"]},
    {id:"MHP",title:"Ganesh High Value Plus Loan",     h:["Online Gold Loan (OGL) facility available","Offered at branches in North India"]},
    {id:"MHL",title:"Ganesh High Value Loan",          h:["Online Gold Loan (OGL) facility available","High value loan for premium customers"]},
    {id:"MBS",title:"Ganesh Big Business Loans",       h:["Online Gold Loan (OGL) facility available","For large business requirements"]},
    {id:"BVS",title:"Best Value Scheme",               h:["Online Gold Loan (OGL) facility available","Best value for money scheme"]},
    {id:"HVR",title:"High Value Retention",            h:["Online Gold Loan (OGL) facility available","Exclusive retention benefits"]},
  ],
  hi: [
    {id:"MOL",title:"गणेश वन परसेंट लोन",            h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","लोन राशि ₹1,500 से ₹50,000"]},
    {id:"MUL",title:"गणेश अल्टीमेट लोन",              h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","न्यूनतम लोन राशि ₹1,500"]},
    {id:"MDL",title:"गणेश डिलाइट लोन",                h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","लोन राशि: ₹75,000 से ₹5 करोड़"]},
    {id:"MML",title:"गणेश मुद्रा लोन",                 h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","लोन राशि: ₹1,500 से ₹1 लाख"]},
    {id:"MAL",title:"गणेश एडवांटेज लोन",               h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","दक्षिण भारत की शाखाओं में उपलब्ध"]},
    {id:"MHP",title:"गणेश हाई वैल्यू प्लस लोन",      h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","उत्तर भारत की शाखाओं में उपलब्ध"]},
    {id:"MHL",title:"गणेश हाई वैल्यू लोन",            h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","उच्च मूल्य प्रीमियम लोन"]},
    {id:"MBS",title:"गणेश बिग बिजनेस लोन",            h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","बड़े व्यवसाय के लिए"]},
    {id:"BVS",title:"बेस्ट वैल्यू स्कीम",              h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","सर्वोत्तम मूल्य योजना"]},
    {id:"HVR",title:"हाई वैल्यू रिटेंशन",              h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","विशेष रिटेंशन लाभ"]},
  ],
  mr: [
    {id:"MOL",title:"गणेश वन परसेंट लोन",            h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","कर्ज रक्कम ₹1,500 ते ₹50,000"]},
    {id:"MUL",title:"गणेश अल्टिमेट लोन",              h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","किमान कर्ज ₹1,500"]},
    {id:"MDL",title:"गणेश डिलाइट लोन",                h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","₹75,000 ते ₹5 कोटी"]},
    {id:"MML",title:"गणेश मुद्रा लोन",                 h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","₹1,500 ते ₹1 लाख"]},
    {id:"MAL",title:"गणेश अॅडव्हान्टेज लोन",          h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","दक्षिण भारतातील शाखांमध्ये उपलब्ध"]},
    {id:"MHP",title:"गणेश हाय व्हॅल्यू प्लस लोन",    h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","उत्तर भारतातील शाखांमध्ये उपलब्ध"]},
    {id:"MHL",title:"गणेश हाय व्हॅल्यू लोन",          h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","उच्च मूल्य कर्ज"]},
    {id:"MBS",title:"गणेश बिग बिझनेस लोन",            h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","मोठ्या व्यवसायासाठी"]},
    {id:"BVS",title:"बेस्ट व्हॅल्यू स्कीम",            h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","सर्वोत्तम मूल्य"]},
    {id:"HVR",title:"हाय व्हॅल्यू रिटेन्शन",           h:["ऑनलाइन गोल्ड लोन (OGL) सुविधा उपलब्ध","विशेष रिटेन्शन फायदे"]},
  ],
  gu: [
    {id:"MOL",title:"ગણેશ વન પર્સન્ટ લોન",           h:["ઓનલાઇન ગોલ્ડ લોન (OGL) સુવિધા ઉપલબ્ધ","લોન રકમ ₹1,500 થી ₹50,000"]},
    {id:"MUL",title:"ગણેશ અલ્ટિમેટ લોન",              h:["ઓનલાઇન ગોલ્ડ લોન (OGL) સુવિધા ઉપલબ્ધ","લઘુત્તમ લોન ₹1,500"]},
    {id:"MDL",title:"ગણેશ ડિલાઇટ લોન",                h:["ઓનલાઇન ગોલ્ડ લોન (OGL) સુવિધા ઉપલબ્ધ","₹75,000 થી ₹5 કરોડ"]},
    {id:"MML",title:"ગણેશ મુદ્રા લોન",                 h:["ઓનલાઇન ગોલ્ડ લોન (OGL) સુવિધા ઉપલબ્ધ","₹1,500 થી ₹1 લાખ"]},
    {id:"MAL",title:"ગણેશ એડવાન્ટેજ લોન",             h:["ઓનલાઇન ગોલ્ડ લોન (OGL) સુવિધા ઉપલબ્ધ","દક્ષિણ ભારતની શાખાઓમાં"]},
    {id:"MHP",title:"ગણેશ હાઇ વૅલ્યુ પ્લસ લોન",      h:["ઓનલાઇન ગોલ્ડ લોન (OGL) સુવિધા ઉપલબ્ધ","ઉત્તર ભારતની શાખાઓમાં"]},
    {id:"MHL",title:"ગણેશ હાઇ વૅલ્યુ લોન",            h:["ઓનલાઇન ગોલ્ડ લોન (OGL) સુવિધા ઉપલબ્ધ","ઉચ્ચ મૂલ્ય પ્રીમિયમ લોન"]},
    {id:"MBS",title:"ગણેશ બિગ બિઝનેસ લોન",            h:["ઓનલાઇન ગોલ્ડ લોન (OGL) સુવિધા ઉપલબ્ધ","મોટા વ્યવસાય માટે"]},
    {id:"BVS",title:"બેસ્ટ વૅલ્યુ સ્કીમ",              h:["ઓનલાઇન ગોલ્ડ લોન (OGL) સુવિધા ઉપલબ્ધ","શ્રેષ્ઠ મૂલ્ય યોજના"]},
    {id:"HVR",title:"હાઇ વૅલ્યુ રિટેન્શન",             h:["ઓનલાઇન ગોલ્ડ લોન (OGL) સુવિધા ઉપલબ્ધ","વિશેષ રિટેન્શન લાભ"]},
  ],
  te: [
    {id:"MOL",title:"గణేష్ వన్ పర్సెంట్ లోన్",       h:["ఆన్‌లైన్ గోల్డ్ లోన్ (OGL) సదుపాయం అందుబాటులో","రుణ మొత్తం ₹1,500 నుండి ₹50,000"]},
    {id:"MUL",title:"గణేష్ అల్టిమేట్ లోన్",           h:["ఆన్‌లైన్ గోల్డ్ లోన్ (OGL) సదుపాయం అందుబాటులో","కనీస రుణం ₹1,500"]},
    {id:"MDL",title:"గణేష్ డిలైట్ లోన్",              h:["ఆన్‌లైన్ గోల్డ్ లోన్ (OGL) సదుపాయం అందుబాటులో","₹75,000 నుండి ₹5 కోట్లు"]},
    {id:"MML",title:"గణేష్ ముద్రా లోన్",               h:["ఆన్‌లైన్ గోల్డ్ లోన్ (OGL) సదుపాయం అందుబాటులో","₹1,500 నుండి ₹1 లక్ష"]},
    {id:"MAL",title:"గణేష్ అడ్వాంటేజ్ లోన్",          h:["ఆన్‌లైన్ గోల్డ్ లోన్ (OGL) సదుపాయం అందుబాటులో","దక్షిణ భారత శాఖలలో అందుబాటులో"]},
    {id:"MHP",title:"గణేష్ హై వాల్యూ ప్లస్ లోన్",    h:["ఆన్‌లైన్ గోల్డ్ లోన్ (OGL) సదుపాయం అందుబాటులో","ఉత్తర భారత శాఖలలో అందుబాటులో"]},
    {id:"MHL",title:"గణేష్ హై వాల్యూ లోన్",           h:["ఆన్‌లైన్ గోల్డ్ లోన్ (OGL) సదుపాయం అందుబాటులో","అధిక విలువ ప్రీమియం లోన్"]},
    {id:"MBS",title:"గణేష్ బిగ్ బిజినెస్ లోన్",       h:["ఆన్‌లైన్ గోల్డ్ లోన్ (OGL) సదుపాయం అందుబాటులో","పెద్ద వ్యాపారానికి"]},
    {id:"BVS",title:"బెస్ట్ వాల్యూ స్కీమ్",            h:["ఆన్‌లైన్ గోల్డ్ లోన్ (OGL) సదుపాయం అందుబాటులో","ఉత్తమ విలువ పథకం"]},
    {id:"HVR",title:"హై వాల్యూ రిటెన్షన్",            h:["ఆన్‌లైన్ గోల్డ్ లోన్ (OGL) సదుపాయం అందుబాటులో","ప్రత్యేక నిలుపుదల ప్రయోజనాలు"]},
  ],
  ta: [
    {id:"MOL",title:"கணேஷ் ஒன் பர்சன்ட் லோன்",      h:["ஆன்லைன் கோல்ட் லோன் (OGL) வசதி கிடைக்கிறது","கடன் தொகை ₹1,500 முதல் ₹50,000"]},
    {id:"MUL",title:"கணேஷ் அல்டிமேட் லோன்",          h:["ஆன்லைன் கோல்ட் லோன் (OGL) வசதி கிடைக்கிறது","குறைந்தபட்ச கடன் ₹1,500"]},
    {id:"MDL",title:"கணேஷ் டிலைட் லோன்",             h:["ஆன்லைன் கோல்ட் லோன் (OGL) வசதி கிடைக்கிறது","₹75,000 முதல் ₹5 கோடி"]},
    {id:"MML",title:"கணேஷ் முத்ரா லோன்",              h:["ஆன்லைன் கோல்ட் லோன் (OGL) வசதி கிடைக்கிறது","₹1,500 முதல் ₹1 லட்சம்"]},
    {id:"MAL",title:"கணேஷ் அட்வான்டேஜ் லோன்",       h:["ஆன்லைன் கோல்ட் லோன் (OGL) வசதி கிடைக்கிறது","தென் இந்திய கிளைகளில் கிடைக்கும்"]},
    {id:"MHP",title:"கணேஷ் ஹை வேல்யூ பிளஸ் லோன்",  h:["ஆன்லைன் கோல்ட் லோன் (OGL) வசதி கிடைக்கிறது","வட இந்திய கிளைகளில் கிடைக்கும்"]},
    {id:"MHL",title:"கணேஷ் ஹை வேல்யூ லோன்",         h:["ஆன்லைன் கோல்ட் லோன் (OGL) வசதி கிடைக்கிறது","உயர் மதிப்பு பிரீமியம் கடன்"]},
    {id:"MBS",title:"கணேஷ் பிக் பிஸினஸ் லோன்",      h:["ஆன்லைன் கோல்ட் லோன் (OGL) வசதி கிடைக்கிறது","பெரிய வணிகத்திற்காக"]},
    {id:"BVS",title:"பெஸ்ட் வேல்யூ ஸ்கீம்",           h:["ஆன்லைன் கோல்ட் லோன் (OGL) வசதி கிடைக்கிறது","சிறந்த மதிப்பு திட்டம்"]},
    {id:"HVR",title:"ஹை வேல்யூ ரிடென்ஷன்",           h:["ஆன்லைன் கோல்ட் லோன் (OGL) வசதி கிடைக்கிறது","சிறப்பு தக்கவைப்பு நன்மைகள்"]},
  ],
  kn: [
    {id:"MOL",title:"ಗಣೇಶ್ ವನ್ ಪರ್ಸೆಂಟ್ ಲೋನ್",     h:["ಆನ್‌ಲೈನ್ ಗೋಲ್ಡ್ ಲೋನ್ (OGL) ಸೌಲಭ್ಯ ಲಭ್ಯ","ಸಾಲದ ಮೊತ್ತ ₹1,500 ರಿಂದ ₹50,000"]},
    {id:"MUL",title:"ಗಣೇಶ್ ಅಲ್ಟಿಮೇಟ್ ಲೋನ್",          h:["ಆನ್‌ಲೈನ್ ಗೋಲ್ಡ್ ಲೋನ್ (OGL) ಸೌಲಭ್ಯ ಲಭ್ಯ","ಕನಿಷ್ಠ ಸಾಲ ₹1,500"]},
    {id:"MDL",title:"ಗಣೇಶ್ ಡಿಲೈಟ್ ಲೋನ್",             h:["ಆನ್‌ಲೈನ್ ಗೋಲ್ಡ್ ಲೋನ್ (OGL) ಸೌಲಭ್ಯ ಲಭ್ಯ","₹75,000 ರಿಂದ ₹5 ಕೋಟಿ"]},
    {id:"MML",title:"ಗಣೇಶ್ ಮುದ್ರಾ ಲೋನ್",              h:["ಆನ್‌ಲೈನ್ ಗೋಲ್ಡ್ ಲೋನ್ (OGL) ಸೌಲಭ್ಯ ಲಭ್ಯ","₹1,500 ರಿಂದ ₹1 ಲಕ್ಷ"]},
    {id:"MAL",title:"ಗಣೇಶ್ ಅಡ್ವಾಂಟೇಜ್ ಲೋನ್",         h:["ಆನ್‌ಲೈನ್ ಗೋಲ್ಡ್ ಲೋನ್ (OGL) ಸೌಲಭ್ಯ ಲಭ್ಯ","ದಕ್ಷಿಣ ಭಾರತದ ಶಾಖೆಗಳಲ್ಲಿ"]},
    {id:"MHP",title:"ಗಣೇಶ್ ಹೈ ವ್ಯಾಲ್ಯೂ ಪ್ಲಸ್ ಲೋನ್",   h:["ಆನ್‌ಲೈನ್ ಗೋಲ್ಡ್ ಲೋನ್ (OGL) ಸೌಲಭ್ಯ ಲಭ್ಯ","ಉತ್ತರ ಭಾರತದ ಶಾಖೆಗಳಲ್ಲಿ"]},
    {id:"MHL",title:"ಗಣೇಶ್ ಹೈ ವ್ಯಾಲ್ಯೂ ಲೋನ್",         h:["ಆನ್‌ಲೈನ್ ಗೋಲ್ಡ್ ಲೋನ್ (OGL) ಸೌಲಭ್ಯ ಲಭ್ಯ","ಉನ್ನತ ಮೌಲ್ಯ ಪ್ರೀಮಿಯಂ ಸಾಲ"]},
    {id:"MBS",title:"ಗಣೇಶ್ ಬಿಗ್ ಬಿಸಿನೆಸ್ ಲೋನ್",      h:["ಆನ್‌ಲೈನ್ ಗೋಲ್ಡ್ ಲೋನ್ (OGL) ಸೌಲಭ್ಯ ಲಭ್ಯ","ದೊಡ್ಡ ವ್ಯಾಪಾರಕ್ಕಾಗಿ"]},
    {id:"BVS",title:"ಬೆಸ್ಟ್ ವ್ಯಾಲ್ಯೂ ಸ್ಕೀಮ್",           h:["ಆನ್‌ಲೈನ್ ಗೋಲ್ಡ್ ಲೋನ್ (OGL) ಸೌಲಭ್ಯ ಲಭ್ಯ","ಅತ್ಯುತ್ತಮ ಮೌಲ್ಯ ಯೋಜನೆ"]},
    {id:"HVR",title:"ಹೈ ವ್ಯಾಲ್ಯೂ ರಿಟೆನ್ಶನ್",           h:["ಆನ್‌ಲೈನ್ ಗೋಲ್ಡ್ ಲೋನ್ (OGL) ಸೌಲಭ್ಯ ಲಭ್ಯ","ವಿಶೇಷ ಉಳಿಕೆ ಪ್ರಯೋಜನಗಳು"]},
  ],
  as: [
    {id:"MOL",title:"গণেশ ৱান পাৰ্চেণ্ট লোন",        h:["অনলাইন গোল্ড লোন (OGL) সুবিধা উপলব্ধ","ঋণৰ পৰিমাণ ₹1,500 ৰ পৰা ₹50,000"]},
    {id:"MUL",title:"গণেশ আলটিমেট লোন",               h:["অনলাইন গোল্ড লোন (OGL) সুবিধা উপলব্ধ","নূন্যতম ঋণ ₹1,500"]},
    {id:"MDL",title:"গণেশ ডিলাইট লোন",                h:["অনলাইন গোল্ড লোন (OGL) সুবিধা উপলব্ধ","₹75,000 ৰ পৰা ₹5 কোটি"]},
    {id:"MML",title:"গণেশ মুদ্ৰা লোন",                 h:["অনলাইন গোল্ড লোন (OGL) সুবিধা উপলব্ধ","₹1,500 ৰ পৰা ₹1 লাখ"]},
    {id:"MAL",title:"গণেশ এডভান্টেজ লোন",             h:["অনলাইন গোল্ড লোন (OGL) সুবিধা উপলব্ধ","দক্ষিণ ভাৰতৰ শাখাত উপলব্ধ"]},
    {id:"MHP",title:"গণেশ হাই ভেল্যু প্লাছ লোন",     h:["অনলাইন গোল্ড লোন (OGL) সুবিধা উপলব্ধ","উত্তৰ ভাৰতৰ শাখাত উপলব্ধ"]},
    {id:"MHL",title:"গণেশ হাই ভেল্যু লোন",            h:["অনলাইন গোল্ড লোন (OGL) সুবিধা উপলব্ধ","উচ্চ মূল্য প্ৰিমিয়াম লোন"]},
    {id:"MBS",title:"গণেশ বিগ বিজনেছ লোন",            h:["অনলাইন গোল্ড লোন (OGL) সুবিধা উপলব্ধ","ডাঙৰ ব্যৱসায়ৰ বাবে"]},
    {id:"BVS",title:"বেষ্ট ভেল্যু স্কিম",              h:["অনলাইন গোল্ড লোন (OGL) সুবিধা উপলব্ধ","সৰ্বোত্তম মূল্য আঁচনি"]},
    {id:"HVR",title:"হাই ভেল্যু ৰিটেনচন",             h:["অনলাইন গোল্ড লোন (OGL) সুবিধা উপলব্ধ","বিশেষ ধৰি ৰখাৰ সুবিধা"]},
  ],
  ur: [
    {id:"MOL",title:"گنیش ون پرسنٹ لون",              h:["آن لائن گولڈ لون (OGL) سہولت دستیاب","قرض کی رقم ₹1,500 سے ₹50,000"]},
    {id:"MUL",title:"گنیش الٹیمیٹ لون",               h:["آن لائن گولڈ لون (OGL) سہولت دستیاب","کم از کم قرض ₹1,500"]},
    {id:"MDL",title:"گنیش ڈیلائٹ لون",                h:["آن لائن گولڈ لون (OGL) سہولت دستیاب","₹75,000 سے ₹5 کروڑ"]},
    {id:"MML",title:"گنیش مدرا لون",                   h:["آن لائن گولڈ لون (OGL) سہولت دستیاب","₹1,500 سے ₹1 لاکھ"]},
    {id:"MAL",title:"گنیش ایڈوانٹیج لون",             h:["آن لائن گولڈ لون (OGL) سہولت دستیاب","جنوبی ہند کی شاخوں میں دستیاب"]},
    {id:"MHP",title:"گنیش ہائی ویلیو پلس لون",       h:["آن لائن گولڈ لون (OGL) سہولت دستیاب","شمالی ہند کی شاخوں میں دستیاب"]},
    {id:"MHL",title:"گنیش ہائی ویلیو لون",            h:["آن لائن گولڈ لون (OGL) سہولت دستیاب","اعلی قدر پریمیم قرض"]},
    {id:"MBS",title:"گنیش بگ بزنس لون",               h:["آن لائن گولڈ لون (OGL) سہولت دستیاب","بڑے کاروبار کے لیے"]},
    {id:"BVS",title:"بیسٹ ویلیو اسکیم",               h:["آن لائن گولڈ لون (OGL) سہولت دستیاب","بہترین قیمت اسکیم"]},
    {id:"HVR",title:"ہائی ویلیو ریٹینشن",             h:["آن لائن گولڈ لون (OGL) سہولت دستیاب","خصوصی برقراری فوائد"]},
  ],
};

const getSchemes = (lang) => {
  const list = SCHEMES_BY_LANG[lang] || SCHEMES_BY_LANG.en;
  return list.map(s => ({ ...s, highlights: s.h, details: BASE_DETAILS[s.id] || [] }));
};

const ICON_MAP       = { MOL:1,MUL:2,MDL:3,MML:4,MAL:5,MHP:6,MHL:7,MBS:8,BVS:9,HVR:10 };
const MOBILE_VISIBLE = 4;
const SCROLL_H       = "calc(100vh - 210px)";

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL CSS (injected once into <head>)
// ─────────────────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

  .gl-root, .gl-root * { box-sizing: border-box; }

  @keyframes gl-slideL   { from{opacity:0;transform:translateX(-52px)} to{opacity:1;transform:translateX(0)} }
  @keyframes gl-slideR   { from{opacity:0;transform:translateX(52px)}  to{opacity:1;transform:translateX(0)} }
  @keyframes gl-fadeDown { from{opacity:0;transform:translateY(-16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes gl-fadeUp   { from{opacity:0;transform:translateY(20px)}  to{opacity:1;transform:translateY(0)} }
  @keyframes gl-pop      { from{opacity:0;transform:scale(0.9) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }

  /* --- FIX 3: reset hidden state so animation can replay every time section enters viewport --- */
  .gl-root .gl-header,
  .gl-root .gl-sidebar,
  .gl-root .gl-cards  { opacity: 0; }

  /* viewport entry — plays every time is-visible is (re)added */
  .gl-root.is-visible .gl-header  { animation: gl-fadeDown 0.6s  cubic-bezier(.22,1,.36,1) both; }
  .gl-root.is-visible .gl-sidebar { animation: gl-slideL   0.65s cubic-bezier(.22,1,.36,1) .1s both; }
  .gl-root.is-visible .gl-cards   { animation: gl-slideR   0.65s cubic-bezier(.22,1,.36,1) .15s both; }

  /* language change re-animation */
  .gl-root.lang-flash .gl-header  { animation: gl-fadeDown 0.42s cubic-bezier(.22,1,.36,1) both; }
  .gl-root.lang-flash .gl-sidebar { animation: gl-slideL   0.48s cubic-bezier(.22,1,.36,1) .04s both; }
  .gl-root.lang-flash .gl-cards   { animation: gl-slideR   0.48s cubic-bezier(.22,1,.36,1) .07s both; }

  .gl-card-wrap { animation: gl-fadeUp 0.38s ease-out both; }

  .gl-scr::-webkit-scrollbar       { width: 4px; }
  .gl-scr::-webkit-scrollbar-track { background: transparent; }
  .gl-scr::-webkit-scrollbar-thumb { background: #ddd0b0; border-radius: 8px; }
  .gl-scr::-webkit-scrollbar-thumb:hover { background: #c8a84b; }

  .gl-sbi               { transition: background .18s; }
  .gl-sbi:hover         { background: #fff8ee !important; }
  .gl-sbi.on            { background: #fff3e6 !important; }
  .gl-sbi.on .gl-sbt    { color: #c8102e !important; }
  .gl-sbi .gl-chv       { opacity: .2;  transition: opacity .18s, color .18s; }
  .gl-sbi:hover .gl-chv { opacity: .65; }
  .gl-sbi.on .gl-chv    { opacity: 1; color: #c8102e; }

  .gl-crd               { transition: border-color .22s, box-shadow .22s, transform .3s; }
  .gl-crd:hover         { border-color:#e8c87a!important; box-shadow:0 10px 36px rgba(200,16,46,.11)!important; transform:translateY(-4px)!important; }
  .gl-crd.act           { border-color:#c8102e!important; box-shadow:0 14px 44px rgba(200,16,46,.17)!important; transform:translateY(-6px)!important; }

  .gl-lm:hover     { gap: 10px !important; }
  .gl-lm svg       { transition: transform .2s; }
  .gl-lm:hover svg { transform: translateX(4px); }

  .gl-enq:hover { opacity:.87; box-shadow:0 8px 24px rgba(200,16,46,.32)!important; }
  .gl-kmr:hover { background:#fff0f0!important; }
  .gl-cls:hover { transform:scale(1.12) rotate(90deg)!important; }
  .gl-sml:hover { background:#fff5f5!important; box-shadow:0 6px 24px rgba(200,16,46,.18)!important; }

  @media (max-width:1023px) { .gl-sidebar { display:none!important; } }
`;

// ─────────────────────────────────────────────────────────────────────────────
// ICONS
// ─────────────────────────────────────────────────────────────────────────────
const IcoCheck = () => (<svg viewBox="0 0 20 20" fill="none" style={{width:16,height:16,flexShrink:0,marginTop:2}}><circle cx="10" cy="10" r="9" fill="#fff5f0" stroke="#c8102e" strokeWidth="1.5"/><path d="M6.5 10l2.5 2.5 4.5-5" stroke="#c8102e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const IcoArrow = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{width:13,height:13,flexShrink:0}}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>);
const IcoChevR = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:12,height:12,flexShrink:0}}><polyline points="9 18 15 12 9 6"/></svg>);
const IcoChevD = ({open}) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14,flexShrink:0,transition:"transform .3s",transform:open?"rotate(180deg)":"rotate(0)"}}><polyline points="6 9 12 15 18 9"/></svg>);
const IcoX     = () => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{width:14,height:14}}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);
const IcoDot   = () => (<svg viewBox="0 0 8 8" fill="#c8a84b" style={{width:6,height:6,flexShrink:0,marginTop:7}}><circle cx="4" cy="4" r="3"/></svg>);

// ─────────────────────────────────────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────────────────────────────────────
function SchemeModal({ scheme, lang, onClose, onEnquire, onKnowMore }) {
  const ref = useRef(null);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const esc = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [onClose]);
  if (!scheme) return null;
  const idx = ICON_MAP[scheme.id] || 1;
  return (
    <div ref={ref} onClick={e => { if (e.target === ref.current) onClose(); }}
      style={{position:"fixed",inset:0,zIndex:700,display:"flex",alignItems:"center",
        justifyContent:"center",padding:16,background:"rgba(8,5,2,.7)",backdropFilter:"blur(6px)"}}>
      <div style={{position:"relative",background:"#fff",width:"100%",maxWidth:520,borderRadius:20,
        overflow:"hidden",maxHeight:"90vh",overflowY:"auto",
        boxShadow:"0 40px 100px rgba(0,0,0,.3)",
        animation:"gl-pop .3s cubic-bezier(.34,1.56,.64,1) forwards"}}>
        <div style={{height:4,background:"linear-gradient(90deg,#c8102e,#d94f1c 55%,#c8a84b)"}}/>
        <div style={{padding:"22px 24px 18px",borderBottom:"1px solid #f0ebe0",
          display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:14}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            {/* FIX 2: Modal icon — bigger, 68px container, 38px image */}
            <div style={{width:68,height:68,borderRadius:16,flexShrink:0,display:"flex",
              alignItems:"center",justifyContent:"center",
              background:"linear-gradient(135deg,#fff8ee,#fff5f5)",border:"1.5px solid #f0e0c0"}}>
              <img src={`/card/img${idx}.webp`} alt={scheme.id}
                style={{width:38,height:38,objectFit:"contain"}}
                onError={e => { e.target.style.display="none"; }}/>
            </div>
            <div>
              <p style={{fontSize:9,fontWeight:700,letterSpacing:".2em",textTransform:"uppercase",
                color:"#c8a84b",marginBottom:3,fontFamily:"'DM Sans',sans-serif"}}>
                GANESH FINCORP — {scheme.id}
              </p>
              <h2 style={{fontSize:19,fontWeight:400,color:"#1a1208",lineHeight:1.25,margin:0,
                fontFamily:"'DM Serif Display',Georgia,serif"}}>{scheme.title}</h2>
            </div>
          </div>
          <button onClick={onClose} className="gl-cls" aria-label="Close"
            style={{width:34,height:34,borderRadius:"50%",border:"none",cursor:"pointer",
              background:"#1a1208",color:"#fff",display:"flex",alignItems:"center",
              justifyContent:"center",flexShrink:0,transition:"transform .25s"}}>
            <IcoX/>
          </button>
        </div>
        <div style={{padding:"20px 24px 26px"}}>
          {/* FIX 1: Modal detail list — font size 14.5px, lineHeight 1.75, weight 400 */}
          <ul style={{listStyle:"none",margin:"0 0 22px",padding:0}}>
            {scheme.details.map((d,i) => (
              <li key={i} style={{display:"flex",alignItems:"flex-start",gap:12,marginBottom:13}}>
                <IcoCheck/>
                <span style={{fontSize:14.5,color:"#3d3020",lineHeight:1.75,
                  fontFamily:"'DM Sans',sans-serif",fontWeight:400}}>{d}</span>
              </li>
            ))}
          </ul>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <button onClick={onEnquire} className="gl-enq"
              style={{flex:1,minWidth:140,padding:"13px 20px",borderRadius:50,border:"none",
                cursor:"pointer",background:"linear-gradient(135deg,#c8102e,#a00c24)",color:"#fff",
                fontSize:12,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",
                fontFamily:"'DM Sans',sans-serif",transition:"opacity .2s,box-shadow .2s"}}>
              {lbl(lang,"enquire_now")}
            </button>
            <button onClick={onKnowMore} className="gl-kmr"
              style={{flex:1,minWidth:140,padding:"13px 20px",borderRadius:50,cursor:"pointer",
                border:"2px solid #c8102e",background:"transparent",color:"#c8102e",
                fontSize:12,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",
                fontFamily:"'DM Sans',sans-serif",transition:"background .2s"}}>
              {lbl(lang,"know_more")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR ITEM
// ─────────────────────────────────────────────────────────────────────────────
function SidebarItem({ scheme, isActive, onClick }) {
  return (
    <button onClick={onClick}
      className={`gl-sbi${isActive?" on":""}`}
      style={{width:"100%",textAlign:"left",padding:"13px 16px 13px 22px",
        display:"flex",alignItems:"center",gap:10,border:"none",
        borderBottom:"1px solid #f0ebe0",background:"transparent",
        cursor:"pointer",position:"relative"}}>
      {isActive && (
        <span style={{position:"absolute",left:0,top:"50%",transform:"translateY(-50%)",
          width:3,height:22,borderRadius:"0 3px 3px 0",
          background:"linear-gradient(180deg,#c8102e,#c8a84b)"}}/>
      )}
      {/* FIX 1: Sidebar font — 11.5px, weight 600 for better readability */}
      <span className="gl-sbt"
        style={{fontSize:11.5,fontWeight:600,letterSpacing:".04em",textTransform:"uppercase",
          color:isActive?"#c8102e":"#4a3828",fontFamily:"'DM Sans',sans-serif",
          flex:1,lineHeight:1.5,transition:"color .18s"}}>
        {scheme.title}
      </span>
      <span className="gl-chv" style={{color:isActive?"#c8102e":"#999"}}><IcoChevR/></span>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOAN CARD
// ─────────────────────────────────────────────────────────────────────────────
function LoanCard({ scheme, lang, isActive, index, onClick, onLearnMore }) {
  const idx = ICON_MAP[scheme.id] || 1;
  return (
    <div onClick={onClick}
      className={`gl-crd gl-card-wrap${isActive?" act":""}`}
      style={{background:"#fff",borderRadius:16,overflow:"hidden",display:"flex",
        flexDirection:"column",cursor:"pointer",
        border:isActive?"2px solid #c8102e":"2px solid #ede8df",
        boxShadow:isActive?"0 14px 44px rgba(200,16,46,.17)":"0 2px 12px rgba(100,70,20,.07)",
        transform:isActive?"translateY(-6px)":"translateY(0)",
        animationDelay:`${index*55}ms`}}
      role="button" tabIndex={0}
      onKeyDown={e => { if(e.key==="Enter"||e.key===" ") onClick(); }}>
      <div style={{height:3,background:isActive
        ?"linear-gradient(90deg,#c8102e,#c8a84b)"
        :"linear-gradient(90deg,#ede8df,#f0ebe0)",transition:"background .3s"}}/>
      <div style={{padding:"18px 18px 20px",display:"flex",flexDirection:"column",flex:1}}>
        {/* FIX 2: Card icon container — 56px, image 32px */}
        <div style={{width:56,height:56,borderRadius:14,marginBottom:14,display:"flex",
          alignItems:"center",justifyContent:"center",
          background:isActive?"linear-gradient(135deg,#fff8ee,#fff5f5)":"#faf8f4",
          border:`1.5px solid ${isActive?"#f0d8b0":"#ede8df"}`,transition:"all .3s"}}>
          <img src={`/card/img${idx}.webp`} alt={scheme.id}
            style={{width:32,height:32,objectFit:"contain"}}
            onError={e => { e.target.style.display="none"; }}/>
        </div>
        <span style={{alignSelf:"flex-start",fontSize:8.5,fontWeight:800,letterSpacing:".2em",
          textTransform:"uppercase",padding:"3px 9px",borderRadius:50,marginBottom:9,
          background:isActive?"#fff3e6":"#f5f0e8",color:isActive?"#c8102e":"#9c8060",
          border:`1px solid ${isActive?"#f0d0a0":"#ede8df"}`,transition:"all .22s",
          fontFamily:"'DM Sans',sans-serif"}}>{scheme.id}</span>
        {/* FIX 1: Card title — 15px, color darker for contrast */}
        <h3 style={{fontSize:15,fontWeight:400,lineHeight:1.4,marginBottom:12,
          color:isActive?"#c8102e":"#1a0e06",
          fontFamily:"'DM Serif Display',Georgia,serif",transition:"color .2s"}}>
          {scheme.title}
        </h3>
        {/* FIX 1: Card highlights — 12.5px, darker color */}
        <ul style={{listStyle:"none",margin:"0 0 16px",padding:0,flex:1}}>
          {scheme.highlights.map((h,i) => (
            <li key={i} style={{display:"flex",alignItems:"flex-start",gap:9,marginBottom:8}}>
              <IcoDot/>
              <span style={{fontSize:12.5,color:"#4a3525",lineHeight:1.6,
                fontFamily:"'DM Sans',sans-serif",fontWeight:400}}>{h}</span>
            </li>
          ))}
        </ul>
        {/* FIX 1: Learn More button — 11.5px */}
        <button onClick={e=>{e.stopPropagation();onLearnMore();}} className="gl-lm"
          style={{display:"flex",alignItems:"center",gap:6,background:"none",border:"none",
            cursor:"pointer",padding:0,color:"#c8102e",fontSize:11.5,fontWeight:700,
            letterSpacing:".12em",textTransform:"uppercase",fontFamily:"'DM Sans',sans-serif",
            transition:"gap .2s"}}>
          {lbl(lang,"learn_more")}<IcoArrow/>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function GoldLoanSchemes() {
  const { lang } = useLanguage();

  const navigate   = useNavigate();
  const sectionRef = useRef(null);

  const [activeId, setActiveId] = useState("MOL");
  const [modal,    setModal]    = useState(null);
  const [showAll,  setShowAll]  = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Inject CSS once
  useEffect(() => {
    if (!document.getElementById("gl-v4")) {
      const s = document.createElement("style");
      s.id = "gl-v4"; s.textContent = GLOBAL_CSS;
      document.head.appendChild(s);
    }
  }, []);

  // FIX 3: Scroll-into-view animation — replays EVERY TIME section enters viewport
  // We do NOT call obs.disconnect() so the observer keeps watching.
  // On exit (isIntersecting=false) we remove is-visible; on re-entry it gets added again.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Remove first to force CSS animation restart even if class was already there
        el.classList.remove("is-visible");
        void el.offsetWidth; // force reflow
        el.classList.add("is-visible");
      } else {
        // Section left viewport — reset so animation plays fresh on next entry
        el.classList.remove("is-visible");
      }
    }, { threshold: 0.07 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Language change → reset state + slide animation replays
  useEffect(() => {
    const el = sectionRef.current;
    setActiveId("MOL");
    setShowAll(false);
    setModal(null);
    if (!el) return;
    el.classList.remove("lang-flash");
    void el.offsetWidth;
    el.classList.add("lang-flash");
    const t = setTimeout(() => el.classList.remove("lang-flash"), 700);
    return () => clearTimeout(t);
  }, [lang]);

  // Responsive breakpoint
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const schemes      = useMemo(() => getSchemes(lang), [lang]);
  const hiddenCount  = schemes.length - MOBILE_VISIBLE;
  const isRTL        = lang === "ur";
  const displayCards = (!isMobile || showAll) ? schemes : schemes.slice(0, MOBILE_VISIBLE);

  const openModal  = s => { setActiveId(s.id); setModal(s); };
  const closeModal = () => setModal(null);

  return (
    <section
      ref={sectionRef}
      className="gl-root"
      dir={isRTL ? "rtl" : "ltr"}
      // SEO: semantic landmark with aria-label for screen readers & crawlers
      aria-label="Gold Loan Schemes by Ganesh Fincorp"
      style={{
        minHeight: "100vh",
        padding: "60px 24px 72px",
        background: "linear-gradient(158deg,#faf8f4 0%,#f5f0e8 45%,#faf5f0 100%)",
        fontFamily: "'DM Sans',sans-serif",
      }}>

      <div style={{maxWidth:1320,margin:"0 auto"}}>

        {/* ── HEADER ── */}
        {/* SEO: h1 with descriptive text, subtitle as <p> for crawlability */}
        <header className="gl-header" style={{marginBottom:40}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10,
            flexDirection:isRTL?"row-reverse":"row"}}>
            <div style={{width:28,height:3,borderRadius:2,
              background:"linear-gradient(90deg,#c8102e,#c8a84b)"}}/>
            {/* FIX 1: eyebrow — 11px, weight 700, slightly darker gold */}
            <span style={{fontSize:11,fontWeight:700,letterSpacing:".22em",
              textTransform:"uppercase",color:"#b8902a",fontFamily:"'DM Sans',sans-serif"}}>
              {lbl(lang,"eyebrow")}
            </span>
          </div>
          {/* FIX 1: h1 uses clamp with higher floor 28px */}
          <h1 style={{fontSize:"clamp(28px,3.8vw,42px)",fontWeight:400,color:"#110b04",
            margin:"0 0 12px",fontFamily:"'DM Serif Display',Georgia,serif",lineHeight:1.15}}>
            {lbl(lang,"title")}
          </h1>
          {/* FIX 1: subtitle — 15.5px, darker color for readability */}
          <p style={{fontSize:15.5,color:"#5c4530",maxWidth:460,lineHeight:1.7,margin:0,
            fontFamily:"'DM Sans',sans-serif",fontWeight:400}}>
            {lbl(lang,"subtitle")}
          </p>
        </header>

        {/* ── LAYOUT ── */}
        <div style={{display:"flex",gap:28,alignItems:"stretch",
          flexDirection:isRTL?"row-reverse":"row"}}>

          {/* ── SIDEBAR (desktop only) ── */}
          <aside className="gl-sidebar"
            aria-label="Loan scheme navigation"
            style={{width:264,flexShrink:0,position:"sticky",top:96,
              alignSelf:"flex-start",height:SCROLL_H,display:"flex",flexDirection:"column"}}>
            <div style={{background:"#fff",borderRadius:16,border:"1.5px solid #ede8df",
              boxShadow:"0 4px 24px rgba(100,70,20,.08)",
              display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
              <div style={{padding:"14px 22px",borderBottom:"2px solid #c8a84b",
                background:"linear-gradient(90deg,#fff8ee,#fff)",flexShrink:0}}>
                {/* FIX 1: sidebar heading — 10.5px */}
                <span style={{fontSize:10.5,fontWeight:800,letterSpacing:".2em",
                  textTransform:"uppercase",color:"#c8102e",fontFamily:"'DM Sans',sans-serif"}}>
                  {lbl(lang,"all_schemes")}
                </span>
              </div>
              <div className="gl-scr" style={{flex:1,overflowY:"auto"}}>
                {schemes.map(s => (
                  <SidebarItem key={s.id} scheme={s}
                    isActive={activeId===s.id}
                    onClick={() => openModal(s)}/>
                ))}
                <div style={{height:8}}/>
              </div>
            </div>
          </aside>

          {/* ── CARDS PANEL ── */}
          <div className="gl-cards"
            style={{flex:1,minWidth:0,display:"flex",flexDirection:"column"}}>
            <div className={isMobile?"":"gl-scr"}
              style={{flex:1,overflowY:isMobile?"visible":"auto",
                maxHeight:isMobile?"none":SCROLL_H,paddingRight:isMobile?0:6}}>
              <div style={{
                display:"grid",
                gridTemplateColumns:isMobile
                  ?"repeat(auto-fill,minmax(260px,1fr))"
                  :"repeat(auto-fill,minmax(220px,1fr))",
                gap:18,paddingBottom:4,
              }}>
                {displayCards.map((s,i) => (
                  <LoanCard key={`${s.id}-${lang}`}
                    scheme={s} lang={lang}
                    isActive={activeId===s.id}
                    index={i}
                    onClick={() => openModal(s)}
                    onLearnMore={() => navigate("/services")}
                  />
                ))}
              </div>
            </div>

            {/* Show More — MOBILE ONLY */}
            {isMobile && hiddenCount > 0 && (
              <div style={{display:"flex",justifyContent:"center",marginTop:24}}>
                <button onClick={() => setShowAll(v=>!v)} className="gl-sml"
                  style={{display:"flex",alignItems:"center",gap:10,
                    padding:"13px 30px",borderRadius:50,
                    border:"2px solid #c8102e",background:"#fff",color:"#c8102e",
                    fontSize:12,fontWeight:700,letterSpacing:".09em",textTransform:"uppercase",
                    fontFamily:"'DM Sans',sans-serif",cursor:"pointer",
                    transition:"background .2s,box-shadow .2s"}}>
                  {showAll ? lbl(lang,"show_less") : `${lbl(lang,"show_more")} (+${hiddenCount})`}
                  <IcoChevD open={showAll}/>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── MODAL ── */}
      {modal && (
        <SchemeModal scheme={modal} lang={lang}
          onClose={closeModal}
          onEnquire={() => { closeModal(); navigate("/contact"); }}
          onKnowMore={() => { closeModal(); navigate("/about"); }}
        />
      )}
    </section>
  );
}