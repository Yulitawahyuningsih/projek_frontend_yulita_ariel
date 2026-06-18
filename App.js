import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert } from 'react-native';
import SplashScreen from './SRC/screen/SplashScreen'; // Impor SplashScreen yang baru
import OnboardingSlideThree from './SRC/screen/OnboardingSlideThree';
import LoginScreen from './SRC/screen/LoginScreen';

import RegisterScreen from './SRC/screen/RegisterScreen';
import ForgotPasswordScreen from './SRC/screen/ForgotPasswordScreen';
import GoogleAuthTransitionScreen from './SRC/screen/GoogleAuthTransitionScreen';
import FacebookAuthLoadingScreen from './SRC/screen/FacebookAuthLoadingScreen';

import HomeScreen from './SRC/screen/HomeScreen';
import ProductDetailScreen from './SRC/screen/ProductDetailScreen';
import CartScreen from './SRC/screen/CartScreen';
import NotificationScreen from './SRC/screen/NotificationScreen';
import ProfileScreen from './SRC/screen/ProfileScreen';
import WishlistScreen from './SRC/screen/WishlistScreen';
import PromoScreen from './SRC/screen/PromoScreen';
import PesananSayaScreen from './SRC/screen/pesanansaya';
import OrderDetailScreen from './SRC/screen/OrderDetailScreen';
import ShippingAddressScreen from './SRC/screen/ShippingAddressScreen';
import PaymentHistoryScreen from './SRC/screen/metodepembayaran';
import MyVouchersScreen from './SRC/screen/Voucersaya';
import PusatBantuanScreen from './SRC/screen/pusatbantuan';
import TambahKartuBaruScreen from './SRC/screen/tambahkartubaru';
import PetunjukPenggunaanScreen from './SRC/screen/PetunjukPenggunaanScreen';
import SettingsScreen from './SRC/screen/pengaturan';
import AllReviewsScreen from './SRC/screen/AllReviewsScreen';
import ChatScreen from './SRC/screen/ChatScreen';
import ChangePasswordScreen from './SRC/screen/ChangePasswordScreen';
import DeleteAccountConfirmationScreen from './SRC/screen/DeleteAccountConfirmationScreen';
import LegalPolicyScreen from './SRC/screen/LegalPolicyScreen';
import LanguageSelectionScreen from './SRC/screen/LanguageSelectionScreen';
import ThemeSelectionScreen from './SRC/screen/ThemeSelectionScreen';
import MemilihSaatCheckoutScreen from './SRC/screen/memilihsaatcheckout'; // Import the payment selection screen
import OrderConfirmationScreen from './SRC/screen/OrderConfirmationScreen'; // Import the order confirmation screen
import AddEditAddressScreen from './SRC/screen/AddEditAddressScreen';
import BeriUlasanScreen from './SRC/screen/BeriUlasanScreen';
import { addAddress, updateAddress } from './SRC/services/addressService';

const Stack = createStackNavigator();

