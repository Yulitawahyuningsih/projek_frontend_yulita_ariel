import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const faqData = {
  'Pesanan & Pengiriman': [
    { q: 'Bagaimana cara melacak pesanan saya?', a: 'Anda dapat melacak pesanan Anda melalui menu "Pesanan Saya" di halaman profil. Klik pada pesanan yang ingin dilacak, lalu tekan tombol "Lacak Pesanan" untuk melihat status pengiriman terkini.' },
    { q: 'Berapa lama waktu pengiriman?', a: 'Waktu pengiriman bervariasi tergantung lokasi Anda dan layanan kurir yang dipilih. Estimasi waktu pengiriman untuk wilayah Jabodetabek adalah 1-3 hari kerja, dan untuk luar Jabodetabek adalah 3-7 hari kerja.' },
    { q: 'Bisakah saya mengubah alamat setelah pesanan dibuat?', a: 'Sayangnya, alamat pengiriman tidak dapat diubah setelah pesanan dikonfirmasi untuk menjaga keamanan transaksi. Pastikan alamat Anda sudah benar sebelum menyelesaikan pembayaran.' },
  ],
  'Pembayaran & Pengembalian': [
    { q: 'Metode pembayaran apa yang tersedia?', a: 'Kami menerima berbagai metode pembayaran, termasuk Kartu Kredit/Debit (Visa, Mastercard), Virtual Account dari berbagai bank besar, E-Wallet (GoPay, DANA), dan Bayar di Tempat (COD) untuk wilayah tertentu.' },
    { q: 'Bagaimana prosedur pengembalian dana (refund)?', a: 'Proses pengembalian dana akan dimulai setelah kami menerima dan memverifikasi produk yang Anda kembalikan. Dana akan dikembalikan ke metode pembayaran asli Anda dalam waktu 5-14 hari kerja.' },
    { q: 'Apakah saya bisa membatalkan pesanan?', a: 'Pesanan dapat dibatalkan selama statusnya masih "Diproses" dan belum diserahkan ke kurir. Anda dapat membatalkan melalui halaman "Detail Pesanan".' },
  ],
  'Akun & Profil': [
    { q: 'Bagaimana cara mengganti kata sandi?', a: 'Anda dapat mengganti kata sandi melalui menu "Pengaturan" > "Keamanan Akun". Anda akan diminta memasukkan kata sandi lama dan kata sandi baru.' },
    { q: 'Bagaimana cara mengubah email saya?', a: 'Untuk saat ini, perubahan alamat email tidak dapat dilakukan secara mandiri. Silakan hubungi Customer Service kami untuk bantuan lebih lanjut.' },
    { q: 'Apa yang harus dilakukan jika saya lupa kata sandi?', a: 'Pada halaman Login, klik tautan "Lupa Kata Sandi". Masukkan email Anda yang terdaftar, dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda.' },
  ],
};

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity style={styles.accordionHeader} onPress={toggleOpen}>
        <Text style={styles.questionText}>{question}</Text>
        <Feather name={isOpen ? 'chevron-up' : 'chevron-down'} size={22} color="#43334C" />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

const FAQListScreen = ({ navigation, route }) => {
  const { topic } = route.params;
  const questions = faqData[topic] || [];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FAQ: {topic}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {questions.map((item, index) => (
          <AccordionItem key={index} question={item.q} answer={item.a} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F8F6' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingTop: 50, paddingBottom: 15, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backButton: { padding: 5, marginRight: 10 },
  headerTitle: { fontSize: 20, fontFamily: 'Arial Black', color: '#43334C' },
  scrollContainer: { padding: 15 },
  accordionContainer: { backgroundColor: 'white', borderRadius: 8, marginBottom: 10, overflow: 'hidden' },
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 },
  questionText: { flex: 1, fontSize: 16, color: '#43334C', fontWeight: '600', marginRight: 10 },
  answerContainer: { paddingHorizontal: 15, paddingBottom: 15, borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 10 },
  answerText: { fontSize: 14, color: '#616161', lineHeight: 22 },
});

export default FAQListScreen;