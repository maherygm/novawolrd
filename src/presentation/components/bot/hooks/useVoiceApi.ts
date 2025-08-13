interface ApiResponse {
    isAction: boolean;
    name: string;
    element: string | null;
    action: string | null;
    text: string;
}



export const useVoiceApi = () => {
    const cleanObject = (obj: any) => {
        return JSON.parse(
            JSON.stringify(obj, (_, value) =>
                value instanceof HTMLElement ? undefined : value
            )
        );
    };
    const sendToApi = async (elementData: Record<string, any>, message: string): Promise<ApiResponse | null> => {
        try {
            const cleanData = cleanObject(elementData); // Nettoyage avant envoi
    
            const response = await fetch("http://localhost:3000/ai/assist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ elementData: cleanData, message }),
            });
    
            if (!response.ok) {
                throw new Error("Erreur API");
            }
    
            return await response.json();
        } catch (err) {
            console.error("Erreur API:", err);
            return null;
        }
    };

    return { sendToApi };
};
