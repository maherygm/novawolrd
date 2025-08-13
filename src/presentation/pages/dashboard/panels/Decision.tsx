import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import React, { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { curveMonotoneX } from "d3-shape";
import axios from "axios";

// Interface pour les données épidémiques
interface EpidemicData {
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
}

const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

const EpidemicDashboard: React.FC = () => {
  const [selectedEpidemic, setSelectedEpidemic] = useState("covid");
  const [epidemicData, setEpidemicData] = useState<EpidemicData[]>([]);
  const [loading, setLoading] = useState(true);
  const [predictionData, setPredictionData] = useState<any[]>([]);

  // Récupération des données réelles
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://disease.sh/v3/covid-19/historical/all?lastdays=30"
        );
        
        const transformedData = Object.entries(response.data.cases).map(
          ([date, confirmed]) => ({
            date,
            confirmed,
            deaths: response.data.deaths[date],
            recovered: response.data.recovered[date],
          })
        );
        
        setEpidemicData(transformedData);
        generatePredictions(transformedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Génération de prédictions simples (modèle linéaire simpliste)
  const generatePredictions = (data: EpidemicData[]) => {
    const lastData = data.slice(-7);
    const predictions = lastData.map((d, i) => ({
      date: `J+${i + 1}`,
      confirmed: d.confirmed * (1 + i * 0.05),
      predicted: true
    }));
    setPredictionData([...lastData, ...predictions]);
  };

  // Filtrage des données
  const filteredData = epidemicData.slice(-15);

  if (loading) {
    return <div className="p-4">Chargement des données...</div>;
  }

  return (
    <div className="flex flex-col p-4 gap-4">
      {/* En-tête avec filtres */}
      <div className="flex justify-between items-center">
        <select 
          className="p-2 border rounded-lg"
          value={selectedEpidemic}
          onChange={(e) => setSelectedEpidemic(e.target.value)}
        >
          <option value="covid">COVID-19</option>
          <option value="ebola">Ebola</option>
          <option value="flu">Grippe saisonnière</option>
        </select>
        
        <div className="flex gap-2">
          <Button onClick={() => generatePredictions(epidemicData)}>
            Actualiser les prédictions
          </Button>
        </div>
      </div>

      {/* Grille principale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Carte de propagation mondiale */}
        <Card className="p-4 col-span-2">
          <h2 className="text-xl font-bold mb-4">Propagation mondiale</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={filteredData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type={curveMonotoneX}
                dataKey="confirmed"
                fill="#FF6384"
                stroke="#FF6384"
                name="Cas confirmés"
              />
              <Area
                type={curveMonotoneX}
                dataKey="recovered"
                fill="#36A2EB"
                stroke="#36A2EB"
                name="Guérisons"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Statistiques clés */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Indicateurs clés</h2>
          <div className="space-y-4">
            <div className="bg-red-100 p-4 rounded-lg">
              <h3>Cas confirmés</h3>
              <p className="text-2xl font-bold">
                {epidemicData[epidemicData.length - 1]?.confirmed.toLocaleString()}
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3>Guérisons</h3>
              <p className="text-2xl font-bold">
                {epidemicData[epidemicData.length - 1]?.recovered.toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3>Décès</h3>
              <p className="text-2xl font-bold">
                {epidemicData[epidemicData.length - 1]?.deaths.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        {/* Prédictions */}
        <Card className="p-4 col-span-2">
          <h2 className="text-xl font-bold mb-4">Modèle prédictif</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={predictionData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="confirmed"
                stroke="#FF6384"
                strokeDasharray="5 5"
                name="Cas confirmés (réels)"
              />
              <Line
                type="monotone"
                dataKey="confirmed"
                stroke="#36A2EB"
                strokeDasharray="5 5"
                name="Cas confirmés (prédits)"
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-500 mt-2">
            * Projections basées sur les données historiques et un modèle linéaire simple
          </p>
        </Card>

        {/* Répartition géographique */}
        <Card className="p-4">
          <h2 className="text-xl font-bold mb-4">Répartition régionale</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={Object.entries({
                  "Amérique": 45,
                  "Europe": 30,
                  "Asie": 20,
                  "Afrique": 5
                })}
                dataKey="1"
                nameKey="0"
                outerRadius={80}
                label
              >
                {colors.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default EpidemicDashboard;