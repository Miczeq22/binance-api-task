module.exports = {
  extensionsToTreatAsEsm: ['.ts'],
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: './tsconfig.json',
        diagnostics: true,
        useESM: true,
      },
    ],
  },
  moduleNameMapper: {
    '@errors/(.*)': '<rootDir>/src/building-blocks/errors/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@root/(.*)': '<rootDir>/src/$1',
    '@modules/(.*)': '<rootDir>/src/modules/$1',
    '@building-blocks/(.*)': '<rootDir>/src/building-blocks/$1',
  },
};
