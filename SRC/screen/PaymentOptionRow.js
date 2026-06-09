import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';

const PaymentOptionRow = ({ icon, label, isSelected, onPress }) => {
  return (
    <TouchableOpacity style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'white',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 8,
      marginBottom: 10,
      elevation: 1,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 3,
    }} onPress={onPress}>
      {icon && <Image source={icon} style={{ width: 40, height: 25, resizeMode: 'contain', marginRight: 15 }} />}
      <Text style={{ flex: 1, fontSize: 16, color: '#43334C', fontWeight: '600' }}>{label}</Text>
      <View style={[{
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#FFC4C4',
        justifyContent: 'center',
        alignItems: 'center',
      }, isSelected && { borderColor: '#E83C91' }]}>
        {isSelected && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#E83C91' }} />}
      </View>
    </TouchableOpacity>
  );
};

export default PaymentOptionRow;