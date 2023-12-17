import { useNavigation } from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  Pressable,
  TouchableOpacity,
  View,
} from 'react-native';

const {width} = Dimensions.get('screen');

const Corousal = ({Data}) => {
  const flatlistRef = useRef();
  const navigation = useNavigation()
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
    <View className="flex-1 items-center justify-center">
      <FlatList
        data={Data}
        ref={ref => {
          flatlistRef.current = ref;
        }}
        horizontal
        pagingEnabled
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 95}}
        onViewableItemsChanged={onViewRef.current}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <ImageItem item={item} navigation={navigation} />}
      />
      <View className="flex-row flex-1 ">
        {Data.map(({}, ind) => {
          return (
            <TouchableOpacity
              key={ind}
              onPress={() => scrollToIndex(ind)}
              className="w-2 h-2 mx-1 rounded-full"
              style={{
                backgroundColor: ind == currentIndex ? 'black' : 'lightgray',
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Corousal;

const ImageItem = ({item,navigation}) => {
  const onCorousalPress = () => {
    switch (item?.type) {
      case 'ADDVERTISMENT':
        Linking.openURL(item?.addUrl);
        break;
      case 'MATCH':
        navigation.navigate('Refer')
        break;

      default:
        console.warn('No type found in corousal');
        break;
    }
  };

  return (
    <Pressable
      className="my-3"
      style={{width: width-8}}
      onPress={onCorousalPress}>
      <Image
        source={{uri: item?.imageLink}}
        className="h-24 rounded-lg"
        style={{width: 'auto', marginHorizontal: 10}}
      />
    </Pressable>
  );
};
