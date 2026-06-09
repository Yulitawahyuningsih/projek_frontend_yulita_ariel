import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ProductCard from './ProductCard'; // Ensure ProductCard is imported
import { allProducts } from '../routes/products'; // Import allProducts

const ProductListScreen = ({ navigation, wishlist, toggleWishlist }) => { // Receive wishlist and toggleWishlist as props
  // Use allProducts from the imported data
  const displayedProducts = allProducts;

  // The local wishlist state and toggleWishlist function are no longer needed here
  // as they are managed globally in AppNavigator and passed as props.
  // const [wishlist, setWishlist] = useState([]);

  // Remove the local toggleWishlist function as it's now passed from AppNavigator
  // const toggleWishlist = (product) => {
  //   setWishlist(currentWishlist => {
  //     if (currentWishlist.some(item => item.id === product.id)) {
  //       return currentWishlist.filter(item => item.id !== product.id);
  //     } else {
  //       return [...currentWishlist, product];
  //     }
  //   });
  // };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Koleksi Pilihan</Text>
      </View>

      {/* Grid Produk */}
      <FlatList // Use allProducts or a filtered version
        data={displayedProducts}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
            onToggleWishlist={() => toggleWishlist(item)}
            isWishlisted={wishlist.some(wishlistItem => wishlistItem.id === item.id)}
          />
        )}
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
    paddingHorizontal: 10,
    paddingTop: 15,
    paddingBottom: 20,
  },
});

export default ProductListScreen;