/** @type {import("tailwindcss").Config} */

export default {
  content: ["./index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        backgroundCollection: "#D9D9D9",
        backgroundList: "#D0D0F9",
        sora: "#7273D9",
        gray: "A7A7A7",
        purple: "#A880D9",
        purpleGray: "#D1C6DE",
        green: "#00C75C",
        yellow: "#FFCF24",
        red: "FF2424"
      }
    }
  },
  plugins: []
};
