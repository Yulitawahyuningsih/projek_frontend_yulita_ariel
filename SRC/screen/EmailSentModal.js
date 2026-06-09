import React from 'react';
import { Text, View, Modal, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const EmailSentModal = ({ visible, onDismiss }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onDismiss}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          width: '85%',
          backgroundColor: '#F9F8F6',
          borderRadius: 15,
          padding: 30,
          alignItems: 'center',
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5
        }}>
          <AntDesign name="checkcircleo" size={50} color="#E83C91" />
          <Text style={{
            color: '#43334C',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 10,
          }}>Email Berhasil Dikirim!</Text>
          <Text style={{
            color: 'rgba(67, 51, 76, 0.8)',
            fontSize: 14,
            textAlign: 'center',
            lineHeight: 20,
            marginBottom: 30,
          }}>
            Silakan periksa kotak masuk email Anda (termasuk folder Spam). Tautan akan kedaluwarsa dalam 30 menit.
          </Text>
          <TouchableOpacity style={{
            backgroundColor: '#E83C91',
            paddingVertical: 12,
            paddingHorizontal: 30,
            borderRadius: 50,
            alignItems: 'center',
          }} onPress={onDismiss}>
            <Text style={{
              color: '#F9F8F6',
              fontSize: 14,
              fontWeight: 'bold',
            }}>KEMBALI KE LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default EmailSentModal;