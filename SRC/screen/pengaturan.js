import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Komponen pembantu untuk membuat item menu yang bisa diklik
const SettingsMenuItem = ({ label, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Text style={styles.menuItemText}>{label}</Text>
    <Feather name="chevron-right" size={22} color="#BDBDBD" />
  </TouchableOpacity>
);

// Komponen pembantu untuk item dengan sakelar (toggle switch)
const SettingsToggleItem = ({ label, value, onValueChange }) => (
  <View style={[styles.menuItem, { justifyContent: 'space-between' }]}>
    <Text style={styles.menuItemText}>{label}</Text>
    <Switch
      trackColor={{ false: "#E0E0E0", true: "#FFC4C4" }}
      thumbColor={value ? "#E83C91" : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={onValueChange}
      value={value}
    />
  </View>
);

// Komponen pembantu untuk judul setiap seksi
const SectionHeader = ({ title }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

const PengaturanScreen = ({ navigation }) => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);

  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);

  const handleClearCache = () => {
    // Simulasi membersihkan cache dan menampilkan notifikasi toast
    console.log("Notifikasi Toast: Cache berhasil dibersihkan!");
    // Di aplikasi nyata, Anda akan menggunakan library seperti 'react-native-toast-message'
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pengaturan</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* --- Bagian Akun & Privasi --- */}
        <SectionHeader title="Akun & Privasi" />
        <View style={styles.menuGroup}>
          <SettingsMenuItem label="Ubah Kata Sandi" onPress={() => navigation.navigate('ChangePasswordScreen')} />
          <SettingsMenuItem label="Hapus Akun" onPress={() => navigation.navigate('DeleteAccountConfirmationScreen')} />
          <SettingsMenuItem label="Kebijakan Privasi" onPress={() => navigation.navigate('LegalPolicy')} />
        </View>

        {/* --- Bagian Tampilan & Notifikasi --- */}
        <SectionHeader title="Tampilan & Notifikasi" />
        <View style={styles.menuGroup}>
          <SettingsToggleItem label="Notifikasi Penawaran" value={isNotificationsEnabled} onValueChange={toggleNotifications} />
          <SettingsMenuItem label="Bahasa Aplikasi" onPress={() => navigation.navigate('LanguageSelectionScreen')} />
          <SettingsMenuItem label="Ganti Tema" onPress={() => navigation.navigate('ThemeSelectionScreen')} />
        </View>

        {/* --- Bagian Data & Dukungan --- */}
        <SectionHeader title="Data & Dukungan" />
        <View style={styles.menuGroup}>
          <View style={[styles.menuItem, { justifyContent: 'space-between' }]}>
            <Text style={styles.menuItemText}>Bersihkan Cache</Text>
            <TouchableOpacity style={styles.cacheButton} onPress={handleClearCache}>
              <Text style={styles.cacheButtonText}>Bersihkan</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.menuItem, { justifyContent: 'space-between' }]}>
            <Text style={styles.menuItemText}>Versi Aplikasi</Text>
            <Text style={styles.versionText}>1.0.0</Text>
          </View>
          <SettingsMenuItem label="Syarat & Ketentuan" onPress={() => navigation.navigate('LegalPolicy')} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F8F6', // $BG_PRIMARY
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
    // fontFamily: 'Arial Black', // Pastikan font ini sudah di-load
    fontWeight: 'bold',
    color: '#43334C', // $TEXT_PRIMARY
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#43334C',
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 10,
  },
  menuGroup: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    // fontFamily: 'Bahnschrift', // Pastikan font ini sudah di-load
    color: '#43334C',
  },
  cacheButton: {
    backgroundColor: '#FFC4C4', // $PALE_PINK
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  cacheButtonText: {
    color: '#43334C',
    fontWeight: '600',
    fontSize: 14,
  },
  versionText: {
    fontSize: 16,
    color: 'grey',
  },
});

export default PengaturanScreen;