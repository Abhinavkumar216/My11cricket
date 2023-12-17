import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useContext} from 'react';
import OtpInputs from 'react-native-otp-inputs';
import ButtonFull from '../../components/ButtonFull';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AuthContext} from '../../Services/AuthContext';
import Animated, { FadeInDown } from 'react-native-reanimated';

const OTP = () => {
  const navigation = useNavigation();
  const routes = useRoute();
  const {loginVerify, signupVerify, isLoading} = useContext(AuthContext);
  const [otp, setOtp] = useState(null);

  // console.log(routes.params);

  const onOTP = async () => {
    if (routes.params.TYPE === 'LOGIN') {
      loginVerify(routes.params?.mobile, otp);
    } else if (routes.params.TYPE === 'SIGNUP') {
      signupVerify(
        routes.params?.mobile,
        otp,
        routes.params?.name,
        routes.params?.referral,
      );
    } else {
      console.info('Undefined Case', routes.params.TYPE);
    }
  };

  return (
    <View className="flex-1">
      <Animated.View  entering={FadeInDown.delay(200).duration(1000)} className="mt-10">
        <Text className="font-WorksansRegular text-lg mx-5 mb-3 text-black">
         {` Enter OTP Sent to mobile\n +91 ${routes.params?.mobile}`}
        </Text>
        <OtpInputs
          clearTextOnFocus
          handleChange={setOtp}
          keyboardType="phone-pad"
          numberOfInputs={6}
          selectionColor={'#aaa'}
          dataDetectorTypes={'phoneNumber'}
          className="flex-row font-WorksansSemiBold text-lg items-center justify-center text-center "
          selectTextOnFocus={false}
          autofillFromClipboard
          inputContainerStyles={{
            alignItems: 'center',
            paddingHorizontal: 12,
            margin: 4,
            backgroundColor: '#ddd',
            borderRadius:5
          }}
          autoFocus
          inputStyles={{fontSize: 26, textAlign: 'center', color: '#000'}}
        />
      </Animated.View>
      {/* <Text className="font-WorksansRegular text-base mx-3 text-black">
        Didn't recieve the OTP? Request for a new one in
        <Text className="text-red-500 font-WorksansSemiBold"> 18 Seconds.</Text>
      </Text> */}
      <ButtonFull
        title={'Continue'}
        isLoading={isLoading}
        disabled={otp?.length !== 6}
        buttonStyle={'mt-7'}
        textStyle={'text-white'}
        onPress={onOTP}
      />
    </View>
  );
};

export default OTP;

const styles = StyleSheet.create({});
