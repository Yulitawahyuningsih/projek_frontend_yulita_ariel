import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const DeleteAccountConfirmationScreen = ({ navigation }) => {
  const handleDelete = () => {
    // Di sini Anda akan menambahkan logika untuk menghapus akun pengguna (panggilan API, dll.)
    console.log("Akun pengguna telah dihapus!");
    // Setelah berhasil, arahkan pengguna kembali ke layar Login
    navigation.navigate('Login'); 
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Hapus Akun</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Feather name="alert-triangle" size={50} color="#D9534F" style={styles.icon} />
        <Text style={styles.warningTitle}>Apakah Anda Yakin?</Text>
        <Text style={styles.warningText}>
          Tindakan ini akan menghapus akun Anda secara permanen. Semua data Anda, termasuk riwayat pesanan dan alamat, akan hilang dan tidak dapat dipulihkan.
        </Text>
        
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Ya, Hapus Akun Saya</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelButtonText}>Batal</Text>
        </TouchableOpacity>
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
  content: { flex: 1, justifyContent: 'center', padding: 20, alignItems: 'center' },
  icon: { marginBottom: 20 },
  warningTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#43334C',
    textAlign: 'center',
    marginBottom: 10,
  },
  warningText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  deleteButton: {
    backgroundColor: '#D9534F', // Warna merah untuk aksi destruktif
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  deleteButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  cancelButton: { marginTop: 15, padding: 10 },
  cancelButtonText: { color: '#43334C', fontSize: 16 },
});

export default DeleteAccountConfirmationScreen;