import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  Theme, 
  UserProfile, 
  FoodDonation, 
  PickupRequest, 
  AppNotification, 
  LeaderboardEntry, 
  FAQItem,
  UserRole,
  DonorType,
  FoodCategory,
  DonationStatus
} from '../types';

interface FoodBridgeContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  currentUser: UserProfile | null;
  setCurrentUser: (user: UserProfile | null) => void;
  users: UserProfile[];
  donations: FoodDonation[];
  pickupRequests: PickupRequest[];
  notifications: AppNotification[];
  leaderboardDonors: LeaderboardEntry[];
  leaderboardNgos: LeaderboardEntry[];
  foodSavedToday: number;
  triggerEmergencyRequest: (category: string, meals: number, location: string) => void;
  registerDonor: (name: string, email: string, phone: string, address: string, type: DonorType) => UserProfile;
  registerNgo: (name: string, email: string, phone: string, address: string, regId: string) => UserProfile;
  createDonation: (title: string, category: FoodCategory, quantity: string, quantityValue: number, expiryHours: number, location: string, instructions: string, lat: number, lng: number, imageUrl?: string) => void;
  claimDonation: (donationId: string, pickupTime?: string) => void;
  updateDonationStatus: (donationId: string, status: DonationStatus) => void;
  approveNgo: (ngoId: string) => void;
  rejectNgo: (ngoId: string) => void;
  addNotificationGlobal: (title: string, message: string, type: 'info' | 'success' | 'alert' | 'urgent') => void;
  mockLoginAs: (role: UserRole, subType?: string) => void;
}

const FoodBridgeContext = createContext<FoodBridgeContextType | undefined>(undefined);

