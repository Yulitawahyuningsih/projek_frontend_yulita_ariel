import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Clipboard, Linking, ActivityIndicator, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import OrderDetailProductCard from './OrderDetailProductCard';
import { getOrderDetail, cancelOrder } from '../services/orderService';

const STATUS_LIST = ['Dipesan', 'Diproses', 'Dikirim', 'Selesai'];

const OrderStatusTracker = ({ currentStatus }) => {
  const activeIndex = STATUS_LIST.indexOf(currentStatus);

  return (
    <View style={styles.trackerContainer}>
      {STATUS_LIST.map((status, index) => {
        const isCompleted = index < activeIndex;
        const isActive = index === activeIndex;

        return (
          <React.Fragment key={status}>
            <View style={styles.trackerNode}>
              <View style={[
                styles.trackerCircle,
                isCompleted && styles.completedCircle,
                isActive && styles.activeCircle,
              ]}>
                {isCompleted ? (
                  <Feather name="check" size={14} color="white" />
                ) : (
                  <Text style={[styles.trackerCircleText, isActive && styles.activeCircleText]}>{index + 1}</Text>
                )}
              </View>
              <Text style={[styles.trackerLabel, (isActive || isCompleted) && styles.activeLabel]}>{status}</Text>
            </View>
            {index < STATUS_LIST.length - 1 && (
              <View style={[styles.trackerLine, (isActive || isCompleted) && styles.activeLine]} />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const OrderDetailScreen = ({ navigation, route }) => {
  const { order: orderParam, orderId } = route.params;
  const [order, setOrder] = useState(orderParam || null);
  const [loading, setLoading] = useState(!orderParam);

  useEffect(() => {
    if (!orderParam && orderId) {
      fetchOrderDetail(orderId);
    }
  }, []);

  const fetchOrderDetail = async (id) => {
    try {
      setLoading(true);
      const response = await getOrderDetail(id);
      if (response.success) {
        setOrder(response.data);
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat detail pesanan');
    } finally {
      setLoading(false);
    }
  };

  const handleTrackOrder = () => {
    const trackingNumber = order.shipping?.tracking_number;
    if (trackingNumber) {
      const url = `https://www.google.com/search?q=lacak+paket+${trackingNumber}`;
      Linking.canOpenURL(url).then(supported => {
        if (supported) Linking.openURL(url);
      });
    }
  };

  const handleCancelOrder = async () => {
    Alert.alert('Batalkan Pesanan', 'Yakin ingin membatalkan pesanan ini?', [
      { text: 'Tidak', style: 'cancel' },
      {
        text: 'Ya, Batalkan',
        style: 'destructive',
        onPress: async () => {
          try {
            await cancelOrder(order.id);
            Alert.alert('Berhasil', 'Pesanan berhasil dibatalkan');
            navigation.navigate('MyOrders');
          } catch (error) {
            Alert.alert('Gagal', 'Pesanan tidak dapat dibatalkan');
          }
        }
      }
    ]);
  };

  const formatRupiah = (value) => `Rp ${Number(value).toLocaleString('id-ID')}`;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#43334C" />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'grey' }}>Pesanan tidak ditemukan.</Text>
      </View>
    );
  }

  const renderBottomActions = () => (
    <View style={styles.bottomActionBar}>
      <TouchableOpacity
        style={styles.contactButton}
        onPress={() => navigation.navigate('Chat', { sellerName: 'Fashion Yulita Seller' })}
      >
        <Text style={styles.contactButtonText}>Hubungi Penjual</Text>
      </TouchableOpacity>
      {order.status === 'Diproses' && (
        <TouchableOpacity style={[styles.mainActionButton, { backgroundColor: '#e53935' }]} onPress={handleCancelOrder}>
          <Text style={styles.mainActionButtonText}>Batalkan</Text>
        </TouchableOpacity>
      )}
      {order.status === 'Dikirim' && (
        <TouchableOpacity style={styles.mainActionButton} onPress={() => navigation.navigate('MyOrders')}>
          <Text style={styles.mainActionButtonText}>Konfirmasi Diterima</Text>
        </TouchableOpacity>
      )}
      {order.status === 'Selesai' && (
        <TouchableOpacity
          style={styles.mainActionButton}
          onPress={() => navigation.navigate('BeriUlasan', { product: order.items?.[0]?.product })}
        >
          <Text style={styles.mainActionButtonText}>Beri Ulasan</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#F9F8F6' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5, marginRight: 10 }}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Pesanan #{order.order_number}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Status Tracker */}
        <View style={styles.sectionContainer}>
          <OrderStatusTracker currentStatus={order.status} />
        </View>

        {/* Informasi Pengiriman */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Informasi Pengiriman</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoTextBold}>
              {order.address?.recipient_name} ({order.address?.phone})
            </Text>
            <Text style={styles.infoText}>{order.address?.full_address}</Text>
            <View style={styles.divider} />
            <Text style={styles.infoText}>
              {order.shipping?.courier ?? '-'} - {order.shipping?.service ?? '-'}
            </Text>
            <View style={styles.shippingRow}>
              <Text style={styles.infoText}>
                No. Resi: {order.shipping?.tracking_number ?? 'Belum Tersedia'}
              </Text>
              {order.shipping?.tracking_number && (
                <TouchableOpacity onPress={() => Clipboard.setString(order.shipping.tracking_number)}>
                  <Feather name="copy" size={16} color="#E83C91" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <TouchableOpacity style={styles.trackButton} onPress={handleTrackOrder}>
            <Text style={styles.trackButtonText}>Lacak Pesanan</Text>
          </TouchableOpacity>
        </View>

        {/* Rincian Produk */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Rincian Produk</Text>
          {order.items?.map(item => (
            <OrderDetailProductCard key={item.id} item={{
              id: item.id,
              name: item.product_name,
              image: item.product_image ? `http://10.88.107.115:8000/storage/${item.product_image}` : null,
              price: formatRupiah(item.price),
              quantity: item.quantity,
              variant: `${item.variant?.color ?? '-'} / ${item.variant?.size ?? '-'}`,
              subtotal: formatRupiah(item.price * item.quantity),
            }} />
          ))}
        </View>

        {/* Rincian Pembayaran */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Rincian Pembayaran</Text>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Metode Pembayaran</Text>
            <Text style={styles.paymentValueBold}>{order.payment_method}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Subtotal Produk</Text>
            <Text style={styles.paymentValue}>{formatRupiah(order.subtotal)}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Biaya Pengiriman</Text>
            <Text style={styles.paymentValue}>{formatRupiah(order.shipping_cost)}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Diskon</Text>
            <Text style={styles.paymentValue}>- {formatRupiah(order.discount)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.paymentRow}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>{formatRupiah(order.total)}</Text>
          </View>
        </View>
      </ScrollView>

      {renderBottomActions()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingTop: 50, paddingBottom: 15, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#43334C', marginLeft: 10 },
  sectionContainer: { backgroundColor: 'white', padding: 15, marginTop: 10 },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, color: '#43334C', marginBottom: 15 },
  trackerContainer: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  trackerNode: { alignItems: 'center', flex: 1 },
  trackerCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
  completedCircle: { backgroundColor: '#43334C' },
  activeCircle: { backgroundColor: '#E83C91' },
  trackerCircleText: { color: '#43334C', fontSize: 12, fontWeight: 'bold' },
  activeCircleText: { color: 'white' },
  trackerLabel: { fontSize: 12, color: 'grey', marginTop: 8, textAlign: 'center' },
  activeLabel: { color: '#43334C', fontWeight: 'bold' },
  trackerLine: { flex: 1, height: 2, backgroundColor: '#E0E0E0', marginHorizontal: -10, marginTop: 11 },
  activeLine: { backgroundColor: '#43334C' },
  infoBox: { padding: 15, backgroundColor: '#F9F8F6', borderRadius: 8 },
  infoText: { fontSize: 14, color: '#616161', lineHeight: 20 },
  infoTextBold: { fontSize: 14, color: '#43334C', fontWeight: 'bold', marginBottom: 4 },
  shippingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  trackButton: { borderWidth: 1.5, borderColor: '#E83C91', borderRadius: 8, paddingVertical: 10, alignItems: 'center', marginTop: 15 },
  trackButtonText: { color: '#E83C91', fontWeight: 'bold', fontSize: 14 },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 12 },
  paymentRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 4 },
  paymentLabel: { fontSize: 14, color: 'grey' },
  paymentValue: { fontSize: 14, color: '#43334C' },
  paymentValueBold: { fontSize: 14, color: '#43334C', fontWeight: 'bold' },
  totalLabel: { fontSize: 18, color: '#43334C', fontWeight: 'bold' },
  totalValue: { fontSize: 22, color: '#E83C91', fontWeight: 'bold' },
  bottomActionBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', padding: 15, paddingTop: 10, paddingBottom: 25, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#EEEEEE' },
  contactButton: { flex: 1, borderWidth: 1.5, borderColor: '#43334C', borderRadius: 8, justifyContent: 'center', alignItems: 'center', paddingVertical: 12, marginRight: 10 },
  contactButtonText: { color: '#43334C', fontWeight: 'bold', fontSize: 16 },
  mainActionButton: { flex: 1, backgroundColor: '#E83C91', borderRadius: 8, justifyContent: 'center', alignItems: 'center', paddingVertical: 12 },
  mainActionButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default OrderDetailScreen;