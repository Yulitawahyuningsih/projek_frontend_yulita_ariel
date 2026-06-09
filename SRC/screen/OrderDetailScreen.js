import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Clipboard, Linking } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import OrderDetailProductCard from './OrderDetailProductCard';

const STATUS_LIST = ['Dipesan', 'Diproses', 'Dikirim', 'Selesai'];

const OrderStatusTracker = ({ currentStatus }) => {
  const activeIndex = STATUS_LIST.indexOf(currentStatus);

  return (
    <View style={styles.trackerContainer}>
      {STATUS_LIST.map((status, index) => {
        const isCompleted = index < activeIndex;
        const isActive = index === activeIndex;
        const isFuture = index > activeIndex;

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
  const { order } = route.params;

  const handleTrackOrder = () => {
    const trackingNumber = order.shipping?.trackingNumber;
    if (trackingNumber && trackingNumber !== 'Belum Tersedia') {
      // URL pencarian Google generik untuk melacak paket
      const url = `https://www.google.com/search?q=lacak+paket+${trackingNumber}`;
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log(`Tidak bisa membuka URL: ${url}`);
        }
      });
    } else {
      console.log("Nomor resi belum tersedia untuk dilacak.");
    }
  };

  const renderBottomActions = () => {
    return (
      <View style={styles.bottomActionBar}>
        <TouchableOpacity 
          style={styles.contactButton} 
          onPress={() => navigation.navigate('Chat', { 
            sellerName: 'Fashion Yulita Seller' // Nama penjual bisa dinamis dari data order
          })}
        >
          <Text style={styles.contactButtonText}>Hubungi Penjual</Text>
        </TouchableOpacity>
        {order.status === 'Dikirim' && (
          <TouchableOpacity 
            style={styles.mainActionButton}
            onPress={() => {
              console.log(`Pesanan ${order.id} dikonfirmasi diterima.`);
              // Di aplikasi nyata, Anda akan memanggil API untuk mengubah status pesanan.
              navigation.navigate('MyOrders'); // Kembali ke daftar pesanan
            }}
          >
            <Text style={styles.mainActionButtonText}>Konfirmasi Diterima</Text>
          </TouchableOpacity>
        )}
        {order.status === 'Selesai' && (
          <TouchableOpacity 
            style={styles.mainActionButton}
            onPress={() => navigation.navigate('BeriUlasan', { 
              product: order.products[0] // Mengirim produk pertama untuk diulas
            })}
          >
            <Text style={styles.mainActionButtonText}>Beri Ulasan</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F9F8F6' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5, marginRight: 10 }}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Pesanan #{order.id}</Text>
      </View>

      <ScrollView>
        {/* Order Status */}
        <View style={styles.sectionContainer}>
          <OrderStatusTracker currentStatus={order.status} />
        </View>

        {/* Shipping Address */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Informasi Pengiriman</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoTextBold}>{order.address.name} ({order.address.phone})</Text>
            <Text style={styles.infoText}>{order.address.street}, {order.address.city}</Text>
            <View style={styles.divider} />
            <Text style={styles.infoText}>{order.shipping?.courier} - {order.shipping?.service}</Text>
            <View style={styles.shippingRow}>
              <Text style={styles.infoText}>No. Resi: {order.shipping?.trackingNumber}</Text>
              <TouchableOpacity onPress={() => Clipboard.setString(order.shipping?.trackingNumber || '')}>
                <Feather name="copy" size={16} color="#E83C91" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.trackButton} onPress={handleTrackOrder}>
            <Text style={styles.trackButtonText}>Lacak Pesanan</Text>
          </TouchableOpacity>
        </View>

        {/* Product List */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Rincian Produk</Text>
          {order.products.map(item => (
            <OrderDetailProductCard key={item.id} item={item} />
          ))}
        </View>

        {/* Payment Summary */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Rincian Pembayaran</Text>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Metode Pembayaran</Text>
            <Text style={styles.paymentValueBold}>{order.payment?.method}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Subtotal Produk</Text>
            <Text style={styles.paymentValue}>{order.payment?.subtotal}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Biaya Pengiriman</Text>
            <Text style={styles.paymentValue}>{order.payment?.shipping}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Diskon</Text>
            <Text style={styles.paymentValue}>-{order.payment?.discount}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.paymentRow}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>{order.payment?.total}</Text>
          </View>
        </View>
      </ScrollView>
      {renderBottomActions()}
    </View>
  );
};

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingTop: 50, paddingBottom: 15, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontFamily: 'Arial Black', fontSize: 18, color: '#43334C', marginLeft: 10 },
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
  totalValue: { fontSize: 22, color: '#E83C91', fontWeight: 'bold', fontFamily: 'Arial Black' },
  bottomActionBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', padding: 15, paddingTop: 10, paddingBottom: 25, backgroundColor: 'white', borderTopWidth: 1, borderTopColor: '#EEEEEE' },
  contactButton: { flex: 1, borderWidth: 1.5, borderColor: '#43334C', borderRadius: 8, justifyContent: 'center', alignItems: 'center', paddingVertical: 12, marginRight: 10 },
  contactButtonText: { color: '#43334C', fontWeight: 'bold', fontSize: 16 },
  mainActionButton: { flex: 1, backgroundColor: '#E83C91', borderRadius: 8, justifyContent: 'center', alignItems: 'center', paddingVertical: 12 },
  mainActionButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});

export default OrderDetailScreen;