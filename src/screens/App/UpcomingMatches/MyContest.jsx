import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Dimensions, FlatList, Image, Pressable, Text, View} from 'react-native';
import {useUpcomingMyContestQuery} from '../../../Services/API/UpcomingAPI';
import ErrorState from '../../../components/ErrorState';
import Loading from '../../../components/Loading';
import {ProgressBar} from 'react-native-paper';
import EmptyState from '../../../components/EmptyState';

const {width} = Dimensions.get('screen');

const CompletedMatches = ({navigation}) => {
  const {
    params: {MatchId},
  } = useRoute();
  // console.log(params)
  const {isError, error, isLoading, isSuccess, data} =
    useUpcomingMyContestQuery(MatchId);

  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess) {
    return (
      <View className="flex-1 bg-neutral-100">
        <FlatList
          data={data}
          ListEmptyComponent={
            <EmptyState title={"No Contest here!"} subtitle={"Play some contest"}/>
          }
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <Card navigation={navigation} item={item} />}
        />
      </View>
    );
  }

  if (isError) {
    return <ErrorState error={error} />;
  }
};

export default CompletedMatches;

export const Card = ({navigation, item}) => {
  // console.log('my contest item => ',item)
  return (
    <Pressable
      // onPress={() => navigation.navigate('Details')}
      className="flex-1 ">
      <View className="border rounded-xl border-gray-300 p-3 mx-3 my-1 bg-white">
        <Text className="font-WorksansMedium text-lg text-black">
          {item.type}
        </Text>
        <View>
          <ProgressBar
            progress={item.joinedPlayers / item.totalPlayersToJoin}
            color={'#181928'}
            className="my-2"
          />
          <View className="flex-row justify-between">
            <Text className="font-WorksansRegular text-sm text-black">
              {item.totalPlayersToJoin - item.joinedPlayers} left
            </Text>
            <Text className="font-WorksansRegular text-sm text-black">
              {item.totalPlayersToJoin} Spots
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between bg-neutral-200 px-2 py-1 my-2 rounded-sm">
          <View className="flex-row ">
            <Text className="font-WorksansRegular text-sm text-black">
              Glory await!
            </Text>
            <Text className="font-WorksansRegular text-sm ml-5 text-black">
              Single
            </Text>
          </View>
          <Text className="font-WorksansRegular text-sm  text-black">
            Guarnteed
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
