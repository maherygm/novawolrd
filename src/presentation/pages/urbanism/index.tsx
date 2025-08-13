import React, { useRef } from "react";
import useImageDescription from "@/presentation/hooks/useExplainImag";
import { Button } from "@heroui/button";

const ImageUploader: React.FC = () => {
    const { describeImage, description, analysis, loading, error } =
        useImageDescription();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [imageUrl, setImageUrl] = React.useState<string | null>(null);

    const [analyse, setAnalysise] = React.useState<any>(false);

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        setImageUrl(URL.createObjectURL(file));
        setAnalysise(true);
        if (file) {
            await describeImage(file);
            setAnalysise(false);
        }
    };

    return (
        <div className="bg-abstract-background">
            <div className="bg-backglass3-background">
                <div className="flex max-w-[1300px] flex pt-[130px]  h-screen flex-col mx-auto">
                    <div className="text-center  mb-12">
                        <h1 className="text-4xl font-bold font-syne mb-4 ">
                            Gestion des Déchets Écologique
                        </h1>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Découvrez nos solutions innovantes pour une gestion
                            responsable des déchets. Ensemble, créons un avenir
                            plus durable en transformant nos déchets en
                            ressources précieuses.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 px-6">
                        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
                            <img
                                src="/images/compost.jpg"
                                alt="Compostage"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-bold mb-2 font-syne">
                                Compostage
                            </h3>
                            <p className="text-gray-600">
                                Transformez vos déchets organiques en ressource
                                précieuse pour enrichir les sols et réduire
                                votre empreinte écologique.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
                            <img
                                src="/images/recycling.jpg"
                                alt="Recyclage"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-bold mb-2 font-syne">
                                Recyclage
                            </h3>
                            <p className="text-gray-600">
                                Donnez une seconde vie à vos déchets grâce au
                                tri sélectif et aux processus de transformation
                                innovants.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform">
                            <img
                                src="/images/upcycling.jpg"
                                alt="Upcycling"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-xl font-bold mb-2 font-syne">
                                Upcycling
                            </h3>
                            <p className="text-gray-600">
                                Créez de la valeur en transformant vos déchets
                                en objets design et fonctionnels pour un impact
                                positif.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="min-h-full h-screen  py-20 px-4 max-w-2xl mx-auto">
                    <h1 className="text-3xl text-center font-bold my-4 font-syne">
                        Descripteur d'image & Analyse IA
                    </h1>

                    <p className="text-center">
                        Un environnement propre est la base d’une bonne santé.
                        Lorsque notre cadre de vie est débarrassé des déchets,
                        des polluants et des nuisances, la nature peut respirer
                    </p>
                    <>
                        <div className="flex flex-col gap-2 w-full items-center justify-center  my-2">
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="mb-4 w-fit hidden"
                            />
                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    className={`w-[50%] h-auto ${
                                        analyse ? "animate-pulse" : ""
                                    } `}
                                />
                            )}
                            <Button
                                className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                onPress={() => {
                                    fileInputRef?.current?.click();
                                }}
                            >
                                uploader un image de dechet pour Analyser un
                                dechet
                            </Button>
                        </div>
                        {/* <p>
      les sols restent fertiles, l’air est plus pur, et l’eau est plus saine. Cela réduit considérablement les risques
      de maladies respiratoires, infectieuses ou chroniques. Vivre dans un espace propre favorise également le bien-être mental, 
      la productivité et la qualité de vie. Ainsi, préserver l’environnement, c’est aussi protéger notre santé individuelle et collective : 
      c’est un cercle vertueux où l’équilibre de la planète reflète celui du corps humain.
      </p> */}
                    </>

                    {loading && <p className="text-center">Chargement...</p>}
                    {error && <p className="text-red-500">Erreur : {error}</p>}

                    {analysis && (
                        <div className="bg-gray-100 p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold mb-2">
                                Analyse IA :
                            </h2>
                            <p>
                                <strong>Type :</strong> {analysis.type}
                            </p>
                            <p>
                                <strong>Est un déchet :</strong>{" "}
                                {analysis.estDechet ? "Oui" : "Non"}
                            </p>

                            <div className="mt-2">
                                <strong>Idées de recyclage :</strong>
                                <ul className="list-disc ml-6 text-gray-800">
                                    {analysis.ideesRecyclage ? (
                                        analysis.ideesRecyclage.map(
                                            (idee, index) => (
                                                <li key={index}>{idee}</li>
                                            )
                                        )
                                    ) : (
                                        <li>
                                            Aucune idée de recyclage disponible.
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className="mt-2">
                                <strong>
                                    Types d'entreprises intéressées :
                                </strong>
                                <ul className="list-disc ml-6 text-gray-800">
                                    {analysis.typesEntreprises ? (
                                        analysis.typesEntreprises.map(
                                            (entreprise, index) => (
                                                <li key={index}>
                                                    {entreprise}
                                                </li>
                                            )
                                        )
                                    ) : (
                                        <li>Aucune entreprise disponible.</li>
                                    )}
                                </ul>
                            </div>

                            {analysis.warning && (
                                <p className="mt-4 text-yellow-600 font-semibold">
                                    ⚠️ Avertissement : {analysis.warning}
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageUploader;
