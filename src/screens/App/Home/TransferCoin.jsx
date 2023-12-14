import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTransferCoinMutation} from '../../../Services/API/UserAPI';
import ButtonFull from '../../../components/ButtonFull';
import { showToast } from '../../../Services/Functions/AuthFunction';

const TransferCoin = ({navigation}) => {
  const [onCoinTransfer] = useTransferCoinMutation();
  const [Coin, setCoin] = useState(null);
  const [Mobile, setMobile] = useState(null);

  const OnTransfer = () => {
    if (Coin <= 0 || Mobile <= 0) {
      showToast({type:'info',heading:"Invalid Coin", subheading:"Please enter valid amount"});
      return;
    }
    if (Mobile.length != 10) {
      showToast({type:'info',heading:"Invalid Mobile number", subheading:'Please enter valid mobile number.'});
      return;
    }
    if (Coin.length == 0) {
      showToast({type:'info',heading:"Invalid Coin", subheading:"Please enter valid amount"});
      return;
    }

    onCoinTransfer({toMobile: Mobile, amount: Coin})
      .unwrap()
      .then(payload => console.log('Coin Transferred => ', payload))
      .catch(error => console.error('Coin Transferred Error => ', error))
      .finally(() => navigation.pop());
  };
  return (
    <View
      className=" flex-1 justify-end bg-black">
      <View className="items-center bg-white  rounded-t-3xl p-4">
        <Pressable
          className="absolute right-5 top-5 "
          onPress={() => navigation.pop()}>
          <Icon name="close" size={28} color={'red'} />
        </Pressable>
        <Image
          source={require('../../../../assets/images/Images/transfer.png')}
          className="h-20 w-20 my-6"
        />
        <Text className="font-WorksansMedium text-lg text-black">
          Transfer Coin
        </Text>
        <Text className="font-WorksansRegular text-sm text-black text-center">
          You can give your coin to your friends.
        </Text>
        <TextInput
          mode="outlined"
          label={'Coin'}
          value={Coin}
          onChangeText={setCoin}
          autoFocus
          keyboardType="number-pad"
          style={{width: '90%', alignSelf: 'center', marginTop: 25, backgroundColor:'#fff'}}
        />
        <TextInput
          mode="outlined"
          label={'Mobile No.'}
          value={Mobile}
          onChangeText={setMobile}
          keyboardType="phone-pad"
          style={{width: '90%', alignSelf: 'center', marginTop: 5, backgroundColor:'#fff'}}
        />

        <ButtonFull
          title={'Transfer Now'}
          buttonStyle={'bg-black my-7'}
          textStyle={'text-white'}
          onPress={OnTransfer}
        />
      </View>
    </View>
  );
};

export default TransferCoin;

const styles = StyleSheet.create({});
