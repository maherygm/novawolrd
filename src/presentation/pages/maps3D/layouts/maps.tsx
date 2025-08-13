import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import virus from "@/presentation/assets/image/icons/maps/virus.png";
import flood from "@/presentation/assets/image/icons/maps/flood.png";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@heroui/react";
import Map, {
    AttributionControl,
    GeolocateControl,
    Layer,
    MapProvider,
    Marker,
    NavigationControl,
    ScaleControl,
    Source,
} from "react-map-gl/mapbox";

import { useMaladies } from "@/presentation/hooks/useMaladies";
import { usePitch } from "@/presentation/hooks/useSwitchPitch";
import { Biohazard, MicIcon, Search } from "lucide-react";

const epidemics = [
    {
        ville: "Antananarivo",
        coordinates: [47.5164, -18.8792],
        villeInfo: {
            description:
                "Capitale de Madagascar, centre économique et politique du pays.",
            superficie: "88 km²",
            climat: "Tropical d'altitude",
        },
        quartier: [
            {
                name: "Choléra",
                color: "rgba(0, 191, 255, 0.5)",
                outline: "#00BFFF",
                coordinates: [47.5164, -18.8792],
                zonePropagation: 0.6,
                info: {
                    name: "Choléra",
                    description:
                        "Infection bactérienne provoquant une diarrhée sévère et une déshydratation rapide.",
                    message:
                        "Buvez de l'eau potable et évitez les aliments crus non lavés.",
                },
                icon: virus,
            },
            {
                name: "Peste",
                color: "rgba(139, 0, 0, 0.5)",
                outline: "#8B0000",
                coordinates: [47.52, -18.88],
                zonePropagation: 0.5,
                info: {
                    name: "Peste",
                    description:
                        "Maladie infectieuse grave transmise par les puces et les rongeurs.",
                    message:
                        "Évitez les contacts avec les rongeurs et consultez un médecin en cas de fièvre soudaine.",
                },
                icon: virus,
            },

            {
                name: "Tempête tropicale",
                color: "rgba(0, 0, 139, 0.5)",
                outline: "#00008B",
                coordinates: [47.52, -18.88],
                zonePropagation: 0.6,
                info: {
                    name: "Tempête tropicale",
                    description:
                        "Phénomène météorologique violent accompagné de vents forts et de pluies intenses.",
                    message:
                        "Restez à l'abri et évitez tout déplacement inutile.",
                },
                icon: flood,
            },
        ],
    },
    {
        ville: "Mahajanga",
        coordinates: [46.3167, -15.7167],
        villeInfo: {
            description:
                "Ville portuaire sur la côte nord-ouest, connue pour ses plages et son climat chaud.",
            superficie: "51 km²",
            climat: "Tropical humide",
        },
        quartier: [
            {
                name: "Dengue",
                color: "rgba(255, 140, 0, 0.5)",
                outline: "#FF8C00",
                coordinates: [46.3167, -15.7167],
                zonePropagation: 0.4,
                info: {
                    name: "Dengue",
                    description:
                        "Maladie virale transmise par les moustiques, provoquant une forte fièvre et des douleurs musculaires.",
                    message: "Utilisez des moustiquaires et des répulsifs.",
                },
                icon: virus,
            },
            {
                name: "Chikungunya",
                color: "rgba(255, 69, 0, 0.5)",
                outline: "#FF4500",
                coordinates: [46.32, -15.72], // Légèrement déplacé
                zonePropagation: 0.5,
                info: {
                    name: "Chikungunya",
                    description:
                        "Maladie virale transmise par les moustiques, causant de fortes douleurs articulaires.",
                    message:
                        "Utilisez des répulsifs et évitez les zones infestées de moustiques.",
                },
                icon: virus,
            },
            {
                name: "Fièvre jaune",
                color: "rgba(255, 215, 0, 0.5)",
                outline: "#FFD700",
                coordinates: [46.315, -15.715], // Légèrement déplacé
                zonePropagation: 0.6,
                info: {
                    name: "Fièvre jaune",
                    description:
                        "Infection virale transmise par les moustiques, provoquant de la fièvre et des hémorragies.",
                    message:
                        "Vaccinez-vous avant de voyager dans les zones à risque.",
                },
                icon: virus,
            },
            {
                name: "Leptospirose",
                color: "rgba(50, 205, 50, 0.5)",
                outline: "#32CD32",
                coordinates: [46.318, -15.718], // Légèrement déplacé
                zonePropagation: 0.4,
                info: {
                    name: "Leptospirose",
                    description:
                        "Maladie bactérienne transmise par l'eau contaminée par l'urine d'animaux infectés.",
                    message:
                        "Évitez l'eau stagnante et portez des bottes en cas d'inondation.",
                },
                icon: virus,
            },
        ],
    },
    {
        ville: "Toamasina",
        coordinates: [49.3833, -18.15],
        villeInfo: {
            description: "Principal port de Madagascar, situé sur la côte est.",
            superficie: "50 km²",
            climat: "Tropical humide",
        },
        quartier: [
            {
                name: "Paludisme",
                color: "rgba(0, 100, 0, 0.5)",
                outline: "#006400",
                coordinates: [49.3833, -18.15],
                zonePropagation: 0.5,
                info: {
                    name: "Paludisme",
                    description:
                        "Maladie parasitaire transmise par les piqûres de moustiques anophèles.",
                    message:
                        "Dormez sous une moustiquaire et utilisez des sprays anti-moustiques.",
                },
                icon: virus,
            },
            {
                name: "Cyclone",
                color: "rgba(255, 0, 0, 0.4)",
                outline: "#FF0000",
                coordinates: [49.385, -18.155],
                zonePropagation: 0.9,
                info: {
                    name: "Cyclone",
                    description:
                        "Système orageux intense avec vents destructeurs et fortes précipitations.",
                    message:
                        "Mettez-vous à l’abri et préparez un kit d’urgence.",
                },
                icon: flood,
            },
        ],
    },
    {
        ville: "Fianarantsoa",
        coordinates: [47.0833, -21.4333],
        villeInfo: {
            description:
                "Ville du sud-est de Madagascar, connue pour ses vignobles et son architecture coloniale.",
            superficie: "98 km²",
            climat: "Tropical humide",
        },
        quartier: [
            {
                name: "Rougeole",
                color: "rgba(255, 69, 0, 0.5)",
                outline: "#FF4500",
                coordinates: [47.0833, -21.4333],
                zonePropagation: 0.1,
                info: {
                    name: "Rougeole",
                    description:
                        "Maladie virale hautement contagieuse provoquant de la fièvre et une éruption cutanée.",
                    message:
                        "Assurez-vous d'être vacciné et évitez tout contact avec des personnes infectées.",
                    deces: 10,
                    infectes: 150,
                    gueris: 120,
                },
                icon: virus,
            },
            {
                name: "Choléra",
                color: "rgba(0, 0, 255, 0.5)",
                outline: "#0000FF",
                coordinates: [47.085, -21.435],
                zonePropagation: 0.6,
                info: {
                    name: "Choléra",
                    description:
                        "Infection intestinale provoquant des diarrhées sévères.",
                    message:
                        "Buvez de l'eau propre et respectez les règles d'hygiène alimentaire.",
                    deces: 25,
                    infectes: 300,
                    gueris: 250,
                },
                icon: virus,
            },
            {
                name: "Paludisme",
                color: "rgba(34, 139, 34, 0.5)",
                outline: "#228B22",
                coordinates: [47.08, -21.43],
                zonePropagation: 1.2,
                info: {
                    name: "Paludisme",
                    description:
                        "Maladie transmise par les moustiques provoquant fièvre et frissons.",
                    message:
                        "Utilisez des moustiquaires et évitez les piqûres de moustiques.",
                    deces: 15,
                    infectes: 500,
                    gueris: 460,
                },
                icon: virus,
            },
            {
                name: "Dengue",
                color: "rgba(255, 140, 0, 0.5)",
                outline: "#FF8C00",
                coordinates: [47.0785, -21.428],
                zonePropagation: 0.1,
                info: {
                    name: "Dengue",
                    description:
                        "Maladie virale transmise par les moustiques provoquant fièvre et douleurs musculaires.",
                    message:
                        "Protégez-vous contre les moustiques et éliminez les eaux stagnantes.",
                    deces: 8,
                    infectes: 200,
                    gueris: 180,
                },
                icon: virus,
            },
            {
                name: "Covid-19",
                color: "rgba(128, 128, 128, 0.5)",
                outline: "#808080",
                coordinates: [47.082, -21.4325],
                zonePropagation: 0.1,
                info: {
                    name: "Covid-19",
                    description:
                        "Maladie virale provoquant des infections respiratoires.",
                    message:
                        "Respectez les gestes barrières et portez un masque.",
                    deces: 50,
                    infectes: 1000,
                    gueris: 900,
                },
                icon: virus,
            },
            {
                name: "Fièvre typhoïde",
                color: "rgba(139, 0, 0, 0.5)",
                outline: "#8B0000",
                coordinates: [47.081, -21.431],
                zonePropagation: 0.5,
                info: {
                    name: "Fièvre typhoïde",
                    description:
                        "Infection bactérienne affectant l'intestin et la circulation sanguine.",
                    message:
                        "Consommez de la nourriture propre et de l'eau potable.",
                    deces: 12,
                    infectes: 280,
                    gueris: 250,
                },
                icon: virus,
            },

            {
                name: "Séisme",
                color: "rgba(128, 0, 128, 0.4)",
                outline: "#800080",
                coordinates: [47.084, -21.434],
                zonePropagation: 0.3,
                info: {
                    name: "Séisme",
                    description:
                        "Secousses telluriques pouvant causer des dégâts matériels et des blessés.",
                    message:
                        "Mettez-vous à l'abri sous une structure solide et éloignez-vous des vitres.",
                },
                icon: flood,
            },
        ],
    },
    {
        ville: "Toliara",
        coordinates: [43.684, -23.354],
        villeInfo: {
            description:
                "Ville portuaire du sud-ouest, célèbre pour ses récifs coralliens.",
            superficie: "44 km²",
            climat: "Tropical sec",
        },
        quartier: [
            {
                name: "Tuberculose",
                color: "rgba(220, 20, 60, 0.5)",
                outline: "#DC143C",
                coordinates: [43.684, -23.354],
                zonePropagation: 0.5,
                info: {
                    name: "Tuberculose",
                    description:
                        "Maladie infectieuse touchant principalement les poumons, transmise par voie aérienne.",
                    message:
                        "Couvrez-vous la bouche lorsque vous toussez et consultez un médecin en cas de toux persistante.",
                },
                icon: virus,
            },
        ],
    },
    {
        ville: "Antsiranana",
        coordinates: [49.2917, -12.2833],
        villeInfo: {
            description:
                "Ville portuaire au nord de Madagascar, connue pour son cadre naturel magnifique.",
            superficie: "40 km²",
            climat: "Tropical humide",
        },
        quartier: [
            {
                name: "Leptospirose",
                color: "rgba(50, 205, 50, 0.3)",
                outline: "#32CD32",
                coordinates: [49.2917, -12.2833],
                zonePropagation: 0.3,
                info: {
                    name: "Leptospirose",
                    description:
                        "Maladie bactérienne transmise par l'eau contaminée par l'urine d'animaux infectés.",
                    message:
                        "Évitez tout contact avec de l'eau stagnante et portez des bottes en cas d'inondation.",
                },
                icon: virus,
            },
        ],
    },
    // Ajoute les 16 autres régions ici avec les mêmes structures
];

