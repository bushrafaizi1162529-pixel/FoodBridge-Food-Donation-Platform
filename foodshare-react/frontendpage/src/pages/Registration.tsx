import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { TRANSLATIONS } from '../constants/translations';
import { DonorType } from '../types';
import { UserCheck, Landmark, UploadCloud, CheckCircle2, ShieldCheck, HeartHandshake, Eye } from 'lucide-react';

interface RegistrationProps {
  setActiveTab: (tab: string) => void;
}

export const Registration: React.FC<RegistrationProps> = ({ setActiveTab }) => {
  const { language, registerDonor, registerNgo } = useFoodBridge();
  const t = TRANSLATIONS[language];

  const [activeRegTab, setActiveRegTab] = useState<'donor' | 'ngo'>('donor');
  
  // Form coordinates
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  // Donor Specifics
  const [donorType, setDonorType] = useState<DonorType>('restaurant');
  
  // NGO Specifics
  const [ngoRegId, setNgoRegId] = useState('');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [successSigned, setSuccessSigned] = useState(false);

  // Simulated File Upload handler
  const handleFakeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploading(true);
      const filename = e.target.files[0].name;
      setTimeout(() => {
        setUploadedFile(filename);
        setUploading(false);
      }, 1500);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !address) return;

    if (activeRegTab === 'donor') {
      registerDonor(name, email, phone, address, donorType);
    } else {
      registerNgo(name, email, phone, address, ngoRegId || `NGO-${Date.now()}`);
    }

    setSuccessSigned(true);
    setTimeout(() => {
      setSuccessSigned(false);
      setActiveTab('dashboard'); // Direct transition to dashboard!
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in text-left font-sans">
      
      {/* Onboarding success animation card */}
      {successSigned ? (
        <div className="rounded-3xl border border-green-500/25 bg-green-500/10 backdrop-blur p-8 text-center space-y-4 max-w-lg mx-auto py-16">
          <CheckCircle2 className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto animate-bounce" />
          <h3 className="text-2xl font-black text-gray-900 dark:text-white">Credentials Sealed!</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Welcome to the FoodBridge logistics alliance. Your sandbox credential points have has registered and dashboard components generated.
          </p>
          <span className="text-[11px] font-bold text-green-700 animate-pulse block">PROTOCAL UNPACKING... LOADING PORTAL CONSOLE</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Quick onboarding perks sidebars */}
          <div className="md:col-span-4 space-y-6">
            <div className="p-6 rounded-2xl bg-orange-50/20 dark:bg-orange-950/10 border border-orange-500/10 space-y-4">
              <HeartHandshake className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              <h4 className="text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white">Redistribution Perks</h4>
              <ul className="space-y-3 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                <li className="flex items-start space-x-2">
                  <span className="text-orange-600 font-bold">✔</span>
                  <span>Karma index leaderboard points</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-orange-600 font-bold">✔</span>
                  <span>ESG corporate greenhouse tracking reports</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-orange-600 font-bold">✔</span>
                  <span>Instant notification of nearby crisis shelters</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-800 text-xs text-gray-400 leading-relaxed flex items-start space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0" />
              <span>We adhere straightly to food inspection standards. Verified logistics channels check driver heat bags and containers during pick.</span>
            </div>
          </div>

          {/* Form console */}
          <div className="md:col-span-8 rounded-3xl border border-gray-150 dark:border-gray-850 bg-white dark:bg-gray-950 p-6 sm:p-8 shadow-xl">
            
            {/* Header tab controller */}
            <div className="flex bg-gray-50 dark:bg-gray-900 p-1.5 rounded-xl mb-6">
              <button
                onClick={() => { setActiveRegTab('donor'); setName(''); }}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeRegTab === 'donor' 
                    ? 'bg-orange-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-orange-600 dark:text-gray-400'
                }`}
              >
                Donor Alliance Signup
              </button>
              <button
                onClick={() => { setActiveRegTab('ngo'); setName(''); }}
                className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
                  activeRegTab === 'ngo' 
                    ? 'bg-orange-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-orange-600 dark:text-gray-400'
                }`}
              >
                NGO Alliance Registration
              </button>
            </div>

            {/* Actual Form layout */}
            <form onSubmit={handleRegister} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{t.form.fullName}</label>
                  <input 
                    type="text" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={activeRegTab === 'donor' ? 'e.g., Grand Hyatt Banquet' : 'e.g., Robin Hood Foundation'}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-xs text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{t.form.email}</label>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@entity.org"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-xs text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{t.form.phone}</label>
                  <input 
                    type="tel" 
                    required 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 99887 xxxxx"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-xs text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                {activeRegTab === 'donor' ? (
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Donor Classification</label>
                    <select
                      value={donorType}
                      onChange={(e) => setDonorType(e.target.value as DonorType)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="individual">{t.roles.individual}</option>
                      <option value="restaurant">{t.roles.restaurant}</option>
                      <option value="hotel">{t.roles.hotel}</option>
                      <option value="caterer">{t.roles.caterer}</option>
                    </select>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{t.form.ngoReg}</label>
                    <input 
                      type="text" 
                      required 
                      value={ngoRegId}
                      onChange={(e) => setNgoRegId(e.target.value)}
                      placeholder="NGO-HYD-xxxxx-A"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-xs text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{t.form.address}</label>
                <textarea 
                  required
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t.form.addressPl}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-xs text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              {/* NGO Specific File Upload simulation */}
              {activeRegTab === 'ngo' && (
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{t.form.docUpload}</label>
                  <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center hover:border-orange-500/40 transition-colors relative">
                    <input 
                      type="file" 
                      accept=".pdf,.png,.jpg"
                      onChange={handleFakeFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    
                    {uploading ? (
                      <div className="space-y-2">
                        <div className="h-1.5 w-24 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto overflow-hidden">
                          <div className="h-full bg-orange-600 rounded-full animate-progress" style={{ width: '80%' }} />
                        </div>
                        <p className="text-[11px] text-gray-400">Uploading certificate assets...</p>
                      </div>
                    ) : uploadedFile ? (
                      <div className="space-y-2">
                        <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto" />
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-200">{uploadedFile}</p>
                        <span className="text-[10px] text-gray-400 bg-green-50 dark:bg-green-950/40 px-2 py-0.5 rounded">Cached Successfully ✔</span>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <UploadCloud className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto" />
                        <p className="text-xs font-bold text-gray-700 dark:text-gray-300">Drag & drop certification document or browse</p>
                        <p className="text-[10px] text-gray-400">PDF, PNG, JPG accepted (License, Government affiliation certificate)</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 active:scale-98 text-white font-bold text-sm tracking-wide shadow-lg shadow-orange-500/10 cursor-pointer"
              >
                {t.buttons.register}
              </button>

            </form>
          </div>

        </div>
      )}

    </div>
  );
};
