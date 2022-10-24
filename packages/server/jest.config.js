module.exports = {
  automock: false,
  preset: 'ts-jest',
  rootDir: 'src',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageDirectory: '../coverage',
  coverageReporters: ['json', 'json-summary', 'lcov', 'text', 'clover'],
  collectCoverageFrom: [
    '**/*.{ts,tsx,js,jsx}',
    '!**/node_modules/**',
    '!./**/**setupTests.ts',
    '!./entry.tsx',
    '!**/coverage/**',
    '!**/mock/**',
    '!**/__mock__/**',
  ],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/tests/__mocks__/svgMock.ts',
    '\\.(png|svg|pdf|jpg|jpeg)$': '<rootDir>/tests/__mocks__/fileMock.js',
    '^.+\\.(css|less)$': 'identity-obj-proxy',
  },
  globals: {
    tsconfig: {
      tsConfig: './tsconfig.json',
    },
  },
  testRegex: '(/__tests__/.*|/tests/.*)\\.test\\.[jt]sx?$',
};
