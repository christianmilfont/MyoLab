import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { MapPin, Navigation, Loader2, Star, ExternalLink } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Gym {
  id: number;
  name: string;
  lat: number;
  lon: number;
  distance?: number;
  address?: string;
  phone?: string;
  website?: string;
  opening_hours?: string;
}

const AcademiasPage = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const getLocation = () => {
    setLoading(true);
    setError(null);
    if (!navigator.geolocation) {
      setError("Geolocalização não é suportada pelo seu navegador.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => {
        setError("Não foi possível obter sua localização. Verifique as permissões do navegador.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Search gyms via Overpass API
  useEffect(() => {
    if (!userLocation) return;

    const fetchGyms = async () => {
      setLoading(true);
      const radius = 5000; // 5km
      const query = `
        [out:json][timeout:25];
        (
          node["leisure"="fitness_centre"](around:${radius},${userLocation.lat},${userLocation.lon});
          node["sport"="fitness"](around:${radius},${userLocation.lat},${userLocation.lon});
          way["leisure"="fitness_centre"](around:${radius},${userLocation.lat},${userLocation.lon});
        );
        out body center;
      `;

      try {
        const response = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: `data=${encodeURIComponent(query)}`,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        });
        const data = await response.json();

        const results: Gym[] = data.elements.map((el: any) => {
          const lat = el.lat || el.center?.lat;
          const lon = el.lon || el.center?.lon;
          const dist = getDistance(userLocation.lat, userLocation.lon, lat, lon);
          return {
            id: el.id,
            name: el.tags?.name || "Academia sem nome",
            lat,
            lon,
            distance: dist,
            address: el.tags?.["addr:street"]
              ? `${el.tags["addr:street"]}, ${el.tags["addr:housenumber"] || ""}`
              : undefined,
            phone: el.tags?.phone,
            website: el.tags?.website,
            opening_hours: el.tags?.opening_hours,
          };
        });

        results.sort((a, b) => (a.distance || 0) - (b.distance || 0));
        setGyms(results);
      } catch {
        setError("Erro ao buscar academias. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchGyms();
  }, [userLocation]);

  // Initialize/update map
  useEffect(() => {
    if (!userLocation || !mapRef.current) return;

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([userLocation.lat, userLocation.lon], 14);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapInstanceRef.current);

      // User marker
      const userIcon = L.divIcon({
        html: '<div style="width:16px;height:16px;background:#3b82f6;border:3px solid white;border-radius:50%;box-shadow:0 0 10px rgba(59,130,246,0.5)"></div>',
        iconSize: [16, 16],
        className: "",
      });
      L.marker([userLocation.lat, userLocation.lon], { icon: userIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup("Você está aqui");
    }

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Add gym markers
    const gymIcon = L.divIcon({
      html: '<div style="width:12px;height:12px;background:#22c55e;border:2px solid white;border-radius:50%;box-shadow:0 0 6px rgba(34,197,94,0.5)"></div>',
      iconSize: [12, 12],
      className: "",
    });

    gyms.forEach((gym) => {
      if (!gym.lat || !gym.lon) return;
      const marker = L.marker([gym.lat, gym.lon], { icon: gymIcon })
        .addTo(mapInstanceRef.current!)
        .bindPopup(`<b>${gym.name}</b><br>${gym.distance ? `${gym.distance.toFixed(1)} km` : ""}`);
      marker.on("click", () => setSelectedGym(gym));
      markersRef.current.push(marker);
    });
  }, [userLocation, gyms]);

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const openInMaps = (gym: Gym) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${gym.lat},${gym.lon}`, "_blank");
  };

  return (
    <div className="py-16">
      <div className="section-container">
        <SectionHeader
          title="Academias Próximas"
          description="Encontre academias perto de você usando sua localização. Dados do OpenStreetMap."
        />

        {!userLocation && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-primary" />
            </div>
            <h3 className="font-display font-bold text-xl text-foreground mb-3">
              Permitir acesso à localização
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Para encontrar academias próximas, precisamos acessar sua localização. Seus dados não são armazenados.
            </p>
            <button
              onClick={getLocation}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              <Navigation className="w-5 h-5" />
              Usar minha localização
            </button>
            {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
          </motion.div>
        )}

        {loading && (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Buscando academias próximas...</p>
          </div>
        )}

        {userLocation && !loading && (
          <div className="grid lg:grid-cols-[1fr_380px] gap-6">
            {/* Map */}
            <div className="rounded-2xl overflow-hidden border border-border h-[500px]">
              <div ref={mapRef} className="w-full h-full" />
            </div>

            {/* Gym List */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              <p className="text-sm text-muted-foreground mb-2">
                {gyms.length} academia{gyms.length !== 1 ? "s" : ""} encontrada{gyms.length !== 1 ? "s" : ""} em 5km
              </p>
              {gyms.map((gym, i) => (
                <motion.div
                  key={gym.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => {
                    setSelectedGym(gym);
                    mapInstanceRef.current?.setView([gym.lat, gym.lon], 16);
                  }}
                  className={`rounded-xl border p-4 cursor-pointer transition-colors ${
                    selectedGym?.id === gym.id
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="font-medium text-foreground text-sm truncate">{gym.name}</h4>
                      {gym.address && (
                        <p className="text-xs text-muted-foreground mt-1 truncate">{gym.address}</p>
                      )}
                      {gym.opening_hours && (
                        <p className="text-xs text-muted-foreground mt-0.5">🕐 {gym.opening_hours}</p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      {gym.distance && (
                        <span className="text-xs font-medium text-primary">{gym.distance.toFixed(1)} km</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openInMaps(gym);
                      }}
                      className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Rota
                    </button>
                    {gym.website && (
                      <a
                        href={gym.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                      >
                        Site
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}

              {gyms.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground text-sm">Nenhuma academia encontrada em 5km.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademiasPage;
