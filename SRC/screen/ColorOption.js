import React from 'react';
import { TouchableOpacity, View } from 'react-native';

const ColorOption = ({ color, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[{
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: 5,
        borderWidth: 2,
        borderColor: 'transparent',
      }, { backgroundColor: color }, isSelected && { borderColor: '#E83C91' }]}
      onPress={onPress}
    >
      {isSelected && <View />}
    </TouchableOpacity>
  );
};
export default ColorOption;