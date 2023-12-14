import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CountdownTimer from '../../../components/Countdown';

const UpcomingCard = ({item}) => {
  const navigation = useNavigation();
  // console.log(item);

  
  return (
    <Pressable
      onPress={() =>
        navigation.navigate('UpcomingMatches', {
          MatchId: item?.matchId,
          team1: item?.team1?.teamSName,
          team1Flag: item?.team1?.imageLink,
          team2: item?.team2?.teamSName,
          team2Flag: item?.team2?.imageLink,
        })
      }
      className=" mx-3 mt-3 border rounded-xl border-gray-300 bg-white">
      <View className="bg-gray-200 px-3 rounded-t-xl py-2 flex-row justify-between">
        <Text  ellipsizeMode='tail'  numberOfLines={1} className="font-WorksansRegular flex-1 text-black">
          {item?.seriesName}
        </Text>
        <Text ellipsizeMode='tail' className="font-WorksansRegular  text-right text-black">
          # {item?.matchDesc}
        </Text>
      </View>
      <View className="flex-row p-3">
        <Competitor1 team1={item?.team1} />
        <Status timer={item?.startDate} />
        <Competitor2 team2={item?.team2} />
      </View>

      <View className="border-t  border-gray-200 mx-3" />
      <LinearGradient
        colors={['#E55604', '#ffffff00']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        className="w-2/3 rounded-bl-xl px-3 py-1">
        <Text className="font-WorksansSemiBold text-white w-2/3">
          MEGA {item?.megaPrize}
        </Text>
      </LinearGradient>
    </Pressable>
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
            className="w-14 h-14 mr-1"
            resizeMode="contain"
          />
        )}
        <Text className="text-xl font-WorksansSemiBold text-black">
          {team1?.teamSName}
        </Text>
      </View>
      <Text
        ellipsizeMode="tail"
        className="text-sm font-WorksansRegular text-black ">
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
      <View className="flex-row items-center justify-between">
        <Text className="text-xl font-WorksansSemiBold text-black text-right">
          {team2?.teamSName}
        </Text>

        {team2?.imageLink && (
          <Image
            source={{uri: team2?.imageLink}}
            className="w-14 h-14 ml-1"
            resizeMode="contain"
          />
        )}
      </View>
      <Text
        ellipsizeMode="tail"
        className="text-sm font-WorksansRegular text-black text-right">
        {team2?.teamName.slice(0, 15)}
      </Text>
    </View>
  );
};
