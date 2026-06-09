import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const getStatusStyle = (status) => {
  switch (status) {
    case 'Dikirim':
      return { backgroundColor: '#A0E7E5', color: '#00A9A5' };
    case 'Selesai':
      return { backgroundColor: '#B4F8C8', color: '#2E7D32' };
    case 'Dibatalkan':
      return { backgroundColor: '#FFC4C4', color: '#D9534F' };
    default: // Diproses
      return { backgroundColor: '#FFE6A7', color: '#FFA000' };
  }
};

const OrderCard = ({ order, onPress }) => {
  const statusStyle = getStatusStyle(order.status);

  return (
    <View style={{
      backgroundColor: 'white',
      borderRadius: 8,
      marginHorizontal: 15,
      marginBottom: 15,
      padding: 15,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
    }}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 10,
      }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#43334C' }}>Pesanan #{order.id}</Text>
        <View style={[{ paddingVertical: 4, paddingHorizontal: 10, borderRadius: 15 }, { backgroundColor: statusStyle.backgroundColor }]}>
          <Text style={[{ fontSize: 12, fontWeight: 'bold' }, { color: statusStyle.color }]}>{order.status}</Text>
        </View>
      </View>
      <View style={{ paddingVertical: 15 }}>
        <Text style={{ fontSize: 14, color: 'grey', marginBottom: 5 }}>Tanggal: {order.date}</Text>
        <Text style={{ fontSize: 14, color: 'grey', marginBottom: 5 }}>Jumlah Barang: {order.itemCount}</Text>
        <Text style={{ fontSize: 16, color: '#43334C', fontWeight: 'bold', marginTop: 5 }}>Total: {order.total}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity style={{
          borderWidth: 1,
          borderColor: '#E83C91',
          borderRadius: 20,
          paddingVertical: 8,
          paddingHorizontal: 15,
        }} onPress={onPress}>
          <Text style={{ color: '#E83C91', fontWeight: 'bold', fontSize: 12 }}>Lihat Detail Pesanan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OrderCard;