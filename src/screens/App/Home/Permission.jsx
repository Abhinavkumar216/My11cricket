import React from 'react';
import {Image, Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import ButtonFull from '../../../components/ButtonFull';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRoute } from '@react-navigation/native';

const Permission = ({navigation}) => {
  const {params:{Screen}} = useRoute()
  if (Screen === 'Update') {
    return (
      <View
        className=" flex-1 justify-end bg-transparent" >
        <Update navigation={navigation} />
      </View>
    );
  }
  if (Screen === 'Notification') {
    return (
      <View
        className=" flex-1 justify-end bg-transparent">
        <NotificationPermission navigation={navigation} />
      </View>
    );
  }
  return (
    <View
      className=" flex-1 justify-end"
      style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <Update navigation={navigation} />
      {/* <NotificationPermission navigation={navigation}/> */}
      {/* <Update navigation={navigation}/> */}
    </View>
  );
};

export default Permission;

const Update = ({navigation}) => {
  return (
    <View className="items-center bg-white  rounded-3xl p-4">
      <Pressable
        className="absolute right-5 top-5 "
        onPress={() => navigation.pop()}>
        <Icon name="close" size={28} color={'red'} />
      </Pressable>
      <Image
        source={require('../../../../assets/images/Images/updated.png')}
        className="h-20 w-20 my-3"
      />
      <Text className="font-WorksansMedium text-lg text-black mb-5">
        New Version Available
      </Text>
      <View className="bg-green-200 p-3 rounded-lg">
        <Text className="font-WorksansMedium text-base text-black">
          What's New ?
        </Text>
        <Text className="font-WorksansRegular text-sm text-black my-1">
          1. We need Notification Permission to keep you updated
        </Text>
        <Text className="font-WorksansRegular text-sm text-black my-1">
          1. We need Notification Permission to keep you updated
        </Text>
        <Text className="font-WorksansRegular text-sm text-black my-1">
          1. We need Notification Permission to keep you updated
        </Text>
      </View>

      <ButtonFull
        title={'Update'}
        buttonStyle={'bg-[#181928] my-5'}
        textStyle={'text-white'}
        onPress={() => Linking.openSettings()}
      />
    </View>
  );
};

const NotificationPermission = ({navigation}) => {
  return (
    <View className="items-center bg-white  rounded-3xl p-4">
      <Pressable
        className="absolute right-5 top-5 "
        onPress={() => navigation.pop()}>
        <Icon name="close" size={28} color={'red'} />
      </Pressable>
      <Image
        source={require('../../../../assets/images/Images/notification.png')}
        className="h-20 w-20 my-6"
      />
      <Text className="font-WorksansMedium text-lg text-black">
        Allow Notification Permission
      </Text>
      <Text className="font-WorksansRegular text-sm text-black text-center">
        We need Notification Permission to keep you updated
      </Text>
      <View>
        <Text className="font-WorksansMedium text-base mt-4 text-black mb-4">
          Follow the steps to enable Notification
        </Text>
        <Stepper step={'1'} NormalText={'Open Phone'} StrongText={'Settings'} />
        <Stepper
          step={'2'}
          NormalText={'Got to'}
          StrongText={'Apps / Manage Apps'}
        />
        <Stepper step={'3'} NormalText={'Select'} StrongText={'My11Cricket'} />
        <Stepper step={'4'} NormalText={'Select'} StrongText={'Notification'} />
        <Stepper step={'5'} NormalText={'Allow'} StrongText={'Notification'} />
      </View>
      <ButtonFull
        title={'Allow Notification'}
        buttonStyle={'bg-[#181928] my-5'}
        textStyle={'text-white'}
        onPress={() => Linking.openSettings()}
      />
    </View>
  );
};

const LocationPermission = ({navigation}) => {
  return (
    <View className="items-center bg-white  rounded-3xl p-4">
      <Pressable
        className="absolute right-5 top-5 "
        onPress={() => navigation.pop()}>
        <Icon name="close" size={28} color={'red'} />
      </Pressable>
      <Image
        source={require('../../../../assets/images/Images/map.png')}
        className="h-20 w-20 my-6"
      />
      <Text className="font-WorksansMedium text-lg text-black">
        Allow Location Permission
      </Text>
      <Text className="font-WorksansRegular text-sm text-black text-center">
        To continue on this app, we need to ensure that you're not from a
        restricted state.
      </Text>
      <View>
        <Text className="font-WorksansMedium text-base mt-4 text-black mb-4">
          Follow the steps to enable location access
        </Text>
        <Stepper step={'1'} NormalText={'Open Phone'} StrongText={'Settings'} />
        <Stepper
          step={'2'}
          NormalText={'Got to'}
          StrongText={'Apps / Manage Apps'}
        />
        <Stepper step={'3'} NormalText={'Select'} StrongText={'My11Cricket'} />
        <Stepper step={'4'} NormalText={'Select'} StrongText={'Permission'} />
        <Stepper step={'5'} NormalText={'Enable'} StrongText={'Location'} />
      </View>
      <ButtonFull
        title={'Enable Location'}
        buttonStyle={'bg-[#181928] my-5'}
        textStyle={'text-white'}
        onPress={() => Linking.openSettings()}
      />
    </View>
  );
};

const Stepper = ({step, NormalText, StrongText}) => {
  return (
    <View>
      <View className="flex-row p-2 items-center">
        <View className="w-7 h-7 bg-zinc-300 rounded-full items-center justify-center">
          <Text className="font-WorksansSemiBold text-sm text-black">
            {step}
          </Text>
        </View>
        <Text className="font-WorksansRegular ml-8 text-neutral-700">
          {NormalText}{' '}
          <Text className="font-WorksansSemiBold text-black">{StrongText}</Text>
        </Text>
      </View>
    </View>
  );
};
