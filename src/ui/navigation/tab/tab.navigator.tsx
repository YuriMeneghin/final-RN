import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParams, Screen } from '../types';
import HomeScreen from '../../screens/home/home.screen';
import { Ionicons } from '@expo/vector-icons';
import FavoritesScreen from '../../screens/favorites/favoritesScreen';

const Tab = createBottomTabNavigator<TabParams>();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          headerShown: true,
          tabBarShowLabel: false,
          headerStyle: {backgroundColor: "#A0A0A0"},
          tabBarStyle: {backgroundColor: "#A0A0A0"},
          tabBarIconStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarIcon: ({ focused }) => {
            const iconName = () => {
              switch (route.name) {
                case Screen.Home:
                  return 'home';
                case Screen.Favorites:
                  return 'heart';
              }
            };
             
            return <Ionicons name={iconName()} size={24} color={focused ? '#4CAF50' : '#121212'} />;
          },
        };
      }}
    >
      <Tab.Screen name={Screen.Home} component={HomeScreen} />
      <Tab.Screen name={Screen.Favorites} component={FavoritesScreen} />
    </Tab.Navigator>
  );
}