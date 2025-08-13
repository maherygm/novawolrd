// utils/authUtils.ts

/**
 * Enregistre le token, l'email et le mot de passe (hashé) dans le localStorage
 * si l'option "Remember Me" est activée.
 *
 * @param {string} token - Le token d'authentification.
 * @param {string} session - Session de l'utilisateur.
 * @param {string} password - Le mot de passe non hashé (pour l'exemple).
 * @param {boolean} rememberMe - Si "Remember Me" est activé ou non.
 */
export const saveAuthData = (
	token: string,
	session: string,
	password: string,
	rememberMe: boolean,
) => {
	localStorage.setItem('token', token);
	localStorage.setItem('welcomeMessageClosed', 'false');

	if (rememberMe) {
		localStorage.setItem('userSession', session);
		localStorage.setItem('userPassword', btoa(password));
	} else {
		localStorage.removeItem('userSession');
		localStorage.removeItem('userPassword');
	}
};

/**
 * Récupère les informations d'authentification depuis le localStorage.
 *
 * @returns {{ email: string | null, password: string | null }} L'email et le mot de passe décrypté.
 */
export const getAuthData = (): {
	session: string | null;
	password: string | null;
} => {
	const session = localStorage.getItem('userSession');
	const password = localStorage.getItem('userPassword')
		? atob(localStorage.getItem('userPassword')!)
		: null;
	return { session, password };
};

/**
 * Supprime les informations d'authentification du localStorage.
 */
export const clearAuthData = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('welcomeMessageClosed');
};
