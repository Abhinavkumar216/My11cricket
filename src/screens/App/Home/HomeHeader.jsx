import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {Badge} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {userstate} from '../../../Services/State/userSlice';

const HomeHeader = () => {
  const navigation = useNavigation();
  const user = useSelector(userstate);
  const [Loading, setLoading] = useState(true);
  return (
    <View className=" flex-row py-4 px-3 bg-[#181928] items-center ">
      <Pressable onPress={() => navigation.openDrawer()}>
        {user?.avatar && (
          <Image
            source={{uri: user?.avatar}}
            className="w-12 h-11 rounded-full"
            onLoadEnd={() => setLoading(false)}
          />
        )}
        <ActivityIndicator
          size={'small'}
          className="absolute top-0 bottom-0 right-0 left-0"
          color={'#181928'}
          animating={Loading}
        />
        <View className="absolute -bottom-1 -right-1  p-1 rounded-full">
          <Icon name="grid" size={14} color={'#fff'} />
        </View>
      </Pressable>
      <View className="flex-1 justify-center ml-3">
        <Text className="text-xl text-white font-WorksansSemiBold">
          My11Cricket
        </Text>
      </View>
      {/* <Pressable className="mr-3" onPress={() => navigation.push('Notification')}>
        <Icon name="notifications-outline" size={32} color={'#fff'} />
        <Badge visible={false} size={10} className="absolute" />
      </Pressable> */}
      <Pressable onPress={() => navigation.push('Wallet')}>
        <Icon name="wallet-outline" size={32} color={'#fff'} />
      </Pressable>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({});
