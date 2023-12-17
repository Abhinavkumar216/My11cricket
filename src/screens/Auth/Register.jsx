import {useNavigation} from '@react-navigation/native';
import React, {useState, useContext} from 'react';
import {Pressable, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import ButtonFull from '../../components/ButtonFull';
import {AuthContext} from '../../Services/AuthContext';
import Animated, {FadeInDown} from 'react-native-reanimated';

const Register = () => {
  const navigation = useNavigation();
  const {signup, isLoading} = useContext(AuthContext);

  const [Mobile, setMobile] = useState(null);
  const [invitecode, setInvitecode] = useState(null);
  const [Name, setName] = useState(null);
  const theme = {colors: {primary: '#000'}};
  return (
    <View className="flex-1 pt-5 bg-neutral-100">
      <Animated.View entering={FadeInDown.delay(100).duration(1000)}>
        <TextInput
          mode="outlined"
          label={'Name'}
          value={Name}
          onChangeText={setName}
          keyboardType="default"
          theme={theme}
          dataDetectorTypes={'none'}
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 10,
            backgroundColor: '#fff',
          }}
        />
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(200).duration(1000)}>
        <TextInput
          mode="outlined"
          label={'Referral Code'}
          value={invitecode}
          onChangeText={setInvitecode}
          keyboardType="default"
          theme={theme}
          dataDetectorTypes={'phoneNumber'}
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 10,
            backgroundColor: '#fff',
          }}
        />
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(300).duration(1000)}>
        <TextInput
          mode="outlined"
          label={'Mobile'}
          value={Mobile}
          maxLength={10}
          onChangeText={setMobile}
          keyboardType="phone-pad"
          theme={theme}
          editable={!isLoading}
          dataDetectorTypes={'phoneNumber'}
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 10,
            backgroundColor: '#fff',
          }}
        />
      </Animated.View>

      <Animated.Text
        entering={FadeInDown.delay(400).duration(1000)}
        className="font-WorksansRegular text-sm text-black ml-5">
        You will recieve an OTP for Verification
      </Animated.Text>
      <Animated.View entering={FadeInDown.delay(500).duration(1000)}>
        <ButtonFull
          title={'REGISTER'}
          buttonStyle={'mt-5'}
          textStyle={'text-white'}
          disabled={isLoading || Mobile?.length < 10}
          isLoading={isLoading}
          onPress={() => signup(Mobile, Name, navigation)}
          // onPress={() => navigation.navigate('OTP')}
        />
      </Animated.View>
      <Animated.Text
        entering={FadeInDown.delay(600).duration(1000)}
        className="font-WorksansRegular text-sm text-black mx-5 mt-2 text-center">
        *By registering, I agree to T&C's
      </Animated.Text>
      <Animated.View entering={FadeInDown.delay(700).duration(1000)}>
        <View className="border-t w-11/12 self-center rounded border-gray-400 my-5" />
        <Pressable
          className="mt-3"
          onPress={() => navigation.navigate('Login')}>
          <Text className="font-WorksansRegular text-base text-black  text-center">
            Already a member?
          </Text>
          <Text className="font-WorksansSemiBold text-base text-black  text-center">
            Login
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default Register;
