import { Language } from '../types';

export const TRANSLATIONS: Record<Language, {
  brand: string;
  slogan: string;
  nav: Record<string, string>;
  hero: Record<string, string>;
  stats: Record<string, string>;
  features: Record<string, string>;
  buttons: Record<string, string>;
  roles: Record<string, string>;
  categories: Record<string, string>;
  form: Record<string, string>;
  dashboard: Record<string, string>;
  faq: Record<string, string>;
  tracking: Record<string, string>;
  impact: Record<string, string>;
  leaderboard: Record<string, string>;
  notifications: Record<string, string>;
  toast: Record<string, string>;
}> = {
  en: {
    brand: "FoodBridge",
    slogan: "Connecting Excess with Empty Plates",
    nav: {
      home: "Home",
      about: "About",
      donate: "Donate Food",
      listings: "Available Food",
      dashboard: "Dashboard",
      leaderboard: "Leaderboard",
      impact: "Impact Analytics",
      contact: "Contact us",
      faq: "FAQs",
      login: "Login",
      signup: "Sign Up",
      logout: "Logout",
      pickups: "Pickups",
      map: "Live Map"
    },
    hero: {
      title: "Rescuing Excess Food, Feeding Hungry Souls",
      subtitle: "A digital bridge connecting local donors, caterers, hotels, and restaurants directly with verified NGOs to eliminate surplus organic waste and nurture our community.",
      ctaStart: "Start Donating Surplus",
      ctaClaim: "Claim Available Food",
      activeDonors: "Verified Donors",
      registeredNgos: "NGO Partners",
      mealsServed: "Successful Meals Cleaned",
      wasteReduced: "Food Waste Prevented"
    },
    stats: {
      mealsServedVal: "15,280+",
      wasteReducedVal: "6,410 kg",
      activeNgosVal: "180+",
      carbonSavedVal: "11.2 Tons",
      foodSavedTitle: "Food Saved Today",
      foodSavedSub: "Real-time volunteer pickups today",
      kgText: "kg of nutritious food redirected",
    },
    features: {
      title: "Why FoodBridge?",
      subtitle: "Our features enable a frictionless, secure ecosystem for efficient surplus food recovery.",
      item1Title: "Real-time Logistics",
      item1Desc: "Instantly alert nearby certified NGOs when a donor posts surplus cooked or raw food.",
      item2Title: "Digital Safe-Verification",
      item2Desc: "NGOs upload government accreditation, ensuring safety standards are strictly monitored.",
      item3Title: "Live Journey Map",
      item3Desc: "Track volunteers and vehicles on maps from donor kitchen coordinates to community desks.",
      item4Title: "Impact Leaderboards",
      item4Desc: "Gamified badges and organic points reward our most empathetic community chefs and volunteers."
    },
    buttons: {
      submit: "Submit Details",
      cancel: "Cancel",
      register: "Register Now",
      claim: "Claim Food",
      track: "Track Route",
      approve: "Approve Request",
      reject: "Reject Request",
      viewAll: "View All",
      verified: "Verified Partner",
      pending: "Pending Approval",
      complete: "Complete Pickup",
      loginGoogle: "Continue with Google",
      backToHome: "Back to Home",
      toggleFilters: "Toggle Filters"
    },
    roles: {
      individual: "Individual Donor",
      restaurant: "Restaurant Owner",
      hotel: "Hotel / Buffet Coordinator",
      caterer: "Wedding & Catering Chef",
      ngo: "NGO Representative",
      admin: "System Administrator"
    },
    categories: {
      cooked: "Fresh Hot Cooked Meals",
      raw: "Raw Vegetables & Grains",
      packaged: "Packaged Snack Kits",
      dry: "Dry Staples & Groceries",
      beverage: "Beverages & Dairy"
    },
    form: {
      foodTitle: "Donation Cargo Title",
      foodTitlePl: "e.g., Prepared Rice & Curry, Surplus Pastries",
      category: "Food Category",
      quantity: "Quantity / Servings",
      quantityPl: "e.g., 50 Meals or 10 kg",
      expiry: "Expires Within (Hours)",
      address: "Exact Pickup Address",
      addressPl: "Sector 4, Main Street Lane...",
      instructions: "Handling / Safety Instructions",
      instructionsPl: "Keep refrigerated, consume hot, handles requested",
      imageUrl: "Food Batch Image URL (Optional)",
      imageUrlPl: "https://images.unsplash.com/...",
      email: "Email Address",
      password: "Password",
      phone: "Mobile Number",
      fullName: "Full Name / Organization Name",
      ngoReg: "NGO Registration Certificate Number",
      docUpload: "Upload Registration Documents PDF",
      roleSelect: "Select Registration Account Persona"
    },
    dashboard: {
      donorTitle: "Donor Mission Control Dashboard",
      ngoTitle: "NGO Claim Analytics Dashboard",
      adminTitle: "Global Command Center Board",
      totalDonations: "Total Cargo Dispatched",
      activeDonations: "Active Surplus Listings",
      completedPickups: "Completed Pickups",
      pendingClaims: "Pending Claims",
      aiRec: "FoodBridge AI Predictive Suggestion",
      aiBanner: "Based on local wedding trends in Hyderabad/Bengaluru tonight, surplus cooked rice is expected to spike by 15% between 9 PM and 11 PM. Alerting teams for rapid collection.",
      systemUsers: "Registered Global Users",
      ngoApprovals: "Pending NGO Applications",
      reportsGenerated: "Weekly ESG Carbon Offset Reports",
      urgencies: "Emergency Disaster Food Requests"
    },
    faq: {
      title: "Frequently Answered Queries",
      subtitle: "Everything you need to know about safety protocols and volunteer dispatch.",
      q1: "How is food safety maintained?",
      a1: "All certified donors must agree to clean handling standards (FSSAI). Cooked food is stored in temperature-controlled containers, and shelf life is verified before dispatch.",
      q2: "Who manages the pickup transport?",
      a2: "Registered NGO volunteers or FoodBridge emergency logistics partners handle pickup using GPS tracking to ensure delivery within the safety buffer window.",
      q3: "How do teams verify NGO status?",
      a3: "Administrators manually check government organization filings and certificates to activate NGO credentials, blocking spam or unverified agencies.",
      q4: "Is there an offset carbon report?",
      a4: "Yes! Based on waste reduction math, we output standard ESG credits. Every container prevented from landfill reduces methane and carbon emissions."
    },
    tracking: {
      title: "Live GPS Cargo Dispatch Logistics",
      driver: "Assigned Volunteer Vehicle Driver",
      notClaimed: "Waiting for NGO partner claim...",
      claimed: "Dispatched and Accepted by NGO",
      inTransit: "Vehicle is En Route to Kitchen Location",
      arrived: "Driver Has Arrived. Packing Food Cargo.",
      delivered: "Successfully Unloaded at Shelter Home",
      eta: "Estimated Route ETA"
    },
    impact: {
      title: "Environment and Social Impact Report",
      mealsServedText: "Nutritious meal servings delivered successfully without corporate waste.",
      savedGramsText: "Landfill waste redirected to low-income clusters.",
      carbonReduct: "Methane / Greenhouse Gas Prevented",
      co2e: "Carbon dioxide equivalent savings calculated through ESG standards."
    },
    leaderboard: {
      title: "Empathetic Food Heroes Grid",
      subtitle: "Honoring establishments that go beyond profit margins to feed humanity.",
      topDonor: "Top Food Donors",
      topNGOs: "Top Distribution NGOs",
      rank: "Rank",
      name: "Establishment / Group",
      points: "Karma Points",
      donations: "Loads",
      badges: "Achievements"
    },
    notifications: {
      newAlert: "Urgent: 100-servings buffet food active in Sector 5! Requesting nearby dispatch NGOs.",
      verifiedMsg: "Your NGO credentials have been successfully updated and verified by Admin team.",
      successPost: "Donation posted! Your surplus is visible to near NGO dispatch units.",
      title: "Logistics Communications Panel"
    },
    toast: {
      success: "Action updated successfully!",
      error: "Please review input guidelines.",
      demoMessage: "Sandbox simulation status generated."
    }
  },
  te: {
    brand: "ఫుడ్‌బ్రిడ్జ్",
    slogan: "మిగిలిపోయిన ఆహారాన్ని ఆకలి తీర్చే పళ్లేలతో కలుపుతోంది",
    nav: {
      home: "హోమ్",
      about: "మా గురించి",
      donate: "ఆహార దానం",
      listings: "అందుబాటులో ఉన్న ఆహారం",
      dashboard: "డాష్‌బోర్డ్",
      leaderboard: "లీడర్‌బోర్డ్",
      impact: "ప్రభావ విశ్లేషణ",
      contact: "సంప్రదించండి",
      faq: "ప్రశ్నలు-సమాధానాలు",
      login: "లాగిన్",
      signup: "సైన్ అప్",
      logout: "లాగ్ అవుట్",
      pickups: "పికప్‌లు",
      map: "లైవ్ మ్యాప్"
    },
    hero: {
      title: "మిగిలిపోయిన ఆహారాన్ని రక్షించండి, ఆకలితో ఉన్నవారికి పెట్టండి",
      subtitle: "స్థానిక దాతలు, క్యాటరర్లు, హోటళ్లు మరియు రెస్టారెంట్లను నేరుగా ధృవీకరించబడిన స్వచ్ఛంద సంస్థలతో (NGOs) అనుసంధానించే డిజిటల్ వంతెన. ఆహార వృధాను అరికట్టండి.",
      ctaStart: "మిగిలిన ఆహారాన్ని దానం చేయండి",
      ctaClaim: "ఆహారాన్ని క్లెయిమ్ చేయండి",
      activeDonors: "ధృవీకృత దాతలు",
      registeredNgos: "భాగస్వామ్య NGOలు",
      mealsServed: "అందించిన విజయవంతమైన భోజనాలు",
      wasteReduced: "అరికట్టిన ఆహార వృధా"
    },
    stats: {
      mealsServedVal: "15,280+",
      wasteReducedVal: "6,410 కేజీలు",
      activeNgosVal: "180+",
      carbonSavedVal: "11.2 టన్నులు",
      foodSavedTitle: "ఈరోజు రక్షించబడిన ఆహారం",
      foodSavedSub: "ఈరోజు స్వచ్ఛంద పికప్‌లు",
      kgText: "కేజీల పోషక ఆహారం పంపిణీ చేయబడింది",
    },
    features: {
      title: "ఎందుకు ఫుడ్‌బ్రిడ్జ్?",
      subtitle: "సజావుగా మరియు సురక్షితంగా మిగిలిన ఆహారాన్ని సేకరించడానికి క్లీన్ ఫీచర్స్.",
      item1Title: "రియల్ టైమ్ లాజిస్టిక్స్",
      item1Desc: "దాత ఆహారాన్ని పోస్ట్ చేసిన వెంటనే సమీపంలోని ధృవీకరించబడిన సంస్థకు అలర్ట్ వెళుతుంది.",
      item2Title: "డిజిటల్ ధృవీకరణ",
      item2Desc: "NGOలు ప్రభుత్వ రిజిస్ట్రేషన్ పత్రాలను సమర్పించి ధృవీకరించుకోవాలి, దీనివల్ల భద్రత పెరుగుతుంది.",
      item3Title: "లైవ్ జర్నీ మ్యాప్",
      item3Desc: "దాతల వంట గది నుండి ఆహార పంపిణీ కేంద్రాల వరకు వలంటీర్ల వాహనాన్ని మ్యాప్‌లో ట్రాక్ చేయవచ్చు.",
      item4Title: "ప్రభావ లీడర్‌బోర్డ్‌లు",
      item4Desc: "మంచిగా దానాలు చేసే వంటశాలలకు, వలంటీర్లకు పాయింట్లు మరియు బ్యాడ్జీలు ప్రదానం చేయబడతాయి."
    },
    buttons: {
      submit: "వివరాలను సమర్పించు",
      cancel: "రద్దు చేయి",
      register: "ఇప్పుడే నమోదు చేసుకోండి",
      claim: "క్లెయిమ్ చేయండి",
      track: "రూట్‌ని ట్రాక్ చేయండి",
      approve: "అభ్యర్థనను ఆమోదించండి",
      reject: "అభ్యర్థనను తిరస్కరించండి",
      viewAll: "అన్నీ చూడండి",
      verified: "ధృవీకరించబడిన భాగస్వామి",
      pending: "ఆమోదం కోసం వేచి ఉంది",
      complete: "పికప్ పూర్తి చేయండి",
      loginGoogle: "గూగుల్‌తో లాగిన్ అవ్వండి",
      backToHome: "తిరిగి హోమ్‌కి",
      toggleFilters: "ఫిల్టర్‌లను మార్చండి"
    },
    roles: {
      individual: "వ్యక్తిగత దాత",
      restaurant: "రెస్టారెంట్ యజమాని",
      hotel: "హోటల్ నిర్వాహకుడు",
      caterer: "క్యాటరింగ్ నిర్వాహకుడు",
      ngo: "NGO ప్రతినిధి",
      admin: "సిస్టమ్ అడ్మినిస్ట్రేటర్"
    },
    categories: {
      cooked: "తాజా వండిన భోజనం",
      raw: "పచ్చి కూరగాయలు & ధాన్యాలు",
      packaged: "ప్యాక్ చేసిన స్నాక్స్",
      dry: "పొడి కిరాణా సామాగ్రి",
      beverage: "పానీయాలు & పాల ఉత్పత్తులు"
    },
    form: {
      foodTitle: "ఆహార సరుకు పేరు",
      foodTitlePl: "ఉదా: అన్నం & కూరలు, మిగిలిపోయిన స్వీట్స్",
      category: "ఆహారం విభాగం",
      quantity: "పరిమాణం / భోజనాలు",
      quantityPl: "ఉదా: 50 మందికి భోజనం లేదా 10 కేజీలు",
      expiry: "ఎన్ని గంటలలోగా సేవించాలి?",
      address: "పికప్ సమాచారం / చిరునామా",
      addressPl: "సెక్టార్ 4, మెయిన్ రోడ్ గల్లీ...",
      instructions: "భద్రతా సూచనలు",
      instructionsPl: "ఫ్రిజ్‌లో ఉంచండి, వేడిగా వడ్డించండి",
      imageUrl: "ఆహారం ఫోటో లింక్ (ఐచ్ఛికం)",
      imageUrlPl: "https://images.unsplash.com/...",
      email: "ఇమెయిల్ చిరునామా",
      password: "పాస్‌వర్డ్",
      phone: "మొబైల్ సంఖ్య",
      fullName: "పూర్తి పేరు / సంస్థ పేరు",
      ngoReg: "NGO రిజిస్ట్రేషన్ నంబర్",
      docUpload: "రిజిస్ట్రేషన్ పత్రాలు (PDF/Image) అప్‌లోడ్ చెయ్యి",
      roleSelect: "మీ అకౌంట్ రకం ఎంచుకోండి"
    },
    dashboard: {
      donorTitle: "దాత కంట్రోల్ డాష్‌బోర్డ్",
      ngoTitle: "NGO క్లెయిమ్ డాష్‌బోర్డ్",
      adminTitle: "గ్లోబల్ అడ్మిన్ ప్యానెల్",
      totalDonations: "మొత్తం పంపిన ఆహారం",
      activeDonations: "ప్రస్తుత ఆహార ప్రకటనలు",
      completedPickups: "పూర్తయిన పికప్‌లు",
      pendingClaims: "వేచి ఉన్న క్లెయిమ్‌లు",
      aiRec: "ఫుడ్‌బ్రిడ్జ్ AI అంచనా సూచన",
      aiBanner: "ఈ రాత్రి హైదరాబాద్‌లో వివాహాల ట్రెండ్స్ ప్రకారం, రాత్రి 9 నుండి 11 గంటల మధ్య రాత్రి వండిన ఆహార వృధా 15% పెరిగే అవకాశం ఉంది. వేగవంతమైన సేకరణ కోసం సిద్ధంగా ఉండండి.",
      systemUsers: "నమోదిత వినియోగదారులు",
      ngoApprovals: "పెండింగ్‌లో ఉన్న NGO దరఖాస్తులు",
      reportsGenerated: "నివేదికలు సిద్ధం చేయబడ్డాయి",
      urgencies: "అత్యవసర విపత్తు ఆహార సహాయం"
    },
    faq: {
      title: "తరచుగా అడిగే ప్రశ్నలు (FAQ)",
      subtitle: "ఆహార భద్రత మరియు వలంటీర్ల పంపిణీకి సంబంధించిన సమాచారం.",
      q1: "భోజన భద్రత ఎలా నిర్ధారిస్తారు?",
      a1: "దాతలు కచ్చితంగా పరిశుభ్రమైన ప్రమాణాలు పాటించాలి. పికప్ చేసే ముందే ఆహార నాణ్యతను తనిఖీ చేస్తాము.",
      q2: "రవాణాను ఎవరు చూసుకుంటారు?",
      a2: "నమోదైన NGO వలంటీర్లు జీపీఎస్ ఆధారిత వాహనాల ద్వారా ఆహారాన్ని వేగంగా సేకరించి పంపిణీ కేంద్రాలకు తరలిస్తారు.",
      q3: "నిజమైన NGO అని ఎలా గుర్తిస్తారు?",
      a3: "అడ్మిన్ బృందం ప్రభుత్వ రిజిస్ట్రేషన్ పత్రాలను మాన్యువల్‌గా తనిఖీ చేసి ఆమోదించిన తర్వాతే NGO భాగస్వామ్యం లభిస్తుంది.",
      q4: "పర్యావరణానికి ఏమైనా మేలు జరుగుతుందా?",
      a4: "అవును! ఆహారం చెత్తకుప్పల్లో కుళ్ళిపోకుండా కాపాడటం ద్వారా మీథేన్ వాయువులు తగ్గి, గ్రీన్ హౌస్ ప్రభావం తగ్గుతుంది."
    },
    tracking: {
      title: "లైవ్ లొకేషన్ ట్రాకింగ్",
      driver: "వలంటీర్ డ్రైవర్ సమాచారం",
      notClaimed: "సమీప NGOల క్లెయిమ్ కోసం ఎదురుచూస్తోంది...",
      claimed: "NGO ద్వారా ఆమోదించబడింది",
      inTransit: "వాహనం వంటశాల వైపు వస్తోంది",
      arrived: "వాహనం చేరుకుంది. ఆహారాన్ని ప్యాక్ చేస్తున్నారు.",
      delivered: "సహాయ కేంద్రానికి సురక్షితంగా చేరింది",
      eta: "అంచనా సమయం (ETA)"
    },
    impact: {
      title: "పర్యావరణ మరియు సామాజిక ప్రభావం",
      mealsServedText: "వృధా కాకుండా సురక్షితంగా అందించిన పోషక సమృద్ధిగల భోజనాలు.",
      savedGramsText: "చెత్తకుప్పల పాలవకుండా రక్షించిన టన్నుల ఆహారం.",
      carbonReduct: "నివారించిన మీథేన్ వాయువు విడుదల",
      co2e: "పర్యావరణ కార్బన్ గ్యాస్ నివారణ నిష్పత్తి."
    },
    leaderboard: {
      title: "ఆహార దాతల లీడర్‌బోర్డ్",
      subtitle: "లాభాలకు అతీతంగా ఆకలితో ఉన్న లోకాన్ని పోషిస్తున్న గొప్ప మనసుల సమూహం.",
      topDonor: "అత్యధిక దానం చేసిన దాతలు",
      topNGOs: "అగ్ర పంపిణీ NGOలు",
      rank: "ర్యాంక్",
      name: "దాత/సంస్థ పేరు",
      points: "కర్మ పాయింట్లు",
      donations: "దానాలు",
      badges: "సాధించిన బ్యాడ్జీలు"
    },
    notifications: {
      newAlert: "అత్యవసరం: సెక్టార్ 5 లో 100 మందికి సరిపడా వివాహ భోజనం ఉంది! సమీప NGOలు క్లెయిమ్ చేసుకోగలరు.",
      verifiedMsg: "మీ స్వచ్ఛంద సంస్థ పత్రాలు అడ్మిన్ బృందం చేత విజయవంతంగా ధృవీకరించబడ్డాయి.",
      successPost: "ఆహార ప్రకటన విజయవంతంగా పోస్ట్ చేయబడింది! ఇది సమీపంలోని వలంటీర్లకి కనిపిస్తుంది.",
      title: "కమ్యూనికేషన్స్ సమాచార బోర్డు"
    },
    toast: {
      success: "సమాచారం విజయవంతంగా అప్‌డేట్ చేయబడింది!",
      error: "దయచేసి సరైన సమాచారం ఇవ్వండి.",
      demoMessage: "సాండ్‌బాక్స్ సిమ్యులేషన్ సమర్పించబడింది."
    }
  },
  hi: {
    brand: "FoodBridge",
    slogan: "अधिशेष भोजन को भूखे पेटों से जोड़ना",
    nav: {
      home: "होम",
      about: "हमारे बारे में",
      donate: "भोजन दान करें",
      listings: "उपलब्ध भोजन",
      dashboard: "डैशबोर्ड",
      leaderboard: "लीडरबोर्ड",
      impact: "प्रभाव विश्लेषण",
      contact: "संपर्क करें",
      faq: "अक्सर पूछे जाने वाले प्रश्न",
      login: "लॉगिन",
      signup: "साइन अप",
      logout: "लॉगआउट",
      pickups: "पिकअप इतिहास",
      map: "लाइव नक्शा"
    },
    hero: {
      title: "बचाएं अतिरिक्त भोजन, भरें भूखों का पेट",
      subtitle: "एक डिजिटल सेतु जो स्थानीय दाताओं, होटल, कैटरर्स और रेस्तरां को सीधे सत्यापित एनजीओ (NGOs) से जोड़ता है ताकि भोजन की बर्बादी को रोका जा सके।",
      ctaStart: "अधिशेष भोजन दान करना शुरू करें",
      ctaClaim: "उपलब्ध भोजन का दावा करें",
      activeDonors: "सत्यापित दाता",
      registeredNgos: "भागीदार एनजीओ",
      mealsServed: "सफलतापूर्वक खिलाया भोजन",
      wasteReduced: "रोका गया भोजन कचरा"
    },
    stats: {
      mealsServedVal: "15,280+",
      wasteReducedVal: "6,410 किलोग्राम",
      activeNgosVal: "180+",
      carbonSavedVal: "11.2 टन",
      foodSavedTitle: "आज बचाया गया भोजन",
      foodSavedSub: "समय पर वालंटियर पिकअप आज",
      kgText: "किलोग्राम पौष्टिक भोजन वितरित किया गया",
    },
    features: {
      title: "क्यों चुनें FoodBridge?",
      subtitle: "हमारी विशेषताएं अतिरिक्त भोजन की पुनर्प्राप्ति के लिए एक सुरक्षित और कुशल पारिस्थितिकी तंत्र बनाती हैं।",
      item1Title: "तत्काल लॉजिस्टिक्स",
      item1Desc: "जैसे ही कोई दाता भोजन पोस्ट करता है, पास के सत्यापित गैर सरकारी संगठनों (NGO) को तुरंत सूचित किया जाता है।",
      item2Title: "डिजिटल सत्यापन",
      item2Desc: "सुरक्षा मानकों को बनाए रखने के लिए एनजीओ अपने सरकारी पंजीकरण दस्तावेज अपलोड करते हैं।",
      item3Title: "लाइव यात्रा ट्रैकिंग",
      item3Desc: "दाता की रसोई से जरूरतमंद लोगों तक वालंटियर वाहन को लाइव मैप पर ट्रैक करें।",
      item4Title: "गेमिफाइड लीडरबोर्ड",
      item4Desc: "समाज सेवी रसोइयों और स्वयंसेवकों को पदक, प्रमाण पत्र और कर्म अंक दिए जाते हैं।"
    },
    buttons: {
      submit: "विवरण सबमिट करें",
      cancel: "रद्द करें",
      register: "अभी पंजीकरण करें",
      claim: "दावा करें",
      track: "ट्रैक करें",
      approve: "आवेदन स्वीकार करें",
      reject: "आवेदन अस्वीकार करें",
      viewAll: "सभी देखें",
      verified: "सत्यापित भागीदार",
      pending: "मंजूरी लंबित",
      complete: "पिकअप पूरा हुआ",
      loginGoogle: "गूगल के साथ लॉगिन करें",
      backToHome: "मुखपृष्ठ पर जाएँ",
      toggleFilters: "फ़िल्टर बदलें"
    },
    roles: {
      individual: "व्यक्तिगत दाता",
      restaurant: "रेस्तरां मालिक",
      hotel: "हॉटेल / बैंक्वेट समन्वयक",
      caterer: "कैटरिंग तथा शादी शेफ",
      ngo: "NGO प्रतिनिधि",
      admin: "प्रणाली व्यवस्थापक"
    },
    categories: {
      cooked: "ताजा पका हुआ भोजन",
      raw: "कच्ची सब्जियां और अनाज",
      packaged: "पैकेज्ड स्नैक्स किट",
      dry: "सूखा राशन और किराना",
      beverage: "पेय पदार्थ और डेयरी"
    },
    form: {
      foodTitle: "भोजन दान का शीर्षक",
      foodTitlePl: "जैसे: पके हुए चावल और दाल, बचे हुए केक",
      category: "भोजन की श्रेणी",
      quantity: "मात्रा / सर्विंग्स",
      quantityPl: "जैसे: 50 लोगों का भोजन या 10 किलोग्राम",
      expiry: "कितने घंटों के भीतर उपयोग योग्य (घंटे)",
      address: "पिकअप का पता",
      addressPl: "सेक्टर 4, मेन मार्केट गली...",
      instructions: "सुरक्षा / हैंडलिंग निर्देश",
      instructionsPl: "ठंडा रखें, गर्म परोसें, बर्तनों का ध्यान रखें",
      imageUrl: "भोजन की तस्वीर (वैकल्पिक)",
      imageUrlPl: "https://images.unsplash.com/...",
      email: "इमेल पता",
      password: "पासवर्ड",
      phone: "मोबाइल नंबर",
      fullName: "पूरा नाम / संगठन का नाम",
      ngoReg: "NGO पंजीकरण नंबर",
      docUpload: "पंजीकरण दस्तावेज (PDF) अपलोड करें",
      roleSelect: "खाता भूमिका का चयन करें"
    },
    dashboard: {
      donorTitle: "दाता नियंत्रण डैशबोर्ड",
      ngoTitle: "NGO दावा डैशबोर्ड",
      adminTitle: "वैश्विक व्यवस्थापक पैनल",
      totalDonations: "कुल वितरित भोजन",
      activeDonations: "सक्रिय भोजन सूची",
      completedPickups: "पूरे किए गए पिकअप",
      pendingClaims: "लंबित दावे",
      aiRec: "FoodBridge AI भविष्य कहनेवाला सुझाव",
      aiBanner: "आज रात स्थानीय विवाह समारोहों के रुझानों के आधार पर, रात 9 से 11 बजे के बीच पके हुए चावल का अधिशेष 15% बढ़ने का अनुमान है। त्वरित पिकअप दल तैयार हैं।",
      systemUsers: "पंजीकृत उपयोगकर्ता",
      ngoApprovals: "लंबित NGO आवेदन",
      reportsGenerated: "पर्यावरण रिपोर्ट तैयार",
      urgencies: "आपातकालीन खाद्य राहत अनुरोध"
    },
    faq: {
      title: "अक्सर पूछे जाने वाले सवाल",
      subtitle: "सुरक्षा मानकों और वालंटियर पिकअप के बारें में सब कुछ जानें।",
      q1: "खाद्य सुरक्षा कैसे सुनिश्चित की जाती है?",
      a1: "सभी दाताओं को सफाई मानकों का पालन करना होता है। पका हुआ खाना एक तय समय सीमा और तापमान नियंत्रण के बीच वितरित होता है।",
      q2: "पिकअप और परिवहन कौन संभालता है?",
      a2: "पंजीकृत स्वयंसेवक और पास के एनजीओ वाहन जीपीएस ट्रैकिंग का उपयोग करके भोजन समय पर कलेक्ट करते हैं।",
      q3: "एनजीओ की सत्यता की जांच कैसे होती है?",
      a3: "सिस्टम एडमिन एनजीओ के सरकारी पंजीकरण दस्तावेजों की पुष्टि के बाद ही उन्हें सक्रिय होने की अनुमति देते हैं।",
      q4: "क्या इससे पर्यावरण को फायदा होता है?",
      a4: "हां! जैविक कचरे को लैंडफिल में सड़ने से बचाकर हम मीथेन और कार्बन उत्सर्जन को काफी कम कर देते हैं।"
    },
    tracking: {
      title: "लाइव जीपीएस ट्रैकिंग",
      driver: "आवंटित वालंटियर ड्राइवर",
      notClaimed: "किसी एनजीओ के दावे की प्रतीक्षा में...",
      claimed: "एनजीओ द्वारा स्वीकृत",
      inTransit: "वाहन रसोई स्थान की ओर जा रहा है",
      arrived: "ड्राइवर पहुंच गया है। भोजन पैक किया जा रहा है।",
      delivered: "सुरक्षित रूप से आश्रय गृह में वितरित",
      eta: "अनुमानित समय (ETA)"
    },
    impact: {
      title: "पर्यावरणीय और सामाजिक प्रभाव रिपोर्ट",
      mealsServedText: "सुरक्षित भोजन सर्विंग्स जो जरूरतमंद लोगों तक पहुंचाई गईं।",
      savedGramsText: "लैंडफिल में जाने से बचाया गया भोजन टन में।",
      carbonReduct: "रोकी गई ग्रीनहाउस गैसें",
      co2e: "पर्यावरणीय मीथेन और कार्बन डाईऑक्साइड की रोकथाम।"
    },
    leaderboard: {
      title: "खाद्य दान वीर लीडरबोर्ड",
      subtitle: "उन लोगों और संस्थानों को सलाम जो मुनाफे से ऊपर उठकर मानवता की सेवा करते हैं।",
      topDonor: "शीर्ष खाद्य दाता",
      topNGOs: "अग्रणी वितरण एनजीओ",
      rank: "रैंक",
      name: "दाता/एनजीओ",
      points: "कर्म अंक",
      donations: "दान संख्या",
      badges: "योगदान पदक"
    },
    notifications: {
      newAlert: "आपातकालीन: सेक्टर 5 में 100 लोगों का अतिरिक्त भोजन उपलब्ध है! नजदीकी एनजीओ कृपया दावा करें।",
      verifiedMsg: "आपके एनजीओ दस्तावेज सत्यापित हो गए हैं। आपका खाता अब सक्रिय है।",
      successPost: "भोजन दान सफलतापूर्वक पोस्ट किया गया! यह नजदीकी एनजीओ को दिखाई दे रहा है।",
      title: "संचार सूचना पटल"
    },
    toast: {
      success: "तथ्य सफलतापूर्वक अपडेट हो गए!",
      error: "कृपया इनपुट की समीक्षा करें।",
      demoMessage: "सैंडबॉक्स सिमुलेशन जनरेट हुआ।"
    }
  },
  ta: {
    brand: "ஃபுட்பிரிட்ஜ்",
    slogan: "உபரி உணவை பசியுள்ள தட்டுகளோடு இணைக்கிறது",
    nav: {
      home: "முகப்பு",
      about: "எங்களைப் பற்றி",
      donate: "உணவு தானம்",
      listings: "கிடைக்கும் உணவு",
      dashboard: "டாஷ்போர்டு",
      leaderboard: "முன்னணி பட்டியல்",
      impact: "தாக்க பகுப்பாய்வு",
      contact: "தொடர்பு கொள்ள",
      faq: "கேள்வி-பதில்",
      login: "உள்நுழைக",
      signup: "பதிவு செய்க",
      logout: "வெளியேறுக",
      pickups: "பிக்கப்கள்",
      map: "லைவ் வரைபடம்"
    },
    hero: {
      title: "உபரி உணவை மீட்டு, பசியை ஒழிப்போம்",
      subtitle: "உள்ளூர் கொடையாளர்கள், உணவகங்கள் மற்றும் கல்யாண கூடங்களை சரிபார்க்கப்பட்ட அரசு சாரா தொண்டு நிறுவனங்களுடன் (NGOs) நேரடியாக இணைக்கும் டிஜிட்டல் பாலம்.",
      ctaStart: "உபரி உணவு தானம் செய்யத் தொடங்குங்கள்",
      ctaClaim: "உணவை பெற விண்ணப்பியுங்கள்",
      activeDonors: "சரிபார்க்கப்பட்ட கொடையாளர்கள்",
      registeredNgos: "பங்களிக்கும் தொண்டு நிறுவனங்கள்",
      mealsServed: "வழங்கப்பட்ட வெற்றிகரமான உணவுகள்",
      wasteReduced: "தடுக்கப்பட்ட உணவு கழிவு"
    },
    stats: {
      mealsServedVal: "15,280+",
      wasteReducedVal: "6,410 கிலோ",
      activeNgosVal: "180+",
      carbonSavedVal: "11.2 டன்கள்",
      foodSavedTitle: "இன்று பாதுகாக்கப்பட்ட உணவு",
      foodSavedSub: "இன்று நடந்த தொண்டர்களின் பிக்கப்",
      kgText: "கிலோ சத்தான உணவு விநியோகம் செய்யப்பட்டது",
    },
    features: {
      title: "ஏன் ஃபுட்பிரிட்ஜ்?",
      subtitle: "எங்கள் தொழில்நுட்பம் உபரி உணவை எளிதாக கொண்டு சேர்க்கும் சிறந்த தளமாகும்.",
      item1Title: "நிகழ்நேர தளவாடங்கள்",
      item1Desc: "பயனர் உணவை பதிவிட்டவுடன் அருகில் உள்ள சரிபார்க்கப்பட்ட தொண்டு நிறுவனத்திற்கு உடனே செய்தி செல்லும்.",
      item2Title: "டிஜிட்டல் சரிபார்ப்பு",
      item2Desc: "தொண்டு நிறுவனங்கள் தங்களின் அரசு சான்றிதழ்களை சமர்ப்பிப்பதன் மூலம் நம்பகத்தன்மை உறுதி செய்யப்படுகிறது.",
      item3Title: "லைவ் பயண வரைபடம்",
      item3Desc: "உணவு சமையல் அறையில் இருந்து விநியோக கூடம் வரை வாகன சவாரி வரைபடத்தில் கண்காணிக்கப்படுகிறது.",
      item4Title: "தாக்க லீடர்போர்டு",
      item4Desc: "ஈகை குணம் கொண்ட சமையற்கலைஞர்கள் மற்றும் சமூக தன்னார்வலர்களுக்கு புள்ளிகள் மற்றும் பதக்கங்கள் வழங்கப்படும்."
    },
    buttons: {
      submit: "விவரங்களை சமர்ப்பி",
      cancel: "ரத்து செய்",
      register: "இப்போதே பதிவு செய்",
      claim: "பெறுக",
      track: "டிராக் செய்",
      approve: "அனுமதி அளி",
      reject: "நிராகரி",
      viewAll: "அனைத்தும் காண்க",
      verified: "சரிபார்க்கப்பட்ட பங்குதாரர்",
      pending: "அனுமதிக்கு காத்திருக்கிறது",
      complete: "பிக்கப் முடிந்தது",
      loginGoogle: "கூகிள் மூலம் உள்நுழைக",
      backToHome: "முகப்பிற்கு செல்லவும்",
      toggleFilters: "வடிகட்டிகளை மாற்றவும்"
    },
    roles: {
      individual: "தனிநபர் கொடையாளர்",
      restaurant: "உணவக உரிமையாளர்",
      hotel: "ஹோட்டல் மேலாளர்",
      caterer: "கேட்டரிங் சமையல்காரர்",
      ngo: "அரசு சாரா தொண்டு நிறுவனம் (NGO)",
      admin: "கணினி நிர்வாகி"
    },
    categories: {
      cooked: "சூடான சமைத்த உணவு",
      raw: "பச்சை காய்கறிகள் & தானியங்கள்",
      packaged: "தயாரிக்கப்பட்ட சிற்றுண்டிகள்",
      dry: "உலர் மளிகைப் பொருட்கள்",
      beverage: "பானங்கள் & பால் பொருட்கள்"
    },
    form: {
      foodTitle: "உணவு பொருளின் பெயர்",
      foodTitlePl: "எ.கா: சூடான சாதம், மீதமுள்ள இனிப்புகள்",
      category: "உணவு வகை",
      quantity: "அளவு / உணவுகள் எண்ணிக்கை",
      quantityPl: "எ.கா: 50 பேருக்கான உணவு அல்லது 10 கிலோ",
      expiry: "எத்தனை மணி நேரத்திற்குள் உண்ண வேண்டும் (மணிநேരം)",
      address: "பிக்கப் முகவரி",
      addressPl: "செக்டார் 4, மெயின் ரோடு சந்து...",
      instructions: "பாதுகாப்பு வழிமுறைகள்",
      instructionsPl: "குளிர்சாதன பெட்டியில் வைக்கவும், சூடாக பரிமாறவும்",
      imageUrl: "உணவு புகைப்படம் (விருப்பமுண்டெனில்)",
      imageUrlPl: "https://images.unsplash.com/...",
      email: "மின்னஞ்சல் முகவரி",
      password: "கடவுச்சொல்",
      phone: "கைபேசி எண்",
      fullName: "முழு பெயர் / நிறுவன பெயர்",
      ngoReg: "NGO பதிவு எண்",
      docUpload: "பதிவு ஆவணங்களை அப்லோட் செய் (PDF)",
      roleSelect: "கணக்கு வகையை தேர்ந்தெடுக்கவும்"
    },
    dashboard: {
      donorTitle: "கொடையாளர் கட்டுப்பாட்டு பலகை",
      ngoTitle: "NGO கோரிக்கை பலகை",
      adminTitle: "நிர்வாகி கட்டுப்பாட்டு பலகை",
      totalDonations: "மொத்த தானங்கள்",
      activeDonations: "செயலில் உள்ள உணவு விளம்பரங்கள்",
      completedPickups: "முடிந்த பிக்கப்புகள்",
      pendingClaims: "காத்திருக்கும் கோரிக்கைகள்",
      aiRec: "ஃபுட்பிரிட்ஜ் AI கணிப்பு ஆலோசனை",
      aiBanner: "இன்று இரவு சென்னையில் திருமண நிகழ்வுகளின் அடிப்படையில், இரவு 9 முதல் 11 மணிக்குள் உணவு உபரி 15% அதிகரிக்க வாய்ப்புள்ளது. தன்னார்வலர் குழுக்கள் தயாராக இருக்க அறிவுறுத்தப்படுகிறது.",
      systemUsers: "பதிவு செய்யப்பட்ட பயனர்கள்",
      ngoApprovals: "நிலுவையில் உள்ள NGO விண்ணப்பங்கள்",
      reportsGenerated: "சுற்றுச்சூழல் அறிக்கைகள் தயார்",
      urgencies: "அவசர உணவு உதவி கோரிக்கைகள்"
    },
    faq: {
      title: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
      subtitle: "உணவு பாதுகாப்பு மற்றும் தன்னார்வலர் விநியோக வழிமுறைகள்.",
      q1: "உணவு பாதுகாப்பு எவ்வாறு பராமரிக்கப்படுகிறது?",
      a1: "அனைத்து கொடையாளர்களும் தூய்மை தரநிலைகளை கடைபிடிக்க வேண்டும். உணவு தகுந்த கால அவகாசத்திற்குள் கொண்டு சேர்க்கப்படும்.",
      q2: "போக்குவரத்தை யார் மேற்கொள்வது?",
      a2: "பதிவு செய்த தன்னார்வலர்கள் தங்களது ஜிபிஎஸ் பொருத்தப்பட்ட வாகனங்கள் மூலம் உணவை விரைவாக சேகரித்து ஆதரவற்றோர் இல்லங்களுக்கு கொண்டு சேர்ப்பார்கள்.",
      q3: "தொண்டு நிறுவனங்களின் நம்பகத்தன்மை எவ்வாறு சரிபார்க்கப்படுகிறது?",
      a3: "நிர்வாக குழு அவர்களின் அரசு சான்றிதழ்களை சரிபார்த்து உறுதி செய்த பிறகே அவர்களுக்கு அனுமதி வழங்கப்படுகிறது.",
      q4: "இதனால் சூழலுக்கு ஏதேனும் பயனுண்டா?",
      a4: "ஆம்! உணவு கழிவுகள் குப்பைகளில் மட்குவதை தடுப்பதன் மூலம் மீத்தேன் வாயுக்கள் தடுக்கப்பட்டு கார்பன் சுழற்சி சீராகிறது."
    },
    tracking: {
      title: "நேரடி வரைபட கண்காணிப்பு",
      driver: "பணியமர்த்தப்பட்ட தன்னார்வலர் ஓட்டுநர்",
      notClaimed: "நெருங்கிய NGOக்களின் கோரிக்கைக்காக காத்திருக்கிறது...",
      claimed: "தொண்டு நிறுவனத்தால் ஏற்கப்பட்டது",
      inTransit: "வாகனம் சமையலறையை நோக்கி வந்து கொண்டிருக்கிறது",
      arrived: "வாகனம் வந்தடைந்தது. உணவு பேக் செய்யப்படுகிறது.",
      delivered: "ஆதரவற்றோர் இல்லத்திற்கு பாதுகாப்பாக சேர்ந்தது",
      eta: "மதிப்பிடப்பட்ட வருகை நேரம் (ETA)"
    },
    impact: {
      title: "சுற்றுச்சூழல் மற்றும் சமூக தாக்கம்",
      mealsServedText: "பசியாளிகளுக்கு வழங்கப்பட்ட உயர்தர சத்தான உணவுகள்.",
      savedGramsText: "குப்பைத்தொட்டிகளில் கொட்டப்படாமல் மீட்கப்பட்ட டன் அளவிலான உணவுகள்.",
      carbonReduct: "தவிர்க்கப்பட்ட பசுமை இல்ல வாயு உமிழ்வு",
      co2e: "கார்பன் உமிழ்வு தடுப்பு விகிதம் கணக்கீடு."
    },
    leaderboard: {
      title: "சிறந்த கொடையாளர்கள் முன்னணி பட்டியல்",
      subtitle: "லாப நோக்கமின்றி பசித்த வயிறுகளை அரவணைக்கும் மனிதநேய உள்ளங்கள்.",
      topDonor: "சிறந்த கொடையாளர்கள்",
      topNGOs: "சிறந்த விநியோக தொண்டு நிறுவனங்கள்",
      rank: "இடம்",
      name: "பெயர் / நிறுவனம்",
      points: "நன்மை புள்ளிகள்",
      donations: "பங்கிட்ட횟수",
      badges: "வெற்றி சின்னங்கள்"
    },
    notifications: {
      newAlert: "அவசரம்: செக்டார் 5 ல் 100 பேருக்கு தேவையான திருமண உணவு உள்ளது! அருகில் உள்ள NGOக்கள் பெறுக.",
      verifiedMsg: "உங்களின் தொண்டு நிறுவன ஆவணங்கள் வெற்றிகரமாக சரிபார்க்கப்பட்டன.",
      successPost: "உணவு தானம் வெற்றிகரமாக பதியப்பட்டது! அருகில் உள்ள தொண்டர்களுக்கு இது தெரியும்.",
      title: "தொடர்பு அறிவிப்பு பலகை"
    },
    toast: {
      success: "விவரங்கள் வெற்றிகரமாக புதுப்பிக்கப்பட்டன!",
      error: "தயவுசெய்து உள்ளீடுகளை சரிபார்க்கவும்.",
      demoMessage: "சாண்ட்பாக்ஸ் சோதனை முடிவு உருவாக்கப்பட்டது."
    }
  },
  kn: {
    brand: "FoodBridge",
    slogan: "ಹೆಚ್ಚುವರಿ ಆಹಾರವನ್ನು ಹಸಿದ ಹೊಟ್ಟೆಗಳಿಗೆ ತಲುಪಿಸುವುದು",
    nav: {
      home: "ಮುಖಪುಟ",
      about: "ನಮ್ಮ ಬಗ್ಗೆ",
      donate: "ಆಹಾರ ದಾನ",
      listings: "ಲಭ್ಯವಿರುವ ಆಹಾರ",
      dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      leaderboard: "ಲೀಡರ್‌ಬೋರ್ಡ್",
      impact: "ಸಾಮಾಜಿಕ ಪ್ರಭಾವ",
      contact: "ಸಂಪರ್ಕಿಸಿ",
      faq: "ಪ್ರಶ್ನೋತ್ತರಗಳು",
      login: "ಲಾಗಿನ್",
      signup: "ಸೈನ್ ಅಪ್",
      logout: "ಲಾಗ್ ಔಟ್",
      pickups: "ಪಿಕಪ್‌ಗಳು",
      map: "ಲೈವ್ ನಕ್ಷೆ"
    },
    hero: {
      title: "ಹೆಚ್ಚುವರಿ ಆಹಾರ ಉಳಿಸಿ, ಹಸಿದ ಹೊಟ್ಟೆ ತುಂಬಿಸಿ",
      subtitle: "ಸ್ಥಳೀಯ ದಾತರು, ಹೋಟೆಲ್‌ಗಳು ಮತ್ತು ಕ್ಯಾಟರರ್‌ಗಳನ್ನು ನೇರವಾಗಿ ನೋಂದಾಯಿತ ಎನ್‌ಜಿಓಗಳೊಂದಿಗೆ (NGOs) ಸಂಪರ್ಕಿಸುವ ಡಿಜಿಟಲ್ ಸೇತುವೆ.",
      ctaStart: "ಹೆಚ್ಚುವರಿ ಆಹಾರ ದಾನ ಮಾಡಿ",
      ctaClaim: "ಆಹಾರವನ್ನು ಕ್ಲೈಮ್ ಮಾಡಿ",
      activeDonors: "ದೃಢೀಕೃತ ದಾತರು",
      registeredNgos: "ಪಾಲುದಾರ ಸಂಸ್ಥೆಗಳು",
      mealsServed: "ಯಶಸ್ವಿಯಾಗಿ ವಿತರಿಸಿದ ಊಟ",
      wasteReduced: "ತಡೆಗಟ್ಟಿದ ಆಹಾರ ವ್ಯರ್ಥ"
    },
    stats: {
      mealsServedVal: "15,280+",
      wasteReducedVal: "6,410 ಕೆಜಿ",
      activeNgosVal: "180+",
      carbonSavedVal: "11.2 ಟನ್",
      foodSavedTitle: "ಇಂದು ಉಳಿಸಿದ ಆಹಾರ",
      foodSavedSub: "ಇಂದಿನ ಸ್ವಯಂಸೇವಕ ಪಿಕಪ್‌ಗಳು",
      kgText: "ಕೆಜಿ ಪೌಷ್ಟಿಕ ಆಹಾರ ವಿತರಿಸಲಾಗಿದೆ",
    },
    features: {
      title: "ಏಕೆ FoodBridge?",
      subtitle: "ಹೆಚ್ಚುವರಿ ಆಹಾರವನ್ನು ಮರುಪಡೆಯಲು ನಮ್ಮ ತತ್ವ ಅತ್ಯಂತ ಸುಲಭ ಮತ್ತು ಸುರಕ್ಷಿತವಾಗಿದೆ.",
      item1Title: "ನೈಜ-ಸಮಯದ ಸಾರಿಗೆ",
      item1Desc: "ದಾನಿಗಳು ಆಹಾರದ ಮಾಹಿತಿ ಪ್ರಕಟಿಸಿದ ತಕ್ಷಣವೇ ಹತ್ತಿರದ ಸ್ವಯಂಸೇವಕ ಸಂಘಟನೆಗಳಿಗೆ ತಿಳಿಸಲಾಗುತ್ತದೆ.",
      item2Title: "ಡಿಜಿಟಲ್ ಪರಿಶೀಲನೆ",
      item2Desc: "ಎನ್‌ಜಿಓಗಳು ತಮ್ಮ ಸರ್ಕಾರಿ ಪ್ರಮಾಣಪತ್ರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡುವ ಮೂಲಕ ಭದ್ರತೆಯನ್ನು ಖಚಿತಪಡಿಸಲಾಗುತ್ತದೆ.",
      item3Title: "ಲೈವ್ ನಕ್ಷೆ ವೀಕ್ಷಣೆ",
      item3Desc: "ದಾನಿಗಳ ಅಡುಗೆಮನೆಯಿಂದ ವಿತರಣಾ ಕೇಂದ್ರದವರೆಗೆ ವಾಹನದ ಚಲನೆಯನ್ನು ನಕ್ಷೆಯಲ್ಲಿ ಲೈವ್ ನೋಡಬಹುದು.",
      item4Title: "ಗೇಮಿಫೈಡ್ ಲೀಡರ್‌ಬೋರ್ಡ್",
      item4Desc: "ಉದಾರ ಆಹಾರ ದಾನಿಗಳಿಗೆ ಮತ್ತು ಸಕ್ರಿಯ ಸ್ವಯಂಸೇವಕರಿಗೆ ಕರ್ಮ ಪಾಯಿಂಟ್‌ಗಳು ಮತ್ತು ಶೌರ್ಯ ಪದಕಗಳು ಸಿಗುತ್ತವೆ."
    },
    buttons: {
      submit: "ವಿವರಗಳನ್ನು ಸಲ್ಲಿಸಿ",
      cancel: "ರದ್ದುಮಾಡಿ",
      register: "ಈಗಲೇ ನೋಂದಾಯಿಸಿ",
      claim: "ಕ್ಲೈಮ್ ಮಾಡಿ",
      track: "ಟ್ರ್ಯಾಕ್ ಮಾಡಿ",
      approve: "ಅನುಮೋದಿಸಿ",
      reject: "ತಿರಸ್ಕರಿಸಿ",
      viewAll: "ಎಲ್ಲವನ್ನೂ ನೋಡಿ",
      verified: "ಪರಿಶೀಲಿಸಿದ ಪಾಲುದಾರ",
      pending: "ಅನುಮೋದನೆ ಬಾಕಿ ಇದೆ",
      complete: "ಪಿಕಪ್ ಪೂರ್ಣಗೊಳಿಸಿ",
      loginGoogle: "ಗೂಗಲ್‌ನೊಂದಿಗೆ ಲಾಗಿನ್ ಮಾಡಿ",
      backToHome: "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
      toggleFilters: "ಫಿಲ್ಟರ್ಸ್‌ ಬದಲಾಯಿಸಿ"
    },
    roles: {
      individual: "ವೈಯಕ್ತಿಕ ದಾನಿ",
      restaurant: "ರೆಸ್ಟೋರೆಂಟ್ ಮಾಲೀಕರು",
      hotel: "ಹೋಟೆಲ್ ವ್ಯವಸ್ಥಾಪಕರು",
      caterer: "ಕ್ಯಾಟರಿಂಗ್ ಜವಾಬ್ದಾರರು",
      ngo: "NGO ಪ್ರತಿನಿಧಿ",
      admin: "ಸಿಸ್ಟಮ್ ಐಟಿ ಅಡ್ಮಿನ್"
    },
    categories: {
      cooked: "ಬಿಸಿ ಬಿಸಿ ತಯಾರಿಸಿದ ಊಟ",
      raw: "ಹಸಿ ತರಕಾರಿಗಳು ಮತ್ತು ಧಾನ್ಯಗಳು",
      packaged: "ಪ್ಯಾಕೆಟ್ ಮಾಡಿದ ತಿಂಡಿಗಳು",
      dry: "ಒಣ ದಿನಸಿ ಸಾಮಗ್ರಿಗಳು",
      beverage: "ಪಾನೀಯಗಳು ಮತ್ತು ಹಾಲಿನ ಉತ್ಪನ್ನ"
    },
    form: {
      foodTitle: "ಆಹಾರ ಕಾರ್ಗೋ ಶೀರ್ಷಿಕೆ",
      foodTitlePl: "ಉದಾ: ಬಿಸಿ ರೊಟ್ಟಿ ಮತ್ತು ಪಲ್ಯ, ಉಳಿದ ತಿಂಡಿಗಳು",
      category: "ಆಹಾರದ ವರ್ಗ",
      quantity: "ಪ್ರಮಾಣ / ಊಟಗಳ ಸಂಖ್ಯೆ",
      quantityPl: "ಉದಾ: 50 ಜನರಿಗೆ ಊಟ ಅಥವಾ 10 ಕೆಜಿ",
      expiry: "ಎಷ್ಟು ಗಂಟೆಯೊಳಗೆ ಸೇವಿಸಬೇಕು (ಗಂಟೆಗಳು)",
      address: "ಪಿಕಪ್ ಸ್ಥಳದ ವಿಳಾಸ",
      addressPl: "ಸೆಕ್ಟರ್ 4, ಬಸ್ ನಿಲ್ದಾಣದ ಬಳಿ...",
      instructions: "ನಿರ್ವಹಣಾ ಸೂಚನೆಗಳು",
      instructionsPl: "ತಂಪಾಗಿಡಿ, ಬಿಸಿಯಾಗಿ ಬಡಿಸಿ, ಬ್ಯಾಗ್ ತನ್ನಿ",
      imageUrl: "ಚಿತ್ರದ ಲಿಂಕ್ (ಐಚ್ಛಿಕ)",
      imageUrlPl: "https://images.unsplash.com/...",
      email: "ಇಮೇಲ್ ವಿಳಾಸ",
      password: "ಪಾಸ್‌ವರ್ಡ್",
      phone: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
      fullName: "ಪೂರ್ಣ ಹೆಸರು / ಸಂಸ್ಥೆಯ ಹೆಸರು",
      ngoReg: "NGO ನೋಂದಣಿ ಸಂಖ್ಯೆ",
      docUpload: "ನೋಂದಣಿ ಪತ್ರಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ (PDF)",
      roleSelect: "ನಿಮ್ಮ ಖಾತೆಯ ಪ್ರಕಾರ ಆರಿಸಿ"
    },
    dashboard: {
      donorTitle: "ದಾನಿ ನಿಯಂತ್ರಣ ಮಂಡಳಿ",
      ngoTitle: "NGO ಕ್ಲೈಮ್ ಮಾಡಬಹುದಾದ ಫಲಕ",
      adminTitle: "ಜಾಗತಿಕ ನಿರ್ವಹಣಾ ಮಂಡಳಿ",
      totalDonations: "ಒಟ್ಟು ಕಳುಹಿಸಿದ ಆಹಾರ",
      activeDonations: "ಸಕ್ರಿಯ ಆಹಾರ ಪ್ರಕಟಣೆಗಳು",
      completedPickups: "ಪೂರ್ಣಗೊಂಡ ಪಿಕಪ್‌ಗಳು",
      pendingClaims: "ಬಾಕಿ ಇರುವ ಕ್ಲೈಮ್‌ಗಳು",
      aiRec: "FoodBridge AI ಮುನ್ಸೂಚನೆ ವರದಿ",
      aiBanner: "ಇಂದು ರಾತ್ರಿ ಬೆಂಗಳೂರು ಮತ್ತು ಹೈದರಾಬಾದ್ ಮದುವೆ ಸಮಾರಂಭಗಳ ಆಧಾರದ ಮೇಲೆ, ಬಿಸಿ ತಯಾರಿಸಿದ ಅನ್ನದ ಪ್ರಮಾಣ 15% ಹೆಚ್ಚುವರಿ ಬೀಳುವ ಸಾಧ್ಯತೆಯಿದೆ. ವಲಂಟೀರ್ಸ್ ಸನ್ನದ್ಧ ರಾಗಿರಲು ಸೂಚಿಸಲಾಗಿದೆ.",
      systemUsers: "ನೋಂದಾಯಿತ ಬಳಕೆದಾರರು",
      ngoApprovals: "ಬಾಕಿ ಇರುವ ಅರ್ಜಿಗಳು",
      reportsGenerated: "Weekly ESG ಪರಿಸರ ವರದಿ ಸಿದ್ಧ",
      urgencies: "ತುರ್ತು ವಿಪತ್ತು ಪರಿಸ್ಥಿತಿಯ ಆಹಾರ ನೆರವು"
    },
    faq: {
      title: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
      subtitle: "ಆಹಾರದ ಸುರಕ್ಷತೆ ಮತ್ತು ಸ್ವಯಂಸೇವಕ ಲಾಜಿಸ್ಟಿಕ್ಸ್‌ನ ಸಂಪೂರ್ಣ ಮಾರ್ಗದರ್ಶಿ.",
      q1: "ಆಹಾರದ ಸುರಕ್ಷತೆಯನ್ನು ಖಚಿತಪಡಿಸುವುದು ಹೇಗೆ?",
      a1: "ಎಲ್ಲಾ ದಾನಿಗಳು ಸುರಕ್ಷಿತ ನಿಯಮಗಳನ್ನು ಪಾಲಿಸಬೇಕು. ತಾಪಮಾನ ಮತ್ತು ಅವಧಿ ಪರಿಶೀಲಿಸಿದ ಬಳಿಕವೇ ಆಹಾರ ತಲುಪಿಸಲಾಗುತ್ತದೆ.",
      q2: "ರವಾಣೆ ವ್ಯವಸ್ಥೆಯನ್ನು ಯಾರು ನೋಡಿಕೊಳ್ಳುತ್ತಾರೆ?",
      a2: "ನೋಂದಾಯಿತ ಎನ್‌ಜಿಓ ಕಾರ್ಯಕರ್ತರು ಜಿಪಿಎಸ್ ಆಯೋಜಿತ ವಾಹನ ಬಳಸಿಕೊಂಡು ನಿಗದಿತ ಸ್ಥಳಕ್ಕೆ ಹೋಗಿ ಆಹಾರವನ್ನು ವೇಗವಾಗಿ ಪಿಕಪ್ ಮಾಡುತ್ತಾರೆ.",
      q3: "ನಕಲಿ ಸಂಸ್ಥೆಗಳನ್ನು ತಡೆಯುವುದು ಹೇಗೆ?",
      a3: "ನಮ್ಮ ಅಡ್ಮಿನ್ ತಂಡವು ಎನ್‌ಜಿಓ ಸಲ್ಲಿಸಿದ ಸರ್ಕಾರಿ ರಿಜಿಸ್ಟ್ರೇಷನ್ ಪತ್ರಗಳನ್ನು ಕೂಲಂಕಷವಾಗಿ ಪರಿಶೀಲಿಸಿದ ಬಳಿಕವೇ ಲಾಗಿನ್ ಸೌಲಭ್ಯವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸುತ್ತದೆ.",
      q4: "ಇದರಿಂದ ಗ್ರೀನ್ ಹೌಸ್ ಎಫೆಕ್ಟ್ ಕಡಿಮೆಯಾಗುತ್ತದೆಯೇ?",
      a4: "ಖಂಡಿತವಾಗಿ! ಆಹಾರವು ಕೊಳೆತು ಮೀಥೇನ್ ಅನಿಲ ಉತ್ಪತ್ತಿಯಾಗುವುದನ್ನು ತಡೆಯುವುದರ ಮೂಲಕ ಗ್ಲೋಬಲ್ ವಾರ್ಮಿಂಗ್ ನಿಯಂತ್ರಿಸಬಹುದು."
    },
    tracking: {
      title: "ಲೈವ್ ಜಿಪಿಎಸ್ ಸಾರಿಗೆ ಟ್ರ್ಯಾಕಿಂಗ್",
      driver: "ವಿಶೇಷ ಸ್ವಯಂಸೇವಕ ಚಾಲಕ ಮಾಹಿತಿ",
      notClaimed: "ಹತ್ತಿರದ ಎನ್‌ಜಿಓ ಒಪ್ಪಿಗೆಗಾಗಿ ಕಾಯಲಾಗುತ್ತಿದೆ...",
      claimed: "ಎನ್‌ಜಿಓ ಒಪ್ಪ್ಪಿಗೆ ಪಡೆದಿದೆ",
      inTransit: "ವಾಹನವು ಹೋಟೆಲ್ ಸ್ಥಳದ ಕಡೆಗೆ ಚಲಿಸುತ್ತಿದೆ",
      arrived: "ವಾಹನ ತಲುಪಿದೆ. ಆಹಾರ ಪ್ಯಾಕ್ ಮಾಡಲಾಗುತ್ತಿದೆ.",
      delivered: "ಆಶ್ರಮ ನಿಲಯಕ್ಕೆ ಯಶಸ್ವಿಯಾಗಿ ತಲುಪಿಸಲಾಗಿದೆ",
      eta: "ಅಂದಾಜು ಸಮಯ (ETA)"
    },
    impact: {
      title: "ಪರಿಸರ ಮತ್ತು ಸಮಾಜದ ಪ್ರಭಾವ ಫಲಿತಾಂಶ",
      mealsServedText: "ಹಸಿದ ಜನರಿಗೆ ಉಣಬಡಿಸಿದ ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಬಿಸಿ ಊಟ.",
      savedGramsText: "ಕಸದ ತೊಟ್ಟಿ ಸೇರದೆ ಉಳಿಸಿದ ಬೃಹತ್ ಟನ್‌ ಆಹಾರ.",
      carbonReduct: "ತಡೆಗಟ್ಟಿದ ಹಸಿರುಮನೆ ಅನಿಲ ಬಿಡುಗಡೆ",
      co2e: "ಕಾರ್ಬನ್ ಡೈಆಕ್ಸೈಡ್ ನಿಗ್ರಹ ಮಟ್ಟದ ನಿಖರ ಗಣನೆ."
    },
    leaderboard: {
      title: "ಆಹಾರ ದಾನ ವೀರರ ಲೀಡರ್‌ಬೋರ್ಡ್",
      subtitle: "ವ್ಯವಹಾರ ಲಾಭಗಳಿಗಿಂತ ಮನುಕುಲದ ಬಡತನ ನೀಗಿಸಲು ಶ್ರಮಿಸುತ್ತಿರುವ ಉದಾರಿಗಳು.",
      topDonor: "ಅತ್ಯುತ್ತಮ ಆಹಾರ ದಾನಿಗಳು",
      topNGOs: "ಅತ್ಯುನ್ನತ ಸ್ವಯಂಸೇವಕ ಸಂಸ್ಥೆಗಳು",
      rank: "ಶ್ರೇಣಿ",
      name: "ದಾನಿ / ಸಂಸ್ಥೆಯ ಹೆಸರು",
      points: "ಕರ್ಮ ಪಾಯಿಂಟ್ಸ್",
      donations: "ದಾನಗಳು",
      badges: "ಗಳಿಸಿದ ಪದಕಗಳು"
    },
    notifications: {
      newAlert: "ತುರ್ತು: ಸೆಕ್ಟಾರ್ 5 ರಲ್ಲಿ 100 ಜನರಿಗೆ ಆಗುವಷ್ಟು ಮದುವೆ ಊಟ ಲಭ್ಯವಿದೆ! ಹತ್ತಿರದ NGOಗಳು ಇತ್ತ ಗಮನಿಸಿ.",
      verifiedMsg: "ನಿಮ್ಮ ಸಂಸ್ಥೆಯ ನೋಂದಣಿ ಪತ್ರಗಳನ್ನು ನಮ್ಮ ಅಡ್ಮಿನ್ ತಂಡವು ದೃಢೀಕರಿಸಿದೆ.",
      successPost: "ದಾನ ಯಶಸ್ವಿಯಾಗಿ ಪ್ರಕಟಿಸಲಾಗಿದೆ! ಹತ್ತಿರದ ಎನ್‌ಜಿಓ ಪ್ರತಿನಿಧಿಗಳಿಗೆ ಇದು ಗೋಚರಿಸುತ್ತದೆ.",
      title: "ಸಂಪರ್ಕ ಪ್ರಚಾರ ಫಲಕ"
    },
    toast: {
      success: "ವಿವರಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!",
      error: "ದಯವಿಟ್ಟು ನಮೂದುಗಳನ್ನು ಮತ್ತೊಮ್ಮೆ ಪರಿಶೀಲಿಸಿ.",
      demoMessage: "Sandbox ಪರೀಕ್ಷಾರ್ಥ ನಮೂದು ಸಿದ್ಧವಾಗಿದೆ."
    }
  }
};
