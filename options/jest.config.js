module.exports = {
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/tests/**/*.test.[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>src/setupTests.ts'],
  moduleNameMapper: {
    '^#/(.+)': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
};
