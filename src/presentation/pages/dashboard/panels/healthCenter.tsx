import { PaperclipIcon } from "lucide-react";
import React, { useState } from "react";
import { useSmsService } from "@/core/config/smsService"; // Importer le hook personnalisé
import { Chip } from "@heroui/chip";

type Epidemic = {
    city: string;
    disease: string;
    deathRate: number;
    recoveryRate: number;
    infectionRate: number;
};

const initialData: Epidemic[] = [
    {
        city: "Antananarivo",
        disease: "COVID-19",
        deathRate: 2.5,
        recoveryRate: 80,
        infectionRate: 30,
    },
    {
        city: "Toamasina",
        disease: "Malaria",
        deathRate: 1.2,
        recoveryRate: 70,
        infectionRate: 15,
    },
    {
        city: "Fianarantsoa",
        disease: "Tuberculosis",
        deathRate: 5.1,
        recoveryRate: 60,
        infectionRate: 20,
    },
    {
        city: "Antananarivo",
        disease: "COVID-19",
        deathRate: 2.5,
        recoveryRate: 80,
        infectionRate: 30,
    },
    {
        city: "Toamasina",
        disease: "Malaria",
        deathRate: 1.2,
        recoveryRate: 70,
        infectionRate: 15,
    },
    {
        city: "Fianarantsoa",
        disease: "Tuberculosis",
        deathRate: 5.1,
        recoveryRate: 60,
        infectionRate: 20,
    },
];

const getStatusColor = (infectionRate: number, deathRate: number) => {
    if (infectionRate > 20 || deathRate > 3) return "bg-red-500"; // Rouge
    if (infectionRate >= 10 && infectionRate <= 20) return "bg-blue-500"; // Bleu
    return "bg-green-500"; // Vert
};

const HealthCenter: React.FC = () => {
    const [filteredData, setFilteredData] = useState(initialData);
    const [cityFilter, setCityFilter] = useState("");
    const [diseaseFilter, setDiseaseFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const { sendSms } = useSmsService();
    const [phoneNumber] = useState("+261348500992"); // Numéro de téléphone par défaut
    const [message, setMessage] = useState("Test");

    const filterData = () => {
        let filtered = initialData;

        if (cityFilter) {
            filtered = filtered.filter((item) =>
                item.city.toLowerCase().includes(cityFilter.toLowerCase())
            );
        }
        if (diseaseFilter) {
            filtered = filtered.filter((item) =>
                item.disease.toLowerCase().includes(diseaseFilter.toLowerCase())
            );
        }
        if (statusFilter) {
            filtered = filtered.filter(
                (item) =>
                    getStatusColor(item.infectionRate, item.deathRate) ===
                    statusFilter
            );
        }

        setFilteredData(filtered);
    };

    const handleNotify = (city: string) => {
        // Envoi d'un message SMS pour prévenir les habitants de la ville
        sendSms(
            "+261348500992",
            `Attention! Il y a une épidémie sérieuse dans la ville de ${city}. Restez en sécurité.`
        );
        sendSms(
            "+261333409882",
            `Attention! Il y a une épidémie sérieuse dans la ville de ${city}. Restez en sécurité.`
        );
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold mb-4">
                    Cas de propagation
                </h1>

                <div className="mb-6 flex gap-4">
                    <input
                        type="text"
                        placeholder="Recherche par ville"
                        value={cityFilter}
                        onChange={(e) => setCityFilter(e.target.value)}
                        className="px-4 py-2 rounded-2xl text-[13px] shadow-sm border-none  focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Recherche par maladie"
                        value={diseaseFilter}
                        onChange={(e) => setDiseaseFilter(e.target.value)}
                        className="px-4 py-2 rounded-2xl text-[13px]  shadow-sm border-none  focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 rounded-2xl text-[13px] shadow-sm border-none  focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Filtre par status</option>
                        <option value="bg-red-500">Red (High risk)</option>
                        <option value="bg-blue-500">Blue (Medium risk)</option>
                        <option value="bg-green-500">Green (Low risk)</option>
                    </select>
                    <button
                        onClick={filterData}
                        className="px-4 rounded-2xl bg-light-custom-primary py-2 bg-b text-white shadow-md"
                    >
                        Filtre
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap gap-3">
                {filteredData.map((epidemic, index) => {
                    const statusColor = getStatusColor(
                        epidemic.infectionRate,
                        epidemic.deathRate
                    );

                    return (
                        <div
                            key={index}
                            className={`p-6  rounded-xl w-[255px] shadow-lg bg-white bg-opacity-25 backdrop-blur-md text-slate-500`}
                        >
                            <div
                                className={`${statusColor} relative right-3 w-[70px] rounded-full text-white text-center left-[130px]`}
                            >
                                status
                            </div>

                            <h2 className="text-2xl font-semibold">
                                {epidemic.city}
                            </h2>
                            <div className="flex flex-wrap  gap-2">
                                <Chip className="mt-2" size="sm">
                                    Disease: {epidemic.disease}
                                </Chip>
                                <Chip className="mt-1" size="sm">
                                    Death Rate: {epidemic.deathRate}%
                                </Chip>
                                <Chip className="mt-1" size="sm">
                                    Recovery Rate: {epidemic.recoveryRate}%
                                </Chip>
                                <Chip className="mt-1" size="sm">
                                    Infection Rate: {epidemic.infectionRate}%
                                </Chip>
                            </div>

                            {statusColor === "bg-red-500" && (
                                <div className="mt-4 flex items-center">
                                    <button
                                        onClick={() =>
                                            handleNotify(epidemic.city)
                                        }
                                        className="inline-flex items-center text-[12px] rounded-2xl bg-light-custom-primary transition px-4 py-2 text-white shadow-sm hover:bg-gray-700"
                                    >
                                        <PaperclipIcon className="h-5 w-5 mr-2" />
                                        Prévenir les habitants
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HealthCenter;
