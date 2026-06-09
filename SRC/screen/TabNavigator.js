import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Menggunakan Ionicons untuk ikon

// Impor semua layar yang akan digunakan di tab navigasi
import HomeScreen from '../screen/HomeScreen';
import PromoScreen from '../screen/PromoScreen';
import WishlistScreen from '../screen/WishlistScreen';
import ProfileScreen from '../screen/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Menentukan ikon berdasarkan nama rute dan status 'focused'
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Promo') {
            iconName = focused ? 'pricetag' : 'pricetag-outline';
          } else if (route.name === 'Wishlist') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        // Mengatur warna ikon
        tabBarActiveTintColor: '#E83C91', // Warna untuk tab aktif ($ACCENT_CTA)
        tabBarInactiveTintColor: '#43334C', // Warna untuk tab non-aktif ($TEXT_PRIMARY)
        // Menyembunyikan label teks di bawah ikon
        tabBarShowLabel: false,
        // Menyesuaikan gaya header
        headerTitleAlign: 'center',
        headerStyle: {
          elevation: 1,
          shadowOpacity: 0.1,
        },
      })}
    >
      {/* 1. Tab Home */}
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Beranda' }} />

      {/* 2. Tab Promo */}
      <Tab.Screen name="Promo" component={PromoScreen} options={{ title: 'Promo & Voucher' }} />

      {/* 3. Tab Wishlist */}
      <Tab.Screen name="Wishlist" component={WishlistScreen} options={{ title: 'Favorit Saya' }} />

      {/* 4. Tab Profile */}
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil Saya' }} />

    </Tab.Navigator>
  );
};

export default TabNavigator;