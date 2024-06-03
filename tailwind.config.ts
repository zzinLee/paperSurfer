/** @type {import("tailwindcss").Config} */

const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_300 = { ...Array.from(Array(301)).map((_, i) => `${i}px`) };

export default {
  content: ["./index.html", "./src/**/*.jsx", "./src/**/*.tsx"],
  theme: {
    fontFamily: {
      pretendard: ["Pretendard-Regular"],
      nanumNeo: ["NanumSquareNeo-Variable"],
      sarala: ["sarala-regular"],
    },
    extend: {
      colors: {
        backgroundCollection: "#D9D9D9",
        backgroundList: "#D0D0F9",
        bgColor: "#F1F2F3",
        sora: "#7273D9",
        customPurple: "#A880D9",
        purpleGray: "#D1C6DE",
        customGreen: "#00C75C",
        customYellow: "#FFCF24",
        customRed: "#FF2424",
        alert: "#D72E7C",
        transWhite: "rgba(255, 255, 255, 0.5)"
      },
      borderWidth: px0_10,
      fontSize: px0_100,
      lineHeight: px0_100,
      minWidth: px0_200,
      minHeight: px0_200,
      spacing: px0_300
    }
  },
  plugins: []
};
