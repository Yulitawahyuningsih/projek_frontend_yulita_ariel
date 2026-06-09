import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const OrderConfirmationScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Feather name="check-circle" size={80} color="#2E7D32" />
      </View>
      <Text style={styles.title}>Pesanan Berhasil!</Text>
      <Text style={styles.subtitle}>
        Pesanan Anda telah kami terima dan akan segera diproses. Terima kasih telah berbelanja!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Kembali ke Beranda</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MyOrders')}>
        <Text style={styles.linkText}>Lihat Detail Pesanan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F8F6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  iconContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#43334C',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#E83C91',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 50,
    marginBottom: 20,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  linkText: { color: '#E83C91', fontSize: 16, fontWeight: 'bold' },
});

export default OrderConfirmationScreen;