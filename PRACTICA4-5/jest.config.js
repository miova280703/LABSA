module.exports = {
    // ...other configurations...
    collectCoverage: true,
    collectCoverageFrom: ['**/*.js', '!**/node_modules/**', '!**/coverage/**'],
    coverageReporters: ['lcov', 'text-summary'],
    coverageDirectory: 'coverage',
  };