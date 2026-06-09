import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

const BeriUlasanScreen = ({ route, navigation }) => {
  // Ambil data produk dari parameter navigasi yang dikirim dari OrderDetailScreen
  const { product } = route.params || { product: {
    name: 'Produk Tidak Ditemukan',
    image: 'https://via.placeholder.com/100', // Gambar placeholder
    id: '0'
  }};

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  // Debugging URI
  console.log("IMAGE URI (BeriUlasanScreen):", product.image, typeof product.image);

  const handleSubmitReview = () => {
    if (rating === 0) {
      Alert.alert('Peringatan', 'Mohon berikan peringkat bintang untuk produk ini.');
      return;
    }
    if (review.trim() === '') {
      Alert.alert('Peringatan', 'Mohon tulis ulasan Anda.');
      return;
    }

    // Di aplikasi nyata, di sini Anda akan mengirim data ulasan ke server
    console.log('Review Submitted for Product ID:', product.id);
    console.log('Rating:', rating);
    console.log('Review:', review);

    Alert.alert(
      'Terima Kasih!',
      'Ulasan Anda telah berhasil dikirim.',
      // Kembali ke halaman sebelumnya setelah ulasan dikirim
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#43334C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Beri Ulasan</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Info Produk */}
        <View style={styles.productInfoContainer}>
          <Image 
            source={typeof product.image === 'string' ? { uri: product.image } : product.image} 
            style={styles.productImage} />
          <Text style={styles.productName}>{product.name}</Text>
        </View>

        {/* Peringkat Bintang */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Peringkat Anda</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Feather
                  name="star"
                  size={32}
                  style={[
                    styles.starIcon,
                    rating >= star ? styles.starFilled : styles.starOutline,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Kolom Ulasan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ulasan Anda</Text>
          <TextInput
            style={styles.reviewInput}
            placeholder="Bagaimana pendapat Anda tentang produk ini?"
            multiline
            numberOfLines={6}
            value={review}
            onChangeText={setReview}
          />
        </View>

        {/* Tombol Kirim */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
          <Text style={styles.submitButtonText}>Kirim Ulasan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F8F6' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#43334C' },
  scrollContainer: { padding: 20 },
  productInfoContainer: { alignItems: 'center', marginBottom: 20 },
  productImage: { width: 100, height: 100, borderRadius: 10, marginBottom: 15 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#43334C', textAlign: 'center' },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#43334C', marginBottom: 10 },
  ratingContainer: { flexDirection: 'row', justifyContent: 'center', gap: 15 },
  starIcon: { color: '#FFC4C4' },
  starFilled: { color: '#E83C91' },
  reviewInput: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#FFC4C4',
    borderRadius: 10,
    padding: 15,
    textAlignVertical: 'top',
    fontSize: 14,
    minHeight: 120,
  },
  submitButton: {
    backgroundColor: '#E83C91',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BeriUlasanScreen;