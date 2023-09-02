module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  /**
   * TODO: Once controllers are covered with unit tests include them
   */
  collectCoverageFrom: [
    "src/api/**/*.{js,ts}",
    "!src/**/*.d.ts",
    "!src/api/**/*.openapi.{js,ts}",
    "!src/api/**/*.controller.{js,ts}",
  ],
  testMatch: ["**/*.test.ts"],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  coverageReporters: ["json", "lcov", "text", "clover"],
};
