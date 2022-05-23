module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  clearMocks: true,
  testPathIgnorePatterns: ['/.history/'],
  modulePathIgnorePatterns: ['<rootDir>/package.json'],
  resetMocks: false,
  setupFiles: ['<rootDir>/jest.setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
