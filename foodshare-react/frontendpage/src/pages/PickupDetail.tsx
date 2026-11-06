import React, { useState, useEffect } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { TRANSLATIONS } from '../constants/translations';
import { Truck, CheckCircle2, MapPin, Navigation, Compass, Sparkles, HelpCircle } from 'lucide-react';
import { MapComponent } from '../components/MapComponent';

export const PickupDetail: React.FC = () => {
  const { donations, language, updateDonationStatus } = useFoodBridge();
  const t = TRANSLATIONS[language];

  // Select the first claimed listing for the walkthrough tracking demo!
  const claimedItem = donations.find(d => d.status === 'claimed' || d.status === 'in-transit' || d.status === 'completed') || donations[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeStep, setActiveStep] = useState(1); // steps: 1 to 4

  const steps = [
    { num: 1, title: 'Dispatch Confirmed', desc: 'NGO driver has locked the matching coordinates.' },
    { num: 2, title: 'Driver En Route', desc: 'Special volunteer cargo truck traveling along city highway corridors.' },
    { num: 3, title: 'Safe Packing Clearance', desc: 'Inspecting nutrition safe metrics and temperature carrier bins.' },
    { num: 4, title: 'Delivered to Shelter', desc: 'Unpacked and warmly served. Karma audit ledger completed.' }
  ];

  const handleStepForward = () => {
    if (activeStep < 4) {
      const next = activeStep + 1;
      setActiveStep(next);

      // Core status syncs
      if (next === 2 && claimedItem) {
        updateDonationStatus(claimedItem.id, 'in-transit');
      } else if (next === 4 && claimedItem) {
        updateDonationStatus(claimedItem.id, 'completed');
      }
    }
  };

  const handleResetStep = () => {
    setActiveStep(1);
    if (claimedItem) {
      updateDonationStatus(claimedItem.id, 'claimed');
    }
  };

  if (!claimedItem) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4 font-sans animate-fade-in">
        <Truck className="w-12 h-12 text-gray-400 mx-auto animate-bounce" />
        <h4 className="text-base font-extrabold text-gray-900 dark:text-white">Redistribution Pipeline Empty</h4>
        <p className="text-xs text-gray-500">Go to available food lists and claim an item to initialize the live GPS trajectory tracker.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans text-left">
      
      {/* Page Title Header */}
      <div className="pb-4 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-3 mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center space-x-2">
            <Navigation className="w-6.5 h-6.5 text-orange-600 animate-spin-slow" />
            <span>Surplus Cargo Routing Center</span>
          </h2>
          <p className="text-xs text-gray-400">
            Real-time GPS tracking and stage completion validation ledger.
          </p>
        </div>

        {/* Walkthrough visual simulator controller */}
        <div className="flex bg-gray-50 dark:bg-gray-950 p-1 rounded-xl self-start">
          <button
            onClick={handleStepForward}
            disabled={activeStep === 4}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeStep === 4 
                ? 'opacity-50 pointer-events-none text-gray-400' 
                : 'bg-orange-600 text-white shadow-sm cursor-pointer'
            }`}
          >
            Simulate Route Step Forward ➔
          </button>
          
          {activeStep === 4 && (
            <button
              onClick={handleResetStep}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 ml-1 cursor-pointer"
            >
              Reset Track Loop
            </button>
          )}
        </div>
      </div>

      {/* Map component dynamically showing the route for the claimed item */}
      <div className="mb-8">
        <MapComponent />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Step-by-Step progress timeline vertical indicator */}
        <div className="md:col-span-8 rounded-3xl border border-gray-150 dark:border-gray-850 bg-white dark:bg-gray-900 p-6 sm:p-8 shadow-xl space-y-8">
          
          <div className="flex items-center justify-between border-b border-gray-50 dark:border-gray-800 pb-3">
            <div className="space-y-0.5">
              <span className="text-[10px] text-gray-400 font-extrabold uppercase">Active Tracking cargo:</span>
              <p className="text-sm font-extrabold text-gray-900 dark:text-white line-clamp-1">{claimedItem.title}</p>
            </div>
            
            <div className="text-right">
              <span className="text-[10px] text-gray-400 font-extrabold uppercase block">Platform ETA:</span>
              <span className="font-mono text-xs font-black text-orange-600 dark:text-orange-400">
                {activeStep === 4 ? 'ARRIVED ✔' : `${20 - activeStep * 4} Minutes`}
              </span>
            </div>
          </div>

          {/* Visual Progress Bar track */}
          <div className="relative h-1.5 w-full bg-gray-100 dark:bg-gray-850 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-600 to-amber-500 rounded-full transition-all duration-500" 
              style={{ width: `${(activeStep / 4) * 100}%` }}
            />
          </div>

          {/* Timeline Node items listings */}
          <div className="space-y-6 relative pl-4">
            
            {/* Background vertical vector connectors */}
            <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-gray-150 dark:bg-gray-800" />

            {steps.map((st) => {
              const isPassed = activeStep >= st.num;
              const isCurrent = activeStep === st.num;

              return (
                <div 
                  key={st.num}
                  className={`flex items-start space-x-4 relative transition-opacity duration-300 ${
                    isPassed ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  {/* Indicator bullet */}
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border z-10 transition-all ${
                    isPassed 
                      ? 'bg-orange-600 border-orange-500 text-white font-extrabold shadow-sm' 
                      : 'bg-white dark:bg-gray-900 border-gray-200 text-gray-400'
                  }`}>
                    {isPassed ? (
                      <span className="text-[10px]">✔</span>
                    ) : (
                      <span className="text-[10px] font-mono">{st.num}</span>
                    )}
                  </div>

                  <div className="space-y-0.5">
                    <h4 className={`text-xs font-black uppercase tracking-wider ${isCurrent ? 'text-orange-600 dark:text-orange-400' : 'text-gray-900 dark:text-white'}`}>
                      {st.title} {isCurrent && '● CURRENT'}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-gray-450 leading-relaxed font-semibold">
                      {st.desc}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>

        </div>

        {/* Info detail details panel side */}
        <div className="md:col-span-4 space-y-6">
          
          <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-950 border border-gray-150 dark:border-gray-900/50 text-xs text-gray-500 dark:text-gray-400 space-y-4">
            <h5 className="font-extrabold uppercase text-gray-900 dark:text-white">Active Driver Assignment</h5>
            
            <div className="flex items-center space-x-3 bg-white dark:bg-gray-900 p-3 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white text-md font-bold">
                🚚
              </div>
              <div>
                <p className="font-extrabold text-gray-900 dark:text-white">Volunteer Rakesh S.</p>
                <p className="text-[10px] text-gray-400">NGO Courier Truck #AP-29-YT</p>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-[11px] border-t border-gray-200 dark:border-gray-900">
              <p className="flex justify-between items-center">
                <span>Verification State:</span>
                <span className="bg-green-150 text-green-700 font-extrabold text-[9px] px-2 py-0.5 rounded uppercase">Pass</span>
              </p>
              <p className="flex justify-between items-center">
                <span>Handling Bins Temp:</span>
                <span className="font-mono font-bold text-gray-700 dark:text-gray-300">68°C Insulated</span>
              </p>
              <p className="flex justify-between items-center">
                <span>Assigned Depot:</span>
                <span className="font-bold text-gray-700 dark:text-gray-300">Roti Foundation Hub</span>
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-orange-50/25 dark:bg-orange-950/10 border border-orange-500/10 text-left space-y-2">
            <div className="flex items-center space-x-1 text-orange-600 dark:text-orange-400">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-black uppercase">FSSAI Safety Guard</span>
            </div>
            <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal">
              FoodBridge coordinates strict safety checkpoints. Drivers execute rapid pH levels check and hygiene logs before accepting items in real-world distributions.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
