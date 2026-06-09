import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';

const AddEditAddressScreen = ({ navigation, route, onSaveAddress }) => {
  const addressToEdit = route.params?.address;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sesuaikan inisialisasi dengan nama kolom dari database (snake_case)
  const [recipientName, setRecipientName] = useState(addressToEdit?.recipient_name || addressToEdit?.recipientName || '');
  const [phone, setPhone] = useState(addressToEdit?.phone || '');
  const [fullAddress, setFullAddress] = useState(addressToEdit?.full_address || addressToEdit?.fullAddress || '');
  const [postalCode, setPostalCode] = useState(addressToEdit?.postal_code || addressToEdit?.postalCode || '');
  const [label, setLabel] = useState(addressToEdit?.label || 'Baru');

  const isEditing = !!addressToEdit;

  // Fungsi untuk menyimpan alamat baru
  const handleSave = async () => {
    if (!recipientName || !phone || !fullAddress) {
      Alert.alert('Peringatan', 'Nama, Nomor Telepon, dan Alamat Lengkap wajib diisi.');
      return;
    }

    setIsSubmitting(true);
    const newAddress = {
      id: addressToEdit?.id, // Sertakan ID jika sedang mengedit
      label,
      recipient_name: recipientName, // Kirim dalam format snake_case untuk DB
      phone: phone,
      full_address: fullAddress,    // Kirim dalam format snake_case untuk DB
      postal_code: postalCode,      // Kirim dalam format snake_case untuk DB
    };

    await onSaveAddress(newAddress); // Tunggu sampai proses API selesai
    setIsSubmitting(false);
    navigation.goBack(); 
  };

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#F9F8F6',
    }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingTop: 50,
        paddingBottom: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5, marginRight: 10 }}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#43334C',
        }}>{isEditing ? 'Ubah Alamat' : 'Detail Alamat Baru'}</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <TextInput
          style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#FFC4C4', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 12, fontSize: 16, marginBottom: 15, color: '#43334C' }}
          placeholder="Nama Lengkap Penerima"
          value={recipientName}
          onChangeText={setRecipientName}
        />
        <TextInput
          style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#FFC4C4', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 12, fontSize: 16, marginBottom: 15, color: '#43334C' }}
          placeholder="Nomor Telepon"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={[{ backgroundColor: 'white', borderWidth: 1, borderColor: '#FFC4C4', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 12, fontSize: 16, marginBottom: 15, color: '#43334C' }, { height: 100, textAlignVertical: 'top' }]}
          placeholder="Alamat Lengkap (Jalan, Nomor, Kota)"
          value={fullAddress}
          onChangeText={setFullAddress}
          multiline
        />
        <TextInput
          style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#FFC4C4', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 12, fontSize: 16, marginBottom: 15, color: '#43334C' }}
          placeholder="Kode Pos"
          value={postalCode}
          onChangeText={setPostalCode}
          keyboardType="number-pad"
        />
      </ScrollView>

      {/* Save Button */}
      <TouchableOpacity style={{
        backgroundColor: '#E83C91',
        margin: 15,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
      }} onPress={handleSave} disabled={isSubmitting}>
        {isSubmitting ? <ActivityIndicator color="white" /> : <Text style={{
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
        }}>SIMPAN ALAMAT</Text>
        }
      </TouchableOpacity>
    </View>
  );
};

export default AddEditAddressScreen;