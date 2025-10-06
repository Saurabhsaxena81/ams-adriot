/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "bg-green-600/90",
    "bg-red-600/90", // <-- Add this one
    "bg-yellow-600/90",
    "bg-blue-600/90",
    "bg-purple-600/90",
    // ... any other dynamic classes
  ],
  theme: {
    extend: {
      colors: {
        red: "#ab0f1b",
        blue: "#3f51b5",
        "blue-200": "#3f51b5",
        "t3-blue": "#538bbb",
        "t3-grey": "#707185",
      },
      keyframes: {
        // Defines the movement path for the background waves
        wave: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-50px, -50px)" },
        },
      },
      animation: {
        // Apply the animation with different speeds
        "wave-slow": "wave 20s ease-in-out infinite alternate",
        "wave-fast": "wave 15s ease-in-out infinite alternate",
      },
      backgroundImage: {
        "t3-bgImage": "url('/resume-3-bg.webp')",
      },
    },
  },
  plugins: [],
};
