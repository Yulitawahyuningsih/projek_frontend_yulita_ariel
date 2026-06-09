import React, { useEffect } from 'react';
import { Text, View, ActivityIndicator, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FacebookAuthLoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Simulasi proses otentikasi Facebook selama 2 detik
    const timer = setTimeout(() => {
      // Setelah selesai, navigasi langsung ke HomeScreen (halaman produk)
      navigation.navigate('Home');
    }, 2000);

    return () => clearTimeout(timer); // Membersihkan timer jika komponen di-unmount
  }, [navigation]);

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#F9F8F6', // $BG_PRIMARY
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
    }}>
      {/* Top Brand Logo */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
      }}>
        <FontAwesome5 name="tshirt" size={20} color="#43334C" />
        <Text style={{
          color: '#43334C', // $TEXT_PRIMARY
          fontSize: 16,
          fontWeight: 'bold',
          marginLeft: 8,
        }}>Fashion Yulita</Text>
      </View>

      {/* Main Content */}
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      }}>
        <Image source={require('../../assets/Facebook.png')} style={{ width: 60, height: 60, resizeMode: 'contain' }} />
        <Text style={{
          color: '#43334C', // $TEXT_PRIMARY
          fontSize: 22,
          fontWeight: 'bold',
          textAlign: 'center',
          marginTop: 30,
        }}>Menghubungkan ke Facebook</Text>
        <Text style={{
          color: 'rgba(67, 51, 76, 0.7)', // $TEXT_PRIMARY with opacity
          fontSize: 14,
          textAlign: 'center',
          marginTop: 15,
          lineHeight: 21,
        }}>
          Kami akan menggunakan laman resmi Facebook untuk proses otentikasi yang aman dan terjamin. Anda akan segera dialihkan.
        </Text>
        <ActivityIndicator size="large" color="#E83C91" style={{ marginTop: 40 }} />
      </View>

      {/* Empty view for spacing */}
      <View style={{ height: 60 }} />
    </View>
  );
};

export default FacebookAuthLoadingScreen;