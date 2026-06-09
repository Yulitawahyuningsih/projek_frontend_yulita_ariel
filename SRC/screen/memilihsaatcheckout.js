import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import PaymentOptionRow from './PaymentOptionRow';

const paymentMethods = {
  'Kartu Kredit/Debit': [
    { id: 'visa', label: 'Visa', icon: null },
    { id: 'mastercard', label: 'Mastercard', icon: null },
  ],
  'Virtual Account (VA)': [
    { id: 'bca', label: 'BCA Virtual Account', icon: null },
    { id: 'mandiri', label: 'Mandiri Virtual Account', icon: null },
  ],
  'E-Wallet & QRIS': [
    { id: 'gopay', label: 'GoPay', icon: null },
    { id: 'dana', label: 'DANA', icon: null },
  ],
  'Bayar di Tempat': [
    { id: 'cod', label: 'Cash on Delivery (COD)', icon: null },
  ],
};

const MemilihSaatCheckoutScreen = ({ onBack, onPayNow, cartItems = [] }) => {
  const [selectedMethod, setSelectedMethod] = useState('bca');

  // Fungsi untuk menghitung total belanja secara dinamis
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      // Pastikan harga dibersihkan dari karakter non-angka dan dikonversi ke Integer
      const price = parseInt(String(item.price || '0').replace(/[^0-9]/g, ''), 10);
      const qty = parseInt(item.quantity || '0', 10);
      return total + (price * qty);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shippingFee = cartItems.length > 0 ? 15000 : 0; // Biaya pengiriman flat Rp 15.000 jika ada barang
  const totalPayment = subtotal + shippingFee;

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
        <Text style={{ fontSize: 20, fontFamily: 'Arial Black', color: '#43334C' }}>Pilih Metode Pembayaran</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 15, paddingBottom: 250 }}>
        {Object.keys(paymentMethods).map(category => (
          <View key={category} style={{ marginBottom: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'grey', marginBottom: 10, marginLeft: 5 }}>{category}</Text>
            {paymentMethods[category].map(method => (
              <PaymentOptionRow
                key={method.id}
                label={method.label}
                icon={method.icon}
                isSelected={selectedMethod === method.id}
                onPress={() => setSelectedMethod(method.id)}
              />
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Bottom Section */}
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 30,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
      }}>
        {/* Mini Order Summary */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#43334C', marginBottom: 15 }}>Rincian Pesanan</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: 'grey' }}>Subtotal Belanja</Text>
            <Text style={{ fontSize: 14, color: '#43334C', fontWeight: '600' }}>Rp {subtotal.toLocaleString('id-ID')}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: 'grey' }}>Biaya Pengiriman</Text>
            <Text style={{ fontSize: 14, color: '#43334C', fontWeight: '600' }}>Rp {shippingFee.toLocaleString('id-ID')}</Text>
          </View>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: '#f0f0f0',
          }}>
            <Text style={{ fontSize: 16, color: '#43334C', fontWeight: 'bold' }}>Total Pembayaran</Text>
            <Text style={{ fontSize: 20, color: '#E83C91', fontWeight: 'bold', fontFamily: 'Arial Black' }}>Rp {totalPayment.toLocaleString('id-ID')}</Text>
          </View>
        </View>

        {/* Pay Button */}
        <TouchableOpacity style={{
          backgroundColor: '#E83C91',
          paddingVertical: 15,
          borderRadius: 8,
          alignItems: 'center',
        }} onPress={onPayNow}>
          <Text style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
          }}>BAYAR SEKARANG</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MemilihSaatCheckoutScreen;