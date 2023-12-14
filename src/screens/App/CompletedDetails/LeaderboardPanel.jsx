import {Image, Pressable, StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const LeaderboardPanel = ({navigation}) => {
  return (
    <View className="bg-white flex-1 mt-16 rounded-xl">
      <Header />
      <TopCard />
      <FlatList
        data={[1, 2, 3]}
        ItemSeparatorComponent={<Saperator />}
        renderItem={() => <RemainingCard />}
      />
    </View>
  );
};

export default LeaderboardPanel;

const Header = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-row items-center  py-2 my-2 ">
      <Pressable onPress={() => navigation.pop()} className=" p-1 ml-2">
        <Icon name="arrow-back-outline" size={26} color={'#000'} />
      </Pressable>
      <View className="justify-center items-center flex-1 flex-row">
        <Image
          source={require('../../../../assets/images/india.png')}
          className="h-10 w-10"
        />
        <View className="justify-center items-center px-3">
          <Text className="font-WorksansSemiBold text-lg">IND vs PAK</Text>
          <Text className="font-WorksansRegular text-sm">
            win  12,000 | 23 Jul
          </Text>
        </View>
        <Image
          source={require('../../../../assets/images/pak.png')}
          className="h-10 w-10"
        />
      </View>
    </View>
  );
};

const TopPoints = () => {
  return (
    <View className="items-center mt-3">
      <Text className="font-WorksansMedium">Henrietta H.</Text>
      <Text className="font-semibold text-xl text-gray-900">800</Text>
      <Text className="font-WorksansMedium">270pts</Text>
    </View>
  );
};

const TopRank = ({rank}) => {
  return (
    <View className="absolute bg-black rounded-full justify-center items-center w-6 h-6 -bottom-3 ">
      <Text className="font-WorksansMedium text-white">{rank}</Text>
    </View>
  );
};

const TopCard = () => {
  return (
    <View className="flex-row justify-evenly items-end  py-3">
      <View>
        <View className="justify-center items-center">
          <Image
            source={require('../../../../assets/images/profile.jpg')}
            className="h-20 w-20 rounded-full"
          />
          <TopRank rank={2} />
        </View>
        <TopPoints />
      </View>

      <View>
        <View className="justify-center items-center">
          <Image
            source={require('../../../../assets/images/profile.jpg')}
            className="h-24 w-24 rounded-full"
          />
          <TopRank rank={1} />
        </View>
        <TopPoints />
      </View>

      <View>
        <View className="justify-center items-center">
          <Image
            source={require('../../../../assets/images/profile.jpg')}
            className="h-20 w-20 rounded-full"
          />
          <TopRank rank={3} />
        </View>
        <TopPoints />
      </View>
    </View>
  );
};

const RemainingCard = () => {
  return (
    <View className="flex-row items-center justify-between mx-2 py-4 px-4  bg-white">
      <View>
        <Text className="font-WorksansSemiBold text-2xl text-black">8</Text>
      </View>
      <View className="flex-1 ml-3 flex-row">
        <Image
          source={require('../../../../assets/images/profile.jpg')}
          className="w-12 h-12 rounded-full mr-3"
        />
        <View>
          <Text className="font-WorksansSemiBold text-xl text-neutral-700">
            You
          </Text>
          <Text className="font-WorksansRegular">130pts | Team 2</Text>
        </View>
      </View>
      <View>
        <Text className="font-WorksansMedium text-xl text-gray-900"> 110</Text>
      </View>
    </View>
  );
};

const Saperator = () => {
  return <View className="border-t mx-4 border-gray-200" />;
};
