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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
            />
          }
          renderSectionHeader={({section}) => (
            <ContestHeader title={section.title} />
          )}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ContestCard item={item} navigation={navigation} />
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

const ContestHeader = ({title}) => {
  return (
    <View className="ml-4 mt-3">
      <Text className="font-WorksansSemiBold text-lg text-black">{title}</Text>
    </View>
  );
};

const ContestCard = ({item, navigation}) => {
  const dispatch = useDispatch();
  const user = useSelector(userstate);

  const onjoinpool = async () => {
    try {
      // dispatch(setPurpose());
      // dispatch(joinpool({...item, mobile: user.mobile}));
      navigation.navigate('MyTeams', {
        item: item,
        mobile: user.mobile,
        PURPOSE:true
      });
    } catch (error) {
      console.error('error in joining pool', error);
    }
  };
  return (
    <View className="border mx-3  rounded-xl bg-white my-1 border-gray-400">
      <View className="flex-row justify-between px-3 pt-3">
        <Text className="font-WorksansRegular">Prize Pool</Text>
        <Text className="font-WorksansRegular">Entry</Text>
      </View>

      <View className="flex-row justify-between my-2 items-center px-3">
        <Text className="font-WorksansSemiBold text-2xl text-black">
          {item?.prizePool}
        </Text>
        <Pressable
          className="bg-green-600 rounded-md px-5 py-2"
          disabled={user?.poolEntries?.includes(item._id)}
          onPress={onjoinpool}>
          <Text className="font-WorksansMedium text-white text-base">
            {user?.poolEntries?.includes(item._id)
              ? 'Joined'
              : ` ${item?.entryFee}`}
          </Text>
        </Pressable>
      </View>

      <View className="my-2 px-3">
        <ProgressBar
          progress={item.joinedPlayers / item?.totalPlayersToJoin}
          color={MD3Colors.error60}
        />
        <View className="flex-row justify-between my-2">
          <Text className="font-WorksansRegular text-red-500">
            {item?.joinedPlayers} Player Joined
          </Text>
          <Text className="font-WorksansRegular text-gray-500">
            {item?.totalPlayersToJoin} Spots
          </Text>
        </View>
      </View>

      <View className="bg-neutral-200 px-3 rounded-b-xl py-2 flex-row justify-around">
        <Text className="text-neutral-900 font-WorksansRegular">
          {item?.firstPrize}
        </Text>
        <Text className="text-neutral-900 font-WorksansRegular">
          {item?.winnerPercentage}%
        </Text>
        <Text className="text-neutral-900 font-WorksansRegular">Single</Text>
        <Text className="text-neutral-900 font-WorksansRegular">Flexible</Text>
      </View>
    </View>
  );
};
