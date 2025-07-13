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
      typography: (theme) => ({
        primary: {
          css: {
            '--tw-prose-body': theme('colors.charcoal'),
            '--tw-prose-headings': theme('colors.primary'),
            '--tw-prose-lead': theme('colors.herb'),
            '--tw-prose-links': theme('colors.primary'),
            '--tw-prose-bold': theme('colors.primary'),
            '--tw-prose-counters': theme('colors.saffron'),
            '--tw-prose-bullets': theme('colors.saffron'),
            '--tw-prose-hr': theme('colors.lightgray'),
            '--tw-prose-quotes': theme('colors.herb'),
            '--tw-prose-quote-borders': theme('colors.saffron'),
            '--tw-prose-captions': theme('colors.charcoal'),
            '--tw-prose-code': theme('colors.istanbulRed'),
            '--tw-prose-pre-bg': theme('colors.offwhite'),
            '--tw-prose-pre-border': theme('colors.saffron'),
            '--tw-prose-th-borders': theme('colors.primary'),
            '--tw-prose-td-borders': theme('colors.lightgray'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
