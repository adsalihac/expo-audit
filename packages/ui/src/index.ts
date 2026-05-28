export const designTokens = {
  colors: {
    background: "#09090B",
    surface: "#111113",
    panel: "rgba(255,255,255,0.03)",
    borderSoft: "rgba(255,255,255,0.08)",
    accentIndigo: "#5b72ff",
    accentBlue: "#4fa7ff",
    success: "#71f29f",
    danger: "#ff6e7f",
  },
  radius: {
    card: "24px",
    button: "14px",
  },
  typography: {
    heading: "Geist",
    body: "Inter",
    mono: "JetBrains Mono",
  },
};

export function cardClassName(): string {
  return "rounded-[24px] border border-white/10 bg-white/[0.03] backdrop-blur-xl";
}
