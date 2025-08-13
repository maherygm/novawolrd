import { useEffect, useState } from "react";
import { Thermometer, DropletIcon, PlaneTakeoff } from "lucide-react";

const SENSOR_API_URL = "/api/sensor_data";

const Materials = () => {
    const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch(SENSOR_API_URL);
        if (!response.ok) throw new Error("Erreur lors de la récupération des données");
        const data = await response.json();
        setTemperature(data.temperature);
        setHumidity(data.humidity);
      } catch (error) {
        console.error("Erreur :", error);
      }
    };

    fetchSensorData();
    const interval = setInterval(fetchSensorData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
      {/* Section pour le Drone */}
      <div className="shadow-lg rounded-2xl border bg-white border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <PlaneTakeoff className="w-8 h-8 text-blue-500" />
          <h2 className="text-xl font-semibold">Drone de Surveillance</h2>
        </div>
        <p className="text-gray-600 mt-2 text-[13px]">Le drone assure une surveillance en temps réel des zones sensibles pour une meilleure gestion des épidémies.</p>
      </div>
      
      {/* Section pour le Détecteur de Température et d’Humidité */}
      <div className="shadow-lg rounded-2xl border bg-white border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <Thermometer className="w-8 h-8 text-red-500" />
          <h2 className="text-xl font-semibold">Détecteur Température & Humidité</h2>
        </div>
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex items-center space-x-2">
            <Thermometer className="w-6 h-6 text-red-500" />
            <p className="text-lg font-semibold">{temperature !== null ? `${temperature}°C` : "Chargement..."}</p>
          </div>
          <div className="flex items-center space-x-2">
            <DropletIcon className="w-6 h-6 text-blue-500" />
            <p className="text-lg font-semibold">{humidity !== null ? `${humidity}%` : "Chargement..."}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Materials
