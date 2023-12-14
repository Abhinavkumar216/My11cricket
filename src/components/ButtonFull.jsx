import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const ButtonFull = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
  disabled,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      className={`bg-green-600 w-11/12 self-center ${buttonStyle}`}
      disabled={disabled}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={'#fff'} className='py-3 ' />
      ) : (
        <Text
          className={`py-3 text-center text-base text-gray-950 font-WorksansMedium ${textStyle}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonFull;

const styles = StyleSheet.create({});
