import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useLanguage } from '../Common/Navbaar' // ← imports LanguageContext from your Navbar file

// ═══════════════════════════════════════════════════════════════════════════════
// ─── MULTILINGUAL SERVICES DATA
// Each service key maps to an object keyed by language code.
// ═══════════════════════════════════════════════════════════════════════════════

const SERVICES_DATA_I18N = {
  "gold-flexi-credit": {
    icon: "💳",
    popular: false,
    stats: { interest: "0.83% p.a.", amount: "₹1,500 – ₹50L", tenure: "6–24 months", fee: "NIL" },
    en: {
      title: "Gold Flexi Credit",
      tagline: "Revolving credit line against your gold — pay interest only on what you use.",
      overview: `Shree Ganesh Finance's Gold Flexi Credit is an innovative revolving credit facility where you pledge your gold ornaments and receive a pre-approved credit limit. Unlike a standard gold loan, you withdraw only what you need, when you need it — and interest is charged solely on the utilized amount.`,
      overview_extra: `Governed under RBI's fair lending practices and NBFC norms, this facility ensures complete transparency in interest computation, with no hidden charges. Repay and redraw within your sanctioned limit at any time during the tenure.`,
      benefits: [
        "Interest charged only on amount withdrawn, not on entire sanctioned limit",
        "Revolving facility — repay and redraw multiple times within tenure",
        "Loan amount up to ₹50 lakhs against gold ornaments (18–22 karat)",
        "Minimal documentation — KYC + gold valuation report sufficient",
        "Flexible tenure: 6 to 24 months, renewable on review",
        "No prepayment penalty — foreclose at any time without charges",
        "Gold kept in secure, insured vaults compliant with RBI custody norms",
      ],
      eligibility_points: [
        "Indian residents aged 18 years and above",
        "KYC compliant (Aadhaar + PAN mandatory as per RBI/PMLA guidelines)",
        "Gold ornaments of 18–22 karat purity acceptable",
        "No minimum income criterion — gold value determines eligibility",
      ],
      documents: [
        "Aadhaar Card (mandatory under PMLA norms)",
        "PAN Card",
        "Recent passport-size photograph",
        "Gold ornaments for valuation",
        "Address proof (if address differs from Aadhaar)",
      ],
    },
    hi: {
      title: "गोल्ड फ्लेक्सी क्रेडिट",
      tagline: "सोने के बदले रिवॉल्विंग क्रेडिट लाइन — केवल उपयोग की गई राशि पर ब्याज दें।",
      overview: `श्री गणेश फाइनेंस का गोल्ड फ्लेक्सी क्रेडिट एक अभिनव रिवॉल्विंग क्रेडिट सुविधा है जहाँ आप अपने सोने के आभूषण गिरवी रखकर एक पूर्व-अनुमोदित क्रेडिट सीमा प्राप्त करते हैं। एक सामान्य गोल्ड लोन के विपरीत, आप केवल वही निकालते हैं जो आपको चाहिए — और ब्याज केवल उपयोग की गई राशि पर लिया जाता है।`,
      overview_extra: `RBI की उचित उधार प्रथाओं और NBFC मानदंडों के तहत शासित, यह सुविधा ब्याज गणना में पूर्ण पारदर्शिता सुनिश्चित करती है, कोई छुपे शुल्क नहीं। कार्यकाल के दौरान किसी भी समय अपनी स्वीकृत सीमा के भीतर चुकाएं और पुनः निकालें।`,
      benefits: [
        "ब्याज केवल निकाली गई राशि पर, पूरी स्वीकृत सीमा पर नहीं",
        "रिवॉल्विंग सुविधा — कार्यकाल के भीतर कई बार चुकाएं और पुनः निकालें",
        "सोने के आभूषणों (18–22 कैरेट) पर ₹50 लाख तक ऋण",
        "न्यूनतम दस्तावेज़ीकरण — KYC + गोल्ड वैल्यूएशन रिपोर्ट पर्याप्त",
        "लचीला कार्यकाल: 6 से 24 महीने, समीक्षा पर नवीकरणीय",
        "कोई पूर्व-भुगतान दंड नहीं — बिना शुल्क के किसी भी समय बंद करें",
        "RBI कस्टडी मानदंडों के अनुपालन में सुरक्षित, बीमित तिजोरियों में रखा सोना",
      ],
      eligibility_points: [
        "18 वर्ष और उससे अधिक आयु के भारतीय निवासी",
        "KYC अनुपालन (RBI/PMLA दिशानिर्देशों के अनुसार आधार + PAN अनिवार्य)",
        "18–22 कैरेट शुद्धता के सोने के आभूषण स्वीकार्य",
        "कोई न्यूनतम आय मानदंड नहीं — सोने का मूल्य पात्रता निर्धारित करता है",
      ],
      documents: [
        "आधार कार्ड (PMLA मानदंडों के तहत अनिवार्य)",
        "पैन कार्ड",
        "हालिया पासपोर्ट आकार की फोटो",
        "मूल्यांकन के लिए सोने के आभूषण",
        "पता प्रमाण (यदि पता आधार से अलग है)",
      ],
    },
    mr: {
      title: "गोल्ड फ्लेक्सी क्रेडिट",
      tagline: "सोन्याविरुद्ध रिव्हॉल्व्हिंग क्रेडिट लाइन — फक्त वापरलेल्या रकमेवर व्याज द्या.",
      overview: `श्री गणेश फायनान्सचे गोल्ड फ्लेक्सी क्रेडिट ही एक अभिनव रिव्हॉल्व्हिंग क्रेडिट सुविधा आहे जिथे तुम्ही तुमचे सोन्याचे दागिने गहाण ठेवून पूर्व-मंजूर क्रेडिट मर्यादा मिळवता. सामान्य सोन्याच्या कर्जाप्रमाणे नाही, तुम्ही फक्त तेव्हाच काढता जेव्हा गरज असते — आणि व्याज फक्त वापरलेल्या रकमेवर आकारले जाते.`,
      overview_extra: `RBI च्या न्याय्य कर्ज पद्धती आणि NBFC नियमांनुसार, ही सुविधा व्याज गणनेत पूर्ण पारदर्शकता सुनिश्चित करते, कोणतेही छुपे शुल्क नाही.`,
      benefits: [
        "व्याज फक्त काढलेल्या रकमेवर, संपूर्ण मंजूर मर्यादेवर नाही",
        "रिव्हॉल्व्हिंग सुविधा — कार्यकाळात अनेक वेळा परत करा आणि काढा",
        "सोन्याच्या दागिन्यांवर (18–22 कॅरेट) ₹50 लाखांपर्यंत कर्ज",
        "किमान कागदपत्रे — KYC + गोल्ड व्हॅल्युएशन रिपोर्ट पुरेसे",
        "लवचिक कार्यकाळ: 6 ते 24 महिने, पुनरावलोकनावर नूतनीकरणयोग्य",
        "पूर्व-भुगतान दंड नाही — कोणत्याही वेळी शुल्काशिवाय बंद करा",
        "RBI कस्टडी नियमांनुसार सुरक्षित, विमाकृत तिजोरींमध्ये ठेवलेले सोने",
      ],
      eligibility_points: [
        "18 वर्षे व त्यावरील भारतीय रहिवासी",
        "KYC अनुपालन (आधार + PAN अनिवार्य)",
        "18–22 कॅरेट शुद्धतेचे सोन्याचे दागिने स्वीकार्य",
        "किमान उत्पन्न निकष नाही — सोन्याचे मूल्य पात्रता ठरवते",
      ],
      documents: [
        "आधार कार्ड (PMLA नियमांनुसार अनिवार्य)",
        "पॅन कार्ड",
        "अलीकडील पासपोर्ट आकाराचा फोटो",
        "मूल्यांकनासाठी सोन्याचे दागिने",
        "पत्ता पुरावा (जर पत्ता आधारपेक्षा वेगळा असेल)",
      ],
    },
    gu: {
      title: "ગોલ્ડ ફ્લેક્સી ક્રેડિટ",
      tagline: "સોના સામે રિવૉલ્વિંગ ક્રેડિટ લાઇન — માત્ર વાપરેલી રકમ પર વ્યાજ ચૂકવો.",
      overview: `શ્રી ગણેશ ફાઇનાન્સની ગોલ્ડ ફ્લેક્સી ક્રેડિટ એ એક નવીન રિવૉલ્વિંગ ક્રેડિટ સુવિધા છે જ્યાં તમે તમારા સોનાના ઘરેણાં ગીરવે મૂકીને પૂર્વ-મંજૂર ક્રેડિટ મર્યાદા મેળવો છો.`,
      overview_extra: `RBIની ન્યાયી ધિરાણ પ્રથાઓ અને NBFC ધોરણો હેઠળ સંચાલિત, આ સુવિધા વ્યાજ ગણતરીમાં સંપૂર્ણ પારદર્શિતા સુનિશ્ચિત કરે છે.`,
      benefits: [
        "વ્યાજ માત્ર ઉપાડેલી રકમ પર, સમગ્ર મંજૂર મર્યાદા પર નહીં",
        "રિવૉલ્વિંગ સુવિધા — કાર્યકાળ દરમિયાન અનેક વખત ચૂકવો અને ઉપાડો",
        "સોનાના ઘરેણાં (18–22 કેરેટ) સામે ₹50 લાખ સુધી લોન",
        "ન્યૂનતમ દસ્તાવેજ — KYC + ગોલ્ડ વેલ્યૂએશન રિપોર્ટ પૂરતો",
        "લવચિક કાર્યકાળ: 6 થી 24 મહિના",
        "કોઈ પૂર્વ-ભુગતાન દંડ નહીં",
        "RBI ધોરણો અનુસાર સુરક્ષિત, વીમાકૃત તિજોરીઓમાં સોનું",
      ],
      eligibility_points: [
        "18 વર્ષ અને તેથી વધુ ઉંમરના ભારતીય નિવાસીઓ",
        "KYC અનુપાલન (આધાર + PAN ફરજિયાત)",
        "18–22 કેરેટ શુદ્ધતાના સોનાના ઘરેણાં સ્વીકાર્ય",
        "લઘુત્તમ આવક માપદંડ નહીં — સોનાની કિંમત પાત્રતા નક્કી કરે છે",
      ],
      documents: [
        "આધાર કાર્ડ (PMLA ધોરણો હેઠળ ફરજિયાત)",
        "પૅન કાર્ડ",
        "તાજેતરનો પાસપોર્ટ સાઇઝ ફોટો",
        "મૂલ્યાંકન માટે સોનાના ઘરેણાં",
        "સરનામા પ્રમાણ (જો સરનામું આધારથી અલગ હોય)",
      ],
    },
    te: {
      title: "గోల్డ్ ఫ్లెక్సీ క్రెడిట్",
      tagline: "మీ బంగారంపై రివాల్వింగ్ క్రెడిట్ లైన్ — మీరు వాడిన మొత్తంపై మాత్రమే వడ్డీ చెల్లించండి.",
      overview: `శ్రీ గణేష్ ఫైనాన్స్ యొక్క గోల్డ్ ఫ్లెక్సీ క్రెడిట్ అనేది ఒక వినూత్న రివాల్వింగ్ క్రెడిట్ సదుపాయం, దీనిలో మీరు మీ బంగారు ఆభరణాలు తాకట్టు పెట్టి ముందే ఆమోదించబడిన క్రెడిట్ పరిమితిని పొందుతారు.`,
      overview_extra: `RBI యొక్క న్యాయమైన రుణ పద్ధతులు మరియు NBFC నిబంధనల ప్రకారం, ఈ సదుపాయం వడ్డీ లెక్కింపులో పూర్తి పారదర్శకతను నిర్ధారిస్తుంది.`,
      benefits: [
        "వడ్డీ తీసుకున్న మొత్తంపై మాత్రమే, మొత్తం మంజూరు పరిమితిపై కాదు",
        "రివాల్వింగ్ సదుపాయం — కాలపరిమితిలో అనేకసార్లు తిరిగి చెల్లించండి",
        "బంగారు ఆభరణాలపై (18–22 కేరట్) ₹50 లక్షల వరకు రుణం",
        "కనీస పత్రాలు — KYC + గోల్డ్ వేల్యుయేషన్ రిపోర్ట్ సరిపోతుంది",
        "సౌకర్యవంతమైన కాలపరిమితి: 6 నుండి 24 నెలలు",
        "ముందస్తు చెల్లింపు జరిమానా లేదు",
        "RBI నిబంధనలకు అనుగుణంగా సురక్షిత, బీమా చేయబడిన వాల్ట్‌లలో బంగారం",
      ],
      eligibility_points: [
        "18 సంవత్సరాలు మరియు అంతకంటే ఎక్కువ వయస్సు గల భారతీయ నివాసులు",
        "KYC అనుపాలన (ఆధార్ + PAN తప్పనిసరి)",
        "18–22 కేరట్ స్వచ్ఛత గల బంగారు ఆభరణాలు స్వీకార్యం",
        "కనీస ఆదాయ ప్రమాణాలు లేవు — బంగారం విలువ అర్హతను నిర్ణయిస్తుంది",
      ],
      documents: [
        "ఆధార్ కార్డ్ (PMLA నిబంధనల ప్రకారం తప్పనిసరి)",
        "PAN కార్డ్",
        "ఇటీవలి పాస్‌పోర్ట్ సైజ్ ఫోటో",
        "విలువ నిర్ణయం కోసం బంగారు ఆభరణాలు",
        "చిరునామా రుజువు (చిరునామా ఆధార్‌తో భిన్నంగా ఉంటే)",
      ],
    },
    ta: {
      title: "கோல்டு ஃப்ளெக்ஸி கிரெடிட்",
      tagline: "உங்கள் தங்கத்திற்கு எதிராக ரிவால்வுடன் கூடிய கிரெடிட் லைன் — பயன்படுத்திய தொகைக்கு மட்டுமே வட்டி செலுத்துங்கள்.",
      overview: `ஸ்ரீ கணேஷ் ஃபைனான்ஸின் கோல்டு ஃப்ளெக்ஸி கிரெடிட் ஒரு புதுமையான ரிவால்வுடன் கூடிய கிரெடிட் வசதி ஆகும், இதில் நீங்கள் உங்கள் தங்க நகைகளை அடமானம் வைத்து முன்பே அங்கீகரிக்கப்பட்ட கிரெடிட் வரம்பைப் பெறுகிறீர்கள்.`,
      overview_extra: `RBIயின் நியாயமான கடன் நடைமுறைகள் மற்றும் NBFC விதிமுறைகளின் கீழ் நிர்வகிக்கப்படும் இந்த வசதி வட்டி கணக்கீட்டில் முழு வெளிப்படைத்தன்மையை உறுதி செய்கிறது.`,
      benefits: [
        "வட்டி எடுக்கப்பட்ட தொகைக்கு மட்டுமே, முழு வரம்பிற்கு அல்ல",
        "ரிவால்வுடன் கூடிய வசதி — பல முறை திரும்பச் செலுத்தி மீண்டும் எடுக்கலாம்",
        "தங்க நகைகளுக்கு எதிராக (18–22 கேரட்) ₹50 லட்சம் வரை கடன்",
        "குறைந்தபட்ச ஆவணங்கள் — KYC + கோல்டு வேல்யுவேஷன் அறிக்கை போதுமானது",
        "நெகிழ்வான காலம்: 6 முதல் 24 மாதங்கள்",
        "முன்கூட்டிய செலுத்துகை அபராதம் இல்லை",
        "RBI விதிமுறைகளுக்கு இணங்க பாதுகாப்பான, காப்பீடு செய்யப்பட்ட வால்ட்டுகளில் தங்கம்",
      ],
      eligibility_points: [
        "18 வயது மற்றும் அதற்கு மேற்பட்ட இந்திய குடியிருப்பாளர்கள்",
        "KYC இணக்கம் (ஆதார் + PAN கட்டாயம்)",
        "18–22 கேரட் தூய்மையுள்ள தங்க நகைகள் ஏற்றுக்கொள்ளப்படும்",
        "குறைந்தபட்ச வருமான அளவுகோல் இல்லை — தங்கத்தின் மதிப்பு தகுதியை தீர்மானிக்கிறது",
      ],
      documents: [
        "ஆதார் அட்டை (PMLA விதிமுறைகளின் கீழ் கட்டாயம்)",
        "PAN அட்டை",
        "சமீபத்திய பாஸ்போர்ட் அளவு புகைப்படம்",
        "மதிப்பீட்டிற்கான தங்க நகைகள்",
        "முகவரி சான்று (முகவரி ஆதாரிலிருந்து மாறுபட்டால்)",
      ],
    },
    kn: {
      title: "ಗೋಲ್ಡ್ ಫ್ಲೆಕ್ಸಿ ಕ್ರೆಡಿಟ್",
      tagline: "ನಿಮ್ಮ ಚಿನ್ನದ ವಿರುದ್ಧ ರಿವಾಲ್ವಿಂಗ್ ಕ್ರೆಡಿಟ್ ಲೈನ್ — ಬಳಸಿದ ಮೊತ್ತಕ್ಕೆ ಮಾತ್ರ ಬಡ್ಡಿ ನೀಡಿ.",
      overview: `ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್‌ನ ಗೋಲ್ಡ್ ಫ್ಲೆಕ್ಸಿ ಕ್ರೆಡಿಟ್ ಒಂದು ನವೀನ ರಿವಾಲ್ವಿಂಗ್ ಕ್ರೆಡಿಟ್ ಸೌಲಭ್ಯವಾಗಿದ್ದು, ನೀವು ನಿಮ್ಮ ಚಿನ್ನದ ಆಭರಣಗಳನ್ನು ಅಡವಿಟ್ಟು ಪೂರ್ವ-ಅನುಮೋದಿತ ಕ್ರೆಡಿಟ್ ಮಿತಿ ಪಡೆಯುತ್ತೀರಿ.`,
      overview_extra: `RBI ನ ನ್ಯಾಯಯುತ ಸಾಲ ಅಭ್ಯಾಸಗಳು ಮತ್ತು NBFC ನಿಯಮಗಳ ಅಡಿಯಲ್ಲಿ ನಿಯಂತ್ರಿಸಲ್ಪಡುವ ಈ ಸೌಲಭ್ಯ ಬಡ್ಡಿ ಲೆಕ್ಕಾಚಾರದಲ್ಲಿ ಸಂಪೂರ್ಣ ಪಾರದರ್ಶಕತೆ ಖಚಿತಪಡಿಸುತ್ತದೆ.`,
      benefits: [
        "ಬಡ್ಡಿ ತೆಗೆದ ಮೊತ್ತಕ್ಕೆ ಮಾತ್ರ, ಒಟ್ಟು ಮಿತಿಗೆ ಅಲ್ಲ",
        "ರಿವಾಲ್ವಿಂಗ್ ಸೌಲಭ್ಯ — ಅವಧಿಯಲ್ಲಿ ಹಲವು ಬಾರಿ ಮರುಪಾವತಿಸಿ ಮತ್ತು ತೆಗೆದುಕೊಳ್ಳಿ",
        "ಚಿನ್ನದ ಆಭರಣಗಳ ಮೇಲೆ (18–22 ಕ್ಯಾರೆಟ್) ₹50 ಲಕ್ಷದವರೆಗೆ ಸಾಲ",
        "ಕನಿಷ್ಠ ದಾಖಲೆಗಳು — KYC + ಗೋಲ್ಡ್ ವ್ಯಾಲ್ಯುಯೇಷನ್ ರಿಪೋರ್ಟ್ ಸಾಕು",
        "ನಮ್ಯ ಅವಧಿ: 6 ರಿಂದ 24 ತಿಂಗಳುಗಳು",
        "ಮುಂಚಿತ ಪಾವತಿ ದಂಡ ಇಲ್ಲ",
        "RBI ನಿಯಮಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ಸುರಕ್ಷಿತ, ವಿಮಾ ಲಾಕ್ ಮಾಡಿದ ತಿಜೋರಿಗಳಲ್ಲಿ ಚಿನ್ನ",
      ],
      eligibility_points: [
        "18 ವರ್ಷ ಮತ್ತು ಅದಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಭಾರತೀಯ ನಿವಾಸಿಗಳು",
        "KYC ಅನುಸರಣೆ (ಆಧಾರ್ + PAN ಕಡ್ಡಾಯ)",
        "18–22 ಕ್ಯಾರೆಟ್ ಶುದ್ಧತೆಯ ಚಿನ್ನದ ಆಭರಣಗಳು ಸ್ವೀಕಾರ್ಯ",
        "ಕನಿಷ್ಠ ಆದಾಯ ಮಾನದಂಡ ಇಲ್ಲ — ಚಿನ್ನದ ಮೌಲ್ಯ ಅರ್ಹತೆ ನಿರ್ಧರಿಸುತ್ತದೆ",
      ],
      documents: [
        "ಆಧಾರ್ ಕಾರ್ಡ್ (PMLA ನಿಯಮಗಳ ಅಡಿಯಲ್ಲಿ ಕಡ್ಡಾಯ)",
        "ಪ್ಯಾನ್ ಕಾರ್ಡ್",
        "ಇತ್ತೀಚಿನ ಪಾಸ್ಪೋರ್ಟ್ ಗಾತ್ರದ ಫೋಟೋ",
        "ಮೌಲ್ಯಮಾಪನಕ್ಕಾಗಿ ಚಿನ್ನದ ಆಭರಣಗಳು",
        "ವಿಳಾಸ ಪುರಾವೆ (ವಿಳಾಸ ಆಧಾರ್‌ನಿಂದ ಭಿನ್ನವಾಗಿದ್ದರೆ)",
      ],
    },
    as: {
      title: "গোল্ড ফ্লেক্সি ক্রেডিট",
      tagline: "আপোনাৰ সোণৰ বিপৰীতে ৰিভলভিং ক্রেডিট লাইন — মাত্ৰ ব্যৱহাৰ কৰা পৰিমাণত সুদ দিয়ক।",
      overview: `শ্ৰী গণেশ ফাইনেন্সৰ গোল্ড ফ্লেক্সি ক্রেডিট এটি উদ্ভাৱনী ৰিভলভিং ক্রেডিট সুবিধা য'ত আপুনি আপোনাৰ সোণৰ গহনা বন্ধক ৰাখি পূৰ্ব-অনুমোদিত ক্রেডিট সীমা লাভ কৰে।`,
      overview_extra: `RBI ৰ ন্যায্য ঋণদান পদ্ধতি আৰু NBFC নিয়মৰ অধীনত পৰিচালিত এই সুবিধাই সুদ গণনাত সম্পূৰ্ণ স্বচ্ছতা নিশ্চিত কৰে।`,
      benefits: [
        "সুদ কেৱল উলিওৱা পৰিমাণত, সম্পূৰ্ণ অনুমোদিত সীমাত নহয়",
        "ৰিভলভিং সুবিধা — মেয়াদৰ ভিতৰত বহুবাৰ পৰিশোধ আৰু উলিয়াব",
        "সোণৰ গহনাৰ বিপৰীতে (18–22 কেৰেট) ₹50 লাখলৈ ঋণ",
        "নূন্যতম কাগজ-পত্ৰ — KYC + গোল্ড ভেলুৱেচন ৰিপোৰ্ট যথেষ্ট",
        "নমনীয় মেয়াদ: 6 ৰ পৰা 24 মাহ",
        "পূৰ্ব-পৰিশোধ জুৰিমানা নাই",
        "RBI নিয়ম মানি সুৰক্ষিত, বীমাকৃত ভল্টত সোণ ৰখা হয়",
      ],
      eligibility_points: [
        "18 বছৰ আৰু তাতকৈ বেছি বয়সৰ ভাৰতীয় বাসিন্দা",
        "KYC অনুপালন (আধাৰ + PAN বাধ্যতামূলক)",
        "18–22 কেৰেট বিশুদ্ধতাৰ সোণৰ গহনা গ্ৰহণযোগ্য",
        "নূন্যতম আয়ৰ মাপকাঠি নাই — সোণৰ মূল্যই যোগ্যতা নিৰ্ধাৰণ কৰে",
      ],
      documents: [
        "আধাৰ কাৰ্ড (PMLA নিয়মৰ অধীনত বাধ্যতামূলক)",
        "পেন কাৰ্ড",
        "শেহতীয়া পাছপোৰ্ট আকাৰৰ ফটো",
        "মূল্যায়নৰ বাবে সোণৰ গহনা",
        "ঠিকনা প্ৰমাণ (যদি ঠিকনা আধাৰৰ পৰা বেলেগ হয়)",
      ],
    },
    ur: {
      title: "گولڈ فلیکسی کریڈٹ",
      tagline: "آپ کے سونے کے خلاف ریوالونگ کریڈٹ لائن — صرف استعمال شدہ رقم پر سود ادا کریں۔",
      overview: `شری گنیش فائنانس کی گولڈ فلیکسی کریڈٹ ایک جدید ریوالونگ کریڈٹ سہولت ہے جہاں آپ اپنے سونے کے زیورات گروی رکھ کر پہلے سے منظور شدہ کریڈٹ حد حاصل کرتے ہیں۔`,
      overview_extra: `RBI کے منصفانہ قرضہ دہندگی طریقوں اور NBFC قوانین کے تحت چلائی جانے والی اس سہولت میں سود کی حساب کتاب میں مکمل شفافیت یقینی بنائی گئی ہے۔`,
      benefits: [
        "سود صرف نکالی گئی رقم پر، پوری منظور حد پر نہیں",
        "ریوالونگ سہولت — مدت کے دوران کئی بار ادا کریں اور نکالیں",
        "سونے کے زیورات (18–22 قیراط) کے خلاف ₹50 لاکھ تک قرضہ",
        "کم سے کم دستاویزات — KYC + گولڈ ویلیوایشن رپورٹ کافی",
        "لچکدار مدت: 6 سے 24 ماہ",
        "قبل از وقت ادائیگی جرمانہ نہیں",
        "RBI اصولوں کے مطابق محفوظ، بیمہ شدہ والٹ میں سونا",
      ],
      eligibility_points: [
        "18 سال اور اس سے زیادہ عمر کے ہندوستانی باشندے",
        "KYC تعمیل (آدھار + PAN لازمی)",
        "18–22 قیراط خالصیت کے سونے کے زیورات قابل قبول",
        "کم از کم آمدنی کا معیار نہیں — سونے کی قدر اہلیت کا تعین کرتی ہے",
      ],
      documents: [
        "آدھار کارڈ (PMLA اصولوں کے تحت لازمی)",
        "پین کارڈ",
        "حالیہ پاسپورٹ سائز تصویر",
        "قیمت لگانے کے لیے سونے کے زیورات",
        "پتے کا ثبوت (اگر پتہ آدھار سے مختلف ہو)",
      ],
    },
  },

  // ─── GOLD LOAN ───────────────────────────────────────────────────────────────
  "gold-loan": {
    icon: "🏅",
    popular: true,
    stats: { interest: "9.99% p.a.", amount: "₹1,500 – No Limit", tenure: "3–24 months", fee: "NIL" },
    en: {
      title: "Gold Loan",
      tagline: "India's most trusted secured loan — instant funds against your gold ornaments.",
      overview: `A Gold Loan from Shree Ganesh Finance is a secured lending product where you pledge your gold jewellery as collateral and receive funds instantly. We adhere to the RBI-mandated 75% LTV ratio, ensuring responsible lending and asset protection.`,
      overview_extra: `Gold loans start from ₹1,500 with no defined upper ceiling. Same-day disbursement, transparent interest calculation, and gold stored in insured, secure vaults. All pledged gold is covered under comprehensive insurance.`,
      benefits: [
        "Instant disbursement — funds credited within hours of valuation",
        "Loan amount: ₹1,500 minimum; no maximum limit (subject to 75% LTV per RBI)",
        "Competitive interest rates starting from 9.99% p.a.",
        "Zero income proof or credit score requirement",
        "Pre and part-payment options available anytime",
        "Gold insured and stored in RBI-compliant, high-security vaults",
        "Simple renewal process — extend tenure without surrendering gold",
      ],
      eligibility_points: [
        "Indian residents aged 18 years and above",
        "KYC compliance mandatory (Aadhaar + PAN)",
        "Gold jewellery / ornaments of 18–22 karat purity",
        "No minimum income or CIBIL score required",
      ],
      documents: [
        "Aadhaar Card",
        "PAN Card (mandatory for loans above ₹1 lakh)",
        "Recent passport-size photograph",
        "Gold ornaments for in-branch valuation",
      ],
    },
    hi: {
      title: "गोल्ड लोन",
      tagline: "भारत का सबसे विश्वसनीय सुरक्षित लोन — सोने के गहनों पर तुरंत फंड।",
      overview: `श्री गणेश फाइनेंस का गोल्ड लोन एक सुरक्षित उधार उत्पाद है जहाँ आप अपने सोने के गहने जमानत के रूप में रखकर तुरंत फंड प्राप्त करते हैं। हम RBI द्वारा अनिवार्य 75% LTV अनुपात का पालन करते हैं।`,
      overview_extra: `गोल्ड लोन ₹1,500 से शुरू होते हैं बिना किसी ऊपरी सीमा के। उसी दिन वितरण, पारदर्शी ब्याज गणना, और सोना बीमित, सुरक्षित तिजोरियों में रखा जाता है।`,
      benefits: [
        "तत्काल वितरण — मूल्यांकन के कुछ घंटों के भीतर फंड",
        "ऋण राशि: ₹1,500 न्यूनतम; अधिकतम सीमा नहीं (RBI के 75% LTV के अनुसार)",
        "9.99% प्रति वर्ष से प्रतिस्पर्धी ब्याज दरें",
        "शून्य आय प्रमाण या क्रेडिट स्कोर आवश्यकता",
        "किसी भी समय पूर्व और आंशिक भुगतान विकल्प",
        "बीमित और RBI-अनुपालन, उच्च-सुरक्षा तिजोरियों में सोना",
        "सरल नवीनीकरण प्रक्रिया — सोना सौंपे बिना कार्यकाल बढ़ाएं",
      ],
      eligibility_points: [
        "18 वर्ष और उससे अधिक आयु के भारतीय निवासी",
        "KYC अनुपालन अनिवार्य (आधार + PAN)",
        "18–22 कैरेट शुद्धता के सोने के गहने / आभूषण",
        "कोई न्यूनतम आय या CIBIL स्कोर आवश्यक नहीं",
      ],
      documents: [
        "आधार कार्ड",
        "पैन कार्ड (₹1 लाख से अधिक के लोन के लिए अनिवार्य)",
        "हालिया पासपोर्ट आकार की फोटो",
        "शाखा मूल्यांकन के लिए सोने के आभूषण",
      ],
    },
    mr: {
      title: "गोल्ड लोन",
      tagline: "भारतातील सर्वात विश्वासू सुरक्षित कर्ज — सोन्याच्या दागिन्यांवर त्वरित निधी.",
      overview: `श्री गणेश फायनान्सचे गोल्ड लोन एक सुरक्षित कर्ज उत्पादन आहे जिथे तुम्ही तुमचे सोन्याचे दागिने तारण म्हणून ठेवून त्वरित निधी मिळवता. आम्ही RBI द्वारे अनिवार्य 75% LTV गुणोत्तर पाळतो.`,
      overview_extra: `गोल्ड लोन ₹1,500 पासून सुरू होतात कोणत्याही वरच्या मर्यादेशिवाय. त्याच दिवशी वितरण, पारदर्शक व्याज गणना आणि सोने विमाकृत, सुरक्षित तिजोरींमध्ये ठेवले जाते.`,
      benefits: [
        "त्वरित वितरण — मूल्यांकनाच्या काही तासांत निधी",
        "कर्ज रक्कम: ₹1,500 किमान; कमाल मर्यादा नाही",
        "9.99% प्रति वर्षापासून स्पर्धात्मक व्याज दर",
        "शून्य उत्पन्न पुरावा किंवा क्रेडिट स्कोर आवश्यकता",
        "कधीही पूर्व आणि आंशिक पेमेंट पर्याय",
        "RBI-अनुपालित, उच्च-सुरक्षा तिजोरींमध्ये सोने",
        "सोने न सोडता कार्यकाळ वाढवा",
      ],
      eligibility_points: [
        "18 वर्षे व त्यावरील भारतीय रहिवासी",
        "KYC अनुपालन अनिवार्य (आधार + PAN)",
        "18–22 कॅरेट शुद्धतेचे सोन्याचे दागिने",
        "कोणत्याही किमान उत्पन्न किंवा CIBIL स्कोरची आवश्यकता नाही",
      ],
      documents: [
        "आधार कार्ड",
        "पॅन कार्ड (₹1 लाखांवरील कर्जासाठी अनिवार्य)",
        "अलीकडील पासपोर्ट आकाराचा फोटो",
        "शाखा मूल्यांकनासाठी सोन्याचे दागिने",
      ],
    },
    gu: {
      title: "ગોલ્ડ લોન",
      tagline: "ભારતની સૌથી વિશ્વસનીય સુરક્ષિત લોન — સોનાના ઘરેણાં પર તત્કાળ ભંડોળ.",
      overview: `શ્રી ગણેશ ફાઇનાન્સની ગોલ્ડ લોન એ એક સુરક્ષિત ધિરાણ ઉત્પાદ છે જ્યાં તમે તમારા સોનાના ઘરેણાં જામીન તરીકે ગીરવે મૂકીને તત્કાળ ભંડોળ મેળવો છો.`,
      overview_extra: `ગોલ્ડ લોન ₹1,500 થી શરૂ થાય છે, ઉચ્ચ મર્યાદા વિના. સમાન દિવસ વિતરણ, પારદર્શક વ્યાજ ગણતરી.`,
      benefits: [
        "તત્કાળ વિતરણ — મૂલ્યાંકનના થોડા કલાકોમાં ભંડોળ",
        "લોન રકમ: ₹1,500 ન્યૂનતમ; મહત્તમ મર્યાદા નહીં",
        "9.99% પ્રતિ વર્ષથી સ્પર્ધાત્મક વ્યાજ દરો",
        "શૂન્ય આવક પ્રમાણ અથવા ક્રેડિટ સ્કોર જરૂરિયાત",
        "ગમે ત્યારે પૂર્વ અને આંશિક ચૂકવણી વિકલ્પો",
        "RBI-સંગ્ત, ઉચ્ચ-સુરક્ષા તિજોરીઓમાં સોનું",
        "સોનું સોંપ્યા વિના કાર્યકાળ લંબાવો",
      ],
      eligibility_points: [
        "18 વર્ષ અને તેથી વધુ ઉંમરના ભારતીય નિવાસીઓ",
        "KYC અનુપાલન ફરજિયાત (આધાર + PAN)",
        "18–22 કેરેટ શુદ્ધતાના સોનાના ઘરેણાં",
        "કોઈ લઘુત્તમ આવક અથવા CIBIL સ્કોર જરૂરી નથી",
      ],
      documents: [
        "આધાર કાર્ડ",
        "પૅન કાર્ડ (₹1 લાખ ઉપરની લોન માટે ફરજિયાત)",
        "તાજેતરનો પાસપોર્ટ સાઇઝ ફોટો",
        "શાખા મૂલ્યાંકન માટે સોનાના ઘરેણાં",
      ],
    },
    te: {
      title: "గోల్డ్ లోన్",
      tagline: "భారతదేశంలో అత్యంత నమ్మకమైన సురక్షిత రుణం — మీ బంగారు ఆభరణాలపై తక్షణ నిధులు.",
      overview: `శ్రీ గణేష్ ఫైనాన్స్ నుండి గోల్డ్ లోన్ అనేది ఒక సురక్షిత రుణ ఉత్పత్తి, దీనిలో మీరు మీ బంగారు నగలను జామీనుగా తాకట్టు పెట్టి తక్షణం నిధులు పొందుతారు.`,
      overview_extra: `గోల్డ్ లోన్‌లు ₹1,500 నుండి ఎలాంటి గరిష్ట పరిమితి లేకుండా ప్రారంభమవుతాయి. అదే రోజు విడుదల, పారదర్శక వడ్డీ గణన.`,
      benefits: [
        "తక్షణ విడుదల — విలువ నిర్ణయం అయిన గంటల్లో నిధులు",
        "రుణ మొత్తం: ₹1,500 కనిష్టం; గరిష్ట పరిమితి లేదు",
        "9.99% p.a. నుండి పోటీ వడ్డీ రేట్లు",
        "ఆదాయ రుజువు లేదా క్రెడిట్ స్కోర్ అవసరం లేదు",
        "ఎప్పుడైనా ముందస్తు మరియు పాక్షిక చెల్లింపు",
        "RBI-అనుకూల, అధిక-భద్రత వాల్ట్‌లలో బంగారం",
        "బంగారం అప్పగించకుండా కాలపరిమితి పొడిగించవచ్చు",
      ],
      eligibility_points: [
        "18 సంవత్సరాలు మరియు అంతకంటే ఎక్కువ వయస్సు గల భారతీయ నివాసులు",
        "KYC అనుపాలన తప్పనిసరి (ఆధార్ + PAN)",
        "18–22 కేరట్ స్వచ్ఛత గల బంగారు ఆభరణాలు",
        "కనీస ఆదాయం లేదా CIBIL స్కోర్ అవసరం లేదు",
      ],
      documents: [
        "ఆధార్ కార్డ్",
        "PAN కార్డ్ (₹1 లక్ష కంటే ఎక్కువ రుణాలకు తప్పనిసరి)",
        "ఇటీవలి పాస్‌పోర్ట్ సైజ్ ఫోటో",
        "శాఖలో విలువ నిర్ణయం కోసం బంగారు ఆభరణాలు",
      ],
    },
    ta: {
      title: "கோல்டு லோன்",
      tagline: "இந்தியாவின் மிகவும் நம்பகமான பாதுகாப்பான கடன் — தங்க நகைகளுக்கு எதிராக உடனடி நிதி.",
      overview: `ஸ்ரீ கணேஷ் ஃபைனான்ஸிடமிருந்து கோல்டு லோன் என்பது ஒரு பாதுகாப்பான கடன் தயாரிப்பு, இதில் நீங்கள் உங்கள் தங்க நகைகளை பிணையாக அடமானம் வைத்து உடனடியாக நிதி பெறுகிறீர்கள்.`,
      overview_extra: `கோல்டு லோன்கள் ₹1,500 முதல் எந்த உச்ச வரம்பும் இல்லாமல் தொடங்குகின்றன. அதே நாள் விடுவிப்பு, வெளிப்படையான வட்டி கணக்கீடு.`,
      benefits: [
        "உடனடி விடுவிப்பு — மதிப்பீட்டிற்குப் பிறகு சில மணிநேரங்களில் நிதி",
        "கடன் தொகை: ₹1,500 குறைந்தபட்சம்; அதிகபட்ச வரம்பு இல்லை",
        "9.99% p.a. முதல் போட்டி வட்டி விகிதங்கள்",
        "வருமான சான்று அல்லது கிரெடிட் ஸ்கோர் தேவையில்லை",
        "எப்போது வேண்டுமானாலும் முன்கூட்டிய மற்றும் பகுதி செலுத்துகை",
        "RBI-இணங்கிய, உயர்-பாதுகாப்பு வால்ட்டுகளில் தங்கம்",
        "தங்கத்தை ஒப்படைக்காமல் காலத்தை நீட்டிக்கலாம்",
      ],
      eligibility_points: [
        "18 வயது மற்றும் அதற்கு மேற்பட்ட இந்திய குடியிருப்பாளர்கள்",
        "KYC இணக்கம் கட்டாயம் (ஆதார் + PAN)",
        "18–22 கேரட் தூய்மையுள்ள தங்க நகைகள்",
        "குறைந்தபட்ச வருமானம் அல்லது CIBIL ஸ்கோர் தேவையில்லை",
      ],
      documents: [
        "ஆதார் அட்டை",
        "PAN அட்டை (₹1 லட்சத்திற்கு மேல் கடன்களுக்கு கட்டாயம்)",
        "சமீபத்திய பாஸ்போர்ட் அளவு புகைப்படம்",
        "கிளை மதிப்பீட்டிற்கான தங்க நகைகள்",
      ],
    },
    kn: {
      title: "ಗೋಲ್ಡ್ ಲೋನ್",
      tagline: "ಭಾರತದ ಅತ್ಯಂತ ವಿಶ್ವಾಸಾರ್ಹ ಸುರಕ್ಷಿತ ಸಾಲ — ಚಿನ್ನದ ಆಭರಣಗಳ ಮೇಲೆ ತಕ್ಷಣ ಹಣ.",
      overview: `ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್‌ನಿಂದ ಗೋಲ್ಡ್ ಲೋನ್ ಒಂದು ಸುರಕ್ಷಿತ ಸಾಲ ಉತ್ಪನ್ನವಾಗಿದ್ದು, ನೀವು ನಿಮ್ಮ ಚಿನ್ನದ ಆಭರಣಗಳನ್ನು ಭದ್ರತೆಯಾಗಿ ಅಡವಿಟ್ಟು ತಕ್ಷಣ ಹಣ ಪಡೆಯುತ್ತೀರಿ.`,
      overview_extra: `ಗೋಲ್ಡ್ ಲೋನ್‌ಗಳು ₹1,500 ರಿಂದ ಯಾವುದೇ ಮೇಲ್ ಮಿತಿ ಇಲ್ಲದೆ ಪ್ರಾರಂಭವಾಗುತ್ತವೆ. ಅದೇ ದಿನ ವಿತರಣೆ, ಪಾರದರ್ಶಕ ಬಡ್ಡಿ ಲೆಕ್ಕ.`,
      benefits: [
        "ತಕ್ಷಣ ವಿತರಣೆ — ಮೌಲ್ಯಮಾಪನದ ಕೆಲ ಗಂಟೆಗಳಲ್ಲಿ ಹಣ",
        "ಸಾಲ ಮೊತ್ತ: ₹1,500 ಕನಿಷ್ಠ; ಗರಿಷ್ಠ ಮಿತಿ ಇಲ್ಲ",
        "9.99% ಪ್ರತಿ ವರ್ಷದಿಂದ ಸ್ಪರ್ಧಾತ್ಮಕ ಬಡ್ಡಿ ದರಗಳು",
        "ಶೂನ್ಯ ಆದಾಯ ಪುರಾವೆ ಅಥವಾ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ಅಗತ್ಯ",
        "ಯಾವಾಗ ಬೇಕಾದರೂ ಮುಂಚಿತ ಮತ್ತು ಭಾಗಶಃ ಪಾವತಿ",
        "RBI-ಅನುಸರಣ, ಹೆಚ್ಚಿನ ಭದ್ರತಾ ತಿಜೋರಿಗಳಲ್ಲಿ ಚಿನ್ನ",
        "ಚಿನ್ನ ಒಪ್ಪಿಸದೆ ಅವಧಿ ವಿಸ್ತರಿಸಬಹುದು",
      ],
      eligibility_points: [
        "18 ವರ್ಷ ಮತ್ತು ಅದಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಭಾರತೀಯ ನಿವಾಸಿಗಳು",
        "KYC ಅನುಸರಣೆ ಕಡ್ಡಾಯ (ಆಧಾರ್ + PAN)",
        "18–22 ಕ್ಯಾರೆಟ್ ಶುದ್ಧತೆಯ ಚಿನ್ನದ ಆಭರಣಗಳು",
        "ಕನಿಷ್ಠ ಆದಾಯ ಅಥವಾ CIBIL ಸ್ಕೋರ್ ಅಗತ್ಯ ಇಲ್ಲ",
      ],
      documents: [
        "ಆಧಾರ್ ಕಾರ್ಡ್",
        "ಪ್ಯಾನ್ ಕಾರ್ಡ್ (₹1 ಲಕ್ಷಕ್ಕಿಂತ ಹೆಚ್ಚಿನ ಸಾಲಗಳಿಗೆ ಕಡ್ಡಾಯ)",
        "ಇತ್ತೀಚಿನ ಪಾಸ್ಪೋರ್ಟ್ ಗಾತ್ರದ ಫೋಟೋ",
        "ಶಾಖೆಯ ಮೌಲ್ಯಮಾಪನಕ್ಕಾಗಿ ಚಿನ್ನದ ಆಭರಣಗಳು",
      ],
    },
    as: {
      title: "গোল্ড লোন",
      tagline: "ভাৰতৰ সবচেয়ে বিশ্বসনীয় সুৰক্ষিত ঋণ — সোণৰ গহনাত তৎকালীন ধন।",
      overview: `শ্ৰী গণেশ ফাইনেন্সৰ গোল্ড লোন এটি সুৰক্ষিত ঋণদান সামগ্ৰী য'ত আপুনি আপোনাৰ সোণৰ গহনা জামিন হিচাপে বন্ধক ৰাখি তৎকালীনভাৱে ধন লাভ কৰে।`,
      overview_extra: `গোল্ড লোন ₹1,500 ৰ পৰা আৰম্ভ হয় কোনো উৰ্ধ্ব সীমা নোহোৱাকৈ। একেদিনা বিতৰণ, স্বচ্ছ সুদ গণনা।`,
      benefits: [
        "তৎকালীন বিতৰণ — মূল্যায়নৰ কেইঘণ্টামান পিছত ধন",
        "ঋণ পৰিমাণ: ₹1,500 সৰ্বনিম্ন; সৰ্বোচ্চ সীমা নাই",
        "9.99% প্ৰতি বছৰত প্ৰতিযোগিতামূলক সুদৰ হাৰ",
        "শূন্য আয়ৰ প্ৰমাণ বা ক্রেডিট স্কোৰ প্ৰয়োজন নাই",
        "যিকোনো সময়ত পূৰ্ব আৰু আংশিক পৰিশোধৰ বিকল্প",
        "RBI-অনুপালন, উচ্চ-সুৰক্ষা ভল্টত সোণ",
        "সোণ নিদিয়াকৈ মেয়াদ বঢ়াব পাৰি",
      ],
      eligibility_points: [
        "18 বছৰ আৰু তাতকৈ বেছি বয়সৰ ভাৰতীয় বাসিন্দা",
        "KYC অনুপালন বাধ্যতামূলক (আধাৰ + PAN)",
        "18–22 কেৰেট বিশুদ্ধতাৰ সোণৰ গহনা",
        "কোনো ন্যূনতম আয় বা CIBIL স্কোৰ প্ৰয়োজন নাই",
      ],
      documents: [
        "আধাৰ কাৰ্ড",
        "পেন কাৰ্ড (₹1 লাখৰ অধিক ঋণৰ বাবে বাধ্যতামূলক)",
        "শেহতীয়া পাছপোৰ্ট আকাৰৰ ফটো",
        "শাখাত মূল্যায়নৰ বাবে সোণৰ গহনা",
      ],
    },
    ur: {
      title: "گولڈ لون",
      tagline: "ہندوستان کا سب سے قابل اعتماد محفوظ قرضہ — سونے کے زیورات پر فوری رقم۔",
      overview: `شری گنیش فائنانس کا گولڈ لون ایک محفوظ قرضہ ہے جہاں آپ اپنے سونے کے زیورات ضمانت کے طور پر گروی رکھ کر فوری طور پر رقم حاصل کرتے ہیں۔`,
      overview_extra: `گولڈ لون ₹1,500 سے شروع ہوتے ہیں بغیر کسی اوپری حد کے۔ اسی دن تقسیم، شفاف سود کا حساب۔`,
      benefits: [
        "فوری تقسیم — قیمت لگانے کے چند گھنٹوں میں رقم",
        "قرضے کی رقم: ₹1,500 کم از کم؛ زیادہ سے زیادہ حد نہیں",
        "9.99% سالانہ سے مسابقتی سود کی شرح",
        "آمدنی کا ثبوت یا کریڈٹ اسکور کی ضرورت نہیں",
        "کسی بھی وقت قبل از وقت اور جزوی ادائیگی",
        "RBI کے مطابق، اعلی سیکیورٹی والٹ میں سونا",
        "سونا دیے بغیر مدت میں توسیع",
      ],
      eligibility_points: [
        "18 سال اور اس سے زیادہ عمر کے ہندوستانی باشندے",
        "KYC تعمیل لازمی (آدھار + PAN)",
        "18–22 قیراط خالصیت کے سونے کے زیورات",
        "کم از کم آمدنی یا CIBIL اسکور کی ضرورت نہیں",
      ],
      documents: [
        "آدھار کارڈ",
        "پین کارڈ (₹1 لاکھ سے زائد قرضوں کے لیے لازمی)",
        "حالیہ پاسپورٹ سائز تصویر",
        "شاخ میں قیمت لگانے کے لیے سونے کے زیورات",
      ],
    },
  },
};

