import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileMenuItem from './ProfileMenuItem'; // Menggunakan komponen ProfileMenuItem
import { getProfile, logout } from '../services/authService';
import { getUser, clearStorage } from '../services/storageService';
import { setAuthToken } from '../services/api';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    try {
      const cachedUser = await getUser();
      if (cachedUser) setUser(cachedUser);
      const response = await getProfile();
      if (response.success) setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Handle error, e.g., if token is expired, force logout
      if (error.message.includes('Unauthorized')) {
        handleLogout(true); // Force logout without confirmation
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async (force = false) => {
    if (!force) {
      Alert.alert(
        'Konfirmasi Keluar',
        'Apakah Anda yakin ingin keluar?',
        [
          { text: 'Batal', style: 'cancel' },
          {
            text: 'Keluar',
            style: 'destructive',
            onPress: async () => {
              try {
                await logout();
              } catch (error) {
                console.error('Logout error:', error);
              } finally {
                await clearStorage();
                setAuthToken(null);
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              }
            },
          },
        ]
      );
    } else {
      await clearStorage();
      setAuthToken(null);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Profil */}
      <View style={styles.profileHeader}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#E83C91" />
        ) : (
          <>
            <Image 
              source={require('../../assets/logo.png')} // Menggunakan logo lokal sebagai avatar default
              style={styles.avatar} />
            <Text style={styles.userName}>{user?.name || 'Pengguna'}</Text>
            <Text style={styles.userEmail}>{user?.email || ''}</Text>
          </>
        )}
      </View>

      {/* Menu Section */}
      <View style={styles.menuContainer}>
        <ProfileMenuItem
          icon="package"
          label="Pesanan Saya"
          onPress={() => navigation.navigate('MyOrders')}
        />
        <ProfileMenuItem
          icon="map-pin"
          label="Alamat Pengiriman"
          onPress={() => navigation.navigate('ShippingAddress')}
        />
        <ProfileMenuItem
          icon="credit-card"
          label="Metode Pembayaran"
          onPress={() => navigation.navigate('PaymentHistory')}
        />
        <ProfileMenuItem
          icon="tag"
          label="Voucher Saya"
          onPress={() => navigation.navigate('MyVouchers')}
        />
        <ProfileMenuItem
          icon="help-circle"
          label="Pusat Bantuan"
          onPress={() => navigation.navigate('PusatBantuan')}
        />
        <ProfileMenuItem
          icon="book-open"
          label="Petunjuk Penggunaan"
          onPress={() => navigation.navigate('PetunjukPenggunaan')}
        />
        <ProfileMenuItem
          icon="settings"
          label="Pengaturan"
          onPress={() => navigation.navigate('Settings')}
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={22} color="#E83C91" />
        <Text style={styles.logoutText}>KELUAR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F8F6',
  },
  profileHeader: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#43334C',
  },
  userEmail: {
    fontSize: 16,
    color: '#6c757d',
  },
  menuContainer: {
    marginTop: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 40,
    padding: 15,
    borderRadius: 50,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E83C91',
  },
  logoutText: {
    color: '#E83C91',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
export default ProfileScreen;