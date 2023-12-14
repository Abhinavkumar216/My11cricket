import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext} from 'react';
import {Pressable, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import ButtonFull from '../../components/ButtonFull';
import {AuthContext} from '../../Services/AuthContext';

const Register = () => {
  const navigation = useNavigation();
  const {signup, isLoading} = useContext(AuthContext);

  const [Mobile, setMobile] = useState(null);
  const [invitecode, setInvitecode] = useState(null);
  const [Name, setName] = useState(null);
  return (
    <View className="flex-1 pt-5">
      <TextInput
        mode="outlined"
        label={'Name'}
        value={Name}
        onChangeText={setName}
        keyboardType="default"
        dataDetectorTypes={'none'}
        style={{width: '90%', alignSelf: 'center', marginTop: 10, backgroundColor:'#fff'}}
      />
      <TextInput
        mode="outlined"
        label={'Referral Code'}
        value={invitecode}
        onChangeText={setInvitecode}
        keyboardType="default"
        dataDetectorTypes={'phoneNumber'}
        style={{width: '90%', alignSelf: 'center', marginTop: 10, backgroundColor:'#fff'}}
      />
      <TextInput
        mode="outlined"
        label={'Mobile'}
        value={Mobile}
        maxLength={10}
        onChangeText={setMobile}
        keyboardType="phone-pad"
        editable={!isLoading}
        dataDetectorTypes={'phoneNumber'}
        style={{width: '90%', alignSelf: 'center', marginTop: 10, backgroundColor:'#fff'}}
      />
      <Text className="font-WorksansRegular text-sm text-black ml-5">
        You will recieve an OTP for Verification
      </Text>

      <ButtonFull
        title={'REGISTER'}
        buttonStyle={'mt-5'}
        textStyle={'text-white'}
        disabled={isLoading}
        isLoading={isLoading}
        onPress={() => signup(Mobile, Name, navigation)}
        // onPress={() => navigation.navigate('OTP')}
      />
      <Text className="font-WorksansRegular text-sm text-black mx-5 mt-2 text-center">
        *By registering, I agree to T&C's
      </Text>
      <View className="border-t w-11/12 self-center rounded border-gray-400 my-5" />
      <Pressable className="mt-3" onPress={() => navigation.navigate('Login')}>
        <Text className="font-WorksansRegular text-base text-black  text-center">
          Already a member?
        </Text>
        <Text className="font-WorksansSemiBold text-base text-black  text-center">
          Login
        </Text>
      </Pressable>
    </View>
  );
};

export default Register;
