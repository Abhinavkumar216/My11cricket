import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

const Input = ({
  placeholder,
  keyboardType,
  autoFocus,
  wrapStyle,
  inputStyle,
}) => {
  return (
    <View className={`mx-5 my-5 items-center ${wrapStyle}`}>
      <TextInput
        className={`w-full border px-5 font-WorksansMedium rounded-lg bg-white border-neutral-500 text-lg ${inputStyle}`}
        placeholder={placeholder ?? 'default'}
        placeholderTextColor={'#252525'}
        keyboardType={keyboardType ?? 'default'}
        autoFocus={autoFocus ?? false}
        
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({});
