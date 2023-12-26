import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {Image, ImageBackground, Pressable, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CountdownTimer from '../../../components/Countdown';


const UpcomingCard = ({item}) => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      start={{x: 1, y: 0}}
      end={{x: 0, y: 0}}
      colors={['rgba(229, 86, 4, 0.1)', '#ffffff50']}
      className=" mx-3 mt-2 border rounded-xl border-zinc-200 bg-white">
      <Pressable
        onPress={() =>
          navigation.navigate('UpcomingMatches', {
            MatchId: item?.matchId,
            team1: item?.team1?.teamSName,
            team1Flag: item?.team1?.imageLink,
            team2: item?.team2?.teamSName,
            team2Flag: item?.team2?.imageLink,
          })
        }>
        <View className="bg-white px-3 rounded-t-xl py-2 flex-row justify-between">
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            className="font-WorksansRegular text-xs flex-1 text-black">
            {item?.seriesName}
          </Text>
          <Text
            ellipsizeMode="tail"
            className="font-WorksansMedium text-right text-amber-600 text-xs">
            {item?.matchDesc}
          </Text>
        </View>
        <View className="flex-row px-3 py-1">
          <Competitor1 team1={item?.team1} />
          <Status timer={item?.startDate} />
          <Competitor2 team2={item?.team2} />
        </View>

        {/* <View className="border-t  border-gray-200 mx-3" /> */}
        <LinearGradient
          colors={['rgba(229, 86, 4, 0.9)', '#ffffff00']}
          start={{x: 0, y: 0}}
          end={{x: 0.7, y: 0}}
          className="w-5/5 rounded-l-xl px-3 mx-3 mb-1 py-1 flex-row justify-between">
          <Text className="font-WorksansSemiBold text-white w-2/3 text-xs">
            MEGA {item?.megaPrize}
          </Text>
          {item?.isLineupOut && <Text className="font-WorksansSemiBold text-green-600 text-xs">
            Lineup Out
          </Text>}
        </LinearGradient>
      </Pressable>
    </LinearGradient>
  );
};

export default UpcomingCard;

const Competitor1 = ({team1}) => {
  return (
    <View>
      <View className="flex-row items-center">
        {team1?.imageLink && (
          <Image
            source={{uri: team1?.imageLink}}
            className="w-10 h-10 mr-1 rounded-full"
            resizeMode="contain"
          />
        )}
        <Text className="text-base font-WorksansSemiBold text-zinc-700">
          {team1?.teamSName}
        </Text>
      </View>
      <Text
        ellipsizeMode="tail"
        className="text-xs font-WorksansRegular text-black ">
        {team1?.teamName.slice(0, 15)}
      </Text>
    </View>
  );
};

const Status = ({timer}) => {
  return (
    <View className="flex-1 self-center items-center">
      <CountdownTimer remaining={timer} />
      <Text className="text-xs font-WorksansMedium text-black ml-2 mt-1">
        {moment(timer).format('D MMM h:mm A')}
      </Text>
    </View>
  );
};

const Competitor2 = ({team2}) => {
  return (
    <View>
      <View className="flex-row items-center justify-between ">
        <Text className="text-base font-WorksansSemiBold text-black text-right">
          {team2?.teamSName}
        </Text>
        {team2?.imageLink && (
          <Image
            source={{uri: team2?.imageLink}}
            className="w-10 h-10 ml-1 rounded-full"
            resizeMode="contain"
          />
        )}
      </View>
      <Text
        ellipsizeMode="tail"
        className="text-xs font-WorksansRegular text-black text-right">
        {team2?.teamName.slice(0, 15)}
      </Text>
    </View>
  );
};
