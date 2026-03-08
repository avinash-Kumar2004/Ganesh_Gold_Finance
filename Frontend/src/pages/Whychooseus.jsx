import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../Common/Navbaar";

// ═══════════════════════════════════════════════════════════════════════════════
// ─── TRANSLATIONS
// ═══════════════════════════════════════════════════════════════════════════════
const T = {
  en: {
    heading: "Why Choose Us?",
    know_more: "Know More",
    tabs: [
      {
        id: "trusted-brand",
title: "One of the Fast-Growing Financial Services Brands in India",
        image: "why/w-1.png",
        desc: "Ganesh Finance has earned deep-rooted trust through honest, transparent, and customer-first financial services since 2019. Recognized as one of the most reliable financial brands in its region, we remain committed to delivering unmatched value — because trust, once built, is never broken.",
      },
      {
        id: "customers",
        title: "Trusted by Thousands of Satisfied Customers*",
        image: "why/w-2.png",
        desc: "Our growing family of thousands of loyal customers across service areas stands as the greatest testament to our service quality. From gold loans to insurance, every interaction at Ganesh Finance is built on warmth, speed, and complete transparency.",
      },
      {
        id: "gold-loan",
title: "Trusted Gold Loan Services in Our Region",
        image: "why/w-3.webp",
        desc: "Since 2019, Ganesh Finance has built the region's most comprehensive gold loan portfolio — offering the highest per-gram value, instant disbursals, zero hidden charges, and flexible repayment plans tailored to every customer's unique financial needs.",
      },
      {
        id: "branches",
        title: "Strong Network of Growing Branches*",
        image: "why/w-4.png",
        desc: "Starting with 2 branches and an unwavering vision, Ganesh Finance is steadily expanding its footprint across the region. Every branch is a promise — premium financial services, delivered closer to your doorstep, with the care and efficiency you deserve.",
      },
      {
        id: "legacy",
        title: "Founded on Family Values & Integrity",
        image: "why/w-5.avif",
        desc: "Ganesh Finance was born from a family legacy of trust, discipline, and selfless service. Every policy, every decision, and every customer interaction is grounded in strong ethical values — ensuring our customers always feel secure, valued, and respected.",
      },
      {
        id: "management",
        title: "Leadership That Speaks for Itself",
        image: "why/w-6.jpg",
        desc: "Our management team brings together decades of collective expertise in finance, customer relations, and operations. Driven by integrity and a passion for innovation, our leaders ensure Ganesh Finance stays ahead of the curve in every market we enter.",
      },
    ],
  },
  hi: {
    heading: "हमें क्यों चुनें?",
    know_more: "और जानें",
    tabs: [
      { id: "trusted-brand", title: "भारत का नं. 1 सबसे विश्वसनीय वित्तीय सेवा ब्रांड*", image: "why/w-1.jpeg", desc: "गणेश फाइनेंस 2019 से ईमानदारी, पारदर्शिता और ग्राहक-प्रथम दृष्टिकोण के साथ सेवा प्रदान कर रहा है। हम अपने क्षेत्र के सबसे भरोसेमंद वित्तीय ब्रांडों में से एक हैं और हर ग्राहक को अद्वितीय मूल्य देने के लिए प्रतिबद्ध हैं।" },
      { id: "customers", title: "हजारों संतुष्ट ग्राहकों का विश्वास*", image: "why/w-2.jpeg", desc: "हमारे वफादार ग्राहकों का बढ़ता परिवार हमारी सेवा गुणवत्ता का सबसे बड़ा प्रमाण है। गोल्ड लोन से लेकर बीमा तक, गणेश फाइनेंस की हर सेवा गर्मजोशी, गति और पूर्ण पारदर्शिता के साथ दी जाती है।" },
      { id: "gold-loan", title: "हमारे क्षेत्र में सबसे बड़ा गोल्ड लोन पोर्टफोलियो*", image: "why/w-3.jpeg", desc: "2019 से हमने क्षेत्र का सबसे व्यापक गोल्ड लोन पोर्टफोलियो तैयार किया है — उच्चतम प्रति-ग्राम मूल्य, त्वरित वितरण, शून्य छुपे शुल्क और हर ग्राहक की जरूरत के अनुसार लचीला पुनर्भुगतान।" },
      { id: "branches", title: "बढ़ती शाखाओं का मजबूत नेटवर्क*", image: "why/w-4.jpeg", desc: "2 शाखाओं से शुरुआत करके गणेश फाइनेंस तेजी से विस्तार कर रहा है। हर शाखा एक वादा है — प्रीमियम वित्तीय सेवाएं आपके दरवाजे तक, उस देखभाल और दक्षता के साथ जिसके आप हकदार हैं।" },
      { id: "legacy", title: "पारिवारिक मूल्यों और ईमानदारी पर आधारित", image: "why/w-5.jpeg", desc: "गणेश फाइनेंस विश्वास, अनुशासन और निस्वार्थ सेवा की पारिवारिक विरासत से जन्मा है। हर नीति और हर निर्णय मजबूत नैतिक मूल्यों पर आधारित है — ताकि हर ग्राहक सुरक्षित और सम्मानित महसूस करे।" },
      { id: "management", title: "खुद बोलती नेतृत्व टीम", image: "why/w-6.jpeg", desc: "हमारी प्रबंधन टीम वित्त, ग्राहक सेवा और संचालन में दशकों का सामूहिक अनुभव रखती है। ईमानदारी और नवाचार की प्रेरणा से, हमारे नेता यह सुनिश्चित करते हैं कि गणेश फाइनेंस हर बाजार में आगे रहे।" },
    ],
  },
  mr: {
    heading: "आम्हाला का निवडा?",
    know_more: "अधिक जाणा",
    tabs: [
      { id: "trusted-brand", title: "भारतातील क्र. 1 विश्वासार्ह वित्तीय सेवा ब्रँड*", image: "why/w-1.jpeg", desc: "गणेश फायनान्स 2019 पासून प्रामाणिकता आणि पारदर्शकतेसह सेवा देत आहे. आमच्या प्रदेशातील सर्वात विश्वासार्ह वित्तीय ब्रँड म्हणून आम्ही प्रत्येक ग्राहकाला अतुलनीय मूल्य देण्यासाठी वचनबद्ध आहोत." },
      { id: "customers", title: "हजारो समाधानी ग्राहकांचा विश्वास*", image: "why/w-2.jpeg", desc: "आमच्या निष्ठावान ग्राहकांचे वाढते कुटुंब आमच्या सेवेचा सर्वात मोठा पुरावा आहे. गोल्ड लोनपासून विम्यापर्यंत, गणेश फायनान्समधील प्रत्येक व्यवहार उबदारपणा, गती आणि पारदर्शकतेवर आधारित आहे." },
      { id: "gold-loan", title: "आमच्या प्रदेशातील सर्वात मोठा गोल्ड लोन पोर्टफोलियो*", image: "why/w-3.jpeg", desc: "2019 पासून, गणेश फायनान्सने प्रदेशातील सर्वात सर्वसमावेशक गोल्ड लोन पोर्टफोलियो तयार केला आहे — सर्वोच्च प्रति-ग्राम मूल्य, त्वरित वितरण आणि शून्य छुपे शुल्क." },
      { id: "branches", title: "वाढत्या शाखांचे मजबूत नेटवर्क*", image: "why/w-4.jpeg", desc: "2 शाखांपासून सुरुवात करून, गणेश फायनान्स प्रत्येक दाराशी उत्कृष्ट सेवा आणण्यासाठी वेगाने विस्तारत आहे. प्रत्येक शाखा एक वचन आहे — तुमच्या जवळ, तुमच्यासाठी." },
      { id: "legacy", title: "कौटुंबिक मूल्ये आणि सचोटीवर आधारित", image: "why/w-5.jpeg", desc: "गणेश फायनान्स विश्वास, शिस्त आणि निस्वार्थ सेवेच्या कौटुंबिक वारशातून जन्माला आला आहे. प्रत्येक निर्णय नैतिक मूल्यांवर आधारित आहे." },
      { id: "management", title: "स्वतःच बोलणारे नेतृत्व", image: "why/w-6.jpeg", desc: "आमची व्यवस्थापन टीम वित्त आणि ग्राहक सेवेतील दशकांचा सामूहिक अनुभव एकत्र आणते. ईमानदारी आणि नवोपक्रमाने प्रेरित, आमचे नेतृत्व प्रत्येक बाजारात आघाडीवर राहते." },
    ],
  },
  gu: {
    heading: "અમને શા માટે પસંદ કરો?",
    know_more: "વધુ જાણો",
    tabs: [
      { id: "trusted-brand", title: "ભારતનો નં. 1 સૌથી વિશ્વસનીય નાણાકીય સેવા બ્રાન્ડ*", image: "why/w-1.jpeg", desc: "ગણેશ ફાઇનાન્સ 2019 થી પ્રામાણિક, પારદર્શક અને ગ્રાહક-કેન્દ્રિત નાણાકીય સેવાઓ દ્વારા વિશ્વાસ કમાઈ રહ્યો છે. અમે દરેક ગ્રાહકને અજોડ મૂલ્ય આપવા પ્રતિબદ્ધ છીએ." },
      { id: "customers", title: "હજારો સંતુષ્ટ ગ્રાહકોનો વિશ્વાસ*", image: "why/w-2.jpeg", desc: "અમારા વફાદાર ગ્રાહકોનો વધતો પરિવાર અમારી સેવા ગુણવત્તાનો સૌથી મોટો પુરાવો છે. ગોલ્ડ લોનથી વીમા સુધી, દરેક સેવા ઉષ્મા, ઝડપ અને સ્પષ્ટતા સાથે આપવામાં આવે છે." },
      { id: "gold-loan", title: "અમારા ક્ષેત્રમાં સૌથી મોટો ગોલ્ડ લોન પોર્ટફોલિઓ*", image: "why/w-3.jpeg", desc: "2019 થી, ગણેશ ફાઇનાન્સે ક્ષેત્રનો સૌથી વ્યાપક ગોલ્ડ લોન પોર્ટફોલિઓ બનાવ્યો છે — સૌથી વધુ પ્રતિ-ગ્રામ મૂલ્ય, ત્વરિત ચૂકવણી અને શૂન્ય છુપા શુલ્ક." },
      { id: "branches", title: "વધતી શાખાઓનું મજબૂત નેટવર્ક*", image: "why/w-4.jpeg", desc: "2 શાખાઓથી શરૂ કરીને, ગણેશ ફાઇનાન્સ દરેક ઘર સુધી પ્રીમિયમ સેવાઓ પહોંચાડવા ઝડપથી વિસ્તારી રહ્યો છે. દરેક શાખા એક વચન છે — તમારી નજીક, તમારા માટે." },
      { id: "legacy", title: "પારિવારિક મૂલ્યો અને પ્રામાણિકતા પર સ્થાપિત", image: "why/w-5.jpeg", desc: "ગણેશ ફાઇનાન્સ વિશ્વાસ, શિસ્ત અને નિઃસ્વાર્થ સેવાની પારિવારિક વિરાસતમાંથી જન્મ્યો છે. દરેક નિર્ણય મજબૂત નૈતિક મૂલ્યો પર આધારિત છે." },
      { id: "management", title: "પોતે જ બોલતું નેતૃત્વ", image: "why/w-6.jpeg", desc: "અમારી ટીમ નાણાં, ગ્રાહક સેવા અને સંચાલનમાં દાયકાઓનો સામૂહિક અનુભવ ધરાવે છે. ઈમાનદારી અને નવીનતા સાથે, અમારા નેતૃત્વ દરેક બજારમાં આગળ રહે છે." },
    ],
  },
  te: {
    heading: "మాన్నెందుకు ఎంచుకోవాలి?",
    know_more: "మరింత తెలుసుకోండి",
    tabs: [
      { id: "trusted-brand", title: "భారతదేశంలో అత్యంత విశ్వసనీయ ఆర్థిక సేవా బ్రాండ్*", image: "why/w-1.jpeg", desc: "గణేష్ ఫైనాన్స్ 2019 నుండి నిజాయితీగా, పారదర్శకంగా సేవలు అందిస్తూ వినియోగదారుల నమ్మకాన్ని సంపాదిస్తోంది. ప్రతి కస్టమర్‌కు అత్యుత్తమ విలువ అందించడమే మా లక్ష్యం." },
      { id: "customers", title: "వేలాది మంది సంతృప్తి చెందిన కస్టమర్ల నమ్మకం*", image: "why/w-2.jpeg", desc: "మా విశ్వసనీయ కస్టమర్ల పెరుగుతున్న కుటుంబం మా సేవా నాణ్యతకు అత్యుత్తమ నిదర్శనం. గోల్డ్ లోన్ నుండి బీమా వరకు, ప్రతి సేవ వేగంగా మరియు పారదర్శకంగా అందించబడుతుంది." },
      { id: "gold-loan", title: "మా ప్రాంతంలో అతిపెద్ద గోల్డ్ లోన్ పోర్ట్‌ఫోలియో*", image: "why/w-3.jpeg", desc: "2019 నుండి, మేము ప్రాంతంలో అత్యంత సమగ్రమైన గోల్డ్ లోన్ పోర్ట్‌ఫోలియోను నిర్మించాము — అత్యధిక గ్రామ్ విలువ, తక్షణ వితరణ మరియు శూన్య దాచిన రుసుములు." },
      { id: "branches", title: "పెరుగుతున్న శాఖల బలమైన నెట్‌వర్క్*", image: "why/w-4.jpeg", desc: "2 శాఖలతో ప్రారంభించి, ప్రతి ఇంటికీ ప్రీమియం సేవలు చేరవేయడానికి మేము వేగంగా విస్తరిస్తున్నాం. ప్రతి శాఖ ఒక వాగ్దానం — మీకు దగ్గరగా, మీ కోసం." },
      { id: "legacy", title: "కుటుంబ విలువలు మరియు నిజాయితీపై స్థాపించబడింది", image: "why/w-5.jpeg", desc: "గణేష్ ఫైనాన్స్ నమ్మకం, క్రమశిక్షణ మరియు నిస్వార్థ సేవ యొక్క కుటుంబ వారసత్వం నుండి పుట్టింది. ప్రతి నిర్ణయం బలమైన నైతిక విలువలపై ఆధారపడి ఉంటుంది." },
      { id: "management", title: "స్వయంగా మాట్లాడే నాయకత్వం", image: "why/w-6.jpeg", desc: "మా నిర్వహణ బృందం ఆర్థిక, కస్టమర్ సేవ మరియు కార్యకలాపాలలో దశాబ్దాల అనుభవాన్ని మిళితం చేస్తుంది. నిజాయితీ మరియు ఆవిష్కరణతో, మా నాయకత్వం ప్రతి మార్కెట్‌లో ముందుంటుంది." },
    ],
  },
  ta: {
    heading: "எங்களை ஏன் தேர்வு செய்ய வேண்டும்?",
    know_more: "மேலும் அறிக",
    tabs: [
      { id: "trusted-brand", title: "இந்தியாவின் மிகவும் நம்பகமான நிதி சேவை பிராண்ட்*", image: "why/w-1.jpeg", desc: "கணேஷ் ஃபைனான்ஸ் 2019 முதல் நேர்மையான, வெளிப்படையான சேவைகளால் வாடிக்கையாளர்களின் நம்பிக்கையை பெற்றுள்ளது. ஒவ்வொரு வாடிக்கையாளருக்கும் சிறந்த மதிப்பை வழங்குவதே எங்கள் இலக்கு." },
      { id: "customers", title: "ஆயிரக்கணக்கான திருப்தியான வாடிக்கையாளர்களின் நம்பிக்கை*", image: "why/w-2.jpeg", desc: "எங்கள் விசுவாசமான வாடிக்கையாளர்களின் வளரும் குடும்பம் எங்கள் சேவை தரத்திற்கு சிறந்த சான்று. தங்கக் கடனில் இருந்து காப்பீடு வரை, ஒவ்வொரு சேவையும் வேகமாகவும் வெளிப்படையாகவும் வழங்கப்படுகிறது." },
      { id: "gold-loan", title: "எங்கள் பிராந்தியத்தில் மிகப்பெரிய தங்க கடன் போர்ட்ஃபோலியோ*", image: "why/w-3.jpeg", desc: "2019 முதல், மிக விரிவான தங்க கடன் போர்ட்ஃபோலியோவை உருவாக்கியுள்ளோம் — அதிக கிராம் மதிப்பு, உடனடி வழங்கல் மற்றும் மறைக்கப்பட்ட கட்டணங்கள் இல்லை." },
      { id: "branches", title: "வளர்ந்து வரும் கிளைகளின் வலுவான நெட்வொர்க்*", image: "why/w-4.jpeg", desc: "2 கிளைகளில் தொடங்கி, ஒவ்வொரு வீட்டிற்கும் சேவைகளை வழங்க நாங்கள் விரைவாக விரிவடைகிறோம். ஒவ்வொரு கிளையும் ஒரு வாக்குறுதி — உங்களுக்கு அருகில், உங்களுக்காக." },
      { id: "legacy", title: "குடும்ப மதிப்புகள் மற்றும் நேர்மையின் அடிப்படையில் நிறுவப்பட்டது", image: "why/w-5.jpeg", desc: "கணேஷ் ஃபைனான்ஸ் நம்பிக்கை, ஒழுக்கம் மற்றும் தன்னலமற்ற சேவையின் குடும்ப மரபிலிருந்து பிறந்தது. ஒவ்வொரு முடிவும் வலுவான நெறிமுறை மதிப்புகளில் வேரூன்றியுள்ளது." },
      { id: "management", title: "தாமாகவே பேசும் தலைமை", image: "why/w-6.jpeg", desc: "எங்கள் குழு நிதி, வாடிக்கையாளர் சேவை மற்றும் செயல்பாடுகளில் பல தசாப்த அனுபவத்தை ஒன்றிணைக்கிறது. நேர்மை மற்றும் புதுமையுடன், எங்கள் தலைமை ஒவ்வொரு சந்தையிலும் முன்னணியில் இருக்கிறது." },
    ],
  },
  kn: {
    heading: "ನಮ್ಮನ್ನು ಏಕೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು?",
    know_more: "ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",
    tabs: [
      { id: "trusted-brand", title: "ಭಾರತದ ಅತ್ಯಂತ ವಿಶ್ವಾಸಾರ್ಹ ಹಣಕಾಸು ಸೇವಾ ಬ್ರ್ಯಾಂಡ್*", image: "why/w-1.jpeg", desc: "ಗಣೇಶ್ ಫೈನಾನ್ಸ್ 2019 ರಿಂದ ಪ್ರಾಮಾಣಿಕ ಮತ್ತು ಪಾರದರ್ಶಕ ಸೇವೆಗಳ ಮೂಲಕ ಗ್ರಾಹಕರ ನಂಬಿಕೆ ಗಳಿಸಿದೆ. ಪ್ರತಿ ಗ್ರಾಹಕರಿಗೆ ಅತ್ಯುತ್ತಮ ಮೌಲ್ಯ ನೀಡಲು ನಾವು ಬದ್ಧರಾಗಿದ್ದೇವೆ." },
      { id: "customers", title: "ಸಾವಿರಾರು ತೃಪ್ತ ಗ್ರಾಹಕರ ನಂಬಿಕೆ*", image: "why/w-2.jpeg", desc: "ನಮ್ಮ ನಿಷ್ಠಾವಂತ ಗ್ರಾಹಕರ ಬೆಳೆಯುತ್ತಿರುವ ಕುಟುಂಬ ನಮ್ಮ ಸೇವಾ ಗುಣಮಟ್ಟಕ್ಕೆ ಅತ್ಯುತ್ತಮ ಪ್ರಮಾಣ. ಗೋಲ್ಡ್ ಲೋನ್‌ನಿಂದ ವಿಮೆಯವರೆಗೆ, ಪ್ರತಿ ಸೇವೆ ವೇಗ ಮತ್ತು ಪಾರದರ್ಶಕತೆಯಿಂದ ನೀಡಲಾಗುತ್ತದೆ." },
      { id: "gold-loan", title: "ನಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಅತಿದೊಡ್ಡ ಗೋಲ್ಡ್ ಲೋನ್ ಪೋರ್ಟ್‌ಫೋಲಿಯೊ*", image: "why/w-3.jpeg", desc: "2019 ರಿಂದ, ಅತ್ಯಂತ ಸಮಗ್ರ ಗೋಲ್ಡ್ ಲೋನ್ ಪೋರ್ಟ್‌ಫೋಲಿಯೊ ನಿರ್ಮಿಸಿದ್ದೇವೆ — ಗರಿಷ್ಠ ಗ್ರಾಂ ಮೌಲ್ಯ, ತ್ವರಿತ ವಿತರಣೆ ಮತ್ತು ಶೂನ್ಯ ಅಡಗಿದ ಶುಲ್ಕ." },
      { id: "branches", title: "ಬೆಳೆಯುತ್ತಿರುವ ಶಾಖೆಗಳ ಬಲವಾದ ನೆಟ್‌ವರ್ಕ್*", image: "why/w-4.jpeg", desc: "2 ಶಾಖೆಗಳಿಂದ ಪ್ರಾರಂಭಿಸಿ, ಪ್ರತಿ ಮನೆ ಬಾಗಿಲಿಗೆ ಸೇವೆ ತಲುಪಿಸಲು ವೇಗವಾಗಿ ವಿಸ್ತರಿಸುತ್ತಿದ್ದೇವೆ. ಪ್ರತಿ ಶಾಖೆ ಒಂದು ವಾಗ್ದಾನ — ನಿಮ್ಮ ಹತ್ತಿರ, ನಿಮಗಾಗಿ." },
      { id: "legacy", title: "ಕೌಟುಂಬಿಕ ಮೌಲ್ಯಗಳು ಮತ್ತು ಸಮಗ್ರತೆಯ ಮೇಲೆ ಸ್ಥಾಪಿಸಲಾಗಿದೆ", image: "why/w-5.jpeg", desc: "ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ನಂಬಿಕೆ, ಶಿಸ್ತು ಮತ್ತು ನಿಸ್ವಾರ್ಥ ಸೇವೆಯ ಕೌಟುಂಬಿಕ ಪರಂಪರೆಯಿಂದ ಹುಟ್ಟಿದೆ. ಪ್ರತಿ ನಿರ್ಧಾರ ನೈತಿಕ ಮೌಲ್ಯಗಳ ಮೇಲೆ ಆಧರಿಸಿದೆ." },
      { id: "management", title: "ತಾನಾಗಿಯೇ ಮಾತನಾಡುವ ನಾಯಕತ್ವ", image: "why/w-6.jpeg", desc: "ನಮ್ಮ ತಂಡ ಹಣಕಾಸು ಮತ್ತು ಗ್ರಾಹಕ ಸೇವೆಯಲ್ಲಿ ದಶಕಗಳ ಸಾಮೂಹಿಕ ಅನುಭವ ಹೊಂದಿದೆ. ಪ್ರಾಮಾಣಿಕತೆ ಮತ್ತು ನಾವೀನ್ಯತೆಯಿಂದ, ನಮ್ಮ ನಾಯಕತ್ವ ಪ್ರತಿ ಮಾರುಕಟ್ಟೆಯಲ್ಲೂ ಮುಂದಿರುತ್ತದೆ." },
    ],
  },
  as: {
    heading: "আমাক কিয় বাছি লব?",
    know_more: "অধিক জানক",
    tabs: [
      { id: "trusted-brand", title: "ভাৰতৰ সর্বাধিক বিশ্বাসযোগ্য বিত্তীয় সেৱা ব্রেণ্ড*", image: "why/w-1.jpeg", desc: "গণেশ ফাইনেন্স ২০১৯ চনৰ পৰা সৎ আৰু স্বচ্ছ সেৱাৰে গ্ৰাহকৰ বিশ্বাস অর্জন কৰি আহিছে। প্রতিটো গ্রাহকক অতুলনীয় মূল্য প্রদান কৰাই আমাৰ লক্ষ্য।" },
      { id: "customers", title: "হাজাৰ হাজাৰ সন্তুষ্ট গ্ৰাহকৰ বিশ্বাস*", image: "why/w-2.jpeg", desc: "আমাৰ বিশ্বস্ত গ্ৰাহকৰ বৃদ্ধি পোৱা পৰিয়াল আমাৰ সেৱাৰ মানৰ সর্বোত্তম প্রমাণ। গোল্ড লোনৰ পৰা বীমালৈ, প্রতিটো সেৱা দ্ৰুত আৰু স্বচ্ছতাৰে দিয়া হয়।" },
      { id: "gold-loan", title: "আমাৰ অঞ্চলত সৰ্ববৃহৎ গোল্ড লোন পোর্টফোলিও*", image: "why/w-3.jpeg", desc: "২০১৯ চনৰ পৰা, আমি অঞ্চলৰ সর্বাধিক ব্যাপক গোল্ড লোন পোর্টফোলিও তৈয়াৰ কৰিছো — সর্বোচ্চ প্রতি-গ্ৰাম মূল্য, তাৎক্ষণিক বিতৰণ আৰু শূন্য লুকোৱা মাচুল।" },
      { id: "branches", title: "বৃদ্ধি পোৱা শাখাৰ শক্তিশালী নেটৱর্ক*", image: "why/w-4.jpeg", desc: "২ টা শাখাৰ পৰা আৰম্ভ কৰি, প্ৰতিটো ঘৰলৈ সেৱা আনিবলৈ দ্ৰুতগতিত সম্প্ৰসাৰিত হৈছো। প্রতিটো শাখা এটা প্রতিশ্রুতি — আপোনাৰ ওচৰত, আপোনাৰ বাবে।" },
      { id: "legacy", title: "পাৰিবাৰিক মূল্যবোধ আৰু সততাৰ ওপৰত প্ৰতিষ্ঠিত", image: "why/w-5.jpeg", desc: "গণেশ ফাইনেন্স বিশ্বাস, শৃংখলা আৰু নিঃস্বাৰ্থ সেৱাৰ পাৰিবাৰিক উত্তৰাধিকাৰৰ পৰা জন্ম লৈছে। প্রতিটো সিদ্ধান্ত নৈতিক মূল্যবোধৰ ওপৰত আধাৰিত।" },
      { id: "management", title: "নিজেই কথা কোৱা নেতৃত্ব", image: "why/w-6.jpeg", desc: "আমাৰ দলে বিত্ত, গ্ৰাহক সেৱা আৰু কাৰ্যক্ৰমত দশকৰ সামগ্ৰিক অভিজ্ঞতা একত্ৰিত কৰে। সততা আৰু উদ্ভাৱনেৰে পৰিচালিত, আমাৰ নেতৃত্ব প্রতিটো বাজাৰত আগতে থাকে।" },
    ],
  },
  ur: {
    heading: "ہمیں کیوں چنیں؟",
    know_more: "مزید جانیں",
    tabs: [
      { id: "trusted-brand", title: "ہندوستان کا سب سے قابل اعتماد مالیاتی خدمات برانڈ*", image: "why/w-1.jpeg", desc: "گنیش فائنانس 2019 سے ایمانداری اور شفافیت کے ساتھ گاہکوں کا اعتماد جیت رہا ہے۔ ہم ہر گاہک کو بے مثال قدر فراہم کرنے کے لیے پرعزم ہیں۔" },
      { id: "customers", title: "ہزاروں مطمئن گاہکوں کا اعتماد*", image: "why/w-2.jpeg", desc: "ہمارے وفادار گاہکوں کا بڑھتا ہوا خاندان ہماری سروس کوالٹی کا سب سے بڑا ثبوت ہے۔ گولڈ لون سے بیمہ تک، ہر سروس تیزی اور شفافیت کے ساتھ دی جاتی ہے۔" },
      { id: "gold-loan", title: "ہمارے خطے میں سب سے بڑا گولڈ لون پورٹ فولیو*", image: "why/w-3.jpeg", desc: "2019 سے، ہم نے خطے کا سب سے جامع گولڈ لون پورٹ فولیو بنایا ہے — زیادہ سے زیادہ فی گرام قیمت، فوری ادائیگی اور صفر چھپی فیس۔" },
      { id: "branches", title: "بڑھتی شاخوں کا مضبوط نیٹ ورک*", image: "why/w-4.jpeg", desc: "2 شاخوں سے شروع کرکے، ہم ہر دروازے تک پریمیم خدمات پہنچانے کے لیے تیزی سے پھیل رہے ہیں۔ ہر شاخ ایک وعدہ ہے — آپ کے قریب، آپ کے لیے۔" },
      { id: "legacy", title: "خاندانی اقدار اور دیانتداری پر قائم", image: "why/w-5.jpeg", desc: "گنیش فائنانس اعتماد، نظم و ضبط اور بے لوث خدمت کی خاندانی وراثت سے جنم لیا ہے۔ ہر فیصلہ مضبوط اخلاقی اقدار پر مبنی ہے۔" },
      { id: "management", title: "خود بولتی قیادت", image: "why/w-6.jpeg", desc: "ہماری ٹیم مالیات، گاہکوں کی خدمت اور آپریشنز میں دہائیوں کا اجتماعی تجربہ ایک ساتھ لاتی ہے۔ ایمانداری اور اختراع سے چلتے ہوئے، ہماری قیادت ہر بازار میں آگے رہتی ہے۔" },
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// ─── useInView — re-triggers every time section re-enters viewport
// ═══════════════════════════════════════════════════════════════════════════════
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, inView];
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function WhyChooseUs() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const data     = T[lang] ?? T.en;
  const isRTL    = lang === "ur";

  const [activeIdx, setActiveIdx] = useState(0);
  const [slideDir, setSlideDir]   = useState("right");
  const [animKey, setAnimKey]     = useState(0);
  const [imgErr, setImgErr]       = useState(false);

  const [sectionRef, sectionInView] = useInView(0.12);

  // Reset on language change
  useEffect(() => {
    setActiveIdx(0);
    setAnimKey(k => k + 1);
    setImgErr(false);
  }, [lang]);

  const goTo = useCallback((idx) => {
    if (idx === activeIdx) return;
    setSlideDir(idx > activeIdx ? "right" : "left");
    setAnimKey(k => k + 1);
    setActiveIdx(idx);
    setImgErr(false);
  }, [activeIdx]);

  const active = data.tabs[activeIdx];

  // Animation class based on inView
  const headCls   = sectionInView ? "wcu-head-in"    : "wcu-hidden";
  const tabsCls   = sectionInView ? "wcu-tabs-in"    : "wcu-hidden";
  const mobileCls = sectionInView ? "wcu-mobile-in"  : "wcu-hidden";

  // Content animation — image from left, text from right (or flipped for RTL)
  const imgAnimCls  = sectionInView
    ? (slideDir === "right" ? "wcu-img-from-left"  : "wcu-img-from-right")
    : "wcu-hidden";
  const txtAnimCls  = sectionInView
    ? (slideDir === "right" ? "wcu-txt-from-right" : "wcu-txt-from-left")
    : "wcu-hidden";

  return (
    <>
      <style>{`
        /* ── Hidden state ── */
        .wcu-hidden { opacity: 0; }

        /* ── Heading drops from top ── */
        @keyframes wcuHeadIn {
          from { opacity: 0; transform: translateY(-22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .wcu-head-in { animation: wcuHeadIn 0.5s cubic-bezier(0.34,1.2,0.64,1) both; }

        /* ── Tab strip fades up ── */
        @keyframes wcuTabsIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .wcu-tabs-in { animation: wcuTabsIn 0.5s cubic-bezier(0.25,0.46,0.45,0.94) 0.12s both; }

        /* ── Image slides in from LEFT ── */
        @keyframes wcuImgLeft {
          from { opacity: 0; transform: translateX(-52px) scale(0.97); }
          to   { opacity: 1; transform: translateX(0)     scale(1); }
        }
        .wcu-img-from-left { animation: wcuImgLeft 0.48s cubic-bezier(0.34,1.1,0.64,1) 0.08s both; }

        /* ── Image slides in from RIGHT ── */
        @keyframes wcuImgRight {
          from { opacity: 0; transform: translateX(52px) scale(0.97); }
          to   { opacity: 1; transform: translateX(0)    scale(1); }
        }
        .wcu-img-from-right { animation: wcuImgRight 0.48s cubic-bezier(0.34,1.1,0.64,1) 0.08s both; }

        /* ── Text slides in from RIGHT ── */
        @keyframes wcuTxtRight {
          from { opacity: 0; transform: translateX(44px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .wcu-txt-from-right { animation: wcuTxtRight 0.48s cubic-bezier(0.34,1.1,0.64,1) 0.16s both; }

        /* ── Text slides in from LEFT ── */
        @keyframes wcuTxtLeft {
          from { opacity: 0; transform: translateX(-44px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .wcu-txt-from-left { animation: wcuTxtLeft 0.48s cubic-bezier(0.34,1.1,0.64,1) 0.16s both; }

        /* ── Underline grows ── */
        @keyframes wcuLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .wcu-line { animation: wcuLine 0.55s cubic-bezier(0.25,0.46,0.45,0.94) 0.2s both; }

        /* ── Mobile accordion ── */
        @keyframes wcuMobileIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .wcu-mobile-in { animation: wcuMobileIn 0.5s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s both; }

        /* ── Smooth cursor for the whole section ── */
        .wcu-section * { cursor: default; }
        .wcu-section button { cursor: pointer; }
        .wcu-section a      { cursor: pointer; }

        /* ── Know More button hover ── */
        .wcu-btn {
          transition: transform 0.22s cubic-bezier(.34,1.56,.64,1),
                      box-shadow 0.22s ease,
                      background 0.18s ease;
        }
        .wcu-btn:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 10px 28px rgba(185,28,28,0.38) !important;
        }
        .wcu-btn:active { transform: scale(0.97); }

        /* ── Tab dot pulse on active ── */
        @keyframes wcuPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(185,28,28,0.35); }
          50%      { box-shadow: 0 0 0 6px rgba(185,28,28,0); }
        }
        .wcu-dot-active { animation: wcuPulse 1.8s ease infinite; }
      `}</style>

      <section
        ref={sectionRef}
        dir={isRTL ? "rtl" : "ltr"}
        className="wcu-section w-full bg-white py-8 md:py-12 overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">

          {/* ── Heading ── */}
          <div className={`text-center mb-6 md:mb-8 ${headCls}`}>
            <h2
              className="font-extrabold text-gray-900 tracking-tight"
              style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)" }}
            >
              {data.heading}
            </h2>
            <div className="flex justify-center mt-2">
              <div
                className={sectionInView ? "wcu-line" : "wcu-hidden"}
                style={{
                  height: 3,
                  width: 52,
                  borderRadius: 99,
                  background: "linear-gradient(90deg,#B91C1C,#D4A017)",
                  transformOrigin: isRTL ? "right" : "left",
                }}
              />
            </div>
          </div>
          <div
            className={`hidden md:flex items-start gap-0 border-b border-gray-100 mb-6 relative ${tabsCls}`}
          >
            {/* Full-width connector line behind dots */}
            <div style={{
              position: "absolute", top: 7, left: "calc(100% / 12)",
              right: "calc(100% / 12)", height: 1, background: "#e5e7eb", zIndex: 0,
            }} />

            {data.tabs.map((tab, i) => {
              const isActive = i === activeIdx;
              return (
                <button
                  key={tab.id}
                  onClick={() => goTo(i)}
                  className="relative flex-1 flex flex-col items-center pb-4 pt-0 outline-none group"
                  style={{ minWidth: 0, zIndex: 1 }}
                >
                  {/* Dot */}
                  <div
                    className={isActive ? "wcu-dot-active" : ""}
                    style={{
                      width: isActive ? 15 : 10,
                      height: isActive ? 15 : 10,
                      borderRadius: "50%",
                      background: isActive ? "#B91C1C" : "#d1d5db",
                      border: isActive ? "3px solid #fecaca" : "2px solid #e5e7eb",
                      transition: "all 0.28s cubic-bezier(.34,1.56,.64,1)",
                      marginBottom: 10,
                      flexShrink: 0,
                    }}
                  />
                  {/* Label */}
                  <span
                    className="block text-center font-semibold leading-snug px-1"
                    style={{
                      fontSize: "0.7rem",
                      color: isActive ? "#B91C1C" : "#6b7280",
                      transition: "color 0.2s ease",
                      letterSpacing: "0.005em",
                    }}
                  >
                    {tab.title}
                  </span>
                  {/* Active underline */}
                  <div style={{
                    position: "absolute", bottom: 0, left: "10%", right: "10%",
                    height: 2, borderRadius: 99,
                    background: "linear-gradient(90deg,#B91C1C,#D4A017)",
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? "scaleX(1)" : "scaleX(0)",
                    transition: "all 0.3s cubic-bezier(.34,1.56,.64,1)",
                  }} />
                </button>
              );
            })}
          </div>

          {/* ── Content Panel — image LEFT, text RIGHT ── */}
          <div className="hidden md:flex items-center gap-8 lg:gap-14">

            {/* Image — always from LEFT */}
            <div
              key={`img-${lang}-${animKey}`}
              className={`flex-shrink-0 ${imgAnimCls}`}
              style={{ width: "40%" }}
            >
              <div style={{
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: "0 10px 40px rgba(0,0,0,0.11), 0 2px 6px rgba(0,0,0,0.06)",
                border: "1px solid #f0f0f0",
                aspectRatio: "4/3",
                background: "#f7f7f7",
                position: "relative",
              }}>
                {/* Decorative tint block */}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(135deg,rgba(185,28,28,0.04),rgba(212,160,23,0.04))",
                  zIndex: 1, borderRadius: 18,
                }} />
                {!imgErr ? (
                  <img
                    src={`/${active.image}`}
                    alt={active.title}
                    onError={() => setImgErr(true)}
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "cover", borderRadius: 18,
                      position: "relative", zIndex: 0,
                      transition: "transform 0.6s ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                  />
                ) : (
                  <div style={{
                    width:"100%", height:"100%", display:"flex",
                    alignItems:"center", justifyContent:"center",
                    background:"linear-gradient(135deg,#fff7ed,#fef3c7)",
                    fontSize: 60, borderRadius: 18,
                  }}>🏛️</div>
                )}
              </div>
            </div>

            {/* Text — always from RIGHT */}
            <div
              key={`txt-${lang}-${animKey}`}
              className={`flex-1 flex flex-col ${txtAnimCls}`}
              style={{ gap: 14 }}
            >
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "linear-gradient(135deg,#fff1f1,#fffbeb)",
                border: "1px solid rgba(185,28,28,0.12)",
                borderRadius: 8, padding: "4px 12px",
                alignSelf: "flex-start",
              }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#B91C1C", flexShrink: 0 }} />
                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#B91C1C", letterSpacing: "0.07em", textTransform: "uppercase" }}>
                  Ganesh Finance
                </span>
              </div>

              <h3
                className="font-bold text-gray-800 leading-snug"
                style={{ fontSize: "clamp(0.95rem, 1.6vw, 1.2rem)", margin: 0 }}
              >
                {active.title}
              </h3>

              <p
                className="text-gray-500 leading-relaxed"
                style={{ fontSize: "0.875rem", margin: 0, lineHeight: 1.75 }}
              >
                {active.desc}
              </p>

              {/* Stats row */}
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                {[
                  { num: "2019", label: lang === "hi" ? "स्थापित" : lang === "mr" ? "स्थापित" : "Founded" },
                  { num: "2+",   label: lang === "hi" ? "शाखाएं"  : lang === "mr" ? "शाखा"    : "Branches" },
                  { num: "★★★★★", label: lang === "hi" ? "सेवा"   : lang === "mr" ? "सेवा"    : "Service" },
                ].map(stat => (
                  <div key={stat.num} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: "1rem", fontWeight: 800, color: "#B91C1C", letterSpacing: "-0.01em" }}>
                      {stat.num}
                    </span>
                    <span style={{ fontSize: "0.62rem", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate("/about")}
                className="wcu-btn self-start font-bold uppercase text-white rounded-full"
                style={{
                  background: "linear-gradient(135deg,#B91C1C,#991B1B)",
                  boxShadow: "0 4px 16px rgba(185,28,28,0.28)",
                  letterSpacing: "0.1em",
                  fontSize: "0.72rem",
                  padding: "10px 24px",
                  border: "none", outline: "none",
                }}
              >
                {data.know_more}
              </button>
            </div>
          </div>

          {/* ══════════════════════════════════════════════
              MOBILE — accordion
          ══════════════════════════════════════════════ */}
          <div className={`md:hidden flex flex-col gap-2.5 ${mobileCls}`}>
            {data.tabs.map((tab, i) => {
              const isActive = i === activeIdx;
              return (
                <div
                  key={tab.id}
                  style={{
                    borderRadius: 14,
                    border: isActive ? "1.5px solid rgba(185,28,28,0.22)" : "1.5px solid #efefef",
                    background: isActive ? "#fff" : "#fafafa",
                    boxShadow: isActive ? "0 4px 18px rgba(185,28,28,0.08)" : "none",
                    overflow: "hidden",
                    transition: "border-color 0.22s, box-shadow 0.22s, background 0.2s",
                  }}
                >
                  {/* Row */}
                  <button
                    onClick={() => goTo(i)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left outline-none"
                  >
                    <div style={{
                      width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                      background: isActive ? "#B91C1C" : "#e5e7eb",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background 0.22s",
                    }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                        stroke={isActive ? "white" : "#9ca3af"} strokeWidth="3"
                        strokeLinecap="round" strokeLinejoin="round">
                        {isActive
                          ? <><line x1="5" y1="12" x2="19" y2="12"/><line x1="12" y1="5" x2="19" y2="12"/><line x1="12" y1="19" x2="19" y2="12"/></>
                          : <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>
                        }
                      </svg>
                    </div>
                    <span style={{
                      fontSize: "0.8rem", fontWeight: 700, flex: 1, lineHeight: 1.35,
                      color: isActive ? "#B91C1C" : "#374151",
                      transition: "color 0.18s",
                    }}>
                      {tab.title}
                    </span>
                  </button>

                  {/* Expanded content */}
                  {isActive && (
                    <div
                      key={`m-${lang}-${animKey}`}
                      className="wcu-txt-from-right px-4 pb-4 flex flex-col gap-3"
                    >
                      <div style={{ borderRadius: 10, overflow: "hidden", aspectRatio: "16/9" }}>
                        {!imgErr ? (
                          <img
                            src={`/${tab.image}`}
                            alt={tab.title}
                            onError={() => setImgErr(true)}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <div style={{
                            width:"100%", height:"100%", display:"flex",
                            alignItems:"center", justifyContent:"center",
                            background:"linear-gradient(135deg,#fff7ed,#fef3c7)", fontSize:36,
                          }}>🏛️</div>
                        )}
                      </div>
                      <p style={{ fontSize: "0.82rem", color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
                        {tab.desc}
                      </p>
                      <button
                        onClick={() => navigate("/about")}
                        className="wcu-btn self-start text-white font-bold uppercase rounded-full"
                        style={{
                          background: "linear-gradient(135deg,#B91C1C,#991B1B)",
                          boxShadow: "0 3px 12px rgba(185,28,28,0.25)",
                          letterSpacing: "0.08em",
                          fontSize: "0.68rem",
                          padding: "9px 20px",
                          border: "none", outline: "none",
                        }}
                      >
                        {data.know_more}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}