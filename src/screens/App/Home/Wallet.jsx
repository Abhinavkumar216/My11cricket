import React, { useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { useGetWalletQuery } from '../../../Services/API/UserAPI';
import { userstate } from '../../../Services/State/userSlice';
import ButtonFull from '../../../components/ButtonFull';
import EmptyState from '../../../components/EmptyState';
import ErrorState from '../../../components/ErrorState';
import Loading from '../../../components/Loading';

const Wallet = ({navigation}) => {
  const [page, setPage] = useState(1);
  const {isError, isSuccess, isLoading, data, error} = useGetWalletQuery(page);
  const user = useSelector(userstate);

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorState error={error} />;
  }

  if (isSuccess) {
    return (
      <SafeAreaView className="flex-1">
        <Header navigation={navigation} />
        <View className="items-center  bg-[#181928] ">
          <Text className="font-WorksansRegular text-white text-lg">
            current Balance
          </Text>
          <Text className="font-WorksansSemiBold text-4xl text-white ">
            {Number(user?.coins).toLocaleString('en-IN')}
          </Text>
          <ButtonFull
            title={'Transfer Coin'}
            buttonStyle={'w-3/6 mt-4 mb-8 rounded-xl'}
            textStyle={'text-white'}
            onPress={() => navigation.push('TransferCoin')}
          />
        </View>
        <FlatList
          data={data}
          ListEmptyComponent={
            <EmptyState title={'No Wallet Transaction Available'} />
          }
          onEndReachedThreshold={0.5}
          onEndReached={({distanceFromEnd}) => {
            if (distanceFromEnd >= 0) {
              setPage(page => page + 1);
            }
          }}
          renderItem={({item, index}) => (
            <TransactionCard item={item} index={index} />
          )}
        />
      </SafeAreaView>
    );
  }
};

export default Wallet;

const Header = ({navigation}) => {
  return (
    <View className="bg-[#181928] h-16 items-center justify-center ">
      <Pressable
        onPress={() => navigation.pop()}
        className="p-5 absolute left-0">
        <Icon name="arrow-back-outline" size={24} color={'#fff'} />
      </Pressable>
      <Text className="text-white font-WorksansMedium text-xl justify-center">
        My Wallet
      </Text>
    </View>
  );
};

const TransactionCard = ({item, index}) => {
  const transactionIcon =
    item.type === 'CREDIT' ? 'arrow-down-outline' : 'arrow-up-outline';
  const color = item.status === 'SUCCESS' ? 'text-green-500' : 'text-red-500';
  const ArrowColor = item.type === 'CREDIT' ? 'green' : 'red';

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 100).duration(500)}
      style={{marginTop: index == 0 ? 4 : 0}}
      className="border mb-1 border-neutral-200 bg-white mx-3 p-3 flex-row items-center rounded-lg justify-between">
      <View className="flex-row items-center">
        <Icon name={transactionIcon} size={28} color={ArrowColor} />
        <View className="ml-3">
          <Text className="font-WorksansMedium text-sm text-black">
            {item?.title}
          </Text>
          <Text className="font-WorksansRegular text-xs text-neutral-500">
            {item?.timestamp}
          </Text>
        </View>
      </View>
      <View>
        <Text className="font-WorksansMedium text-lg text-black text-right">
          {item?.amount}
        </Text>
        <Text className={`font-WorksansMedium text-xs ${color}`}>
          {item?.status}
        </Text>
      </View>
    </Animated.View>
  );
};
