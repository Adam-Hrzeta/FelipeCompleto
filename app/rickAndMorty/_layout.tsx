import { Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Entypo, FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          display: 'none', // Oculta la barra de pestañas en todas las pantallas
        },
      }}>
      <Tabs.Screen
        name="indexAPI"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
        }}
      />    
      <Tabs.Screen
        name="locations"
        options={{
          title: 'Ubicaciones',
          tabBarIcon: ({ color }) => <Entypo name="location" size={24} color={color} />,
        }}
      />     
      <Tabs.Screen
        name="characters"
        options={{
          title: 'Personajes',
          tabBarIcon: ({ color }) => <FontAwesome name="users" size={24} color={color} />,
        }}
      />    
      <Tabs.Screen
        name="episodes"
        options={{
          title: 'Episodios',
          tabBarIcon: ({ color }) => <MaterialIcons name="tv" size={24} color={color} />,
        }}
      />     
    </Tabs>
  );
}