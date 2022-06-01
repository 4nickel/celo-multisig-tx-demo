module.exports = {
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/src/index.ts',
  ],
  coverageReporters: ['json', 'lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  moduleNameMapper: {
    '^@package/(.*)$': '$1',
    '^@src/(.*)$': 'src/$1',
    '^@config/(.*)$': 'config/$1'
  },
  transform: {
    '^.+\\.(ts|js)$': 'babel-jest',
  },
  moduleDirectories: ['node_modules', '.'],
  modulePathIgnorePatterns: ['<rootDir>/bundle', '<rootDir>/node_modules'],
  // setupFiles: ['./config/setup-jest.ts'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/bundle'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(js|ts)$',
  moduleFileExtensions: ['ts', 'js', 'json'],
};
