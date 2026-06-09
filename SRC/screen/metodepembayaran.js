import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import PaymentHistoryCard from './PaymentHistoryCard';

const initialCards = [
  { id: '1', type: 'Visa', bank: 'BCA', number: '**** **** **** 1234', expiry: '12/25', isDefault: true },
  { id: '2', type: 'Mastercard', bank: 'Mandiri', number: '**** **** **** 5678', expiry: '08/26', isDefault: false },
];

const MetodePembayaranScreen = ({ navigation }) => {
  const [cards, setCards] = useState(initialCards);

  const handleRemoveCard = (cardId) => {
    setCards(currentCards => currentCards.filter(card => card.id !== cardId));
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
      }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 5, marginRight: 10 }}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#43334C' }}>Metode Pembayaran</Text>
      </View>
      {/* Card List */}
      <FlatList
        data={cards}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PaymentHistoryCard
            card={item}
            isDefault={item.isDefault}
            onRemove={() => handleRemoveCard(item.id)}
          />
        )}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 50, color: 'grey', fontSize: 16 }}>Anda belum menyimpan metode pembayaran.</Text>}
      />

      {/* Add New Card Button */}
      <TouchableOpacity style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E83C91',
        margin: 15,
        paddingVertical: 15,
        borderRadius: 8,
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
      }} onPress={() => navigation.navigate('AddPaymentMethod')}>
        <Feather name="plus" size={20} color="white" />
        <Text style={{
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
          marginLeft: 10,
        }}>Tambah Metode Pembayaran</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MetodePembayaranScreen;