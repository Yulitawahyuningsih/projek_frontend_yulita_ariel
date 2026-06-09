import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ChangePasswordScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={26} color="#43334C" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ubah Kata Sandi</Text>
      </View>

      {/* Form Content */}
      <View style={styles.content}>
        <Text style={styles.label}>Kata Sandi Saat Ini</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Masukkan kata sandi lama Anda"
        />

        <Text style={styles.label}>Kata Sandi Baru</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Masukkan kata sandi baru"
        />

        <Text style={styles.label}>Konfirmasi Kata Sandi Baru</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder="Ketik ulang kata sandi baru"
        />

        <View style={{ marginTop: 20 }}>
          <Button title="Simpan Perubahan" color="#E83C91" onPress={() => {
            console.log("Kata sandi diperbarui!");
            navigation.goBack();
          }} />
        </View>
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
  content: { padding: 20 },
  label: {
    fontSize: 16,
    color: '#43334C',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
});

export default ChangePasswordScreen;