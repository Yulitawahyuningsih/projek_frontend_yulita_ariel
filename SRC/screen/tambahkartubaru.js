import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const TambahKartuBaruScreen = ({ navigation, onSave }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const inputStyle = {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#FFC4C4',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    color: '#43334C',
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F9F8F6' }}>
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
      }} >
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5, marginRight: 10 }}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#43334C' }}>Tambah Kartu Baru</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ fontSize: 14, color: 'grey', marginBottom: 8 }}>Nomor Kartu</Text>
        <TextInput
          style={inputStyle}
          placeholder="0000 0000 0000 0000"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="number-pad"
          maxLength={19} // 16 digits + 3 spaces
        />

        <Text style={{ fontSize: 14, color: 'grey', marginBottom: 8 }}>Nama Pemilik Kartu</Text>
        <TextInput
          style={inputStyle}
          placeholder="Nama sesuai kartu"
          value={cardHolder}
          onChangeText={setCardHolder}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={{ fontSize: 14, color: 'grey', marginBottom: 8 }}>Berlaku Hingga</Text>
            <TextInput
              style={inputStyle}
              placeholder="MM/YY"
              value={expiry}
              onChangeText={setExpiry}
              keyboardType="number-pad"
              maxLength={5}
            />
          </View>
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={{ fontSize: 14, color: 'grey', marginBottom: 8 }}>CVV</Text>
            <TextInput
              style={inputStyle}
              placeholder="123"
              value={cvv}
              onChangeText={setCvv}
              keyboardType="number-pad"
              maxLength={3}
              secureTextEntry
            />
          </View>
        </View>
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
      }} onPress={onSave}>
        <Text style={{
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
        }}>SIMPAN METODE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TambahKartuBaruScreen;