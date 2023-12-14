import axios from 'axios';
import React, {createContext, useEffect, useState, useMemo} from 'react';
import {MMKV} from 'react-native-mmkv';
import {BASE_URL} from '../../CONSTANTS';
import {isValidMobile, showToast} from './Functions/AuthFunction';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suspense, setSuspense] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [accessTokenError, setAccessTokenError] = useState(null);
  const storage = useMemo(() => new MMKV(), []);

  const headers = {
    'fa-header':
      '99a0d160c86894ca7cf6d8bcb5e7095269308613f317e90bdfb12e39a62h6t5b',
    'access-token': storage.getString('ACCESS_TOKEN'),
  };

  // Mobile, Name, navigation
  const signup = async (mobile, name, navigation) => {
    if (!isValidMobile(mobile)) {
      console.warn('Invalid mobile number');
      showToast({
        type: 'error',
        heading: 'Invalid Mobile No.',
        subheading: 'Please enter a valid Mobile no.',
      });
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${BASE_URL}auth/user/new/otp`,
        {
          mobile: Number(mobile),
          deviceId: 'MyDeviceId',
        },
        {
          headers,
        },
      );

      if (response?.status === 200) {
        console.log('Signup Success');
        navigation.navigate('OTP', {
          mobile,
          name,
          TYPE: 'SIGNUP',
        });
      } else {
        console.warn('Error');
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error =>', error.response.data);
      showToast({
        type: 'error',
        heading: error.response.data.statusCode.toString(),
        subheading: error.response.data.message,
      });
      setIsLoading(false);
    }
  };

  const signupVerify = async (mobile, otp, name) => {
    setIsLoading(true);
    try {
      if (!mobile || !otp || !name) {
        showToast({
          type: 'error',
          heading: 'Missing Fields',
          subheading: 'Missing required fields.',
        });
        throw new Error('Missing required fields');
      }

      const response = await axios.post(
        `${BASE_URL}auth/user/register`,
        {
          mobile: Number(mobile),
          name: name,
          otp: Number(otp),
          notificationToken: 'process.env.NOTIFICATION_TOKEN1',
          deviceId: 'process.env.DEVICE_ID1',
        },
        {
          headers,
        },
      );
      // console.log(response.data);
      storage.set('AUTH_TOKEN', response.data.data.token);
      setUserToken(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error while verifying Signup', error);
      showToast({
        type: 'error',
        heading: error.response.data.statusCode.toString(),
        subheading: error.response.data.message,
      });
      setIsLoading(false);
    }
  };

  const login = async (mobile, navigation) => {
    if (!isValidMobile(mobile)) {
      console.warn('Invalid mobile number');
      showToast({
        type: 'error',
        heading: 'Invalid Mobile No.',
        subheading: 'Please enter a valid Mobile no.',
      });
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(
        `${BASE_URL}auth/user/old/otp`,
        {
          mobile: Number(mobile),
        },
        {
          headers,
        },
      );

      if (response?.status === 200) {
        console.log('Login done');
        navigation.navigate('OTP', {
          mobile,
          TYPE: 'LOGIN',
        });
      } else {
        console.error('Error: in login response' + response?.status);
      }

      setIsLoading(false);
    } catch (error) {
      // console.error('Error in login', error.response.config);
      showToast({
        
        type: 'error',
        heading: error.response.data.statusCode.toString(),
        subheading: error.response.data.message,
      });

      setIsLoading(false);
    }
  };

  const loginVerify = async (mobile, otp) => {
    if (otp.length !== 6) {
      showToast({
        type: 'error',
        heading: 'Invalid OTP',
        subheading: 'Please enter a valid OTP',
      });
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}auth/user/login`,
        {
          mobile: Number(mobile),
          otp: Number(otp),
          createToken: true,
        },
        {
          headers,
        },
      );
      // console.log(response.data.data);
      storage.set('AUTH_TOKEN', response.data.data.token.toString());
      // storage.set('userId', response.data.userId);
      setUserToken(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error while verifying login', error);
      showToast({
        type: 'error',
        heading: error.response.data.statusCode.toString(),
        subheading: error.response.data.message,
      });
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    const AUTH_TOKEN = storage.getString('AUTH_TOKEN');
    try {
      const response = await axios.post(
        `${BASE_URL}auth/user/logout`,
        {},
        {
          headers: {
            ...headers,
            'auth-token': AUTH_TOKEN,
          },
        },
      );
      if (response?.status === 200) {
        showToast({
          type: 'success',
          heading: 'Success',
          subheading: 'Logout Successfully',
        });
        setUserToken(null);
        storage.delete("AUTH_TOKEN")
        setIsLoading(false);
      } else {
        console.log('Cannot log out');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('error while logout', error);
      showToast({
        type: 'error',
        heading: error.response.data.statusCode.toString(),
        subheading: error.response.data.message,
      });
    }
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setSuspense(true);

      const AUTH_TOKEN = storage.getString('AUTH_TOKEN');

      if (AUTH_TOKEN) {
        setUserToken(true);
      }

      setSuspense(false);
    } catch (error) {
      console.error('isLoggedIn Error', error);
      setSuspense(false);
    }
  };

  const isFirstLaunchFunc = async () => {
    const launch = storage.getString('alreadylaunchMy11Cricket');

    if (launch === 'false') {
      setIsFirstLaunch(true);
      storage.set('alreadylaunchMy11Cricket', 'true');
    } else {
      setIsFirstLaunch(false);
    }
  };

  const accessToken = async () => {
    if (storage.getString('ACCESS_TOKEN') == null) {
      try {
        const response = await axios.get(`${BASE_URL}auth/accessToken`, {
          headers: {
            'fa-header':
              '99a0d160c86894ca7cf6d8bcb5e7095269308613f317e90bdfb12e39a62h6t5b',
          },
        });
        // console.log("Access Token setted",response.data.data )
        storage.set('ACCESS_TOKEN', response.data.data.token);
      } catch (error) {
        console.error('Error getting accessToken', error.response.data);
      }
    }
  };

  useEffect(() => {
    isFirstLaunchFunc();
    isLoggedIn();
    accessToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        logout,
        login,
        loginVerify,
        signupVerify,
        isFirstLaunchFunc,
        accessTokenError,
        isFirstLaunch,
        suspense,
        isLoading,
        userToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
