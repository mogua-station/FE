import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});
const config = async () => {
  const nextConfig = await createJestConfig({})();
  return {
    ...nextConfig,
    testEnvironment: "jsdom",
    //   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    rootDir: "./",
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
      "^.+\\.svg$": "<rootDir>/src/utils/__svgTransformer__.ts",
    },
    // transform: {
    //   "^.+\\.svg$": "jest-transformer-svg",
    // },
  };
};

export default config;
