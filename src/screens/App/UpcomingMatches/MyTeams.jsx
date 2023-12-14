import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Text,
  View,
} from 'react-native';
import {FAB} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {
  useJoinPoolMutation,
  useUpcomingMyTeamsQuery,
} from '../../../Services/API/UpcomingAPI';
import {resetpool} from '../../../Services/State/joinPoolSlice';
import EmptyState from '../../../components/EmptyState';
import ErrorState from '../../../components/ErrorState';
import Loading from '../../../components/Loading';

import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import ButtonFull from '../../../components/ButtonFull';

const MyTeams = () => {
  const navigation = useNavigation();
  // const [purpose, setPurpose] = useState()
  const {
    params: {MatchId, team1, team1Flag, team2, team2Flag},
  } = useRoute();

  const {params} = useRoute();

  const route = useRoute();

  // console.log('Params =>', route);

  const dispatch = useDispatch();
  // const joinpool = useSelector(poolState);
  const purpose = params.PURPOSE;

  const [onJoinPool] = useJoinPoolMutation();

  const bottomSheetModalRef = useRef(null);

  // variables
  const snapPoints = useMemo(() => ['30%', '30%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(data => {
    bottomSheetModalRef.current?.present(data);
  }, []);
  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);
  const handleModalDismiss = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const {isError, error, isLoading, isSuccess, data} =
    useUpcomingMyTeamsQuery(MatchId);

  useEffect(() => {
    const backAction = () => {
      if (purpose) {
        Alert.alert('Discard Team', 'Your Team will not saved. are you sure?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Ok',
            onPress: () => {
              dispatch(resetpool());
              navigation.pop();
            },
          },
        ]);
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, [navigation]);

  const onTeamSelect = async teamId => {
    try {
      await onJoinPool({
        poolId: params.item._id,
        matchStatus: 'Upcoming',
        mobile: params.mobile,
        entryFee: params.item.entryFee,
        teamId: teamId,
      }).unwrap();
      navigation.popToTop();
    } catch (error) {
      console.error(error);
    }
  };



  if (isLoading) {
    return <Loading />;
  }
  if (isSuccess) {
    return (
      <View className="flex-1 bg-neutral-100">
        <BottomSheetModalProvider>
          {purpose && (
            <Text className="font-WorksansMedium text-lg  m-3 text-black">
              Click on Team to Play{' '}
            </Text>
          )}
          <FlatList
            data={data}
            className="m-3"
            ListEmptyComponent={
              <EmptyState
                subtitle={"You haven't created a team Yet!"}
                title={'No Team Found !'}
              />
            }
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <TeamCard
                item={item}
                purpose={purpose}
                navigation={navigation}
                handlePresentModalPress={handlePresentModalPress}
              />
            )}
          />
          <FAB
            icon="plus"
            color="#fff"
            label="Create Team"
            className="absolute  bottom-14 right-8 bg-black "
            onPress={() =>
              navigation.navigate('SelectTeams', {
                MatchId,
                team1,
                team1Flag,
                team2,
                team2Flag,
              })
            }
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            {props => {
              // console.log('BottomSheet props =>',)
              return (
                <View className="flex-1 ">
                  <Text className="font-WorksansMedium text-black text-center text-lg mt-5">
                    CONFIRMATION
                  </Text>
                  <Text className="font-WorksansRegular text-base text-black text-center my-5">
                    Are you Sure to Enter this Match?
                  </Text>
                  <ButtonFull
                    title={'Submit'}
                    onPress={() => onTeamSelect(props.data._id)}
                    buttonStyle={'bg-black mt-3'}
                    textStyle={'text-white'}
                  />
                </View>
              );
            }}
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </View>
    );
  }

  if (isError) {
    return <ErrorState error={error} />;
  }
};

export default MyTeams;

const TeamCard = ({item, handlePresentModalPress, purpose,navigation}) => {
  // const purpose = useSelector(purposeState);
  const onTeamCardClick = (item) => {
    if (purpose) {
      return handlePresentModalPress(item);
    } else {
      return navigation.navigate('Lineup', {data: item.team});
    }
  };

  return (
    <Pressable onPress={() => onTeamCardClick(item)}>
      <ImageBackground
        source={require('../../../../assets/images/playground.jpg')}
        imageStyle={{borderRadius: 12}}
        className="w-full h-40 justify-end rounded-xl mb-3">
        <Captain item={item} />
        <View className=" p-1 flex-row justify-around py-1">
          <Stats Key={'WK'} Value={item?.teamStats.wicketBatterCount} />
          <Stats Key={'BAT'} Value={item?.teamStats.BatsmanCount} />
          <Stats Key={'AR'} Value={item?.teamStats.AllRounderCount} />
          <Stats Key={'BOL'} Value={item?.teamStats.BowlerCount} />
        </View>
      </ImageBackground>
    </Pressable>
  );
};

const Stats = ({Key, Value}) => {
  return (
    <View className="flex-row">
      <Text className="font-WorksansRegular text-base text-white">{Key}</Text>
      <Text className="font-WorksansSemiBold text-base ml-2 text-white">
        {Value}
      </Text>
    </View>
  );
};

const Captain = ({item}) => {
  return (
    <View className="flex-row justify-around items-center">
      <View className="w-20">
        <View className="absolute z-10 p-1  w-7 h-7 items-center justify-center rounded-full -left-5 -top-5 border bg-white">
          <Text className="font-WorksansMedium text-sm text-black">C</Text>
        </View>
        <Image
          source={{uri: item?.teamStats.captain.image}}
          className=" h-20 rounded-t-md"
        />
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          className="bg-white font-WorksansMedium text-xs text-black p-1 rounded-sm">
          {item?.teamStats.captain.name}
        </Text>
      </View>
      <View className="w-20">
        <View className="absolute z-10 p-1  items-center justify-center rounded-full -left-5 -top-5 border bg-white">
          <Text className="font-WorksansMedium text-sm text-black">VC</Text>
        </View>
        <Image
          source={{uri: item?.teamStats.viceCaptain.image}}
          className="h-20 rounded-t-md"
        />
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          className="bg-white font-WorksansMedium text-xs text-black p-1  rounded-sm">
          {item?.teamStats.viceCaptain.name}
        </Text>
      </View>
    </View>
  );
};
