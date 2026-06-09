import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Data ulasan placeholder
const allReviews = [
  { id: '1', name: 'Andi B.', rating: 5, date: '20 Nov 2024', text: 'Bahannya adem banget, nyaman dipakai seharian. Warnanya juga cantik, sesuai gambar. Recommended!', avatar: 'https://i.pravatar.cc/150?u=andi' },
  { id: '2', name: 'Citra L.', rating: 4, date: '18 Nov 2024', text: 'Modelnya bagus, tapi ukurannya sedikit lebih kecil dari perkiraan. Untungnya masih muat. Pengiriman cepat.', avatar: 'https://i.pravatar.cc/150?u=citra' },
  { id: '3', name: 'Dewi S.', rating: 5, date: '15 Nov 2024', text: 'Suka banget! Pas di badan dan bikin kelihatan langsing. Mau order warna lain.', avatar: 'https://i.pravatar.cc/150?u=dewi' },
  { id: '4', name: 'Eka P.', rating: 3, date: '12 Nov 2024', text: 'Warnanya sedikit beda dari foto, lebih gelap aslinya. Tapi bahan okelah untuk harga segitu.', avatar: 'https://i.pravatar.cc/150?u=eka' },
  { id: '5', name: 'Fitri A.', rating: 5, date: '10 Nov 2024', text: 'Kualitas jahitannya rapi, bahannya jatuh. Mewah kelihatannya. Puas banget sama pembelian ini.', avatar: 'https://i.pravatar.cc/150?u=fitri' },
];

const ReviewItem = ({ review }) => {
  // Debugging URI
  console.log("IMAGE URI (ReviewItem):", review.avatar, typeof review.avatar);

  return (
    <View style={styles.reviewContainer}>
      <Image 
        source={typeof review.avatar === 'string' ? { uri: review.avatar } : review.avatar} 
        style={styles.avatar} />
    <View style={styles.reviewContent}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewerName}>{review.name}</Text>
        <Text style={styles.reviewDate}>{review.date}</Text>
      </View>
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, i) => (
          <Feather key={i} name="star" size={14} color={i < review.rating ? '#FFC107' : '#E0E0E0'} style={{ marginRight: 2 }} />
        ))}
      </View>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  </View>
  );
};

const AllReviewsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ulasan Produk</Text>
      </View>

      <FlatList
        data={allReviews}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ReviewItem review={item} />}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F8F6',
  },
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
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#43334C',
  },
  listContainer: {
    paddingVertical: 10,
  },
  reviewContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  reviewContent: {
    flex: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#43334C',
  },
  reviewDate: {
    fontSize: 12,
    color: 'grey',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  reviewText: {
    fontSize: 14,
    color: '#616161',
    lineHeight: 20,
  },
});

export default AllReviewsScreen;