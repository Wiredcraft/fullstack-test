module.exports = {
  setupFiles: [
    '<rootDir>/tests/setup.js',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleDirectories: [
    'node_modules',
    'src',
  ],
};
