module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary:  '#BE1E2D', // Istanbul Red - Primary brand color
        istanbulRed: '#B71C1C', // True Istanbul Red brand color
        charcoal: '#2A2A2A', // Main text, headers, footers
        offwhite: '#F7F7F5', // Page backgrounds, cards
        saffron:  '#FFB703', // Accents, badges, highlights
        herb:     '#3D8B63', // Secondary buttons, links, success states
        lightgray:'#E0E0E0', // Borders, dividers, muted text
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
