import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';

const legalLinks = [
  { label: 'Syarat dan Ketentuan Layanan', url: 'https://www.fashionyulita.com/terms' },
  { label: 'Kebijakan Privasi', url: 'https://www.fashionyulita.com/privacy' },
  { label: 'Kebijakan Pengembalian Produk', url: 'https://www.fashionyulita.com/returns' },
];

const LegalPolicyScreen = ({ navigation }) => {
  const handleLinkPress = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ketentuan & Kebijakan</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.linksContainer}>
          {legalLinks.map((link, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.linkCard} 
              onPress={() => handleLinkPress(link.url)}
            >
              <Text style={styles.linkLabel}>{link.label}</Text>
              <Feather name="chevron-right" size={22} color="#BDBDBD" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F8F6' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingTop: 50, paddingBottom: 15, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  backButton: { padding: 5, marginRight: 10 },
  headerTitle: { fontSize: 20, fontFamily: 'Arial Black', color: '#43334C' },
  scrollContainer: { padding: 20 },
  linksContainer: { backgroundColor: 'white', borderRadius: 10, overflow: 'hidden' },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  linkLabel: {
    fontSize: 16,
    color: '#43334C',
    fontWeight: '600',
  },
});

export default LegalPolicyScreen;