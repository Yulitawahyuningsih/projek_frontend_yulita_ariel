import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AddressCard from './AddressCard';
 
const ShippingAlamatScreen = ({ onBack, onAddNew, onConfirm, addresses, onEdit }) => {
  const [selectedAddressId, setSelectedAddressId] = useState(addresses.find(a => a.isDefault)?.id || null);

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
        <TouchableOpacity onPress={onBack} style={{ padding: 5, marginRight: 10 }}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#43334C' }}>Alamat Pengiriman</Text>
      </View>
      <FlatList
        data={addresses}
        keyExtractor={item => item.id}
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
          }} onPress={onAddNew}>
            <Feather name="plus" size={22} color="#E83C91" />
            <Text style={{ color: '#E83C91', fontSize: 16, fontWeight: 'bold', marginLeft: 15 }}>Tambah Alamat Baru</Text>
          </TouchableOpacity>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedAddressId(item.id)}>
            <AddressCard address={item} isDefault={item.id === selectedAddressId} onEdit={() => onEdit(item)} /> 
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
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
      }} onPress={() => onConfirm(selectedAddressId)}>
        <Text style={{
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
        }}>GUNAKAN ALAMAT INI</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShippingAlamatScreen;