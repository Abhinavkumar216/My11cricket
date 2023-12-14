import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const Leaderboard = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-gray-100">
      {/* <View className="border p-3 m-3 rounded-lg border-gray-300 bg-white ">
        <Top />
        <Competitiors />
        <Ranking navigation={navigation} />
      </View> */}
    </View>
  );
};

export default Leaderboard;

const Top = () => {
  return (
    <View className="flex-row justify-between border-b pb-2 bg-white border-neutral-300">
      <Text className="font-WorksansRegular text-black">ICC Worldcup 2023</Text>
      <Text className="font-WorksansMedium text-black">06 Oct, 2023</Text>
    </View>
  );
};

const Competitiors = () => {
  return (
    <View className="flex-row justify-between items-center  pb-2 border-neutral-300">
      <View>
        <Text className="text-black font-WorksansMedium">India</Text>
        <View className="flex-row items-center">
          <Image
            source={require('../../../../assets/images/india.png')}
            className="w-8 h-8 mr-3"
          />
          <Text className="text-black font-WorksansSemiBold text-xl">IND</Text>
        </View>
      </View>
      <Text className="font-WorksansSemiBold text-black text-lg">vs</Text>
      <View>
        <Text className="text-black font-WorksansMedium text-right">
          Pakistan
        </Text>
        <View className="flex-row items-center">
          <Text className="text-black font-WorksansSemiBold text-xl">PAK</Text>
          <Image
            source={require('../../../../assets/images/pak.png')}
            className="w-8 h-8 ml-3"
          />
        </View>
      </View>
    </View>
  );
};

const Ranking = ({navigation}) => {
  return (
    <Pressable onPress={() => navigation.push('LeaderboardPanel')}>
      <LinearGradient
        colors={['#ffffff', '#E55604']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        className="w-full rounded-r-lg  px-3 py-1 flex-row items-center justify-around">
        <View className="flex-row items-center">
          <Icon name="trophy-outline" size={26} color={'#000'} />
          <Text className="font-WorksansSemiBold text-lg text-black ml-3">
            $2 Crores
          </Text>
        </View>
        <Text className="font-WorksansSemiBold text-white w-2/3 text-right text-base">
          Check All Winners{' '}
          <Text className="font-WorksansRegular">{'>>>'}</Text>
        </Text>
      </LinearGradient>
    </Pressable>
  );
};
