import React, { useState } from 'react'; // Import useState
import { NavigationContainer } from '@react-navigation/native'; // NavigationContainer sudah ada
import { createStackNavigator } from '@react-navigation/stack';

// Import semua screen yang ada
import AllReviewsScreen from '../screen/AllReviewsScreen';
import AddEditAddressScreen from '../screen/AddEditAddressScreen';
import TambahKartuBaruScreen from '../screen/tambahkartubaru';
import AddressScreen from '../screen/AddressScreen';
import AuthLoadingScreen from '../screen/AuthLoadingScreen';
import CartScreen from '../screen/CartScreen';
import ChatScreen from '../screen/ChatScreen';
import ChangePasswordScreen from '../screen/ChangePasswordScreen';
import DeleteAccountConfirmationScreen from '../screen/DeleteAccountConfirmationScreen';
import EmailSentModal from '../screen/EmailSentModal';
import FacebookAuthLoadingScreen from '../screen/FacebookAuthLoadingScreen';
import ForgotPasswordScreen from '../screen/ForgotPasswordScreen'; 
import FAQListScreen from '../screen/FAQListScreen';
import PusatBantuanScreen from '../screen/pusatbantuan';
import LegalPolicyScreen from '../screen/LegalPolicyScreen'; // Impor layar baru
import LanguageSelectionScreen from '../screen/LanguageSelectionScreen';
import GoogleAuthTransitionScreen from '../screen/GoogleAuthTransitionScreen';
import HomeScreen from '../screen/HomeScreen';
import LoginScreen from '../screen/LoginScreen';
import VoucersayaScreen from '../screen/Voucersaya.js';
import NotificationScreen from '../screen/NotificationScreen';
import OrderConfirmationScreen from '../screen/OrderConfirmationScreen';
import OnboardingSlideThree from '../screen/OnboardingSlideThree';
import BeriUlasanScreen from '../screen/BeriUlasanScreen'; // Impor BeriUlasanScreen
import OrderDetailScreen from '../screen/OrderDetailScreen';
import MetodePembayaranScreen from '../screen/metodepembayaran';
import PesananSayaScreen from '../screen/pesanansaya';
import MemilihSaatCheckoutScreen from '../screen/memilihsaatcheckout';
import ProductDetailScreen from '../screen/ProductDetailScreen';
import ProfileScreen from '../screen/ProfileScreen';
import PromoScreen from '../screen/PromoScreen';
import RegisterScreen from '../screen/RegisterScreen'; 
import ShippingAddressScreen from '../screen/ShippingAddressScreen';
import PengaturanScreen from '../screen/pengaturan.js';
import ThemeSelectionScreen from '../screen/ThemeSelectionScreen';
import WishlistScreen from '../screen/WishlistScreen';
import PetunjukPenggunaanScreen from '../screen/PetunjukPenggunaanScreen.js';

const Stack = createStackNavigator();

