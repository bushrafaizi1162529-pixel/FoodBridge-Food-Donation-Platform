import React, { useState, useEffect } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import { Compass, Target, Truck, Info, Navigation } from 'lucide-react';

// Fix Leaflet default icon issues in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to handle map panning
const MapPanner = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
};

// Component to handle Map Routing
const MapRouter = ({ from, to }: { from: [number, number], to: [number, number] | null }) => {
  const map = useMap();

  useEffect(() => {
    if (!to) return;
    
    // @ts-ignore
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(from[0], from[1]),
        L.latLng(to[0], to[1])
      ],
      lineOptions: {
        styles: [{ color: "#3b82f6", weight: 5, opacity: 0.8 }],
        extendToWaypoints: true,
        missingRouteTolerance: 0
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      createMarker: () => null // Hide default routing markers
    } as any).addTo(map);

    return () => {
      try {
        map.removeControl(routingControl);
      } catch (e) {}
    };
  }, [map, from, to]);

  return null;
};

// Create custom colored markers
const createColoredMarker = (color: string) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.4);"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
};

const markers = {
  available: createColoredMarker('#22c55e'), // Green
  claimed: createColoredMarker('#f97316'), // Orange
  'in-transit': createColoredMarker('#3b82f6'), // Blue
  completed: createColoredMarker('#6b7280'), // Gray
};

