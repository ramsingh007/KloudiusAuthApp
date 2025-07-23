import 'react-native-gesture-handler/jestSetup';

// Mock async storage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock vector icons
jest.mock('react-native-vector-icons/FontAwesome', () => 'Icon');
