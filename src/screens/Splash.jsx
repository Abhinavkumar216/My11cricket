import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {FadeInDown, ZoomOut, Easing} from 'react-native-reanimated';

const Splash = () => {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <StatusBar animated backgroundColor={'transparent'} translucent />
      <Animated.Image
        entering={FadeInDown.duration(10000).delay(600).springify()}
        exiting={ZoomOut.duration(3000).easing()}
        source={require('../../assets/icons/round.png')}
        className="w-44 h-44"
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
