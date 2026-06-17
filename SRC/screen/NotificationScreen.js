import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import NotificationCard from './NotificationCard';
import { getNotifications, readNotification } from '../services/notificationService';

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await getNotifications();
      setNotifications(response.data);
    } catch (error) {
      console.error('Gagal mengambil notifikasi:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReadNotification = async (notificationId) => {
    try {
      await readNotification(notificationId);
      setNotifications(current =>
        current.map(notif =>
          notif.id === notificationId ? { ...notif, is_read: true } : notif
        )
      );
    } catch (error) {
      console.error('Gagal menandai notifikasi:', error);
    }
  };

  const handleNotificationPress = (notification) => {
    handleReadNotification(notification.id);
    if (notification.type === 'Transaksi' && notification.order_id) {
      navigation.navigate('OrderDetail', { orderId: notification.order_id });
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#43334C" />
      </View>
    );
  }

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
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5, marginRight: 10 }}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#43334C' }}>Notifikasi</Text>
      </View>

      {/* Notification List */}
      <FlatList
        data={notifications}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <NotificationCard notification={item} onPress={() => handleNotificationPress(item)} />
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', marginTop: 50, color: 'grey', fontSize: 16 }}>
            Tidak ada notifikasi saat ini.
          </Text>
        }
      />
    </View>
  );
};

export default NotificationScreen;