// ─── For services NOT fully translated, fall back to English ──────────────────
// (credit-score, gold-loan-at-home, housing-finance, personal-loan,
//  small-business-loan, insurance, sme-loan, corporate-business-loan,
//  vehicle-loan, mutual-funds, money-transfer)
// You can add full translations the same way above. For now they show English.

const SERVICES_FALLBACK = {
  "credit-score": {
    icon: "📊", popular: false,
    stats: { interest: "Free", amount: "Score: 300–900", tenure: "Instant", fee: "₹0" },
    en: {
      title: "Credit Score",
      tagline: "Free credit health check — know your CIBIL score and improve your borrowing power.",
      overview: `Your CIBIL / Experian credit score is a 3-digit numeric summary (300–900) computed by credit bureaus licensed by the Reserve Bank of India. Shree Ganesh Finance provides a complimentary credit score check to all customers.`,
      overview_extra: `A score above 750 qualifies you for preferential interest rates. Our advisors help you understand payment history (35%), credit utilization (30%), credit age (15%), credit mix (10%), and new inquiries (10%).`,
      benefits: [
        "Free CIBIL / Experian score check — no charge, no hidden cost",
        "Detailed breakdown of score components as per RBI bureau guidelines",
        "Personalized improvement plan from certified financial advisors",
        "Score check does not impact your credit record (soft inquiry only)",
        "Available online and at all branch locations",
        "Linked to pre-approved loan offers based on your score band",
      ],
      eligibility_points: [
        "Any Indian resident with a PAN card",
        "Applicants with no prior credit history can also check",
        "Available for both salaried and self-employed individuals",
      ],
      documents: ["PAN Card (mandatory for bureau query)", "Aadhaar Card for identity verification", "Mobile number linked to Aadhaar for OTP"],
    },
  },
  "gold-loan-at-home": {
    icon: "🏠", popular: false,
    stats: { interest: "9.99% p.a.", amount: "₹5,000 – ₹50L", tenure: "3–24 months", fee: "NIL" },
    en: {
      title: "Gold Loan at Home",
      tagline: "Doorstep gold loan in 3 steps — our executive visits you, no branch visit needed.",
      overview: `Our Gold Loan at Home service brings the complete gold loan facility to your doorstep. A trained executive visits at your chosen time, conducts on-site gold valuation, and disburses the loan directly to your bank account.`,
      overview_extra: `Designed for senior citizens, homemakers, and busy professionals. The process is digitally documented with secure chain-of-custody for your gold from pickup to vault storage.`,
      benefits: [
        "Zero branch visit required — entire process at your doorstep",
        "Certified gold appraiser with calibrated valuation kit",
        "Loan disbursed directly to your bank account within the same visit",
        "Available 6 days a week — schedule at your convenience",
        "Secure, GPS-tracked transport of pledged gold to vaults",
        "Gold covered under all-risk insurance from moment of pickup",
        "Senior citizen priority slots available — no waiting",
      ],
      eligibility_points: [
        "Indian residents aged 18 and above within serviceable pincodes",
        "Valid KYC documents (Aadhaar + PAN)",
        "Minimum gold quantity: equivalent to ₹5,000 loan value",
        "Active bank account for disbursement (NEFT/IMPS/UPI)",
      ],
      documents: ["Aadhaar Card", "PAN Card", "Bank account details (passbook copy / cancelled cheque)", "Gold ornaments (valued at home)"],
    },
  },
  "housing-finance": {
    icon: "🏗️", popular: false,
    stats: { interest: "8.50% p.a.", amount: "₹5L – ₹5 Crore", tenure: "Up to 20 years", fee: "0.50%" },
    en: {
      title: "Housing Finance",
      tagline: "Make your dream home a reality — affordable home loans with long tenures.",
      overview: `We offer housing loans for purchase of ready-to-move and under-construction properties, home construction, and balance transfer of existing home loans. Products are aligned with NHB and RBI guidelines.`,
      overview_extra: `Financing up to 80% of property value as per RBI LTV norms. Flexible EMI structures and tenures up to 20 years make home ownership accessible for salaried, self-employed, and NRI borrowers.`,
      benefits: [
        "Finance up to 80% of property value per RBI/NHB LTV guidelines",
        "Loan tenure up to 20 years",
        "Available for purchase, construction, extension, and renovation",
        "Balance transfer facility with top-up loan option",
        "PMAY subsidy assistance for eligible borrowers",
        "Dedicated relationship manager for end-to-end guidance",
        "Doorstep documentation service available",
      ],
      eligibility_points: [
        "Salaried: Minimum 2 years employment; net income ₹25,000/month",
        "Self-employed: Minimum 3 years business continuity with ITR",
        "Age: 21–65 years at loan maturity",
        "Property must have clear title and statutory approvals",
      ],
      documents: ["Identity & Address Proof (Aadhaar + PAN)", "Income documents (3 months salary slips / 2 years ITR)", "Bank statements (6 months)", "Property documents (sale deed, NOC, approved plan)"],
    },
  },
  "personal-loan": {
    icon: "👤", popular: false,
    stats: { interest: "12.00% p.a.", amount: "₹50K – ₹25L", tenure: "12–60 months", fee: "1%–2%" },
    en: {
      title: "Personal Loan",
      tagline: "Unsecured quick cash for your goals — no collateral, minimal documentation.",
      overview: `An unsecured credit product for any personal financial requirement — medical emergencies, education, travel, or weddings. We follow strict fair lending practices with full disclosure of all charges upfront.`,
      overview_extra: `No collateral pledged. Approvals based on CIBIL score, income stability, and repayment capacity. APR disclosed upfront as per RBI's Key Fact Statement mandate effective 2024.`,
      benefits: [
        "No collateral required",
        "Quick digital approval — decision within 24–48 hours",
        "Loan amount from ₹50,000 to ₹25 lakhs",
        "Flexible tenure: 12 to 60 months",
        "APR disclosed upfront per RBI's KFS mandate",
        "Part-prepayment allowed after 6 EMIs",
        "Top-up loan available on good repayment track record",
      ],
      eligibility_points: ["Salaried: Minimum net monthly income ₹20,000", "Self-employed: Minimum annual turnover as per ITR", "CIBIL score 700 and above preferred", "Age: 21–60 years"],
      documents: ["Aadhaar Card + PAN Card", "3 months salary slips / ITR", "6 months bank statements", "Employment ID / appointment letter"],
    },
  },
  "small-business-loan": {
    icon: "🏪", popular: false,
    stats: { interest: "14.00% p.a.", amount: "₹50K – ₹2 Crore", tenure: "12–84 months", fee: "1%–2%" },
    en: {
      title: "Small Business Loan",
      tagline: "Fuel your entrepreneurial ambitions — flexible business finance for MSMEs.",
      overview: `Designed for MSMEs registered under the MSMED Act, 2006. We offer secured and unsecured variants for working capital, machinery purchase, business expansion, and trade financing.`,
      overview_extra: `Aligned with RBI's Priority Sector Lending guidelines and CGTMSE credit guarantee schemes. Collateral-free loans up to ₹2 crore available. Mudra Loan (PMMY) linkages facilitated.`,
      benefits: ["Collateral-free loans up to ₹2 crore under CGTMSE", "Mudra Loan linkage — Shishu/Kishore/Tarun", "Working capital, term loan, and overdraft facilities", "Minimal documentation for GST-registered businesses", "Flexible repayment: monthly, quarterly, or seasonal", "Priority processing for women entrepreneurs and SC/ST borrowers"],
      eligibility_points: ["MSME registered under Udyam Registration", "Minimum 2 years business operation with audited financials", "GST registration mandatory for loans above ₹10 lakhs"],
      documents: ["Udyam Registration Certificate", "GST Registration + 12 months GST returns", "2 years ITR with audited P&L", "Bank statements (12 months)"],
    },
  },
  "insurance": {
    icon: "🛡️", popular: false,
    stats: { interest: "IRDAI Approved", amount: "As per plan", tenure: "1–30 years", fee: "NIL" },
    en: {
      title: "Insurance",
      tagline: "Protect what matters most — life, health, and asset insurance under one roof.",
      overview: `Shree Ganesh Finance is a licensed Corporate Agent for IRDAI-regulated insurance products — Life, Health, Motor, and Property Insurance from leading insurers.`,
      overview_extra: `All products comply with IRDAI regulations. Free-look period guidance, claim assistance, and annual portfolio reviews provided.`,
      benefits: ["Life Insurance: Term plans, endowment, and ULIPs", "Health Insurance: Individual, family floater, and top-up plans", "Motor Insurance: Comprehensive and third-party liability", "Property and Home Insurance for loan-linked assets", "Free-look period: 15 days (30 days for electronic policies)", "Claim assistance — we liaise with insurer on your behalf", "Annual policy review and renewal reminders"],
      eligibility_points: ["Indian residents aged 18 and above", "Medical underwriting may apply for health/life policies", "No prior insurance mandatory"],
      documents: ["Aadhaar Card + PAN Card", "Passport-size photograph", "Medical reports (if required)", "Vehicle RC book (for motor insurance)"],
    },
  },
  "sme-loan": {
    icon: "📈", popular: false,
    stats: { interest: "13.00% p.a.", amount: "₹25L – ₹10 Crore", tenure: "12–120 months", fee: "1%–2%" },
    en: {
      title: "SME Loan",
      tagline: "Scale your business confidently — structured credit for growing enterprises.",
      overview: `Purpose-built for established businesses looking to scale operations, upgrade technology, expand capacity, or manage seasonal cash flow gaps.`,
      overview_extra: `Funded and non-funded credit facilities available including term loans, working capital, bank guarantees, and letter of credit.`,
      benefits: ["Funded and non-funded credit facilities", "Working capital: Overdraft, Cash Credit, and Bill Discounting", "Term loans for machinery, equipment, and expansion", "CIBIL MSME Rank-based preferential pricing", "Invoice financing for B2B businesses", "Dedicated Relationship Manager for all SME accounts"],
      eligibility_points: ["Annual turnover between ₹50 lakhs and ₹250 crore", "Minimum 3 years of audited financials", "Satisfactory CIBIL MSME rank", "GST returns consistent with declared turnover"],
      documents: ["3 years audited financials (P&L, Balance Sheet)", "3 years ITR (Entity + Promoters)", "GST registration + 24 months returns", "KYC of all directors/partners"],
    },
  },
  "corporate-business-loan": {
    icon: "🏢", popular: false,
    stats: { interest: "11.00% p.a.", amount: "₹1 Crore+", tenure: "12–180 months", fee: "0.50%–1%" },
    en: {
      title: "Corporate Business Loan",
      tagline: "High-value structured finance for large corporates and conglomerates.",
      overview: `A large-ticket structured credit product for companies with significant revenue, stable cash flows, and formal corporate governance.`,
      overview_extra: `Operates under RBI's Large Exposure Framework (LEF) and IRB credit assessment methodology.`,
      benefits: ["High-value structured credit for corporate cash flow cycles", "Term loans, working capital lines, and project finance", "Consortium lending for large exposures", "Competitive pricing linked to credit rating and collateral", "Co-lending with scheduled commercial banks", "Dedicated corporate banking team with sectoral expertise"],
      eligibility_points: ["Companies with annual turnover above ₹250 crore", "Credit rating from CRISIL, ICRA, CARE, or FITCH preferred", "Minimum 5 years of audited financials", "Board resolution authorizing borrowing required"],
      documents: ["5 years audited financials + board-approved projections", "Credit rating report (if available)", "MOA, AOA, board resolution", "KYC of all directors and significant shareholders"],
    },
  },
  "vehicle-loan": {
    icon: "🚗", popular: false,
    stats: { interest: "9.50% p.a.", amount: "₹50K – ₹50L", tenure: "12–84 months", fee: "1%" },
    en: {
      title: "Vehicle Loan",
      tagline: "Drive home your dream vehicle — new and used vehicle financing at your doorstep.",
      overview: `Vehicle loans for new and pre-owned cars, two-wheelers, and commercial vehicles. Financing up to 85% of on-road price (new) or 80% of assessed value (used) per RBI norms.`,
      overview_extra: `Loans are hypothecated as per the Motor Vehicles Act, 1988. Used vehicle loans available for vehicles up to 7 years old.`,
      benefits: ["Finance up to 85% of on-road price for new vehicles", "Used car loans for vehicles up to 7 years old", "Transparent amortization schedules", "Flexible tenure: 12 to 84 months", "RC endorsement completed within 7 working days", "Part-prepayment accepted after 6 EMIs without penalty"],
      eligibility_points: ["Salaried / self-employed Indian residents aged 21–65", "Minimum net income: ₹15,000/month (salaried)", "CIBIL score 650+ preferred", "Valid driving license required"],
      documents: ["Aadhaar + PAN", "3 months salary slips / ITR", "6 months bank statements", "Vehicle quotation / valuation report", "Driving License"],
    },
  },
  "mutual-funds": {
    icon: "📂", popular: false,
    stats: { interest: "Market Returns", amount: "₹500 SIP onwards", tenure: "No lock-in*", fee: "0%" },
    en: {
      title: "Mutual Funds",
      tagline: "Invest in SEBI-regulated mutual funds — grow wealth systematically.",
      overview: `Shree Ganesh Finance is an AMFI-registered Mutual Fund Distributor (ARN holder). We offer equity, debt, hybrid, and solution-oriented schemes from SEBI-registered AMCs.`,
      overview_extra: `All investments subject to market risk. We facilitate SIP, lump sum, and STP investments with goal-based financial planning.`,
      benefits: ["Full range: Equity, Debt, Hybrid, Index, ELSS funds", "SIP starting from ₹500/month", "SEBI-mandated risk-o-meter for every scheme", "Goal-based planning: retirement, education, home purchase", "Annual portfolio review and rebalancing advisory", "KYC once — invest across all AMCs"],
      eligibility_points: ["KYC-compliant Indian residents", "NRIs can invest subject to FEMA norms", "Minors can invest through guardian", "No minimum income requirement"],
      documents: ["PAN Card (mandatory per SEBI/PMLA)", "Aadhaar for KYC verification", "Bank account for NACH/UPI mandate", "Passport-size photograph"],
    },
  },
  "money-transfer": {
    icon: "💸", popular: false,
    stats: { interest: "Low Fee", amount: "No Upper Limit*", tenure: "Instant", fee: "Minimal" },
    en: {
      title: "Money Transfer",
      tagline: "Fast, safe, RBI-authorised domestic and international remittances.",
      overview: `Domestic money transfer via RBI-authorised BC network. NEFT, RTGS, IMPS, UPI, and AePS (Aadhaar-enabled) for last-mile banking in rural areas.`,
      overview_extra: `International remittances under RBI's LRS — up to USD 2,50,000 per financial year. Full FEMA compliance and Form A2 filing assistance provided.`,
      benefits: ["Domestic: NEFT/RTGS/IMPS/UPI — 24×7", "AePS cash withdrawal at BC outlets", "International remittance under LRS (up to USD 2.5L/year)", "Inward remittance through authorized bank tie-ups", "Real-time tracking and SMS/email confirmation", "Competitive forex rates"],
      eligibility_points: ["Any KYC-compliant Indian resident for domestic transfers", "For LRS: PAN mandatory", "For AePS: Aadhaar-linked bank account required"],
      documents: ["Aadhaar + PAN", "Form A2 for international remittance", "Purpose declaration for LRS amounts above ₹25,000", "Bank account details of beneficiary"],
    },
  },
};

