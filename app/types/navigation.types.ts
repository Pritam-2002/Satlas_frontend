import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Welcome: undefined;
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  MainTabs: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Books: undefined;
  AddAction: undefined;
  Search: undefined;
  Menu: undefined;
  Registration: undefined;
};

export type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;
export type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
export type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;

export type HomeTabNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Home'>;
export type BooksTabNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Books'>;
export type SearchTabNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Search'>;
export type MenuTabNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Menu'>;
export type RegistrationTabNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Registration'>; 