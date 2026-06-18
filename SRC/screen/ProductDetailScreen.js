import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Animated,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { getProductDetail, getProductReviews } from '../services/productService';
import { addToCart, getCarts } from '../services/cartService';
import { toggleWishlist } from '../services/wishlistService';
import { getImageUrl } from '../services/api';
import ProductCard from './ProductCard';

const { width: screenWidth } = Dimensions.get('window');

const ProductDetailScreen = ({ navigation, route, cartItems = [] }) => {
  const productId = route.params?.productId ?? route.params?.product?.id;

  const [productDetail, setProductDetail] = useState(route.params?.product || null); // Gunakan data dari Home sebagai data awal agar harga konsisten
  const [reviews, setReviews] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (productId) {
      fetchProductDetail();
      fetchReviews();
    }
  }, [productId]);

  const fetchProductDetail = async () => {
    setIsLoading(true);
    try {
      const response = await getProductDetail(productId);
      if (response.success) {
        setProductDetail(response.data);
        if (response.data.variants?.length > 0) {
          setSelectedColor(response.data.variants[0].color);
          setSelectedSize(response.data.variants[0].size);
        }
      console.log('Fetched product detail:', response.data); // Log the fetched data
      }
    } catch (error) {
      Alert.alert('Error', 'Gagal memuat detail produk');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await getProductReviews(productId);
      if (response.success) setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const [activeImageIndex, setActiveImageIndex] = useState(0); // Local state for image carousel
  const scrollViewRef = useRef(); // Ref for image carousel
  const scaleAnim = useRef(new Animated.Value(1)).current; // Nilai animasi untuk tombol

  // Logika untuk mendapatkan daftar gambar yang akan ditampilkan di carousel
  const getProductImages = () => {
    // 1. Cek jika ada array 'images' (biasanya dari API detail)
    if (productDetail?.images && productDetail.images.length > 0) {
      return productDetail.images.map(img => 
        typeof img === 'string' ? { uri: getImageUrl(img) } : { uri: getImageUrl(img.image_url || img.uri) }
      );
    }
    // 2. Cek jika ada property 'image' tunggal (biasanya dipassing dari navigasi list)
    if (productDetail?.image) {
      return [typeof productDetail.image === 'string' ? { uri: getImageUrl(productDetail.image) } : productDetail.image];
    }
    // 3. Fallback ke gambar lokal jika tidak ada data gambar
    return [require('../../assets/MiniDress.png')];
  };

  const productImages = getProductImages();
  console.log('Product Images for carousel:', productImages);

  // Logika untuk mendapatkan produk rekomendasi
  const recommendedProducts = [];

  // Fungsi untuk toggle status wishlist
  const handleToggleWishlist = async () => {
    try {
      const response = await toggleWishlist(productId);
      setIsWishlisted(response.is_wishlisted);
    } catch (error) {
      Alert.alert('Error', 'Gagal mengubah wishlist');
    }
  };

const handleBuyNowPress = async () => {
  const variant = productDetail?.variants?.find(
    v => v.color === selectedColor && v.size === selectedSize
  );
  if (!variant) {
    Alert.alert('Perhatian', 'Pilih warna dan ukuran terlebih dahulu');
    return;
  }

  let latestCartItems = [];
  try {
    await addToCart(productId, variant.id, 1);
    const cartResponse = await getCarts();
    latestCartItems = cartResponse.data || [];
  } catch (error) {
    Alert.alert('Error', 'Gagal menyiapkan pesanan. Silakan coba lagi.');
    return;
  }

  // Animasi saat tombol ditekan
  Animated.sequence([
    Animated.timing(scaleAnim, {
      toValue: 1.05,
      duration: 100,
      useNativeDriver: true,
    }),
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }),
  ]).start(() => {
    navigation.navigate('ShippingAddress', { cartItems: latestCartItems });
  });
};

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveImageIndex(index);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#43334C" />
      </TouchableOpacity>
      <View style={styles.headerIcons}>
        {/* Tombol Wishlist (Hati) */}
        <TouchableOpacity onPress={handleToggleWishlist} style={styles.headerIcon}>
          <FontAwesome
            name={isWishlisted ? "heart" : "heart-o"}
            size={22}
            color={isWishlisted ? "#E83C91" : "#43334C"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <View>
            <Feather name="shopping-bag" size={24} color="#43334C" />
            {cartItems.length > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderImageCarousel = () => (
    <View style={styles.carouselContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollViewRef}
      >
        {productImages.map((img, index) => (
          <Image key={index} source={img} style={styles.productImage} />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {productImages.length > 1 && productImages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              activeImageIndex === index && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );

  const renderVariantSelectors = () => (
    <View style={styles.variantSection}>
      {/* Pilihan Warna */}
      <Text style={styles.variantLabel}>Warna:</Text>
      <View style={styles.colorSelector}>
        {[...new Set(productDetail?.variants?.map(v => v.color))].map((color) => {
          const variant = productDetail?.variants?.find(v => v.color === color);
          return (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorCircle,
                { backgroundColor: variant?.color_hex || '#ccc' },
                selectedColor === color && styles.selectedColorCircle,
              ]}
              onPress={() => setSelectedColor(color)}
            />
          );
        })}
      </View>

      {/* Pilihan Ukuran */}
      <Text style={styles.variantLabel}>Ukuran:</Text>
      <View style={styles.sizeSelector}>
        {[...new Set(productDetail?.variants?.map(v => v.size))].map((size) => (
          <TouchableOpacity
            key={size}
            style={[styles.sizeChip, selectedSize === size && styles.selectedSizeChip]}
            onPress={() => setSelectedSize(size)}
          >
            <Text style={[styles.sizeChipText, selectedSize === size && styles.selectedSizeChipText]}>
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {renderHeader()}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Area Non-Scrollable (secara visual) */}
          {isLoading && <ActivityIndicator size="large" color="#E83C91" style={{ marginTop: 20 }} />}
          {renderImageCarousel()}
          <View style={styles.infoSection}>
            <Text style={styles.productName}>{productDetail?.name}</Text>
            <Text style={styles.productPrice}>
              {productDetail?.discount_price
                ? `Rp ${Number(productDetail.discount_price).toLocaleString('id-ID')}`
                : `Rp ${Number(productDetail?.price).toLocaleString('id-ID')}`
              }
            </Text>
          </View>

          {renderVariantSelectors()}

          <View style={styles.divider} />

          {/* Konten Gulir */}
          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Detail Produk</Text>
            <Text style={styles.detailText}>
              Bahan: Katun Premium{'\n'}
              Panjang: 90cm (Ukuran M){'\n'}
              Instruksi Perawatan: Cuci dengan mesin putaran rendah, jangan gunakan pemutih.{'\n'}
              Asal Produk: Indonesia
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.reviewSection}>
            <View style={styles.reviewHeader}>
              <Text style={styles.sectionTitle}>Ulasan ({reviews.length})</Text>
              <View style={styles.rating}>
                <FontAwesome name="star" size={16} color="#FFC107" />
                <Text style={styles.ratingText}>4.8/5</Text>
              </View>
            </View>
            {/* Grafik batang bisa ditambahkan di sini */}
            <TouchableOpacity onPress={() => navigation.navigate('AllReviews')}>
              <Text style={styles.seeAllReviews}>Lihat Semua Ulasan</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.recommendationSection}>
            <Text style={styles.sectionTitle}>Rekomendasi untuk Anda</Text>
            <FlatList
              horizontal
              data={recommendedProducts}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={{ width: screenWidth / 2.2, marginRight: 15 }}>
                  <ProductCard
                    item={item}
                    onPress={() => navigation.push('ProductDetail', { product: item })}
                  />
                </View>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>

        </ScrollView>

        {/* Navigasi Bawah (Sticky Action Bar) */}
        <View style={styles.stickyActionBar}>
          <TouchableOpacity 
            style={styles.addToCartButton} 
            onPress={async () => {
              try {
                const variant = productDetail?.variants?.find(
                  v => v.color === selectedColor && v.size === selectedSize
                );
                if (!variant) {
                  Alert.alert('Perhatian', 'Pilih warna dan ukuran terlebih dahulu');
                  return;
                }
                await addToCart(productId, variant.id, 1);
                Alert.alert('Berhasil', 'Produk ditambahkan ke keranjang');
              } catch (error) {
                Alert.alert('Error', 'Gagal menambahkan ke keranjang');
              }
            }}
          >
            <Text style={styles.addToCartButtonText}>Tambah ke Keranjang</Text>
          </TouchableOpacity>
          <Animated.View style={{ flex: 1, transform: [{ scale: scaleAnim }] }}>
            <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNowPress}>
              <Text style={styles.buyNowButtonText}>Beli Sekarang</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 30, // Menambahkan padding atas untuk Android
    paddingVertical: 10,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerIcon: {
    marginRight: 15,
  },
  cartBadge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#E83C91',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  carouselContainer: {
    height: screenWidth, // Membuat carousel menjadi persegi
  },
  productImage: {
    width: screenWidth,
    height: screenWidth,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#43334C',
  },
  scrollContent: {
    paddingBottom: 100, // Memberi ruang agar tidak tertutup action bar
  },
  infoSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  productName: {
    fontSize: 24,
    // fontFamily: 'Arial Black', // Pastikan font ini sudah di-load di project Anda
    fontWeight: '900',
    color: '#43334C',
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E83C91',
    marginTop: 8,
  },
  variantSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  variantLabel: {
    fontSize: 16,
    color: '#43334C',
    marginBottom: 10,
  },
  colorSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedColorCircle: {
    borderWidth: 2,
    borderColor: '#E83C91',
  },
  sizeSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sizeChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BDBDBD',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedSizeChip: {
    backgroundColor: '#FFC4C4',
    borderColor: '#E83C91',
  },
  sizeChipText: {
    fontSize: 14,
    color: '#43334C',
  },
  selectedSizeChipText: {
    fontWeight: 'bold',
  },
  divider: {
    height: 8,
    backgroundColor: '#F5F5F5',
    marginVertical: 20,
  },
  detailsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#43334C',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 14,
    // fontFamily: 'Bahnschrift', // Pastikan font ini sudah di-load
    lineHeight: 22,
    color: '#616161',
  },
  reviewSection: {
    paddingHorizontal: 20,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  seeAllReviews: {
    color: '#E83C91',
    fontWeight: 'bold',
    marginTop: 10,
  },
  recommendationSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  stickyActionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 25, // Menambah padding bawah agar tidak terlalu mepet
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  addToCartButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#E83C91',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginRight: 10,
  },
  addToCartButtonText: {
    color: '#43334C',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: '#E83C91',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  buyNowButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProductDetailScreen;