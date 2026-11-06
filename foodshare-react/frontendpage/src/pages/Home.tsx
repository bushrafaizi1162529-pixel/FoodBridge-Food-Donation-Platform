import React, { useEffect, useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { TRANSLATIONS } from '../constants/translations';
import { Milestone } from 'lucide-react'; // standard placeholder
import { 
  Heart, 
  Truck, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  ArrowRight, 
  Globe2, 
  Sparkles, 
  Building2, 
  UtensilsCrossed 
} from 'lucide-react';

const homeTexts: Record<string, any> = {
  en: {
    alliance: "Zero Hunger Alliance",
    redirectTitle: "Redirecting hot plates in minutes before waste cycles take over.",
    redirectDesc: "FoodBridge integrates local smart routes, verifying NGO credentials, food-safety handles, and volunteer networks to secure 100% distribution across low-income families and children shelters.",
    joinText: "Join 180+ verified local chefs & shelter networks",
    dynamicFlow: "Dynamic Redistribution Flow",
    dynamicSub: "Redistributing surplus hot meals safely under 60-minutes.",
    step1Title: "Kitchen Log Dispatch",
    step1Desc: "Donors, hotels, or wedding halls upload excess food category listings, quantity limits, and expiry times in the portal.",
    step2Title: "Instant Geo-Alerting",
    step2Desc: "Our dynamic match system targets nearby verified NGOs, triggering local notification relays immediately.",
    step3Title: "GPS Route Pickup",
    step3Desc: "Approved NGO drivers deploy with insulated containers. Real-time truck movements are visualised on live systems.",
    step4Title: "Karma Ledger Sync",
    step4Desc: "As meals are unpacked at the shelters, carbon indexes update and donors receive ranking score impact awards!",
    endorsements: "Endorsements from the Frontlines",
    endorsement1Desc: "Wedding caterings are unpredictable. Sometimes we end up with 100 surplus servings of premium Veg Pulav. Earlier, dumping it was pain. Working with FoodBridge we save carbon credits and feed 100 poor kids at Seva Ashrams in minutes. Absolutely standard platform.",
    endorsement1Author: "Chef Rajesh Kumar",
    endorsement1Role: "Ambassador Catering Services, Hyderabad",
    endorsement2Desc: "We manage shelter homes near the highway block. Buying fresh food supplies for 80+ kids is hard. Getting daily warm breakfast alerts from Grand Royal Banquet Hall via FoodBridge platform literally helped us keep our pantry full. A true digital defense bridge!",
    endorsement2Author: "Srimati Laxmi Prasad",
    endorsement2Role: "Head Coordinator, Roti Seva Foundation",
    readyText: "Ready to Join the No-Waste Alliance?",
    readySub: "Setup takes less than two minutes. Create your restaurant profile, register your NGO, or deploy volunteer fleets. It begins with one single meal.",
    ctaJoin: "Join FoodBridge Today"
  },
  te: {
    alliance: "జీరో హంగర్ అలయన్స్",
    redirectTitle: "వ్యర్థాల చక్రాలు ప్రారంభం కాకముందే నిమిಷాల్లో వేడి ఆహారాన్ని పంపిణీ చేస్తున్నాము.",
    redirectDesc: "ఫుడ్‌బ్రిడ్జ్ స్థానిక స్మార్ట్ మార్గాలను అనుసంధానిస్తుంది, స్వచ్ఛంద సంస్థల (NGO) ప్రభుత్వ పత్రాలను ధృవీಕరిస్తుంది, ఆహార భద్రతా నియమాలను మరియు వలంటీర్ల నెట్‌వర్క్‌ను పర్యవేక్షిస్తుంది.",
    joinText: "180+ కంటే ఎక్కువ ధృవీకరించబడిన స్థానిక వంటశాలలు & స్వచ్ఛంద సంస్థలతో చేరండి",
    dynamicFlow: "డైనమిಕ್ పునఃపంపిణీ వ్యవస్థ",
    dynamicSub: "60 నిಮಿಷాల వ్యవధిలోనే ఆహారాన్ని పంಪಿಣీ చేయండి.",
    step1Title: "వంటగದಿ వివరాల నమోదు",
    step1Desc: "దాతలు, హోటళ్లు, క్యాటరింగ్ బృందాలు మిగిలిపోయిన ఆహార సామాగ్రి పరిమాణం, సమయాన్ని పోర్టల్‌లో అప్‌లోడ్ చేస్తారు.",
    step2Title: "తಕ್ಷಣ అలర్ట్",
    step2Desc: "మా వ్యవస్థ తಕ್ಷಣమే సమీపంలోని ధృవీకరించబడిన సంస్థకు జీపీఎస్ ఆధారిత సమాచార అలర్ట్ పంపుతుంది.",
    step3Title: "జీపీఎస్ వాహన పికప్",
    step3Desc: "ఆమోదించబడిన స్వచ్ఛంద నిర్వాహకులు ప్రత్యేక కంటైనర్లతో బయలుದೇరుతారు. ఈ వాహనాన్ని లైవ్ మ್ಯಾప్ లో చూడవచ్చు.",
    step4Title: "కర్మ పాయింట్ల లెక్కింపు",
    step4Desc: "ఆహారం పంపిణీ చేయబడిన తర్వాత, పర్యావరణ కార్బన్ రక్షణ నిష్పత్తులు అప్‌డేట్ చేయబడి దాతలకు అవార్డులు ప్రదానం చేయబడతాయి.",
    endorsements: "సహాయ కేంద్రాల నుండి అభిప్రಾಯాలు",
    endorsement1Desc: "వివాహ క్యాటరింగ్ అనేది ఊహించలేని విధంగా ఉంటుంది. కొన్నిసార్లు ఊహించిన దాని కంటే ఎక్కువ భోಜనాలు మిగిలిపోతాయి. గతంలో వృధాగా పారబోసేవాళ్లం. కానీ ఇప్పుడు ఫుడ్‌బ్రిడ్జ్ ద్వారా నిమిషాల్లో సేవాశ్రమాలకు పంపుతున్నాము. చాలా అద్భుతమైన సేవ.",
    endorsement1Author: "షెఫ్ రాజేష్ కుమార్",
    endorsement1Role: "అంబాసిడర్ క్యాటరింగ్ సర్వీసెస్, హైదరాబాద్",
    endorsement2Desc: "మేము రహదారి పಕ್ಕన ఉండే అనాథಾಶ్రమాలను నడుపుతున్నాము. 80 మందికి పైగా పిల్లలకు ఆహారం అందించడం చాలా ఖర్చుతో కూడుకున్న పని. కానీ ఫుడ్‌బ్రిడ్జ్ ద్వారా రోజూ ఉచిత భోజనాలు అందుకోవడం మాకు గర్వకారణంగా ఉంది.",
    endorsement2Author: "శ్రీమతి లక్ష్మి ప్రసాద్",
    endorsement2Role: "హెడ్ కోఆర్డిเนటర్, రోటి సేవా ఫೌండేషన్",
    readyText: "మిగిలిపోయిన ఆహారాన్ని రಕ್ಷించే కూటమిలో చేరడానికి సిద్ధంగా ఉన్నారా?",
    readySub: "నమోదు ప్రక్రియ కేవలం రెండు నిಮಿషాల లోపు పూర్తవుతుంది. మీ ప్రొఫೈల్‌ని సృష్టించండి లేదా వలంటీర్‌గా చేరండి.",
    ctaJoin: "ఈరోజే ఫుడ్‌బ్రిడ్జ్ లో చేరండి"
  },
  hi: {
    alliance: "शून्य भूख गठबंधन",
    redirectTitle: "अपशिष्ट चक्र शुरू होने से पहले मिनटों में गर्म भोजन का वितरण।",
    redirectDesc: "फ़ूडब्रिज स्थानीय स्मार्ट मार्गों को एकीकृत करता है, एनजीओ क्रेडेंशियल्स की जांच करता है, और भोजन सुरक्षा सुनिश्चित करता है।",
    joinText: "180+ सत्यापित स्थानीय शेफ और एनजीओ नेटवर्क से जुड़ें",
    dynamicFlow: "गतिशील पुनर्वितरण प्रवाह",
    dynamicSub: "60 मिनट के भीतर अधिशेष गर्म भोजन का सुरक्षित वितरण।",
    step1Title: "रसोई लॉग प्रेषण",
    step1Desc: "दाता, होटल या विवाह हॉल भोजन की श्रेणी, मात्रा और समाप्ति समय अपलोड करते हैं।",
    step2Title: "त्वरित जियो-चेतावनी",
    step2Desc: "हमारी गतिशील मिलान प्रणाली पास के सत्यापित एनजीओ को त्वरित अलर्ट भेजती है।",
    step3Title: "जीपीएस रूट पिकअप",
    step3Desc: "सत्यापित वाहन चालक कंटेनरों के साथ तैनाती करते हैं। वास्तविक समय की स्थिति देखी जा सकती है।",
    step4Title: "कर्म बही सिंक",
    step4Desc: "जब भोजन आश्रय गृहों में पहुंचता है, तो कार्बन सूचकांक अपडेट होते हैं और दाताओं को कर्मा पॉइंट पुरस्कार मिलते हैं।",
    endorsements: "अग्रिम पंक्ति से समर्थन",
    endorsement1Desc: "शादी की कैटरिंग अप्रत्याशित होती है। कभी-कभी 100 प्लेट वेज पुलाव बच जाता है। पहले इसे फेंकना दर्दनाक था। फ़ूडब्रिज के साथ हम कार्बन उत्सर्जन बचाते हैं और सेकंडों में गरीबों को खिलाते हैं।",
    endorsement1Author: "शेफ राजेश कुमार",
    endorsement1Role: "एंबेसडर कैटरिंग सर्विसेज, हैदराबाद",
    endorsement2Desc: "हम हाईवे के पास शेल्टर होम चलाते हैं। 80+ बच्चों के लिए खाना जुटाना मुश्किल है। फूडब्रिज के माध्यम से नियमित सहायता मिलना एक आशीर्वाद है।",
    endorsement2Author: "श्रीमती लक्ष्मी प्रसाद",
    endorsement2Role: "प्रधान समन्वयक, रोटी सेवा फाउंडेशन",
    readyText: "शून्य कचरा गठबंधन में शामिल होने के लिए तैयार हैं?",
    readySub: "सेटअप में दो मिनट से भी कम समय लगता है। अपना प्रोफाइल बनाएं, वालंटियर कमान संभालें।",
    ctaJoin: "आज ही फ़ूडब्रिज से जुड़ें"
  },
  ta: {
    alliance: "பூஜ்ஜிய பசி கூட்டணி",
    redirectTitle: "உணவு வீணாவதற்கு முன் சில நிமிடங்களில் சூடான உணவை விநியோகித்தல்.",
    redirectDesc: "ஃபுட்பிரிட்ஜ் உள்ளூர் ஸ்மார்ட் வழிகளை ஒருங்கிணைத்து, அரசு சான்றிதழ்களை சரிபார்த்து பசி போக்க உதவுகிறது.",
    joinText: "180+ சரிபார்க்கப்பட்ட உள்ளூர் சமையல்காரர்கள் மற்றும் தொண்டு நிறுவனங்களுடன் இணையுங்கள்",
    dynamicFlow: "வழங்கல் மற்றும் விநியோக செயல்முறை",
    dynamicSub: "60 நிமிடங்களுக்குள் உபரி உணவை பசியுள்ள தட்டுகளுக்கு கொண்டு சேர்ப்பது.",
    step1Title: "சமையலறை விவரம் பதிவு",
    step1Desc: "கொடையாளர்கள் தங்களின் உபரி உணவு வகை, அளவு மற்றும் காலாவதி நேரத்தை இணையதளத்தில் பதிவேற்றுகிறார்கள்.",
    step2Title: "உடனடி வாட்ஸ்அப்/ஜிபிஎஸ் எச்சரிக்கை",
    step2Desc: "சமீபத்திலுள்ள சரிபார்க்கப்பட்ட தொண்டு நிறுவனங்களுக்கு உடனுக்குடன் ஜிபிஎஸ் எச்சரிக்கை அனுப்பப்படும்.",
    step3Title: "ஜிபிஎஸ் விநியோக பயணம்",
    step3Desc: "அங்கீகரிக்கப்பட்ட வாகன ஓட்டுநர்கள் உணவை சேகரிக்க புறப்படுக்கிறார்கள். வாகனத்தை நேரடி வரைபடத்தில் காணலாம்.",
    step4Title: "புண்ணியப் புள்ளிகள் கணக்கீடு",
    step4Desc: "உணவு சேமிக்கப்படும்போதும், சுற்றுச்சூழல் காப்பதற்கும் புண்ணியப் புள்ளிகள் மற்றும் சான்றிதழ்கள் வழங்கப்படும்.",
    endorsements: "மக்களின் நற்சான்றிதழ்கள்",
    endorsement1Desc: "திருமண சமையலில் உபரி உணவை கொட்டுவது மிகவும் வேதனையானது. ஃபுட்பிரிட்ஜ் மூலம் இப்போது சில நிமிடங்களில் ஆதரவற்றோர் இல்லங்களுக்கு உணவை வழங்க முடிகிறது.",
    endorsement1Author: "செஃப் ராஜேஷ் குமார்",
    endorsement1Role: "அம்பாசிடர் கேட்டரிங், ஹைதராபாத்",
    endorsement2Desc: "நாங்கள் நெடுஞ்சாலைக்கு அருகில் உள்ள இல்லங்களை நிர்வகிக்கிறோம். தினமும் காலை உணவை ஃபுட்பிரிட்ஜ் மூலம் இலவசமாகப் பெறுவது எங்கள் குழந்தைகளுக்கு மிகவும் உதவியாக இருக்கிறது.",
    endorsement2Author: "ஸ்ரீமதி லட்சுமி பிரசாத்",
    endorsement2Role: "தலைமை ஒருங்கிணைப்பாளர், ரொட்டி சேவா அறக்கட்டளை",
    readyText: "பூஜ்ஜிய உணவு வீணடிப்பு கூட்டணியில் இணைய தயாரா?",
    readySub: "பதிவு செய்ய இரண்டு நிமிடங்களுக்கும் குறைவாகவே ஆகும். உங்களின் கணக்கை இன்றೇ தொடங்கி உதவுங்கள்.",
    ctaJoin: "இன்றே ஃபுட்பிரிட்ஜ் உடன் இணையுங்கள்"
  },
  kn: {
    alliance: "ಶೂನ್ಯ ಹಸಿವು ಒಕ್ಕೂಟ",
    redirectTitle: "ಆಹಾರ ವ್ಯರ್ಥವಾಗುವ ಮುನ್ನವೇ ಕೆಲವೇ ನಿಮಿಷಗಳಲ್ಲಿ ಬಿಸಿ ಊಟ ವಿತರಣೆ.",
    redirectDesc: "ಫುಡ್‌ಬ್ರಿಡ್ಜ್ ಪ್ರಮುಖ ಸ್ಥಳೀಯ ಮಾರ್ಗಗಳು, ವಲಂಟಿಯರ್ ನೆಟ್‌ವರ್ಕ್ ಮತ್ತು ಆಹಾರ ಸುರಕ್ಷತೆಯನ್ನು ಖಚಿತಪಡಿಸುತ್ತದೆ.",
    joinText: "ಆಹಾರ ವ್ಯರ್ಥ ಮುಕ್ತ ಸ್ಥಳೀಯ ಒಕ್ಕೂಟಕ್ಕೆ ಸೇರಿ",
    dynamicFlow: "ನಿರಂತರ ವಿತರಣಾ ಸೂತ್ರ",
    dynamicSub: "60 ನಿಮಿಷಗಳಲ್ಲೇ ಆಹಾರ ಸುರಕ್ಷಿತವಾಗಿ ಹಸಿದವರಿಗೆ ತಲುಪಿಸಿ.",
    step1Title: "ಅಡುಗೆ ಮನೆ ಮಾಹಿತಿ ನಮೂದನೆ",
    step1Desc: "ದಾನಿಗಳು ಹೆಚ್ಚುವರಿ ಆಹಾರದ ಪ್ರಮಾಣ ಹಾಗೂ ಮುಕ್ತಾಯ ಸಮಯವನ್ನು ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅಪ್‌ಲೋಡ್ ಮಾಡುತ್ತಾರೆ.",
    step2Title: "ತಕ್ಷಣದ ಅಲರ್ಟ್ ರವಾನೆ",
    step2Desc: "ನಮ್ಮ ಸಿಸ್ಟಮ್ ತಕ್ಷಣವೇ ಹತ್ತಿರದ ಸ್ವಯಂಸೇವಾ ಸಂಸ್ಥೆಗಳಿಗೆ ತ್ವರಿತ ಅಲರ್ಟ್ ರವಾನಿಸುತ್ತದೆ.",
    step3Title: "ಜಿಪಿಎಸ್ ವಾಹನ ಪಿಕಪ್",
    step3Desc: "ಅಂಗೀಕೃತ ಚಾಲಕರು ಹೊರಡುತ್ತಾರೆ. ಈ ಚಾಲಕರ ಜಿಪಿಎಸ್ ಲೋಕೆಷನ್ ಅನ್ನು ಮ್ಯಾಪ್‌ನಲ್ಲಿ ಲೈವ್ ನೋಡಬಹುದು.",
    step4Title: "ಕರ್ಮ ಪಾಯಿಂಟ್‌ಗಳ ಸಂಗ್ರಹ",
    step4Desc: "ಯಶಸ್ವಿಯಾಗಿ ವಿತರಣೆಯಾದ ಬಳಿಕ ಆಹಾರದ ಲೆಕ್ಕಾಚಾರ ಅಪ್‌ಡೇಟ್ ಆಗುತ್ತದೆ ಮತ್ತು ಕೃತಜ್ಞತಾ ಪಾಯಿಂಟ್ ಸಿಗುತ್ತದೆ.",
    endorsements: "ಮುಂಚೂಣಿ ಸಮಾಜ ಸೇವಕರ ಅನಿಸಿಕೆಗಳು",
    endorsement1Desc: "ಮದುವೆ ಸಮಾರಂಭಗಳಲ್ಲಿ ಆಹಾರ ಉಳಿದು ವ್ಯರ್ಥವಾಗುವುದು ದೊಡ್ಡ ಚಿಂತೆ ಆಗಿತ್ತು. ಫುಡ್‌ಬ್ರಿಡ್ಜ್ ಸಹಾಯದಿಂದ ಬಡ ಮಕ್ಕಳಿಗೆ ಬಿಸಿ ಊಟ ಒದಗಿಸುತ್ತಿದ್ದೇವೆ. ಧನ್ಯವಾದಗಳು.",
    endorsement1Author: "ಶೆಫ್ ರಾಜೇಶ್ ಕುಮಾರ್",
    endorsement1Role: "ಅಂಬಾಸಿಡರ್ ಕ್ಯಾಟರಿಂಗ್ ಸರ್ವಿಸಸ್, ಹೈದರಾಬಾದ್",
    endorsement2Desc: "ನಾವು ಹೆದ್ದಾರಿ ಬಳಿ ಅನಾಥಾಶ್ರಮ ನಡೆಸುತ್ತಿದ್ದೇವೆ. ಪ್ರತಿದಿನ ಫುಡ್‌ಬ್ರಿಡ್ಜ್ ಸಹಾಯದಿಂದ ಉತ್ತಮ ಊಟ ಸಿಗುತ್ತಿದೆ. ಇದು ನಮಗೆ ಒಂದು ವರವೇ ಸರಿ.",
    endorsement2Author: "ಶ್ರೀಮತಿ ಲಕ್ಷ್ಮಿ ಪ್ರಸಾದ್",
    endorsement2Role: "ಮುಖ್ಯಸ್ಥರು, ರೋಟಿ ಸೇವಾ ಫೌಂಡೇಶನ್",
    readyText: "ಶೂನ್ಯ ಆಹಾರ ವ್ಯರ್ಥ ಒಕ್ಕೂಟಕ್ಕೆ ಸೇರಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",
    readySub: "ನೋಂದಣಿ ಕೇವಲ ಎರಡು ನಿಮಿಷಗಳಲ್ಲಿ ಆಗುತ್ತದೆ. ಇಂದೇ ಕೈ ಜೋಡಿಸಿ.",
    ctaJoin: "ಇಂದೇ ಫುಡ್‌ಬ್ರಿಡ್ಜ್ ಒಕ್ಕೂಟಕ್ಕೆ ಸೇರಿ"
  }
};

interface HomeProps {
  setActiveTab: (tab: string) => void;
  showLoginModal: () => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab, showLoginModal }) => {
  const { language, foodSavedToday, currentUser } = useFoodBridge();
  const t = TRANSLATIONS[language];
  const ht = homeTexts[language] || homeTexts.en;

  // Dynamic counting effects for statistics
  const [animatedMeals, setAnimatedMeals] = useState(14850);
  const [animatedWaste, setAnimatedWaste] = useState(6100);

  useEffect(() => {
    const timer1 = setInterval(() => {
      setAnimatedMeals(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);

    const timer2 = setInterval(() => {
      setAnimatedWaste(prev => prev + Math.floor(Math.random() * 2) + 1);
    }, 6000);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
    };
  }, []);

  return (
    <div className="space-y-16 pb-20 animate-fade-in font-sans">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 px-4 sm:px-6 lg:px-8">
        
        {/* Decorative ambient background blur */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-5xl mx-auto text-center space-y-6">
          
          {/* Floating Micro-Badge */}
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-orange-100/40 dark:bg-orange-950/20 border border-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider animate-bounce">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.slogan}</span>
          </div>

          {/* Heading Typography */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight font-sans">
            {t.hero.title.split(',')[0]}, <br />
            <span className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">
              {t.hero.title.split(',')[1] || 'Feeding Communities'}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Call To Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {currentUser?.role === 'donor' || !currentUser ? (
              <button
                id="hero-donate-food-btn"
                onClick={() => setActiveTab('listings')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:scale-103 active:scale-97 text-white font-bold text-sm shadow-lg shadow-orange-500/20 shadow-glow transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>{t.hero.ctaStart}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : null}

            <button
              id="hero-listings-btn"
              onClick={() => setActiveTab('listings')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-orange-50/20 dark:hover:bg-orange-950/10 text-gray-700 dark:text-gray-300 font-bold text-sm transition-all flex items-center justify-center space-x-1 cursor-pointer"
            >
              <span>{t.hero.ctaClaim}</span>
            </button>
          </div>
        </div>

        {/* Hero Interactive Food Illustration Mock */}
        <div className="max-w-4xl mx-auto mt-12 px-4 relative">
          <div className="rounded-3xl border border-gray-150 dark:border-gray-850 bg-white/70 dark:bg-gray-900/50 backdrop-blur-md overflow-hidden shadow-2xl p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              
              {/* Graphic container */}
              <div className="relative h-60 sm:h-72 w-full rounded-2xl bg-orange-100/30 dark:bg-gray-950/50 border border-orange-500/10 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&auto=format&fit=crop&q=80" 
                  alt="Community Distribution Drive"
                  className="w-full h-full object-cover rounded-2xl brightness-95 dark:brightness-75 hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Embedded Floating glass tags */}
                <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/95 shadow px-3 py-1.5 rounded-xl border border-orange-500/20 backdrop-blur text-left flex items-center space-x-2 z-20">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-black text-gray-900 dark:text-white">NGO DISPATCH DIRECTORY ACTIVE</span>
                </div>
              </div>

              {/* Text Highlights */}
              <div className="text-left space-y-4">
                <div className="flex items-center space-x-2 text-orange-600 dark:text-orange-400">
                  <Heart className="w-5 h-5 animate-pulse" />
                  <span className="text-sm font-black uppercase tracking-wider">{ht.alliance}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-snug">
                  {ht.redirectTitle}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {ht.redirectDesc}
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="flex -space-x-2">
                    <img className="w-7 h-7 rounded-full border border-white" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80" />
                    <img className="w-7 h-7 rounded-full border border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" />
                    <img className="w-7 h-7 rounded-full border border-white" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400">{ht.joinText}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Real-time Beating Stats Counter Panel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          
          {/* Back glows */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-transparent pointer-events-none" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center division-x divide-orange-400/20">
            <div className="space-y-1">
              <p className="text-2xl sm:text-4xl font-black">{t.stats.mealsServedVal}</p>
              <p className="text-[10px] sm:text-xs font-bold text-orange-100 uppercase tracking-wider">{t.hero.mealsServed}</p>
            </div>
            <div className="space-y-1 border-l border-white/10">
              <p className="text-2xl sm:text-4xl font-black">{t.stats.wasteReducedVal}</p>
              <p className="text-[10px] sm:text-xs font-bold text-orange-100 uppercase tracking-wider">{t.hero.wasteReduced}</p>
            </div>
            <div className="space-y-1 border-l border-white/10">
              <p className="text-2xl sm:text-4xl font-black">{t.stats.activeNgosVal}</p>
              <p className="text-[10px] sm:text-xs font-bold text-orange-100 uppercase tracking-wider">{t.hero.registeredNgos}</p>
            </div>
            <div className="space-y-1 border-l border-white/10">
              <p className="text-2xl sm:text-4xl font-black">{t.stats.carbonSavedVal}</p>
              <p className="text-[10px] sm:text-xs font-bold text-orange-100 uppercase tracking-wider">Carbon Prevention (CO2-e)</p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-left">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                <UtensilsCrossed className="w-5 h-5 text-amber-200" />
              </div>
              <div>
                <p className="text-sm font-black leading-none">{t.stats.foodSavedTitle}</p>
                <p className="text-[11px] text-orange-150 mt-0.5">{t.stats.foodSavedSub}</p>
              </div>
            </div>
            <div className="px-5 py-2 rounded-2xl bg-white/15 backdrop-blur font-mono text-xs sm:text-sm font-black flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-green-400 block animate-ping" />
              <span>{foodSavedToday.toFixed(1)} {t.stats.kgText}</span>
            </div>
          </div>

        </div>
      </section>

      {/* Features Grid Panel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            {t.features.title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
            {t.features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-orange-500/5 hover:-translate-y-1 transition-all text-left space-y-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100/40 dark:bg-orange-950/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Truck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">{t.features.item1Title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t.features.item1Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-orange-500/5 hover:-translate-y-1 transition-all text-left space-y-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100/40 dark:bg-orange-950/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">{t.features.item2Title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t.features.item2Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-orange-500/5 hover:-translate-y-1 transition-all text-left space-y-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100/40 dark:bg-orange-950/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Globe2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">{t.features.item3Title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t.features.item3Desc}</p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-orange-500/5 hover:-translate-y-1 transition-all text-left space-y-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100/40 dark:bg-orange-950/20 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">{t.features.item4Title}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{t.features.item4Desc}</p>
          </div>

        </div>
      </section>

      {/* How It Works Timeline */}
      <section className="bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 border-y border-gray-100 dark:border-gray-900">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              {ht.dynamicFlow}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {ht.dynamicSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            {/* Step 1 */}
            <div className="text-left space-y-2.5 relative">
              <span className="text-[44px] font-black text-orange-100 dark:text-orange-950/40 leading-none">01</span>
              <h4 className="text-xs font-black uppercase text-gray-900 dark:text-white">{ht.step1Title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">
                {ht.step1Desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-left space-y-2.5 relative">
              <span className="text-[44px] font-black text-orange-100 dark:text-orange-950/40 leading-none">02</span>
              <h4 className="text-xs font-black uppercase text-gray-900 dark:text-white">{ht.step2Title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">
                {ht.step2Desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-left space-y-2.5 relative">
              <span className="text-[44px] font-black text-orange-100 dark:text-orange-950/40 leading-none">03</span>
              <h4 className="text-xs font-black uppercase text-gray-900 dark:text-white">{ht.step3Title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">
                {ht.step3Desc}
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-left space-y-2.5 relative">
              <span className="text-[44px] font-black text-orange-100 dark:text-orange-950/40 leading-none">04</span>
              <h4 className="text-xs font-black uppercase text-gray-900 dark:text-white">{ht.step4Title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">
                {ht.step4Desc}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            {ht.endorsements}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 italic leading-relaxed">
              &ldquo;{ht.endorsement1Desc}&rdquo;
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 bg-[url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100')] bg-cover" />
              <div>
                <h5 className="text-xs font-extrabold text-gray-900 dark:text-white">{ht.endorsement1Author}</h5>
                <span className="text-[11px] text-gray-400">{ht.endorsement1Role}</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm space-y-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 italic leading-relaxed">
              &ldquo;{ht.endorsement2Desc}&rdquo;
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100')] bg-cover" />
              <div>
                <h5 className="text-xs font-extrabold text-gray-900 dark:text-white">{ht.endorsement2Author}</h5>
                <span className="text-[11px] text-gray-400">{ht.endorsement2Role}</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gray-900 dark:bg-orange-950/20 border border-orange-500/10 p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-60 h-60 bg-orange-600/15 rounded-full blur-3xl" />
          <div className="max-w-xl mx-auto space-y-6 relative z-10">
            <h2 className="text-3xl font-extrabold">{ht.readyText}</h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              {ht.readySub}
            </p>
            <div className="flex justify-center">
              <button
                id="cta-register-trigger"
                onClick={showLoginModal}
                className="px-8 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 font-bold text-sm transition-colors cursor-pointer"
              >
                {ht.ctaJoin}
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
