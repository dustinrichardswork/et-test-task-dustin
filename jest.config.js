/** @type {import('jest').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  testPathIgnorePatterns: ["/dist/"],
  setupFiles: ["./jest.setup.ts"],
  maxWorkers: 2,
  testTimeout: 5000,
};
