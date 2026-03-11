import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../Common/Navbaar";

// ═══════════════════════════════════════════════════════════════════════════════
// TRANSLATIONS — 9 languages
// ═══════════════════════════════════════════════════════════════════════════════
const TRANSLATIONS = {
  en: {
    headline: "Why Thousands Trust Ganesh Finance",
    subline: "Your money is safe, growing, and always accessible.",
    slides: [
      {
        badge: "RBI REGISTERED",
        title: "Regulated by RBI",
        desc: "Ganesh Finance is a fully licensed NBFC registered with the Reserve Bank of India — the highest regulatory authority for financial institutions.",
        stat: "Since 2020",
        statLabel: "RBI Licensed",
      },
      {
        badge: "DICGC INSURED",
        title: "Your Deposits Are Insured",
        desc: "Every deposit is protected under DICGC insurance, giving you complete peace of mind even in unexpected circumstances.",
        stat: "₹5 Lakh",
        statLabel: "Insured Per Depositor",
      },
      {
        badge: "15+ YEARS",
        title: "Trusted Since 2020",
        desc: "Over 15 years of consistent, transparent returns. We have never missed a single interest payment — not once.",
        stat: "100%",
        statLabel: "On-Time Payouts",
      },
      {
        badge: "1000+ INVESTORS",
        title: "A Community of Believers",
        desc: "More than 1000 investors across India choose Ganesh Finance for their savings. Join a family that grows together.",
        stat: "1.5 Cr+",
        statLabel: "Assets Managed",
      },
      {
        badge: "ISO 9001:2015",
        title: "Certified Excellence",
        desc: "ISO 9001:2015 certified for quality management. Every process, every promise, every payout — held to the highest standard.",
        stat: "ISO",
        statLabel: "Certified Quality",
      },
      {
        badge: "GUARANTEED RETURNS",
        title: "Returns You Can Count On",
        desc: "Unlike mutual funds or stocks, our Fixed Deposit plans offer guaranteed, pre-fixed interest rates. No surprises, just growth.",
        stat: "Up to 13.5%",
        statLabel: "Per Annum",
      },
    ],
  },
  hi: {
    headline: "हजारों लोग Ganesh Finance पर क्यों भरोसा करते हैं",
    subline: "आपका पैसा सुरक्षित है, बढ़ रहा है, और हमेशा उपलब्ध है।",
    slides: [
      {
        badge: "RBI पंजीकृत",
        title: "RBI द्वारा विनियमित",
        desc: "Ganesh Finance भारतीय रिज़र्व बैंक के साथ पूरी तरह से लाइसेंस प्राप्त NBFC है — वित्तीय संस्थानों के लिए सर्वोच्च नियामक प्राधिकरण।",
        stat: "2020 से",
        statLabel: "RBI लाइसेंसधारी",
      },
      {
        badge: "DICGC बीमित",
        title: "आपकी जमाएँ बीमित हैं",
        desc: "प्रत्येक जमा DICGC बीमा के अंतर्गत सुरक्षित है, जो अप्रत्याशित परिस्थितियों में भी आपको पूरी मानसिक शांति देता है।",
        stat: "₹5 लाख",
        statLabel: "प्रति जमाकर्ता बीमित",
      },
      {
        badge: "15+ वर्ष",
        title: "2020 से विश्वसनीय",
        desc: "15+ वर्षों का लगातार, पारदर्शी रिटर्न। हमने एक भी ब्याज भुगतान कभी नहीं चूका — एक बार भी नहीं।",
        stat: "100%",
        statLabel: "समय पर भुगतान",
      },
      {
        badge: "1000+ निवेशक",
        title: "विश्वासियों का समुदाय",
        desc: "भारत भर में 1000 से अधिक निवेशक अपनी बचत के लिए Ganesh Finance चुनते हैं। एक साथ बढ़ने वाले परिवार में शामिल हों।",
        stat: "1.5 Cr+",
        statLabel: "प्रबंधित संपत्तियाँ",
      },
      {
        badge: "ISO 9001:2015",
        title: "प्रमाणित उत्कृष्टता",
        desc: "गुणवत्ता प्रबंधन के लिए ISO 9001:2015 प्रमाणित। हर प्रक्रिया, हर वादा, हर भुगतान — उच्चतम मानक पर।",
        stat: "ISO",
        statLabel: "प्रमाणित गुणवत्ता",
      },
      {
        badge: "गारंटीड रिटर्न",
        title: "भरोसेमंद रिटर्न",
        desc: "म्यूचुअल फंड या शेयर के विपरीत, हमारी FD योजनाएँ गारंटीड, पूर्व-निर्धारित ब्याज दरें प्रदान करती हैं। कोई आश्चर्य नहीं, केवल विकास।",
        stat: "13.5% तक",
        statLabel: "प्रति वर्ष",
      },
    ],
  },
  mr: {
    headline: "हजारो लोक Ganesh Finance वर का विश्वास ठेवतात",
    subline: "तुमचे पैसे सुरक्षित आहेत, वाढत आहेत आणि नेहमी उपलब्ध आहेत.",
    slides: [
      { badge: "RBI नोंदणीकृत", title: "RBI द्वारे नियंत्रित", desc: "Ganesh Finance ही भारतीय रिझर्व्ह बँकेकडे पूर्णतः परवानाधारक NBFC आहे.", stat: "2020 पासून", statLabel: "RBI परवानाधारक" },
      { badge: "DICGC विमाधारित", title: "ठेवींना विमा संरक्षण", desc: "प्रत्येक ठेव DICGC विम्याखाली सुरक्षित आहे, कोणत्याही परिस्थितीत पूर्ण मानसिक शांती मिळते.", stat: "₹5 लाख", statLabel: "प्रति ठेवीदार विमा" },
      { badge: "15+ वर्षे", title: "2020 पासून विश्वासार्ह", desc: "15+ वर्षांचे सातत्यपूर्ण, पारदर्शक रिटर्न. आम्ही एकही व्याज देयक कधीही चुकवले नाही.", stat: "100%", statLabel: "वेळेवर देयके" },
      { badge: "1000+ गुंतवणूकदार", title: "विश्वासूंचा समुदाय", desc: "भारतभरातील 1000+ गुंतवणूकदार Ganesh Finance निवडतात. एकत्र वाढणाऱ्या कुटुंबात सामील व्हा.", stat: "1.5 Cr+", statLabel: "व्यवस्थापित मालमत्ता" },
      { badge: "ISO 9001:2015", title: "प्रमाणित उत्कृष्टता", desc: "दर्जा व्यवस्थापनासाठी ISO 9001:2015 प्रमाणित. प्रत्येक प्रक्रिया, प्रत्येक वचन, प्रत्येक देयक.", stat: "ISO", statLabel: "प्रमाणित दर्जा" },
      { badge: "हमीदार रिटर्न", title: "विश्वासार्ह परतावा", desc: "म्युच्युअल फंड किंवा शेअरच्या विपरीत, आमच्या FD योजना हमीदार, पूर्व-निश्चित व्याजदर देतात.", stat: "13.5% पर्यंत", statLabel: "प्रति वर्ष" },
    ],
  },
  gu: {
    headline: "હજારો લોકો Ganesh Finance પર શા માટે વિશ્વાસ કરે છે",
    subline: "તમારા પૈસા સુરક્ષિત છે, વૃદ્ધિ પામી રહ્યા છે, અને હંમેશા ઉપલબ્ધ છે.",
    slides: [
      { badge: "RBI નોંધાયેલ", title: "RBI દ્વારા નિયંત્રિત", desc: "Ganesh Finance ભારતીય રિઝર્વ બેન્ક સાથે સંપૂર્ણ લાઇસન્સ ધરાવતી NBFC છે.", stat: "2020 થી", statLabel: "RBI લાઇસન્સ" },
      { badge: "DICGC વીમો", title: "ડિપોઝિટ વીમા સુરક્ષિત", desc: "દરેક ડિપોઝિટ DICGC વીમા હેઠળ સુરક્ષિત છે, ગમે ત્યારે સંપૂર્ણ માનસિક શાંતિ.", stat: "₹5 લાખ", statLabel: "પ્રતિ ડિપોઝિટર વીમો" },
      { badge: "15+ વર્ષ", title: "2020 થી વિશ્વાસુ", desc: "15+ વર્ષોનો સ્થિર, પારદર્શક વળતર. અમે ક્યારેય એક પણ વ્યાજ ચૂકવણી ચૂક્યા નથી.", stat: "100%", statLabel: "સમયસર ચૂકવણી" },
      { badge: "1000+ રોકાણકારો", title: "વિશ્વાસીઓનો સમુદાય", desc: "ભારતભરના 1000+ રોકાણકારો Ganesh Finance પસંદ કરે છે. સાથે વૃદ્ધિ પામતા પરિવારમાં જોડાઓ.", stat: "1.5 Cr+", statLabel: "વ્યવસ્થાપિત સંપત્તિ" },
      { badge: "ISO 9001:2015", title: "પ્રમાણિત શ્રેષ્ઠતા", desc: "ગુણવત્તા વ્યવસ્થાપન માટે ISO 9001:2015 પ્રમાણિત. દરેક પ્રક્રિયા, દરેક વચન.", stat: "ISO", statLabel: "પ્રમાણિત ગુણવત્તા" },
      { badge: "ગેરંટીડ વળતર", title: "ભરોસાપાત્ર વળતર", desc: "FD યોજનાઓ ગેરંટીડ, પૂર્વ-નિર્ધારિત વ્યાજ દર આપે છે. કોઈ આશ્ચર્ય નહીં, માત્ર વૃદ્ધિ.", stat: "13.5% સુધી", statLabel: "પ્રતિ વર્ષ" },
    ],
  },
  te: {
    headline: "వేలాది మంది Ganesh Finance ని ఎందుకు నమ్ముతారు",
    subline: "మీ డబ్బు సురక్షితంగా ఉంది, పెరుగుతోంది, ఎప్పుడూ అందుబాటులో ఉంటుంది.",
    slides: [
      { badge: "RBI నమోదు", title: "RBI నియంత్రణలో", desc: "Ganesh Finance రిజర్వ్ బ్యాంక్ ఆఫ్ ఇండియాతో పూర్తి లైసెన్స్ పొందిన NBFC.", stat: "2020 నుండి", statLabel: "RBI లైసెన్స్" },
      { badge: "DICGC భీమా", title: "డిపాజిట్లు బీమా చేయబడ్డాయి", desc: "ప్రతి డిపాజిట్ DICGC భీమా కింద రక్షించబడింది, ఎల్లప్పుడూ పూర్తి మనశ్శాంతి.", stat: "₹5 లక్షలు", statLabel: "ప్రతి డిపాజిటర్‌కు" },
      { badge: "15+ సంవత్సరాలు", title: "2020 నుండి నమ్మకమైన", desc: "15+ సంవత్సరాల స్థిరమైన, పారదర్శకమైన రాబడులు. మేము ఒక్క వడ్డీ చెల్లింపు కూడా తప్పించుకోలేదు.", stat: "100%", statLabel: "సకాలంలో చెల్లింపులు" },
      { badge: "1000+ పెట్టుబడిదారులు", title: "నమ్మకగాళ్ళ సమాజం", desc: "భారతదేశం అంతటా 1000+ పెట్టుబడిదారులు Ganesh Finance ఎంచుకుంటారు.", stat: "1.5 కోట్లు+", statLabel: "నిర్వహించబడిన ఆస్తులు" },
      { badge: "ISO 9001:2015", title: "ప్రమాణిత నైపుణ్యం", desc: "నాణ్యత నిర్వహణ కోసం ISO 9001:2015 ప్రమాణితం. ప్రతి ప్రక్రియ, ప్రతి వాగ్దానం.", stat: "ISO", statLabel: "ప్రమాణిత నాణ్యత" },
      { badge: "హామీ రాబడులు", title: "నమ్మదగిన రాబడులు", desc: "మ్యూచువల్ ఫండ్లు లేదా స్టాక్స్ వలె కాకుండా, మా FD ప్లాన్లు హామీ, ముందే నిర్ణయించిన వడ్డీ రేట్లు అందిస్తాయి.", stat: "13.5% వరకు", statLabel: "సంవత్సరానికి" },
    ],
  },
  ta: {
    headline: "ஏன் ஆயிரக்கணக்கானோர் Ganesh Finance ஐ நம்புகின்றனர்",
    subline: "உங்கள் பணம் பாதுகாப்பாக உள்ளது, வளர்கிறது, எப்போதும் கிடைக்கும்.",
    slides: [
      { badge: "RBI பதிவு", title: "RBI ஒழுங்குமுறை", desc: "Ganesh Finance இந்திய ரிசர்வ் வங்கியில் முழு உரிமம் பெற்ற NBFC.", stat: "2020 முதல்", statLabel: "RBI உரிமம்" },
      { badge: "DICGC காப்பீடு", title: "வைப்புகள் காப்பீடு", desc: "ஒவ்வொரு வைப்பும் DICGC காப்பீட்டின் கீழ் பாதுகாக்கப்படுகிறது.", stat: "₹5 லட்சம்", statLabel: "வைப்பாளருக்கு" },
      { badge: "15+ ஆண்டுகள்", title: "2020 முதல் நம்பகமான", desc: "15+ ஆண்டுகள் தொடர்ச்சியான வருமானம். ஒரு வட்டி செலுத்தலும் தவறியதில்லை.", stat: "100%", statLabel: "சரியான நேரத்தில்" },
      { badge: "1000+ முதலீட்டாளர்கள்", title: "நம்பகமான சமூகம்", desc: "இந்தியா முழுவதும் 1000+ முதலீட்டாளர்கள் Ganesh Finance தேர்வு செய்கின்றனர்.", stat: "1.5 கோடி+", statLabel: "நிர்வகிக்கப்படும் சொத்துக்கள்" },
      { badge: "ISO 9001:2015", title: "சான்றளிக்கப்பட்ட தரம்", desc: "தர மேலாண்மைக்கு ISO 9001:2015 சான்றிதழ். ஒவ்வொரு செயலும் உயர்ந்த தரத்தில்.", stat: "ISO", statLabel: "சான்றளிக்கப்பட்ட தரம்" },
      { badge: "உத்தரவாத வருமானம்", title: "நம்பகமான வருமானம்", desc: "FD திட்டங்கள் உத்தரவாதமான, முன்-நிர்ணயிக்கப்பட்ட வட்டி விகிதங்களை வழங்குகின்றன.", stat: "13.5% வரை", statLabel: "ஆண்டுக்கு" },
    ],
  },
  kn: {
    headline: "ಸಾವಿರಾರು ಜನರು Ganesh Finance ಅನ್ನು ಏಕೆ ನಂಬುತ್ತಾರೆ",
    subline: "ನಿಮ್ಮ ಹಣ ಸುರಕ್ಷಿತವಾಗಿದೆ, ಬೆಳೆಯುತ್ತಿದೆ, ಯಾವಾಗಲೂ ಲಭ್ಯ.",
    slides: [
      { badge: "RBI ನೋಂದಾಯಿತ", title: "RBI ನಿಯಂತ್ರಣದಲ್ಲಿ", desc: "Ganesh Finance ಭಾರತೀಯ ರಿಸರ್ವ್ ಬ್ಯಾಂಕ್‌ನೊಂದಿಗೆ ಪೂರ್ಣ ಪರವಾನಗಿ ಪಡೆದ NBFC.", stat: "2020 ರಿಂದ", statLabel: "RBI ಪರವಾನಗಿ" },
      { badge: "DICGC ವಿಮೆ", title: "ಠೇವಣಿಗಳಿಗೆ ವಿಮೆ", desc: "ಪ್ರತಿ ಠೇವಣಿ DICGC ವಿಮೆ ಅಡಿಯಲ್ಲಿ ರಕ್ಷಿತ, ಸಂಪೂರ್ಣ ಮಾನಸಿಕ ಶಾಂತಿ.", stat: "₹5 ಲಕ್ಷ", statLabel: "ಪ್ರತಿ ಠೇವಣಿದಾರರಿಗೆ" },
      { badge: "15+ ವರ್ಷಗಳು", title: "2020 ರಿಂದ ವಿಶ್ವಾಸಾರ್ಹ", desc: "15+ ವರ್ಷಗಳ ಸ್ಥಿರ ರಿಟರ್ನ್. ಒಂದೇ ಒಂದು ಬಡ್ಡಿ ಪಾವತಿ ತಪ್ಪಿಸಿಲ್ಲ.", stat: "100%", statLabel: "ಸಮಯಕ್ಕೆ ಪಾವತಿ" },
      { badge: "1000+ ಹೂಡಿಕೆದಾರರು", title: "ನಂಬಿಕೆಯ ಸಮುದಾಯ", desc: "ಭಾರತದಾದ್ಯಂತ 1000+ ಹೂಡಿಕೆದಾರರು Ganesh Finance ಆಯ್ಕೆ ಮಾಡುತ್ತಾರೆ.", stat: "1.5 ಕೋಟಿ+", statLabel: "ನಿರ್ವಹಿಸಲಾದ ಆಸ್ತಿ" },
      { badge: "ISO 9001:2015", title: "ಪ್ರಮಾಣಿತ ಶ್ರೇಷ್ಠತೆ", desc: "ಗುಣಮಟ್ಟ ನಿರ್ವಹಣೆಗೆ ISO 9001:2015 ಪ್ರಮಾಣಿತ. ಪ್ರತಿ ಪ್ರಕ್ರಿಯೆ ಉನ್ನತ ಮಾನದಂಡದಲ್ಲಿ.", stat: "ISO", statLabel: "ಪ್ರಮಾಣಿತ ಗುಣಮಟ್ಟ" },
      { badge: "ಖಚಿತ ರಿಟರ್ನ್", title: "ನಂಬಲರ್ಹ ರಿಟರ್ನ್", desc: "FD ಯೋಜನೆಗಳು ಖಚಿತ, ಮೊದಲೇ ನಿಗದಿಪಡಿಸಿದ ಬಡ್ಡಿ ದರಗಳನ್ನು ನೀಡುತ್ತವೆ.", stat: "13.5% ವರೆಗೆ", statLabel: "ಪ್ರತಿ ವರ್ಷ" },
    ],
  },
  as: {
    headline: "হাজাৰ হাজাৰ মানুহে Ganesh Finance ক কিয় বিশ্বাস কৰে",
    subline: "আপোনাৰ টকা সুৰক্ষিত, বাঢ়ি আছে, সদায় উপলব্ধ।",
    slides: [
      { badge: "RBI পঞ্জীয়নভুক্ত", title: "RBI দ্বাৰা নিয়ন্ত্ৰিত", desc: "Ganesh Finance ভাৰতীয় ৰিজাৰ্ভ বেংকত সম্পূৰ্ণ লাইচেন্সপ্ৰাপ্ত NBFC।", stat: "2020 ৰ পৰা", statLabel: "RBI লাইচেন্স" },
      { badge: "DICGC বীমা", title: "আমানত বীমা সুৰক্ষিত", desc: "প্ৰতিটো আমানত DICGC বীমাৰ অধীনত সুৰক্ষিত, সম্পূৰ্ণ মানসিক শান্তি।", stat: "₹5 লাখ", statLabel: "প্ৰতিজন জমাকাৰীৰ বাবে" },
      { badge: "15+ বছৰ", title: "2020 ৰ পৰা বিশ্বাসযোগ্য", desc: "15+ বছৰৰ স্থিৰ ৰিটাৰ্ন। আমি এবাৰো সুদ পৰিশোধ মিছ কৰা নাই।", stat: "100%", statLabel: "সময়মতে পৰিশোধ" },
      { badge: "1000+ বিনিয়োগকাৰী", title: "বিশ্বাসীৰ সম্প্ৰদায়", desc: "সমগ্ৰ ভাৰতত 1000+ বিনিয়োগকাৰীয়ে Ganesh Finance বাছনি কৰে।", stat: "1.5 Cr+", statLabel: "পৰিচালিত সম্পত্তি" },
      { badge: "ISO 9001:2015", title: "প্ৰমাণিত উৎকৃষ্টতা", desc: "গুণমান ব্যৱস্থাপনাৰ বাবে ISO 9001:2015 প্ৰমাণিত। প্ৰতিটো প্ৰক্ৰিয়া উচ্চতম মানদণ্ডত।", stat: "ISO", statLabel: "প্ৰমাণিত গুণমান" },
      { badge: "গেৰেণ্টিড ৰিটাৰ্ন", title: "নিৰ্ভৰযোগ্য ৰিটাৰ্ন", desc: "FD পৰিকল্পনাসমূহে গেৰেণ্টিড, পূৰ্ব-নিৰ্ধাৰিত সুদৰ হাৰ প্ৰদান কৰে।", stat: "13.5% পৰ্যন্ত", statLabel: "প্ৰতি বছৰ" },
    ],
  },
  ur: {
    headline: "ہزاروں لوگ Ganesh Finance پر کیوں بھروسہ کرتے ہیں",
    subline: "آپ کا پیسہ محفوظ ہے، بڑھ رہا ہے، اور ہمیشہ دستیاب ہے۔",
    slides: [
      { badge: "RBI رجسٹرڈ", title: "RBI کے زیر نگرانی", desc: "Ganesh Finance ریزرو بینک آف انڈیا کے ساتھ مکمل لائسنس یافتہ NBFC ہے۔", stat: "2020 سے", statLabel: "RBI لائسنس" },
      { badge: "DICGC بیمہ", title: "ڈپازٹس محفوظ بیمہ", desc: "ہر ڈپازٹ DICGC بیمہ کے تحت محفوظ ہے، ہر حال میں مکمل ذہنی سکون۔", stat: "₹5 لاکھ", statLabel: "فی ڈپازٹر بیمہ" },
      { badge: "15+ سال", title: "2020 سے قابل اعتماد", desc: "15+ سال کا مستقل منافع۔ ہم نے ایک بھی سود ادائیگی کبھی نہیں چھوڑی۔", stat: "100%", statLabel: "وقت پر ادائیگی" },
      { badge: "1000+ سرمایہ کار", title: "بھروسہ مندوں کی برادری", desc: "پورے بھارت میں 1000+ سرمایہ کار Ganesh Finance کا انتخاب کرتے ہیں۔", stat: "1.5 Cr+", statLabel: "منظم اثاثے" },
      { badge: "ISO 9001:2015", title: "تصدیق شدہ بہترین", desc: "معیاری انتظام کے لیے ISO 9001:2015 تصدیق شدہ۔ ہر عمل، ہر وعدہ اعلیٰ معیار پر۔", stat: "ISO", statLabel: "تصدیق شدہ معیار" },
      { badge: "ضمانت شدہ منافع", title: "قابل بھروسہ واپسی", desc: "FD منصوبے ضمانت شدہ، پہلے سے طے شدہ شرح سود فراہم کرتے ہیں۔ کوئی حیرانی نہیں۔", stat: "13.5% تک", statLabel: "فی سال" },
    ],
  },
};

