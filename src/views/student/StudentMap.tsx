import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { VIKRAM_CAMPUS_BUILDINGS } from '../../data/mockData';
import { CampusBuilding } from '../../types';
import {
  MapPin,
  Search,
  Clock,
  Building,
  Phone,
  Layers,
  Compass,
  Navigation,
  CheckCircle2,
  X,
  ExternalLink,
  GraduationCap,
  Shield,
  BookOpen,
  Home,
  Trophy,
  Coffee,
  LocateFixed,
  Route,
  Sparkles,
} from 'lucide-react';
import L from 'leaflet';

export const StudentMap: React.FC = () => {
  const { showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState<CampusBuilding>(VIKRAM_CAMPUS_BUILDINGS[1]); // Default SoET
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isNavigating, setIsNavigating] = useState(false);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const routePolylineRef = useRef<L.Polyline | null>(null);

  // Mock student current location on campus (in front of Samvad Bhawan / Vikramaditya Plaza)
  const currentLocation: [number, number] = [23.1610, 75.7946];

  const filterCategories = [
    'All',
    'Academic',
    'Administration',
    'Library',
    'Hostel',
    'Sports',
    'Food',
    'Student Services',
  ];

  const filteredBuildings = VIKRAM_CAMPUS_BUILDINGS.filter((b) => {
    let matchesCategory = true;
    if (categoryFilter === 'Academic') matchesCategory = b.category === 'academic';
    else if (categoryFilter === 'Administration') matchesCategory = b.category === 'admin';
    else if (categoryFilter === 'Library') matchesCategory = b.category === 'library';
    else if (categoryFilter === 'Hostel') matchesCategory = b.category === 'hostel';
    else if (categoryFilter === 'Sports') matchesCategory = b.category === 'sports';
    else if (categoryFilter === 'Food') matchesCategory = b.category === 'food';
    else if (categoryFilter === 'Student Services') matchesCategory = b.category === 'admin' || b.category === 'facility';

    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.shortCode.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Color & Icon mapping per category
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'academic':
        return { bg: '#4f46e5', label: 'Academic', textClass: 'text-indigo-600 dark:text-indigo-400', badgeClass: 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400' };
      case 'admin':
        return { bg: '#0f172a', label: 'Administration', textClass: 'text-slate-700 dark:text-slate-300', badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' };
      case 'library':
        return { bg: '#059669', label: 'Library', textClass: 'text-emerald-600 dark:text-emerald-400', badgeClass: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' };
      case 'hostel':
        return { bg: '#d97706', label: 'Hostel', textClass: 'text-amber-600 dark:text-amber-400', badgeClass: 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400' };
      case 'sports':
        return { bg: '#0284c7', label: 'Sports Area', textClass: 'text-sky-600 dark:text-sky-400', badgeClass: 'bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400' };
      case 'food':
        return { bg: '#e11d48', label: 'Food & Cafeteria', textClass: 'text-rose-600 dark:text-rose-400', badgeClass: 'bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400' };
      default:
        return { bg: '#6366f1', label: 'Facility', textClass: 'text-indigo-600 dark:text-indigo-400', badgeClass: 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400' };
    }
  };

  // Initialize Leaflet Map for Vikram University, Ujjain
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Centered on Vikram University central campus, Dewas Road, Ujjain
      const campusCenter: [number, number] = [23.1620, 75.7950];

      const map = L.map(mapContainerRef.current, {
        center: campusCenter,
        zoom: 16,
        zoomControl: true,
      });

      // CartoDB Voyager tiles (clean university mapping aesthetic)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; Vikram University GIS &copy; OpenStreetMap',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      // Add "Current Location" pulsating user marker
      const userLocHtml = `
        <div style="position: relative; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 24px; height: 24px; background: rgba(59, 130, 246, 0.4); border-radius: 50%; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="width: 14px; height: 14px; background: #2563eb; border: 2.5px solid white; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.4); position: relative; z-index: 10;"></div>
        </div>
      `;
      const userIcon = L.divIcon({
        className: 'user-location-marker',
        html: userLocHtml,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
      const userMarker = L.marker(currentLocation, { icon: userIcon }).addTo(map);
      userMarker.bindTooltip('Current Location (Samvad Bhawan Plaza)', { permanent: false, direction: 'top' });

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Remove existing building markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    // Plot all Vikram University location markers
    VIKRAM_CAMPUS_BUILDINGS.forEach((bld) => {
      const isSelected = selectedBuilding?.id === bld.id;
      const theme = getCategoryTheme(bld.category);

      const markerHtml = `
        <div style="
          background: ${isSelected ? '#4f46e5' : theme.bg};
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 10px;
          letter-spacing: -0.5px;
          box-shadow: 0 4px 14px rgba(0,0,0,0.35);
          border: 2px solid white;
          transform: ${isSelected ? 'scale(1.25)' : 'scale(1)'};
          transition: transform 0.2s ease, background 0.2s ease;
        ">
          ${bld.shortCode.slice(0, 4)}
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-vu-marker',
        html: markerHtml,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([bld.lat, bld.lng], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setSelectedBuilding(bld);
        map.flyTo([bld.lat, bld.lng], 17, { duration: 0.8 });
      });

      markersRef.current[bld.id] = marker;
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update marker selection
  const handleSelectBuilding = (bld: CampusBuilding) => {
    setSelectedBuilding(bld);
    setIsNavigating(false);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([bld.lat, bld.lng], 17, { duration: 0.8 });
    }
  };

  // Generate simulated walking route on map
  const handleGetDirections = () => {
    if (!mapInstanceRef.current || !selectedBuilding) return;

    const map = mapInstanceRef.current;

    // Remove previous polyline
    if (routePolylineRef.current) {
      routePolylineRef.current.remove();
      routePolylineRef.current = null;
    }

    // Midpoint bend to simulate campus road navigation
    const midLat = (currentLocation[0] + selectedBuilding.lat) / 2;
    const midLng = currentLocation[1] + (selectedBuilding.lng - currentLocation[1]) * 0.4;

    const routeCoords: [number, number][] = [
      currentLocation,
      [midLat, midLng],
      [selectedBuilding.lat, selectedBuilding.lng],
    ];

    const polyline = L.polyline(routeCoords, {
      color: '#4f46e5',
      weight: 5,
      opacity: 0.85,
      dashArray: '8, 8',
    }).addTo(map);

    routePolylineRef.current = polyline;
    setIsNavigating(true);

    map.fitBounds(polyline.getBounds(), { padding: [50, 50] });

    showToast(
      'Campus Navigation Route Generated',
      `Walking route to ${selectedBuilding.name} active · Approx 3 mins (240m)`,
      'success'
    );
  };

  // Reset to user location
  const handleCenterUserLocation = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(currentLocation, 17, { duration: 0.8 });
      showToast('Current Location', 'Centered at Samvad Bhawan / Vikramaditya Plaza.', 'info');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <MapPin className="w-3.5 h-3.5" />
            <span>Vikram University, Ujjain · Digital Campus Navigation</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
            Vikram University Campus Map
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Explore departments, facilities and important locations across campus.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCenterUserLocation}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <LocateFixed className="w-4 h-4 text-blue-500" />
            <span>My Current Location</span>
          </button>
          <button
            onClick={handleGetDirections}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Get Directions</span>
          </button>
        </div>
      </div>

      {/* Category Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {filterCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              categoryFilter === cat
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Workspace: Left Control Directory + Right Leaflet Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Campus Navigation Control Panel & Directory */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search buildings, departments or facilities..."
              className="w-full bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-indigo-500 shadow-xs"
            />
          </div>

          {/* Quick Control Panel Header */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/50 dark:border-indigo-900/40">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  VIKRAM UNIVERSITY
                </span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Campus Navigation System
                </h4>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">
                {filteredBuildings.length} Locations
              </span>
            </div>
          </div>

          {/* Buildings List */}
          <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
            {filteredBuildings.map((b) => {
              const isSelected = b.id === selectedBuilding?.id;
              const theme = getCategoryTheme(b.category);

              return (
                <div
                  key={b.id}
                  onClick={() => handleSelectBuilding(b)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/40 shadow-xs ring-1 ring-indigo-500'
                      : 'border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 font-mono text-[11px] font-bold flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        {b.shortCode.slice(0, 4)}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {b.name}
                      </h4>
                    </div>

                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${theme.badgeClass}`}>
                      {theme.label}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    {b.department}
                  </p>

                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {b.workingHours.split('·')[0]}
                    </span>
                    <span>{b.floors} Floors</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Leaflet Map + Building Information Card */}
        <div className="lg:col-span-8 space-y-4">
          {/* Map Frame */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md h-[440px] bg-slate-100 dark:bg-slate-900">
            <div ref={mapContainerRef} className="w-full h-full" />

            {/* Custom Map Navigation Legend & Control Overlay */}
            <div className="absolute top-3 right-3 z-[1000] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-xl text-[11px] space-y-1.5 max-w-[210px]">
              <span className="font-bold text-slate-900 dark:text-white block border-b border-slate-100 dark:border-slate-800 pb-1">
                Vikram University Legend
              </span>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                <span>You are here (Plaza)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600" />
                <span>Academic Faculties</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" />
                <span>Central Library</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
                <span>Student Hostels</span>
              </div>
            </div>

            {/* Active Route Floating Banner */}
            {isNavigating && (
              <div className="absolute bottom-3 left-3 right-3 z-[1000] bg-indigo-600 text-white p-2.5 px-4 rounded-xl shadow-lg flex items-center justify-between text-xs animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center gap-2">
                  <Route className="w-4 h-4 animate-spin" />
                  <span>Navigating to: <strong>{selectedBuilding?.name}</strong> (~3 mins walking)</span>
                </div>
                <button
                  onClick={() => {
                    setIsNavigating(false);
                    if (routePolylineRef.current) {
                      routePolylineRef.current.remove();
                      routePolylineRef.current = null;
                    }
                  }}
                  className="text-white hover:text-indigo-200 font-bold ml-2 text-xs"
                >
                  Clear Route
                </button>
              </div>
            )}
          </div>

          {/* Modern Building Information Card */}
          {selectedBuilding && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      Code: {selectedBuilding.shortCode}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {selectedBuilding.category.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {selectedBuilding.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedBuilding.department}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      showToast(
                        'Department Details',
                        `${selectedBuilding.name}: ${selectedBuilding.description}`,
                        'info'
                      );
                    }}
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all cursor-pointer"
                  >
                    View Details
                  </button>
                  <button
                    onClick={handleGetDirections}
                    className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedBuilding.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">
                    Working Hours
                  </span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {selectedBuilding.workingHours}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">
                    Direct Contact Desk
                  </span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedBuilding.contact}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block mb-1">
                    Infrastructure Height
                  </span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedBuilding.floors} Storeys with Accessibility
                  </p>
                </div>
              </div>

              {/* Amenities */}
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Key Department Facilities & Laboratories
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedBuilding.amenities.map((amenity) => (
                    <span
                      key={amenity}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-medium border border-indigo-200/40 dark:border-indigo-900/40 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-indigo-500" />
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
