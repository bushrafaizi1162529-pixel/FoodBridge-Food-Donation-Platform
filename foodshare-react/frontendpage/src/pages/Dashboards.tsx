import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { TRANSLATIONS } from '../constants/translations';
import { CustomBarChart, CustomEnvironmentalChart } from '../components/Charts';
import { 
  Building2, 
  Sparkles, 
  Award, 
  Trash2, 
  CheckCircle, 
  Truck, 
  Users, 
  FileText, 
  AlertTriangle, 
  Calendar,
  Layers,
  MapPin,
  ClipboardList
} from 'lucide-react';

interface DashboardsProps {
  setActiveTab: (tab: string) => void;
}

export const Dashboards: React.FC<DashboardsProps> = ({ setActiveTab }) => {
  const { 
    currentUser, 
    donations, 
    users, 
    approveNgo, 
    rejectNgo, 
    updateDonationStatus, 
    foodSavedToday,
    language 
  } = useFoodBridge();

  const t = TRANSLATIONS[language];

  // Selected sub-tab within Admin view if needed
  const [adminTab, setAdminTab] = useState<'users' | 'approvals' | 'logs'>('approvals');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-5 animate-fade-in font-sans">
        <AlertTriangle className="w-14 h-14 text-amber-500 mx-auto animate-bounce" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Active Session Required</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          Please log in to your secure account dashboard or use the <span className="font-bold text-orange-600">Judge Sandbox Panel</span> at the bottom right corner of the screen to instantly simulate a profile workspace with one click.
        </p>
      </div>
    );
  }

  // --- DONOR WORKSPACE VIEW ---
  const renderDonorDashboard = () => {
    // Filter donations belonging to this specific donor
    const donorDonations = donations.filter(d => d.donorId === currentUser.id);
    const activeListings = donorDonations.filter(d => d.status === 'available');
    const dispatchLoads = donorDonations.filter(d => d.status === 'completed');

    return (
      <div className="space-y-8 text-left animate-fade-in">
        
        {/* Header summary info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-400 font-extrabold uppercase shrink-0">Donor workspace karma score</span>
              <p className="text-2xl font-black text-gray-950 dark:text-white">{currentUser.points} XP</p>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {currentUser.badges.map((b, i) => (
                  <span key={i} className="text-[8.5px] font-semibold bg-orange-100/60 text-orange-600 dark:bg-orange-950/20 dark:text-orange-400 px-1.5 py-0.5 rounded">
                    {b}
                  </span>
                ))}
              </div>
            </div>
            <Award className="w-10 h-10 text-orange-500" />
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-400 font-extrabold uppercase block">{t.dashboard.totalDonations}</span>
              <p className="text-2xl font-black text-gray-950 dark:text-white">{donorDonations.length}</p>
              <p className="text-[10px] text-gray-400">{dispatchLoads.length} successful distributions completed.</p>
            </div>
            <Layers className="w-10 h-10 text-amber-500" />
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-400 font-extrabold uppercase block">{t.dashboard.activeDonations}</span>
              <p className="text-2xl font-black text-orange-600 dark:text-orange-400">{activeListings.length}</p>
              <p className="text-[10px] text-gray-400">Waiting for local NGO dispatch collection.</p>
            </div>
            <Truck className="w-10 h-10 text-orange-600" />
          </div>
        </div>

        {/* AI Predictive Analytics Alert Block */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-orange-50/20 via-orange-500/5 to-transparent border border-orange-500/20 shadow-glow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3 text-left">
            <div className="w-9 h-9 rounded-xl bg-orange-100/40 dark:bg-orange-950/20 flex items-center justify-center text-orange-600 shrink-0">
              <Sparkles className="w-5 h-5 animate-spin-slow" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[10px] font-black uppercase text-orange-600 dark:text-orange-400 tracking-wider">
                {t.dashboard.aiRec}
              </span>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 leading-relaxed">
                {t.dashboard.aiBanner}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('listings')}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer shrink-0 transition-transform"
          >
            Draft Post Pre-Fill
          </button>
        </div>

        {/* Charts & Listings split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Dispatch Logs table */}
          <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 space-y-4">
            <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">Active Cargo Dispatch History</h4>
            {donorDonations.length === 0 ? (
              <div className="text-center py-12 text-xs text-gray-400">
                You have not deployed any food cargo yet. Deploy surplus food above!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-medium">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-400 text-left">
                      <th className="pb-2">Dispatched Cargo</th>
                      <th className="pb-2">Load</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Rider</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-800/20">
                    {donorDonations.map((d) => (
                      <tr key={d.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-950/20 transition-colors">
                        <td className="py-3">
                          <p className="font-extrabold text-gray-900 dark:text-white">{d.title.split(':')[0]}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{d.location}</p>
                        </td>
                        <td className="py-3 font-bold text-orange-600 dark:text-orange-400">{d.quantity}</td>
                        <td className="py-3">
                          <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            d.status === 'completed' ? 'bg-green-100 dark:bg-green-950/40 text-green-600' :
                            d.status === 'claimed' ? 'bg-blue-100 dark:bg-blue-950/40 text-blue-600' :
                            'bg-orange-100 dark:bg-orange-950/40 text-orange-600'
                          }`}>
                            {d.status}
                          </span>
                        </td>
                        <td className="py-3 text-[10px] text-gray-400">
                          {d.claimedByNgoName || 'Waiting claim...'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Environmental ledger charts */}
          <div className="lg:col-span-1 space-y-6">
            <CustomBarChart />
            <CustomEnvironmentalChart />
          </div>

        </div>

      </div>
    );
  };

  // --- NGO CLAIM WORKSPACE VIEW ---
  const renderNgoDashboard = () => {
    // Filter claims picked up by this NGO
    const claimedDonations = donations.filter(d => d.claimedByNgoId === currentUser.id);
    const activeClaims = claimedDonations.filter(d => d.status === 'claimed' || d.status === 'in-transit');
    const closedPickups = claimedDonations.filter(d => d.status === 'completed');

    return (
      <div className="space-y-8 text-left animate-fade-in">
        
        {/* Unverified Warning Banner if NGO is unverified */}
        {!currentUser.isVerified && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start space-x-3">
            <AlertTriangle className="w-5.5 h-5.5 text-amber-500 shrink-0 animate-bounce" />
            <div className="space-y-1">
              <h5 className="text-xs font-bold text-amber-500 uppercase tracking-wider">Accreditation Pending Clearance</h5>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-normal">
                Your NGO registration credentials certificate (<span className="font-mono font-bold">{currentUser.ngoRegId}</span>) are currently in queue. You can browse active lists but cannot claim food coordinates until an Administrator manual accepts. Log in as System Admin inside the sandbox panel to clear your files!
              </p>
            </div>
          </div>
        )}

        {/* Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-400 font-extrabold uppercase block">Claim status karma</span>
              <p className="text-2xl font-black text-gray-950 dark:text-white">{currentUser.points} XP</p>
              <span className="text-[10px] font-semibold text-gray-400">Points earned rescuing community cargo.</span>
            </div>
            <Award className="w-10 h-10 text-orange-500" />
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-400 font-extrabold uppercase block">Total Rescues Claimed</span>
              <p className="text-2xl font-black text-gray-950 dark:text-white">{claimedDonations.length}</p>
              <p className="text-[10px] text-gray-400">{closedPickups.length} completed distributions.</p>
            </div>
            <ClipboardList className="w-10 h-10 text-amber-500" />
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-gray-400 font-extrabold uppercase block">Active Delivery Routes</span>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400">{activeClaims.length}</p>
              <p className="text-[10px] text-gray-400">Drivers actively handling kitchen pickups.</p>
            </div>
            <Truck className="w-10 h-10 text-blue-500 animate-pulse" />
          </div>
        </div>

        {/* Current Active Claims & Pickup manager */}
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-4">
          <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center space-x-1.5">
            <ClipboardList className="w-4 h-4 text-orange-500" />
            <span>Active Redistribution Pickup Requests</span>
          </h4>

          {activeClaims.length === 0 ? (
            <div className="text-center py-12 text-xs text-gray-400 bg-gray-50 dark:bg-gray-950 rounded-xl">
              No active pending pickups on your manifest. Browse available food lists to claim fresh surplus!
            </div>
          ) : (
            <div className="space-y-4">
              {activeClaims.map((claim) => (
                <div 
                  key={claim.id}
                  className="p-4 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 text-left">
                    <p className="font-extrabold text-gray-900 dark:text-white">{claim.title}</p>
                    <div className="flex flex-wrap items-center gap-x-3 text-[10px] text-gray-400">
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-orange-600 shrink-0" />
                        <span>{claim.location}</span>
                      </span>
                      <span>•</span>
                      <span>Scheduled Pickup: {claim.pickupTime || 'Soon'}</span>
                    </div>
                  </div>

                  {/* Claims controls */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateDonationStatus(claim.id, 'in-transit')}
                      className={`px-3 py-1.5 rounded-lg font-bold text-[10px] shadow-sm transition-colors cursor-pointer ${
                        claim.status === 'in-transit' 
                          ? 'bg-amber-100 text-amber-700 pointer-events-none' 
                          : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {claim.status === 'in-transit' ? '🚚 In Transit' : 'Dispatch Driver'}
                    </button>

                    <button
                      onClick={() => updateDonationStatus(claim.id, 'completed')}
                      className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-extrabold text-[10px] shadow-md cursor-pointer transition-colors"
                    >
                      Complete Pickup ✔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Global Carbon Index stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CustomBarChart />
          <CustomEnvironmentalChart />
        </div>

      </div>
    );
  };

  // --- GLOBAL COMMAND CENTER ADMIN VIEW ---
  const renderAdminDashboard = () => {
    // Audit data
    const pendingNgos = users.filter(u => u.role === 'ngo' && !u.isVerified);
    const activeNgos = users.filter(u => u.role === 'ngo' && u.isVerified);
    const activeDonors = users.filter(u => u.role === 'donor');

    return (
      <div className="space-y-8 text-left animate-fade-in font-sans">
        
        {/* Statistics headers */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm text-left space-y-1">
            <span className="text-[9px] text-gray-400 font-extrabold uppercase shrink-0">Total Platform Users</span>
            <p className="text-xl font-black text-gray-950 dark:text-white">{users.length}</p>
            <span className="text-[9px] text-gray-400">All authenticated roles.</span>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm text-left space-y-1">
            <span className="text-[9px] text-gray-400 font-extrabold uppercase block">{t.dashboard.ngoApprovals}</span>
            <p className="text-xl font-black text-orange-600 dark:text-orange-400">{pendingNgos.length}</p>
            <span className="text-[9px] text-gray-400">NGO applications currently pending review.</span>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm text-left space-y-1">
            <span className="text-[9px] text-gray-400 font-extrabold uppercase block">Verified NGO alliances</span>
            <p className="text-xl font-black text-gray-950 dark:text-white">{activeNgos.length}</p>
            <span className="text-[9px] text-gray-400">Fully authorized claim pipelines.</span>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm text-left space-y-1">
            <span className="text-[9px] text-gray-400 font-extrabold uppercase block">Active Cargo Listings</span>
            <p className="text-xl font-black text-amber-500">{donations.filter(d => d.status === 'available').length}</p>
            <span className="text-[9px] text-gray-400">Available surplus currently online.</span>
          </div>
        </div>

        {/* Tab Controls for system settings */}
        <div className="border-b border-gray-100 dark:border-gray-850 flex space-x-4">
          <button
            onClick={() => setAdminTab('approvals')}
            className={`pb-2.5 text-xs font-bold uppercase tracking-wider relative cursor-pointer ${
              adminTab === 'approvals' 
                ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-600' 
                : 'text-gray-400 hover:text-orange-500'
            }`}
          >
            Clear NGO Licenses ({pendingNgos.length})
          </button>
          
          <button
            onClick={() => setAdminTab('users')}
            className={`pb-2.5 text-xs font-bold uppercase tracking-wider relative cursor-pointer ${
              adminTab === 'users' 
                ? 'text-orange-600 dark:text-orange-400 border-b-2 border-orange-600' 
                : 'text-gray-400 hover:text-orange-500'
            }`}
          >
            Registered Directories
          </button>
        </div>

        {/* Tab 1: NGO License applications queue */}
        {adminTab === 'approvals' && (
          <div className="space-y-4">
            <h4 className="text-xs font-black uppercase text-gray-400">Outstanding Accreditation Applications</h4>
            
            {pendingNgos.length === 0 ? (
              <div className="text-center py-12 text-xs text-gray-400 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl">
                All NGO applications are cleared and certified. Zero queue delay!
              </div>
            ) : (
              <div className="space-y-4">
                {pendingNgos.map((ngo) => (
                  <div 
                    key={ngo.id}
                    className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="flex items-start space-x-3.5">
                      <div className="w-10 h-10 rounded-full bg-slate-300 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100')] bg-cover shrink-0" />
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-gray-900 dark:text-white">{ngo.name}</p>
                        <p className="text-[10px] text-gray-400">Email: {ngo.email} | Phone: {ngo.phone}</p>
                        <p className="text-[10px] text-gray-400 font-mono">Goverment License Ref: {ngo.ngoRegId}</p>
                        {/* Fake uploaded documents display */}
                        <div className="flex items-center space-x-1 bg-orange-100/30 text-orange-600 dark:text-orange-400 text-[9px] px-2 py-0.5 rounded-md mt-1 w-fit font-bold">
                          <FileText className="w-3 h-3 shrink-0" />
                          <span>Certification_Audit_Package_Clear.pdf</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => rejectNgo(ngo.id)}
                        className="px-3.5 py-1.5 rounded-lg border border-red-200 dark:border-red-950/40 text-red-600 dark:text-red-400 text-[10px] font-bold hover:bg-red-50/50 transition-colors cursor-pointer"
                      >
                        Reject Cert
                      </button>
                      <button
                        onClick={() => approveNgo(ngo.id)}
                        className="px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-[10px] font-black shadow-md cursor-pointer transition-colors"
                      >
                        Approve License ✔
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Users directories */}
        {adminTab === 'users' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* NGO Allies */}
            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-4">
              <h5 className="text-xs font-black uppercase text-gray-400">NGO Partner Relays ({activeNgos.length + pendingNgos.length})</h5>
              <div className="space-y-3 divide-y divide-gray-50 dark:divide-gray-800/20 max-h-80 overflow-y-auto pr-1">
                {users.filter(u => u.role === 'ngo').map(ngo => (
                  <div key={ngo.id} className="pt-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-extrabold text-gray-900 dark:text-white">{ngo.name}</p>
                      <p className="text-[10px] text-gray-400">{ngo.address}</p>
                    </div>
                    <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                      ngo.isVerified ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {ngo.isVerified ? 'Certified' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Donors Profiles */}
            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-4">
              <h5 className="text-xs font-black uppercase text-gray-400">Donor kitchen networks ({activeDonors.length})</h5>
              <div className="space-y-3 divide-y divide-gray-50 dark:divide-gray-800/20 max-h-80 overflow-y-auto pr-1">
                {activeDonors.map(donor => (
                  <div key={donor.id} className="pt-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-extrabold text-gray-900 dark:text-white">{donor.name}</p>
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider color-orange-500">{donor.donorType}</p>
                    </div>
                    <span className="font-bold text-amber-500">{donor.points} pts</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    );
  };

  // --- Dynamic render router logic ---
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 gap-4 mb-8 text-left">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
            {currentUser.role === 'donor' ? t.dashboard.donorTitle : 
             currentUser.role === 'ngo' ? t.dashboard.ngoTitle : 
             t.dashboard.adminTitle}
          </h2>
          <p className="text-xs text-gray-400 leading-normal mt-0.5">
            Secured sandbox workstation authenticated for <span className="font-extrabold text-orange-600 dark:text-orange-400">{currentUser.name}</span>.
          </p>
        </div>
      </div>

      {currentUser.role === 'donor' && renderDonorDashboard()}
      {currentUser.role === 'ngo' && renderNgoDashboard()}
      {currentUser.role === 'admin' && renderAdminDashboard()}

    </div>
  );
};
