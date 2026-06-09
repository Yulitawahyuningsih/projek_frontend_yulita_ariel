import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const getIconForType = (type) => {
  switch (type) {
    case 'promo':
      return { name: 'tag', color: '#E83C91' };
    case 'transaksi':
      return { name: 'package', color: '#00A9A5' };
    default:
      return { name: 'info', color: '#FFA000' };
  }
};

const NotificationCard = ({ notification, onPress }) => {
  const icon = getIconForType(notification.type);

  return (
    <TouchableOpacity style={[{
      flexDirection: 'row',
      backgroundColor: 'white',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
      alignItems: 'center',
    }, !notification.isRead && { backgroundColor: '#F8F8FF' }]} onPress={onPress}>
      <View style={[{
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
      }, { backgroundColor: `${icon.color}20` }]}>
        <Feather name={icon.name} size={24} color={icon.color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#43334C' }}>{notification.title}</Text>
        <Text style={{ fontSize: 14, color: 'grey', marginVertical: 4 }} numberOfLines={2}>{notification.body}</Text>
        <Text style={{ fontSize: 12, color: 'lightgrey' }}>{notification.timestamp}</Text>
      </View>
      {!notification.isRead && <View style={{
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#3498db',
        marginLeft: 10,
      }} />}
    </TouchableOpacity>
  );
};

export default NotificationCard;