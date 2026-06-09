import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import MyVoucherCard from './MyVoucherCard';

const initialVouchers = [
  { id: '1', title: 'Diskon 20%', code: 'YULITA20', expiry: '30 Des 2026', expiryDate: '2026-12-30' },
  { id: '2', title: 'Gratis Ongkir', code: 'FREEOKT', expiry: '15 Jan 2027', expiryDate: '2027-01-15' },
  { id: '3', title: 'Cashback Rp 50.000', code: 'CASHBACK50', expiry: '25 Des 2026', expiryDate: '2026-12-25' },
  { id: '4', title: 'Diskon 10%', code: 'HEMAT10', expiry: '31 Des 2026', expiryDate: '2026-12-31' },
];

const VoucersayaScreen = ({ navigation, route }) => {
  const onBack = () => navigation.goBack();
  // Menggunakan state lokal untuk daftar voucher
  const [vouchers, setVouchers] = useState(initialVouchers);

  const handleVoucherPress = (voucher) => {
    const isExpired = new Date(voucher.expiryDate) < new Date();
    if (!isExpired) {
      // Jika voucher bisa digunakan, navigasi ke halaman Home
      console.log(`Voucher "${voucher.title}" ditekan, navigasi ke Home.`);
      navigation.navigate('Home');
    } else {
      console.log(`Voucher "${voucher.title}" sudah kedaluwarsa, tidak ada aksi.`);
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
        <TouchableOpacity onPress={onBack} style={{ padding: 5, marginRight: 10 }}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#43334C',
        }}>Voucher Saya</Text>
      </View>

      {/* Voucher List */}
      <FlatList
        data={vouchers}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleVoucherPress(item)}>
            <MyVoucherCard voucher={item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50, color: 'grey', fontSize: 16 }}>Anda belum memiliki voucher.</Text>}
      />
    </View>
  );
};

export default VoucersayaScreen;