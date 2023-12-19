import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

const PlayerProfile = () => {
  const {
    params: {item},
  } = useRoute();
console.log(JSON.stringify(item))
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center bg-[#181928]">
        <Image source={{uri: item?.image}} className="w-28 h-28 mr-3" />
        <View>
          <Text className="font-WorksansMedium text-2xl text-white">
            {item?.name}
          </Text>
          <Text className="font-WorksansRegular text-base text-white">
            {item?.role}
          </Text>
          <Text className="font-WorksansRegular text-base text-white">
            {item?.intlTeam}
          </Text>
        </View>
      </View>
      <ScrollView>
        <Text className='text-black font-WorksansRegular text-sm text-justify'>{item?.bio}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlayerProfile;
