import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  ImageBackground,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Alert } from 'react-native'; // Import Alert
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { login } from '../services/authService'; // Pastikan ini adalah authService yang benar
import { saveToken, saveUser } from '../services/storageService';
import { setAuthToken } from '../services/api';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleLoginPress = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Peringatan', 'Email dan password harus diisi.');
      return;
    }

    setIsLoading(true);
    try {
      // Panggil fungsi login dari authService
      const response = await login(email, password);
      // Simpan token dan data user
      await saveToken(response.token);
      await saveUser(response.data);
      setAuthToken(response.token);
      console.log('Login berhasil:', response.data);
      navigation.navigate('Home'); // Navigasi ke Home
    } catch (error) {
      let alertTitle = 'Login Gagal'; // Judul default untuk alert
      let displayMessage = error.message || 'Terjadi kesalahan saat login.'; // Ambil pesan error dari service

      if (displayMessage.includes('User not found')) {
        displayMessage = 'Akun Anda belum terdaftar. Silakan daftar terlebih dahulu.';
        alertTitle = 'Informasi Login'; // Judul yang lebih lembut
      } else if (
        displayMessage.includes('credentials do not match') || 
        displayMessage.includes('Unauthorized') ||
        displayMessage.includes('invalid')
      ) {
        displayMessage = 'Email dan password salah. Silakan periksa kembali.';
        alertTitle = 'Informasi Login'; // Judul yang lebih lembut
      }
      Alert.alert(alertTitle, displayMessage);
      // console.error('Login error:', error); // Dihapus sesuai permintaan
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{
      flex: 1,
      backgroundColor: '#F9F8F6',
    }}>
      <TouchableOpacity style={{
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
      }} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={26} color="#43334C" />
      </TouchableOpacity>

      {!isKeyboardVisible && (
        <ImageBackground
          source={{ uri: 'https://via.placeholder.com/400x300/F0EBE3/E83C91?text=+' }} // Ganti dengan URL gambar Anda
          style={{
            height: '35%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          resizeMode="cover"
        >
          <View style={{ alignItems: 'center' }}>
            <FontAwesome5 name="tshirt" size={40} color="#43334C" />
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: '#43334C',
              marginTop: 8,
            }}>Fashion Yulita</Text>
          </View>
        </ImageBackground>
      )}

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <View style={{ padding: 25 }}>
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold', // Meniru Arial Black
            color: '#43334C', // $TEXT_PRIMARY
            textAlign: 'center',
            marginBottom: 30,
          }}>Selamat Datang Kembali</Text>

          <TextInput
            style={{
              color: '#43334C',
              fontSize: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#FFC4C4',
              paddingVertical: 15,
              marginBottom: 20,
            }}
            placeholder="Alamat Email Anda"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={{
              color: '#43334C',
              fontSize: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#FFC4C4',
              paddingVertical: 15,
              marginBottom: 20,
            }}
            placeholder="Kata Sandi"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={{ alignSelf: 'flex-end', marginBottom: 25 }}>
            <Text style={{ color: 'rgba(67, 51, 76, 0.7)' }}>Lupa Kata Sandi?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
            backgroundColor: '#E83C91',
            paddingVertical: 15,
            borderRadius: 50,
            alignItems: 'center',
          }} onPress={handleLoginPress} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#F9F8F6" />
            ) : (
              <Text style={{ color: '#F9F8F6', fontSize: 16, fontWeight: 'bold' }}>MASUK SEKARANG</Text>
            )}
          </TouchableOpacity>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 25 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(67, 51, 76, 0.2)' }} />
            <Text style={{ marginHorizontal: 10, color: 'rgba(67, 51, 76, 0.7)' }}>Atau masuk dengan</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(67, 51, 76, 0.2)' }} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#43334C',
              marginHorizontal: 5,
            }} onPress={() => navigation.navigate('GoogleAuthTransition')}>
              <Image source={require('../../assets/Google.png')} style={{ width: 20, height: 20 }} />
              <Text style={{ color: '#43334C', marginLeft: 10, fontWeight: 'bold' }}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 12,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#43334C',
              marginHorizontal: 5,
            }} onPress={() => navigation.navigate('FacebookAuthLoading')}>
              <Image source={require('../../assets/Facebook.png')} style={{ width: 20, height: 20 }} />
              <Text style={{ color: '#43334C', marginLeft: 10, fontWeight: 'bold' }}>Facebook</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginTop: 20 }}>
            <Text style={{ textAlign: 'center', fontSize: 14, color: '#43334C' }}>
              Belum punya akun Fashion Yulita? <Text style={{ color: '#E83C91', fontWeight: 'bold' }}>Daftar Sekarang</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default LoginScreen;