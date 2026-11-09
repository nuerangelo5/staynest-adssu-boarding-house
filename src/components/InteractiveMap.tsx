import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { BoardingHouse } from '../types/staynest';
import { ADSSU_CAMPUS_LOCATION } from '../data/mockData';
import {
  Compass,
  Globe,
  Layers,
  Map as MapIcon,
  MapPin,
  Navigation,
  School,
  Maximize2,
  Minimize2,
  X,
  Footprints,
} from 'lucide-react';

export type MapTileMode = 'streets' | 'satellite' | 'terrain';

interface InteractiveMapProps {
  houses: BoardingHouse[];
  selectedHouse: BoardingHouse | null;
  onSelectHouse: (house: BoardingHouse) => void;
  radiusFilterKm?: number;
  heightClass?: string;
  isModal?: boolean;
  onClose?: () => void;
  onToggleFullScreen?: () => void;
  isFullScreen?: boolean;
  onSwitchViewMode?: (mode: 'cards' | 'split' | 'map') => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  houses,
  selectedHouse,
  onSelectHouse,
  radiusFilterKm,
  heightClass = 'h-[500px]',
  isModal = false,
  onClose,
  onToggleFullScreen,
  isFullScreen = false,
  onSwitchViewMode,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const activeTileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLineRef = useRef<L.Polyline | null>(null);
  const radiusCircleRef = useRef<L.Circle | null>(null);

  const [mapReady, setMapReady] = useState(false);
  const [mapMode, setMapMode] = useState<MapTileMode>('streets');
  const [showRadiusRing, setShowRadiusRing] = useState(true);

  // Tile Configs for 3 Real Modes
  const getTileConfig = (mode: MapTileMode) => {
    switch (mode) {
      case 'satellite':
        return {
          url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          attribution: '&copy; Esri, Maxar, Earthstar Geographics',
          maxZoom: 19,
        };
      case 'terrain':
        return {
          url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
          maxZoom: 19,
        };
      case 'streets':
      default:
        return {
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19,
        };
    }
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const initialLat = selectedHouse ? selectedHouse.coordinates.lat : ADSSU_CAMPUS_LOCATION.lat;
      const initialLng = selectedHouse ? selectedHouse.coordinates.lng : ADSSU_CAMPUS_LOCATION.lng;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: selectedHouse ? 16 : 15,
        zoomControl: false,
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      const tileConfig = getTileConfig('streets');
      const tileLayer = L.tileLayer(tileConfig.url, {
        attribution: tileConfig.attribution,
        maxZoom: tileConfig.maxZoom,
      }).addTo(map);

      activeTileLayerRef.current = tileLayer;

      // ADSSU Campus Pin Marker (8.0195° N, 125.9930° E)
      const campusIcon = L.divIcon({
        className: 'adssu-campus-marker',
        html: `
          <div class="relative flex items-center justify-center">
            <div class="absolute -inset-2.5 rounded-full bg-[#0F4A38]/30 dark:bg-[#E5A93C]/30 animate-ping"></div>
            <div class="w-10 h-10 rounded-full bg-[#0F4A38] dark:bg-[#06281E] border-2 border-white dark:border-[#E5A93C] shadow-xl flex items-center justify-center text-white dark:text-[#E5A93C]">
              <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
              </svg>
            </div>
            <div class="absolute -bottom-6 bg-[#0F4A38] dark:bg-[#06281E] border border-white/80 dark:border-[#E5A93C]/80 px-2.5 py-0.5 rounded text-[10px] font-bold text-white dark:text-[#E5A93C] whitespace-nowrap shadow-lg">
              ADSSU Main Gate
            </div>
          </div>
        `,
        iconSize: [42, 42],
        iconAnchor: [21, 21],
      });

      L.marker([ADSSU_CAMPUS_LOCATION.lat, ADSSU_CAMPUS_LOCATION.lng], { icon: campusIcon })
        .addTo(map)
        .bindPopup(
          `<div class="p-3 text-slate-800">
            <p class="font-bold text-[#0F4A38] text-sm">${ADSSU_CAMPUS_LOCATION.name}</p>
            <p class="text-xs text-slate-600">${ADSSU_CAMPUS_LOCATION.campus}</p>
            <p class="text-[11px] text-emerald-700 mt-1.5 font-semibold">ADSSU Gate Benchmark for Walking Routes</p>
          </div>`
        );

      const markersGroup = L.layerGroup().addTo(map);
      markersLayerRef.current = markersGroup;
      mapInstanceRef.current = map;
      setMapReady(true);
    }

