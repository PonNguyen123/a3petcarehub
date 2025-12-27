
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Maximize2, X, Search, Navigation, MapPin, ZoomIn, ZoomOut, AlertTriangle } from 'lucide-react';
import { MOCK_STORES } from '../constants';
import { MapMarker } from '../types';

const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const HospitalIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const StoreIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const UserLocationIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const ChangeView: React.FC<{ center: [number, number], zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const MapModule: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const [destination, setDestination] = useState<string>('');
  const [searchPos, setSearchPos] = useState<[number, number] | null>(null);
  const [suggestedPlace, setSuggestedPlace] = useState<MapMarker | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserPos([position.coords.latitude, position.coords.longitude]);
      }, () => {
        setUserPos([10.762622, 106.660172]); // Default to TP.HCM
      });
    }
  }, []);

  const handleSearch = () => {
    const newPos: [number, number] = [10.7769, 106.7009]; // Fake TP.HCM destination
    setSearchPos(newPos);
    const nearest = MOCK_STORES[0];
    setSuggestedPlace(nearest);
  };

  const getMidPoints = (start: [number, number], end: [number, number]) => {
    return [
      start,
      [(start[0] + end[0]) / 2 + 0.002, (start[1] + end[1]) / 2 - 0.002],
      end
    ] as [number, number][];
  };

  return (
    <div className={`relative transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 h-full' : 'h-[60vh] rounded-2xl overflow-hidden shadow-lg border'}`}>
      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2">
        <button 
          onClick={() => setIsFullscreen(!isFullscreen)} 
          className="bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          {isFullscreen ? <X size={20} /> : <Maximize2 size={20} />}
        </button>
      </div>

      <div className="absolute top-4 right-4 z-[1000] w-64 md:w-80">
        <div className="bg-white p-4 rounded-2xl shadow-xl space-y-3">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <Navigation className="text-blue-500" size={20} />
            Bạn muốn đi đâu?
          </h3>
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 border border-transparent focus-within:border-blue-400">
            <input 
              type="text" 
              placeholder="Tìm kiếm điểm đến..." 
              className="bg-transparent w-full outline-none text-sm"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch}><Search size={18} className="text-gray-400 hover:text-blue-500" /></button>
          </div>
          {suggestedPlace && (
            <div className="p-3 bg-red-50 rounded-xl border border-red-100 animate-pulse">
              <p className="text-xs text-red-600 font-semibold mb-1 uppercase tracking-wide">Gợi ý thông minh</p>
              <p className="text-sm font-bold text-gray-800">{suggestedPlace.name}</p>
              <p className="text-xs text-gray-500">Tiệm thú cưng gần nhất trên lộ trình!</p>
            </div>
          )}
        </div>
      </div>

      <MapContainer 
        center={userPos || [10.762622, 106.660172]} 
        zoom={13} 
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {userPos && (
          <>
            <Marker position={userPos} icon={UserLocationIcon}>
              <Popup>Bạn đang ở đây</Popup>
            </Marker>
            <ChangeView center={userPos} zoom={13} />
          </>
        )}

        {MOCK_STORES.map(item => (
          <Marker 
            key={item.id} 
            position={[item.lat, item.lng]} 
            icon={item.type === 'hospital' ? HospitalIcon : StoreIcon}
          >
            <Popup>
              <div className="p-1">
                <h4 className="font-bold">{item.name}</h4>
                <p className="text-xs text-gray-500">{item.address}</p>
                <button className="mt-2 text-xs bg-blue-500 text-white px-2 py-1 rounded w-full">Đến đây</button>
              </div>
            </Popup>
          </Marker>
        ))}

        {userPos && searchPos && (
          <>
            <Polyline 
              positions={getMidPoints(userPos, searchPos)} 
              pathOptions={{ color: '#FACC15', weight: 12, opacity: 0.4 }} 
            />
            <Polyline 
              positions={getMidPoints(userPos, searchPos)} 
              pathOptions={{ color: '#3B82F6', weight: 6 }} 
            />
          </>
        )}

        {userPos && suggestedPlace && (
          <Polyline 
            positions={getMidPoints(userPos, [suggestedPlace.lat, suggestedPlace.lng])} 
            pathOptions={{ color: '#EF4444', weight: 4, dashArray: '5, 10' }} 
          />
        )}
      </MapContainer>

      {searchPos && (
        <div className="absolute bottom-6 left-6 z-[1000] flex flex-col gap-2">
          <div className="bg-white/90 backdrop-blur p-3 rounded-xl shadow-lg border flex items-center gap-3">
             <div className="flex flex-col gap-1">
               <div className="flex items-center gap-2 text-xs font-semibold">
                 <div className="w-4 h-1 bg-blue-500"></div> Lộ trình chính
               </div>
               <div className="flex items-center gap-2 text-xs font-semibold">
                 <div className="w-4 h-1 bg-red-500 border-t border-dashed"></div> Điểm dừng thú cưng
               </div>
               <div className="flex items-center gap-2 text-xs font-semibold text-yellow-600">
                 <AlertTriangle size={14} /> Cảnh báo kẹt xe (Vàng)
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapModule;
