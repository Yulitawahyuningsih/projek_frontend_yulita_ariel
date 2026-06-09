import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

const PaymentHistoryCard = ({ card, isDefault, onRemove }) => {
  // Fungsi ini akan memilih ikon berdasarkan tipe kartu
  const getCardIcon = (type) => {
    // Untuk sementara, kita nonaktifkan pemanggilan gambar agar tidak error.
    // TODO: Buat folder 'assets' dan masukkan file gambar, lalu aktifkan kembali kode ini.
    return null; // Mengembalikan null agar tidak ada gambar yang ditampilkan
  };

  return (
    <View style={[{
      flexDirection: 'row',
      backgroundColor: 'white',
      borderRadius: 8,
      marginHorizontal: 15,
      marginBottom: 15,
      padding: 20,
      alignItems: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 5,
    }, isDefault && { borderColor: '#E83C91', borderWidth: 1.5 }]}>
      {getCardIcon(card.type) && <Image source={getCardIcon(card.type)} style={{ width: 50, height: 30, resizeMode: 'contain', marginRight: 15 }} />}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#43334C' }}>{card.type} - {card.bank}</Text>
        <Text style={{ fontSize: 14, color: 'grey', marginVertical: 4, letterSpacing: 1.5 }}>{card.number}</Text>
        <Text style={{ fontSize: 12, color: 'grey' }}>Berlaku hingga: {card.expiry}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        {isDefault && <Text style={{ color: '#E83C91', fontSize: 12, fontWeight: 'bold', marginBottom: 15 }}>Utama</Text>}
        <TouchableOpacity onPress={onRemove}>
          <Text style={{ color: '#D9534F', fontSize: 12, fontWeight: 'bold' }}>Hapus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentHistoryCard;