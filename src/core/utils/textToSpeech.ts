/**
 * @desc Utilité pour la synthèse vocale (Text to Speech) en français
 * @param text - Le texte à prononcer
 * @param endingFunc - Fonction exécutée à la fin de la synthèse vocale
 * @param startingFunc - Fonction exécutée au début de la synthèse vocale
 */
export const speech = (
	text: string,
	endingFunc?: () => void,
	startingFunc?: () => void,
): void => {
	// Créer un nouvel objet de synthèse vocale
	const msg = new SpeechSynthesisUtterance();

	// Définir le texte à prononcer
	msg.text = text;

	// Définir la langue en français
	msg.lang = 'fr-FR';

	// Définir le ton de la voix (1 est normal, 0.5 est plus grave, 2 est plus aigu)
	msg.pitch = 1;

	// Définir la vitesse de la voix (1 est normal, < 1 est plus lent, > 1 est plus rapide)
	msg.rate = 1;

	// Définir le volume (entre 0 et 1)
	msg.volume = 1; // Volume à 100%

	// Ajouter des événements pour déclencher les fonctions callback si elles existent
	msg.addEventListener('end', () => {
		if (endingFunc) {
			endingFunc(); // Appeler la fonction de fin si elle est définie
		}
	});

	msg.addEventListener('start', () => {
		if (startingFunc) {
			startingFunc(); // Appeler la fonction de début si elle est définie
		}
	});

	// Lancer la synthèse vocale
	window.speechSynthesis.speak(msg);
};