const generateCirclePolygon = (center, radius, points = 36) => {
    const coordinates = [];
    for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const dx = (radius * Math.cos(angle)) / 111;
        const dy = (radius * Math.sin(angle)) / 111;
        coordinates.push([center[0] + dx, center[1] + dy]);
    }
    coordinates.push(coordinates[0]);
    return {
        type: "Feature",
        geometry: { type: "Polygon", coordinates: [coordinates] },
    };
};

const Maps3d = () => {
    const mapRef = useRef(null);
    const [radiusFactor, setRadiusFactor] = useState(1);
    const [selectedEpidemic, setSelectedEpidemic] = useState(null);
    const [showPopup, setShowPopup] = useState(false); // Etat pour gérer l'affichage du popup
    const [popupInfo, setPopupInfo] = useState(null); // Contenu du popup

    const { maladies, setMaladies } = useMaladies();

    const {
        isOpen: isOpenModalInfo,
        onOpen: onOpenModalInfo,
        onOpenChange: onOpenChangeModalInfo,
        onClose: onCloseModalInfo,
    } = useDisclosure();

    useEffect(() => {
        const interval = setInterval(() => {
            setRadiusFactor((prevFactor) =>
                prevFactor < 1.5 ? prevFactor + 0.05 : 1
            );
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const handleMarkerClick = (epidemic) => {
        setPopupInfo(epidemic); // Définit les informations à afficher dans le popup
        onOpenModalInfo();
    };

    useEffect(() => {
        setMaladies(epidemics[0]);
    }, []);

    useEffect(() => {
        const map = mapRef.current?.getMap();
        if (map) {
            map.flyTo({
                center: [maladies.coordinates[0], maladies.coordinates[1]],
                zoom: 7,
            });
        }
    }, [maladies, mapRef]);

    const { pitch, setPitch } = usePitch();

    return (
        <div className="w-full h-screen relative">
            <MapProvider>
                <ModalInfo
                    data={popupInfo}
                    isOpen={isOpenModalInfo}
                    onOpenChange={onOpenChangeModalInfo}
                    onClose={onCloseModalInfo}
                />

                <Map
                    ref={mapRef}
                    mapboxAccessToken="pk.eyJ1IjoibWFoZXJ5cmFrIiwiYSI6ImNseGl3c2l0NDFtMmUyanF6emJvZnR4bGQifQ.WExoqIG_lk5-lVlOinLPSg"
                    initialViewState={{
                        longitude: 47.0857,
                        latitude: -21.4536,
                        zoom: 7,
                    }}
                    pitch={pitch}
                    style={{ width: "100%", height: "100%" }}
                    mapStyle="mapbox://styles/maheryrak/cm9ea0rai00j501s46u0r6ejz"
                    attributionControl={false}
                >
                    <AttributionControl customAttribution="Map design by supernova team" />
                    <GeolocateControl />

                    {epidemics.map((epidemic, index) => {
                        return epidemic.quartier.map((qu, qIndex) => {
                            const adjustedRadius =
                                qu.zonePropagation * radiusFactor;
                            const circlePolygon = generateCirclePolygon(
                                qu.coordinates,
                                adjustedRadius
                            );

                            return (
                                <div key={`${index}-${qIndex}`}>
                                    <Source
                                        id={`circle-source-${index}-${qIndex}`}
                                        type="geojson"
                                        data={circlePolygon}
                                    >
                                        <Layer
                                            id={`circle-layer-${index}-${qIndex}`}
                                            type="fill"
                                            paint={{
                                                "fill-color": qu.color,
                                                "fill-outline-color":
                                                    qu.outline,
                                                "fill-opacity": 0.5,
                                            }}
                                        />
                                    </Source>
                                    <Source
                                        id={`label-source-${index}-${qIndex}`}
                                        type="geojson"
                                        data={{
                                            type: "FeatureCollection",
                                            features: [
                                                {
                                                    type: "Feature",
                                                    geometry: {
                                                        type: "Point",
                                                        coordinates:
                                                            qu.coordinates,
                                                    },
                                                    properties: {
                                                        title: qu.name,
                                                    },
                                                },
                                            ],
                                        }}
                                    >
                                        <Layer
                                            id={`label-layer-${index}-${qIndex}`}
                                            type="symbol"
                                            layout={{
                                                "text-field": ["get", "title"],
                                                "text-size": 14,
                                                "text-anchor": "top",
                                                "text-offset": [0, 1.5],
                                            }}
                                            paint={{ "text-color": qu.outline }}
                                        />
                                    </Source>
                                    <Marker
                                        longitude={qu.coordinates[0]}
                                        latitude={qu.coordinates[1]}
                                        anchor="center"
                                        offset={[0, -10]}
                                        onClick={() => {
                                            console.log(qu.info);

                                            handleMarkerClick(qu);
                                        }}
                                    >
                                        <img
                                            src={qu.icon}
                                            alt="epidemic icon"
                                            className="w-8 h-8"
                                        />
                                    </Marker>
                                </div>
                            );
                        });
                    })}

                    <NavigationControl />
                    <ScaleControl />
                </Map>
            </MapProvider>
            <LeftSideBAr mapRef={mapRef} regions={epidemics} />
            <RigthSideBAr mapRef={mapRef} />

            <SearchBar />
        </div>
    );
};

const Maps = () => {
    return (
        <div className="w-screen h-screen">
            <Maps3d />
        </div>
    );
};

export default Maps;

export function ModalInfo({ isOpen, data, onOpen, onOpenChange, onClose }) {
    useEffect(() => {
        if (data) {
            console.log(data);
        }
    }, [data]);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                className="bg-opacity-20 backdrop-blur-md"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex  gap-1">
                                <div>
                                    <img src={data.icon} className="w-8 h-8" />
                                </div>
                                <p>{data.info.name}</p>
                            </ModalHeader>
                            <ModalBody>
                                <p className="bg-red-200  p-2 rounded-lg">
                                    {data.info.description}
                                </p>

                                <p className="bg-blue-200 p-2 rounded-lg">
                                    {data.info.message}
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="solid"
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

const LeftSideBAr = ({ mapRef, regions }: any) => {
    return (
        <div className="absolute  z-50 top-0 left-0 w-72 h-screen p-4">
            <div className="relative flex flex-wrap gap-2">
                <NavigateRegion mapRef={mapRef} regions={regions} />
                <NavigateQuarter mapRef={mapRef} />
            </div>
        </div>
    );
};

const RigthSideBAr = ({ mapRef }: any) => {
    const { maladies, setMaladies } = useMaladies();
    return (
        <div className="swipeFadeUp absolute z-50 bottom-[200px] right-4 w-72  p-4">
            <div className="relative bg-white/30 bg-opacity-30 shadow-large backdrop-blur-sm border-white border border-opacity-15 backdrop-blur-sm flex flex-col gap-2 rounded-xl  p-3 mb-4">
                <h1 className="text-slate-800">Divers Info</h1>
                <Button>Superficie : {maladies?.villeInfo.superficie}</Button>
                <Button>Climat {maladies?.villeInfo.climat}</Button>
                <p></p>
            </div>

            <div className="bg-white/30 bg-opacity-30 shadow-large backdrop-blur-sm text-slate-600  border-white border border-opacity-15 text-[14px]  backdrop-blur-sm flex flex-col p-3 gap-2 rounded-xl ">
                {maladies?.villeInfo.description}
            </div>
        </div>
    );
};

const NavigateRegion = ({ mapRef, regions }) => {
    const [selectedRegion, setSelectedRegion] = useState(null);

    const { maladies, setMaladies } = useMaladies();
    const handleRegionClick = (region) => {
        onClick(region.coordinates[0], region.coordinates[1]);
        setMaladies(region);
    };

    const onClick = (lat, lng) => {
        const map = mapRef.current?.getMap();
        if (map) {
            map.flyTo({ center: [lat, lng], zoom: 12 });
        }
    };
    return (
        <div className="w-full swipeFadeUp bg-white/30 bg-opacity-30 shadow-large backdrop-blur-sm p-4 flex flex-col gap-2 rounded-xl border-white border border-opacity-15">
            <h1 className="text-[15px] text-slate-800">Les villes Epidemic</h1>
            <div className="flex flex-wrap gap-1 overflow-y-auto">
                {regions.map((region, index) => {
                    return (
                        <Button
                            key={index}
                            className="w-full bg-gray-300 hover:bg-light-custom-primary hover:text-white"
                            onClick={() => handleRegionClick(region)}
                        >
                            {region.ville}
                        </Button>
                    );
                })}
            </div>
        </div>
    );
};

const NavigateQuarter = ({ mapRef }: any) => {
    const { maladies, setMaladies } = useMaladies();

    function handleFlyToquarter(lat, lng) {
        const map = mapRef.current?.getMap();
        if (map) {
            map.flyTo({ center: [lat, lng], zoom: 15 });
        }
    }

    return (
        <div className="w-full swipeFadeUp h-[280px] p-4 bg-white/30 bg-opacity-30 shadow-large backdrop-blur-sm border-white border border-opacity-15 backdrop-blur-sm flex flex-col gap-2 rounded-xl">
            <h1 className="text-[15px] text-slate-800">
                Les quartiers épidémiques
            </h1>
            <div className="flex flex-wrap h-[200px]  overflow-y-auto gap-2">
                {maladies &&
                    maladies?.quartier.map((qu, index) => {
                        return (
                            <Button
                                key={index}
                                onClick={() =>
                                    handleFlyToquarter(
                                        qu.coordinates[0],
                                        qu.coordinates[1]
                                    )
                                }
                                className={`flex items-center gap-2  text-white px-4 py-2 rounded-xl text-[12px]`}
                                style={{ backgroundColor: qu.color }}
                            >
                                {/* <Biohazard className="w-4 h-4" /> Icône de virus */}
                                <img
                                    src={qu.icon}
                                    alt="epidemic icon"
                                    className="w-4 h-4"
                                />
                                {qu.name}
                            </Button>
                        );
                    })}
            </div>
        </div>
    );
};

const SearchBar = () => {
    const { pitch, setPitch } = usePitch();

    function switchPitch(value: number) {
        setPitch(pitch === 0 ? 60 : 0);
    }

    function handleSimulation() {
        console.log("Simulation", process.env.REACT_APP_FRONT_3D);

        window.location.href =
            process.env.REACT_APP_FRONT_3D + "/template/explore";
    }

    function handleSimulation2() {
        console.log("Simulation", process.env.REACT_APP_FRONT_3D);

        window.location.href =
            process.env.REACT_APP_FRONT_3D + "/template/simulate";
    }

    const navigate = useNavigate();

    function handleAssistance() {
        navigate("/meet");
    }

    function handleTeleConsultation() {
        navigate("/consultation");
    }

    return (
        <div className="swipeFadeUp p-2 bg-slate-500 my-4 bg-opacity-30 absolute flex flex-col rounded-xl gap-2 pt-2 top-0 left-1/2 -translate-x-1/2">
            <div className="flex gap-2">
                <Button
                    size="sm"
                    color="secondary"
                    className={"rounded-xl text-[13px]"}
                    onPress={switchPitch}
                >
                    Mode {pitch === 0 ? "2D" : "3D"}
                </Button>

                <Button
                    size="sm"
                    color="primary"
                    className="p-2 rounded-xl text-[13px]"
                    onPress={handleAssistance}
                >
                    Assistance Medicale
                </Button>
                <Button
                    size="sm"
                    color="secondary"
                    className="p-2 rounded-xl text-[13px]"
                    onPress={handleTeleConsultation}
                >
                    Tele Consultation
                </Button>
            </div>

            <div className="flex gap-2 border-t pt-2">
                <Button
                    size="sm"
                    color="warning"
                    className="p-2 rounded-xl text-[13px]"
                    onPress={() => {
                        const modal = Modal.show({
                            title: "Signaler une catastrophe",
                            content: (
                                <div className="flex flex-col gap-4">
                                    <select className="p-2 rounded-lg border">
                                        <option value="">
                                            Sélectionner une catégorie
                                        </option>
                                        <option value="sanitaire">
                                            Sanitaire
                                        </option>
                                        <option value="environnemental">
                                            Environnemental
                                        </option>
                                    </select>
                                    <textarea
                                        className="p-2 rounded-lg border"
                                        placeholder="Description de la catastrophe"
                                        rows={4}
                                    />
                                    <Button
                                        color="primary"
                                        onPress={() => modal.hide()}
                                    >
                                        Envoyer
                                    </Button>
                                </div>
                            ),
                        });
                    }}
                >
                    Signalement
                </Button>
                <Button
                    size="sm"
                    color="success"
                    className="p-2 rounded-xl text-[13px]"
                    onPress={() => {
                        Modal.show({
                            title: "Statistiques et Prédictions",
                            content: (
                                <div className="flex flex-col gap-4">
                                    <div className="border-b pb-2">
                                        <h3 className="font-bold">
                                            Pays les plus touchés
                                        </h3>
                                        <ul className="list-disc pl-4">
                                            <li>Madagascar: 45% des cas</li>
                                            <li>Comores: 25% des cas</li>
                                            <li>Maurice: 15% des cas</li>
                                        </ul>
                                    </div>
                                    <div className="border-b pb-2">
                                        <h3 className="font-bold">
                                            Maladies les plus répandues
                                        </h3>
                                        <ul className="list-disc pl-4">
                                            <li>Paludisme: 35%</li>
                                            <li>Dengue: 28%</li>
                                            <li>Choléra: 20%</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-bold">
                                            Prédictions pour votre secteur
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            Risque élevé de propagation du
                                            paludisme dans les 3 prochains mois
                                        </p>
                                    </div>
                                </div>
                            ),
                        });
                    }}
                >
                    Statistiques
                </Button>
            </div>
        </div>
    );
};
