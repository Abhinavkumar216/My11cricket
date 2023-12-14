import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const EmptyState = ({title, subtitle}) => {
  return (
    <View className=" flex-1 items-center justify-center  ">
      <Image
        source={require('../../assets/images/error/Empty.png')}
        className="w-48 h-48"
        resizeMode="contain"
      />
      <Text className="font-WorksansMedium text-xl text-black">{title}</Text>
      <Text className="font-WorksansRegular text-sm text-neutral-600 text-center mx-5">
        {subtitle}
      </Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({});
