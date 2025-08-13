import React, { createContext, useState, ReactNode, useContext } from "react";
import { useSpeechRecognition } from "./hooks/useSpeach";
import { useVoiceApi } from "./hooks/useVoiceApi";
import { AiVoiceAssitant } from "./components/aiVoiceAssistant";

import { applyVoiceAction } from "./interpreter";
import SpeechText from "./components/voiceSpeaker";

interface ComponentInfo {
    name: string;
    description: string;
    refs: HTMLElement | null;
}

interface ActionDictionary {
    [action: string]: ComponentInfo[];
}

interface ActionsContextType {
    action: ActionDictionary;
    addComponent: (actionName: string, componentInfo: ComponentInfo) => void;
    removeComponent: (actionName: string, componentName: string) => void;
}

const ActionContext = createContext<ActionsContextType | undefined>(undefined);

export const useComponent = () => {
    const context = useContext(ActionContext);
    if (!context) {
        throw new Error("Wrong usage of useComponent");
    }
    return context;
};

export const BotProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [dataComponent, setComponent] = useState<ActionDictionary>({});
    const [textToSpeach, setTextSpeach] = useState("")
    const { sendToApi } = useVoiceApi();
    console.log(dataComponent)

    // 🔹 Ajouter un composant sous une action spécifique
    const addComponent = (action: string, componentInfo: ComponentInfo) => {
        setComponent((prevComp) => {
            const existingComponent = prevComp[action] || [];
            const isAlreadyAdded = existingComponent.some((comp) => comp.name === componentInfo.name);

            if (!isAlreadyAdded) {
                return {
                    ...prevComp,
                    [action]: [...existingComponent, componentInfo],
                };
            }
            return prevComp;
        });
    };

    const removeComponent = (action: string, componentName: string) => {
        setComponent((prevComp) => {
            const existingComponent = prevComp[action] || [];
            const updatedComponents = existingComponent.filter((comp) => comp.name !== componentName);
    
            if (updatedComponents.length !== existingComponent.length) {
                return {
                    ...prevComp,
                    [action]: updatedComponents,
                };
            }
            return prevComp;
        });
    };
    

    // 🔹 Déclenche l’action demandée
    // const triggerAction = (actionName: string) => {
    //     const currentScroll = window.scrollY; // Récupérer la position actuelle du scroll
    //     const scrollAmount = window.innerHeight; // 100vh
    
    //     if (actionName === "scrollDown") {
    //         window.scrollTo({ top: currentScroll + scrollAmount, behavior: "smooth" });
    //     } else if (actionName === "scrollUp") {
    //         window.scrollTo({ top: Math.max(0, currentScroll - scrollAmount), behavior: "smooth" });
    //     } else if (dataComponent[actionName]) {
    //         dataComponent[actionName].forEach((comp) => {
    //             if (comp.refs.current) {
    //                 if (actionName === "click") {
    //                     comp.refs.current.click();
    //                 }
    //             }
    //         });
    //     }
    // };
    
    

    // 🔹 Intégration de la reconnaissance vocale
    useSpeechRecognition({
        onResult: async (transcript) => {
            console.log(transcript)
            if(transcript){
                const corrections = {
                    'scroller': 'scolaire',
                    'bas': 'bras',
                };
            
                let finalTrs = transcript;
                for (const [wrong, correct] of Object.entries(corrections)) {
                    const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
                    finalTrs = finalTrs.replace(regex, correct);
                }
                const result = await sendToApi(dataComponent, transcript);
                console.log(result)
                if (result) {
                    if (result.isAction){
                        applyVoiceAction(result, dataComponent);
                    }
                    else{
                        console.log("io e",result.text)
                        setTextSpeach(result.text ?? "Désolé, je ne comprends pas très bien");
                    }
                }
            }
        },
    });

    return (
        <ActionContext.Provider value={{ action: dataComponent, addComponent, removeComponent }}>
            <AiVoiceAssitant />
            <SpeechText
                text={textToSpeach}
                start={true} 
                onStart={() => console.log('La synthèse vocale a démarré')}
                onEnd={() => console.log("over...")}
            />
            {children}
        </ActionContext.Provider>
    );
};
