import {View, Text,} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';


const Loading = () => {
  return (
    <View className="flex-1 justify-center items-center bg-neutral-50">
      <ActivityIndicator size={28} animating color="#181928" />
      <Text className="font-WorksansRegular text-lg mt-4 text-black text-center">
        Hang on...
      </Text>
    </View>
  );
};

export default Loading;
