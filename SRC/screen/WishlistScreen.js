import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { getImageUrl } from '../services/api';

const WishlistScreen = ({ navigation, wishlist, toggleWishlist }) => {
  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <FontAwesome name="heart-o" size={80} color="#FFC4C4" />
      <Text style={styles.emptyStateTitle}>Wishlist Anda Kosong</Text>
      <Text style={styles.emptyStateText}>
        Tambahkan produk favorit Anda agar tidak ketinggalan penawaran menarik!
      </Text>
      <TouchableOpacity style={styles.shopNowButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.shopNowButtonText}>Mulai Belanja</Text>
      </TouchableOpacity>
    </View>
  );

  const renderWishlistItem = ({ item }) => {
    // Dukung beberapa kemungkinan bentuk data: array 'images' dari API,
    // properti 'image' tunggal, atau fallback ke gambar lokal.
    let imageSource = require('../../assets/MiniDress.png');
    if (item.images && item.images.length > 0) {
      imageSource = { uri: getImageUrl(item.images[0].image_url) };
    } else if (item.image) {
      imageSource = typeof item.image === 'string' ? { uri: getImageUrl(item.image) } : item.image;
    }

    return (
      <View style={styles.wishlistItemContainer}>
        <Image source={imageSource} style={styles.wishlistItemImage} />
        <View style={styles.wishlistItemDetails}>
          <Text style={styles.wishlistItemName} numberOfLines={2}>{item.name}</Text>
          <Text style={styles.wishlistItemPrice}>
            {item.discount_price 
              ? `Rp ${Number(item.discount_price).toLocaleString('id-ID')}` 
              : `Rp ${Number(item.price).toLocaleString('id-ID')}`}
          </Text>
        </View>
        <TouchableOpacity onPress={() => toggleWishlist(item)} style={styles.removeButton}>
          <Feather name="trash-2" size={20} color="#D9534F" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wishlist Saya ({wishlist.length})</Text>
      </View>

      <FlatList
        data={wishlist}
        keyExtractor={(item) => item.id}
        renderItem={renderWishlistItem}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={renderEmptyState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F8F6' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingTop: 50, paddingBottom: 15, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backButton: { padding: 5, marginRight: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#43334C' },
  listContentContainer: { paddingVertical: 10, paddingHorizontal: 15 },
  wishlistItemContainer: { flexDirection: 'row', backgroundColor: 'white', borderRadius: 8, marginBottom: 10, padding: 10, alignItems: 'center', elevation: 1 },
  wishlistItemImage: { width: 80, height: 80, borderRadius: 8, marginRight: 15 },
  wishlistItemDetails: { flex: 1 },
  wishlistItemName: { fontSize: 15, fontWeight: '600', color: '#43334C' },
  wishlistItemPrice: { fontSize: 16, fontWeight: 'bold', color: '#E83C91', marginTop: 5 },
  removeButton: { padding: 5 },
  emptyStateContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40, marginTop: 50 },
  emptyStateTitle: { fontSize: 20, fontWeight: 'bold', color: '#43334C', marginTop: 20, textAlign: 'center' },
  emptyStateText: { fontSize: 16, color: 'rgba(67, 51, 76, 0.7)', textAlign: 'center', marginTop: 10, marginBottom: 30 },
  shopNowButton: { backgroundColor: '#E83C91', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 50 },
  shopNowButtonText: { color: '#F9F8F6', fontSize: 16, fontWeight: 'bold' },
});

export default WishlistScreen;