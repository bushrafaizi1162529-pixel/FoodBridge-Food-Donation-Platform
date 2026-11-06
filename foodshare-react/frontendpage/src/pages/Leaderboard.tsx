import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { TRANSLATIONS } from '../constants/translations';
import { Award, Star, ListFilter, PlayCircle, Heart } from 'lucide-react';

export const Leaderboard: React.FC = () => {
  const { leaderboardDonors, leaderboardNgos, language } = useFoodBridge();
  const t = TRANSLATIONS[language];

  const [activeLeaderboard, setActiveLeaderboard] = useState<'donors' | 'ngos'>('donors');

  const awards = [
    { name: 'Golden Heart', desc: 'Hotel or kitchen submitting 10 distinct high-volume surplus loads successfully.', icon: '🏆' },
    { name: 'Surplus Slayer', desc: 'Rescued and distributed more than 1,000 calorie servings.', icon: '🔥' },
    { name: 'Zero Waste Champ', desc: 'Maintained 100% spotless kitchen hygiene audits under state guidelines.', icon: '🌿' },
    { name: 'Midnight Angels', desc: 'NGO volunteers collecting leftover wedding buffets after 10:00 PM.', icon: '🌙' }
  ];

  const renderDonors = () => {
    return (
      <div className="overflow-x-auto rounded-2xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4 sm:p-6 text-xs font-semibold">
        <h3 className="text-sm font-extrabold text-gray-950 dark:text-white pb-3 border-b border-gray-50 dark:border-gray-800 flex items-center space-x-1.5">
          <Star className="w-4 h-4 text-amber-500" />
          <span>{t.leaderboard.topDonor}</span>
        </h3>
        <table className="w-full mt-4 text-left">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-400">
              <th className="pb-2.5 pl-2">{t.leaderboard.rank}</th>
              <th className="pb-2.5">{t.leaderboard.name}</th>
              <th className="pb-2.5">Industry Segment</th>
              <th className="pb-2.5 text-right">{t.leaderboard.donations}</th>
              <th className="pb-2.5 text-right pl-4">{t.leaderboard.points} XP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800/20">
            {leaderboardDonors.map((donor, idx) => {
              const rank = idx + 1;
              return (
                <tr key={donor.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-955/10 transition-colors">
                  <td className="py-4 pl-3">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-sans font-black ${
                      rank === 1 ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 font-extrabold text-xs' :
                      rank === 2 ? 'bg-slate-100 dark:bg-slate-850 text-slate-500 font-extrabold text-xs' :
                      rank === 3 ? 'bg-amber-50 text-orange-600 font-extrabold text-xs' :
                      'text-gray-400'
                    }`}>
                      {rank}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="font-extrabold text-gray-900 dark:text-white">{donor.name}</span>
                  </td>
                  <td className="py-4 text-gray-500 dark:text-gray-400 font-bold uppercase text-[9.5px]">{donor.type || 'Establishment'}</td>
                  <td className="py-4 text-right font-bold text-orange-600 dark:text-orange-400">{donor.donationsCount} batches</td>
                  <td className="py-4 text-right font-extrabold pr-2 font-mono text-gray-900 dark:text-white">{donor.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const renderNgos = () => {
    return (
      <div className="overflow-x-auto rounded-2xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm p-4 sm:p-6 text-xs font-semibold">
        <h3 className="text-sm font-extrabold text-gray-950 dark:text-white pb-3 border-b border-gray-50 dark:border-gray-800 flex items-center space-x-1.5">
          <Star className="w-4 h-4 text-orange-500 animate-spin-slow" />
          <span>{t.leaderboard.topNGOs}</span>
        </h3>
        <table className="w-full mt-4 text-left">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-400">
              <th className="pb-2.5 pl-2">{t.leaderboard.rank}</th>
              <th className="pb-2.5">{t.leaderboard.name}</th>
              <th className="pb-2.5 text-right">Missions Claimed</th>
              <th className="pb-2.5 text-right pl-4">{t.leaderboard.points} XP</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800/20">
            {leaderboardNgos.map((ngo, idx) => {
              const rank = idx + 1;
              return (
                <tr key={ngo.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-955/10 transition-colors">
                  <td className="py-4 pl-3">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-sans font-black ${
                      rank === 1 ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-600 font-extrabold text-xs' :
                      rank === 2 ? 'bg-slate-100 dark:bg-slate-850 text-slate-500 font-extrabold text-xs' :
                      rank === 3 ? 'bg-amber-50 text-orange-600 font-extrabold text-xs' :
                      'text-gray-400'
                    }`}>
                      {rank}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="font-extrabold text-gray-900 dark:text-white">{ngo.name}</span>
                  </td>
                  <td className="py-4 text-right font-bold text-orange-600 dark:text-orange-400">{ngo.donationsCount} deliveries</td>
                  <td className="py-4 text-right font-extrabold pr-2 font-mono text-gray-900 dark:text-white">{ngo.points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans text-left space-y-12">
      
      {/* Top title */}
      <section className="max-w-2xl space-y-3">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600 bg-orange-100/40 dark:bg-orange-950/20 px-2.5 py-0.5 rounded-full inline-block">
          Gamified Goodwill ledgers
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          {t.leaderboard.title}
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {t.leaderboard.subtitle}
        </p>
      </section>

      {/* Grid structure: Left Leaderboard tables, Right Badges list */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Leaderboards section left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Selector Tabs */}
          <div className="flex bg-gray-50 dark:bg-gray-950 p-1 rounded-xl w-64 border border-gray-150 dark:border-gray-900">
            <button
              onClick={() => setActiveLeaderboard('donors')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeLeaderboard === 'donors' 
                  ? 'bg-orange-600 text-white shadow-sm' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              Food Donors Rank
            </button>
            <button
              onClick={() => setActiveLeaderboard('ngos')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeLeaderboard === 'ngos' 
                  ? 'bg-orange-600 text-white shadow-sm' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              NGO Rescuers Rank
            </button>
          </div>

          {activeLeaderboard === 'donors' ? renderDonors() : renderNgos()}

        </div>

        {/* Achievement Badges right Column */}
        <div className="lg:col-span-1 rounded-3xl border border-gray-150 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl p-5 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-sm font-black uppercase text-gray-900 dark:text-white pb-3 border-b border-gray-50 dark:border-gray-800 flex items-center space-x-1.5">
              <Star className="w-4.5 h-4.5 text-orange-500 animate-pulse animate-spin-slow" />
              <span>Unlockable Achievement Awards</span>
            </h4>

            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
              {awards.map((award, i) => (
                <div key={i} className="flex items-start space-x-3.5 text-xs text-left">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/20 border border-orange-500/10 flex items-center justify-center text-lg shadow-sm shrink-0">
                    {award.icon}
                  </div>
                  <div className="space-y-0.5">
                    <h5 className="font-extrabold text-gray-950 dark:text-white">{award.name}</h5>
                    <p className="text-[11px] text-gray-500 dark:text-gray-450 leading-relaxed font-semibold">
                      {award.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-50/20 dark:bg-orange-950/10 p-3.5 rounded-2xl border border-orange-500/10 text-[10.5px] text-gray-500 dark:text-gray-400 gap-1 mt-4">
            <span className="font-black text-orange-600 dark:text-orange-400 block uppercase mb-1">🎮 Dynamic Gamified Ecosystem</span>
            Completing pickings automatically upgrades credentials. High score badges appear immediately in the platform profile.
          </div>
        </div>

      </div>

    </div>
  );
};
