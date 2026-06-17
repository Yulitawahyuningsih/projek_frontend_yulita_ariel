import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, Alert } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import CartItemCard from './CartItemCard';
import { getCarts, updateCart, removeFromCart } from '../services/cartService';
import { getAddresses } from '../services/addressService';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCarts();
    fetchAddresses();
  }, []);

  const fetchCarts = async () => {
    setIsLoading(true);
    try {
      const response = await getCarts();
      if (response.success) setCartItems(response.data);
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat keranjang');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await getAddresses();
      if (response.success) setAddresses(response.data);
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleUpdateQuantity = async (cartId, quantity) => {
    if (quantity < 1) {
      handleRemoveItem(cartId);
      return;
    }
    
    try {
      await updateCart(cartId, quantity);
      fetchCarts();
    } catch (error) {
      Alert.alert('Error', 'Gagal update quantity');
    }
  };

  const handleRemoveItem = async (cartId) => {
    try {
      await removeFromCart(cartId);
      fetchCarts();
    } catch (error) {
      Alert.alert('Error', 'Gagal hapus item');
    }
  };

  // Cari alamat yang ditandai sebagai default
  const defaultAddress = addresses.find(addr => addr.is_default) || addresses[0];

  // Fungsi untuk menghitung total harga
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const product = item.product || {};
      const price = parseFloat(product.discount_price || product.price || 0);
      return total + (price * item.quantity);
    }, 0);
  };

  const renderEmptyState = () => (
    <View style={{
      flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40,
    }}>
      <FontAwesome name="shopping-bag" size={80} color="#FFC4C4" />
      <Text style={{
        fontSize: 20, fontWeight: 'bold', color: '#43334C', marginTop: 20, textAlign: 'center',
      }}>Keranjang Belanja Anda Kosong</Text>
      <Text style={{
        fontSize: 16, color: 'rgba(67, 51, 76, 0.7)', textAlign: 'center', marginTop: 10, marginBottom: 30,
      }}>Sepertinya Anda belum menambahkan produk apa pun.</Text>
      <TouchableOpacity style={{
        backgroundColor: '#E83C91', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 50,
      }} onPress={() => navigation.navigate('Home')}>
        <Text style={{
          color: '#F9F8F6', fontSize: 16, fontWeight: 'bold',
        }}>Mulai Belanja</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#F9F8F6' }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15,
        paddingTop: 50, paddingBottom: 15, backgroundColor: 'white',
        borderBottomWidth: 1, borderBottomColor: '#eee',
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5, marginRight: 10 }}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#43334C' }}>Keranjang Saya ({cartItems.length})</Text>
      </View>

      {isLoading && <ActivityIndicator size="large" color="#E83C91" style={{ marginTop: 20 }} />}

      {cartItems.length === 0 ? renderEmptyState() : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            ListHeaderComponent={
              // Shipping Address Section
              <View style={{
                backgroundColor: 'white', marginHorizontal: 15, marginTop: 10,
                padding: 15, borderRadius: 8,
              }}>
                  <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10,
                  }}>
                      <Text style={{
                        fontSize: 16, fontWeight: 'bold', color: '#43334C',
                      }}>Alamat Pengiriman</Text>
                      <TouchableOpacity onPress={() => navigation.navigate('ShippingAddress')} style={{ padding: 5 }}>
                          <Feather name="chevron-right" size={22} color="#E83C91" />
                      </TouchableOpacity>
                  </View>
                  
                  {defaultAddress ? (
                      <>
                        <Text style={{ fontSize: 15, color: '#43334C', fontWeight: '600' }}>
                          {defaultAddress.recipient_name} ({defaultAddress.label})
                        </Text>
                        <Text style={{ fontSize: 14, color: 'grey', marginTop: 4 }} numberOfLines={1}>
                          {defaultAddress.full_address}
                        </Text>
                      </>
                    ) : <Text style={{ fontSize: 14, color: 'grey' }}>Belum ada alamat dipilih.</Text>}
              </View>
            }
            renderItem={({ item }) => (
              <CartItemCard
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={() => handleRemoveItem(item.id)}
              />
            )}
            contentContainerStyle={{ paddingTop: 10, paddingBottom: 120 }}
          />

          {/* Checkout Bar */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 15,
            paddingBottom: 25,
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#eee',
          }}>
            <View>
                <Text style={{
                  color: 'grey',
                  fontSize: 14,
                }}>Total Harga</Text>
                <Text style={{
                  color: '#E83C91',
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontFamily: 'Arial Black',
                }}>Rp {calculateTotal().toLocaleString('id-ID')}</Text>
            </View>
            <TouchableOpacity style={{
              backgroundColor: '#E83C91',
              paddingVertical: 14,
              paddingHorizontal: 50,
              borderRadius: 8,
            }} onPress={() => navigation.navigate('ShippingAddress', { cartItems })}>
                <Text style={{
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                }}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;