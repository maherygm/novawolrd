import { useState } from "react";
import { Button, ScrollShadow, Input } from "@heroui/react";
import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";

const epidemics = [
    {
        id: 1,
        title: "COVID-19",
        description: "Une pandémie causée par le SARS-CoV-2.",
        history:
            "Déclarée en 2019 en Chine, s'est propagée mondialement en 2020.",
        video: "https://www.youtube.com/embed/5DGwOJXSxqg",
        vaccine: "Pfizer, Moderna, AstraZeneca, Sinovac, etc.",
        cause: "Coronavirus SARS-CoV-2.",
        symptoms: "Fièvre, toux, essoufflement, perte du goût et de l'odorat.",
        transmission: "Gouttelettes respiratoires, contact direct.",
        treatment:
            "Traitement symptomatique, oxygénothérapie pour les cas sévères.",
    },
    {
        id: 2,
        title: "Grippe Espagnole",
        description: "Une pandémie de grippe en 1918.",
        history:
            "Apparue en 1918, a infecté un tiers de la population mondiale.",
        video: "https://www.youtube.com/embed/sHcJ9U1lVgo",
        vaccine: "Aucun vaccin spécifique à l'époque.",
        cause: "Virus influenza H1N1.",
        symptoms:
            "Fièvre, fatigue, douleurs musculaires, détresse respiratoire.",
        transmission: "Gouttelettes respiratoires.",
        treatment: "Soins de soutien et prévention par distanciation.",
    },
    {
        id: 3,
        title: "Ebola",
        description: "Une maladie virale sévère, souvent mortelle.",
        history: "Première épidémie en 1976 au Soudan et au Zaïre.",
        video: "https://www.youtube.com/embed/T-lBHU7rRVE",
        vaccine: "Vaccin rVSV-ZEBOV.",
        cause: "Virus Ebola.",
        symptoms: "Fièvre, saignements internes, douleurs musculaires.",
        transmission: "Contact avec les fluides corporels infectés.",
        treatment: "Traitement symptomatique, soins intensifs.",
    },
    {
        id: 4,
        title: "Peste Noire",
        description:
            "Une des pandémies les plus meurtrières de l'histoire humaine.",
        history:
            "A ravagé l'Europe au 14ème siècle, causant la mort de millions de personnes.",
        video: "https://www.youtube.com/embed/HeE9Y4TMv5o",
        vaccine:
            "Aucun vaccin spécifique, la maladie est aujourd'hui traitable avec des antibiotiques.",
        cause: "Virus Ebola.",
        symptoms: "Fièvre, saignements internes, douleurs musculaires.",
        transmission: "Contact avec les fluides corporels infectés.",
        treatment: "Traitement symptomatique, soins intensifs.",
    },
    {
        id: 5,
        title: "SRAS (Syndrome Respiratoire Aigu Sévère)",
        description: "Maladie respiratoire virale causée par un coronavirus.",
        history:
            "Identifiée en 2002 en Chine, s'est propagée à plusieurs pays mais a été maîtrisée en 2003.",
        video: "https://www.youtube.com/embed/UG8YbNbdaco",
        vaccine:
            "Aucun vaccin spécifique, mais des mesures de confinement strictes ont aidé à enrayer la propagation.",
        cause: "Virus Ebola.",
        symptoms: "Fièvre, saignements internes, douleurs musculaires.",
        transmission: "Contact avec les fluides corporels infectés.",
        treatment: "Traitement symptomatique, soins intensifs.",
    },
    {
        id: 6,
        title: "MERS (Syndrome Respiratoire du Moyen-Orient)",
        description: "Infection virale causée par le coronavirus MERS-CoV.",
        history: "Identifié pour la première fois en Arabie Saoudite en 2012.",
        video: "https://www.youtube.com/embed/tO9g_9FOKmk",
        vaccine:
            "Aucun vaccin largement disponible, mais des recherches sont en cours.",
        cause: "Virus Ebola.",
        symptoms: "Fièvre, saignements internes, douleurs musculaires.",
        transmission: "Contact avec les fluides corporels infectés.",
        treatment: "Traitement symptomatique, soins intensifs.",
    },
    {
        id: 7,
        title: "Choléra",
        description:
            "Infection intestinale causée par la bactérie Vibrio cholerae.",
        history:
            "Épidémies majeures aux 19ème et 20ème siècles, touchant plusieurs continents.",
        video: "https://www.youtube.com/embed/8zC8dFlz6vk",
        vaccine: "Vaccins oraux disponibles, comme Dukoral et Shanchol.",
        cause: "Virus Ebola.",
        symptoms: "Fièvre, saignements internes, douleurs musculaires.",
        transmission: "Contact avec les fluides corporels infectés.",
        treatment: "Traitement symptomatique, soins intensifs.",
    },
    {
        id: 8,
        title: "Tuberculose",
        description:
            "Maladie bactérienne affectant principalement les poumons.",
        history:
            "Présente depuis des millénaires, causant de nombreuses épidémies dans le monde.",
        video: "https://www.youtube.com/embed/7B6lGa7PeUU",
        vaccine: "BCG (Bacille de Calmette et Guérin).",
        cause: "Virus Ebola.",
        symptoms: "Fièvre, saignements internes, douleurs musculaires.",
        transmission: "Contact avec les fluides corporels infectés.",
        treatment: "Traitement symptomatique, soins intensifs.",
    },
    {
        id: 9,
        title: "Poliomyélite",
        description: "Maladie virale qui peut entraîner la paralysie.",
        history:
            "Épidémies majeures aux 20ème siècle avant l’introduction du vaccin.",
        video: "https://www.youtube.com/embed/O3Wi7iC66Hg",
        vaccine: "Vaccin oral contre la polio (OPV) et vaccin inactivé (IPV).",
        cause: "Virus Ebola.",
        symptoms: "Fièvre, saignements internes, douleurs musculaires.",
        transmission: "Contact avec les fluides corporels infectés.",
        treatment: "Traitement symptomatique, soins intensifs.",
    },
    {
        id: 9,
        title: "Poliomyélite",
        description: "Maladie virale qui peut entraîner la paralysie.",
        history:
            "Épidémies majeures aux 20ème siècle avant l’introduction du vaccin.",
        video: "https://www.youtube.com/embed/O3Wi7iC66Hg",
        vaccine: "Vaccin oral contre la polio (OPV) et vaccin inactivé (IPV).",
        cause: "Virus Ebola.",
        symptoms: "Fièvre, saignements internes, douleurs musculaires.",
        transmission: "Contact avec les fluides corporels infectés.",
        treatment: "Traitement symptomatique, soins intensifs.",
    },
    {
        id: 10,
        title: "Fièvre Jaune",
        description: "Maladie virale transmise par les moustiques.",
        history:
            "A causé de nombreuses épidémies en Afrique et en Amérique du Sud.",
        video: "https://www.youtube.com/embed/2bhizH8wbr8",
        vaccine: "Vaccin contre la fièvre jaune disponible.",
        cause: "Virus Ebola.",
        symptoms: "Fièvre, saignements internes, douleurs musculaires.",
        transmission: "Contact avec les fluides corporels infectés.",
        treatment: "Traitement symptomatique, soins intensifs.",
    },
    {
        id: 11,
        title: "Variole",
        description: "Maladie virale éradiquée grâce à la vaccination.",
        history:
            "A causé des millions de décès avant son éradication en 1980 par l'OMS.",
        video: "https://www.youtube.com/embed/mTsbcdSBwCI",
        vaccine: "Vaccin contre la variole (éradiquée).",
        cause: "Virus Ebola.",
        symptoms: "Fièvre, saignements internes, douleurs musculaires.",
        transmission: "Contact avec les fluides corporels infectés.",
        treatment: "Traitement symptomatique, soins intensifs.",
    },
    {
        id: 12,
        title: "HIV/SIDA",
        description: "Une pandémie causée par le VIH.",
        history:
            "Identifié dans les années 1980, il affecte des millions de personnes dans le monde.",
        video: "https://www.youtube.com/embed/jcY5HiWxyRg",
        vaccine:
            "Aucun vaccin, mais des traitements antirétroviraux sont disponibles.",
        cause: "Virus de l'immunodéficience humaine (VIH).",
        symptoms: "Fatigue, perte de poids, infections opportunistes.",
        transmission: "Contact avec des fluides corporels infectés.",
        treatment: "Traitement antirétroviral (TAR).",
    },
    {
        id: 13,
        title: "Fièvre de Lassa",
        description: "Une fièvre hémorragique virale.",
        history:
            "Découverte au Nigeria en 1969, elle est endémique en Afrique de l'Ouest.",
        video: "https://www.youtube.com/embed/DyXMsR5_mL0",
        vaccine: "Aucun vaccin disponible.",
        cause: "Virus de l'immunodéficience humaine (VIH).",
        symptoms: "Fatigue, perte de poids, infections opportunistes.",
        transmission: "Contact avec des fluides corporels infectés.",
        treatment: "Traitement antirétroviral (TAR).",
    },
    {
        id: 14,
        title: "Dengue",
        description: "Maladie virale transmise par les moustiques.",
        history:
            "Présente dans les régions tropicales, elle peut être mortelle.",
        video: "https://www.youtube.com/embed/u5UIJGo9Nfw",
        vaccine: "Dengvaxia et d'autres vaccins en développement.",
        cause: "Virus de l'immunodéficience humaine (VIH).",
        symptoms: "Fatigue, perte de poids, infections opportunistes.",
        transmission: "Contact avec des fluides corporels infectés.",
        treatment: "Traitement antirétroviral (TAR).",
    },
    {
        id: 15,
        title: "Zika",
        description: "Maladie virale transmise par les moustiques.",
        history:
            "Identifiée en 1947, a provoqué une épidémie majeure en 2015-2016.",
        video: "https://www.youtube.com/embed/w5rKfRt3r8E",
        vaccine: "Aucun vaccin encore approuvé.",
        cause: "Virus de l'immunodéficience humaine (VIH).",
        symptoms: "Fatigue, perte de poids, infections opportunistes.",
        transmission: "Contact avec des fluides corporels infectés.",
        treatment: "Traitement antirétroviral (TAR).",
    },
    {
        id: 16,
        title: "Grippe aviaire",
        description:
            "Infection virale touchant principalement les oiseaux mais transmissible à l'homme.",
        history:
            "Apparue sporadiquement, elle a des sous-types comme H5N1 et H7N9.",
        video: "https://www.youtube.com/embed/NlYHhZrpRRc",
        vaccine: "Vaccins en développement.",
        cause: "Virus de l'immunodéficience humaine (VIH).",
        symptoms: "Fatigue, perte de poids, infections opportunistes.",
        transmission: "Contact avec des fluides corporels infectés.",
        treatment: "Traitement antirétroviral (TAR).",
    },
    {
        id: 17,
        title: "Rougeole",
        description: "Maladie virale hautement contagieuse.",
        history:
            "Avant la vaccination, elle causait de nombreuses épidémies mondiales.",
        video: "https://www.youtube.com/embed/O4L4qXJuFBo",
        vaccine: "Vaccin ROR (Rougeole-Oreillons-Rubéole).",
        cause: "Virus de l'immunodéficience humaine (VIH).",
        symptoms: "Fatigue, perte de poids, infections opportunistes.",
        transmission: "Contact avec des fluides corporels infectés.",
        treatment: "Traitement antirétroviral (TAR).",
    },
    {
        id: 18,
        title: "Fièvre de Marburg",
        description: "Une fièvre hémorragique virale similaire à Ebola.",
        history:
            "Découverte en 1967, avec des épidémies sporadiques en Afrique.",
        video: "https://www.youtube.com/embed/c2AE35Ljo2M",
        vaccine: "Aucun vaccin disponible.",
        cause: "Virus de l'immunodéficience humaine (VIH).",
        symptoms: "Fatigue, perte de poids, infections opportunistes.",
        transmission: "Contact avec des fluides corporels infectés.",
        treatment: "Traitement antirétroviral (TAR).",
    },
    {
        id: 19,
        title: "Typhus",
        description: "Maladie bactérienne transmise par les poux.",
        history: "Responsable de nombreuses épidémies pendant les guerres.",
        video: "https://www.youtube.com/embed/a4Kh_fqwxog",
        vaccine: "Vaccins disponibles contre certaines formes.",
        cause: "Virus de l'immunodéficience humaine (VIH).",
        symptoms: "Fatigue, perte de poids, infections opportunistes.",
        transmission: "Contact avec des fluides corporels infectés.",
        treatment: "Traitement antirétroviral (TAR).",
    },
    {
        id: 20,
        title: "Fièvre de la Vallée du Rift",
        description:
            "Infection virale affectant principalement le bétail mais transmissible à l'homme.",
        history: "Identifiée en 1931 au Kenya.",
        video: "https://www.youtube.com/embed/X3hbX3W8DoU",
        vaccine: "Vaccins vétérinaires disponibles, mais pas de vaccin humain.",
        cause: "Virus de l'immunodéficience humaine (VIH).",
        symptoms: "Fatigue, perte de poids, infections opportunistes.",
        transmission: "Contact avec des fluides corporels infectés.",
        treatment: "Traitement antirétroviral (TAR).",
    },
    {
        id: 21,
        title: "Tracoma",
        description: "Infection bactérienne oculaire pouvant causer la cécité.",
        history: "Endémique dans certaines régions d'Afrique et d'Asie.",
        video: "https://www.youtube.com/embed/ID77utIwhnc",
        vaccine: "Aucun vaccin, mais traitable avec des antibiotiques.",
        cause: "Virus de l'immunodéficience humaine (VIH).",
        symptoms: "Fatigue, perte de poids, infections opportunistes.",
        transmission: "Contact avec des fluides corporels infectés.",
        treatment: "Traitement antirétroviral (TAR).",
    },
    {
        id: 22,
        title: "Encéphalite Japonaise",
        description: "Maladie virale transmise par les moustiques.",
        history:
            "Présente principalement en Asie du Sud-Est et dans le Pacifique.",
        video: "https://www.youtube.com/embed/L3XvDKqa8kY",
        vaccine: "Vaccin contre l'encéphalite japonaise disponible.",
        cause: "Virus de l'immunodéficience humaine (VIH).",
        symptoms: "Fatigue, perte de poids, infections opportunistes.",
        transmission: "Contact avec des fluides corporels infectés.",
        treatment: "Traitement antirétroviral (TAR).",
    },
];

