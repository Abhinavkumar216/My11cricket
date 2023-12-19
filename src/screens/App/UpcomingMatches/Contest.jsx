import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Pressable, SectionList, Text, View, RefreshControl} from 'react-native';
import {MD3Colors, ProgressBar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {useUpcomingContestsQuery} from '../../../Services/API/UpcomingAPI';
import {joinpool, setPurpose} from '../../../Services/State/joinPoolSlice';
import {userstate} from '../../../Services/State/userSlice';
import ErrorState from '../../../components/ErrorState';
import Loading from '../../../components/Loading';
import Animated, {FadeInDown, FadeInRight} from 'react-native-reanimated';

const Contest = () => {
  const {
    params: {MatchId},
  } = useRoute();

  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const {isError, isLoading, isFetching, isSuccess, data, error, refetch} =
    useUpcomingContestsQuery(MatchId);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  if (isLoading || isFetching) {
    return <Loading />;
  }

  if (isSuccess) {
    return (
      <View className="flex-1 bg-neutral-100">
        <SectionList
          sections={data}
          contentContainerStyle={{paddingBottom: 25}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
            />
          }
          renderSectionHeader={({section, index}) => (
            <ContestHeader title={section.title} index={index} />
          )}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => (
            <ContestCard item={item} index={index} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }

  if (isError) {
    return <ErrorState error={error} />;
  }
};

export default Contest;

const ContestHeader = ({title, index}) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 200).duration(1000)}
      className="ml-4 mt-2">
      <Text className="font-WorksansMedium text-lg text-black">{title}</Text>
    </Animated.View>
  );
};

const ContestCard = ({item, navigation, index}) => {
  // const dispatch = useDispatch();
  const user = useSelector(userstate);

  const onjoinpool = async () => {
    try {
      // dispatch(setPurpose());
      // dispatch(joinpool({...item, mobile: user.mobile}));
      navigation.navigate('MyTeams', {
        item: item,
        mobile: user.mobile,
        PURPOSE: true,
      });
    } catch (error) {
      console.error('error in joining pool', error);
    }
  };
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 200).duration(1000)}
      className="border-2 mx-3  rounded-xl bg-white my-1 border-zinc-200">
      <View className="flex-row justify-between px-3 pt-1">
        <Text className="font-WorksansRegular text-black">Prize Pool</Text>
        <Text className="font-WorksansRegular text-black">Entry</Text>
      </View>

      <View className="flex-row justify-between my-2 items-center px-3 ">
        <Text className="font-WorksansSemiBold text-2xl text-black">
          {item?.prizePool}
        </Text>
        <Pressable
          className="bg-green-600 rounded-md px-5 py-1"
          disabled={user?.poolEntries?.includes(item._id)}
          onPress={onjoinpool}>
          <Text className="font-WorksansMedium text-white text-base">
            {user?.poolEntries?.includes(item._id)
              ? 'Joined'
              : ` ${item?.entryFee}`}
          </Text>
        </Pressable>
      </View>

      <View className=" px-3 mb-2">
        <ProgressBar
          theme={{colors: {primary: '#fff'}}}
          progress={item.joinedPlayers / item?.totalPlayersToJoin}
          color={'#181928'}
        />
        <View className="flex-row justify-between">
          <Text className="font-WorksansRegular text-red-500">
            {item?.joinedPlayers} Player Joined
          </Text>
          <Text className="font-WorksansRegular text-gray-500">
            {item?.totalPlayersToJoin} Spots
          </Text>
        </View>
      </View>

      <View className="bg-white px-3 rounded-xl flex-row justify-around py-2">
        <Text className="text-neutral-900 font-WorksansRegular">
          {item?.firstPrize}
        </Text>
        <Text className="text-neutral-900 font-WorksansRegular">
          {item?.winnerPercentage}%
        </Text>
        <Text className="text-neutral-900 font-WorksansRegular">Single</Text>
        <Text className="text-neutral-900 font-WorksansRegular">Flexible</Text>
      </View>
    </Animated.View>
  );
};
