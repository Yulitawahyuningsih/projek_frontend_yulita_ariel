import React from 'react';
import { Text, View, Modal, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const AuthLoadingScreen = ({ visible }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Overlay gelap semi-transparan
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          width: '80%',
          backgroundColor: '#F9F8F6', // $BG_PRIMARY
          borderRadius: 15,
          padding: 30,
          alignItems: 'center',
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5
        }}>
          <FontAwesome5 name="tshirt" size={50} color="#43334C" />
          <Text style={{
            color: '#43334C', // $TEXT_PRIMARY
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 25,
            marginBottom: 8,
          }}>Mempersiapkan sesi Anda...</Text>
          <Text style={{
            color: 'rgba(67, 51, 76, 0.7)', // $TEXT_PRIMARY with opacity
            fontSize: 14,
            textAlign: 'center',
          }}>
            Keamanan akun Anda adalah prioritas kami.
          </Text>
          <ActivityIndicator size="large" color="#E83C91" style={{ marginTop: 25 }} />
        </View>
      </View>
    </Modal>
  );
};

export default AuthLoadingScreen;