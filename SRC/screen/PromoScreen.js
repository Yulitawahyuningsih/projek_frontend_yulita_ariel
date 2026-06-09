import React, { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Mengganti AntDesign dengan Feather
import VoucherCard from './VoucherCard';

// Menambahkan status 'unclaimed' pada data awal
const initialVouchers = [
  { id: '1', title: 'Diskon 20%', description: 'Min. belanja Rp 250.000', expiry: '30 Des 2024', status: 'unclaimed' },
  { id: '2', title: 'Gratis Ongkir', description: 'Tanpa min. belanja', expiry: '15 Jan 2025', status: 'unclaimed' },
  { id: '3', title: 'Cashback Rp 50.000', description: 'Untuk kategori Dress Pesta', expiry: '25 Des 2024', status: 'unclaimed' },
  { id: '4', title: 'Potongan Rp 25.000', description: 'Khusus pengguna baru', expiry: '31 Des 2024', status: 'unclaimed' },
];

const PromoScreen = ({ navigation }) => {
  const [vouchers, setVouchers] = useState(initialVouchers);

  const handleClaimVoucher = (voucherId) => {
    // Menampilkan pesan di konsol bahwa voucher telah diklaim
    console.log(`Voucher dengan ID: ${voucherId} telah diklaim!`);

    // Memperbarui state untuk mengubah status voucher yang diklaim
    setVouchers(currentVouchers =>
      currentVouchers.map(voucher =>
        voucher.id === voucherId ? { ...voucher, status: 'claimed' } : voucher
      )
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F9F8F6' }}>
    
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 45,
        paddingBottom: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      }} >
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5, marginRight: 10 }}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#43334C',
          marginLeft: 15,
        }}>Promo & Voucher</Text> 
      </View>

      <FlatList
        data={vouchers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VoucherCard voucher={item} onClaim={() => handleClaimVoucher(item.id)} />}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
      />
    </View>
  );
};

export default PromoScreen;