import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.ts",
  ],
  theme: {
    fontSize: {
      "title-1": ["24px", "32px"],
      "title-2": ["22px", "28px"],
      "heading-1": ["20px", "26px"],
      "heading-2": ["18px", "24px"],
      "body-1-normal": ["16px", "20px"],
      "body-1-reading": ["16px", "26px"],
      "body-2-normal": ["14px", "20px"],
      "body-2-reading": ["14px", "24px"],
      "label-normal": ["13px", "18px"],
      "label-reading": ["13px", "20px"],
      "caption-normal": ["12px", "18px"],
      "caption-reading": ["12px", "20px"],
    },
    fontWeight: {
      bold: "700",
      semibold: "600",
      medium: "500",
      regular: "400",
      light: "300",
    },
    extend: {
      colors: {
        orange: {
          300: "#FF8820",
          200: "#FF9A42",
          100: "#FFF1E5",
        },
        yellow: {
          300: "#DEF731",
          200: "#E9F78A",
          100: "#F4F7DE",
        },
        olive: {
          300: "#66FA19",
          200: "#B8FA96",
          100: "#E9FAE1",
        },
        green: {
          300: "#0FFAC2",
          200: "#8CFAE0",
          100: "#E1FAF4",
        },
        blue: {
          300: "#4165FA",
          200: "#8CA1FA",
          100: "#E7EBFD",
        },
        red: {
          300: "#FA504B",
          200: "#FA9996",
          100: "#FAE2E1",
        },
        purple: {
          300: "#864BFA",
          200: "#BEA0FA",
          100: "#E9E1FA",
        },
        gray: {
          "950-48": "rgba(26, 27, 30, 0.48)",
          "950-32": "rgba(26, 27, 30, 0.32)",
          "900-24": "rgba(31, 32, 36, 0.24)",
          "800-24": "rgba(40, 41, 46, 0.24)",
          950: "#1A1B1E",
          900: "#1F2024",
          800: "#28292E",
          700: "#313238",
          600: "#3A3B42",
          500: "#5A5B66",
          400: "#787B8A",
          300: "#9CA0AD",
          200: "#B7BBC2",
          100: "#E9E9EB",
          50: "#F7F8F8",
        },
        white: "#FFFFFF",
        black: "#000000",
        danger: "#F56973",
        primary: "#13C299",
        normal: "#0D0E0F",
        alternative: {
          1: "#1F2024",
          2: "#28292E",
        },
      },
    },
  },
  plugins: [],
};
export default config;
