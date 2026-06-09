import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Aktifkan LayoutAnimation untuk Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const guideData = [
  {
    title: 'Memulai & Menjelajah',
    icon: 'compass',
    content: 'Selamat datang di Fashion Yulita! Jelajahi koleksi terbaru kami langsung dari halaman Beranda. Gunakan kolom pencarian di bagian atas untuk menemukan produk spesifik atau telusuri kategori populer kami.'
  },
  {
    title: 'Mencari & Memfilter Produk',
    icon: 'search',
    content: 'Gunakan fitur pencarian untuk menemukan item berdasarkan nama. Di halaman kategori, Anda bisa menggunakan filter untuk menyortir produk berdasarkan harga, popularitas, dan ulasan untuk menemukan yang paling pas.'
  },
  {
    title: 'Menyimpan Produk Favorit',
    icon: 'heart',
    content: 'Suka dengan sebuah produk? Ketuk ikon hati untuk menyimpannya ke Wishlist. Anda dapat melihat semua produk favorit Anda di tab Wishlist untuk dibeli nanti.'
  },
  {
    title: 'Proses Checkout & Pembayaran',
    icon: 'shopping-cart',
    content: 'Setelah menambahkan produk ke keranjang, lanjutkan ke checkout. Isi alamat pengiriman Anda, pilih metode pembayaran yang diinginkan, dan gunakan voucher jika ada. Konfirmasi pesanan Anda dan selesaikan pembayaran.'
  },
  {
    title: 'Mengelola Akun Anda',
    icon: 'user',
    content: 'Di halaman Profil, Anda dapat melihat riwayat pesanan, mengelola alamat, metode pembayaran, dan voucher. Anda juga bisa mengubah pengaturan aplikasi seperti notifikasi dan tema.'
  },
];

const GuideItem = ({ title, icon, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.cardHeader} onPress={toggleExpand} activeOpacity={0.8}>
        <Feather name={icon} size={22} color="#43334C" />
        <Text style={styles.cardTitle}>{title}</Text>
        <Feather name={isExpanded ? 'chevron-up' : 'chevron-down'} size={22} color="#BDBDBD" />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.cardContent}>
          <Text style={styles.cardText}>{content}</Text>
        </View>
      )}
    </View>
  );
};

const PetunjukPenggunaanScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Petunjuk Penggunaan</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.introContainer}>
          <Feather name="book-open" size={40} color="#E83C91" />
          <Text style={styles.introTitle}>Panduan Cepat</Text>
          <Text style={styles.introText}>
            Temukan cara memaksimalkan pengalaman berbelanja Anda di Fashion Yulita.
          </Text>
        </View>
        {guideData.map((item, index) => (
          <GuideItem key={index} title={item.title} icon={item.icon} content={item.content} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F8F6' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: { padding: 5, marginRight: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#43334C' },
  scrollContainer: { padding: 15, paddingBottom: 40 },
  introContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  introTitle: { fontSize: 22, fontWeight: 'bold', color: '#43334C', marginTop: 15, marginBottom: 5 },
  introText: { fontSize: 15, color: 'grey', textAlign: 'center' },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#43334C',
    marginLeft: 15,
  },
  cardContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 5,
  },
  cardText: {
    fontSize: 14,
    color: '#616161',
    lineHeight: 22,
  },
});

export default PetunjukPenggunaanScreen;