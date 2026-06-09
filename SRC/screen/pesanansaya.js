import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import OrderCard from './OrderCard';
import { getOrders } from '../services/orderService';

const orderCategories = ['Semua', 'Diproses', 'Dikirim', 'Selesai', 'Dibatalkan']; //

const PesananSayaScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [activeCategory]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const status = activeCategory === 'Semua' ? null : activeCategory; // Kirim null jika 'Semua'
      const response = await getOrders(status);
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat pesanan');
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#43334C' }}>Pesanan Saya</Text>
      </View>

      {isLoading && <ActivityIndicator size="large" color="#E83C91" style={{ marginTop: 20 }} />}

      {/* Category Tabs */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{
          paddingVertical: 10, paddingHorizontal: 15, backgroundColor: 'white',
        }}>
          {orderCategories.map(category => (
            <TouchableOpacity
              key={category}
              style={[{
                paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20,
                marginRight: 10, backgroundColor: '#f0f0f0',
              }, activeCategory === category && { backgroundColor: '#E83C91' }]}
              onPress={() => setActiveCategory(category)}
            >
              <Text style={[{
                color: '#43334C', fontWeight: '600',
              }, activeCategory === category && { color: 'white' }]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <OrderCard
            order={{
              ...item,
              date: new Date(item.created_at).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'short', year: 'numeric'
              }),
              itemCount: item.items?.length || 0,
              total: `Rp ${Number(item.total).toLocaleString('id-ID')}`,
            }}
            onPress={() => navigation.navigate('OrderDetail', { order: item })}
          />
        )}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
        ListEmptyComponent={<Text style={{
          textAlign: 'center',
          marginTop: 50,
          color: 'grey',
          fontSize: 16,
        }}>Tidak ada pesanan dalam kategori ini.</Text>}
      />
    </View>
  );
};

export default PesananSayaScreen;