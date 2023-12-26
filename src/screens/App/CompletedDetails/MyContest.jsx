import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useMycontestsQuery} from '../../../Services/API/HomeAPI';
import {useNavigation, useRoute} from '@react-navigation/native';
import Loading from '../../../components/Loading';
import ErrorState from '../../../components/ErrorState';
import EmptyState from '../../../components/EmptyState';
import Icon from 'react-native-vector-icons/Ionicons';

const MyContest = () => {
  const {
    params: {matchId, matchStatus},
  } = useRoute();
  const navigation = useNavigation();
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
            <EmptyState
              title={'No Contest Available'}
              subtitle={'Play Some Contest'}
            />
          }
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <SpotCard navigation={navigation} item={item} />
          )}
        />
      </View>
    );
  }
};

export default MyContest;

const SpotCard = ({item, navigation}) => {
  // console.log('Item => ', item);
  return (
    <Pressable
      onPress={() => navigation.push('LeaderboardPanel', {Id: item._id,type:item.type})}
      className="border border-neutral-400 rounded-xl mx-2 mt-3 bg-white">
      <View className="pt-2 px-3 flex-row justify-between ">
        <Text className="font-WorksansMedium text-base text-black">
          {item.type}
        </Text>
        <View className="flex-row items-center">
          <Icon name="medal-outline" size={18} color={'green'} />
          <Text className="font-WorksansSemiBold text-black text-base ml-1">
            {item.winnerPercentage}%
          </Text>
        </View>
      </View>
      <View className="px-3 py-3 flex-row justify-between bg-white">
        <Text className="font-WorksansRegular text-sm text-black">
          Glory awaits!{' '}
        </Text>
        <Text className="font-WorksansRegular text-sm  text-black">
          Single!
        </Text>
        <Text className="font-WorksansRegular text-sm text-black">
          Flexible!
        </Text>
      </View>
      {/* <View className="px-3 py-1 flex-row justify-between bg-orange-100 rounded-br-xl">
        <Text className="font-WorksansRegular text-base text-black">
          {item.team.userUid}
        </Text>
        <View>
          <Text className="font-WorksansSemiBold text-lg text-black  text-right">
            {item.entryFee} coin
          </Text>
        </View>
      </View> */}
      <LinearGradient
        colors={['#ff8540', '#ffffff']}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
        className="w-full flex-row justify-between rounded-b-xl px-3 py-1">
        <View className="flex-row items-center">
          <Icon name="trophy" size={24} color={'black'} />
          <Text className="font-WorksansSemiBold text-black ml-1 text-base">
            {item.firstPrize} Coin
          </Text>
        </View>
        <Text className="font-WorksansMedium text-white text-right text-base">
          Check All Winners {`>>>`}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};
