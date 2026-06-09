import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';

const faqCategories = [
  { icon: 'package', label: 'Pesanan & Pengiriman', screen: 'FAQList' },
  { icon: 'credit-card', label: 'Pembayaran & Pengembalian', screen: 'FAQList' },
  { icon: 'user', label: 'Akun & Profil', screen: 'FAQList' },
  { icon: 'file-text', label: 'Ketentuan & Kebijakan', screen: 'LegalPolicy' },
];

const PusatBantuanScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleEmailPress = () => {
    const subject = encodeURIComponent("Pertanyaan Dukungan Fashion Yulita");
    const url = `mailto:support@fashionyulita.com?subject=${subject}`;
    
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) Linking.openURL(url);
      });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pusat Bantuan</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Feather name="search" size={20} color="#43334C" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari jawaban untuk pertanyaan Anda..."
            placeholderTextColor="#9E9E9E"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* FAQ Categories */}
        <View style={styles.categoriesContainer}>
          {faqCategories.map((category, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.categoryCard} 
              onPress={() => navigation.navigate(category.screen, { topic: category.label })}
            >
              <View style={styles.categoryIconContainer}>
                <Feather name={category.icon} size={24} color="#43334C" />
                <Text style={styles.categoryLabel}>{category.label}</Text>
              </View>
              <Feather name="chevron-right" size={22} color="#BDBDBD" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Direct Contact */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Tidak menemukan jawaban?</Text>
          <TouchableOpacity 
            style={styles.chatButton} 
            onPress={() => navigation.navigate('Chat', { sellerName: 'Customer Support' })} 
          >
            <View>
              <Text style={styles.chatButtonText}>Chat dengan Kami</Text>
              <Text style={styles.chatSubText}>Respons dalam 5 menit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.emailButton} onPress={handleEmailPress}>
            <Feather name="mail" size={18} color="#43334C" />
            <Text style={styles.emailButtonText}>Kirim Email Dukungan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F8F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Arial Black',
    color: '#43334C',
  },
  scrollContainer: {
    padding: 20,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
    paddingHorizontal: 15,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#43334C',
  },
  categoriesContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  categoryIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryLabel: {
    fontSize: 16,
    color: '#43334C',
    marginLeft: 15,
    fontWeight: '600',
  },
  contactSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 16,
    color: 'grey',
    marginBottom: 20,
  },
  chatButton: {
    backgroundColor: '#E83C91',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 50,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  chatButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatSubText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'center',
  },
  emailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: '#43334C',
  },
  emailButtonText: {
    color: '#43334C',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default PusatBantuanScreen;