/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#069483",
        border: "#2a2f4a",
        panel: "#101526",
        text: "#e7eaf6",
        muted: "#9aa3b2",
      },
      borderRadius: { brand: "16px" },
      boxShadow: { panel: "0 8px 24px rgba(0,0,0,.25)" },
    },
  },
  plugins: [],
};
