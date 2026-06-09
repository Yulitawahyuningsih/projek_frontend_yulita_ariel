import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ProfileMenuItem = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingVertical: 18,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
    }} onPress={onPress}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Feather name={icon} size={22} color="#43334C" />
        <Text style={{
          fontSize: 16,
          color: '#43334C',
          marginLeft: 20,
        }}>{label}</Text>
      </View>
      <Feather name="chevron-right" size={22} color="rgba(67, 51, 76, 0.5)" />
    </TouchableOpacity>
  );
};

export default ProfileMenuItem;