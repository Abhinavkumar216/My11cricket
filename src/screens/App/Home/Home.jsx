import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {FlatList, RefreshControl, StatusBar, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useHomeDataQuery} from '../../../Services/API/HomeAPI';
import {useLazyUserDetailsQuery} from '../../../Services/API/UserAPI';
import {checkNotificationPermission} from '../../../Services/NotificationServices';
import Corousal from '../../../components/Corousal';
import ErrorState from '../../../components/ErrorState';
import Loading from '../../../components/Loading';
import CompletedCard from './CompletedCard';
import HomeHeader from './HomeHeader';
import UpcomingCard from './UpcomingCard';
import messaging from '@react-native-firebase/messaging';

const Home = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  const {isError, isLoading, isFetching, isSuccess, data, error, refetch} =
    useHomeDataQuery();
  const [onUserFetch] = useLazyUserDetailsQuery();

  useEffect(() => {
    onUserFetch();
  }, []);

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      // console.log(
      //   'Notification caused app to open from background state:',
      //   remoteMessage,
      // );
      if (remoteMessage.data.TYPE === 'MATCH') {
        navigation.push('UpcomingMatches', remoteMessage.data);
      }
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          // console.log(
          //   'Notification caused app to open from quit state:',
          //   remoteMessage,
          // );
          if (remoteMessage.data.TYPE === 'MATCH') {
            navigation.push('UpcomingMatches', remoteMessage.data);
          }
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
      });
  }, []);

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
  if (isError) {
    return <ErrorState error={error} />;
  }

  if (isSuccess) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-50">
        <StatusBar animated backgroundColor={'#181928'} translucent />
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
                <Text className="font-WorksansSemiBold text-xl text-black ml-3">
                  Upcoming{' '}
                  <Text className="font-WorksansRegular text-xl text-black ml-3">
                    Matches
                  </Text>
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
