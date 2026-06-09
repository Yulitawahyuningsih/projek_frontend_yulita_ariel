import React, { useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AddressCard from './AddressCard';
import { getAddresses } from '../services/addressService';

const ShippingAddressScreen = ({ navigation, onConfirm: propOnConfirm, onSaveAddress: propOnSaveAddress }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mengambil data dari API setiap kali layar mendapatkan fokus
  useFocusEffect(
    useCallback(() => {
      fetchAddresses();
    }, [])
  );

  const fetchAddresses = async () => {
    setIsLoading(true);
    try {
      const response = await getAddresses();
      // Asumsi API mengembalikan { success: true, data: [...] }
      const addressData = response.data || response; 
      setAddresses(addressData);

      // Set default selected address
      if (addressData.length > 0 && !selectedAddressId) {
        const defaultAddr = addressData.find(addr => addr.is_default || addr.isDefault);
        setSelectedAddressId(defaultAddr ? defaultAddr.id : addressData[0].id);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      Alert.alert('Error', 'Gagal mengambil daftar alamat');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F9F8F6' }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 50,
        paddingBottom: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5, marginRight: 10 }}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#43334C' }}>Alamat Pengiriman</Text>
      </View>

      {isLoading && <ActivityIndicator size="large" color="#E83C91" style={{ marginTop: 20 }} />}

      <FlatList
        data={addresses}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={ // Komponen yang ditampilkan di bagian atas daftar
          <TouchableOpacity style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1.5,
            borderColor: '#E83C91',
            borderStyle: 'dashed',
            borderRadius: 8,
            padding: 15,
            marginHorizontal: 15,
            marginBottom: 20,
            marginTop: 20, // Add some top margin for spacing
          }} onPress={() => navigation.navigate('AddEditAddress', { onSaveAddress: propOnSaveAddress })}>
            <Feather name="plus" size={22} color="#E83C91" />
            <Text style={{ color: '#E83C91', fontSize: 16, fontWeight: 'bold', marginLeft: 15 }}>Tambah Alamat Baru</Text>
          </TouchableOpacity>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedAddressId(item.id)}>
            <AddressCard address={item} isDefault={item.id === selectedAddressId} onEdit={() => navigation.navigate('AddEditAddress', { address: item, onSaveAddress: propOnSaveAddress })} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }} // Adjust padding to make space for sticky button
      />

      {/* Confirm Button */}
      <TouchableOpacity style={{
        backgroundColor: '#E83C91',
        margin: 15,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
      }} onPress={() => { // Handle confirmation
        if (selectedAddressId) {
          propOnConfirm(selectedAddressId); // Panggil prop onConfirm dari App.js
        } else {
          Alert.alert('Peringatan', 'Pilih alamat pengiriman terlebih dahulu.');
        }
      }}>
        <Text style={{
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
        }}>GUNAKAN ALAMAT INI</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShippingAddressScreen;