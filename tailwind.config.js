/** @type {import('tailwindcss').Config} */
export default { 
    content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                title: [`"Georgia", "sans-serif"`], // Pour les titres
                body: [`"Verdana", "sans-serif"`], // Pour le contenu
            },
        },
    },
    plugins: [],
};