export const MapComponent: React.FC = () => {
  const { donations, theme } = useFoodBridge();
  const [selectedCity, setSelectedCity] = useState<'hyderabad' | 'bengaluru' | 'world'>('world');
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const centers = {
    hyderabad: { lat: 17.3850, lng: 78.4867, zoom: 12 },
    bengaluru: { lat: 12.9716, lng: 77.5946, zoom: 12 },
    world: { lat: 20.5937, lng: 78.9629, zoom: 4 } // Default to India/World view
  };

  const centerTuple: [number, number] = [centers[selectedCity].lat, centers[selectedCity].lng];
  const zoomLevel = centers[selectedCity].zoom;

  useEffect(() => {
    const handleSelect = (e: any) => {
      const node = e.detail;
      // We also update the node's status to 'claimed' since the event fires immediately after claim
      setSelectedNode({ ...node, status: 'claimed' });
      // If the node belongs to a different city, switch the city
      if (node.lat < 14.5 && selectedCity === 'hyderabad') {
        setSelectedCity('bengaluru');
      } else if (node.lat > 16.0 && selectedCity === 'bengaluru') {
        setSelectedCity('hyderabad');
      }
    };
    window.addEventListener('select-map-node', handleSelect);
    return () => window.removeEventListener('select-map-node', handleSelect);
  }, [selectedCity]);

  // Auto-select claimed node on mount if available
  useEffect(() => {
    if (!selectedNode) {
      const active = donations.find(d => d.status === 'claimed' || d.status === 'in-transit');
      if (active) {
        setSelectedNode(active);
        // Ensure city is correct
        if (active.lat < 14.5 && selectedCity === 'hyderabad') {
          setSelectedCity('bengaluru');
        } else if (active.lat > 16.0 && selectedCity === 'bengaluru') {
          setSelectedCity('hyderabad');
        }
      }
    }
  }, [donations, selectedNode, selectedCity]);

  // Filter listings based on selected city bounds approximately
  const cityDonations = donations.filter(d => {
    if (selectedCity === 'world') return true;
    if (selectedCity === 'hyderabad') {
      return d.lat > 16.0 && d.lat < 19.0;
    } else {
      return d.lat > 11.0 && d.lat < 14.5;
    }
  });

  // Determine Map Style based on App Theme
  const mapTileUrl = theme === 'dark' 
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";

  return (
    <div className="w-full rounded-3xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-xl p-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800 gap-3">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center space-x-2">
            <Compass className="w-5 h-5 text-orange-500 animate-spin-slow" />
            <span>Interactive Food Transport Grid Map</span>
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Real-time Live OpenStreetMap integration showing exact coordinate locations of donations.
          </p>
        </div>

        {/* City Filter Controller */}
        <div className="flex bg-gray-50 dark:bg-gray-950 p-1 rounded-xl self-start flex-wrap">
          <button
            onClick={() => { setSelectedCity('world'); setSelectedNode(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedCity === 'world' ? 'bg-orange-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300'}`}
          >
            World Map
          </button>
          <button
            onClick={() => { setSelectedCity('hyderabad'); setSelectedNode(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedCity === 'hyderabad' ? 'bg-orange-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300'}`}
          >
            Hyderabad HQ
          </button>
          <button
            onClick={() => { setSelectedCity('bengaluru'); setSelectedNode(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedCity === 'bengaluru' ? 'bg-orange-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300'}`}
          >
            Bengaluru East
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
        
        {/* Leaflet Map Area */}
        <div className="lg:col-span-3 h-80 sm:h-96 w-full rounded-2xl relative overflow-hidden flex items-center justify-center border border-gray-200 dark:border-gray-800">
          
          <MapContainer 
            center={centerTuple} 
            zoom={zoomLevel} 
            style={{ height: '100%', width: '100%', zIndex: 1 }}
            zoomControl={true}
            scrollWheelZoom={true}
          >
            <MapPanner center={centerTuple} zoom={zoomLevel} />
            <TileLayer
              url={mapTileUrl}
              attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            
            {/* Dynamic Routing (Visible only when a valid claimed/in-transit node is selected) */}
            <MapRouter 
              from={centerTuple} 
              to={selectedNode && (selectedNode.status === 'claimed' || selectedNode.status === 'in-transit') ? [selectedNode.lat, selectedNode.lng] : null} 
            />
            
            {/* Base Hub Marker */}
            <Marker 
              position={centerTuple} 
              icon={L.divIcon({
                className: 'custom-hub',
                html: `<div style="background-color: #ea580c; width: 16px; height: 16px; border-radius: 4px; display:flex; align-items:center; justify-content:center; color:white; font-size:10px; font-weight:bold; border:2px solid white;">H</div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8]
              })}
            >
              <Popup>
                <div className="text-center font-sans">
                  <h4 className="font-bold text-orange-600">Primary Base Depot</h4>
                  <p className="text-xs text-gray-500">Command Center</p>
                </div>
              </Popup>
            </Marker>

            {/* Donation Markers */}
            {cityDonations.map((d) => {
              const statusKey = d.status as keyof typeof markers;
              const icon = markers[statusKey] || markers.available;
              
              return (
                <Marker 
                  key={d.id} 
                  position={[d.lat, d.lng]} 
                  icon={icon}
                  eventHandlers={{
                    click: () => setSelectedNode(d),
                  }}
                >
                  <Popup>
                    <div className="p-1 min-w-[150px] font-sans">
                      {d.imageUrl && (
                        <img src={d.imageUrl} alt={d.title} className="w-full h-24 object-cover rounded-md mb-2" />
                      )}
                      <h4 className="font-bold text-gray-900 text-sm mb-1">{d.title}</h4>
                      <p className="text-xs text-gray-600 font-medium mb-1">Donor: {d.donorName}</p>
                      <p className="text-xs text-gray-600 font-medium mb-2">Quantity: {d.quantity}</p>
                      <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        d.status === 'completed' ? 'bg-gray-100 text-gray-600' :
                        d.status === 'claimed' ? 'bg-orange-100 text-orange-600' :
                        d.status === 'in-transit' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {d.status || 'available'}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Sidebar Info Panel */}
        <div className="lg:col-span-1 rounded-2xl bg-gray-50 dark:bg-gray-950 border border-gray-150 dark:border-gray-900/50 p-4 font-sans text-left flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-600 bg-orange-100/40 dark:bg-orange-950/20 px-2 py-0.5 rounded">
              Node inspector
            </span>

            {selectedNode ? (
              <div className="mt-3 space-y-3">
                {selectedNode.imageUrl && (
                  <img src={selectedNode.imageUrl} className="w-full h-24 object-cover rounded-xl" alt="Donation" />
                )}
                <div>
                  <label className="text-[10px] text-gray-400 block font-bold uppercase">Name</label>
                  <span className="text-xs font-bold text-gray-900 dark:text-gray-100 leading-tight block">
                    {selectedNode.donorName || selectedNode.name}
                  </span>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 block font-bold uppercase">Cargo Title</label>
                  <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 leading-tight block">
                    {selectedNode.title || 'N/A'}
                  </span>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 block font-bold uppercase">Load / Quantity</label>
                  <span className="text-xs font-extrabold text-orange-600 dark:text-orange-400">
                    {selectedNode.quantity}
                  </span>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 block font-bold uppercase">GPS location</label>
                  <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400 block flex items-center mt-0.5">
                    <Navigation className="w-3 h-3 mr-1 inline" />
                    {selectedNode.lat?.toFixed(4)}N, {selectedNode.lng?.toFixed(4)}E
                  </span>
                </div>
              </div>
            ) : (
              <div className="mt-8 text-center text-xs text-gray-400 py-10">
                <Target className="w-8 h-8 text-orange-400/40 mx-auto mb-2" />
                Select any colored marker on the live map to inspect loading details and donor information. 
                <br /><br />
                <span className="text-blue-500">Select a 'Claimed' or 'In Transit' donation to see the GPS routing path!</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
