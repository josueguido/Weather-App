const {
    default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                'light-sky-blue': '#87CEEB',
                'Steel Blue': '#4682B4',
                'Light-Sky-Blue-2': ' #B0E2FF',
                'gold': '#FFD700',
                'light-gray': '#D3D3D3',
                'dark-gray': '#A9A9A9',
                'steel-blue': '#4682B4',
                'dark-blue': '#1E3A8A',
                'powder-blue': '#B0E0E6',
                'slate-gray': '#708090',
                'slate-blue': '#6A5ACD',
                'midnight-blue': '#191970',
                'dark-slate-gray': '#2F4F4F',
            },
            animation: {
                grid: "grid 15s linear infinite",
                "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
            },
            keyframes: {
                grid: {
                    "0%": { transform: "translateY(-50%)" },
                    "100%": { transform: "translateY(0)" },
                },
                "border-beam": {
                    "100%": {
                      "offset-distance": "100%",
                    },
                }
            },

        },
    },
    plugins: [addVariablesForColors],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
    let allColors = flattenColorPalette(theme("colors"));
    let newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
    );

    addBase({
        ":root": newVars,
    });
}
