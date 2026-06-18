import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const OrderDetailProductCard = ({ item }) => {
  const imageSource = item.image
    ? { uri: item.image }
    : require('../../assets/MiniDress.png'); // fallback jika gambar null

  return (
    <View style={styles.cardContainer}>
      <Image
        source={imageSource}
        style={styles.image}
        onError={() => console.log('Gagal memuat gambar:', item.image)}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.variant}>Varian: {item.variant}</Text>
        <Text style={styles.quantity}>x{item.quantity}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.subtotal}>{item.subtotal}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  image: { width: 70, height: 90, borderRadius: 8, marginRight: 15, backgroundColor: '#F5F5F5' },
  infoContainer: { flex: 1, marginRight: 10 },
  name: { fontSize: 14, color: '#43334C', fontWeight: '600', marginBottom: 4 },
  variant: { fontSize: 12, color: 'grey', marginBottom: 4 },
  quantity: { fontSize: 12, color: 'grey' },
  priceContainer: { alignItems: 'flex-end' },
  price: { fontSize: 14, color: '#43334C', marginBottom: 4 },
  subtotal: { fontSize: 14, color: '#43334C', fontWeight: 'bold' },
});

export default OrderDetailProductCard;