const AppNavigator = ({ cartItems, wishlist, toggleWishlist, addresses, handleSaveAddress, onAddToCart, onUpdateCartQuantity, onRemoveFromCart, onGoToAddress }) => {
  // State untuk Wishlist
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingSlideThree} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
	      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="GoogleAuthTransition" component={GoogleAuthTransitionScreen} />
        <Stack.Screen name="FacebookAuthLoading" component={FacebookAuthLoadingScreen} />
        <Stack.Screen name="AddPaymentMethod" component={TambahKartuBaruScreen} />
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} cartItems={cartItems} wishlist={wishlist} toggleWishlist={toggleWishlist} />}
        </Stack.Screen>
        <Stack.Screen name="ProductDetail">
          {props => <ProductDetailScreen {...props} cartItems={cartItems} onAddToCart={onAddToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />}
        </Stack.Screen>
        <Stack.Screen name="Cart">
          {props => <CartScreen 
            {...props} 
            cartItems={cartItems} 
            onUpdateQuantity={onUpdateCartQuantity}
            onRemoveItem={onRemoveFromCart} 
            addresses={addresses}
            onGoToAddress={() => onGoToAddress(props.navigation)} />}
        </Stack.Screen>
        <Stack.Screen name="Notifications" component={NotificationScreen} />
        <Stack.Screen name="Profile">
          {props => <ProfileScreen {...props} cartItems={cartItems} addresses={addresses} />}
        </Stack.Screen>
        <Stack.Screen name="Wishlist">
          {props => <WishlistScreen {...props} cartItems={cartItems} wishlist={wishlist} toggleWishlist={toggleWishlist} />}
        </Stack.Screen>
        <Stack.Screen name="Promo">
          {props => <PromoScreen {...props} cartItems={cartItems} />}
        </Stack.Screen>
        <Stack.Screen name="MyOrders">
          {props => <PesananSayaScreen {...props} cartItems={cartItems} />}
        </Stack.Screen>
        <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
        <Stack.Screen name="ShippingAddress">
          {props => <ShippingAddressScreen 
            {...props} 
            onSaveAddress={handleSaveAddress}
            onConfirm={(selectedId, selectedCartItems, isBuyNow) => {
            props.navigation.navigate('SelectPaymentMethod', {
                    cartItems: selectedCartItems,
                    addressId: selectedId,
                    isBuyNow: isBuyNow || false,  // <-- tambahkan ini
                  });
            }}
          />}
        </Stack.Screen>
        <Stack.Screen name="PaymentHistory" component={PaymentHistoryScreen} />
        <Stack.Screen name="MyVouchers" component={MyVouchersScreen} />
        <Stack.Screen name="PusatBantuan" component={PusatBantuanScreen} />
        <Stack.Screen name="PetunjukPenggunaan" component={PetunjukPenggunaanScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="AllReviews" component={AllReviewsScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
        <Stack.Screen name="DeleteAccountConfirmationScreen" component={DeleteAccountConfirmationScreen} />
        <Stack.Screen name="LegalPolicy" component={LegalPolicyScreen} />
        <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} />
        <Stack.Screen name="ThemeSelectionScreen" component={ThemeSelectionScreen} />
        <Stack.Screen name="BeriUlasan" component={BeriUlasanScreen} />
        <Stack.Screen name="AddEditAddress">
          {props => <AddEditAddressScreen 
            {...props}
            onSaveAddress={handleSaveAddress}
          />}
        </Stack.Screen>
        <Stack.Screen name="SelectPaymentMethod">
          {props => <MemilihSaatCheckoutScreen
            {...props}
            cartItems={props.route.params?.cartItems || []}
            addressId={props.route.params?.addressId}
            isBuyNow={props.route.params?.isBuyNow || false}
            onBack={() => props.navigation.goBack()} 
            onPayNow={() => {
              props.navigation.navigate('OrderConfirmation');
            }}
          />}
        </Stack.Screen>
        <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      label: 'Rumah',
      recipientName: 'Yulita',
      phone: '0812-3456-7890',
      fullAddress: 'Jl. Merdeka No. 45, Kel. Cihapit, Kec. Bandung Wetan, Kota Bandung, Jawa Barat, 40114',
      isDefault: true,
    },
    {
      id: '2',
      label: 'Kantor',
      recipientName: 'Yulita',
      phone: '0812-3456-7890',
      fullAddress: 'Gedung Tech Tower Lt. 10, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan, 12190',
      isDefault: false,
    },
  ]);

  const toggleWishlist = (product) => {
    setWishlist(currentWishlist => {
      if (currentWishlist.some(item => item.id === product.id)) {
        return currentWishlist.filter(item => item.id !== product.id);
      } else {
        return [...currentWishlist, product];
      }
    });
  };

  const handleSaveAddress = async (addressData) => {
    try {
      let response;
      if (addressData.id) {
        response = await updateAddress(addressData.id, addressData);
      } else {
        response = await addAddress(addressData);
      }

      // Update state lokal agar komponen lain (Cart, Profile) ikut terupdate
      const savedAddress = response.data || addressData;
      setAddresses(currentAddresses => {
        const index = currentAddresses.findIndex(addr => addr.id === savedAddress.id);
        if (index > -1) {
          const updated = [...currentAddresses];
          updated[index] = savedAddress;
          return updated;
        }
        return [savedAddress, ...currentAddresses];
      });

      console.log("Alamat berhasil disimpan ke API");
    } catch (error) {
      Alert.alert("Gagal", "Gagal menyimpan alamat ke server");
    }
  };

  useEffect(() => {
   
    setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Splash screen akan tampil selama 2.5 detik
  }, []);

  const handleAddToCart = (product) => {
    if (isLoading) return; // Mencegah aksi selama splash screen aktif

    // Untuk kesederhanaan, kita akan membuat ID unik berdasarkan produk, warna, dan ukuran
    const cartItemId = `${product.id}-${product.selectedColor}-${product.selectedSize}`;
    
    const existingItem = cartItems.find(item => item.cartId === cartItemId);

    if (existingItem) {
      // Jika item sudah ada, perbarui jumlahnya
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.cartId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      console.log(`${product.name} quantity updated in cart.`);
    } else {
      // Jika item baru, tambahkan ke keranjang
      const newItem = { ...product, cartId: cartItemId, quantity: 1 };
      setCartItems(prevItems => [...prevItems, newItem]);
      console.log(`${product.name} telah ditambahkan ke keranjang!`);
    }
  };

  const handleUpdateCartQuantity = (cartId, newQuantity) => {
    if (newQuantity < 1) {
      // Jika jumlah kurang dari 1, hapus item
      handleRemoveFromCart(cartId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.cartId === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveFromCart = (cartId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartId !== cartId));
    console.log(`Item dengan cartId: ${cartId} telah dihapus.`);
  };

  const handleGoToAddress = (navigation) => {
    navigation.navigate('ShippingAddress', {
      // Teruskan data yang mungkin dibutuhkan layar alamat
      // misalnya, dari mana navigasi berasal
      source: 'Cart'
    });
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
     <AppNavigator 
       cartItems={cartItems} 
       onAddToCart={handleAddToCart}
       onUpdateCartQuantity={handleUpdateCartQuantity}
       onRemoveFromCart={handleRemoveFromCart}
       onGoToAddress={handleGoToAddress}
       wishlist={wishlist}
       toggleWishlist={toggleWishlist}
       addresses={addresses}
       handleSaveAddress={handleSaveAddress}
     />
  );
}
