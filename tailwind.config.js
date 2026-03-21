/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.{js,jsx,ts,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brand: {
                    50:  '#fff5e6',
                    100: '#ffe6cc',
                    200: '#ffd699',
                    300: '#ffc266',
                    400: '#ffad33',
                    500: '#FF7A18',
                    600: '#e67a1a',
                    700: '#cc6a15',
                    800: '#b35910',
                    900: '#8c450c',
                    950: '#6a340a',
                },
                accent: {
                    50:  '#e0f7f7',
                    100: '#c0eff0',
                    200: '#81dfe1',
                    300: '#2EC4C7',
                    400: '#00c4c7',
                    500: '#00ADB5',
                    600: '#009b9f',
                    700: '#008588',
                    800: '#006d71',
                    900: '#00545b',
                },
                dark: {
                    bg: '#021B1C',
                    card: '#0a2e2f',
                    border: '#1a4445',
                },
                text: {
                    primary: '#FFFFFF',
                    secondary: '#D9D9D9',
                    muted: '#999999',
                },
            },
            backgroundColor: {
                'dark': '#021B1C',
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui'],
                mono: ['Fira Code', 'ui-monospace'],
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.25rem',
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(0,0,0,0.07), 0 10px 20px -2px rgba(0,0,0,0.04)',
                'glow': '0 0 20px rgba(255, 122, 24, 0.3)',
                'glow-accent': '0 0 20px rgba(0, 173, 181, 0.3)',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
};
