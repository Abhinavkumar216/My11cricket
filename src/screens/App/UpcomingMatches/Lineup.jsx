import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
// import {SafeAreaView} from 'react-native-safe-area-context';

const Lineup = () => {
  const {
    params: {data},
  } = useRoute();
  // console.log('=>',params);
  return (
    <SafeAreaView className="flex-1">
      <ImageBackground
        source={require('../../../../assets/images/ground.jpg')}
        className=" flex-1 h-full w-full">
        <FlatList
          data={data}
          numColumns={3}
          contentContainerStyle={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            alignItems: 'center',
            // alignContent:'space-around'
          }}
          renderItem={({item}) => <PlayerCard item={item} />}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Lineup;

const PlayerCard = ({item}) => {
  console.log('item =>', item);
  return (
    <View className=" w-24 m-5">
      
      {item.isCaptain && (
        <View className="absolute z-10 p-1 w-7 h-7 items-center justify-center rounded-full -left-2 -top-2  bg-white">
          <Text className="font-WorksansMedium text-sm text-black">C</Text>
        </View>
      )}
      {item.isViceCaptain && (
        <View className="absolute z-10 p-1  items-center justify-center rounded-full -left-2 -top-2  bg-white">
          <Text className="font-WorksansMedium text-sm text-black">VC</Text>
        </View>
      )}
      <Image
        source={{
          uri: `http://i.cricketcb.com/stats/img/faceImages/${item.playerId}.jpg`,
        }}
        className=" h-24 w-24 rounded-t-md"
        resizeMode="contain"
      />
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        className="bg-white font-WorksansMedium text-xs text-black p-1 rounded-sm">
        {item.name}
      </Text>
      <Text
        className="bg-neutral-300 text-center font-WorksansMedium text-xs text-black p-1 rounded-sm">
        {item.role}
      </Text>
    </View>
  );
};
