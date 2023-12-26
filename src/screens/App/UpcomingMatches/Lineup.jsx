import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Text,
  View
} from 'react-native';
// import {SafeAreaView} from 'react-native-safe-area-context';

const Lineup = () => {
  const {
    params: {data},
  } = useRoute();
  // console.log('=>',params);
  return (
    <ImageBackground
      source={require('../../../../assets/images/ground.jpg')}
      className="flex-1 justify-evenly ">
      <View className="justify-center items-center">
        <Text className="font-WorksansMedium text-xs text-white mb-3">
          WICKET-KEEPERS
        </Text>
        <FlatList
          horizontal
          data={data.filter(team => team?.role === 'WK-Batsman')}
          renderItem={({item}) => <PlayerCard item={item} />}
        />
      </View>
      <View className="justify-center items-center">
        <Text className="font-WorksansMedium text-xs text-white mb-3">BATTERS</Text>
        <FlatList
          horizontal
          data={data.filter(team => team?.role === 'Batsman')}
          renderItem={({item}) => <PlayerCard item={item} />}
        />
      </View>
      <View className="justify-center items-center">
        <Text className="font-WorksansMedium text-xs text-white mb-3">
          ALL-ROUNDERS
        </Text>

        <FlatList
          horizontal
          data={data.filter(team => team?.role.includes('Allrounder'))}
          renderItem={({item}) => <PlayerCard item={item} />}
        />
      </View>
      <View className="justify-center items-center">
        <Text className="font-WorksansMedium text-xs text-white mb-3">BOWLERS</Text>

        <FlatList
          horizontal
          data={data.filter(team => team?.role === 'Bowler')}
          renderItem={({item}) => <PlayerCard item={item} />}
        />
      </View>
    </ImageBackground>
  );
};

export default Lineup;

const PlayerCard = ({item}) => {
  const nameSlice = item.name.split(' ');

  const ShortName = nameSlice[0].charAt(0).concat(' ', nameSlice[1]);
  return (
    <View className="m-3 items-center overflow-visible">
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
        className=" h-12 w-12 rounded-t-md rounded-full"
        resizeMode="contain"
      />
      <Text
        ellipsizeMode="tail"
        numberOfLines={1}
        className="bg-white font-WorksansMedium text-xs text-black p-1 rounded-sm w-14 ">
        {ShortName}
      </Text>
      {/* <Text className="bg-[#181928] text-center font-WorksansMedium text-xs text-white p-1 rounded-sm">
        {item.role}
      </Text> */}
    </View>
  );
};
