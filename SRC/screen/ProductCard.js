import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native'; 
import { FontAwesome } from '@expo/vector-icons';

const ProductCard = ({ item, onPress, onToggleWishlist, isWishlisted }) => {
  // console.log('ProductCard received item:', item); // Log item yang diterima oleh ProductCard

  // Logika untuk mendapatkan URL gambar, dengan fallback ke gambar lokal
  const imageUrl = item.images && item.images.length > 0 ? { uri: item.images[0].image_url } : require('../../assets/MiniDress.png');
  // Logika untuk memformat harga
  const finalPrice = item.discount_price || item.price;
  const formattedPrice = `Rp ${Number(finalPrice).toLocaleString('id-ID')}`;

  return (
    <TouchableOpacity style={{
      flex: 1,
      margin: 5,
      backgroundColor: 'white',
      borderRadius: 8,
      overflow: 'hidden',
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
    }} onPress={onPress}>
      <View style={{
        width: '100%',
        height: 180,
      }}>
        <Image source={imageUrl} style={{ // Menggunakan imageUrl yang sudah diproses
          width: '100%',
          height: '100%',
        }} />
        <TouchableOpacity style={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: 15,
          padding: 5,
        }} onPress={onToggleWishlist}>
          <FontAwesome
            name={isWishlisted ? "heart" : "heart-o"}
            size={20}
            color={isWishlisted ? "#E83C91" : "#FFC4C4"}
          />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={{
          fontSize: 14,
          color: '#43334C', // $TEXT_PRIMARY
          marginBottom: 5,
        }} numberOfLines={2}>{item.name}</Text>
        <Text style={{
          fontSize: 16,
          fontFamily: 'Arial Black', // Meniru Arial Black
          color: '#E83C91', // $ACCENT_CTA
        }}>{formattedPrice}</Text>
      </View>
    </TouchableOpacity>
  );
}; 

export default ProductCard;