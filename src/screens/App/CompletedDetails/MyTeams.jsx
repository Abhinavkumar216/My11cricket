import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
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
import Animated, {FadeInDown} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import {showToast} from '../../../Services/Functions/AuthFunction';
import {useDeleteTeamMutation} from '../../../Services/API/UpcomingAPI';

const MyTeams = () => {
  const {
    params: {matchId, matchStatus},
  } = useRoute();

  const navigation = useNavigation();

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
          renderItem={({item, index}) => (
            <TeamCard
              item={item}
              index={index}
              navigation={navigation}
              matchStatus={matchStatus}
            />
          )}
        />
      </View>
    );
  }

  if (isError) {
    return <ErrorState error={error} />;
  }
};

export default MyTeams;

const TeamCard = ({item, navigation, index, matchStatus}) => {
  // const [CallDeleteTeam] = useDeleteTeamMutation();

  const OnEditTeams = () => {
    if (matchStatus == 'Upcoming') {
      navigation.navigate('EditTeams', {item: item});
    } else {
      showToast({
        type: 'info',
        heading: "Can't Edit Team",
        subheading: "Can't edit Team in Live or Completed Match",
      });
    }
  };

  return (
    <Animated.View entering={FadeInDown.delay(index * 200).duration(1000)}>
      <Pressable onPress={()=> navigation.navigate('Lineup', {data: item.team})}>
        <ImageBackground
          source={require('../../../../assets/images/playground.jpg')}
          imageStyle={{borderRadius: 12}}
          className="w-full h-40 justify-end rounded-xl mb-3">
          <View
            style={{backgroundColor: 'rgba(0,0,0,0.4)'}}
            className="flex-row justify-between px-5 rounded-t-xl absolute top-0 w-full py-2">
            <Text className="font-WorksansMedium text-base text-white">
              {item.userUid}
            </Text>
            <View className="flex-row">
              <Pressable className="px-3" onPress={OnEditTeams}>
                <Icon name="create-outline" size={21} color={'white'} />
              </Pressable>
            </View>
          </View>
          <Captain item={item} />
          <View
            // style={{backgroundColor: 'rgba(0,0,0,0.4)'}}
            className=" p-1 flex-row justify-around rounded-b-xl">
            <Stats Key={'WK'} Value={item?.teamStats.wicketBatterCount} />
            <Stats Key={'BAT'} Value={item?.teamStats.BatsmanCount} />
            <Stats Key={'AR'} Value={item?.teamStats.AllRounderCount} />
            <Stats Key={'BOL'} Value={item?.teamStats.BowlerCount} />
          </View>
        </ImageBackground>
      </Pressable>
    </Animated.View>
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

const ShortName = name => {
  if (name.length >= 12) {
    const nameSlice = name.split(' ');
    // console.log(name, '<<>>', nameSlice[0].charAt(0).concat(' ', nameSlice[1]));
    return nameSlice[0].charAt(0).concat(' ', nameSlice[1]);
  } else {
    return name;
  }
};

const Captain = ({item}) => {
  return (
    <View className="flex-row justify-around items-center">
      <View className="w-20 items-center">
        <View className="absolute z-10 p-1  w-7 h-7 items-center justify-center rounded-full -left-2 -top-2  bg-white">
          <Text className="font-WorksansMedium text-sm text-black">C</Text>
        </View>
        <Image
          source={{uri: item?.teamStats.captain.image}}
          className=" h-14 w-14 rounded-t-md"
        />
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          className="bg-white font-WorksansMedium text-[10px] text-black p-1 rounded-sm">
          {ShortName(item?.teamStats.captain.name)}
        </Text>
      </View>
      <View className="w-20 items-center">
        <View className="absolute z-10 p-1  items-center justify-center rounded-full -left-2 -top-2  bg-white">
          <Text className="font-WorksansMedium text-sm text-black">VC</Text>
        </View>
        <Image
          source={{uri: item?.teamStats.viceCaptain.image}}
          className="h-14 w-14 rounded-t-md"
        />
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          className="bg-white font-WorksansMedium text-[10px] text-black p-1  rounded-sm">
          {ShortName(item?.teamStats.viceCaptain.name)}
        </Text>
      </View>
    </View>
  );
};
