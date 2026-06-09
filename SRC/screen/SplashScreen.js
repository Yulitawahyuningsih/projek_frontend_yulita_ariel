import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Text, Animated } from 'react-native';

const SplashScreen = () => {
  // Menggunakan useRef untuk menyimpan nilai animasi
  const fadeAnim = useRef(new Animated.Value(0)).current; // Mulai dari transparan
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // Mulai dari skala kecil

  useEffect(() => {
    // Membuat animasi paralel (fade in dan scale up)
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Menuju opak sepenuhnya
        duration: 1500, // Durasi animasi 1.5 detik
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1, // Menuju skala normal
        friction: 4, // Efek 'bouncy'
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.contentContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
        <Image
          source={require('../../assets/logo.png')} // Pastikan path logo benar
          style={styles.logo}
        />
        <Animated.Text style={[styles.tagline, { opacity: fadeAnim }]}>
          Gaya Terbaik Anda Dimulai Di Sini
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F8F6',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 330,
    height: 330,
    resizeMode: 'contain',
  },
  tagline: {
    fontSize: 18,
    color: '#43334C',
    fontWeight: '600',
    marginTop: -120,
    textAlign: 'center',
  },
});

export default SplashScreen;