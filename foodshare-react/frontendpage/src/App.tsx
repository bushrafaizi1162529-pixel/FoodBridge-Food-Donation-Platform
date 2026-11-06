import React, { useState, useEffect } from 'react';
import { FoodBridgeProvider, useFoodBridge } from './context/FoodBridgeContext';
import { TRANSLATIONS } from './constants/translations';
import { Navbar } from './components/Navbar';
import { MapComponent } from './components/MapComponent';
import { AIChatbot } from './components/AIChatbot';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Registration } from './pages/Registration';
import { Donations } from './pages/Donations';
import { Dashboards } from './pages/Dashboards';
import { PickupDetail } from './pages/PickupDetail';
import { Impact } from './pages/Impact';
import { Leaderboard } from './pages/Leaderboard';
import { ContactFAQ } from './pages/ContactFAQ';

import { 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Flame, 
  Volume2, 
  VolumeX, 
  Moon, 
  Sun,
  Lock,
  Mail,
  User,
  Heart
} from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: string) => void;
}

const LoginModal: React.FC<ModalProps> = ({ isOpen, onClose, setActiveTab }) => {
  const { language, mockLoginAs } = useFoodBridge();
  const t = TRANSLATIONS[language];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [persona, setPersona] = useState<'donor' | 'ngo' | 'admin'>('donor');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate active authenticate session
    if (persona === 'donor') {
      mockLoginAs('donor', 'hotel');
    } else if (persona === 'ngo') {
      mockLoginAs('ngo', 'verified');
    } else {
      mockLoginAs('admin');
    }
    onClose();
    setActiveTab('dashboard');
  };

  const handleSignupRedirect = () => {
    onClose();
    setActiveTab('register_tab'); // Redirects to tab registrations!
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 rounded-3xl max-w-sm w-full p-6 text-left animate-fade-in relative shadow-2xl">
        
        {/* Toggle close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-lg cursor-pointer"
        >
          ✕
        </button>

        <div className="text-center pb-4 border-b border-gray-50 dark:border-gray-800 space-y-1">
          <h3 className="text-lg font-black text-gray-950 dark:text-white">Portal Authenticate Desk</h3>
          <p className="text-[11px] text-gray-400 leading-normal">Access your FoodBridge command console</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4 text-xs font-semibold">
          
          <div className="space-y-1">
            <label className="text-[10px] text-gray-400 uppercase tracking-widest">{t.form.roleSelect}</label>
            <div className="flex bg-gray-50 dark:bg-gray-950 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setPersona('donor')}
                className={`flex-1 py-1.5 rounded-lg text-[10px] font-extrabold transition-all uppercase ${persona === 'donor' ? 'bg-orange-600 text-white' : 'text-gray-500'}`}
              >
                Donor
              </button>
              <button
                type="button"
                onClick={() => setPersona('ngo')}
                className={`flex-1 py-1.5 rounded-lg text-[10px] font-extrabold transition-all uppercase ${persona === 'ngo' ? 'bg-orange-600 text-white' : 'text-gray-500'}`}
              >
                NGO
              </button>
              <button
                type="button"
                onClick={() => setPersona('admin')}
                className={`flex-1 py-1.5 rounded-lg text-[10px] font-extrabold transition-all uppercase ${persona === 'admin' ? 'bg-orange-600 text-white' : 'text-gray-500'}`}
              >
                Admin
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-gray-400 uppercase tracking-widest">{t.form.email}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@entity-allies.org"
                className="w-full pl-9 pr-3 py-2 bg-transparent border border-gray-150 dark:border-gray-800 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] text-gray-400 uppercase tracking-widest">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 bg-transparent border border-gray-150 dark:border-gray-800 rounded-xl"
              />
            </div>
          </div>

          {/* Simulated Google login option */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold text-xs transition-transform cursor-pointer"
          >
            Authenticate Credentials ➔
          </button>

          <button
            type="button"
            onClick={handleSubmit} // Fast pass
            className="w-full py-2.5 rounded-xl border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50/50 text-[10px] font-bold block"
          >
            {t.buttons.loginGoogle} (Instant Sandbox Pass)
          </button>

        </form>

        <div className="pt-4 border-t border-gray-50 dark:border-gray-800/40 text-center text-[10.5px] text-gray-400 mt-4 leading-normal">
          <span>New partner to the defense alliance? </span>
          <button 
            onClick={handleSignupRedirect}
            className="text-orange-600 dark:text-orange-400 font-extrabold hover:underline"
          >
            Join / Register Now
          </button>
        </div>

      </div>
    </div>
  );
};

