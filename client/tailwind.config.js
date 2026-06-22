/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "itouch-bg": "#0a0a0f",
        "itouch-surface": "#13131a",
        "itouch-surface-2": "#1c1c26",
        "itouch-orange": "#ff6a1a",
        "itouch-blue": "#00c2ff",
        "itouch-green": "#39ff8a",
        "itouch-white": "#f5f5fa",
      },
      fontFamily: {
        display: ["Poppins", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px rgba(255,106,26,0.45)",
        "glow-blue": "0 0 25px rgba(0,194,255,0.45)",
        "glow-green": "0 0 25px rgba(57,255,138,0.45)",
      },
      backgroundImage: {
        "itouch-gradient":
          "linear-gradient(135deg, rgba(255,106,26,0.15) 0%, rgba(0,194,255,0.1) 50%, rgba(57,255,138,0.1) 100%)",
      },
    },
  },
  plugins: [],
};
