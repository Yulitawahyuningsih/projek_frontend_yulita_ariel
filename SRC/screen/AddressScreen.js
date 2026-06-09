import React from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AddressCard from './AddressCard';

const dummyAddresses = [
  {
    id: '1',
    label: 'Rumah',
    recipientName: 'Yulita',
    phone: '0812-3456-7890',
    fullAddress: 'Jl. Merdeka No. 45, Kel. Cihapit, Kec. Bandung Wetan, Kota Bandung, Jawa Barat, 40114',
    isDefault: true,
  },
  {
    id: '2',
    label: 'Kantor',
    recipientName: 'Yulita',
    phone: '0812-3456-7890',
    fullAddress: 'Gedung Tech Tower Lt. 10, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan, 12190',
    isDefault: false,
  },
];

const AddressScreen = ({ onBack }) => {
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

      {/* Address List */}
      <FlatList
        data={dummyAddresses}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <AddressCard address={item} isDefault={item.isDefault} />}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
      />

      {/* Add New Address Button */}
      <TouchableOpacity style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E83C91',
        margin: 15,
        paddingVertical: 15,
        borderRadius: 8,
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
      }}>
        <Feather name="plus" size={20} color="white" />
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}>Tambah Alamat Baru</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddressScreen;