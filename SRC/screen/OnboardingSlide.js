import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'; // Image sudah ada, tidak perlu diubah
import { FontAwesome5, Feather } from '@expo/vector-icons';

const OnboardingSlide = ({
  navigation,
  currentSlide,
  totalSlides,
  iconName,
  imageSource,
  imageStyle, // Tambahkan prop baru untuk gaya gambar
  headline,
  description,
  onNext,
}) => {
  return (
    <View style={styles.container}>
      {/* Navigasi Atas (dikosongkan untuk konsistensi layout) */}
      <View style={styles.topNav} />

      {/* Konten Visual Utama */}
      <View style={styles.mainContent}>
        {imageSource ? (
          <Image source={imageSource} style={[styles.logo, imageStyle]} /> // Gabungkan gaya default dengan gaya kustom
        ) : (
          <FontAwesome5 name={iconName} size={100} color="#43334C" />
        )}
        <Text style={styles.headline}>{headline}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Navigasi Bawah */}
      <View style={styles.bottomNav}>
        <View />

        {/* Tombol Aksi (FAB) */}
        <TouchableOpacity style={styles.fab} onPress={onNext}>
          <Feather name="arrow-right" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F8F6',
    justifyContent: 'space-between',
    padding: 20,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 28, // Beri tinggi agar tata letak konsisten
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  headline: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#43334C',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: 'rgba(67, 51, 76, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E83C91',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});

export default OnboardingSlide;