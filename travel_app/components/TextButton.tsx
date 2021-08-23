import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';

const TextButton = ({
  label,
  customContainerStyle,
  customLabelStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        ...customContainerStyle,
      }}>
      <Text style={{...FONTS.h2, ...customLabelStyle}}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TextButton;
