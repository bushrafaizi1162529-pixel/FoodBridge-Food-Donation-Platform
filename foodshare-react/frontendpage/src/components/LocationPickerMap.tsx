import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface LocationPickerMapProps {
  onLocationSelect: (lat: number, lng: number) => void;
  defaultLat?: number;
  defaultLng?: number;
}

const LocationMarker = ({ onSelect, pos }: { onSelect: (l: L.LatLng) => void, pos: L.LatLng | null }) => {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });

  return pos === null ? null : (
    <Marker position={pos}></Marker>
  );
};

export const LocationPickerMap: React.FC<LocationPickerMapProps> = ({ 
  onLocationSelect, 
  defaultLat = 17.3850, 
  defaultLng = 78.4867 
}) => {
  const [position, setPosition] = useState<L.LatLng | null>(
    new L.LatLng(defaultLat, defaultLng)
  );

  const handleSelect = (latlng: L.LatLng) => {
    setPosition(latlng);
    onLocationSelect(latlng.lat, latlng.lng);
  };

  return (
    <div className="w-full h-48 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 relative">
      <MapContainer 
        center={[defaultLat, defaultLng]} 
        zoom={13} 
        style={{ height: '100%', width: '100%', zIndex: 1 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />
        <LocationMarker onSelect={handleSelect} pos={position} />
      </MapContainer>
    </div>
  );
};
