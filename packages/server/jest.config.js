module.exports = {
  roots: [
    'src/',
  ],
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/migration',
    'src/entity',
  ],
  setupFiles: [
    './jest-setup-file.ts',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.{js,js,ts,ts}',
    '!<rootDir>/node_modules/',
  ],
  coverageDirectory: 'reports/coverage',
  moduleNameMapper: {
    '@Validators': '<rootDir>/src/validators',
    '@Util/(.*)': '<rootDir>/src/util/$1',
  },
};