const EpidemicList = () => {
    const [selectedEpidemic, setSelectedEpidemic] = useState(epidemics[0]);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter epidemics based on search term
    const filteredEpidemics = epidemics.filter((epidemic) =>
        epidemic.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-point-background h-dvh-screen overflow-hidden w-screen bg-light-custom-background dark:bg-slate-950 dark:bg-opacity-25">
            <div className="bg-gradient-background flex h-[full] p-4 w-screen flex-col-reverse justify-between bg-cover sm:h-screen sm:flex-row">
                <div className="flex h-screen w-full">
                    <div className="w-[300px] h-[95%] swipeRight bg-white bg-opacity-65 backdrop-blur-sm shadow-md p-4 rounded-2xl">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold flex items-center">
                                <span>Liste des Épidémies</span>
                                <Link to={"/landing"}>
                                    <Button isIconOnly color="secondary">
                                        <ArrowLeft />
                                    </Button>
                                </Link>
                            </h2>

                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="Rechercher une maladie..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    startContent={
                                        <Search
                                            className="text-gray-400"
                                            size={20}
                                        />
                                    }
                                    className="w-full"
                                />
                            </div>
                        </div>

                        <ScrollShadow className="overflow-y-auto h-[85%] mt-4">
                            <ul>
                                {filteredEpidemics.map((epidemic) => (
                                    <li
                                        key={epidemic.id}
                                        onClick={() =>
                                            setSelectedEpidemic(epidemic)
                                        }
                                        className={`p-2 cursor-pointer rounded-lg hover:bg-gray-200 ${
                                            selectedEpidemic.id === epidemic.id
                                                ? "bg-blue-200"
                                                : ""
                                        }`}
                                    >
                                        {epidemic.title}
                                    </li>
                                ))}
                            </ul>
                        </ScrollShadow>
                    </div>

                    <ScrollShadow className="w-full p-6 swipeFadeUpCard overflow-y-auto h-[95%]">
                        <h1 className="text-2xl font-bold">
                            {selectedEpidemic.title}
                        </h1>
                        <p className="text-gray-700 mt-2">
                            {selectedEpidemic.description}
                        </p>
                        <h3 className="text-lg font-semibold mt-4">
                            Historique
                        </h3>
                        <p className="text-gray-600">
                            {selectedEpidemic.history}
                        </p>
                        <h3 className="text-lg font-semibold mt-4">Vidéo</h3>
                        <iframe
                            className="mt-2 w-full h-[400px] rounded-lg"
                            src={selectedEpidemic.video}
                            title={selectedEpidemic.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>

                        <div className="flex flex-wrap gap-3 mt-4">
                            <div className="bg-white shadow-medium p-4 rounded-md">
                                <h3 className="text-lg font-semibold">
                                    Vaccin
                                </h3>
                                <p className="text-gray-600">
                                    {selectedEpidemic.vaccine}
                                </p>
                            </div>

                            <div className="bg-white shadow-medium p-4 rounded-md">
                                <h3 className="text-lg font-semibold">Cause</h3>
                                <p className="text-gray-600">
                                    {selectedEpidemic.cause}
                                </p>
                            </div>

                            <div className="bg-white shadow-medium p-4 rounded-md">
                                <h3 className="text-lg font-semibold">
                                    Symptômes
                                </h3>
                                <p className="text-gray-600">
                                    {selectedEpidemic.symptoms}
                                </p>
                            </div>

                            <div className="bg-white shadow-medium p-4 rounded-md">
                                <h3 className="text-lg font-semibold">
                                    Transmission
                                </h3>
                                <p className="text-gray-600">
                                    {selectedEpidemic.transmission}
                                </p>
                            </div>

                            <div className="bg-white shadow-medium p-4 rounded-md">
                                <h3 className="text-lg font-semibold">
                                    Traitement
                                </h3>
                                <p className="text-gray-600">
                                    {selectedEpidemic.treatment}
                                </p>
                            </div>
                        </div>
                    </ScrollShadow>
                </div>
            </div>
        </div>
    );
};

export default EpidemicList;
