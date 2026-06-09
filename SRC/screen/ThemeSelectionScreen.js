import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const themes = [
  { code: 'light', name: 'Terang' },
  { code: 'dark', name: 'Gelap' },
];

const ThemeSelectionScreen = ({ navigation }) => {
  // Untuk simulasi, kita anggap 'light' adalah tema default
  const [selectedTheme, setSelectedTheme] = useState('light');

  const handleSelectTheme = (themeCode) => {
    setSelectedTheme(themeCode);
    // Di aplikasi nyata, Anda akan memperbarui theme context atau state management di sini
    console.log(`Tema dipilih: ${themeCode}`);
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
        <Text style={styles.headerTitle}>Ganti Tema</Text>
      </View>

      {/* Theme List */}
      <View style={styles.listContainer}>
        {themes.map((theme) => (
          <TouchableOpacity
            key={theme.code}
            style={styles.themeItem}
            onPress={() => handleSelectTheme(theme.code)}
          >
            <Text style={styles.themeText}>{theme.name}</Text>
            {selectedTheme === theme.code && (
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
  themeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  themeText: { fontSize: 16, color: '#43334C' },
});

export default ThemeSelectionScreen;