import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useContext} from 'react';
import OtpInputs from 'react-native-otp-inputs';
import ButtonFull from '../../components/ButtonFull';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AuthContext} from '../../Services/AuthContext';

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
      <View className="mt-10">
        <Text className="font-WorksansRegular text-base mx-3 text-black">
          Enter OTP Sent to mobile +91 {routes.params?.mobile}
        </Text>
        <OtpInputs
          clearTextOnFocus
          handleChange={setOtp}
          keyboardType="phone-pad"
          numberOfInputs={6}
          selectionColor={'#aaa'}
          // editable={}
          
          dataDetectorTypes={'phoneNumber'}
          className="flex-row font-WorksansSemiBold text-lg items-center justify-center text-center "
          selectTextOnFocus={false}
          autofillFromClipboard
          inputContainerStyles={{
            alignItems: 'center',
            paddingHorizontal: 12,
            margin: 7,
            backgroundColor: '#ddd',
          }}
          autoFocus
          inputStyles={{fontSize: 26, textAlign: 'center', color: '#000'}}
        />
      </View>
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
