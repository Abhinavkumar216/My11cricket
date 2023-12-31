import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Pressable, RefreshControl, SectionList, Text, View} from 'react-native';
import {ProgressBar} from 'react-native-paper';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {useUpcomingContestsQuery} from '../../../Services/API/UpcomingAPI';
import {userstate} from '../../../Services/State/userSlice';
import ErrorState from '../../../components/ErrorState';
import Loading from '../../../components/Loading';
import Icon from 'react-native-vector-icons/Ionicons';

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
      className="ml-4 ">
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
        <Text className="font-WorksansRegular text-black text-sm">Prize Pool</Text>
        <Text className="font-WorksansRegular text-black text-sm">Entry</Text>
      </View>

      <View className="flex-row justify-between my-2 items-center px-3 ">
        <Text className="font-WorksansSemiBold text-2xl text-black">
          {item?.prizePool}
        </Text>
        <Pressable
          className="bg-green-400 rounded-md px-5 py-1"
          disabled={user?.poolEntries?.includes(item._id)}
          onPress={onjoinpool}>
          <Text className="font-WorksansMedium text-white text-base text-center">
            {user?.poolEntries?.includes(item._id)
              ? 'Joined'
              : ` ${item?.entryFee}`}
          </Text>
        </Pressable>
      </View>

      <View className=" px-3 mb-2">
        <ProgressBar
          progress={item.joinedPlayers / item?.totalPlayersToJoin}
          color={'#181928'}
          className='rounded-lg'
        />
        <View className="flex-row justify-between">
          <Text className="font-WorksansRegular text-red-500 text-xs">
            {item?.joinedPlayers} Player Joined
          </Text>
          <Text className="font-WorksansRegular text-gray-500 text-xs">
            {item?.totalPlayersToJoin} Spots
          </Text>
        </View>
      </View>

      <View className="bg-green-100 px-3 flex-row justify-around py-1">
        <View className="flex-row items-center flex-1">
          <Icon name="medal-outline" size={12} color={'#000'} />
          <Text className="text-neutral-900 font-WorksansRegular text-xs ml-1">
            {item?.firstPrize}
          </Text>
        </View>
        <View className="flex-row items-center flex-1">
          <Icon name="trophy-outline" size={12} color={'#000'} />

          <Text className="text-neutral-900 font-WorksansRegular text-xs ml-1">
            {item?.winnerPercentage}%
          </Text>
        </View>
        <View className="flex-row items-center flex-1">
          <Icon name="woman-outline" size={12} color={'#000'} />
          <Text className="text-neutral-900 font-WorksansRegular text-xs ml-1">
            Single
          </Text>
        </View>
        <View className="flex-row items-center flex-1">
          <Icon name="shuffle-outline" size={12} color={'#000'} />
          <Text className="text-neutral-900 font-WorksansRegular text-xs ml-1">
            Flexible
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};
