/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                custom1: ["custom1", "sans-serif"],
                custom2: ["custom2", "sans-serif"],
            },
        },
        container: {
            screens: {},
        },
    },
    plugins: [],
};
