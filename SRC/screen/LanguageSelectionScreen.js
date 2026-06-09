import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const languages = [
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'en', name: 'English (US)' },
];

const LanguageSelectionScreen = ({ navigation }) => {
  // Untuk simulasi, kita anggap 'id' adalah bahasa default
  const [selectedLanguage, setSelectedLanguage] = useState('id');

  const handleSelectLanguage = (langCode) => {
    setSelectedLanguage(langCode);
    // Di aplikasi nyata, Anda akan menyimpan preferensi ini dan memperbarui library i18n
    console.log(`Bahasa dipilih: ${langCode}`);
    // Kembali ke layar sebelumnya setelah memilih
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pilih Bahasa</Text>
      </View>

      {/* Language List */}
      <View style={styles.listContainer}>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={styles.languageItem}
            onPress={() => handleSelectLanguage(lang.code)}
          >
            <Text style={styles.languageText}>{lang.name}</Text>
            {selectedLanguage === lang.code && (
              <Feather name="check" size={24} color="#E83C91" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F8F6' },
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
  backButton: { padding: 5, marginRight: 10 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#43334C' },
  listContainer: {
    marginTop: 20,
    marginHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  languageText: { fontSize: 16, color: '#43334C' },
});

export default LanguageSelectionScreen;