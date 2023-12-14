import {useRoute} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Text,
  View,
} from 'react-native';
import {useMyTeamsQuery} from '../../../Services/API/HomeAPI';
import EmptyState from '../../../components/EmptyState';
import ErrorState from '../../../components/ErrorState';
import Loading from '../../../components/Loading';

const MyTeams = () => {
  const {
    params:{matchId},
  } = useRoute();

  // const {isError,isLoading,} = useMyTeamsQuery(MatchId)

  // console.log('+++> ',params)

  const {isError, error, isLoading, isSuccess, data} = useMyTeamsQuery(matchId);

  if (isLoading) {
    return <Loading />;
  }
  if (isSuccess) {
    return (
      <View className="flex-1 bg-gray-100">
        <FlatList
          data={data}
          className="m-3"
          ListEmptyComponent={
            <EmptyState
              subtitle={"You haven't created a team Yet!"}
              title={'No Team Found !'}
            />
          }
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <TeamCard item={item} />}
        />
      </View>
    );
  }

  if (isError) {
    return <ErrorState error={error} />;
  }
};

export default MyTeams;

const TeamCard = ({item, Purpose, onTeamSelect}) => {
  return (
    <Pressable>
      <ImageBackground
        source={require('../../../../assets/images/playground.jpg')}
        imageStyle={{borderRadius: 12}}
        className="w-full h-40 justify-end rounded-xl mb-3">
        <Captain item={item} />
        <View className=" p-1 flex-row justify-around py-1">
          <Stats Key={'WK'} Value={item?.teamStats.wicketBatterCount} />
          <Stats Key={'BAT'} Value={item?.teamStats.BatsmanCount} />
          <Stats Key={'AR'} Value={item?.teamStats.AllRounderCount} />
          <Stats Key={'BOL'} Value={item?.teamStats.BowlerCount} />
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const Stats = ({Key, Value}) => {
  return (
    <View className="flex-row">
      <Text className="font-WorksansRegular text-base text-white">{Key}</Text>
      <Text className="font-WorksansSemiBold text-base ml-2 text-white">
        {Value}
      </Text>
    </View>
  );
};

const Captain = ({item}) => {
  return (
    <View className="flex-row justify-around items-center">
      <View className="w-20">
        <View className="absolute z-10 p-1  w-7 h-7 items-center justify-center rounded-full -left-5 -top-5 border bg-white">
          <Text className="font-WorksansMedium text-sm text-black">C</Text>
        </View>
        <Image
          source={{uri: item?.teamStats.captain.image}}
          className=" h-20 rounded-t-md"
        />
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          className="bg-white font-WorksansMedium text-xs text-black p-1 rounded-sm">
          {item?.teamStats.captain.name}
        </Text>
      </View>
      <View className="w-20">
        <View className="absolute z-10 p-1  items-center justify-center rounded-full -left-5 -top-5 border bg-white">
          <Text className="font-WorksansMedium text-sm text-black">VC</Text>
        </View>
        <Image
          source={{uri: item?.teamStats.viceCaptain.image}}
          className="h-20 rounded-t-md"
        />
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          className="bg-white font-WorksansMedium text-xs text-black p-1  rounded-sm">
          {item?.teamStats.viceCaptain.name}
        </Text>
      </View>
    </View>
  );
};
