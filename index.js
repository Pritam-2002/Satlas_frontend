import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';

// Add any polyfills or platform-specific setup here
if (Platform.OS === 'web') {
  // Web-specific setup if needed
}

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