// ─── Merge both data sources ──────────────────────────────────────────────────
const ALL_SERVICES = { ...SERVICES_DATA_I18N, ...SERVICES_FALLBACK };

// ─── Helper: get service content in current language, fallback to English ─────
function getServiceContent(serviceData, lang) {
  return serviceData[lang] || serviceData["en"];
}

// ─── UI labels (nav / section headers) per language ──────────────────────────
const UI_LABELS = {
  en:  { back: "← Back to Services", apply: "Apply Now", overview: "Overview", benefits: "✅ Key Benefits", eligibility: "👤 Eligibility", documents: "📄 Documents Required", ready: "Ready to get started?", readySub: "Apply now or speak with our financial advisor.", backBtn: "← Back to Services", interest: "Interest From", amount: "Loan Amount", tenure: "Tenure", fee: "Processing Fee", popular: "⭐ Most Popular", regulated: "RBI Regulated" },
  hi:  { back: "← सेवाओं पर वापस", apply: "अभी आवेदन करें", overview: "अवलोकन", benefits: "✅ मुख्य लाभ", eligibility: "👤 पात्रता", documents: "📄 आवश्यक दस्तावेज़", ready: "शुरू करने के लिए तैयार?", readySub: "अभी आवेदन करें या हमारे वित्तीय सलाहकार से बात करें।", backBtn: "← सेवाओं पर वापस", interest: "ब्याज दर", amount: "ऋण राशि", tenure: "कार्यकाल", fee: "प्रसंस्करण शुल्क", popular: "⭐ सबसे लोकप्रिय", regulated: "RBI विनियमित" },
  mr:  { back: "← सेवांकडे परत", apply: "आता अर्ज करा", overview: "आढावा", benefits: "✅ मुख्य फायदे", eligibility: "👤 पात्रता", documents: "📄 आवश्यक कागदपत्रे", ready: "सुरू करण्यास तयार?", readySub: "आता अर्ज करा किंवा आमच्या आर्थिक सल्लागाराशी बोला।", backBtn: "← सेवांकडे परत", interest: "व्याज दर", amount: "कर्ज रक्कम", tenure: "कार्यकाळ", fee: "प्रक्रिया शुल्क", popular: "⭐ सर्वाधिक लोकप्रिय", regulated: "RBI नियंत्रित" },
  gu:  { back: "← સેવાઓ પર પાછા", apply: "હવે અરજી કરો", overview: "ઝાંખી", benefits: "✅ મુખ્ય ફાયદા", eligibility: "👤 પાત્રતા", documents: "📄 જરૂરી દસ્તાવેજો", ready: "શરૂ કરવા તૈયાર?", readySub: "હવે અરજી કરો અથવા અમારા નાણાકીય સલાહકાર સાથે વાત કરો.", backBtn: "← સેવાઓ પર પાછા", interest: "વ્યાજ દર", amount: "લોનની રકમ", tenure: "કાર્યકાળ", fee: "પ્રોસેસિંગ ફી", popular: "⭐ સૌથી લોકપ્રિય", regulated: "RBI નિયંત્રિત" },
  te:  { back: "← సేవలకు తిరిగి వెళ్ళండి", apply: "ఇప్పుడు దరఖాస్తు చేయండి", overview: "అవలోకనం", benefits: "✅ ముఖ్య ప్రయోజనాలు", eligibility: "👤 అర్హత", documents: "📄 అవసరమైన పత్రాలు", ready: "ప్రారంభించడానికి సిద్ధంగా ఉన్నారా?", readySub: "ఇప్పుడు దరఖాస్తు చేయండి లేదా మా ఆర్థిక సలహాదారుతో మాట్లాడండి.", backBtn: "← సేవలకు తిరిగి వెళ్ళండి", interest: "వడ్డీ దర", amount: "రుణ మొత్తం", tenure: "కాలపరిమితి", fee: "ప్రాసెసింగ్ రుసుము", popular: "⭐ అత్యంత ప్రజాదరణ", regulated: "RBI నియంత్రిత" },
  ta:  { back: "← சேவைகளுக்கு திரும்பவும்", apply: "இப்போது விண்ணப்பிக்கவும்", overview: "கண்ணோட்டம்", benefits: "✅ முக்கிய நன்மைகள்", eligibility: "👤 தகுதி", documents: "📄 தேவையான ஆவணங்கள்", ready: "தொடங்க தயாரா?", readySub: "இப்போது விண்ணப்பிக்கவும் அல்லது எங்கள் நிதி ஆலோசகரிடம் பேசுங்கள்.", backBtn: "← சேவைகளுக்கு திரும்பவும்", interest: "வட்டி விகிதம்", amount: "கடன் தொகை", tenure: "காலம்", fee: "செயலாக்க கட்டணம்", popular: "⭐ மிகவும் பிரபலமானது", regulated: "RBI ஒழுங்குபடுத்தப்பட்டது" },
  kn:  { back: "← ಸೇವೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ", apply: "ಈಗ ಅರ್ಜಿ ಹಾಕಿ", overview: "ಅವಲೋಕನ", benefits: "✅ ಮುಖ್ಯ ಪ್ರಯೋಜನಗಳು", eligibility: "👤 ಅರ್ಹತೆ", documents: "📄 ಅಗತ್ಯ ದಾಖಲೆಗಳು", ready: "ಪ್ರಾರಂಭಿಸಲು ಸಿದ್ಧವಾಗಿದ್ದೀರಾ?", readySub: "ಈಗ ಅರ್ಜಿ ಹಾಕಿ ಅಥವಾ ನಮ್ಮ ಹಣಕಾಸು ಸಲಹೆಗಾರರೊಂದಿಗೆ ಮಾತನಾಡಿ.", backBtn: "← ಸೇವೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ", interest: "ಬಡ್ಡಿ ದರ", amount: "ಸಾಲದ ಮೊತ್ತ", tenure: "ಅವಧಿ", fee: "ಪ್ರಕ್ರಿಯಾ ಶುಲ್ಕ", popular: "⭐ ಅತ್ಯಂತ ಜನಪ್ರಿಯ", regulated: "RBI ನಿಯಂತ್ರಿತ" },
  as:  { back: "← সেৱাসমূহলৈ উভতি যাওক", apply: "এতিয়াই আবেদন কৰক", overview: "ৰূপৰেখা", benefits: "✅ মুখ্য সুবিধাসমূহ", eligibility: "👤 যোগ্যতা", documents: "📄 প্ৰয়োজনীয় নথিপত্ৰ", ready: "আৰম্ভ কৰিবলৈ সাজু?", readySub: "এতিয়াই আবেদন কৰক বা আমাৰ বিত্তীয় পৰামৰ্শদাতাৰ সৈতে কথা পাতক।", backBtn: "← সেৱাসমূহলৈ উভতি যাওক", interest: "সুদৰ হাৰ", amount: "ঋণৰ পৰিমাণ", tenure: "মেয়াদ", fee: "প্ৰক্ৰিয়াকৰণ মাচুল", popular: "⭐ সবচেয়ে জনপ্ৰিয়", regulated: "RBI নিয়ন্ত্ৰিত" },
  ur:  { back: "← خدمات پر واپس جائیں", apply: "ابھی درخواست دیں", overview: "جائزہ", benefits: "✅ اہم فوائد", eligibility: "👤 اہلیت", documents: "📄 ضروری دستاویزات", ready: "شروع کرنے کے لیے تیار ہیں؟", readySub: "ابھی درخواست دیں یا ہمارے مالیاتی مشیر سے بات کریں۔", backBtn: "← خدمات پر واپس جائیں", interest: "سود کی شرح", amount: "قرضے کی رقم", tenure: "مدت", fee: "پروسیسنگ فیس", popular: "⭐ سب سے مقبول", regulated: "RBI منظور شدہ" },
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const ArrowRight = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0">
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);
const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);
const DocIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5">
    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
  </svg>
);

