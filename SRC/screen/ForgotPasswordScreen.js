import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import EmailSentModal from './EmailSentModal';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSendLink = () => {
    setError('');
    // Simple email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Format email tidak valid.');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Simulate success
      setIsModalVisible(true);
      // Simulate error
      // setError('Email tidak terdaftar.');
    }, 2000);
  };

  const handleModalDismiss = () => {
    setIsModalVisible(false);
    navigation.navigate('Login'); // Navigate back to Login
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{
      flex: 1,
      backgroundColor: '#F9F8F6',
      padding: 20,
      justifyContent: 'space-between',
    }}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={{ marginTop: 30, alignSelf: 'flex-start' }} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>

        <View style={{
          alignItems: 'center',
          marginTop: 40,
          marginBottom: 60,
        }}>
          <FontAwesome5 name="lock" size={40} color="#43334C" />
          <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            color: '#43334C',
            marginTop: 20,
            marginBottom: 10,
          }}>Lupa Kata Sandi?</Text>
          <Text style={{
            fontSize: 16,
            color: 'rgba(67, 51, 76, 0.7)',
            textAlign: 'center',
            paddingHorizontal: 20,
          }}>
            Masukkan alamat email yang terdaftar. Kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda.
          </Text>
        </View>

        <TextInput
          style={[{
            color: '#43334C',
            fontSize: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#FFC4C4',
            paddingVertical: 12,
          }, error ? { borderBottomColor: 'red' } : null]}
          placeholder="Alamat Email Terdaftar"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (error) setError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {error ? <Text style={{ color: 'red', marginTop: 5, fontSize: 12 }}>{error}</Text> : null}
      </View>

      <View style={{ paddingBottom: 20 }}>
        <TouchableOpacity style={{
          backgroundColor: '#E83C91',
          paddingVertical: 15,
          borderRadius: 50,
          alignItems: 'center',
        }} onPress={handleSendLink} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#F9F8F6" />
          ) : (
            <Text style={{ color: '#F9F8F6', fontSize: 16, fontWeight: 'bold' }}>KIRIM TAUTAN ATUR ULANG</Text>
          )}
        </TouchableOpacity>
      </View>

      <EmailSentModal visible={isModalVisible} onDismiss={handleModalDismiss} />
    </KeyboardAvoidingView>
  );
};
export default ForgotPasswordScreen;