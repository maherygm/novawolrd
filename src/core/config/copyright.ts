// copyright.ts

// Fonction utilitaire pour obtenir l'année en cours
const getCurrentYear = (): number => {
    return new Date().getFullYear();
};

// Fonction pour générer le texte de copyright
export const getCopyrightText = (): string => {
    // Récupérer le nom du projet depuis les variables d'environnement
    const projectName = process.env.REACT_APP_PROJECT_NAME || "HIU2025";
    const currentYear = getCurrentYear();

    return `copyricht © ${currentYear} ${projectName}. Tous droits réservés.`;
};
