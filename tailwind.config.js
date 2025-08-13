// @type {import('tailwindcss').Config}
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';
import { heroui  } from '@heroui/react';

export default {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './public/index.html',
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                light: {
                    'custom-background': '#f0f5f7',
                    'custom-primary': '#265A99',
                    'custom-secondary': '#484848',
                    'custom-glass': '#0000001',
                    Blue: {
                        50: '#f0f9ff',
                        100: '#e0f2fe',
                        200: '#bae6fd',
                        300: '#7dd3fc',
                        400: '#38bdf8',
                        500: '#0ea5e9',
                        600: '#0284c7',
                        700: '#0369a1',
                        800: '#075985',
                        900: '#0c4a6e',
                        950: '#172554',
                    },
                },
                dark: {
                    'custom-background': '#1A202C',
                    'custom-primary': '#2C5282',
                    'custom-secondary': '#A0AEC0',
                    'custom-glass': '#ffffff20',
                    Blue: {
                        50: '#ebf8ff',
                        100: '#bee3f8',
                        200: '#90cdf4',
                        300: '#63b3ed',
                        400: '#4299e1',
                        500: '#3182ce',
                        600: '#2b6cb0',
                        700: '#2c5282',
                        800: '#2a4365',
                        900: '#1A365D',
                        950: '#122848',
                    },
                },
            },
            fontFamily: {
                syne: ['Syne', 'sans-serif'],
                Poppins: ['Poppins', 'sans-serif'],
                sans: ['Inter', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            },
            fontSize: {
                '12xl': '100px',
            },
        },
    },
    plugins: [forms, typography, aspectRatio, heroui()],
    darkMode: 'class',
};
