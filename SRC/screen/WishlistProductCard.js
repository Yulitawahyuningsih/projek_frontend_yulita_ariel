import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const WishlistProductCard = ({ item, onRemove, onMoveToCart }) => {
  // Debugging URI
  console.log("IMAGE URI (WishlistProductCard):", item.image, typeof item.image);

  return (
    <View style={{
      flex: 1,
      margin: 5,
      backgroundColor: 'white',
      borderRadius: 8,
      overflow: 'hidden',
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
    }}>
      <View style={{
        width: '100%',
        height: 180,
      }}>
        <Image 
          source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
          style={{
          width: '100%',
          height: '100%',
        }} />
        <TouchableOpacity style={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: 15,
          padding: 5,
        }} onPress={() => onRemove(item.id)}>
          <FontAwesome name="heart" size={20} color="#E83C91" />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 10 }}>
        <Text style={{
          fontSize: 14,
          color: '#43334C',
          marginBottom: 5,
          minHeight: 34, // Reserve space for two lines
        }} numberOfLines={2}>{item.name}</Text>
        <Text style={{
          fontSize: 16,
          fontFamily: 'Arial Black',
          color: '#E83C91',
          marginBottom: 10,
        }}>
          {item.discount_price 
            ? `Rp ${Number(item.discount_price).toLocaleString('id-ID')}` 
            : `Rp ${Number(item.price).toLocaleString('id-ID')}`}
        </Text>
        <TouchableOpacity style={{
          backgroundColor: '#FFC4C4', // $PALE_PINK
          paddingVertical: 6,
          borderRadius: 5,
          alignItems: 'center',
        }} onPress={() => onMoveToCart(item)}>
            <Text style={{
              color: '#43334C', // $TEXT_PRIMARY
              fontSize: 12,
              fontWeight: 'bold',
            }}>Pindah ke Keranjang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WishlistProductCard;