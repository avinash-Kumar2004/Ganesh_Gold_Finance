import { useEffect, useRef } from "react";
import { useLanguage } from "../Common/Navbaar"; // adjust path as needed

// ═══════════════════════════════════════════════════════════════════════════════
// ─── TRANSLATIONS FOR CHAIRMAN MESSAGE SECTION
// ═══════════════════════════════════════════════════════════════════════════════
const CHAIRMAN_TRANSLATIONS = {
  en: {
    section_title: "Message from Our Chairman",
    chairman_name: "Shri Ganesh Yadav",
    chairman_designation: "Founder & Chairman",
    company_name: "Shree Ganesh Finance",
    years: "(2020 – Present)",
    quote_icon: "\u201C",
    paragraphs: [
      "As the Founder and Chairman of Shree Ganesh Finance, I take immense pride in the journey we have undertaken together — a journey rooted in trust, transparency, and the unwavering commitment to empowering every individual who walks through our doors. Founded on the timeless values of integrity and service, Shree Ganesh Finance has grown from a humble beginning into a trusted financial institution serving lakhs of families across India.",
      "Our philosophy has always been simple: 'Finance with Faith.' We believe that true prosperity is not merely the accumulation of wealth, but the elevation of lives — the farmer who secures a better harvest, the mother who educates her child, the young entrepreneur who dares to dream. Every loan we sanction, every policy we offer, is a promise we make to make lives better.",
      "With decades of experience in gold loans, personal finance, insurance, and money transfer services, we have built a bridge between ambition and opportunity. Our strength lies in our people — our dedicated team of professionals who serve with compassion, and our customers whose trust is our greatest asset.",
      "As we continue to grow and modernize through digital initiatives, our core values remain unchanged. We are committed to inclusive growth, financial literacy, and sustainable progress for every Indian family, from rural heartlands to urban centres.",
    ],
    img_alt: "Shri Ganesh Yadav – Founder & Chairman, Shree Ganesh Finance",
  },
  hi: {
    section_title: "अध्यक्ष का संदेश",
    chairman_name: "श्री गणेश यादव",
    chairman_designation: "संस्थापक एवं अध्यक्ष",
    company_name: "श्री गणेश फाइनेंस",
    years: "(2020 – वर्तमान)",
    quote_icon: "\u201C",
    paragraphs: [
      "श्री गणेश फाइनेंस के संस्थापक एवं अध्यक्ष के रूप में, मुझे इस यात्रा पर अत्यंत गर्व है — एक ऐसी यात्रा जो विश्वास, पारदर्शिता और प्रत्येक व्यक्ति को सशक्त बनाने की अटूट प्रतिबद्धता पर आधारित है। ईमानदारी और सेवा के शाश्वत मूल्यों पर स्थापित, श्री गणेश फाइनेंस एक विनम्र शुरुआत से भारत भर में लाखों परिवारों की सेवा करने वाली एक विश्वसनीय वित्तीय संस्था बन चुकी है।",
      "हमारा दर्शन सदा सरल रहा है: 'विश्वास के साथ वित्त।' हम मानते हैं कि वास्तविक समृद्धि केवल धन का संचय नहीं है, बल्कि जीवन का उत्थान है — वह किसान जो बेहतर फसल सुरक्षित करता है, वह माँ जो अपने बच्चे को शिक्षा दिलाती है, वह युवा उद्यमी जो सपने देखने का साहस करता है।",
      "सोने के ऋण, व्यक्तिगत वित्त, बीमा और मनी ट्रांसफर सेवाओं में दशकों के अनुभव के साथ, हमने महत्वाकांक्षा और अवसर के बीच एक सेतु बनाया है। हमारी शक्ति हमारे लोगों में है — हमारे समर्पित पेशेवरों की टीम और हमारे ग्राहक जिनका विश्वास हमारी सबसे बड़ी संपत्ति है।",
      "जैसे-जैसे हम डिजिटल पहलों के माध्यम से बढ़ते और आधुनिक होते जाते हैं, हमारे मूल मूल्य अपरिवर्तित रहते हैं। हम ग्रामीण हृदय से लेकर शहरी केंद्रों तक, प्रत्येक भारतीय परिवार के लिए समावेशी विकास, वित्तीय साक्षरता और सतत प्रगति के लिए प्रतिबद्ध हैं।",
    ],
    img_alt: "श्री गणेश यादव – संस्थापक एवं अध्यक्ष, श्री गणेश फाइनेंस",
  },
  mr: {
    section_title: "अध्यक्षांचा संदेश",
    chairman_name: "श्री गणेश यादव",
    chairman_designation: "संस्थापक व अध्यक्ष",
    company_name: "श्री गणेश फायनान्स",
    years: "(2020 – सध्या)",
    quote_icon: "\u201C",
    paragraphs: [
      "श्री गणेश फायनान्सचे संस्थापक व अध्यक्ष म्हणून, आम्ही एकत्र केलेल्या प्रवासाबद्दल मला अत्यंत अभिमान वाटतो — विश्वास, पारदर्शिता आणि प्रत्येक व्यक्तीला सक्षम करण्याच्या अढळ वचनबद्धतेवर आधारलेला हा प्रवास. सचोटी आणि सेवेच्या चिरंतन मूल्यांवर स्थापित, श्री गणेश फायनान्स एका नम्र सुरुवातीपासून भारतभरातील लाखो कुटुंबांची सेवा करणारी विश्वासू वित्तीय संस्था बनली आहे.",
      "आमचे तत्त्वज्ञान नेहमीच सरळ राहिले आहे: 'विश्वासासह वित्त.' आम्ही विश्वास ठेवतो की खरी समृद्धी केवळ संपत्तीचे संचय नाही, तर जीवनाचे उत्थान आहे — तो शेतकरी जो चांगली कापणी मिळवतो, ती आई जी आपल्या मुलाला शिक्षण देते, तो तरुण उद्योजक जो स्वप्न पाहण्याचे धाडस करतो.",
      "सोने कर्ज, वैयक्तिक वित्त, विमा आणि मनी ट्रान्सफर सेवांमध्ये दशकांच्या अनुभवासह, आम्ही महत्त्वाकांक्षा आणि संधी यांच्यात पूल बांधला आहे. आमची शक्ती आमच्या लोकांमध्ये आहे — आमच्या समर्पित व्यावसायिकांची टीम आणि आमचे ग्राहक ज्यांचा विश्वास आमची सर्वात मोठी संपत्ती आहे.",
      "आम्ही डिजिटल उपक्रमांद्वारे वाढत आणि आधुनिक होत असताना, आमची मूळ मूल्ये अपरिवर्तित राहतात. आम्ही ग्रामीण हृदयभूमीपासून शहरी केंद्रांपर्यंत प्रत्येक भारतीय कुटुंबासाठी सर्वसमावेशक विकास, आर्थिक साक्षरता आणि शाश्वत प्रगतीसाठी वचनबद्ध आहोत.",
    ],
    img_alt: "श्री गणेश यादव – संस्थापक व अध्यक्ष, श्री गणेश फायनान्स",
  },
  gu: {
    section_title: "અધ્યક્ષનો સંદેશ",
    chairman_name: "શ્રી ગણેશ યાદવ",
    chairman_designation: "સ્થાપક અને અધ્યક્ષ",
    company_name: "શ્રી ગણેશ ફાઇનાન્સ",
    years: "(2020 – વર્તમાન)",
    quote_icon: "\u201C",
    paragraphs: [
      "શ્રી ગણેશ ફાઇનાન્સના સ્થાપક અને અધ્યક્ષ તરીકે, આપણે સાથે કરેલી આ સફર પર મને અત્યંત ગૌરવ છે — વિશ્વાસ, પારદર્શિતા અને દરેક વ્યક્તિને સશક્ત બનાવવાની અટળ પ્રતિબદ્ધતા પર આધારિત આ સફર. સત્યનિષ્ઠા અને સેવાના ચિરંતન મૂલ્યો પર સ્થાપિત, શ્રી ગણેશ ફાઇનાન્સ સામાન્ય શરૂઆતથી ભારતભરમાં લાખો પરિવારોની સેવા કરનાર વિશ્વસનીય નાણાકીય સંસ્થા બની છે.",
      "આપણી ફિલોસોફી હંમેશા સરળ રહી છે: 'વિશ્વાસ સાથે ફાઇનાન્સ.' આપણે માનીએ છીએ કે સાચી સમૃદ્ધિ માત્ર ધનનો સંચય નથી, પરંતુ જીવનનો ઉત્કર્ષ છે — તે ખેડૂત જે વધુ સારી ઉપજ મેળવે છે, તે માતા જે પોતાના બાળકને ભણાવે છે, તે યુવા ઉદ્યોગસાહસિક જે સ્વપ્ન જોવાની હિંમત કરે છે.",
      "ગોલ્ડ લોન, વ્યક્તિગત ફાઇનાન્સ, વીમો અને મની ટ્રાન્સફર સેવાઓમાં દાયકાઓના અનુભવ સાથે, આપણે મહત્ત્વાકાંક્ષા અને તકો વચ્ચે પૂલ બનાવ્યો છે. આપણી શક્તિ આપણા લોકોમાં છે — સમર્પિત વ્યાવસાયિકોની ટીમ અને આપણા ગ્રાહકો જેમનો વિશ્વાસ આપણી સૌથી મોટી સંપત્તિ છે.",
      "ડિજિટલ ઉપક્રમો દ્વારા આગળ વધતા અને આધુનિક બનતા, આપણા મૂળ મૂલ્યો અપરિવર્તિત રહે છે. ગ્રામીણ ક્ષેત્રોથી શહેરી કેન્દ્રો સુધી, દરેક ભારતીય પરિવાર માટે સમાવેશી વિકાસ, નાણાકીય સાક્ષરતા અને ટકાઉ પ્રગતિ માટે અમે પ્રતિબદ્ધ છીએ.",
    ],
    img_alt: "શ્રી ગણેશ યાદવ – સ્થાપક અને અધ્યક્ષ, શ્રી ગણેશ ફાઇનાન્સ",
  },
  te: {
    section_title: "చైర్మన్ సందేశం",
    chairman_name: "శ్రీ గణేష్ యాదవ్",
    chairman_designation: "వ్యవస్థాపకుడు మరియు చైర్మన్",
    company_name: "శ్రీ గణేష్ ఫైనాన్స్",
    years: "(2020 – ప్రస్తుతం)",
    quote_icon: "\u201C",
    paragraphs: [
      "శ్రీ గణేష్ ఫైనాన్స్ వ్యవస్థాపకుడు మరియు చైర్మన్‌గా, మనం కలిసి సాగించిన ఈ ప్రయాణంపై నాకు అమిత గర్వంగా ఉంది — విశ్వాసం, పారదర్శకత మరియు ప్రతి వ్యక్తిని సాధికారపరచాలన్న అచంచల నిబద్ధత పై ఆధారపడిన ఈ ప్రయాణం. నిజాయితీ మరియు సేవ యొక్క శాశ్వత విలువలపై స్థాపించబడిన శ్రీ గణేష్ ఫైనాన్స్, సాధారణ ఆరంభం నుండి భారతదేశం అంతటా లక్షలాది కుటుంబాలకు సేవలందించే విశ్వసనీయ ఆర్థిక సంస్థగా ఎదిగింది.",
      "మా తత్వశాస్త్రం ఎల్లప్పుడూ సరళంగా ఉంటుంది: 'విశ్వాసంతో ఆర్థికం.' నిజమైన సమృద్ధి కేవలం సంపద సంచయం కాదు, జీవితాల ఉత్థానమేనని మేము నమ్ముతాము — మెరుగైన పంట పొందే రైతు, తన బిడ్డను చదివించే తల్లి, కలలు కనే ధైర్యం చేసే యువ వ్యాపారవేత్త.",
      "బంగారు రుణాలు, వ్యక్తిగత ఆర్థికం, బీమా మరియు మనీ ట్రాన్స్‌ఫర్ సేవలలో దశాబ్దాల అనుభవంతో, మేము ఆశయం మరియు అవకాశం మధ్య వంతెన నిర్మించాము. మా బలం మా ప్రజలలో ఉంది — మా నిర్దేశిత నిపుణుల బృందం మరియు మా వినియోగదారుల విశ్వాసం మా అతిపెద్ద ఆస్తి.",
      "డిజిటల్ చొరవల ద్వారా వృద్ధి చెందుతూ ఆధునీకరిస్తున్నప్పటికీ, మా ప్రధాన విలువలు మారవు. గ్రామీణ ప్రాంతాల నుండి పట్టణ కేంద్రాల వరకు ప్రతి భారతీయ కుటుంబానికి సమగ్ర వృద్ధి, ఆర్థిక అక్షరాస్యత మరియు సుస్థిర పురోగతికి మేము కట్టుబడి ఉన్నాము.",
    ],
    img_alt: "శ్రీ గణేష్ యాదవ్ – వ్యవస్థాపకుడు మరియు చైర్మన్, శ్రీ గణేష్ ఫైనాన్స్",
  },
  ta: {
    section_title: "தலைவர் செய்தி",
    chairman_name: "திரு. கணேஷ் யாதவ்",
    chairman_designation: "நிறுவனர் மற்றும் தலைவர்",
    company_name: "ஸ்ரீ கணேஷ் ஃபைனான்ஸ்",
    years: "(2020 – தற்போது)",
    quote_icon: "\u201C",
    paragraphs: [
      "ஸ்ரீ கணேஷ் ஃபைனான்ஸின் நிறுவனர் மற்றும் தலைவராக, நாம் ஒன்றாக மேற்கொண்ட இந்த பயணத்தில் எனக்கு மிகுந்த பெருமை உள்ளது — நம்பிக்கை, வெளிப்படைத்தன்மை மற்றும் ஒவ்வொரு தனிநபரையும் மேம்படுத்துவதற்கான உறுதியான அர்ப்பணிப்பில் வேரூன்றிய இந்த பயணம். நேர்மை மற்றும் சேவையின் நிரந்தர மதிப்புகளில் நிறுவப்பட்ட ஸ்ரீ கணேஷ் ஃபைனான்ஸ், ஒரு சாதாரண தொடக்கத்திலிருந்து இந்தியா முழுவதும் லட்சக்கணக்கான குடும்பங்களுக்கு சேவை செய்யும் நம்பகமான நிதி நிறுவனமாக வளர்ந்துள்ளது.",
      "எங்கள் தத்துவம் எப்போதும் எளிமையானது: 'நம்பிக்கையுடன் நிதி.' உண்மையான செழிப்பு என்பது வெறுமனே செல்வம் சேர்ப்பது மட்டுமல்ல, வாழ்க்கைகளை உயர்த்துவதே என்று நாங்கள் நம்புகிறோம் — சிறந்த அறுவடை பெறும் விவசாயி, தன் குழந்தையை படிக்க வைக்கும் தாய், கனவு காணும் இளம் தொழில்முனைவோர்.",
      "தங்கக் கடன்கள், தனிப்பட்ட நிதி, காப்பீடு மற்றும் பண பரிமாற்ற சேவைகளில் பல தசாப்தங்கள் அனுபவத்துடன், ஆசை மற்றும் வாய்ப்புக்கு இடையே ஒரு பாலத்தை உருவாக்கியுள்ளோம். எங்கள் வலிமை எங்கள் மக்களில் உள்ளது — அர்ப்பணிப்பான நிபுணர்கள் குழு மற்றும் எங்கள் வாடிக்கையாளர்களின் நம்பிக்கை எங்கள் மிகப்பெரிய சொத்து.",
      "டிஜிட்டல் முயற்சிகள் மூலம் வளர்ந்து நவீனமாகி வரும் போதும், எங்கள் மூல மதிப்புகள் மாறாமல் உள்ளன. கிராமப்புற இதயங்களிலிருந்து நகர மையங்கள் வரை ஒவ்வொரு இந்திய குடும்பத்திற்கும் விரிவான வளர்ச்சி, நிதி கல்வியறிவு மற்றும் நிலையான முன்னேற்றத்திற்கு நாங்கள் உறுதிபூண்டுள்ளோம்.",
    ],
    img_alt: "திரு. கணேஷ் யாதவ் – நிறுவனர் மற்றும் தலைவர், ஸ்ரீ கணேஷ் ஃபைனான்ஸ்",
  },
  kn: {
    section_title: "ಅಧ್ಯಕ್ಷರ ಸಂದೇಶ",
    chairman_name: "ಶ್ರೀ ಗಣೇಶ್ ಯಾದವ್",
    chairman_designation: "ಸ್ಥಾಪಕರು ಮತ್ತು ಅಧ್ಯಕ್ಷರು",
    company_name: "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್",
    years: "(2020 – ಪ್ರಸ್ತುತ)",
    quote_icon: "\u201C",
    paragraphs: [
      "ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್‌ನ ಸ್ಥಾಪಕರು ಮತ್ತು ಅಧ್ಯಕ್ಷರಾಗಿ, ನಾವು ಒಟ್ಟಾಗಿ ಕೈಗೊಂಡ ಈ ಪ್ರಯಾಣದ ಬಗ್ಗೆ ನನಗೆ ಅಪಾರ ಹೆಮ್ಮೆ ಇದೆ — ವಿಶ್ವಾಸ, ಪಾರದರ್ಶಕತೆ ಮತ್ತು ಪ್ರತಿ ವ್ಯಕ್ತಿಯನ್ನು ಸಬಲಗೊಳಿಸುವ ಅಚಲ ಬದ್ಧತೆಯಲ್ಲಿ ಬೇರೂರಿದ ಈ ಪ್ರಯಾಣ. ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್ ಒಂದು ಸಾಧಾರಣ ಆರಂಭದಿಂದ ಭಾರತದಾದ್ಯಂತ ಲಕ್ಷಾಂತರ ಕುಟುಂಬಗಳಿಗೆ ಸೇವೆ ಸಲ್ಲಿಸುವ ವಿಶ್ವಾಸಾರ್ಹ ಹಣಕಾಸು ಸಂಸ್ಥೆಯಾಗಿ ಬೆಳೆದಿದೆ.",
      "ನಮ್ಮ ತತ್ವಶಾಸ್ತ್ರ ಯಾವಾಗಲೂ ಸರಳವಾಗಿದೆ: 'ನಂಬಿಕೆಯೊಂದಿಗೆ ಹಣಕಾಸು.' ನಿಜವಾದ ಸಮೃದ್ಧಿ ಕೇವಲ ಸಂಪತ್ತಿನ ಸಂಗ್ರಹವಲ್ಲ, ಜೀವನಗಳ ಉನ್ನತಿ ಎಂದು ನಾವು ನಂಬುತ್ತೇವೆ — ಉತ್ತಮ ಬೆಳೆ ಪಡೆಯುವ ರೈತ, ತನ್ನ ಮಗುವನ್ನು ಓದಿಸುವ ತಾಯಿ, ಕನಸು ಕಾಣಲು ಧೈರ್ಯ ಮಾಡುವ ಯುವ ಉದ್ಯಮಿ.",
      "ಚಿನ್ನದ ಸಾಲ, ವೈಯಕ್ತಿಕ ಹಣಕಾಸು, ವಿಮೆ ಮತ್ತು ಹಣ ವರ್ಗಾವಣೆ ಸೇವೆಗಳಲ್ಲಿ ದಶಕಗಳ ಅನುಭವದೊಂದಿಗೆ, ನಾವು ಮಹತ್ವಾಕಾಂಕ್ಷೆ ಮತ್ತು ಅವಕಾಶದ ನಡುವೆ ಸೇತುವೆ ನಿರ್ಮಿಸಿದ್ದೇವೆ. ನಮ್ಮ ಶಕ್ತಿ ನಮ್ಮ ಜನರಲ್ಲಿದೆ — ನಮ್ಮ ಸಮರ್ಪಿತ ತಜ್ಞರ ತಂಡ ಮತ್ತು ನಮ್ಮ ಗ್ರಾಹಕರ ನಂಬಿಕೆ ನಮ್ಮ ಅತಿದೊಡ್ಡ ಆಸ್ತಿ.",
      "ಡಿಜಿಟಲ್ ಉಪಕ್ರಮಗಳ ಮೂಲಕ ಬೆಳೆಯುತ್ತ ಆಧುನಿಕಗೊಳ್ಳುತ್ತಿರುವಾಗಲೂ, ನಮ್ಮ ಮೂಲ ಮೌಲ್ಯಗಳು ಬದಲಾಗುವುದಿಲ್ಲ. ಗ್ರಾಮೀಣ ಪ್ರದೇಶಗಳಿಂದ ನಗರ ಕೇಂದ್ರಗಳವರೆಗೆ ಪ್ರತಿ ಭಾರತೀಯ ಕುಟುಂಬಕ್ಕೂ ಸಮಗ್ರ ಬೆಳವಣಿಗೆ, ಹಣಕಾಸು ಸಾಕ್ಷರತೆ ಮತ್ತು ಸುಸ್ಥಿರ ಪ್ರಗತಿಗಾಗಿ ನಾವು ಬದ್ಧರಾಗಿದ್ದೇವೆ.",
    ],
    img_alt: "ಶ್ರೀ ಗಣೇಶ್ ಯಾದವ್ – ಸ್ಥಾಪಕರು ಮತ್ತು ಅಧ್ಯಕ್ಷರು, ಶ್ರೀ ಗಣೇಶ್ ಫೈನಾನ್ಸ್",
  },
  as: {
    section_title: "অধ্যক্ষৰ বাৰ্তা",
    chairman_name: "শ্ৰী গণেশ যাদৱ",
    chairman_designation: "প্ৰতিষ্ঠাতা আৰু অধ্যক্ষ",
    company_name: "শ্ৰী গণেশ ফাইনেন্স",
    years: "(2020 – বৰ্তমান)",
    quote_icon: "\u201C",
    paragraphs: [
      "শ্ৰী গণেশ ফাইনেন্সৰ প্ৰতিষ্ঠাতা আৰু অধ্যক্ষ হিচাপে, আমি একেলগে আগবঢ়া এই যাত্ৰাত মই অত্যন্ত গৌৰৱ অনুভৱ কৰোঁ — বিশ্বাস, স্বচ্ছতা আৰু প্ৰতিজন ব্যক্তিক সক্ষম কৰাৰ অটল প্ৰতিশ্ৰুতিত শিপা থকা এই যাত্ৰা। সততা আৰু সেৱাৰ চিৰন্তন মূল্যবোধৰ ওপৰত প্ৰতিষ্ঠিত শ্ৰী গণেশ ফাইনেন্স এক সাধাৰণ আৰম্ভণিৰ পৰা ভাৰতজুৰি লাখ লাখ পৰিয়ালক সেৱা আগবঢ়োৱা এক বিশ্বাসযোগ্য বিত্তীয় প্ৰতিষ্ঠানলৈ পৰিণত হৈছে।",
      "আমাৰ দর্শন সদায় সহজ: 'বিশ্বাসৰ সৈতে বিত্ত।' প্ৰকৃত সমৃদ্ধি কেৱল সম্পদ সঞ্চয় নহয়, জীৱনৰ উন্নতি বুলি আমি বিশ্বাস কৰোঁ — উন্নত শস্য লাভ কৰা কৃষক, নিজৰ সন্তানক শিক্ষিত কৰা মাতৃ, সপোন দেখাৰ সাহস কৰা যুৱ উদ্যোক্তা।",
      "সোণৰ ঋণ, ব্যক্তিগত বিত্ত, বীমা আৰু মানি ট্ৰান্সফাৰ সেৱাত দশকৰ অভিজ্ঞতাৰে আমি উচ্চাকাংক্ষা আৰু সুযোগৰ মাজত এক সেতু নিৰ্মাণ কৰিছোঁ। আমাৰ শক্তি আমাৰ মানুহৰ মাজত — আমাৰ নিষ্ঠাবান পেছাদাৰীৰ দল আৰু আমাৰ গ্ৰাহকসকলৰ বিশ্বাস আমাৰ সৰ্বশ্ৰেষ্ঠ সম্পদ।",
      "ডিজিটেল উদ্যোগৰ জৰিয়তে বৃদ্ধি পাওঁতে আৰু আধুনিক হোওঁতেও আমাৰ মূল মূল্যবোধ অপৰিৱৰ্তিত থাকে। গ্ৰামাঞ্চলৰ পৰা নগৰ কেন্দ্ৰলৈ প্ৰতিটো ভাৰতীয় পৰিয়ালৰ বাবে সামগ্ৰিক বৃদ্ধি, বিত্তীয় সাক্ষৰতা আৰু টেকসই প্ৰগতিৰ বাবে আমি প্ৰতিশ্ৰুতিবদ্ধ।",
    ],
    img_alt: "শ্ৰী গণেশ যাদৱ – প্ৰতিষ্ঠাতা আৰু অধ্যক্ষ, শ্ৰী গণেশ ফাইনেন্স",
  },
  ur: {
    section_title: "چیئرمین کا پیغام",
    chairman_name: "جناب گنیش یادو",
    chairman_designation: "بانی اور چیئرمین",
    company_name: "شری گنیش فنانس",
    years: "(2020 – حال)",
    quote_icon: "\u201C",
    paragraphs: [
      "شری گنیش فنانس کے بانی اور چیئرمین کی حیثیت سے، مجھے اس سفر پر بے پناہ فخر ہے جو ہم نے مل کر طے کیا ہے — اعتماد، شفافیت اور ہر فرد کو بااختیار بنانے کی پختہ عزم پر قائم یہ سفر۔ دیانت داری اور خدمت کی دائمی اقدار پر قائم، شری گنیش فنانس ایک عاجزانہ آغاز سے پورے ہندوستان میں لاکھوں خاندانوں کی خدمت کرنے والا ایک قابلِ اعتماد مالیاتی ادارہ بن چکا ہے۔",
      "ہمارا فلسفہ ہمیشہ سادہ رہا ہے: 'اعتماد کے ساتھ مالیات۔' ہم یقین رکھتے ہیں کہ حقیقی خوشحالی محض دولت کا ذخیرہ نہیں، بلکہ زندگیوں کا ارتقا ہے — وہ کسان جو بہتر فصل حاصل کرتا ہے، وہ ماں جو اپنے بچے کو تعلیم دلاتی ہے، وہ نوجوان کاروباری جو خواب دیکھنے کی ہمت کرتا ہے۔",
      "سونے کے قرضوں، ذاتی مالیات، بیمہ اور منی ٹرانسفر خدمات میں دہائیوں کے تجربے کے ساتھ، ہم نے خواہش اور موقع کے درمیان ایک پل بنایا ہے۔ ہماری طاقت ہمارے لوگوں میں ہے — ہمارے مخلص ماہرین کی ٹیم اور ہمارے صارفین کا اعتماد ہمارا سب سے بڑا اثاثہ ہے۔",
      "جیسے جیسے ہم ڈیجیٹل اقدامات کے ذریعے بڑھتے اور جدید ہوتے ہیں، ہماری بنیادی اقدار غیر متبدل رہتی ہیں۔ دیہی علاقوں سے شہری مراکز تک، ہر ہندوستانی خاندان کے لیے جامع ترقی، مالیاتی خواندگی اور پائیدار پیشرفت کے لیے ہم پرعزم ہیں۔",
    ],
    img_alt: "جناب گنیش یادو – بانی اور چیئرمین، شری گنیش فنانس",
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// ─── CHAIRMAN MESSAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
export default function ChairmanMessage() {
  const { lang } = useLanguage();
  const c = CHAIRMAN_TRANSLATIONS[lang] || CHAIRMAN_TRANSLATIONS["en"];
  const isRtl = lang === "ur";

  const sectionRef = useRef(null);
  const imgRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const observers = [];

    const makeObserver = (el, animClass, delay = 0) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateX(0)";
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.transition = "opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1)";
              el.style.opacity = "1";
              el.style.transform = "translateX(0) translateY(0)";
              el.classList.add(animClass);
            }, delay);
            obs.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    };

    // Title slides down
    if (titleRef.current) {
      titleRef.current.style.opacity = "0";
      titleRef.current.style.transform = "translateY(-28px)";
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          titleRef.current.style.transition = "opacity 0.65s ease, transform 0.65s cubic-bezier(0.22,1,0.36,1)";
          titleRef.current.style.opacity = "1";
          titleRef.current.style.transform = "translateY(0)";
          obs.disconnect();
        }
      }, { threshold: 0.2 });
      obs.observe(titleRef.current);
      observers.push(obs);
    }

    // Image slides from left
    if (imgRef.current) {
      imgRef.current.style.opacity = "0";
      imgRef.current.style.transform = isRtl ? "translateX(60px)" : "translateX(-60px)";
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            imgRef.current.style.transition = "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)";
            imgRef.current.style.opacity = "1";
            imgRef.current.style.transform = "translateX(0)";
          }, 100);
          obs.disconnect();
        }
      }, { threshold: 0.15 });
      obs.observe(imgRef.current);
      observers.push(obs);
    }

    // Content slides from right
    if (contentRef.current) {
      contentRef.current.style.opacity = "0";
      contentRef.current.style.transform = isRtl ? "translateX(-60px)" : "translateX(60px)";
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            contentRef.current.style.transition = "opacity 0.85s cubic-bezier(0.22,1,0.36,1), transform 0.85s cubic-bezier(0.22,1,0.36,1)";
            contentRef.current.style.opacity = "1";
            contentRef.current.style.transform = "translateX(0)";
          }, 220);
          obs.disconnect();
        }
      }, { threshold: 0.1 });
      obs.observe(contentRef.current);
      observers.push(obs);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, [lang, isRtl]);

  return (
    <section
      ref={sectionRef}
      dir={isRtl ? "rtl" : "ltr"}
      aria-label={c.section_title}
      itemScope
      itemType="https://schema.org/Person"
      className="relative bg-[#fafaf8] py-1 sm:py-20 lg:py-5 overflow-hidden"
    >
      {/* Decorative background */}
      <div className="pointer-events-none select-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-red-50 opacity-60 blur-3xl" />
        <div className="absolute -bottom-16 -right-20 w-80 h-80 rounded-full bg-yellow-50 opacity-50 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[2px] bg-gradient-to-r from-transparent via-red-100 to-transparent" />
      </div>

      <div className="relative max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* ── Section Title ── */}
        <div ref={titleRef} className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-[10px] sm:text-xs font-black tracking-[0.3em] text-red-500 uppercase mb-3">
            {c.company_name}
          </span>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            {c.section_title}
          </h2>
          <div className="mx-auto mt-4 flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-400" />
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-400" />
          </div>
        </div>

        {/* ── Card ── */}
        <div className="relative bg-white rounded-3xl shadow-[0_8px_64px_rgba(0,0,0,0.08)] border border-gray-100 overflow-visible">

          {/* Pen decoration – hidden on small screens */}
          <div className="hidden xl:block pointer-events-none select-none absolute -right-8 bottom-10 z-20">
            <svg width="48" height="180" viewBox="0 0 48 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="18" y="0" width="12" height="130" rx="6" fill="url(#penGrad)" />
              <polygon points="18,130 30,130 24,165" fill="#1a1a1a" />
              <polygon points="21,160 27,160 24,172" fill="#c0c0c0" />
              <rect x="16" y="28" width="16" height="4" rx="2" fill="#e5e7eb" />
              <defs>
                <linearGradient id="penGrad" x1="18" y1="0" x2="30" y2="130" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#374151" />
                  <stop offset="1" stopColor="#111827" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className={`flex flex-col lg:flex-row gap-0 ${isRtl ? "lg:flex-row-reverse" : ""}`}>

            {/* ── LEFT: Image Column ── */}
            <div
              ref={imgRef}
              className="lg:w-[340px] xl:w-[380px] flex-shrink-0 flex flex-col items-center justify-center px-8 py-10 lg:py-14 bg-gradient-to-br from-red-50/70 via-white to-yellow-50/40 lg:rounded-l-3xl"
            >
              {/* Portrait */}
              <div className="relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400/30 to-yellow-400/20 blur-xl scale-110 group-hover:scale-125 transition-transform duration-700" />
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-red-100/60 ring-4 ring-red-50">
                  <img
                    src="/About/chairman.png"
                    alt={c.img_alt}
                    itemProp="image"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  {/* Fallback avatar */}
                  <div
                    style={{ display: "none" }}
                    className="w-full h-full bg-gradient-to-br from-red-600 to-yellow-500 flex items-center justify-center"
                  >
                    <span className="text-white font-black text-6xl select-none">ग</span>
                  </div>
                </div>
                {/* Gold badge */}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg border-2 border-white">
                  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>

              {/* Name & Title */}
              <div className="mt-7 text-center space-y-1.5" itemProp="name">
                <h3 className="text-lg sm:text-xl font-black text-gray-900 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
                  {c.chairman_name}
                </h3>
                <p className="text-[13px] font-semibold text-red-600 tracking-wide" itemProp="jobTitle">
                  {c.chairman_designation}
                </p>
                <p className="text-[12px] text-gray-500 font-medium" itemProp="worksFor">
                  {c.company_name}
                </p>
                <p className="text-[11px] text-gray-400 font-medium pt-1">{c.years}</p>
              </div>

              {/* Signature line */}
              <div className="mt-6 w-28 h-px bg-gradient-to-r from-transparent via-red-300 to-transparent" />
              <div className="mt-4">
                <svg viewBox="0 0 120 40" className="w-24 opacity-30" fill="none" aria-hidden="true">
                  <path d="M5 30 Q20 5 35 20 Q50 35 70 15 Q90 5 115 25" stroke="#991b1b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                </svg>
              </div>
            </div>

            {/* ── RIGHT: Content Column ── */}
            <div
              ref={contentRef}
              className="flex-1 px-6 sm:px-10 lg:px-12 py-10 lg:py-14"
            >
              {/* Big quote mark */}
              <div
                className="text-[80px] sm:text-[96px] leading-none text-red-100 font-black select-none mb-0 -mb-6"
                aria-hidden="true"
                style={{ fontFamily: "'Georgia', serif", lineHeight: 0.9 }}
              >
                {c.quote_icon}
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 sm:space-y-5" itemProp="description">
                {c.paragraphs.map((para, i) => (
                  <p
                    key={i}
                    className={`text-[14px] sm:text-[15px] lg:text-base leading-relaxed text-gray-700 ${
                      i === 0 ? "font-semibold text-gray-800" : "font-normal"
                    }`}
                    style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: "italic" }}
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Bottom accent */}
              <div className={`mt-8 flex items-center gap-4 ${isRtl ? "flex-row-reverse" : ""}`}>
                <div className="h-px flex-1 bg-gradient-to-r from-red-200 to-transparent" />
                <span className="text-[10px] font-black tracking-[0.25em] text-red-400 uppercase whitespace-nowrap">
                  {c.company_name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SEO structured data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Ganesh Yadav",
            jobTitle: "Founder & Chairman",
            worksFor: {
              "@type": "Organization",
              name: "Shree Ganesh Finance",
            },
            image: "/chairman.jpg",
            description:
              "Founder and Chairman of Shree Ganesh Finance, a trusted financial institution offering gold loans, personal loans, insurance, and money transfer services across India.",
          }),
        }}
      />
    </section>
  );
}