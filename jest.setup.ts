import { jest } from "@jest/globals";

// here we put global mocks
// jest.mock('ioredis', () => jest.requireActual('ioredis-mock'));
// jest.mock('algoliasearch');

if (process.env.DEBUG === "jest") {
  jest.setTimeout(60 * 60 * 1000);
}
