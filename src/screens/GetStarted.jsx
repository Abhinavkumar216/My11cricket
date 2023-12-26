import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ButtonFull from '../components/ButtonFull';
import {useNavigation} from '@react-navigation/native';
import Animated, {FadeInDown} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

const data = [
  {
    id: 1,
    Image: require('../../assets/images/Onboarding/1.png'),
  },
  {
    id: 2,
    Image: require('../../assets/images/Onboarding/2.png'),
  },
  {
    id: 3,
    Image: require('../../assets/images/Onboarding/3.png'),
  },
  {
    id: 4,
    Image: require('../../assets/images/Onboarding/4.png'),
  },
];
const {width, height} = Dimensions.get('window');
const GetStarted = () => {
  const navigation = useNavigation();

  const flatlistRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewRef = useRef(({changed}) => {
    if (changed[0].isViewable) {
      setCurrentIndex(changed[0].index);
    }
  });

  const scrollToIndex = ind => {
    flatlistRef.current?.scrollToIndex({animated: true, index: ind});
  };

  return (
    <View className="flex-1 bg-[#181928]">
      <StatusBar animated backgroundColor={'transparent'} translucent />
      <FlatList
        ref={ref => {
          flatlistRef.current = ref;
        }}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 95}}
        onViewableItemsChanged={onViewRef.current}
        pagingEnabled
        horizontal
        data={data}
        renderItem={({item}) => (
          <Image source={item.Image} style={{width, height: height-50}} />
        )}
      />

      <LinearGradient
        colors={['rgba(19,44,81,255)', 'rgba(19,44,81,0)']}
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        // style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
        className="absolute bottom-0 pb-3 pt-40 left-0 right-0">
        <View className=" z-50 flex-row self-center mb-5">
          {data.map(({}, ind) => {
            return (
              <TouchableOpacity
                key={ind}
                onPress={() => scrollToIndex(ind)}
                className=" h-3 mx-1 rounded-full"
                style={{
                  backgroundColor: ind == currentIndex ? 'white' : 'grey',
                  width: ind == currentIndex ? 36 : 12
                }}
              />
            );
          })}
        </View>
        <View className='flex-row justify-around'>
        <ButtonFull
          buttonStyle={'w-2/5 bg-transparent border border-white border-2'}
          textStyle={'text-white'}
          title={'Get Started'}
          onPress={() => navigation.navigate('Register')}
        />
        <ButtonFull
          buttonStyle={'w-2/5 bg-white'}
          textStyle={'text-black'}
          title={'Login'}
          onPress={() => navigation.navigate('Login')}
        />
        </View>
      </LinearGradient>
    </View>
  );
};

export default GetStarted;

// const Card = ({navigation}) => {
//   return (
//     <Animated.View
//       entering={FadeInDown.duration(300).springify()}
//       className="bg-[#181928] h-80 p-10 rounded-t-3xl">
//       <Text className="text-2xl text-white text-center font-WorksansSemiBold">
//         Welcome to My11Cricket
//       </Text>
//       <Text className="text-base text-gray-200 text-center mt-3 mb-10 font-WorksansRegular">
//         Ready to start winning? Swipe left to learn the basics of fantasy sports
//       </Text>
//       <ButtonFull
//         title={'REGISTER'}
//         buttonStyle={'bg-white'}
//         onPress={() => navigation.navigate('Register')}
//       />
//       <Pressable
//         className="flex-row justify-center mt-5"
//         onPress={() => navigation.navigate('Login')}>
//         <Text className=" text-gray-200 text-lg font-WorksansRegular">
//           Already a user?{' '}
//         </Text>
//         <Text className=" text-gray-200 text-lg  font-WorksansBold">
//           Login{' '}
//         </Text>
//       </Pressable>
//     </Animated.View>
//   );
// };
