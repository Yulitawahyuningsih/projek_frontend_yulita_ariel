import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Platform,
  ActivityIndicator, // Import ActivityIndicator
  Alert, // Import Alert
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { register } from '../services/authService';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Tambah state isLoading

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{
      flex: 1,
      backgroundColor: '#F9F8F6',
      padding: 20,
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5 }}>
          <AntDesign name="arrow-left" size={24} color="#43334C" />
        </TouchableOpacity>
        <Text style={{
          color: '#43334C',
          fontSize: 24,
          fontWeight: 'bold',
          marginLeft: 15,
        }}>Daftar Akun Baru</Text>
      </View>

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TextInput
          style={{
            color: '#43334C',
            fontSize: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#FFC4C4',
            paddingVertical: 10,
            marginBottom: 25,
          }}
          placeholder="Nama Lengkap"
          value={name}
          onChangeText={setName}
          keyboardType="default"
        />
        <TextInput
          style={{
            color: '#43334C',
            fontSize: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#FFC4C4',
            paddingVertical: 10,
            marginBottom: 25,
          }}
          placeholder="Alamat Email"
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
            paddingVertical: 10,
            marginBottom: 25,
          }}
          placeholder="Buat Kata Sandi"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={{
            color: '#43334C',
            fontSize: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#FFC4C4',
            paddingVertical: 10,
            marginBottom: 25,
          }}
          placeholder="Konfirmasi Sandi"
          value={confirmPassword}
          onChangeText={setConfirm}
          secureTextEntry
        />
      </View>

      <View style={{ paddingBottom: 20 }}>
        <TouchableOpacity style={{
          backgroundColor: '#E83C91',
          paddingVertical: 15,
          borderRadius: 50,
          alignItems: 'center',
        }} onPress={async () => { // Perbaiki di sini
          if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            Alert.alert('Peringatan', 'Semua kolom harus diisi.');
            return;
          }
          setIsLoading(true);
          try {
            await register(name, email, password, confirmPassword);
            Alert.alert('Registrasi Berhasil', 'Akun Anda telah berhasil dibuat. Silakan masuk menggunakan email dan kata sandi Anda.');
            navigation.navigate('Login');
          } catch (error) {
            const errorMessage = error.message || 'Terjadi kesalahan saat registrasi.';
            Alert.alert('Registrasi Gagal', errorMessage);
            console.error('Registration error:', error);
          } finally {
            setIsLoading(false);
          }
        }} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#F9F8F6" />
          ) : (
            <Text style={{ color: '#F9F8F6', fontSize: 16, fontWeight: 'bold' }}>SELESAIKAN REGISTRASI</Text>
          )}
        </TouchableOpacity>


        <Text style={{ textAlign: 'center', fontSize: 12, color: '#43334C', marginTop: 15 }}>
          Dengan mendaftar, Anda menyetujui{' '}
          <Text style={{ textAlign: 'center', color: '#E83C91', fontWeight: 'bold' }}>Syarat dan Ketentuan</Text> Fashion Yulita.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 20 }}>
          <Text style={{ textAlign: 'center', fontSize: 14, color: '#43334C' }}>
            Sudah punya akun? <Text style={{ textAlign: 'center', color: '#E83C91', fontWeight: 'bold' }}>Masuk di sini</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
export default RegisterScreen;