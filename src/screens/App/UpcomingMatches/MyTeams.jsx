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
import Icon from 'react-native-vector-icons/Ionicons';

import {
  useDeleteTeamMutation,
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
import Animated, {FadeInRight} from 'react-native-reanimated';

const MyTeams = () => {
  const navigation = useNavigation();
  // const [purpose, setPurpose] = useState()
  const {
    params: {MatchId, team1, team1Flag, team2, team2Flag},
  } = useRoute();

  const {params} = useRoute();

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
            renderItem={({item, index}) => (
              <TeamCard
                item={item}
                index={index}
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
            className="absolute  bottom-14 right-8 bg-[#181928] "
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
                    buttonStyle={'bg-[#181928] mt-3'}
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

const TeamCard = ({
  item,
  handlePresentModalPress,
  purpose,
  navigation,
  index,
}) => {
  const onTeamCardClick = item => {
    if (purpose) {
      return handlePresentModalPress(item);
    } else {
      return navigation.navigate('Lineup', {data: item.team});
    }
  };

  const [CallDeleteTeam] = useDeleteTeamMutation();

  const DeleteTeam = id => {
    Alert.alert('Delete Team', 'Your Team will deleted. are you sure?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => {
          CallDeleteTeam({teamId: id})
            .unwrap()
            .then(payload => console.log('Team Created => ', payload))
            .catch(error => console.error('Team Create Error => ', error))
            // .finally(() => navigation.pop());
        },
      },
    ]);
  };
  // console.log('MyTeams =>',item)
  return (
    <Animated.View entering={FadeInRight.delay(index * 200).duration(1000)}>
      <Pressable onPress={() => onTeamCardClick(item)}>
        <ImageBackground
          source={require('../../../../assets/images/playground.jpg')}
          imageStyle={{borderRadius: 12}}
          className="w-full h-40 justify-end rounded-xl mb-3">
          <View
            style={{backgroundColor: 'rgba(0,0,0,0.4)'}}
            className="flex-row justify-between px-5 rounded-t-xl absolute top-0 w-full py-2">
            <Text className="font-WorksansMedium text-base text-white">
              {item.userUid}
            </Text>
            <View className="flex-row">
              <Pressable
                className="px-3"
                onPress={() => navigation.navigate('EditTeams', {item: item})}>
                <Icon name="create-outline" size={21} color={'white'} />
              </Pressable>
              <Pressable className=" px-3" onPress={() => DeleteTeam(item._id)}>
                <Icon name="trash-outline" size={21} color={'red'} />
              </Pressable>
            </View>
          </View>
          <Captain item={item} />
          <View
            // style={{backgroundColor: 'rgba(0,0,0,0.4)'}}
            className=" p-1 flex-row justify-around rounded-b-xl">
            <Stats Key={'WK'} Value={item?.teamStats.wicketBatterCount} />
            <Stats Key={'BAT'} Value={item?.teamStats.BatsmanCount} />
            <Stats Key={'AR'} Value={item?.teamStats.AllRounderCount} />
            <Stats Key={'BOL'} Value={item?.teamStats.BowlerCount} />
          </View>
        </ImageBackground>
      </Pressable>
    </Animated.View>
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

const ShortName = name => {
  if (name.length >= 12) {
    const nameSlice = name.split(' ');
    // console.log(name, '<<>>', nameSlice[0].charAt(0).concat(' ', nameSlice[1]));
    return nameSlice[0].charAt(0).concat(' ', nameSlice[1]);
  } else {
    return name;
  }
};

const Captain = ({item}) => {
  return (
    <View className="flex-row justify-around items-center">
      <View className="w-20 items-center">
        <View className="absolute z-10 p-1  w-7 h-7 items-center justify-center rounded-full -left-2 -top-2 bg-white">
          <Text className="font-WorksansMedium text-sm text-black">C</Text>
        </View>
        <Image
          source={{uri: item?.teamStats.captain.image}}
          className=" h-14 w-14 rounded-t-md"
          resizeMode="contain"
        />
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          className="bg-white font-WorksansMedium text-[10px] text-black p-1 rounded-sm">
          {ShortName(item?.teamStats.captain.name)}
        </Text>
      </View>
      <View className="w-20 items-center">
        <View className="absolute z-10 p-1  items-center justify-center rounded-full -left-2 -top-2 bg-white">
          <Text className="font-WorksansMedium text-sm text-black">VC</Text>
        </View>
        <Image
          source={{uri: item?.teamStats.viceCaptain.image}}
          className="h-14 w-14 rounded-t-md"
          resizeMode="contain"
        />
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          className="bg-white font-WorksansMedium text-[10px] text-black p-1  rounded-sm">
          {ShortName(item?.teamStats.viceCaptain.name)}
        </Text>
      </View>
    </View>
  );
};
