import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { TRANSLATIONS } from '../constants/translations';
import { FoodCategory, FoodDonation } from '../types';
import { 
  ShoppingBag, 
  MapPin, 
  PlusCircle, 
  Search, 
  Filter, 
  Flame, 
  Clock, 
  CheckCircle2, 
  Info, 
  AlertTriangle, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { LocationPickerMap } from '../components/LocationPickerMap';

interface DonationsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Donations: React.FC<DonationsProps> = ({ activeTab, setActiveTab }) => {
  const { 
    donations, 
    createDonation, 
    claimDonation, 
    currentUser, 
    language,
    addNotificationGlobal
  } = useFoodBridge();

  const t = TRANSLATIONS[language];

  const [activePane, setActivePane] = useState<'browse' | 'create'>('browse');

  // New Listing details
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<FoodCategory>('cooked');
  const [quantity, setQuantity] = useState('');
  const [quantityValue, setQuantityValue] = useState(50);
  const [expiryHours, setExpiryHours] = useState(6);
  const [location, setLocation] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [lat, setLat] = useState(17.3850);
  const [lng, setLng] = useState(78.4867);
  const [createdOk, setCreatedOk] = useState(false);

  // Search & Filtering details
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatFilter, setSelectedCatFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('available');

  const handlePostDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !quantity || !location) return;

    createDonation(
      title,
      category,
      quantity,
      quantityValue,
      expiryHours,
      location,
      instructions,
      lat,
      lng,
      imageUrl
    );

    setCreatedOk(true);
    setTimeout(() => {
      setCreatedOk(false);
      setTitle('');
      setQuantity('');
      setLocation('');
      setInstructions('');
      setImageUrl('');
      setActivePane('browse');
    }, 1500);
  };

  const handleClaim = (item: FoodDonation) => {
    if (!currentUser) {
      addNotificationGlobal('Authentication Required', 'Please log in to claim food cargo!', 'alert');
      return;
    }
    if (currentUser.role !== 'ngo') {
      addNotificationGlobal('Blocked Action', 'Only registered NGO partners can claim community cargo resources.', 'alert');
      return;
    }
    claimDonation(item.id);
    
    // Switch to PickupDetail view (dashboard tab)
    setActiveTab('pickup-route');
    
    // Auto select the node in MapComponent to show the route!
    window.dispatchEvent(new CustomEvent('select-map-node', { detail: item }));
  };

  // Filter listings based on selections & searches
  const filteredDonations = donations.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.donorName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCatFilter === 'all' || item.category === selectedCatFilter;
    const matchesStatus = selectedStatusFilter === 'all' || item.status === selectedStatusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'cooked': return 'bg-orange-50 text-orange-600 border-orange-500/20 dark:bg-orange-950/20 dark:text-orange-400';
      case 'raw': return 'bg-emerald-50 text-emerald-600 border-emerald-500/20 dark:bg-emerald-950/20 dark:text-emerald-400';
      case 'packaged': return 'bg-indigo-50 text-indigo-600 border-indigo-500/20 dark:bg-indigo-950/20 dark:text-indigo-400';
      case 'dry': return 'bg-amber-50 text-amber-600 border-amber-500/20 dark:bg-amber-950/20 dark:text-amber-400';
      default: return 'bg-blue-50 text-blue-600 border-blue-500/20 dark:bg-blue-950/20 dark:text-blue-400';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in font-sans">
      
      {/* Top Banner controller */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800 gap-4">
        <div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
            {activePane === 'browse' ? t.nav.listings : 'Deploy Surplus Calorie Cargo'}
          </h2>
          <p className="text-xs text-gray-400">
            {activePane === 'browse' 
              ? 'Real-time directory of available fresh cooked meals, raw farm produce, and groceries' 
              : 'Add leftover corporate buffet or household kitchen items to the local map'
            }
          </p>
        </div>

        {/* Action Toggle buttons */}
        <div className="flex bg-gray-50 dark:bg-gray-950 p-1 rounded-xl self-start">
          <button
            id="pane-browse-btn"
            onClick={() => setActivePane('browse')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activePane === 'browse' 
                ? 'bg-orange-600 text-white shadow-sm font-extrabold' 
                : 'text-gray-600 hover:text-orange-500 dark:text-gray-300'
            }`}
          >
            Browse Available Food ({donations.filter(d => d.status === 'available').length})
          </button>
          
          {(currentUser?.role === 'donor' || currentUser?.role === 'admin') && (
            <button
              id="pane-create-btn"
              onClick={() => setActivePane('create')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                activePane === 'create' 
                  ? 'bg-orange-600 text-white shadow-sm font-extrabold' 
                  : 'text-gray-600 hover:text-orange-500 dark:text-gray-300'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t.nav.donate}</span>
            </button>
          )}
        </div>
      </div>

      {/* Pane 1: CREATING DONATION SURPLUS LISTING FORM */}
      {activePane === 'create' && (
        <div className="mt-8 max-w-3xl mx-auto">
          {createdOk ? (
            <div className="rounded-3xl border border-green-500/20 bg-green-500/10 p-8 text-center text-white py-16 space-y-4">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white">SURPLUS CARGO DEPLOYED!</h4>
              <p className="text-xs text-gray-400">Listed successfully. Real-time notifications have been fired off to nearby certified NGO units.</p>
              <span className="text-[10px] text-green-600 font-extrabold animate-pulse block">ROUTING SYSTEM STABILIZED</span>
            </div>
          ) : (
            <div className="rounded-3xl border border-gray-150 dark:border-gray-850 bg-white dark:bg-gray-900 shadow-xl p-6 sm:p-10 text-left">
              <div className="flex items-center space-x-2 text-orange-600 dark:text-orange-400 mb-6">
                <PlusCircle className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">Kitchen Logistics Intake Form</span>
              </div>

              <form onSubmit={handlePostDonation} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t.form.foodTitle}</label>
                  <input 
                    type="text" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t.form.foodTitlePl}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-xs text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t.form.category}</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as FoodCategory)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs text-gray-950 dark:text-gray-100 font-bold focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="cooked">{t.categories.cooked}</option>
                      <option value="raw">{t.categories.raw}</option>
                      <option value="packaged">{t.categories.packaged}</option>
                      <option value="dry">{t.categories.dry}</option>
                      <option value="beverage">{t.categories.beverage}</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{t.form.quantity}</label>
                    <input 
                      type="text" 
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder={t.form.quantityPl}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-xs text-gray-900 dark:text-gray-100 focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{t.form.expiry}</label>
                    <select
                      value={expiryHours}
                      onChange={(e) => setExpiryHours(parseInt(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs text-gray-950 dark:text-gray-100 font-bold focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="2">2 Hours (Very Critical)</option>
                      <option value="4">4 Hours (Urgent)</option>
                      <option value="8">8 Hours (Standard)</option>
                      <option value="24">24 Hours (Fresh Raw)</option>
                      <option value="120">5 Days (Groceries)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{t.form.address}</label>
                    <input 
                      type="text" 
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={t.form.addressPl}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-xs text-gray-900 dark:text-gray-100 mb-2"
                    />
                    <label className="text-[10px] text-gray-500 italic block mb-1">Pin Exact Location on Map</label>
                    <LocationPickerMap onLocationSelect={(newLat, newLng) => { setLat(newLat); setLng(newLng); }} defaultLat={lat} defaultLng={lng} />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{t.form.imageUrl}</label>
                    <input 
                      type="url" 
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-xs text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">{t.form.instructions}</label>
                  <textarea 
                    rows={2}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder={t.form.instructionsPl}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent text-xs text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div className="flex items-center space-x-2 bg-orange-50/50 dark:bg-orange-950/10 p-3 rounded-xl border border-orange-500/10 text-xs text-gray-500 dark:text-gray-400">
                  <Info className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>By submitting, you guarantee that all ingredients comply fully with national local sanitary guidelines and cleanliness levels.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-extrabold text-xs tracking-wider uppercase cursor-pointer transition-colors"
                >
                  {t.buttons.submit}
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Pane 2: BROWSING AVAILABLE FOOD DONATIONS */}
      {activePane === 'browse' && (
        <div className="mt-8 space-y-6">
          
          {/* SEARCH & FILTERS BAR */}
          <div className="flex flex-col md:flex-row items-center gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl border border-gray-150 dark:border-gray-800">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search food by donor, category, or location..."
                className="w-full pl-10 pr-4 py-2 text-xs bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 rounded-xl border border-gray-150 dark:border-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            {/* Category selection */}
            <div className="flex items-center space-x-1 w-full md:w-auto">
              <span className="text-[10px] font-black uppercase text-gray-400 pr-1 hidden lg:inline">Category:</span>
              <select
                value={selectedCatFilter}
                onChange={(e) => setSelectedCatFilter(e.target.value)}
                className="flex-1 md:flex-initial text-xs bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-xl border border-gray-150 dark:border-gray-800"
              >
                <option value="all">All Food Types</option>
                <option value="cooked">Fresh Cooked</option>
                <option value="raw">Raw Vegetables</option>
                <option value="packaged">Packaged Snacks</option>
                <option value="dry">Groceries/Dry Staples</option>
              </select>
            </div>

            {/* Status selection */}
            <div className="flex items-center space-x-1 w-full md:w-auto">
              <span className="text-[10px] font-black uppercase text-gray-400 pr-1 hidden lg:inline">Status:</span>
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value)}
                className="flex-1 md:flex-initial text-xs bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 px-3 py-2 rounded-xl border border-gray-150 dark:border-gray-800"
              >
                <option value="available">Available Listings</option>
                <option value="claimed">Claimed Cargo</option>
                <option value="in-transit">In Transit</option>
                <option value="completed">Distributed</option>
                <option value="all">Show All Archives</option>
              </select>
            </div>

          </div>

          {/* GRID OF INTAKES */}
          {filteredDonations.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-950 rounded-2xl border border-gray-150 dark:border-gray-900">
              <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-3 animate-pulse" />
              <p className="text-sm font-bold text-gray-600 dark:text-gray-400">No surplus items match requirements.</p>
              <p className="text-xs text-gray-400 mt-1">Try resetting the status/category filters above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredDonations.map((item) => (
                <div 
                  key={item.id}
                  className="rounded-3xl border border-gray-150 dark:border-gray-850 bg-white dark:bg-gray-900 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between text-left group"
                >
                  
                  {/* Card Header Image */}
                  <div className="relative h-44 w-full bg-slate-200 overflow-hidden shrink-0">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Expiry Time countdown sticker */}
                    {item.status === 'available' && (
                      <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center space-x-1 shadow-md">
                        <Clock className="w-3 h-3 animate-spin-slow" />
                        <span>Expires {item.expiryHours} hr</span>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`text-[9px] font-extrabold uppercase px-2.5 py-1 rounded-full border shadow-md ${
                        item.status === 'completed' ? 'bg-green-100 text-green-700 border-green-200' :
                        item.status === 'claimed' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                        item.status === 'in-transit' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                        'bg-orange-500 text-white border-transparent'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Info Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${getCategoryTheme(item.category)}`}>
                          {item.category}
                        </span>
                        <span className="text-[11px] font-extrabold text-orange-600 dark:text-orange-400 font-mono">
                          {item.quantity}
                        </span>
                      </div>

                      <h4 className="text-sm font-extrabold text-gray-950 dark:text-white leading-snug line-clamp-2">
                        {item.title}
                      </h4>

                      <div className="text-[11px] text-gray-500 dark:text-gray-400 space-y-1">
                        <p className="flex items-center space-x-1">
                          <span className="font-bold text-gray-700 dark:text-gray-300">Donor:</span> 
                          <span>{item.donorName}</span>
                        </p>
                        <p className="flex items-start space-x-1">
                          <MapPin className="w-3.5 h-3.5 mt-0.5 text-gray-400 shrink-0" />
                          <span className="line-clamp-1">{item.location}</span>
                        </p>
                      </div>

                      {item.instructions && (
                        <p className="text-[10px] text-gray-400 bg-gray-50 dark:bg-gray-950 p-2 rounded-lg leading-normal italic line-clamp-2">
                          Safety: {item.instructions}
                        </p>
                      )}
                    </div>

                    {/* Card Actions Footer */}
                    <div className="pt-3 border-t border-gray-100 dark:border-gray-800/40">
                      {item.status === 'available' ? (
                        <button
                          onClick={() => handleClaim(item)}
                          className="w-full py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold text-xs tracking-wider uppercase transition-all cursor-pointer"
                        >
                          {t.buttons.claim}
                        </button>
                      ) : (
                        <div className="bg-gray-50 dark:bg-gray-950 px-3 py-2 rounded-xl flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span className="font-bold text-gray-600 dark:text-gray-300">Rescued By:</span>
                          <span className="font-extrabold text-orange-600 dark:text-orange-400 max-w-[130px] line-clamp-1">
                            {item.claimedByNgoName || 'Verified Partner'}
                          </span>
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
