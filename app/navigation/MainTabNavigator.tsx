import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation.types';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

// Screens
import HomeScreen from '../screens/HomeScreen';
import BooksScreen from '../screens/BooksScreen';
import SearchScreen from '../screens/SearchScreen';
import MenuScreen from '../screens/MenuScreen';
import AddActionScreen from '../screens/AddActionScreen';
import TabBar from '../components/TabBar';
import HomeStackNavigator from './HomestackNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
      />
      <Tab.Screen
        name="Books"
        component={BooksScreen}
      />
      <Tab.Screen
        name="AddAction"
        component={AddActionScreen}
        options={{ tabBarLabel: '' }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
      />
      <Tab.Screen
        name="Menu"
        component={MenuScreen}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator; 