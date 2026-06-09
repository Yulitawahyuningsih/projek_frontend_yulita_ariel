import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const VoucherCard = ({ voucher, onClaim }) => {
  const isClaimed = voucher.status === 'claimed';

  return (
    <View style={{
      backgroundColor: 'white',
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 15,
      marginBottom: 15,
      elevation: 3,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 5 },
    }}>
      <View style={{
        backgroundColor: 'rgba(255, 196, 196, 0.3)',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <FontAwesome5 name="tshirt" size={30} color="#E83C91" />
      </View>
      <View style={{
        width: 1,
        height: '80%',
        borderWidth: 1,
        borderColor: '#FFC4C4',
        borderStyle: 'dashed',
      }} />
      <View style={{
        flex: 1,
        padding: 15,
      }}>
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#43334C',
        }}>{voucher.title}</Text>
        <Text style={{
          fontSize: 12,
          color: '#43334C',
          marginVertical: 4,
        }}>{voucher.description}</Text>
        <Text style={{
          fontSize: 10,
          color: 'rgba(67, 51, 76, 0.6)',
        }}>Berlaku hingga: {voucher.expiry}</Text>
      </View>
      <TouchableOpacity
        style={[{
          backgroundColor: '#E83C91',
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderRadius: 20,
          position: 'absolute',
          bottom: 15,
          right: 15,
        }, isClaimed && {
          backgroundColor: '#BDBDBD', // Warna abu-abu untuk tombol yang sudah diklaim
        }]}
        onPress={onClaim}
        disabled={isClaimed}
      >
        <Text style={{
          color: '#F9F8F6',
          fontSize: 12,
          fontWeight: 'bold',
        }}>
          {isClaimed ? 'DIKLAIM' : 'KLAIM'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VoucherCard;