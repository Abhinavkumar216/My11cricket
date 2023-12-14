import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import {AuthContext} from '../../Services/AuthContext';
import ButtonFull from '../../components/ButtonFull';

const Login = () => {
  const navigation = useNavigation();
  const [Mobile, setMobile] = useState(null);
  const {login, isLoading} = useContext(AuthContext);

  return (
    <View className="flex-1 pt-5">
      <TextInput
        mode="outlined"
        label={'Mobile'}
        value={Mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
        autoFocus
        maxLength={10}
        dataDetectorTypes={'phoneNumber'}
        editable={!isLoading}
        style={{
          width: '90%',
          alignSelf: 'center',
          marginTop: 10,
          backgroundColor: '#fff',
        }}
      />
      <Text className="font-WorksansRegular text-sm text-black ml-5">
        You will recieve an OTP for Verification
      </Text>

      <ButtonFull
        title={'Next'}
        buttonStyle={' mt-3'}
        textStyle={'text-white'}
        disabled={isLoading}
        isLoading={isLoading}
        onPress={() => login(Mobile, navigation)}
        // onPress={() => navigation.navigate('OTP')}
      />
      <Text className="font-WorksansRegular text-sm text-black mx-5 text-center">
        *By clicking next you are agree to our Term's and conditions
      </Text>
      <View className="border-t w-11/12 self-center rounded border-gray-400 my-5" />
      <Pressable
        className="mt-3"
        onPress={() => navigation.navigate('Register')}>
        <Text className="font-WorksansRegular text-base text-black  text-center">
          Not a member?
        </Text>
        <Text className="font-WorksansSemiBold text-base text-black  text-center">
          Register
        </Text>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
