import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Compass,
  Footprints,
  Globe,
  Layers,
  MapPin,
  MessageSquare,
  Navigation,
  School,
  Search,
  ShieldCheck,
  Star,
  X,
  Eye,
} from 'lucide-react';
import { PropertyData } from './FigmaPropertyDetail';

export type MapTileMode = 'satellite' | 'streets' | 'voyager';

interface FigmaInteractiveMapProps {
  properties: PropertyData[];
  selectedPropertyId?: string;
  onBack: () => void;
  onOpenDetails: (property: PropertyData) => void;
  onMessageLandlord: (property: PropertyData) => void;
}

// Bunawan, Agusan del Sur (ZIP 8506, Region XIII Caraga) Municipal & Campus Center
export const BUNAWAN_CENTER = {
  lat: 8.1692,
  lng: 126.0044,
  name: 'Bunawan Town Center (ZIP 8506)',
};

// ADSSU Bunawan Main Campus Landmark Coordinates (8°10'09"N 126°00'16"E)
export const ADSSU_CAMPUS = {
  lat: 8.1692,
  lng: 126.0044,
  name: 'ADSSU Bunawan Campus Main Gate',
};

// Coordinate lookup map for the 5 verified real boarding houses anchored in Bunawan municipal boundary
export const PROPERTY_COORDINATES: Record<string, [number, number]> = {
  'bh-dalayap': [8.1855, 125.9818],      // Jiomer Dalayap Boarding House (Purok 8, Poblacion, Bunawan ~0.6 km)
  'bh-cabanillia': [8.1715, 125.9752],   // Cabanillia Boarding House (Purok San Teodoro, Bunawan ~0.7 km)
  'bh-quintas': [8.1868, 125.9830],      // Flordeliza Quintas Boarding House (Purok 3, San Jose, Bunawan ~0.5 km)
  'bh-hiponia': [8.1880, 125.9842],      // Hiponia's Boarding House (Purok 3, San Jose, Bunawan ~0.8 km)
  'bh-uno': [8.1702, 125.9735],          // UNO Boarding House - Rhejie Largo (P-4 San Teodoro, Bunawan ~0.7 km)
  // Legacy alias IDs
  'bh-fritzcel': [8.1855, 125.9818],
  'bh-campusview': [8.1835, 125.9770],
  'bh-jolina': [8.1880, 125.9842],
  'bh-sanjose': [8.1868, 125.9830],
  'bh-bunawanlodge': [8.1702, 125.9735],
  'bh-lodge': [8.1702, 125.9735],
  'bh-daman': [8.1868, 125.9830],
  'bh-santeodoro': [8.1715, 125.9752],
};

