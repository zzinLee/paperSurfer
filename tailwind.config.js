/** @type {import("tailwindcss").Config} */

const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };

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
      },
      borderWidth: px0_10,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_200,
      minHeight: px0_200,
      spacing: px0_200,
    }
  },
  plugins: []
};
