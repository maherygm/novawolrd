interface ComponentInfo {
    name: string;
    description: string;
    refs: HTMLElement | null;
}

interface ActionDictionary {
    [action: string]: ComponentInfo[];
}


const triggerAction = (actionName: string) => {
    const currentScroll = window.scrollY;
    const scrollAmount = window.innerHeight;

    if (actionName === "scrollDown") {
        window.scrollTo({ top: currentScroll + scrollAmount, behavior: "smooth" });
    } else if (actionName === "scrollUp") {
        window.scrollTo({ top: Math.max(0, currentScroll - scrollAmount), behavior: "smooth" });
    }
};

interface ApiResponse {
    isAction: boolean;
    name: string;
    element: string | null;
    action: string | null;
    text: string;
}

type ActionHandler = (element: HTMLElement) => void;

const actionMap: Record<string, ActionHandler | (() => void)> = {
    click: (element) => {
        console.log(`Tentative de clic sur l'élément:`, element);
        element.click();
    },
    hover: (element) => {
        console.log(`Tentative de survol sur l'élément:`, element);
        element.dispatchEvent(new Event("mouseenter"));
    },
    scroll: (element) => {
        console.log(`Tentative de défilement vers l'élément:`, element);
        triggerAction("scrollDown");
    },
    focus: (element) => {
        console.log(`Tentative de focus sur l'élément:`, element);
        element.focus();
    },
    blur: (element) => {
        console.log(`Tentative de blur sur l'élément:`, element);
        element.blur();
    },
    scrollDown: () => {
        console.log("Défilement vers le bas");
        triggerAction("scrollDown");
    },
    scrollUp: () => {
        console.log("Défilement vers le haut");
        triggerAction("scrollUp");
    },
};

export const applyVoiceAction = (apiResponse: ApiResponse, elementData: ActionDictionary) => {
    console.log("API Response reçu:", apiResponse);
    console.log("Element Data reçu:", elementData);

    if (!apiResponse.isAction || !apiResponse.action) {
        console.warn("Réponse API invalide ou action non requise.");
        return;
    }

    // Vérification spéciale pour l'action 'scroll' qui n'a pas besoin de 'name'
    if (apiResponse.action && apiResponse.action.includes("scroll")) {
        console.log("Défilement vers le bas effectué.");
        triggerAction("scrollDown");  // ou vous pouvez mettre 'scrollUp' selon votre besoin
        return;
    }

    // Si 'name' est requis pour l'action, on le vérifie
    if (!apiResponse.name) {
        console.warn(`Le nom de l'élément est vide pour l'action "${apiResponse.action}".`);
        return;
    }

    // Vérifie si elementData contient l'action demandée (click, hover, etc.)
    if (!elementData[apiResponse.action]) {
        console.warn(`Action "${apiResponse.action}" non trouvée dans elementData.`);
        return;
    }

    // Trouver l'élément correspondant dans la liste de cette action
    const targetElementData = elementData[apiResponse.action]?.find(el => el.name === apiResponse.name);
    if (!targetElementData) {
        console.warn(`Aucun élément correspondant à "${apiResponse.name}" pour l'action "${apiResponse.action}".`);
        return;
    }

    // Récupérer la référence de l'élément
    const targetElement = targetElementData.refs;
    if (!targetElement) {
        console.warn(`Référence invalide pour "${apiResponse.name}".`);
        return;
    }

    console.log("Élément cible:", targetElement);

    if (!(targetElement instanceof HTMLElement)) {
        console.warn("L'élément cible n'est pas un élément HTML valide:", targetElement);
        return;
    }

    // Exécuter l'action correspondante
    const actionHandler = actionMap[apiResponse.action];
    if (actionHandler) {
        actionHandler(targetElement);
    } else {
        console.warn("Action non reconnue:", apiResponse.action);
    }
};
