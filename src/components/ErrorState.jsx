import React from 'react';
import {Image, Text, View} from 'react-native';

const ErrorState = ({error}) => {
  switch (error.statusCode) {
    case 404:
      return (
        <View className="flex-1 items-center">
          <Image
            source={require('../../assets/images/error/404.png')}
            className="w-2/4 h-2/4"
            resizeMode="contain"
          />
          <Text className="font-WorksansSemiBold text-xl text-black">
            {error?.message}
          </Text>
          <Text className="font-WorksansMedium text-lg text-neutral-600 text-center mx-5">
            We apolozize, but the page you trying to access cannot be found
          </Text>
        </View>
      );

    case 403:
      return (
        <View className="flex-1 items-center">
          <Image
            source={require('../../assets/images/error/403.png')}
            className="w-2/4 h-2/4"
            resizeMode="contain"
          />
          <Text className="font-WorksansSemiBold text-xl text-black">
            {error?.message}
          </Text>
          <Text className="font-WorksansMedium text-lg text-neutral-600 text-center mx-5">
            You don't have permission to access this page
          </Text>
        </View>
      );
    case 401:
      return (
        <View className="flex-1 items-center">
          <Image
            source={require('../../assets/images/error/403.png')}
            className="w-2/4 h-2/4"
            resizeMode="contain"
          />
          <Text className="font-WorksansSemiBold text-xl text-black">
            {error?.message}
          </Text>
          <Text className="font-WorksansMedium text-lg text-neutral-600 text-center mx-5">
            You don't have permission to access this page
          </Text>
        </View>
      );
    case 400:
      return (
        <View className="flex-1 items-center">
          <Image
            source={require('../../assets/images/error/400.png')}
            className="w-2/4 h-2/4"
            resizeMode="contain"
          />
          <Text className="font-WorksansSemiBold text-xl text-black">
            {error?.message}
          </Text>
          <Text className="font-WorksansMedium text-lg text-neutral-600 text-center mx-5">
            The server cannot process your request.
          </Text>
        </View>
      );

    case 500:
      return (
        <View className="flex-1 items-center">
          <Image
            source={require('../../assets/images/error/500.png')}
            className="w-2/4 h-2/4"
            resizeMode="contain"
          />
          <Text className="font-WorksansSemiBold text-xl text-black">
            {error?.message}
          </Text>
          <Text className="font-WorksansMedium text-lg text-neutral-600 text-center mx-5">
            Our team has been notified, and we are working to fix the issue as
            quickly as possible. Please try again.
          </Text>
        </View>
      );
    case 503:
      return (
        <View className="flex-1 items-center">
          <Image
            source={require('../../assets/images/error/503.png')}
            className="w-2/4 h-2/4"
            resizeMode="contain"
          />
          <Text className="font-WorksansSemiBold text-xl text-black">
            {error?.message}
          </Text>
          <Text className="font-WorksansMedium text-lg text-neutral-600 text-center mx-5">
            The server is temporarily busy, try again later!
          </Text>
        </View>
      );

    default:
      return (
        <View className="flex-1 items-center">
          <Image
            source={require('../../assets/images/error/something.png')}
            className="w-2/4 h-2/4"
            resizeMode="contain"
          />
          <Text className="font-WorksansSemiBold text-xl text-black">
            {error?.message}
          </Text>
          <Text className="font-WorksansMedium text-lg text-neutral-600 text-center mx-5">
            We're sorry, but something went wrong. Please try again.
          </Text>
        </View>
      );
  }
};

export default ErrorState;