    // Invalidate size to prevent tile clipping
    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 150);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Invalidate map size and re-fit bounds on fullscreen toggle or container size change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!mapInstanceRef.current) return;
      mapInstanceRef.current.invalidateSize();
      if (selectedHouse) {
        const latlngs: [number, number][] = [
          [ADSSU_CAMPUS_LOCATION.lat, ADSSU_CAMPUS_LOCATION.lng],
          [selectedHouse.coordinates.lat, selectedHouse.coordinates.lng],
        ];
        mapInstanceRef.current.fitBounds(L.latLngBounds(latlngs), {
          padding: [50, 50],
          maxZoom: 16,
        });
      }
    }, 180);
    return () => clearTimeout(timer);
  }, [isFullScreen, heightClass, selectedHouse]);

  // Switch Map Tiles (Streets, Satellite, Terrain)
  const switchMapMode = (mode: MapTileMode) => {
    if (!mapInstanceRef.current) return;
    setMapMode(mode);

    if (activeTileLayerRef.current) {
      mapInstanceRef.current.removeLayer(activeTileLayerRef.current);
    }

    const config = getTileConfig(mode);
    const newLayer = L.tileLayer(config.url, {
      attribution: config.attribution,
      maxZoom: config.maxZoom,
    }).addTo(mapInstanceRef.current);

    activeTileLayerRef.current = newLayer;
  };

  // Update Proximity Radius Ring
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (radiusCircleRef.current) {
      mapInstanceRef.current.removeLayer(radiusCircleRef.current);
      radiusCircleRef.current = null;
    }

    if (showRadiusRing) {
      const radiusMeters = (radiusFilterKm || 1.0) * 1000;
      const circle = L.circle([ADSSU_CAMPUS_LOCATION.lat, ADSSU_CAMPUS_LOCATION.lng], {
        radius: radiusMeters,
        color: '#0F4A38',
        weight: 1.5,
        dashArray: '5, 6',
        fillColor: '#0F4A38',
        fillOpacity: 0.05,
      }).addTo(mapInstanceRef.current);

      radiusCircleRef.current = circle;
    }
  }, [radiusFilterKm, showRadiusRing, mapReady]);

  // Update Boarding House Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    houses.forEach((house) => {
      const isSelected = selectedHouse?.id === house.id;

      const markerHtml = `
        <div class="relative group cursor-pointer transition-transform duration-200 ${isSelected ? 'scale-115 z-50' : 'hover:scale-110'}">
          ${isSelected ? '<div class="absolute -inset-1.5 rounded-full bg-[#0F4A38] opacity-60 blur-xs animate-pulse"></div>' : ''}
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full ${
            isSelected
              ? 'bg-[#0F4A38] text-white font-bold ring-2 ring-white shadow-xl'
              : 'bg-white text-slate-900 border border-slate-300 shadow-md hover:border-[#0F4A38]'
          }">
            <span class="text-xs font-bold font-mono tracking-tight">₱${house.priceStart.toLocaleString()}</span>
            ${house.verified ? '<span class="text-[9px] text-emerald-600 font-bold">VERIFIED</span>' : ''}
          </div>
          <div class="w-2.5 h-2.5 mx-auto rotate-45 -mt-1.5 ${isSelected ? 'bg-[#0F4A38]' : 'bg-white border-r border-b border-slate-300'}"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'staynest-bh-marker',
        html: markerHtml,
        iconSize: [84, 32],
        iconAnchor: [42, 32],
      });

      const marker = L.marker([house.coordinates.lat, house.coordinates.lng], {
        icon: customIcon,
      });

      marker.on('click', () => {
        onSelectHouse(house);
      });

      marker.bindPopup(`
        <div class="p-3.5 text-slate-900 w-64 bg-white rounded-xl">
          <div class="flex items-center justify-between gap-1 mb-1">
            <span class="font-bold text-sm text-[#0F4A38] truncate">${house.name}</span>
            <span class="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 py-0.5 rounded font-mono font-medium">${house.rating} / 5</span>
          </div>
          <p class="text-xs text-slate-500 mb-2.5">${house.barangay}</p>
          <div class="text-[11px] space-y-1.5 mb-3 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <div class="flex justify-between">
              <span class="text-slate-500">Walk Distance:</span>
              <span class="font-semibold text-emerald-800">${house.distanceKm} km (${house.walkMinutes} min walk)</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Water Supply:</span>
              <span class="font-medium text-slate-800">${house.waterSupply.status}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-500">Flood Risk:</span>
              <span class="font-medium text-emerald-800">${house.floodRisk.level}</span>
            </div>
          </div>
          <div class="flex items-center justify-between pt-1 border-t border-slate-100">
            <span class="text-xs font-bold text-[#0F4A38] font-mono">₱${house.priceStart}/mo</span>
            <span class="text-[11px] text-emerald-800 font-semibold underline cursor-pointer">Open Details</span>
          </div>
        </div>
      `);

      markersLayerRef.current?.addLayer(marker);
    });
  }, [houses, selectedHouse, onSelectHouse]);

  // Draw Walking Route Polyline from ADSSU Gate to Selected House
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (routeLineRef.current) {
      mapInstanceRef.current.removeLayer(routeLineRef.current);
      routeLineRef.current = null;
    }

    if (selectedHouse) {
      const latlngs: [number, number][] = [
        [ADSSU_CAMPUS_LOCATION.lat, ADSSU_CAMPUS_LOCATION.lng],
        [selectedHouse.coordinates.lat, selectedHouse.coordinates.lng],
      ];

      const routeColor =
        mapMode === 'satellite'
          ? '#F59E0B'
          : mapMode === 'terrain'
          ? '#34D399'
          : '#0F4A38';

      const line = L.polyline(latlngs, {
        color: routeColor,
        weight: 4,
        opacity: 0.95,
        dashArray: '6, 8',
      }).addTo(mapInstanceRef.current);

      line.bindTooltip(
        `${selectedHouse.distanceKm} km · ${selectedHouse.walkMinutes} min walk`,
        {
          permanent: true,
          direction: 'center',
          className: 'route-distance-tooltip',
        }
      );

      routeLineRef.current = line;

      // Fit bounds to show route nicely
      const bounds = L.latLngBounds(latlngs);
      mapInstanceRef.current.fitBounds(bounds, {
        padding: [60, 60],
        maxZoom: 16,
      });
    }
  }, [selectedHouse, mapMode]);

  const handleCenterCampus = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(
        [ADSSU_CAMPUS_LOCATION.lat, ADSSU_CAMPUS_LOCATION.lng],
        15,
        { animate: true }
      );
    }
  };

  const handleFitAll = () => {
    if (mapInstanceRef.current && houses.length > 0) {
      const points: [number, number][] = [
        [ADSSU_CAMPUS_LOCATION.lat, ADSSU_CAMPUS_LOCATION.lng],
        ...houses.map((h) => [h.coordinates.lat, h.coordinates.lng] as [number, number]),
      ];
      mapInstanceRef.current.fitBounds(L.latLngBounds(points), { padding: [50, 50] });
    }
  };

  return (
    <div className={`relative w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-emerald-800/50 shadow-md ${heightClass}`}>
      {/* Real Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Top Left Controls */}
      <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-[400] flex items-center gap-1.5 sm:gap-2">
        {/* Campus Reset */}
        <button
          onClick={handleCenterCampus}
          className="px-2 sm:px-3 py-1.5 text-xs font-semibold bg-white/95 hover:bg-slate-100 text-[#0F4A38] border border-slate-200 rounded-xl shadow-xs flex items-center gap-1.5 transition-all backdrop-blur-sm"
          title="Center ADSSU Main Gate"
        >
          <School className="w-3.5 h-3.5 shrink-0 text-[#0F4A38]" />
          <span className="hidden sm:inline">Center ADSSU</span>
        </button>

        {/* Fit All Listings (Hidden in mini map modal to prevent toolbar collision) */}
        {!isModal && (
          <button
            onClick={handleFitAll}
            className="px-2 sm:px-3 py-1.5 text-xs font-semibold bg-white/95 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl shadow-xs flex items-center gap-1.5 transition-all backdrop-blur-sm"
            title={`Fit all ${houses.length} boarding houses in viewport`}
          >
            <Compass className="w-3.5 h-3.5 shrink-0 text-slate-600" />
            <span className="hidden sm:inline">Fit All ({houses.length})</span>
          </button>
        )}

        {/* Toggle Radius Ring (Only in full views) */}
        {!isModal && (
          <button
            onClick={() => setShowRadiusRing(!showRadiusRing)}
            className={`hidden md:flex px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-xl shadow-xs items-center gap-1.5 transition-all backdrop-blur-sm border ${
              showRadiusRing
                ? 'bg-[#0F4A38] text-white border-[#0F4A38]'
                : 'bg-white/95 text-slate-600 border-slate-200'
            }`}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>{radiusFilterKm ? `${radiusFilterKm} km Ring` : '1 km Ring'}</span>
          </button>
        )}
      </div>

      {/* 3-Mode Map Layer Switcher (Top Right) */}
      <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-[400] flex items-center gap-1.5 sm:gap-2">
        <div className="bg-white/95 border border-slate-200 rounded-xl p-0.5 sm:p-1 shadow-md backdrop-blur-md flex items-center gap-0.5 sm:gap-1">
          <button
            onClick={() => switchMapMode('streets')}
            className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-lg flex items-center gap-1 sm:gap-1.5 transition-all ${
              mapMode === 'streets'
                ? 'bg-[#0F4A38] text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Street Map View (OpenStreetMap)"
          >
            <MapIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Street Map</span>
            <span className="sm:hidden">Street</span>
          </button>

          <button
            onClick={() => switchMapMode('satellite')}
            className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-lg flex items-center gap-1 sm:gap-1.5 transition-all ${
              mapMode === 'satellite'
                ? 'bg-[#0F4A38] text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Satellite Aerial View (Esri World Imagery)"
          >
            <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Satellite</span>
          </button>

          <button
            onClick={() => switchMapMode('terrain')}
            className={`px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-semibold rounded-lg flex items-center gap-1 sm:gap-1.5 transition-all ${
              mapMode === 'terrain'
                ? 'bg-[#0F4A38] text-white font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Dark / Terrain Mode"
          >
            <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Dark / Terrain</span>
            <span className="sm:hidden">Dark</span>
          </button>
        </div>

        {/* Optional Action Controls (Full Screen / Close) */}
        {onToggleFullScreen && (
          <button
            onClick={onToggleFullScreen}
            className="p-2 bg-white/95 dark:bg-[#06281E]/95 border border-slate-200 dark:border-emerald-700/60 rounded-xl text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-100"
            title={isFullScreen ? 'Exit Full Screen' : 'Expand Full Screen Map'}
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        )}

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 bg-white/95 dark:bg-[#06281E]/95 border border-slate-200 dark:border-emerald-700/60 rounded-xl text-slate-700 dark:text-slate-200 shadow-sm hover:bg-slate-100"
            title="Close Map View"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Selected House Active Walking Route Banner (Only in non-modal view) */}
      {selectedHouse && !isModal && (
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md z-[400] bg-white/95 dark:bg-[#06281E]/95 border border-[#0F4A38]/30 dark:border-[#E5A93C] rounded-xl p-3 shadow-xl backdrop-blur-md flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-900/80 border border-emerald-200 dark:border-[#E5A93C]/50 flex items-center justify-center text-[#0F4A38] dark:text-[#E5A93C] shrink-0 font-bold">
              <Footprints className="w-5 h-5 text-[#0F4A38] dark:text-[#E5A93C]" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 truncate">
                {selectedHouse.name}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 dark:text-emerald-300 font-medium">
                <span className="font-bold text-[#0F4A38] dark:text-[#E5A93C]">
                  {selectedHouse.distanceKm} km from ADSSU
                </span>
                <span>·</span>
                <span>~{selectedHouse.walkMinutes} min walk</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onSwitchViewMode && (
              <button
                onClick={() => onSwitchViewMode('split')}
                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-emerald-950 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg border border-slate-200 dark:border-emerald-700/60 transition-colors"
                title="Switch to Split View"
              >
                Split
              </button>
            )}
            <button
              onClick={() => onSelectHouse(selectedHouse)}
              className="px-3 py-1.5 bg-[#0F4A38] hover:bg-emerald-800 text-white dark:bg-[#E5A93C] dark:hover:bg-[#F59E0B] dark:text-[#051F17] font-bold text-xs rounded-lg whitespace-nowrap shadow-xs transition-colors"
            >
              Inspect Details
            </button>
          </div>
        </div>
      )}

      {/* Map Legend Overlay */}
      <div className="hidden md:flex absolute bottom-3 right-16 z-[400] bg-white/90 dark:bg-[#06281E]/90 border border-slate-200 dark:border-emerald-800/60 rounded-lg px-2.5 py-1.5 text-[10px] text-slate-600 dark:text-slate-300 gap-3 items-center backdrop-blur-sm shadow-xs">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0F4A38] dark:bg-[#E5A93C]"></div>
          <span>ADSSU Gate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-600"></div>
          <span>Boarding House</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[#0F4A38] font-bold">---</span>
          <span>Walking Route</span>
        </div>
      </div>
    </div>
  );
};
