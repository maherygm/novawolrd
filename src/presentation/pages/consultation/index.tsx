import React, { useEffect, useState } from "react";
import { ThreeDModel } from "./components/ThreeDModel";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import styles from "../../styles/Consulter.module.scss";
import TypewriterWithVoice from "./components/TypewriterWithVoice";
/* import AIService from "@/services/AIService"; */
import { toast } from "sonner";
import jsPDF from "jspdf";
import { Link } from "react-router-dom";

// Liste des symptômes suggérés
const symptomsList: string[] = [
    "perte musculaire",
    "plaques dans la gorge",
    "forte fievre",
    "contacts extraconjugaux",
    "stomach pain",
    "vomiting",
];

// Interface pour les descriptions de maladies
interface DiseaseDescriptions {
    [key: string]: string;
}

// Interface pour les props du TypewriterWithVoice
interface TypewriterWithVoiceProps {
    text: string;
    onComplete: () => void;
}

const Consulter: React.FC = () => {
    const [voice, setVoice] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [animationComplete, setAnimationComplete] = useState<boolean>(false);
    const [currentStep, setCurrentStep] = useState<number>(1);

    const [symptome1, setSymptome1] = useState<string>("");
    const [symptome2, setSymptome2] = useState<string>("");
    const [symptome3, setSymptome3] = useState<string>("");
    const [symptome4, setSymptome4] = useState<string>("");

    const [suggestions1, setSuggestions1] = useState<string[]>([]);
    const [suggestions2, setSuggestions2] = useState<string[]>([]);
    const [suggestions3, setSuggestions3] = useState<string[]>([]);
    const [suggestions4, setSuggestions4] = useState<string[]>([]);

    const [diseaseDescriptions, setDiseaseDescriptions] =
        useState<DiseaseDescriptions>({});

    const [focusedInput, setFocusedInput] = useState<number | null>(null);

    const concatenatedDescriptions = Object.entries(diseaseDescriptions)
        .map(([disease, description]) => `${disease}: ${description}`)
        .join("\n");

    const handleSymptomeChange =
        (
            setter: React.Dispatch<React.SetStateAction<string>>,
            setSuggestions: React.Dispatch<React.SetStateAction<string[]>>
        ) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setter(value);

            // Update suggestions based on the current input value
            if (value) {
                const filteredSuggestions = symptomsList.filter((symptom) =>
                    symptom.toLowerCase().includes(value.toLowerCase())
                );
                setSuggestions(filteredSuggestions);
            } else {
                setSuggestions([]); // Clear suggestions if input is empty
            }
        };

    const handleSuggestionClick = (
        symptom: string,
        setter: React.Dispatch<React.SetStateAction<string>>,
        setSuggestions: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        setter(symptom);
        setSuggestions([]); // Clear suggestions after selection
    };

    const nextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const isCurrentStepFilled = (): boolean => {
        switch (currentStep) {
            case 1:
                return !!symptome1;
            case 2:
                return !!symptome2;
            case 3:
                return !!symptome3;
            case 4:
                return !!symptome4;
            default:
                return false;
        }
    };

    useEffect(() => {
        if (Object.keys(diseaseDescriptions).length > 0) {
            console.log({ diseaseDescriptions });
        }
    }, [diseaseDescriptions]);

    function handleDownload(): void {
        const doc = new jsPDF();

        const logoPath = "/aid-logo.png";
        const logo = new Image();
        logo.src = logoPath;

        logo.onload = () => {
            doc.addImage(logo, "PNG", 10, 0, 40, 40);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.text(`Prévention des Maladies`, 10, 40);

            doc.text("", 10, 50);

            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);

            const maxWidth = 190;

            const entries = Object.entries(diseaseDescriptions);
            let verticalOffset = 60;

            entries.forEach(([disease, description]) => {
                doc.setFont("helvetica", "bold");
                doc.text(disease, 10, verticalOffset);
                verticalOffset += 10;

                doc.setFont("helvetica", "normal");
                const lines = doc.splitTextToSize(description, maxWidth);

                lines.forEach((line) => {
                    doc.text(line, 10, verticalOffset);
                    verticalOffset += 10;
                });

                verticalOffset += 5;
            });

            doc.setFont("helvetica", "bold");
            doc.text("Symptômes:", 10, verticalOffset);
            verticalOffset += 10;

            doc.setFont("helvetica", "normal");
            const symptoms = [
                symptome1,
                symptome2,
                symptome3,
                symptome4,
            ].filter(Boolean);

            if (symptoms.length > 0) {
                const symptomLines = symptoms.map((symptom) => `- ${symptom}`);
                const symptomText = doc.splitTextToSize(
                    symptomLines.join("\n"),
                    maxWidth
                );

                symptomText.forEach((line) => {
                    doc.text(line, 10, verticalOffset);
                    verticalOffset += 10;
                });
            } else {
                doc.text("Aucun symptôme fourni.", 10, verticalOffset);
                verticalOffset += 10;
            }

            doc.save("precautions.pdf");
        };
    }

    async function handleSendSymptoms(): Promise<void> {
        const symptoms = [symptome1, symptome2, symptome3, symptome4].filter(
            Boolean
        );

        if (symptoms.length === 0) {
            toast.warning(
                "Entrez au moins un symptôme pour pouvoir vous examiner"
            );
            return;
        }

        setVoice(false);
        setLoading(true);
        setAnimationComplete(false);

        try {
            console.log("test");
            // Simulation de données pour test
            const mockDiseaseDescriptions: DiseaseDescriptions = {
                Grippe: "Description: La grippe est une infection virale qui affecte le système respiratoire.\nPrécautions: \n- Repos au lit\n- Hydratation fréquente\n- Éviter le contact avec d'autres personnes\n- Médicaments antipyrétiques si nécessaire",
            };

            setDiseaseDescriptions(mockDiseaseDescriptions);
            setVoice(true);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching precautions:", error);
            toast.error("Erreur lors de la récupération des précautions");
        }
    }

    const getProgressPercentage = (): number => {
        return ((currentStep - 1) / 3) * 100;
    };

    const renderStepContent = () => {
        return (
            <div className={styles.formStep} key={currentStep}>
                {currentStep === 1 && (
                    <>
                        <Link to="/" className="w-full flex justify-end">
                            <button
                                className={styles.backButton}
                                onClick={() => window.history.back()}
                            >
                                ← Retour
                            </button>
                        </Link>
                        <div className={styles.stepHeader}>
                            <span className={styles.stepNumber}>1</span>
                            <h3 className={styles.stepTitle}>
                                Premier symptôme
                            </h3>
                        </div>
                        <div
                            className={`${styles.inputContainer} ${
                                focusedInput === 1 ? styles.inputFocused : ""
                            }`}
                        >
                            <div className={styles.inputWrapper}>
                                <input
                                    type="text"
                                    placeholder="Entrez votre premier symptôme"
                                    value={symptome1}
                                    onChange={handleSymptomeChange(
                                        setSymptome1,
                                        setSuggestions1
                                    )}
                                    onFocus={() => setFocusedInput(1)}
                                    onBlur={() => setFocusedInput(null)}
                                />
                                {symptome1 && (
                                    <div className={styles.checkmark}>✓</div>
                                )}
                            </div>
                            {suggestions1.length > 0 && (
                                <ul className={styles.suggestions}>
                                    {suggestions1.map((suggestion) => (
                                        <li
                                            key={suggestion}
                                            onClick={() =>
                                                handleSuggestionClick(
                                                    suggestion,
                                                    setSymptome1,
                                                    setSuggestions1
                                                )
                                            }
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </>
                )}

                {currentStep === 2 && (
                    <>
                        <div className={styles.stepHeader}>
                            <span className={styles.stepNumber}>2</span>
                            <h3 className={styles.stepTitle}>
                                Deuxième symptôme
                            </h3>
                        </div>
                        <div
                            className={`${styles.inputContainer} ${
                                focusedInput === 2 ? styles.inputFocused : ""
                            }`}
                        >
                            <div className={styles.inputWrapper}>
                                <input
                                    type="text"
                                    placeholder="Entrez votre deuxième symptôme"
                                    value={symptome2}
                                    onChange={handleSymptomeChange(
                                        setSymptome2,
                                        setSuggestions2
                                    )}
                                    onFocus={() => setFocusedInput(2)}
                                    onBlur={() => setFocusedInput(null)}
                                />
                                {symptome2 && (
                                    <div className={styles.checkmark}>✓</div>
                                )}
                            </div>
                            {suggestions2.length > 0 && (
                                <ul className={styles.suggestions}>
                                    {suggestions2.map((suggestion) => (
                                        <li
                                            key={suggestion}
                                            onClick={() =>
                                                handleSuggestionClick(
                                                    suggestion,
                                                    setSymptome2,
                                                    setSuggestions2
                                                )
                                            }
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </>
                )}

                {currentStep === 3 && (
                    <>
                        <div className={styles.stepHeader}>
                            <span className={styles.stepNumber}>3</span>
                            <h3 className={styles.stepTitle}>
                                Troisième symptôme
                            </h3>
                        </div>
                        <div
                            className={`${styles.inputContainer} ${
                                focusedInput === 3 ? styles.inputFocused : ""
                            }`}
                        >
                            <div className={styles.inputWrapper}>
                                <input
                                    type="text"
                                    placeholder="Entrez votre troisième symptôme"
                                    value={symptome3}
                                    onChange={handleSymptomeChange(
                                        setSymptome3,
                                        setSuggestions3
                                    )}
                                    onFocus={() => setFocusedInput(3)}
                                    onBlur={() => setFocusedInput(null)}
                                />
                                {symptome3 && (
                                    <div className={styles.checkmark}>✓</div>
                                )}
                            </div>
                            {suggestions3.length > 0 && (
                                <ul className={styles.suggestions}>
                                    {suggestions3.map((suggestion) => (
                                        <li
                                            key={suggestion}
                                            onClick={() =>
                                                handleSuggestionClick(
                                                    suggestion,
                                                    setSymptome3,
                                                    setSuggestions3
                                                )
                                            }
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </>
                )}

                {currentStep === 4 && (
                    <>
                        <div className={styles.stepHeader}>
                            <span className={styles.stepNumber}>4</span>
                            <h3 className={styles.stepTitle}>
                                Quatrième symptôme
                            </h3>
                        </div>
                        <div
                            className={`${styles.inputContainer} ${
                                focusedInput === 4 ? styles.inputFocused : ""
                            }`}
                        >
                            <div className={styles.inputWrapper}>
                                <input
                                    type="text"
                                    placeholder="Entrez votre quatrième symptôme"
                                    value={symptome4}
                                    onChange={handleSymptomeChange(
                                        setSymptome4,
                                        setSuggestions4
                                    )}
                                    onFocus={() => setFocusedInput(4)}
                                    onBlur={() => setFocusedInput(null)}
                                />
                                {symptome4 && (
                                    <div className={styles.checkmark}>✓</div>
                                )}
                            </div>
                            {suggestions4.length > 0 && (
                                <ul className={styles.suggestions}>
                                    {suggestions4.map((suggestion) => (
                                        <li
                                            key={suggestion}
                                            onClick={() =>
                                                handleSuggestionClick(
                                                    suggestion,
                                                    setSymptome4,
                                                    setSuggestions4
                                                )
                                            }
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </>
                )}

                <div className={styles.progressContainer}>
                    <div
                        className={styles.progressBar}
                        style={{ width: `${getProgressPercentage()}%` }}
                    ></div>
                    <div className={styles.stepIndicator}>
                        {[1, 2, 3, 4].map((step) => (
                            <div
                                key={step}
                                className={`${styles.stepDot} ${
                                    currentStep >= step ? styles.active : ""
                                }`}
                                onClick={() => {
                                    if (step < currentStep) {
                                        setCurrentStep(step);
                                    }
                                }}
                            ></div>
                        ))}
                    </div>
                </div>

                <div className={styles.stepControls}>
                    {currentStep > 1 && (
                        <button
                            onClick={prevStep}
                            className={styles.prevButton}
                        >
                            Précédent
                        </button>
                    )}

                    {currentStep < 4 ? (
                        <button
                            onClick={nextStep}
                            disabled={!isCurrentStepFilled()}
                            className={styles.nextButton}
                        >
                            Suivant
                        </button>
                    ) : (
                        <button
                            onClick={handleSendSymptoms}
                            disabled={loading}
                            className={styles.submitButton}
                        >
                            {loading ? (
                                <div className={styles.spinner}></div>
                            ) : (
                                "Examiner"
                            )}
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <div className={styles.leftPanel}>{renderStepContent()}</div>
                <div className={styles.centerPanel}>
                    <Canvas>
                        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                        <hemisphereLight
                            groundColor={0x444444}
                            intensity={10}
                            position={[0, 1, 0]}
                        />
                        {/* 
            <Environment preset="studio" /> */}
                        <ThreeDModel
                            voice={voice}
                            concatenatedDescriptions={concatenatedDescriptions}
                            animationComplete={animationComplete}
                        />
                    </Canvas>
                </div>
                <div className={styles.rightPanel}>
                    <div className={styles.AiResponse}>
                        {voice && concatenatedDescriptions ? (
                            <TypewriterWithVoice
                                text={concatenatedDescriptions}
                                onComplete={() => setAnimationComplete(true)}
                            />
                        ) : (
                            <div className={styles.preResponse}>
                                Les reponses du docteur s'afficheront ici <br />
                                <img
                                    src="/aid-logos.png"
                                    alt="Logo"
                                    className={styles.logo}
                                />
                            </div>
                        )}
                    </div>
                    <button
                        className={styles.saveButton}
                        onClick={handleDownload}
                    >
                        Enregistrer
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Consulter;
