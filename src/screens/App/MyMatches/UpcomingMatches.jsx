import React from 'react';
import {Dimensions, FlatList, Image, Pressable, Text, View} from 'react-native';
import {useMymatchesQuery} from '../../../Services/API/HomeAPI';
import Loading from '../../../components/Loading';
import ErrorState from '../../../components/ErrorState';
import EmptyState from '../../../components/EmptyState';
import moment from 'moment';

const UpcomingMatches = ({navigation}) => {
  const {isError, error, isLoading, isSuccess, data} =
    useMymatchesQuery('Upcoming');

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorState error={error} />;
  }
  if (isSuccess) {
    return (
      <View>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}
          ListEmptyComponent={
            <EmptyState
              title={'No Upcoming Match '}
              subtitle={'Join contest and play now'}
            />
          }
          renderItem={({item}) => <Card navigation={navigation} item={item} />}
        />
      </View>
    );
  }
};

export default UpcomingMatches;

export const Card = ({navigation, item}) => {
  return (
    <Pressable
      onPress={() => navigation.navigate('Details', {item})}
      className="flex-1 ">
      <View className="border rounded-xl border-gray-300 mx-3 mt-3 bg-white">
        <View className="bg-gray-200 rounded-t-xl p-1 px-2 py-2">
          <Text className="text-black font-WorksansRegular">
            {item.match.seriesName}
          </Text>
        </View>
        <View className="flex-row px-3 pt-3">
          <Competitor1 team={item?.match?.team1} />
          <Status matchStatus={item.matchStatus} time={item.match.startDate} />
          <Competitor2 team={item?.match?.team2} />
        </View>
        <View className="border-t my-2  border-gray-200" />
        <View className="flex-row px-3 pb-3">
          <Text className="font-WorksansRegular text-gray-600">
            {item.totalTeams} Team {item.totalContestsJoined} Contest
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const Competitor1 = ({team}) => {
  return (
    <View>
      <View className="flex-row items-center">
        {team?.imageLink && (
          <Image
            source={{uri: team?.imageLink}}
            className="w-14 h-14 mr-1"
            resizeMode="contain"
          />
        )}
        <Text className="text-xl font-WorksansSemiBold text-black">
          {team?.teamSName}
        </Text>
      </View>
      <Text
        ellipsizeMode="tail"
        className="text-sm font-WorksansRegular text-black ">
        {team?.teamName.slice(0, 15)}
      </Text>
    </View>
  );
};

export const Status = ({matchStatus, time}) => {
  return (
    <View className="flex-1 self-center items-center">
      <Text className="text-base font-WorksansMedium text-black ml-2">
        {matchStatus}
      </Text>
      <Text className="text-xs font-WorksansMedium text-black ml-2">
        {moment(time).format('D MMM h:mm A')}
      </Text>
    </View>
  );
};

const Competitor2 = ({team}) => {
  return (
    <View>
      <View className="flex-row items-center">
        <Text className="text-xl font-WorksansSemiBold text-black">
          {team?.teamSName}
        </Text>
        {team?.imageLink && (
          <Image
            source={{uri: team?.imageLink}}
            className="w-14 h-14 ml-1"
            resizeMode="contain"
          />
        )}
      </View>
      <Text
        ellipsizeMode="tail"
        className="text-sm font-WorksansRegular text-black  text-right ">
        {team?.teamName.slice(0, 15)}
      </Text>
    </View>
  );
};
