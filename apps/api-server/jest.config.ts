module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  /**
   * TODO: Once controllers and repositories are covered with unit tests include them
   */
  collectCoverageFrom: [
    "src/api/**/*.{js,ts}",
    "!src/**/*.d.ts",
    "!src/api/**/*.openapi.{js,ts}",
    "!src/api/**/*.controller.{js,ts}",
    "!src/api/**/*.repository.{js,ts}",
  ],
  testMatch: ["**/*.test.ts"],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  coverageReporters: ["json", "lcov", "text", "clover"],
};
