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
  const bgcolor = disabled ? 'bg-green-200' : 'bg-green-500';
  return (
    <TouchableOpacity
      className={`${bgcolor} w-11/12 rounded-md self-center ${buttonStyle}`}
      disabled={disabled}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={'#fff'} className="py-3 " />
      ) : (
        <Text
          className={`py-3 text-center text-base text-gray-900 font-WorksansMedium ${textStyle}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonFull;

const styles = StyleSheet.create({});
