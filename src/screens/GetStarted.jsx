import {
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import ButtonFull from '../components/ButtonFull';
import { useNavigation } from '@react-navigation/native';

const GetStarted = () => {
  const navigation = useNavigation()
  return (
    <View className="flex-1 ">
      <StatusBar animated backgroundColor={'transparent'} translucent />

      <ImageBackground
        source={require('../../assets/images/2150684284.jpg')}
        className="flex-1 justify-end ">
        <View className=" bg-black h-80 opacity-90 p-10 rounded-3xl">
          <Text className="text-2xl text-white text-center font-WorksansSemiBold">
            Welcome to My11Cricket
          </Text>
          <Text className="text-base text-gray-200 text-center mt-3 mb-10 font-WorksansRegular">
            Ready to start winning? Swipe left to learn the basics of fantasy
            sports
          </Text>
          <ButtonFull title={"REGISTER"} buttonStyle={'bg-white'} onPress={()=> navigation.navigate('Register')} />
          <Pressable className="flex-row justify-center mt-5" onPress={()=> navigation.navigate('Login')}>
            <Text className=" text-gray-200 text-lg font-WorksansRegular">Already a user? </Text>
            <Text className=" text-gray-200 text-lg  font-WorksansBold">Login </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({});
