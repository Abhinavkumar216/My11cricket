import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable, FlatList} from 'react-native';
import ButtonFull from '../../../components/ButtonFull';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {userstate} from '../../../Services/State/userSlice';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGetWalletQuery} from '../../../Services/API/UserAPI';
import Loading from '../../../components/Loading';
import ErrorState from '../../../components/ErrorState';
import EmptyState from '../../../components/EmptyState';
import uuid from 'react-native-uuid';

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
      <SafeAreaView className="flex-1 bg-neutral-100 ">
        <Header navigation={navigation} />
        <View className="items-center py-10">
          <Text className="font-WorksansRegular text-black text-lg">
            current Balance
          </Text>
          <Text className="font-WorksansSemiBold text-4xl text-black ">
            {user?.coins}
          </Text>
          <ButtonFull
            title={'Transfer Coin'}
            buttonStyle={'w-3/6 mt-4 rounded-xl'}
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
          renderItem={({item}) => <TransactionCard item={item} />}
        />
      </SafeAreaView>
    );
  }
};

export default Wallet;

const Header = ({navigation}) => {
  return (
    <View className="bg-black h-16 items-center justify-center ">
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

const TransactionCard = ({item}) => {
  const transactionIcon =
    item.type === 'CREDIT' ? 'arrow-down-outline' : 'arrow-up-outline';
  const color = item.status === 'SUCCESS' ? 'text-green-500' : 'text-red-500';
  const ArrowColor = item.type === 'CREDIT' ? 'green' : 'red';

  return (
    <View className="border mb-1 border-neutral-200 bg-white mx-1 p-3 flex-row items-center rounded-lg justify-between">
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
    </View>
  );
};
