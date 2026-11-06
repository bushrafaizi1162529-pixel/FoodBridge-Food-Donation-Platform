import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { Shield, Sparkles, AlertTriangle, RotateCcw, UserCheck, Eye } from 'lucide-react';

export const JudgePanel: React.FC = () => {
  const { mockLoginAs, triggerEmergencyRequest, currentUser, language, addNotificationGlobal } = useFoodBridge();
  const [isOpen, setIsOpen] = useState(false);

  const handleTriggerEmergency = () => {
    const shelters = ['Secunderabad Shelter Ground', 'Gachibowli Relief Camp', 'Indiranagar Orphanage Home', 'Guindy Flood Shelter'];
    const shelter = shelters[Math.floor(Math.random() * shelters.length)];
    const plates = Math.floor(Math.random() * 80) + 40;
    triggerEmergencyRequest('Warm Meals', plates, shelter);
    addNotificationGlobal('Sandbox Event Triggered', `Triggered a disaster emergency food shortage alert at ${shelter}!`, 'urgent');
  };

  const handleResetData = () => {
    localStorage.removeItem('foodbridge_users');
    localStorage.removeItem('foodbridge_currentuser');
    localStorage.removeItem('foodbridge_donations');
    localStorage.removeItem('foodbridge_notifications');
    addNotificationGlobal('Sandbox Reset', 'Wiped storage assets and restored baseline templates.', 'info');
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Visual Launcher Bubble */}
      <button
        id="judge-panel-launcher"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 hover:scale-105 active:scale-95 text-white font-bold text-xs shadow-lg shadow-orange-500/20 shadow-glow cursor-pointer transition-transform duration-200"
      >
        <Sparkles className="w-4 h-4 animate-spin-slow" />
        <span>Judge Sandbox Panel</span>
      </button>

      {/* Control Drawer */}
      {isOpen && (
        <div 
          id="judge-sandbox-panel-card"
          className="absolute bottom-12 right-0 w-80 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl p-4 text-left animate-fade-in"
        >
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-1.5 text-orange-600 dark:text-orange-400">
              <Shield className="w-4.5 h-4.5" />
              <span className="text-sm font-bold">Live Hackathon Walkthrough</span>
            </div>
            <span className="text-[9px] font-mono bg-orange-100 dark:bg-orange-950/40 text-orange-600 px-1.5 py-0.5 rounded">
              v1.0.4-live
            </span>
          </div>

          <div className="mt-3 space-y-4">
            
            {/* Quick role toggles */}
            <div>
              <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase mb-2">
                1. Switch Testing Roles (Instant Dashboard Updates)
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => mockLoginAs('donor', 'hotel')}
                  className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-colors flex items-center justify-start space-x-1 bg-gray-50 dark:bg-gray-850 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 text-gray-800 dark:text-gray-200 border border-transparent ${
                    currentUser?.role === 'donor' && currentUser?.donorType === 'hotel' ? 'border-orange-500 bg-orange-50/20 dark:bg-orange-950/10' : ''
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-orange-500" />
                  <span>Hotel (Donor)</span>
                </button>

                <button
                  onClick={() => mockLoginAs('donor', 'caterer')}
                  className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-colors flex items-center justify-start space-x-1 bg-gray-50 dark:bg-gray-850 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 text-gray-800 dark:text-gray-200 border border-transparent ${
                    currentUser?.role === 'donor' && currentUser?.donorType === 'caterer' ? 'border-orange-500 bg-orange-50/20 dark:bg-orange-950/10' : ''
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-orange-500" />
                  <span>Caterer (Donor)</span>
                </button>

                <button
                  onClick={() => mockLoginAs('ngo', 'verified')}
                  className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-colors flex items-center justify-start space-x-1 bg-gray-50 dark:bg-gray-850 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 text-gray-800 dark:text-gray-200 border border-transparent ${
                    currentUser?.role === 'ngo' && currentUser?.isVerified ? 'border-orange-500 bg-orange-50/20 dark:bg-orange-950/10' : ''
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-orange-500" />
                  <span>NGO (Verified)</span>
                </button>

                <button
                  onClick={() => mockLoginAs('ngo', 'unverified')}
                  className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-colors flex items-center justify-start space-x-1 bg-gray-50 dark:bg-gray-850 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 text-gray-800 dark:text-gray-200 border border-transparent ${
                    currentUser?.role === 'ngo' && !currentUser?.isVerified ? 'border-orange-500 bg-orange-50/20 dark:bg-orange-950/10' : ''
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-orange-400" />
                  <span>NGO (Pending)</span>
                </button>

                <button
                  onClick={() => mockLoginAs('admin')}
                  className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-colors flex items-center justify-start space-x-1 bg-gray-50 dark:bg-gray-850 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 text-gray-800 dark:text-gray-200 border border-transparent ${
                    currentUser?.role === 'admin' ? 'border-orange-500 bg-orange-50/20 dark:bg-orange-950/10' : ''
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                  <span>System Admin</span>
                </button>

                <button
                  onClick={() => mockLoginAs('public')}
                  className="px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-colors flex items-center justify-start space-x-1 bg-gray-50 dark:bg-gray-850 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 text-gray-800 dark:text-gray-200"
                >
                  <Eye className="w-3.5 h-3.5 text-gray-500" />
                  <span>Anonymous Log</span>
                </button>
              </div>
              <div className="mt-1.5 text-[10px] text-gray-400 leading-normal bg-gray-50 dark:bg-gray-950 px-2 py-1.5 rounded-lg border border-gray-100 dark:border-gray-900">
                <span className="font-bold">Current role:</span>{' '}
                {currentUser ? `${currentUser.name} (${currentUser.role.toUpperCase()})` : 'Anonymous Visitor'}
              </div>
            </div>

            {/* Simulated Live Actions */}
            <div>
              <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-wider uppercase mb-1.5">
                2. Live Crisis Events Simulator
              </p>
              <button
                onClick={handleTriggerEmergency}
                className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs shadow-sm transition-transform cursor-pointer"
              >
                <AlertTriangle className="w-4.5 h-4.5" />
                <span>Simulate Emergency Request</span>
              </button>
            </div>

            {/* Sandbox reset */}
            <div className="pt-2.5 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-[10px]">
              <span className="text-gray-400">Restore factory settings:</span>
              <button
                onClick={handleResetData}
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-gray-100 hover:bg-red-50 hover:text-red-600 dark:bg-gray-850 dark:hover:bg-red-950/40 text-gray-600 dark:text-gray-400 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Sandbox Ledger</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
