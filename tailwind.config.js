module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-left": {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-right": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scale: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "slide-down": "slide-down 0.6s ease-out forwards",
        "slide-left": "slide-left 0.6s ease-out forwards",
        "slide-right": "slide-right 0.6s ease-out forwards",
        scale: "scale 0.6s ease-out forwards",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
      },
      colors: {
        primary: "#BE1E2D", // Istanbul Red - Primary brand color
        istanbulRed: "#B71C1C", // True Istanbul Red brand color
        charcoal: "#2A2A2A", // Main text, headers, footers
        offwhite: "#F7F7F5", // Page backgrounds, cards
        saffron: "#FFB703", // Accents, badges, highlights
        herb: "#3D8B63", // Secondary buttons, links, success states
        lightgray: "#E0E0E0", // Borders, dividers, muted text
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      typography: (theme) => ({
        primary: {
          css: {
            "--tw-prose-body": theme("colors.charcoal"),
            "--tw-prose-headings": theme("colors.primary"),
            "--tw-prose-lead": theme("colors.herb"),
            "--tw-prose-links": theme("colors.primary"),
            "--tw-prose-bold": theme("colors.primary"),
            "--tw-prose-counters": theme("colors.saffron"),
            "--tw-prose-bullets": theme("colors.saffron"),
            "--tw-prose-hr": theme("colors.lightgray"),
            "--tw-prose-quotes": theme("colors.herb"),
            "--tw-prose-quote-borders": theme("colors.saffron"),
            "--tw-prose-captions": theme("colors.charcoal"),
            "--tw-prose-code": theme("colors.istanbulRed"),
            "--tw-prose-pre-bg": theme("colors.offwhite"),
            "--tw-prose-pre-border": theme("colors.saffron"),
            "--tw-prose-th-borders": theme("colors.primary"),
            "--tw-prose-td-borders": theme("colors.lightgray"),
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
