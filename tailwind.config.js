/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{html,js,ts,jsx,tsx}"];
export const theme = {
    extend: {
        fontFamily: {
            title: ['"Georgia", "sans-serif"'], // Pour les titres
            body: ['"Verdana", "sans-serif"'], // Pour le contenu
        },
    },
};
export const plugins = [];
