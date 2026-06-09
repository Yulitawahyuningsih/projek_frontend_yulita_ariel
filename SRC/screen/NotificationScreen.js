import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import NotificationCard from './NotificationCard';
import { allOrders } from './pesanansaya'; // Impor data pesanan lengkap

const initialNotifications = [
  { id: '1', type: 'promo', title: 'Flash Sale 12.12!', body: 'Diskon hingga 70% untuk semua produk dress. Jangan sampai ketinggalan!', timestamp: '2 jam lalu', isRead: false, orderId: null },
  { id: '2', type: 'transaksi', title: 'Pesanan Dikirim', body: 'Pesanan #789123 Anda telah dikirim dan sedang dalam perjalanan.', timestamp: '1 hari lalu', isRead: false, orderId: '789123' },
  { id: '3', type: 'info', title: 'Akun Anda Diperbarui', body: 'Alamat pengiriman utama Anda telah berhasil diperbarui.', timestamp: '3 hari lalu', isRead: true, orderId: null },
  { id: '4', type: 'transaksi', title: 'Pesanan Selesai', body: 'Pesanan #789122 telah diterima. Berikan ulasan Anda!', timestamp: '5 hari lalu', isRead: true, orderId: '789122' },
];

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleReadNotification = (notificationId) => {
    setNotifications(currentNotifications =>
      currentNotifications.map(notif =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const handleNotificationPress = (notification) => {
    handleReadNotification(notification.id);
    // Logika navigasi dipindahkan ke sini
    if (notification.type === 'transaksi' && notification.orderId) {
      // Cari pesanan lengkap berdasarkan ID dari notifikasi
      const fullOrder = allOrders.find(order => order.id === notification.orderId);

      if (fullOrder) {
        navigation.navigate('OrderDetail', { order: fullOrder });
      } else {
        console.warn(`Pesanan dengan ID ${notification.orderId} tidak ditemukan.`);
      }
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5, marginRight: 10 }}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#43334C' }}>Notifikasi</Text>
      </View>

      {/* Notification List */}
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (<NotificationCard notification={item} onPress={() => handleNotificationPress(item)} />)}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50, color: 'grey', fontSize: 16 }}>Tidak ada notifikasi saat ini.</Text>}
      />
    </View>
  );
};

export default NotificationScreen;