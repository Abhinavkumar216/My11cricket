import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useMycontestsQuery} from '../../../Services/API/HomeAPI';
import {useRoute} from '@react-navigation/native';
import Loading from '../../../components/Loading';
import ErrorState from '../../../components/ErrorState';
import EmptyState from '../../../components/EmptyState';

const MyContest = () => {
  const {
    params: {matchId},
  } = useRoute();
  // console.log(params)
  const {isError, isLoading, isSuccess, data, error} =
    useMycontestsQuery(matchId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorState error={error} />;
  }
  if (isSuccess) {
    return (
      <View className="flex-1 bg-gray-100">
        <FlatList
          data={data}
          ListEmptyComponent={
            <EmptyState title={"No Contest Available"} subtitle={"Play Some Contest"}/>
          }
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <SpotCard item={item} />}
        />
      </View>
    );
  }
};

export default MyContest;

const SpotCard = ({item}) => {
  return (
    <View className="border border-neutral-200 rounded-xl mx-2 mt-3 bg-white">
      <View className="p-3 flex-row justify-between ">
        <Text className="font-WorksansMedium text-base text-black">
          {item.type}
        </Text>
        <Text className="font-WorksansSemiBold text-black">
          {item.firstPrize}
        </Text>
      </View>
      <View className="px-3 py-2 flex-row justify-between bg-gray-100">
        <Text className="font-WorksansRegular text-sm text-black">Glory awaits! </Text>
        <Text className="font-WorksansRegular text-sm ml-5 text-black">Single!</Text>
        <Text className="font-WorksansRegular text-sm flex-1 text-right text-black">
        Flexible!
        </Text>
      </View>
      <View className="px-3 py-1 flex-row justify-between bg-orange-100 rounded-br-xl">
        <Text className="font-WorksansRegular text-base text-black">
          {item.team.userUid}
        </Text>
        <Text className="font-WorksansRegular text-base text-black">
          {' '}
          {item.winnerPercentage}%
        </Text>
        <Text className="font-WorksansSemiBold text-lg text-black  text-right">
          {item.entryFee} coin
        </Text>
      </View>
      <LinearGradient
        colors={['#ff8540', '#ffffff00']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        className="w-3/4 rounded-bl-xl px-3 py-1">
        <Text className="font-WorksansSemiBold text-white w-2/3">
          Fight for your Glory
        </Text>
      </LinearGradient>
    </View>
  );
};
