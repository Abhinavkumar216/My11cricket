import React, {useEffect} from 'react';
import {FlatList, StatusBar, Text, View, RefreshControl} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useHomeDataQuery} from '../../../Services/API/HomeAPI';
import {useLazyUserDetailsQuery} from '../../../Services/API/UserAPI';
import Corousal from '../../../components/Corousal';
import ErrorState from '../../../components/ErrorState';
import Loading from '../../../components/Loading';
import CompletedCard from './CompletedCard';
import HomeHeader from './HomeHeader';
import UpcomingCard from './UpcomingCard';
import {GetPermission} from '../../../Services/NotificationServices';

const Home = () => {

  const [refreshing, setRefreshing] = React.useState(false);
  const {isError, isLoading,isFetching, isSuccess, data, error, refetch} = useHomeDataQuery();
  const [onUserFetch] = useLazyUserDetailsQuery();

  useEffect(() => {
    onUserFetch();
  }, []);

  useEffect(() => {
    GetPermission();
  }, []);



  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refetch();
    wait(2000).then(() => setRefreshing(false));
  }, []);


  if (isLoading || isFetching ) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorState error={error} />;
  }
  if (isSuccess) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-50">
        <StatusBar animated backgroundColor={'#000'} translucent />
        <HomeHeader />
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
            />
          }
          ListHeaderComponent={
            <>
              <CompletedCard Data={data?.myMatches} />
              {/* Corousal */}
              <Corousal Data={data?.carousalItems} />
              {/* Upcoming Matches */}
              <View className="  justify-between">
                <Text className="font-WorksansMedium text-xl text-black ml-3">
                  Upcoming Matches
                </Text>
              </View>
            </>
          }
          contentContainerStyle={{paddingBottom: 25}}
          data={data?.allUpcomingMatches}
          renderItem={({item}) => <UpcomingCard item={item} />}
        />
      </SafeAreaView>
    );
  }
};

export default Home;
