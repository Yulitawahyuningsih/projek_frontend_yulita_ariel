import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const AddressCard = ({ address, isDefault, onEdit }) => {
  return (
    <View style={[{
      backgroundColor: 'white',
      borderRadius: 8,
      marginHorizontal: 15,
      marginBottom: 15,
      padding: 15,
      borderWidth: 1,
      borderColor: '#eee',
    }, isDefault && {
      borderColor: '#E83C91',
      borderWidth: 1.5,
    }]}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
      }}>
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#43334C',
        }}>{address.label}</Text>
        {isDefault && <Text style={{
          backgroundColor: '#E83C91',
          color: 'white',
          fontSize: 10,
          fontWeight: 'bold',
          paddingVertical: 3,
          paddingHorizontal: 8,
          borderRadius: 10,
          overflow: 'hidden',
        }}>Utama</Text>}
      </View>
      <View style={{ marginBottom: 15 }}>
        <Text style={{
          fontSize: 15,
          color: '#43334C',
          fontWeight: '600',
        }}>{address.recipient_name || address.recipientName}</Text>
        <Text style={{ fontSize: 14, color: 'grey', marginTop: 4 }}>{address.phone}</Text>
        <Text style={{ fontSize: 14, color: 'grey', marginTop: 4 }} numberOfLines={2}>{address.full_address || address.fullAddress}</Text>
      </View>
      <TouchableOpacity style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end'
      }} onPress={onEdit}>
        <Text style={{
          color: '#E83C91',
          fontWeight: 'bold',
          fontSize: 14,
        }}>Ubah</Text>
        <Feather name="chevron-right" size={20} color="#E83C91" style={{ marginLeft: 4 }} />
      </TouchableOpacity>
    </View>
  );
};

export default AddressCard;