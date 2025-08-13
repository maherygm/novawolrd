export const getInitialDarkModePreference = (): boolean => {
	const darkModePreference =
		localStorage.getItem('abm-mytick-theme') === 'dark';

	if (darkModePreference) {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}

	return darkModePreference;
};