export const FoodBridgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const API_URL = "http://localhost:5000";

  // Persistence 
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('foodbridge_lang') as Language) || 'en';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('foodbridge_theme') as Theme) || 'light';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('foodbridge_lang', lang);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('foodbridge_theme', newTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Pre-seeded Users / Profiles
  const defaultUsers: UserProfile[] = [
    {
      id: 'donor_hyatt',
      name: 'Grand Royal Banquet Hall',
      email: 'banquet@grandroyal.com',
      phone: '+91 98765 43210',
      address: 'Venkateshwara Hills Road, Hyderabad',
      role: 'donor',
      donorType: 'hotel',
      points: 1250,
      badges: ['Golden Heart', 'Surplus Slayer', 'Buffet Hero'],
      joinedDate: '2026-01-10',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'donor_annapurna',
      name: 'Annapurna Catering Services',
      email: 'contact@annacaters.co.in',
      phone: '+91 87654 32109',
      address: 'Sankey Road, Sadashivanagar, Bengaluru',
      role: 'donor',
      donorType: 'caterer',
      points: 840,
      badges: ['Zero Waste Champ', 'Wedding Saviour'],
      joinedDate: '2026-03-15',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'ngo_rotifoundation',
      name: 'Roti Seva Foundation',
      email: 'hope@rotiseva.org',
      phone: '+91 99887 76655',
      address: 'Gachibowli Ring Road Outer Corridor, Hyderabad',
      role: 'ngo',
      ngoRegId: 'NGO-HYD-55428-A',
      isVerified: true,
      points: 2100,
      badges: ['Super Distributor', 'Midnight Angels', 'Verified Ally'],
      joinedDate: '2025-11-01',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'ngo_feedinghands',
      name: 'Feeding Hands Mission',
      email: 'connect@feedinghands.org',
      phone: '+91 88990 11223',
      address: 'Anna Nagar West Block, Chennai',
      role: 'ngo',
      ngoRegId: 'NGO-TN-90112-B',
      isVerified: false, // For demoing approval flow
      points: 420,
      badges: ['Quick Responder'],
      joinedDate: '2026-05-20',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'admin_god',
      name: 'FoodBridge Global Admin',
      email: 'admin@foodbridge.org',
      phone: '+91 90000 00001',
      address: 'HQ Command Desk, New Delhi',
      role: 'admin',
      points: 9999,
      badges: ['Pioneer Defender'],
      joinedDate: '2025-01-01',
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
    }
  ];

  const [users, setUsers] = useState<UserProfile[]>(defaultUsers);

  // Current User (defaulted to Donor for high aesthetic visual walkthrough but switchable)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('foodbridge_currentuser');
    return saved ? JSON.parse(saved) : defaultUsers[0]; 
  });

  // Pre-seeded listings
  const defaultDonations: FoodDonation[] = [
    {
      id: 'donation_1',
      donorId: 'donor_hyatt',
      donorName: 'Grand Royal Banquet Hall',
      donorType: 'hotel',
      title: 'Buffet Feast: Jeera Rice, Paneer Butter Masala, Roti',
      category: 'cooked',
      quantity: '45 Servings',
      quantityValue: 45,
      expiryTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(), // 5 hours remaining
      expiryHours: 5,
      location: 'Venkateshwara Hills Road, Hyderabad',
      lat: 17.4126,
      lng: 78.4482,
      instructions: 'Fully packed in insulated carriers. Packed at 9:30 AM. Keep hot.',
      status: 'available',
      imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'donation_2',
      donorId: 'donor_annapurna',
      donorName: 'Annapurna Catering',
      donorType: 'caterer',
      title: 'Fresh Wedding surplus Vegetable Biryani & Raita',
      category: 'cooked',
      quantity: '120 Servings',
      quantityValue: 120,
      expiryTime: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
      expiryHours: 3,
      location: 'Sankey Road, Sadashivanagar, Bengaluru',
      lat: 13.0034,
      lng: 77.5796,
      instructions: 'Stored in premium food-grade aluminum buckets. High nutritional rating.',
      status: 'claimed',
      imageUrl: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=600&auto=format&fit=crop&q=80',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      claimedByNgoId: 'ngo_rotifoundation',
      claimedByNgoName: 'Roti Seva Foundation',
      pickupTime: '14:30'
    },
    {
      id: 'donation_3',
      donorId: 'donor_3',
      donorName: 'Aashirvad Kirana Stores',
      donorType: 'individual',
      title: 'Bulk Premium Wheat Flour (Atta) and Dal Packets',
      category: 'dry',
      quantity: '35 kg Staples',
      quantityValue: 70,
      expiryTime: new Date(Date.now() + 120 * 60 * 60 * 1000).toISOString(),
      expiryHours: 120,
      location: 'Madhapur Metro Corridor, Hyderabad',
      lat: 17.4485,
      lng: 78.3741,
      instructions: 'Brand new packaged items. Ideal for storage shelters.',
      status: 'available',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'donation_4',
      donorId: 'donor_4',
      donorName: 'Organic Greens Market',
      donorType: 'restaurant',
      title: 'Surplus Fresh Potatoes, Tomatoes & Onions',
      category: 'raw',
      quantity: '60 kg Fresh Produce',
      quantityValue: 120,
      expiryTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      expiryHours: 24,
      location: 'Koramangala 5th Block, Bengaluru',
      lat: 12.9348,
      lng: 77.6189,
      instructions: 'Raw vegetables, clean, sorted in crates.',
      status: 'in-transit',
      imageUrl: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=600&auto=format&fit=crop&q=80',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      claimedByNgoId: 'ngo_rotifoundation',
      claimedByNgoName: 'Roti Seva Foundation',
      pickupTime: '12:00'
    }
  ];

  const [donations, setDonations] = useState<FoodDonation[]>(defaultDonations);

  // Notifications
  const defaultNotifications: AppNotification[] = [
    {
      id: 'notif_1',
      title: 'Urgent Cargo Nearby',
      message: 'Urgent: 120 servings of fresh wedding biryani posted nearby in Sankey Road!',
      time: '10 Mins Ago',
      read: false,
      type: 'urgent'
    },
    {
      id: 'notif_2',
      title: 'NGO Verified',
      message: 'Roti Seva Foundation registration status has been successfully verified by Administrator.',
      time: '1 Hour Ago',
      read: true,
      type: 'success'
    },
    {
      id: 'notif_3',
      title: 'Carbon Offset Earned',
      message: 'Kudos! Your hotel saved 180kg food waste this week, negating 350kg CO2 emissions!',
      time: '1 Day Ago',
      read: true,
      type: 'info'
    }
  ];

  const [notifications, setNotifications] = useState<AppNotification[]>(defaultNotifications);

  const [foodSavedToday, setFoodSavedToday] = useState<number>(318);

  const fetchData = async () => {
    try {
      const usersRes = await fetch(`${API_URL}/users`);
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.map((u: any) => ({
          ...u,
          address: u.address || '',
          donorType: u.donor_type || 'individual',
          ngoRegId: u.ngo_reg_id || '',
          isVerified: u.is_verified || false,
          points: u.points || 100,
          badges: u.badges || [],
          joinedDate: u.created_at || new Date().toISOString()
        })));
      }

      const foodRes = await fetch(`${API_URL}/food`);
      if (foodRes.ok) {
        const foodData = await foodRes.json();
        setDonations(foodData.map((f: any) => ({
          ...f,
          donorId: f.donor_id,
          donorName: f.donor_name || 'Anonymous',
          donorType: 'individual',
          title: f.food_name || 'Food Donation',
          category: f.category || 'cooked',
          quantityValue: parseInt(f.quantity) || 10,
          expiryTime: f.expiry_time || new Date().toISOString(),
          expiryHours: 12,
          lat: f.latitude || 17.3850,
          lng: f.longitude || 78.4867,
          instructions: f.description || '',
          imageUrl: f.image_url || 'https://images.unsplash.com/photo-1488459711615-4f4047a0fc91?w=600&auto=format&fit=crop&q=80',
          createdAt: f.created_at || new Date().toISOString(),
          claimedByNgoId: f.assigned_ngo_id,
          claimedByNgoName: f.assigned_ngo_name,
          pickupTime: f.pickup_time
        })));
      }
    } catch (error) {
      console.error("Failed to fetch from backend", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  // Leaderboard data
  const defaultDonors: LeaderboardEntry[] = [
    { id: 'l_d1', name: 'Grand Royal Banquet Hall', role: 'donor', points: 2450, donationsCount: 38, badgesCount: 6, type: 'Hotel' },
    { id: 'l_d2', name: 'Taj Deccan Caterers', role: 'donor', points: 1980, donationsCount: 29, badgesCount: 5, type: 'Caterer' },
    { id: 'l_d3', name: 'Annapurna Catering Services', role: 'donor', points: 1840, donationsCount: 22, badgesCount: 4, type: 'Caterer' },
    { id: 'l_d4', name: 'Pista House Biryani Point', role: 'donor', points: 1510, donationsCount: 18, badgesCount: 3, type: 'Restaurant' },
    { id: 'l_d5', name: 'Individual Hero Amit Shah', role: 'donor', points: 950, donationsCount: 11, badgesCount: 2, type: 'Individual' }
  ];

  const defaultNgos: LeaderboardEntry[] = [
    { id: 'l_n1', name: 'Roti Seva Foundation', role: 'ngo', points: 3820, donationsCount: 82, badgesCount: 8 },
    { id: 'l_n2', name: 'Robin Hood Army Hyd', role: 'ngo', points: 3100, donationsCount: 64, badgesCount: 7 },
    { id: 'l_n3', name: 'Anubhavam Home Desk', role: 'ngo', points: 2240, donationsCount: 41, badgesCount: 5 },
    { id: 'l_n4', name: 'Feeding Hands Mission', role: 'ngo', points: 1840, donationsCount: 30, badgesCount: 3 },
    { id: 'l_n5', name: 'Nirmaan Youth Welfare', role: 'ngo', points: 1200, donationsCount: 19, badgesCount: 2 }
  ];

  const [leaderboardDonors, setLeaderboardDonors] = useState<LeaderboardEntry[]>(defaultDonors);
  const [leaderboardNgos, setLeaderboardNgos] = useState<LeaderboardEntry[]>(defaultNgos);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('foodbridge_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('foodbridge_currentuser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('foodbridge_donations', JSON.stringify(donations));
  }, [donations]);

  useEffect(() => {
    localStorage.setItem('foodbridge_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Periodic visual simulation (makes the application living and breathing for hackathon presentation!)
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Increment food saved count slightly
      setFoodSavedToday(prev => prev + parseFloat((Math.random() * 0.4).toFixed(1)));
      
      // 2. Randomly post a simulated notification after some minutes (let's do rare, e.g. 5% chance every 10 seconds)
      if (Math.random() < 0.08) {
        const foodItems = ['Veg Pulao', 'Paneer Curry', 'Roti wraps', 'Surplus Milk Packets', 'Samosa Boxes'];
        const item = foodItems[Math.floor(Math.random() * foodItems.length)];
        const locations = ['Hitec City', 'Secunderabad', 'Whitefield', 'Guindy', 'Jayanagar'];
        const loc = locations[Math.floor(Math.random() * locations.length)];
        const qty = Math.floor(Math.random() * 60) + 15;

        const newId = 'sim_notif_' + Date.now();
        const notificationText = `Emergency Surplus Alert: ${qty} meals of delicious ${item} is available for dispatch at ${loc}!`;

        setNotifications(prev => [
          {
            id: newId,
            title: 'New Emergency Surplus Listing',
            message: notificationText,
            time: 'Just Now',
            read: false,
            type: 'urgent'
          },
          ...prev
        ]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Actions
  const registerDonor = (name: string, email: string, phone: string, address: string, type: DonorType): UserProfile => {
    fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, role: 'donor' })
    }).then(() => fetchData()).catch(console.error);

    const newUser: UserProfile = {
      id: `donor_${Date.now()}`,
      name, email, phone, address, role: 'donor', donorType: type,
      points: 100, badges: ['First Responder Badge'], joinedDate: new Date().toISOString(),
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 900000)}?w=150&auto=format&fit=crop&q=80`
    };
    setCurrentUser(newUser);
    addNotificationGlobal('Account Created Successfully', `Welcome ${name}! Setup completed as ${type}.`, 'success');
    return newUser;
  };

  const registerNgo = (name: string, email: string, phone: string, address: string, regId: string): UserProfile => {
    fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, role: 'ngo' })
    }).then(() => fetchData()).catch(console.error);

    const newUser: UserProfile = {
      id: `ngo_${Date.now()}`,
      name, email, phone, address, role: 'ngo', ngoRegId: regId, isVerified: false,
      points: 100, badges: ['Alliance Built Badge'], joinedDate: new Date().toISOString(),
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 900000)}?w=150&auto=format&fit=crop&q=80`
    };
    setCurrentUser(newUser);
    addNotificationGlobal('NGO Application Received', `Welcome ${name}! Your certificate is pending clearance.`, 'info');
    return newUser;
  };

  const createDonation = (
    title: string, category: FoodCategory, quantity: string, quantityValue: number, 
    expiryHours: number, location: string, instructions: string, lat: number, lng: number, imageUrl?: string
  ) => {
    if (!currentUser) return;
    const payload = {
      food_name: title,
      category,
      quantity,
      description: instructions,
      expiry_time: new Date(Date.now() + expiryHours * 60 * 60 * 1000).toISOString(),
      location,
      latitude: lat,
      longitude: lng,
      donor_id: currentUser.id,
      donor_name: currentUser.name,
      image_url: imageUrl || 'https://images.unsplash.com/photo-1488459711615-4f4047a0fc91?w=600&auto=format&fit=crop&q=80'
    };
    
    fetch(`${API_URL}/food`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(() => fetchData()).catch(console.error);

    addNotificationGlobal('New Cargo Posted', `${currentUser.name} has posted ${quantity} of food.`, 'urgent');
  };

  const claimDonation = (donationId: string, pickupTime?: string) => {
    if (!currentUser || currentUser.role !== 'ngo') return;
    
    fetch(`${API_URL}/pickup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ food_id: donationId, ngo_id: currentUser.id })
    }).catch(console.error);

    fetch(`${API_URL}/food/${donationId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        status: 'claimed', 
        assigned_ngo_id: currentUser.id,
        assigned_ngo_name: currentUser.name,
        pickup_time: pickupTime || 'As soon as possible'
      })
    }).then(() => fetchData()).catch(console.error);

    addNotificationGlobal('Donation Cargo Claimed', `Claimed successfully.`, 'success');
  };

  const updateDonationStatus = (donationId: string, status: DonationStatus) => {
    fetch(`${API_URL}/food/${donationId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    }).then(() => fetchData()).catch(console.error);
  };

  const approveNgo = (ngoId: string) => {
    fetch(`${API_URL}/users/${ngoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_verified: true })
    }).then(() => fetchData()).catch(console.error);

    if (currentUser && currentUser.id === ngoId) {
      setCurrentUser(prev => prev ? { ...prev, isVerified: true } : null);
    }
    addNotificationGlobal('NGO Verification Certified', 'NGO approved successfully.', 'success');
  };

  const rejectNgo = (ngoId: string) => {
    fetch(`${API_URL}/users/${ngoId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_verified: false })
    }).then(() => fetchData()).catch(console.error);
    addNotificationGlobal('NGO Verification Rejected', 'NGO rejected successfully.', 'alert');
  };

  const triggerEmergencyRequest = (category: string, meals: number, location: string) => {
    const title = `🚨 EMERGENCY: Urgent request for ${meals} servings of ${category}!`;
    const message = `A local flood shelter/crisis center at ${location} is in immediate need of warm food cargo. Route volunteers immediately!`;
    
    addNotificationGlobal(
      `CRITICAL EMERGENCY`,
      `${meals} servings of ${category} required at ${location}. Claim to save lives!`,
      'urgent'
    );

    // Create a special custom "wanted" donation listing by NGO
    const emergencyListing: FoodDonation = {
      id: `emergency_${Date.now()}`,
      donorId: 'ngo_rotifoundation',
      donorName: 'Roti Seva Foundation',
      donorType: 'ngo', 
      title: `CRITICAL NEED: ${meals} x ${category} for refuge center`,
      category: 'cooked',
      quantity: `${meals} Servings Needed`,
      quantityValue: meals,
      expiryTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      expiryHours: 4,
      location,
      lat: 17.3850 + (Math.random() - 0.5) * 0.1,
      lng: 78.4867 + (Math.random() - 0.5) * 0.1,
      instructions: 'EMERGENCY RED ALERT. Safe transport and immediate delivery required.',
      status: 'available',
      imageUrl: 'https://images.unsplash.com/photo-1488459711615-4f4047a0fc91?w=600&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString()
    };

    setDonations(prev => [emergencyListing, ...prev]);
  };

  const addNotificationGlobal = (title: string, message: string, type: 'info' | 'success' | 'alert' | 'urgent') => {
    // We post to backend if we have a current user
    if (currentUser) {
      fetch(`${API_URL}/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentUser.id, message: `${title}: ${message}` })
      }).catch(console.error);
    }
    
    // Also update locally immediately for snappy UI
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      title,
      message,
      time: 'Just Now',
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Switch role seamlessly for judges (Magic wand helper)
  const mockLoginAs = (role: UserRole, subType?: string) => {
    if (role === 'donor') {
      const target = users.find(u => u.role === 'donor' && u.donorType === (subType || 'hotel')) || users.find(u => u.role === 'donor') || defaultUsers[0];
      setCurrentUser(target);
      addNotificationGlobal('Switched Profile Workspace', `Logged in as donor: ${target.name} (${target.donorType})`, 'info');
    } else if (role === 'ngo') {
      const isVerified = subType === 'verified';
      const target = users.find(u => u.role === 'ngo' && (isVerified ? u.isVerified : !u.isVerified)) || users.find(u => u.role === 'ngo') || defaultUsers[2];
      setCurrentUser(target);
      addNotificationGlobal('Switched Profile Workspace', `Logged in as NGO partner: ${target.name} (${isVerified ? 'Verified' : 'Pending verification'})`, 'info');
    } else if (role === 'admin') {
      const target = users.find(u => u.role === 'admin') || defaultUsers[4];
      setCurrentUser(target);
      addNotificationGlobal('Command Console Unlocked', `Logged in as Global Platform Administrator`, 'success');
    } else {
      // Anonymous
      setCurrentUser(null);
      addNotificationGlobal('Visitor Workspace Actived', 'Surfing anonymously. Registration accessible.', 'info');
    }
  };

  return (
    <FoodBridgeContext.Provider value={{
      language,
      setLanguage,
      theme,
      setTheme,
      currentUser,
      setCurrentUser,
      users,
      donations,
      pickupRequests: [], // can be derived or stored if necessary
      notifications,
      leaderboardDonors,
      leaderboardNgos,
      foodSavedToday,
      triggerEmergencyRequest,
      registerDonor,
      registerNgo,
      createDonation,
      claimDonation,
      updateDonationStatus,
      approveNgo,
      rejectNgo,
      addNotificationGlobal,
      mockLoginAs
    }}>
      <div className={theme === 'dark' ? 'dark text-gray-100 bg-[#0b0f19] font-sans min-h-screen transition-colors duration-300' : 'text-gray-900 bg-white font-sans min-h-screen transition-colors duration-300'}>
        {children}
      </div>
    </FoodBridgeContext.Provider>
  );
};

export const useFoodBridge = () => {
  const context = useContext(FoodBridgeContext);
  if (!context) {
    throw new Error('useFoodBridge must be used within a FoodBridgeProvider');
  }
  return context;
};
