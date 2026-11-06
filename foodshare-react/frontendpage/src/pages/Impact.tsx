import React from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { TRANSLATIONS } from '../constants/translations';
import { CustomBarChart, CustomEnvironmentalChart } from '../components/Charts';
import { Leaf, Award, Milestone, Layers, TrendingUp, Sparkles } from 'lucide-react';

export const Impact: React.FC = () => {
  const { language, foodSavedToday } = useFoodBridge();
  const t = TRANSLATIONS[language];

  const milestones = [
    { title: 'Meals Servings Cleaned', val: '15,280+', metric: 'Nutritious plates redirecting landfill waste' },
    { title: 'Equivalent CO2 Saved', val: '11.2 Tons', metric: 'Equivalent to planting ~560 adult pine trees' },
    { title: 'Landfill Diverted', val: '6,410 kg', metric: 'Organic nitrogen decay gases avoided completely' },
    { title: 'NGO Logistics Match', val: '180+ Relays', metric: 'Authorized shelters active across 4 major states' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans text-left space-y-12">
      
      {/* Header section */}
      <section className="max-w-2xl text-left space-y-3">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-green-600 bg-green-50 dark:bg-green-950/20 px-2.5 py-0.5 rounded-full inline-block">
          ESG Carbon Offset Ledger
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-tight">
          Quantifying Our Environmental and Social Footprint
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          Redirecting surplus cooked food and grocery items avoids methane decay cycles inside land piles, saving organic indices directly.
        </p>
      </section>

      {/* Grid of milestones */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {milestones.map((m, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 shadow-sm space-y-2 text-left hover:border-orange-500/20 transition-all">
            <span className="text-[10px] text-gray-400 font-extrabold uppercase block">{m.title}</span>
            <p className="text-3xl font-black text-gray-950 dark:text-white leading-none bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent">{m.val}</p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-normal font-semibold pt-1">{m.metric}</p>
          </div>
        ))}
      </section>

      {/* Interactive Charts display splitting */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CustomBarChart />
        <CustomEnvironmentalChart />
      </section>

      {/* Carbon credits calculations index explained */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gray-950 text-white border border-gray-850 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-84 h-84 bg-orange-600/10 rounded-full blur-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-1.5 text-orange-500">
              <Leaf className="w-5 h-5 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest">ESG Credit Calculator Standard</span>
            </div>
            <h3 className="text-xl font-bold leading-snug">Scientific Methane Math</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              When food is dumped into landfills, anaerobic bacteria decompose it, generating large layers of methane gas (which is 25x more potent than CO2 in locking atmospheric radiation). Utilizing dynamic food rescue pipelines prevents decomposition cycles completely.
            </p>
            <div className="text-[11px] text-gray-300 font-mono">
              Calculation Equation: Saved kg * 1.95 (Methane Equivalent offset coef) = CO2-e savings saved today!
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4 text-xs font-medium">
            <h4 className="font-extrabold uppercase tracking-wide text-orange-505 dark:text-orange-400">Weekly Carbon Shield Impact</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span>Landfill organic block prevented:</span>
                <span className="font-bold text-orange-400">12,500 kg</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span>Sub-urban greenhouse indices locked:</span>
                <span className="font-bold text-orange-400">24.1 Tons</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Volunteer transport fuel optimization:</span>
                <span className="font-bold text-orange-400">+15.8%</span>
              </div>
            </div>
            <p className="text-[10px] text-gray-450 italic leading-normal">
              Reports are fully audited under GRI standards, serving compliance indices for large hotel networks (e.g., Grand Hyatt).
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