// ─── Icons
const icons = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
    </svg>
  ),
  lock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  trending: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  ),
};

const SLIDE_ICONS = ["shield","lock","clock","users","award","trending"];

// ─── Progress Bar
const ProgressBar = ({ active, duration }) => (
  <div className="h-0.5 bg-white/20 rounded-full overflow-hidden">
    <div
      className="h-full bg-white rounded-full"
      style={{
        width: active ? "100%" : "0%",
        transition: active ? `width ${duration}ms linear` : "none",
      }}
    />
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function TrustStrip() {
  const { lang } = useLanguage();
  const tr = TRANSLATIONS[lang] ?? TRANSLATIONS.en;
  const slides = tr.slides;

  const DURATION = 5000;
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    if (idx === current || animating) return;
    setAnimating(true);
    setPrev(current);
    setCurrent(idx);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 600);
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev_ = () => goTo((current - 1 + slides.length) % slides.length);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, DURATION);
    return () => clearTimeout(timerRef.current);
  }, [current, paused]);

  // Reset on lang change
  useEffect(() => { setCurrent(0); setPrev(null); }, [lang]);

  const slide = slides[current];
  const iconKey = SLIDE_ICONS[current];

  // Colors per slide index
  const THEMES = [
    { from: "#1e3a5f", to: "#0f2440", accent: "#38bdf8", glow: "rgba(56,189,248,0.15)" },
    { from: "#1a3a2a", to: "#0d2018", accent: "#34d399", glow: "rgba(52,211,153,0.15)" },
    { from: "#3b2060", to: "#1e0f38", accent: "#a78bfa", glow: "rgba(167,139,250,0.15)" },
    { from: "#3a2000", to: "#1f1000", accent: "#fbbf24", glow: "rgba(251,191,36,0.15)" },
    { from: "#1a2e3b", to: "#0d1820", accent: "#22d3ee", glow: "rgba(34,211,238,0.15)" },
    { from: "#3a1a1a", to: "#200d0d", accent: "#f87171", glow: "rgba(248,113,113,0.15)" },
  ];
  const theme = THEMES[current % THEMES.length];

  return (
    <section
      aria-label="Why Trust Ganesh Finance"
      itemScope
      itemType="https://schema.org/Organization"
      className="w-full"
    >
      <meta itemProp="name" content="Ganesh Finance" />
      <meta itemProp="description" content="RBI Registered NBFC with 15+ years of trusted investment services" />

      <div
        className="relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`, transition: "background 0.8s ease" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${theme.glow}, transparent)`, transition: "background 0.8s ease" }}
          aria-hidden="true"
        />

        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }}
          aria-hidden="true"
        />

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14">

          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-white/50 text-[11px] font-bold tracking-[0.25em] uppercase mb-2">{tr.subline}</p>
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug">
              {tr.headline}
            </h2>
          </div>

          {/* Main slide area */}
          <div className="relative min-h-[160px] sm:min-h-[140px]">
            {slides.map((s, i) => (
              <div
                key={i}
                aria-hidden={i !== current}
                className="absolute inset-0 flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8"
                style={{
                  opacity: i === current ? 1 : 0,
                  transform: i === current ? "translateY(0)" : i === prev ? "translateY(-12px)" : "translateY(16px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                  pointerEvents: i === current ? "auto" : "none",
                }}
              >
                {/* Icon circle */}
                <div
                  className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center"
                  style={{ background: `${theme.accent}22`, border: `1.5px solid ${theme.accent}55`, color: theme.accent, transition: "all 0.6s ease" }}
                  aria-hidden="true"
                >
                  <span style={{ transform: "scale(1.4)" }}>{icons[SLIDE_ICONS[i]]}</span>
                </div>

                {/* Text */}
                <div className="flex-1 text-center sm:text-left">
                  <span
                    className="inline-block text-[10px] font-black tracking-[0.2em] uppercase px-2.5 py-0.5 rounded-full mb-2"
                    style={{ background: `${theme.accent}22`, color: theme.accent }}
                  >
                    {s.badge}
                  </span>
                  <h3 className="text-white text-lg sm:text-xl font-black leading-tight mb-2">{s.title}</h3>
                  <p className="text-white/60 text-sm sm:text-[15px] leading-relaxed font-medium max-w-xl">{s.desc}</p>
                </div>

                {/* Stat bubble */}
                <div
                  className="flex-shrink-0 text-center px-5 py-4 rounded-2xl hidden sm:block"
                  style={{ background: `${theme.accent}15`, border: `1px solid ${theme.accent}30` }}
                >
                  <p className="font-black text-2xl leading-none" style={{ color: theme.accent }}>{s.stat}</p>
                  <p className="text-white/50 text-[11px] font-semibold mt-1 tracking-wide uppercase">{s.statLabel}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Controls row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">

            {/* Dot + progress indicators */}
            <div className="flex items-center gap-2 flex-1">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="flex-1 group"
                  style={{ maxWidth: 80 }}
                >
                  <ProgressBar active={i === current && !paused} duration={DURATION} />
                  <div
                    className="mt-1.5 mx-auto rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? 20 : 6,
                      height: 6,
                      background: i === current ? theme.accent : `${theme.accent}40`,
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Prev / Next arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev_}
                aria-label="Previous"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4"><polyline points="15 18 9 12 15 6" /></svg>
              </button>
              <button
                onClick={next}
                aria-label="Next"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.7)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            </div>

            {/* Slide counter */}
            <p className="text-white/30 text-xs font-mono font-bold tracking-widest hidden sm:block">
              {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-700"
          style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }}
          aria-hidden="true"
        />
      </div>

      {/* ── SEO structured ticker below (visually hidden but readable) */}
      <div className="sr-only" aria-live="polite">
        {slide.title} — {slide.desc}
      </div>
    </section>
  );
}