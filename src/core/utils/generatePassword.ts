export const GeneratePassword = (): string => {
	const minLength = 9;
	const maxLength = 10;
	const charset =
		'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
	let newPassword = '';
	let hasUppercase = false;
	let hasLowercase = false;
	let hasDigit = false;
	let hasSpecialChar = false;

	const length =
		Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

	while (!hasUppercase || !hasLowercase || !hasDigit || !hasSpecialChar) {
		newPassword = '';
		hasUppercase = false;
		hasLowercase = false;
		hasDigit = false;
		hasSpecialChar = false;
		for (let i = 0, n = charset.length; i < length; ++i) {
			const char = charset.charAt(Math.floor(Math.random() * n));
			if (/[A-Z]/.test(char)) hasUppercase = true;
			if (/[a-z]/.test(char)) hasLowercase = true;
			if (/[0-9]/.test(char)) hasDigit = true;
			if (/[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(char))
				hasSpecialChar = true;
			newPassword += char;
		}
	}

	return newPassword;
};