const AppNavigator = ({ cartItems, onAddToCart, onUpdateCartQuantity, onRemoveFromCart, onGoToAddress }) => {
  const [wishlist, setWishlist] = useState([]);
  const [addresses, setAddresses] = useState([ // Global addresses state
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
        // Remove from wishlist
        return currentWishlist.filter(item => item.id !== product.id);
      } else {
        // Add to wishlist
        return [...currentWishlist, product];
      }
    });
  };
  
  // Fungsi untuk menambah/mengedit alamat
  const handleAddEditAddress = (newAddress) => {
    setAddresses(currentAddresses => {
      // Jika alamat sudah ada (edit), update
      if (newAddress.id && currentAddresses.some(addr => addr.id === newAddress.id)) {
        return currentAddresses.map(addr => addr.id === newAddress.id ? newAddress : addr);
      } else {
        // Jika alamat baru, tambahkan dengan ID unik
        const newId = (Math.max(...currentAddresses.map(addr => parseInt(addr.id)), 0) + 1).toString();
        return [...currentAddresses, { ...newAddress, id: newId }];
      }
    });
    console.log("Alamat berhasil disimpan/diperbarui:", newAddress);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="OnboardingThree"
        screenOptions={{
          headerShown: false // Menyembunyikan header default untuk semua screen
        }}
      >
        <Stack.Screen name="OnboardingThree" component={OnboardingSlideThree} />

        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <Stack.Screen name="FacebookAuthLoading" component={FacebookAuthLoadingScreen} />
        <Stack.Screen name="GoogleAuthTransition" component={GoogleAuthTransitionScreen} />
        <Stack.Screen name="EmailSent" component={EmailSentModal} />

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
        <Stack.Screen name="Wishlist">
          {props => <WishlistScreen {...props} cartItems={cartItems} wishlist={wishlist} toggleWishlist={toggleWishlist} />}
        </Stack.Screen>
        <Stack.Screen name="Notifications" component={NotificationScreen} />
        <Stack.Screen name="Promo">
          {props => <PromoScreen {...props} cartItems={cartItems} />}
        </Stack.Screen>
        <Stack.Screen name="AllReviews" component={AllReviewsScreen} />

        <Stack.Screen name="Profile">
          {props => <ProfileScreen {...props} cartItems={cartItems} />}
        </Stack.Screen>
        <Stack.Screen name="PetunjukPenggunaan" component={PetunjukPenggunaanScreen} />
        <Stack.Screen name="Settings" component={PengaturanScreen} />
        <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
        <Stack.Screen name="DeleteAccountConfirmationScreen" component={DeleteAccountConfirmationScreen} />
        <Stack.Screen name="MyOrders" component={PesananSayaScreen} />


        <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
        <Stack.Screen name="BeriUlasan" component={BeriUlasanScreen} />
        <Stack.Screen name="Address" component={AddressScreen} />
        <Stack.Screen name="AddEditAddress">
          {props => <AddEditAddressScreen {...props} onSaveAddress={handleAddEditAddress} onBack={() => props.navigation.goBack()} />}
        </Stack.Screen>
        <Stack.Screen name="PaymentHistory" component={MetodePembayaranScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="AddPaymentMethod" component={TambahKartuBaruScreen} /> 
        <Stack.Screen name="PusatBantuan" component={PusatBantuanScreen} />
        <Stack.Screen name="FAQList" component={FAQListScreen} />
        <Stack.Screen name="LegalPolicy" component={LegalPolicyScreen} />
        <Stack.Screen name="LanguageSelectionScreen" component={LanguageSelectionScreen} />
        <Stack.Screen name="ThemeSelectionScreen" component={ThemeSelectionScreen} />
        <Stack.Screen name="MyVouchers" component={VoucersayaScreen} />
        <Stack.Screen name="ProductListScreen">
          {props => <ProductListScreen {...props} wishlist={wishlist} toggleWishlist={toggleWishlist} />}
        </Stack.Screen>

        <Stack.Screen name="ShippingAddress">
          {props => (
            <ShippingAddressScreen
              {...props} addresses={addresses} // Teruskan addresses dari state global
              onBack={() => props.navigation.goBack()}
              onAddNew={() => props.navigation.navigate('AddEditAddress')}
              onConfirm={(selectedAddressId) => props.navigation.navigate('PaymentMethod', { addressId: selectedAddressId })}
              onEdit={(address) => props.navigation.navigate('AddEditAddress', { address: address })}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="PaymentMethod">
          {props => (
            <MemilihSaatCheckoutScreen
              {...props}
              onPayNow={() => props.navigation.navigate('OrderConfirmation')}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

/*
CATATAN PENTING:

1.  Instalasi Library:
    Pastikan Anda sudah menginstal semua library yang dibutuhkan oleh React Navigation. Jika belum, jalankan perintah ini di terminal Anda:

    npm install @react-navigation/native @react-navigation/stack
    expo install react-native-screens react-native-safe-area-context

2.  Struktur Navigasi:
    - Kode di atas menggunakan `StackNavigator` tunggal untuk kesederhanaan.
    - Untuk aplikasi nyata, sangat disarankan untuk memisahkan alur navigasi. Contohnya:
      - Satu `StackNavigator` untuk Onboarding.
      - Satu `StackNavigator` untuk Otentikasi (Login, Register, dll).
      - Satu `BottomTabNavigator` untuk layar utama (Home, Wishlist, Promo, Profile).
      - Satu `StackNavigator` utama yang akan menampilkan stack Onboarding, Otentikasi, atau Tab Navigator tergantung status login pengguna.

3.  Cara Menggunakan:
    - Impor `AppNavigator` ini di file utama aplikasi Anda (biasanya `App.js`).
    - Render komponen `<AppNavigator />` di dalam `App.js`.

    Contoh di App.js:

    import React from 'react';
    import AppNavigator from './SRC/routes/stack'; // Sesuaikan path jika perlu

    export default function App() {
      return <AppNavigator />;
    }

4.  Navigasi Antar Layar:
    - Di dalam komponen layar Anda (misalnya `LoginScreen`), React Navigation akan otomatis memberikan prop `navigation`.
    - Gunakan `navigation.navigate('NamaLayar')` untuk berpindah.

    Contoh di LoginScreen.js:

    const LoginScreen = ({ navigation }) => {
      const handleLoginSuccess = () => {
        // Alih-alih memanggil prop onLoginSuccess, kita navigasi langsung
        navigation.navigate('Home'); 
      };

      const onRegister = () => {
        navigation.navigate('Register');
      }

      // ... sisa kode Anda
    };

*/