export const FigmaInteractiveMap: React.FC<FigmaInteractiveMapProps> = ({
  properties,
  selectedPropertyId,
  onBack,
  onOpenDetails,
  onMessageLandlord,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const activeTileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routePolylineRef = useRef<L.Polyline | null>(null);
  const isInitialMountRef = useRef<boolean>(true);

  const [mapTileMode, setMapTileMode] = useState<MapTileMode>('satellite');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(
    Math.max(
      0,
      properties.findIndex((p) => p.id === selectedPropertyId)
    )
  );

  const currentProperty = properties[selectedIndex] || properties[0];

  // Helper to get coordinates for any property anchored within Bunawan
  const getCoords = (property: PropertyData): [number, number] => {
    if (PROPERTY_COORDINATES[property.id]) {
      return PROPERTY_COORDINATES[property.id];
    }
    // Fallback spread within Bunawan municipal boundary around center
    const idx = properties.findIndex((p) => p.id === property.id);
    return [
      BUNAWAN_CENTER.lat + (idx % 2 === 0 ? 0.0035 : -0.0035),
      BUNAWAN_CENTER.lng + (idx > 1 ? 0.004 : -0.003),
    ];
  };

  // Switch Tile Layer
  const setTileMode = (mode: MapTileMode) => {
    if (!mapInstanceRef.current) return;
    setMapTileMode(mode);

    if (activeTileLayerRef.current) {
      mapInstanceRef.current.removeLayer(activeTileLayerRef.current);
    }

    let url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    let attribution = '&copy; Esri, Maxar, Earthstar Geographics';
    let maxZoom = 19;

    if (mode === 'streets') {
      url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution = '&copy; OpenStreetMap contributors';
    } else if (mode === 'voyager') {
      url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      attribution = '&copy; OpenStreetMap contributors &copy; CARTO';
    }

    const newLayer = L.tileLayer(url, { attribution, maxZoom });
    newLayer.addTo(mapInstanceRef.current);
    activeTileLayerRef.current = newLayer;
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [BUNAWAN_CENTER.lat, BUNAWAN_CENTER.lng],
        zoom: 14,
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        touchZoom: true,
        scrollWheelZoom: false,
      });

      // Default to real Esri satellite imagery
      const satelliteLayer = L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          attribution: '&copy; Esri, Maxar',
          maxZoom: 19,
        }
      );
      satelliteLayer.addTo(map);
      activeTileLayerRef.current = satelliteLayer;

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;

      mapInstanceRef.current = map;
    }

    // Force map to re-calculate container dimensions
    setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 200);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers & Walking Route when selected property changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersLayerRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    // 1. ADSSU Campus Gate Landmark Marker
    const campusIcon = L.divIcon({
      className: 'adssu-campus-pin',
      html: `
        <div style="display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -100%); pointer-events:auto; cursor:pointer;">
          <div style="background:#053728; border:2px solid #E5A93C; color:#FFFFFF; font-size:10px; font-weight:bold; padding:4px 8px; border-radius:9999px; box-shadow:0 4px 14px rgba(0,0,0,0.4); display:flex; align-items:center; gap:4px; white-space:nowrap;">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#E5A93C" stroke="#E5A93C" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            <span>ADSSU Campus Gate</span>
          </div>
          <div style="width:14px; height:14px; background:#053728; border:2px solid #E5A93C; border-radius:50%; margin-top:2px; box-shadow:0 0 10px rgba(229,169,60,0.8);"></div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0],
    });

    const campusMarker = L.marker([ADSSU_CAMPUS.lat, ADSSU_CAMPUS.lng], { icon: campusIcon });
    campusMarker.bindTooltip('Agusan del Sur State University · Bunawan Main Gate', {
      direction: 'top',
      offset: [0, -28],
    });
    campusMarker.addTo(markersGroup);

    // 2. Boarding House Markers
    properties.forEach((property, idx) => {
      const isSelected = property.id === currentProperty.id;
      const coords = getCoords(property);

      const houseIcon = L.divIcon({
        className: `bh-pin-${property.id}`,
        html: `
          <div style="display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -100%); cursor:pointer;">
            <div style="background:${isSelected ? '#00875A' : '#FFFFFF'}; color:${isSelected ? '#FFFFFF' : '#0F172A'}; border:2px solid ${isSelected ? '#E5A93C' : '#CBD5E1'}; font-size:11px; font-weight:800; padding:4px 8px; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.35); display:flex; align-items:center; gap:4px; white-space:nowrap; transition:all 0.2s;">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="${isSelected ? '#E5A93C' : '#00875A'}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              <span>${property.price}</span>
            </div>
            <div style="width:12px; height:12px; background:${isSelected ? '#00875A' : '#FFFFFF'}; border:2px solid ${isSelected ? '#E5A93C' : '#64748B'}; border-radius:50%; margin-top:2px;"></div>
            ${isSelected ? '<div style="position:absolute; width:34px; height:34px; border:2px solid #E5A93C; border-radius:50%; animation:ping 1.5s cubic-bezier(0,0,0.2,1) infinite; opacity:0.6; pointer-events:none; margin-top:-10px;"></div>' : ''}
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });

      const houseMarker = L.marker(coords, { icon: houseIcon });
      
      const popupHtml = `
        <div style="font-family: system-ui, -apple-system, sans-serif; padding: 4px; min-width: 200px;">
          <div style="font-size: 13px; font-weight: 800; color: #0F172A; margin-bottom: 4px;">${property.name}</div>
          <div style="font-size: 11px; color: #475569; display: flex; align-items: start; gap: 4px; margin-bottom: 6px; line-height: 1.3;">
            <span style="color: #F43F5E; font-weight: bold;">📍</span>
            <span>${property.location}</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #E2E8F0; pt-2; margin-top: 4px; padding-top: 4px; font-size: 11px;">
            <span style="font-weight: 700; color: #00875A;">${property.price}/mo</span>
            <span style="color: #64748B;">Landlord: <strong>${property.ownerName}</strong></span>
          </div>
        </div>
      `;

      houseMarker.bindPopup(popupHtml, {
        offset: [0, -25],
        closeButton: false,
      });

      houseMarker.on('click', () => {
        setSelectedIndex(idx);
        houseMarker.openPopup();
      });

      houseMarker.addTo(markersGroup);

      if (isSelected) {
        setTimeout(() => {
          houseMarker.openPopup();
        }, 300);
      }
    });

    // 3. Draw Walking Route from ADSSU to Current Selected House
    if (routePolylineRef.current) {
      map.removeLayer(routePolylineRef.current);
    }

    const currentCoords = getCoords(currentProperty);
    // Intermediate waypoint for realistic road navigation
    const midLat = (ADSSU_CAMPUS.lat + currentCoords[0]) / 2 + 0.0003;
    const midLng = (ADSSU_CAMPUS.lng + currentCoords[1]) / 2 - 0.0002;

    const routeCoords: [number, number][] = [
      [ADSSU_CAMPUS.lat, ADSSU_CAMPUS.lng],
      [midLat, midLng],
      [currentCoords[0], currentCoords[1]],
    ];

    const polyline = L.polyline(routeCoords, {
      color: '#E5A93C',
      weight: 4,
      dashArray: '8, 8',
      opacity: 0.9,
    }).addTo(map);

    routePolylineRef.current = polyline;

    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      map.setView([BUNAWAN_CENTER.lat, BUNAWAN_CENTER.lng], 14);
    } else {
      // Pan smoothly to focus the path between ADSSU and the property
      const bounds = L.latLngBounds([
        [ADSSU_CAMPUS.lat, ADSSU_CAMPUS.lng],
        [currentCoords[0], currentCoords[1]],
      ]);
      map.flyToBounds(bounds, {
        padding: [80, 80],
        duration: 1.2,
        maxZoom: 16,
      });
    }
  }, [selectedIndex, properties]);

  // Recenter on Bunawan Town Center & ADSSU Campus (8.1822, 125.9794)
  const handleRecenterCampus = () => {
    mapInstanceRef.current?.flyTo([BUNAWAN_CENTER.lat, BUNAWAN_CENTER.lng], 14, { duration: 1 });
  };

  // Zoom controls
  const handleZoomIn = () => mapInstanceRef.current?.zoomIn();
  const handleZoomOut = () => mapInstanceRef.current?.zoomOut();

  // Next / Previous property
  const handleNext = () => {
    setSelectedIndex((prev) => (prev < properties.length - 1 ? prev + 1 : 0));
  };
  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : properties.length - 1));
  };

  // Filtered properties based on search query
  const filteredProperties = properties.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.ownerName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="relative w-full h-full min-h-[700px] flex flex-col justify-between select-none overflow-hidden font-sans">
      {/* Real Interactive Leaflet Map Container */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Top Floating Control Bar */}
      <div className="relative z-20 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Back Button & Title */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={onBack}
            className="px-3.5 py-2 rounded-2xl bg-white/95 hover:bg-white text-slate-800 font-bold text-xs shadow-lg border border-slate-200/80 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer backdrop-blur-xs"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-800" />
            <span>Back to Directory</span>
          </button>
        </div>

        {/* Real-Time Layer Switcher (Satellite vs Street Map) */}
        <div className="flex items-center gap-1.5 bg-white/95 p-1 rounded-2xl shadow-lg border border-slate-200/80 pointer-events-auto backdrop-blur-xs">
          <button
            onClick={() => setTileMode('satellite')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              mapTileMode === 'satellite'
                ? 'bg-[#00875A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Satellite</span>
          </button>

          <button
            onClick={() => setTileMode('streets')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              mapTileMode === 'streets'
                ? 'bg-[#00875A] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Street Map</span>
          </button>
        </div>
      </div>

      {/* Side Zoom & Recenter Controls */}
      <div className="absolute right-3 top-16 sm:top-20 z-20 flex flex-col gap-2 pointer-events-auto">
        <button
          onClick={handleRecenterCampus}
          className="w-10 h-10 rounded-2xl bg-white/95 hover:bg-white text-emerald-800 shadow-lg border border-slate-200/80 flex items-center justify-center transition-all active:scale-95 cursor-pointer"
          title="Recenter on Bunawan Town Center (8.1692° N, 126.0044° E) & ADSSU Campus"
        >
          <School className="w-5 h-5 text-[#E5A93C]" />
        </button>

        <button
          onClick={handleZoomIn}
          className="w-10 h-10 rounded-2xl bg-white/95 hover:bg-white text-slate-800 font-bold shadow-lg border border-slate-200/80 flex items-center justify-center transition-all active:scale-95 cursor-pointer text-lg"
          title="Zoom In"
        >
          +
        </button>

        <button
          onClick={handleZoomOut}
          className="w-10 h-10 rounded-2xl bg-white/95 hover:bg-white text-slate-800 font-bold shadow-lg border border-slate-200/80 flex items-center justify-center transition-all active:scale-95 cursor-pointer text-lg"
          title="Zoom Out"
        >
          −
        </button>
      </div>

      {/* Commute HUD Badge */}
      <div className="absolute top-16 left-3 sm:top-20 sm:left-4 z-20 pointer-events-auto max-w-[calc(100vw-70px)]">
        <div className="px-3.5 py-2 rounded-2xl bg-[#053728]/95 text-white border border-[#E5A93C]/60 shadow-xl flex items-center gap-2.5 backdrop-blur-xs text-xs">
          <Footprints className="w-4 h-4 text-[#E5A93C] shrink-0" />
          <div>
            <div className="font-bold text-white flex items-center gap-1.5 leading-tight flex-wrap">
              <span>{currentProperty.distance} to ADSSU Gate</span>
              <span className="text-[#E5A93C]">•</span>
              <span className="text-emerald-200">🚶 {currentProperty.walkTime}</span>
              <span className="text-[#E5A93C]">•</span>
              <span className="text-amber-300">🛺 {currentProperty.trikeTime || '3 min trike'}</span>
            </div>
            <span className="text-[10px] text-slate-300 truncate block">
              Bunawan, Agusan del Sur (ZIP 8506) · 8.1692° N, 126.0044° E
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Floating Card: Currently Selected Boarding House Drawer */}
      <div className="absolute bottom-4 left-3 right-3 sm:left-4 sm:right-auto sm:bottom-6 sm:max-w-xl z-30 pointer-events-auto">
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-6">
          {/* Property Image & Badge */}
          <div
            onClick={() => onOpenDetails(currentProperty)}
            className="relative w-full sm:w-36 h-28 sm:h-24 rounded-2xl overflow-hidden shrink-0 cursor-pointer group"
          >
            <img
              src={currentProperty.image}
              alt={currentProperty.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-[#00875A] text-white text-[9px] font-bold flex items-center gap-1 shadow-xs">
              <ShieldCheck className="w-2.5 h-2.5" />
              <span>VERIFIED</span>
            </div>
            <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-lg bg-black/75 text-[#34D399] font-bold text-[10px]">
              {currentProperty.price}
              <span className="text-[9px] text-slate-300 font-normal">/mo</span>
            </div>
          </div>

          {/* Details Column */}
          <div className="flex-1 min-w-0 w-full text-left space-y-1">
            <div className="flex items-center justify-between gap-2">
              <h4
                onClick={() => onOpenDetails(currentProperty)}
                className="text-sm font-bold text-slate-900 truncate cursor-pointer hover:text-[#00875A] transition-colors"
              >
                {currentProperty.name}
              </h4>
              <div className="flex items-center text-xs font-bold text-amber-500 shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="ml-1">{currentProperty.rating}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
              <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
              <span className="truncate">{currentProperty.location}</span>
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-[#00875A] text-[10px] font-bold border border-emerald-200 flex items-center gap-1">
                <span>🚶</span>
                <span>{currentProperty.walkTime}</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200 flex items-center gap-1">
                <span>🛺</span>
                <span>{currentProperty.trikeTime || '3 min trike'}</span>
              </span>
              <span className="text-[10px] text-slate-400">
                Landlord: {currentProperty.ownerName}
              </span>
            </div>
          </div>

          {/* Action Buttons Column */}
          <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
            <button
              onClick={() => onOpenDetails(currentProperty)}
              className="flex-1 sm:flex-none py-2 px-3.5 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View Details</span>
            </button>

            <button
              onClick={() => onMessageLandlord(currentProperty)}
              className="flex-1 sm:flex-none py-2 px-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 text-slate-600" />
              <span>Chat Landlord</span>
            </button>
          </div>

          {/* Navigation Arrows for House Carousel */}
          <div className="flex sm:flex-col items-center gap-1 border-t sm:border-t-0 sm:border-l border-slate-100 pt-2 sm:pt-0 sm:pl-3 w-full sm:w-auto justify-between">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              title="Previous House"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-[10px] font-bold text-slate-400">
              {selectedIndex + 1}/{properties.length}
            </span>
            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              title="Next House"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
