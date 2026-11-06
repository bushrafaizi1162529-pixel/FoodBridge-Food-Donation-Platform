import React from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { TRANSLATIONS } from '../constants/translations';
import { Heart, Target, Sparkles, Star, Users2, LeafyGreen, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  const { language } = useFoodBridge();
  const t = TRANSLATIONS[language];

  const coreValues = [
    {
      icon: <Users2 className="w-5 h-5 text-orange-600" />,
      title: 'Empathy first logistics',
      desc: 'We prioritize prompt, respectful deliveries. Every meal deserves premium handles.'
    },
    {
      icon: <LeafyGreen className="w-5 h-5 text-green-600" />,
      title: 'Direct green impact',
      desc: 'Preventing methane landfills offsets environmental heating index points directly.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-amber-600" />,
      title: 'Gold standard safety',
      desc: 'Rigid testing standards for kitchen hygiene and NGO compliance clearance.'
    }
  ];

  const team = [
    {
      name: 'Padma Gopi Pillai',
      role: 'Chief Architect & Director',
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
      bio: 'Ex-Logistics lead dedicated to building digital bridges for community food defense programs.'
    },
    {
      name: 'Dr. Srinivas Prasad',
      role: 'Head of Nutrition & Safety Protocols',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
      bio: 'Author of food security audits, keeping FoodBridge compliance certifications standard.'
    },
    {
      name: 'Ananya Deshmukh',
      role: 'Global Volunteer Dispatch lead',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      bio: 'Manages 1200+ local response riders and crisis relief logistics coordinate paths.'
    }
  ];

  return (
    <div className="space-y-16 pb-20 animate-fade-in font-sans text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      
      {/* Header section */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600 bg-orange-100/40 dark:bg-orange-950/20 px-2.5 py-0.5 rounded-full inline-block">
          Our blueprint
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Pioneering a zero waste calorie network.
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          FoodBridge connects restaurants, marriages, caterers, and supermarkets directly with local distribution points and verified NGOs.
        </p>
      </section>

      {/* Mission & Vision Bento Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="p-8 rounded-3xl bg-orange-50/20 dark:bg-orange-950/10 border border-orange-500/10 space-y-4 relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black">
            <Heart className="w-5 h-5 animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Our Mission</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Nurturing our local communities, saving surplus prepared food from landfill dumps, and reducing methane gas footprint by establishing direct, digital food routing pipelines.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-amber-50/20 dark:bg-amber-950/10 border border-amber-500/10 space-y-4 relative overflow-hidden">
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white font-black">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Our Vision</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            A frictionless technology-enabled community ecosystem where not a single fresh nutritious calorie goes to waste, and local food security matches maximum logistical safety.
          </p>
        </div>

      </section>

      {/* Core Values */}
      <section className="space-y-8">
        <h3 className="text-xl font-black text-gray-900 dark:text-white text-center">Our Core Anchors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm relative text-left space-y-3">
              <div className="w-9 h-9 rounded-lg bg-orange-100/40 dark:bg-orange-950/25 flex items-center justify-center">
                {val.icon}
              </div>
              <h4 className="text-xs font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">{val.title}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team leaders */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-black text-gray-900 dark:text-white">Our Executive Board</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">The developers and compliance officers behind the shield.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center space-y-4">
              <img 
                src={member.photo} 
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-orange-500"
                referrerPolicy="no-referrer"
              />
              <div>
                <h4 className="text-sm font-extrabold text-gray-900 dark:text-white leading-tight">{member.name}</h4>
                <p className="text-[10px] text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider mt-0.5">{member.role}</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal font-medium">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Community goals */}
      <section className="p-8 rounded-3xl bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-br from-orange-600/20 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest bg-amber-400/10 px-2 py-0.5 rounded">
              FORWARD TARGETS
            </span>
            <h3 className="text-2xl font-bold leading-snug">Our 2026 Community Milestones</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              We are working to expand FoodBridge across 15 major metro blocks in India, integrating smart telemetry inside logistics boxes to monitor real-time food humidity levels and bacterial safe windows automatically.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-2xl font-black text-orange-500">100k</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">Meals redirect limit</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <p className="text-2xl font-black text-amber-500">50 Tons</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">ESG Carbon goals</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
