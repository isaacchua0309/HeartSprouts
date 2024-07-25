module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
    ],
    transform: {
        '^.+\\.[jt]sx?$': 'babel-jest',
      },
      setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
      transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo|@expo|@unimodules)',
      ],
      moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
      },
  };
  