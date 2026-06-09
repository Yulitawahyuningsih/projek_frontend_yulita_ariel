import React from 'react';
import { Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const MyVoucherCard = ({ voucher }) => {
  // Logika sederhana untuk menentukan apakah voucher sudah kedaluwarsa
  const isExpired = new Date(voucher.expiryDate) < new Date();
  const statusText = isExpired ? 'Kedaluwarsa' : 'Bisa Digunakan';
  const statusColor = isExpired ? '#D9534F' : '#2E7D32'; // Merah untuk kedaluwarsa, Hijau untuk aktif

  return (
    <View style={[{
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 15,
        marginBottom: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
    }, isExpired && { opacity: 0.6 }]}>
      <View style={{ marginRight: 15 }}>
        <FontAwesome5 name="ticket-alt" size={30} color="#E83C91" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: '#43334C',
        }}>{voucher.title}</Text>
        <Text style={{
            fontSize: 14,
            color: 'grey',
            marginVertical: 4,
            fontWeight: '600',
        }}>Kode: {voucher.code}</Text>
        <Text style={{
            fontSize: 12,
            color: 'grey',
        }}>Berlaku hingga: {voucher.expiry}</Text>
      </View>
      <View style={{
        position: 'absolute',
        top: 15,
        right: 15,
      }}>
        <Text style={[{
            fontSize: 12,
            fontWeight: 'bold',
        }, { color: statusColor }]}>{statusText}</Text>
      </View>
    </View>
  );
};

export default MyVoucherCard;