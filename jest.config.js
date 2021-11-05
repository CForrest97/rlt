module.exports = {
  preset: "ts-jest",
  coverageThreshold: {
    global: {
      statements: 95,
      branches: 95,
      functions: 95,
      lines: 95,
    },
  },
  setupFilesAfterEnv: ["./tests/setupTests.ts"],
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.jest.json",
    },
    statements: 0,
    branches: 0,
    functions: 0,
    lines: 0,
  },
};