const MainAppContent: React.FC = () => {
  const { language, theme } = useFoodBridge();
  const t = TRANSLATIONS[language];

  const [activeTab, setActiveTab] = useState('home');
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Scroll to top on tab swap
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} showLoginModal={() => setLoginModalOpen(true)} />;
      case 'about':
        return <About />;
      case 'listings':
        return (
          <div className="space-y-12">
            <Donations activeTab={activeTab} setActiveTab={setActiveTab} />
            
            {/* Live GPS Map is embedded beautifully below active listings to offer maximum context! */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
              <MapComponent />
            </div>
          </div>
        );
      case 'impact':
        return <Impact />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'faq':
      case 'contact':
        return <ContactFAQ />;
      case 'dashboard':
        return (
          <div className="space-y-12">
            <Dashboards setActiveTab={setActiveTab} />
          </div>
        );
      case 'pickup-route':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <PickupDetail />
          </div>
        );
      case 'register_tab':
        return <Registration setActiveTab={setActiveTab} />;
      default:
        return <Home setActiveTab={setActiveTab} showLoginModal={() => setLoginModalOpen(true)} />;
    }
  };

  const getFooterGreeting = (l: string) => {
    switch (l) {
      case 'en': return 'FoodBridge Alliance. Connecting excess calorie buffers with community empty plates.';
      case 'hi': return 'फ़ूडब्रिज गठबंधन। समुदाय की खाली प्लेटों के साथ अतिरिक्त भोजन सुरक्षा को जोड़ना।';
      case 'te': return 'ఫుడ్‌బ్రిడ్జ్ అలయన్స్. మిగిలిపోయిన ఆహారాన్ని ఆకలి తీర్చే పళ్లేలతో అనుసంధానిస్తుంది.';
      case 'ta': return 'ஃபுட்பிரிட்ஜ் கூட்டணி. உபரி உணவை பசியுள்ள தட்டுகளோடு இணைக்கிறது.';
      case 'kn': return 'ಫುಡ್‌ಬ್ರಿಡ್ಜ್ ಅಲೈಯನ್ಸ್. ಹೆಚ್ಚುವರಿ ಆಹಾರವನ್ನು ಹಸಿದ ಹೊಟ್ಟೆಗಳಿಗೆ ತಲುಪಿಸುವುದು.';
      default: return 'FoodBridge Alliance.';
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen relative overflow-hidden transition-colors duration-300">
      
      {/* Ambient Moving Animated Colorful Orbs Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
        {/* Floating Orb 1: Orange/Amber */}
        <div className="absolute top-[8%] left-[12%] w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full orb-orange opacity-[0.8] transition-opacity duration-500" />
        
        {/* Floating Orb 2: Teal/Cyan */}
        <div className="absolute bottom-[20%] right-[6%] w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full orb-teal opacity-[0.7] transition-opacity duration-500" />
        
        {/* Floating Orb 3: Rose/Pink */}
        <div className="absolute top-[42%] right-[16%] w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] rounded-full orb-rose opacity-[0.6] transition-opacity duration-500" />

        {/* Floating Orb 4: Purple/Violet */}
        <div className="absolute bottom-[30%] left-[8%] w-[300px] sm:w-[480px] h-[300px] sm:h-[480px] rounded-full orb-purple opacity-[0.6] transition-opacity duration-500" />
      </div>

      {/* Navbar Container */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        showLoginModal={() => setLoginModalOpen(true)} 
      />

      {/* Main Pages body driver - transparent backdrop blur lets the ambient orbs glide through cleanly */}
      <main className="flex-1 bg-white/40 dark:bg-gray-950/20 backdrop-blur-[60px] md:backdrop-blur-[100px] transition-colors duration-300 relative z-10">
        {renderActiveTab()}
      </main>

      {/* Footer Container */}
      <footer className="border-t border-gray-100 dark:border-gray-900 bg-gray-50/40 dark:bg-gray-950/10 backdrop-blur-md text-xs font-semibold py-12 text-gray-500 dark:text-gray-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1.5">
            <div className="flex items-center space-x-1.5 text-gray-900 dark:text-white">
              <Heart className="w-5 h-5 text-orange-600 animate-pulse shrink-0" />
              <span className="font-extrabold text-sm tracking-tight">{t.brand}</span>
            </div>
            <p className="max-w-md text-[11px] text-gray-400 leading-normal">
              {getFooterGreeting(language)}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-[10.5px]">
            <button onClick={() => setActiveTab('about')} className="hover:text-orange-500">Milestones</button>
            <span>•</span>
            <button onClick={() => setActiveTab('listings')} className="hover:text-orange-500">Live Logistics Map</button>
            <span>•</span>
            <button onClick={() => setActiveTab('impact')} className="hover:text-orange-500">ESG Carbon Reports</button>
            <span>•</span>
            <button onClick={() => setActiveTab('faq')} className="hover:text-orange-500">Safety standards</button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-gray-150 dark:border-gray-900 text-center text-[10px] text-gray-400">
          © 2026 FoodBridge Inc. Developed as national-level premium community crisis platform under FSSAI. All rights reserved.
        </div>
      </footer>

      {/* Authentic Modal Gateways */}
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
        setActiveTab={setActiveTab} 
      />

      <AIChatbot />

    </div>
  );
};

export default function App() {
  return (
    <FoodBridgeProvider>
      <MainAppContent />
    </FoodBridgeProvider>
  );
}
