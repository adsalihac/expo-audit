import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Geist", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        base: "#09090B",
        surface: "#111113",
        borderSoft: "rgba(255,255,255,0.08)",
        panel: "rgba(255,255,255,0.03)",
        success: "#71f29f",
        danger: "#ff6e7f",
      },
      boxShadow: {
        glow: "0 0 30px rgba(91,114,255,0.25)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(circle at 10% 20%, rgba(91,114,255,0.35), transparent 40%), radial-gradient(circle at 85% 25%, rgba(80,165,255,0.25), transparent 35%), linear-gradient(135deg, #09090B 0%, #0f1020 55%, #09090B 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
