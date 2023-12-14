import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Share,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {userstate} from '../../../Services/State/userSlice';

const Refer = () => {
  const user = useSelector(userstate);
  const [isCopied, setIsCopied] = useState(false);

  const onShare = async () => {
    try {
      await Share.share({
        title: 'Hey I Have Found An Amazing App',
        message: `Hey, I Have Found an App My11Cricket And Earn Amazing Reward Use My Code "${user?.uid}" to Earn  Coin.!!!`,
      });
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <View className="flex-1 items-center">
      <Text className="text-xl font-WorksansMedium text-center my-10 text-black">{`Refer your friends &\n earn upto 25 each referrals`}</Text>
      <Image
        source={require('../../../../assets/images/error/refer.png')}
        className="w-64 h-52 self-center mb-10"
      />
      <Text className="font-WorksansRegular text-base mb-2 -ml-5">
        Your Referal Code
      </Text>
      <View className="flex-row items-center ">
        <View />
        <Pressable
          onPress={setIsCopied}
          className="border-2 w-4/6  p-3 rounded-xl flex-row justify-between items-center border-slate-400">
          <Text className="font-WorksansMedium text-xl text-black">
            {user.uid}
          </Text>
          {isCopied ? (
            <Icon name="checkmark-outline" size={24} color={'green'} />
          ) : (
            <Icon name="copy-outline" size={24} color={'grey'} />
          )}
        </Pressable>
        <Pressable className="ml-5 bg-green-200 p-2 rounded-lg" onPress={onShare}>
          <Icon name="share-social-outline" size={24} color={'grey'} />
        </Pressable>
      </View>
    </View>
  );
};

export default Refer;

const styles = StyleSheet.create({});