const StatCard = ({ label, value, accent }) => (
  <div className={`flex flex-col gap-1 px-4 py-3 rounded-xl border ${accent ? "border-red-200 bg-red-50" : "border-gray-100 bg-gray-50"}`}>
    <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">{label}</span>
    <span className={`text-sm sm:text-base font-black ${accent ? "text-red-700" : "text-gray-800"}`}>{value}</span>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// ─── MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function ServiceDetail() {
  const { serviceId } = useParams();
  const { lang } = useLanguage(); // ← reads language from Navbar's LanguageContext

  const serviceData = ALL_SERVICES[serviceId];
  const ui = UI_LABELS[lang] || UI_LABELS["en"];

  if (!serviceData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <p className="text-6xl">🔍</p>
        <h1 className="text-2xl font-black text-gray-800">Service not found</h1>
        <Link to="/services" className="text-red-600 font-bold hover:underline">← Back to Services</Link>
      </div>
    );
  }

  const content = getServiceContent(serviceData, lang);

  return (
    <div className="w-full bg-white min-h-screen" dir={lang === "ur" ? "rtl" : "ltr"}>
      {/* Back */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 pt-6 pb-2">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-colors group"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          {ui.back}
        </Link>
      </div>

      {/* Hero */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-4">
        <div className="bg-gradient-to-br from-gray-900 via-[#1a1a1a] to-red-950 rounded-3xl px-6 sm:px-10 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-4xl">{serviceData.icon}</span>
                {serviceData.popular && (
                  <span className="px-2.5 py-1 rounded-full bg-yellow-400 text-yellow-900 text-[10px] font-black tracking-wide uppercase">
                    {ui.popular}
                  </span>
                )}
                <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/60 text-[10px] font-bold tracking-wide uppercase border border-white/10">
                  {ui.regulated}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight">
                {content.title}
              </h1>
              <p className="text-white/60 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
                {content.tagline}
              </p>
            </div>
            <Link
              to="/contact"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all active:scale-95 shadow-lg shadow-red-900/30 whitespace-nowrap"
            >
              {ui.apply} <ArrowRight />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-8">
            <StatCard label={ui.interest} value={serviceData.stats.interest} accent />
            <StatCard label={ui.amount}   value={serviceData.stats.amount} />
            <StatCard label={ui.tenure}   value={serviceData.stats.tenure} />
            <StatCard label={ui.fee}      value={serviceData.stats.fee} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-10 py-8 space-y-6">

        {/* Overview */}
        <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-[11px] font-black tracking-widest text-gray-400 uppercase mb-4">{ui.overview}</h2>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4">{content.overview}</p>
          {content.overview_extra && (
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed border-l-4 border-red-200 pl-4 bg-red-50/50 py-3 rounded-r-lg">
              {content.overview_extra}
            </p>
          )}
        </div>

        {/* Benefits + Eligibility/Docs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-black text-gray-800 mb-5">
              {ui.benefits}
            </h2>
            <ul className="space-y-3">
              {content.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700 pb-2.5 border-b border-gray-50 last:border-0 last:pb-0">
                  <CheckIcon /><span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="flex items-center gap-2 text-sm font-black text-gray-800 mb-5">
                {ui.eligibility}
              </h2>
              <ul className="space-y-3">
                {content.eligibility_points.map((e, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-red-400 mt-0.5 flex-shrink-0"><ArrowRight /></span>
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h2 className="flex items-center gap-2 text-sm font-black text-gray-800 mb-5">
                {ui.documents}
              </h2>
              <ul className="space-y-3">
                {content.documents.map((d, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <DocIcon /><span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 rounded-2xl p-6 sm:p-8">
          <div>
            <p className="font-black text-gray-900 text-lg">{ui.ready}</p>
            <p className="text-gray-500 text-sm mt-0.5">{ui.readySub}</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Link
              to="/services"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-200 hover:border-red-300 hover:bg-white text-gray-700 hover:text-red-700 text-sm font-bold transition-all"
            >
              {ui.backBtn}
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-all active:scale-95 shadow-md shadow-red-100"
            >
              {ui.apply} <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}