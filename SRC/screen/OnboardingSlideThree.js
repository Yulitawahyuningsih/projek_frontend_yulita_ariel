import React from 'react';
import OnboardingSlide from './OnboardingSlide';

const OnboardingSlideThree = ({ navigation }) => {
  return (
    <OnboardingSlide
      navigation={navigation}
      currentSlide={1}
      totalSlides={1}
      imageSource={require('../../assets/logo.png')} // Menambahkan logo
      imageStyle={{ width: 300, height: 350, marginBottom: -150 }} // Menyesuaikan ukuran logo
      headline="Saatnya Tampil Memukau!"
      description="Masuk atau daftar sekarang untuk menyimpan favorit dan menikmati penawaran eksklusif."
      onNext={() => navigation.navigate('Login')}
    />
  );
};

export default OnboardingSlideThree;