module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}'],
  modulePaths: ['<rootDir>'],
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  transform: {},
};
