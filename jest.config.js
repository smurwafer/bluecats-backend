module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./test/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  globals: {
    
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testRunner: "jest-jasmine2",
  testTimeout: 10000,
};