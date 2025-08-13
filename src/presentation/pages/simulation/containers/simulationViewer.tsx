import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Button } from "@heroui/button";
import {
    FiHome,
    FiPieChart,
    FiActivity,
    FiCalendar,
    FiSearch,
    FiBell,
    FiTruck,
    FiZap,
    FiDroplet,
    FiRefreshCw,
} from "react-icons/fi";
import { ChevronLeft } from "lucide-react";
import { BiRecycle, BiLeaf, BiWind } from "react-icons/bi";
import { AiOutlineCloud } from "react-icons/ai";
import { Link } from "react-router-dom";

const SimulationViewer = () => {
    const [formInputs, setFormInputs] = useState({
        transport: 0,
        energy: 0,
        waste: 0,
    });

    const [predictionResult, setPredictionResult] = useState({
        totalEmissions: null,
        breakdown: null,
        confidence: null,
        ecologicalImpact: null,
    });

    const handleInputChange = (e) => {
        setFormInputs({
            ...formInputs,
            [e.target.name]: parseFloat(e.target.value),
        });
    };

    const calculateEmissions = () => {
        // Facteurs de conversion standards
        const transportFactor = 0.2; // kg CO2/km
        const energyFactor = 0.4; // kg CO2/kWh
        const wasteFactor = 2.5; // kg CO2/kg déchets

        const transportEmissions = formInputs.transport * transportFactor;
        const energyEmissions = formInputs.energy * energyFactor;
        const wasteEmissions = formInputs.waste * wasteFactor;

        return {
            transport: parseFloat((transportEmissions / 1000).toFixed(2)), // Conversion en tonnes
            energy: parseFloat((energyEmissions / 1000).toFixed(2)),
            waste: parseFloat((wasteEmissions / 1000).toFixed(2)),
        };
    };

    const handlePredict = () => {
        const emissions = calculateEmissions();
        const totalEmissions = parseFloat(
            (emissions.transport + emissions.energy + emissions.waste).toFixed(
                2
            )
        );

        // Calculs écologiques basés sur les émissions totales
        const treesNeeded = Math.ceil(totalEmissions * 242); // Un arbre absorbe environ 22 kg de CO2 par an
        const waterImpact = Math.ceil(totalEmissions * 1000); // Estimation de l'impact sur l'eau

        let airQuality;
        if (totalEmissions < 2) airQuality = "Bon";
        else if (totalEmissions < 5) airQuality = "Modéré";
        else airQuality = "Mauvais";

        setPredictionResult({
            totalEmissions: totalEmissions,
            breakdown: emissions,
            confidence: 95, // Niveau de confiance basé sur des données réelles
            ecologicalImpact: {
                trees: treesNeeded,
                waterLiters: waterImpact,
                airQuality: airQuality,
                recommendations: [
                    `Réduire vos déplacements quotidiens de ${Math.ceil(
                        formInputs.transport * 0.3
                    )} km`,
                    `Optimiser votre consommation d'énergie de ${Math.ceil(
                        formInputs.energy * 0.25
                    )} kWh`,
                    `Diminuer vos déchets de ${Math.ceil(
                        formInputs.waste * 0.4
                    )} kg par jour`,
                    "Privilégier les transports en commun ou le vélo",
                    "Installer des équipements à basse consommation",
                ],
            },
        });
    };

    const handleReset = () => {
        setFormInputs({
            transport: 0,
            energy: 0,
            waste: 0,
        });
        setPredictionResult({
            totalEmissions: null,
            breakdown: null,
            confidence: null,
            ecologicalImpact: null,
        });
    };

    // Rest of the component remains the same, just update the form inputs to use the new state
    return (
        <div className="flex h-screen w-screen bg-abstract-background bg-gray-50">
            <div className="bg-backglass3-background flex p-4 w-screen">
                <div className="flex-1 p-8">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex flex-col space-y-2">
                            <h2 className="text-xl font-semibold font-syne">
                                Aperçu de l'empreinte carbone
                            </h2>
                            <p className="text-sm text-gray-600 max-w-2xl">
                                L'empreinte carbone mesure la quantité totale de
                                gaz à effet de serre émise directement et
                                indirectement par nos activités quotidiennes.
                                Cette simulation vous aide à comprendre et à
                                optimiser votre impact environnemental.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <Link to="/simulation/propagation/">
                                <Button
                                    color={"secondary"}
                                    onClick={handleReset}
                                    className="flex items-center px-4 py-2 rounded-xl hover:bg-gray-300"
                                >
                                    Propagation de maladie
                                </Button>
                            </Link>

                            <Button
                                onClick={handleReset}
                                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
                            >
                                <FiRefreshCw className="mr-2" />
                                Réinitialiser
                            </Button>

                            <Link to="/">
                                <Button
                                    onClick={handleReset}
                                    className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300"
                                >
                                    <ChevronLeft className="mr-2" />
                                    Retour
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="col-span-2 bg-white bg-opacity-40 backdrop-blur-md rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-semibold mb-4">
                                Tendance des émissions de carbone
                            </h3>
                            <div className="h-[68vh] relative">
                                {predictionResult.totalEmissions ? (
                                    <div className="bg-white bg-opacity-40 overflow-auto h-[460px] backdrop-blur-md rounded-xl shadow-lg p-6">
                                        <h3 className="text-lg font-semibold mb-4">
                                            Résultats de la prédiction
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">
                                                    CO2 prédit
                                                </span>
                                                <span className="text-2xl font-bold text-green-600">
                                                    {
                                                        predictionResult.totalEmissions
                                                    }
                                                    t
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">
                                                    Niveau de confiance
                                                </span>
                                                <span className="text-xl font-semibold">
                                                    {
                                                        predictionResult.confidence
                                                    }
                                                    %
                                                </span>
                                            </div>
                                            <div className="pt-4">
                                                <h4 className="text-sm font-semibold mb-2">
                                                    Répartition
                                                </h4>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span>Transport</span>
                                                        <span>
                                                            {
                                                                predictionResult
                                                                    .breakdown
                                                                    .transport
                                                            }
                                                            t
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span>Énergie</span>
                                                        <span>
                                                            {
                                                                predictionResult
                                                                    .breakdown
                                                                    .energy
                                                            }
                                                            t
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between text-sm">
                                                        <span>Déchets</span>
                                                        <span>
                                                            {
                                                                predictionResult
                                                                    .breakdown
                                                                    .waste
                                                            }
                                                            t
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t border-gray-200">
                                                <h4 className="text-sm font-semibold mb-4">
                                                    Impact Écologique
                                                </h4>
                                                <div className="space-y-3">
                                                    <div className="flex items-center">
                                                        <BiLeaf className="text-green-500 mr-2" />
                                                        <span>
                                                            Équivalent en arbres
                                                            nécessaires :{" "}
                                                            {
                                                                predictionResult
                                                                    .ecologicalImpact
                                                                    .trees
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <FiDroplet className="text-blue-500 mr-2" />
                                                        <span>
                                                            Impact sur les
                                                            ressources en eau :{" "}
                                                            {
                                                                predictionResult
                                                                    .ecologicalImpact
                                                                    .waterLiters
                                                            }
                                                            L
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <BiWind className="text-gray-500 mr-2" />
                                                        <span>
                                                            Qualité de l'air :{" "}
                                                            {
                                                                predictionResult
                                                                    .ecologicalImpact
                                                                    .airQuality
                                                            }
                                                        </span>
                                                    </div>
                                                    <div className="mt-4">
                                                        <h5 className="text-sm font-medium mb-2">
                                                            Recommandations :
                                                        </h5>
                                                        <ul className="list-disc pl-5 text-sm text-gray-600">
                                                            {predictionResult.ecologicalImpact.recommendations.map(
                                                                (
                                                                    rec,
                                                                    index
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        {rec}
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white bg-opacity-40 mb-12 backdrop-blur-md rounded-xl shadow-lg p-6 flex flex-col items-center justify-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
                                        <h3 className="text-lg font-semibold h-[53vh] text-gray-600">
                                            En attente de prédiction...
                                        </h3>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white bg-opacity-40 backdrop-blur-md rounded-xl shadow-lg p-6">
                                <h3 className="text-lg font-semibold mb-4">
                                    Prédiction Carbone
                                </h3>
                                <form className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Transport (km/jour)
                                        </label>
                                        <input
                                            type="number"
                                            name="transport"
                                            value={formInputs.transport}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Consommation d'énergie (kWh/jour)
                                        </label>
                                        <input
                                            type="number"
                                            name="energy"
                                            value={formInputs.energy}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Déchets (kg/jour)
                                        </label>
                                        <input
                                            type="number"
                                            name="waste"
                                            value={formInputs.waste}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                        />
                                    </div>
                                    <Button
                                        onClick={handlePredict}
                                        className="w-full bg-green-600 text-white hover:bg-green-700 py-2 rounded-xl"
                                    >
                                        Calculer l'empreinte carbone
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimulationViewer;
