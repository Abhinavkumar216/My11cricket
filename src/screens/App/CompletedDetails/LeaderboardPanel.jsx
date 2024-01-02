import {Image, Pressable, StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMatchLeaderboardQuery} from '../../../Services/API/HomeAPI';
import Loading from '../../../components/Loading';
import ErrorState from '../../../components/ErrorState';
import { useSelector } from 'react-redux';
import { userstate } from '../../../Services/State/userSlice';

const LeaderboardPanel = ({navigation}) => {
  const {
    params: {Id, type},
  } = useRoute();

  // console.log(type);

  const {isError, isLoading, isSuccess, data, error} =
    useMatchLeaderboardQuery(Id);

  if (isLoading) {
    return <Loading />;
  }
  if (isSuccess) {
    // console.log("Loaderboard Panel =>", data)
    return (
      <View className="bg-white flex-1 mt-10 rounded-2xl">
        <Header type={type} />
        {/* <TopCard data={[...data]} /> */}

        <View className="flex-row items-center py-2 bg-white">
          <View className="flex-1 justify-between items-center">
            <Text className="font-WorksansMedium text-sm text-neutral-700">
              User
            </Text>
          </View>
          <View className="flex-row items-center flex-1 justify-between ml-10 pr-3">
            <Text className="font-WorksansMedium text-base text-gray-900">
              Score
            </Text>
            <Text className="font-WorksansMedium text-base text-green-600">
              Winnings
            </Text>
          </View>
        </View>

        <FlatList
          data={data}
          ItemSeparatorComponent={<Saperator />}
          renderItem={({item}) => <RemainingCard item={item} />}
        />
      </View>
    );
  }

  if (isError) {
    return <ErrorState error={error} />;
  }
};

export default LeaderboardPanel;

const Header = ({type}) => {
  const navigation = useNavigation();
  return (
    <View className="flex-row items-center  py-2 rounded-2xl">
      <Pressable onPress={() => navigation.pop()} className=" p-1 ml-2">
        <Icon name="arrow-back-outline" size={26} color={'#181928'} />
      </Pressable>
      <View className="justify-center items-center flex-1 flex-row">
        <Text className="font-WorksansSemiBold text-lg -ml-7">{type}</Text>
      </View>
    </View>
  );
};

const TopPoints = ({data}) => {
  return (
    <View className="items-center mt-3">
      <Text className="font-WorksansMedium">{data?.name}</Text>
      <Text className="font-semibold text-xl text-gray-900">{data?.score}</Text>
      <Text className="font-WorksansMedium text-base text-black ">
        {data?.winnings}
      </Text>
    </View>
  );
};

const TopRank = ({rank}) => {
  return (
    <View className="absolute bg-[#181928] rounded-full justify-center items-center w-6 h-6 -bottom-3 ">
      <Text className="font-WorksansMedium text-white">{rank}</Text>
    </View>
  );
};

const TopCard = ({data}) => {
  return (
    <View className="flex-row justify-evenly items-end  py-3">
      {data[1] && (
        <View>
          <View className="justify-center items-center">
            <Image
              source={{uri: data[1].avatar}}
              className="h-20 w-20 rounded-full"
            />
            <TopRank rank={data[1]?.ranking} />
          </View>
          <TopPoints data={data[1]} />
        </View>
      )}

      {data[0] && (
        <View>
          <View className="justify-center items-center">
            <Image
              source={{uri: data[0].avatar}}
              className="h-24 w-24 rounded-full"
            />
            <TopRank rank={data[0]?.ranking} />
          </View>
          <TopPoints data={data[0]} />
        </View>
      )}

      {data[2] && (
        <View>
          <View className="justify-center items-center">
            <Image
              source={{uri: data[2].avatar}}
              className="h-20 w-20 rounded-full"
            />
            <TopRank rank={data[2]?.ranking} />
          </View>
          <TopPoints data={data[2]} />
        </View>
      )}
    </View>
  );
};

const RemainingCard = ({item}) => {
  const user = useSelector(userstate);

  return (
    <View className={`flex-1 flex-row items-center mx-2 py-4 px-4 rounded-lg ${item.userUid !== user.uid ? 'bg-white': 'bg-amber-50'}`}>
      <Image
        source={{uri: item.avatar}}
        className="w-12 h-12 rounded-full mr-3"
      />
      <View className="flex-1">
        <Text className="font-WorksansMedium text-sm text-black">
          Rank #{item.ranking}
        </Text>
        <Text className="font-WorksansMedium text-xs text-neutral-600">
          {item.name}
        </Text>
      </View>
      <View className="flex-row items-center flex-1 justify-between">
        <Text className="font-WorksansMedium text-base text-gray-900">
          {item.score}
        </Text>
        <Text className="font-WorksansMedium text-base text-green-600">
          {item.winnings}
        </Text>
      </View>
    </View>
  );
};

const Saperator = () => {
  return <View className="border-t mx-4 border-gray-200" />;
};
