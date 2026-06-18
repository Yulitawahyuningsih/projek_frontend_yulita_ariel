import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getImageUrl } from '../services/api';

const CartItemCard = ({ item, onUpdateQuantity, onRemove }) => {
  // Ambil data produk dari objek product yang dikirim API
  const product = item.product || {};
  const price = product.discount_price || product.price || 0;
  
  // Logika pengambilan gambar (URL string, objek uri, atau fallback)
  let imageSource = require('../../assets/MiniDress.png');
  if (product.image) {
    imageSource = typeof product.image === 'string' ? { uri: getImageUrl(product.image) } : product.image;
  } else if (product.images && product.images.length > 0) {
    const firstImg = product.images[0];
    const rawUrl = firstImg.image_url || firstImg.uri || firstImg;
    imageSource = { uri: getImageUrl(rawUrl) };
  }

  return (
    <View style={{
      flexDirection: 'row',
      backgroundColor: 'white',
      marginHorizontal: 15,
      marginBottom: 10,
      padding: 10,
      borderRadius: 8,
      elevation: 1,
    }}>
      <Image 
        source={imageSource} 
        style={{
          width: 80,
          height: 100,
          borderRadius: 8,
          marginRight: 15,
        }} />
      <View style={{
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 5,
      }}>
        <Text style={{
          fontSize: 15,
          color: '#43334C',
          fontWeight: '600',
        }} numberOfLines={2}>{product.name || 'Produk'}</Text>
        <Text style={{
          fontSize: 16,
          color: '#E83C91',
          fontWeight: 'bold',
        }}>Rp {Number(price).toLocaleString('id-ID')}</Text>
      </View>
      <View style={{
        alignItems: 'flex-end',
        justifyContent: 'space-between',
      }}>
        <TouchableOpacity onPress={onRemove} style={{ padding: 5 }}>
            <Feather name="trash-2" size={18} color="grey" />
        </TouchableOpacity>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#DDDDDD',
          borderRadius: 8,
        }}>
          <TouchableOpacity onPress={() => onUpdateQuantity(item.id, item.quantity - 1)} style={{ padding: 8 }}>
            <Feather name="minus" size={16} color="#43334C" />
          </TouchableOpacity>
          <Text style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: '#43334C',
            marginHorizontal: 12,
          }}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => onUpdateQuantity(item.id, item.quantity + 1)} style={{ padding: 8 }}>
            <Feather name="plus" size={16} color="#43334C" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItemCard;