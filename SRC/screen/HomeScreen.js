import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome5, Feather, Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Alert } from 'react-native'; // Import ActivityIndicator and Alert
import { getProducts, getCategories } from '../services/productService'; // Import the API service
import ProductCard from './ProductCard';
 
const HomeScreen = ({ navigation, wishlist = [], toggleWishlist = () => {} }) => { // Menerima wishlist dan toggleWishlist dari props
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); // Ubah inisialisasi menjadi null
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCategories(); // Ambil kategori terlebih dahulu
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      if (response.success && Array.isArray(response.data)) {
        setCategories(response.data);
        if (response.data.length > 0) {
          setActiveCategory(response.data[0]); // Set kategori pertama sebagai aktif
        }
      }
    } catch (error) {
      // console.error('Error fetching categories:', error); // Dihapus sesuai permintaan
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getProducts();
      if (response.success && Array.isArray(response.data.data)) { // Akses array produk melalui response.data.data
        setProducts(response.data.data);
      } else {
        // Jika API tidak sukses atau data bukan array, set products ke array kosong
        setProducts([]);
        Alert.alert('Error', 'Gagal memuat produk atau format data tidak valid.');
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat produk.');
      // console.error('Error fetching products:', error); // Dihapus sesuai permintaan
      setProducts([]); // Pastikan products tetap array saat terjadi error
    } finally {
      setIsLoading(false);
    }
  };

  // Perbaiki filter kategori
  const displayedProducts = activeCategory
    ? products.filter(p => p.category_id === activeCategory.id)
    : products; // Jika tidak ada kategori aktif, tampilkan semua produk

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 45, // Safe area
        paddingBottom: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <FontAwesome5 name="tshirt" size={20} color="#43334C" />
          <Text style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#43334C',
            marginLeft: 8,
          }}>Fashion Yulita</Text>
        </View>
        <View style={{
          flexDirection: 'row',
        }}>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}><Feather name="bell" size={24} color="#43334C" style={{ marginLeft: 20 }} /></TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}><Feather name="shopping-bag" size={24} color="#43334C" style={{ marginLeft: 20 }} /></TouchableOpacity>
        </View>
      </View>

      {/* Search Bar (Sticky) */}
      <View style={{
        backgroundColor: 'white',
        paddingBottom: 15,
        paddingHorizontal: 15,
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 50, // Capsule shape
          borderWidth: 1,
          borderColor: '#FFC4C4', // $PALE_PINK
          paddingHorizontal: 15,
        }}>
            <Feather name="search" size={20} color="#43334C" />
            <TextInput
              style={{
                flex: 1,
                paddingVertical: 12,
                marginLeft: 10,
                fontSize: 14,
              }}
              placeholder="Cari Baju Wanita, Dress, atau Aksesori..."
            />
        </View>
      </View>

      {isLoading && <ActivityIndicator size="large" color="#E83C91" style={{ marginTop: 20 }} />}

      <FlatList
        data={displayedProducts}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <>
            {/* Promotion Banner */}
            <View style={styles.sectionContainer}>
              <Image
                source={require('../../assets/iklan1.png')}
                style={styles.promoBanner}
              />
            </View>

            {/* Categories */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Belanja Berdasarkan Kategori</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoryChip,
                      activeCategory?.id === category.id && styles.activeCategoryChip,
                    ]}
                    onPress={() => setActiveCategory(category)}
                  >
                    <Text style={[
                      styles.categoryChipText,
                      activeCategory?.id === category.id && styles.activeCategoryChipText,
                    ]}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* New Products Title */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Baru Tiba!</Text>
            </View>
          </>
        }
        contentContainerStyle={styles.flatListContentContainer}
        renderItem={({ item }) => (
          <ProductCard
            item={item} // Sekarang ProductCard akan memformat sendiri
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
            onToggleWishlist={() => toggleWishlist(item)}
            isWishlisted={wishlist.some(wishlistItem => wishlistItem.id === item.id)}
          />
        )}
      />

      {/* Bottom Tab Navigator - Ini harusnya di luar FlatList */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: 'white',
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
      }}>
        {/* Home (Active) */}
        <TouchableOpacity style={{ alignItems: 'center', flex: 1 }}>
          <FontAwesome5 name="home" size={24} color="#E83C91" />
          <Text style={[{
            fontSize: 10,
            color: '#43334C', // $TEXT_PRIMARY
            marginTop: 4,
          }, { color: '#E83C91' }]}>Home</Text>
        </TouchableOpacity>

        {/* Promo (Inactive) */}
        <TouchableOpacity style={{ alignItems: 'center', flex: 1 }} onPress={() => navigation.navigate('Promo')}>
          <Feather name="tag" size={24} color="#43334C" />
          <Text style={{ fontSize: 10, color: '#43334C', marginTop: 4 }}>Promo</Text>
        </TouchableOpacity>

        {/* Heart/Wishlist (Inactive) */}
        <TouchableOpacity style={{ alignItems: 'center', flex: 1 }} onPress={() => navigation.navigate('Wishlist')}>
          <Feather name="heart" size={24} color="#43334C" />
          <Text style={{ fontSize: 10, color: '#43334C', marginTop: 4 }}>Wishlist</Text>
        </TouchableOpacity>

        {/* Profile (Inactive) */}
        <TouchableOpacity style={{ alignItems: 'center', flex: 1 }} onPress={() => navigation.navigate('Profile')}>
          <Feather name="user" size={24} color="#43334C" />
          <Text style={{ fontSize: 10, color: '#43334C', marginTop: 4 }}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F8F6', // $BG_PRIMARY
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 45, // Safe area
    paddingBottom: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerBrand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBrandText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#43334C',
    marginLeft: 8,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginLeft: 20,
  },
  searchBarContainer: {
    backgroundColor: 'white',
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50, // Capsule shape
    borderWidth: 1,
    borderColor: '#FFC4C4', // $PALE_PINK
    paddingHorizontal: 15,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 10,
    fontSize: 14,
  },
  flatListContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20, // Memberi ruang di bawah FlatList
  },
  sectionContainer: {
    marginHorizontal: 5, // Sesuaikan dengan paddingHorizontal FlatList
    marginBottom: 20,
  },
  promoBanner: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#43334C',
    marginBottom: 15,
  },
  categoryChip: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#FFC4C4', // $PALE_PINK
  },
  activeCategoryChip: {
    backgroundColor: '#E83C91', // $ACCENT_CTA
    borderColor: '#E83C91',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#43334C',
  },
  activeCategoryChipText: {
    color: '#F9F8F6', // $TEXT_ON_CTA
    fontWeight: 'bold',
  },
});

export default HomeScreen;
