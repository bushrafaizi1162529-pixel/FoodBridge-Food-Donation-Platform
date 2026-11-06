import React, { useState } from 'react';
import { Leaf, Award, ArrowUpRight, ShieldAlert } from 'lucide-react';

export const CustomBarChart: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data = [
    { day: 'Mon', count: 180, label: '180 kg' },
    { day: 'Tue', count: 220, label: '220 kg' },
    { day: 'Wed', count: 290, label: '290 kg' },
    { day: 'Thu', count: 150, label: '150 kg' },
    { day: 'Fri', count: 340, label: '340 kg' },
    { day: 'Sat', count: 420, label: '420 kg' },
    { day: 'Sun', count: 480, label: '480 kg' }
  ];

  const maxVal = 500;

  return (
    <div className="w-full rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 shadow-sm relative overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
        <div>
          <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">Carbon reduction ledger</span>
          <h4 className="text-sm font-extrabold text-gray-900 dark:text-white mt-0.5">Surplus Food Prevented (kg)</h4>
        </div>
        <span className="text-[11px] font-bold text-green-600 dark:text-green-400 flex items-center space-x-0.5 bg-green-50 dark:bg-green-950/30 px-1.5 py-0.5 rounded">
          <ArrowUpRight className="w-3.5 h-3.5" />
          <span>+24.1%</span>
        </span>
      </div>

      <div className="h-44 w-full flex items-end justify-between pt-6 px-1 relative">
        
        {/* Grid Guidelines */}
        <div className="absolute inset-x-0 bottom-[20%] border-t border-gray-100 dark:border-gray-800/40 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-[50%] border-t border-gray-100 dark:border-gray-800/40 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-[80%] border-t border-gray-100 dark:border-gray-800/40 pointer-events-none" />

        {data.map((item, index) => {
          const heightPercent = (item.count / maxVal) * 100;
          const isHovered = hoveredIndex === index;

          return (
            <div 
              key={item.day}
              className="flex flex-col items-center flex-1 cursor-pointer relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip */}
              {isHovered && (
                <div className="absolute -top-10 bg-gray-900 text-white dark:bg-orange-500 text-[10px] font-extrabold px-2 py-1 rounded shadow-md z-30 animate-bounce">
                  {item.label}
                </div>
              )}

              {/* Animated Vertical Bar */}
              <div className="w-7 sm:w-8 bg-gray-100 dark:bg-gray-800 rounded-t-lg h-28 flex items-end overflow-hidden">
                <div 
                  className={`w-full rounded-t-lg transition-all duration-500 ${
                    isHovered 
                      ? 'bg-gradient-to-t from-orange-600 to-amber-400 shadow-lg shadow-orange-500/20' 
                      : 'bg-gradient-to-t from-orange-500/80 to-amber-500/80'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              {/* Day string */}
              <span className={`text-[10px] font-mono mt-2 transition-colors ${isHovered ? 'text-orange-500 font-bold' : 'text-gray-400'}`}>
                {item.day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};


export const CustomEnvironmentalChart: React.FC = () => {
  return (
    <div className="w-full rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 shadow-sm relative overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
        <div>
          <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-wider block">ESG carbon ledger math</span>
          <h4 className="text-sm font-extrabold text-gray-900 dark:text-white mt-0.5">Methane & CO2 Offset</h4>
        </div>
        <Leaf className="w-4 h-4 text-green-500 animate-pulse" />
      </div>

      <div className="flex items-center justify-between mt-4">
        
        {/* Custom SVG Circular Ring */}
        <div className="w-24 h-24 relative flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            {/* Background Circle */}
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="3" className="dark:stroke-gray-800" />
            
            {/* Segment 1: Methane offset (70%) */}
            <circle 
              cx="18" cy="18" r="15.915" 
              fill="none" 
              stroke="#ea580c" 
              strokeWidth="3.2" 
              strokeDasharray="70 100" 
              strokeDashoffset="0"
              className="transition-all duration-1000"
            />
            
            {/* Segment 2: Transport Carbon offset (30%) */}
            <circle 
              cx="18" cy="18" r="15.915" 
              fill="none" 
              stroke="#10b981" 
              strokeWidth="3.2" 
              strokeDasharray="30 100" 
              strokeDashoffset="-70"
              className="transition-all duration-1000"
            />
          </svg>

          {/* Centered overall metric */}
          <div className="absolute flex flex-col items-center">
            <span className="text-xs font-black text-gray-900 dark:text-white leading-none">11.2T</span>
            <span className="text-[7.5px] text-gray-400 font-bold uppercase mt-0.5">CO2-E</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 pl-4 space-y-2 text-left text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-600 block shrink-0" />
              <span className="text-gray-500 dark:text-gray-400 font-medium">Bacterial Methane Prevented</span>
            </div>
            <span className="font-extrabold text-gray-950 dark:text-white">70%</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 block shrink-0" />
              <span className="text-gray-500 dark:text-gray-400 font-medium">Local Transport Saved</span>
            </div>
            <span className="font-extrabold text-gray-950 dark:text-white">30%</span>
          </div>

          <div className="text-[10px] bg-green-50/50 dark:bg-green-950/20 text-green-700 dark:text-green-400 p-1.5 rounded-lg border border-green-200/20 leading-relaxed font-semibold">
             Redirecting 1kg fresh food prevents ~2kg harmful organic carbon equivalents from rotting gas layers.
          </div>
        </div>

      </div>
    </div>
  );
};
