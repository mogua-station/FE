import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
  },
  plugins: [],
};
export default config;
