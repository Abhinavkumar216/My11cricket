import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useState, useRef} from 'react';
import {
  Image,
  Text,
  View,
  Pressable,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('screen');

// const Data = [1, 2, 3, 4, 5];

const CompletedCard = ({Data}) => {
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
    <>
      <View className="mx-3 mt-4 flex-row justify-between items-center">
        <Text className="font-WorksansSemiBold text-xl text-black">
          My Matches
        </Text>
        <Pressable
          className="flex-row items-center"
          onPress={() => navigation.navigate('MyMatches')}>
          <Text className="font-WorksansRegular text-base text-black mr-3">
            View All
          </Text>
          <Icon name="chevron-forward-outline" size={18} color={'#181928'} />
        </Pressable>
      </View>

      <View className="items-center">
        <FlatList
          data={Data}
          horizontal
          ref={ref => {
            flatlistRef.current = ref;
          }}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          viewabilityConfig={{viewAreaCoveragePercentThreshold: 95}}
          onViewableItemsChanged={onViewRef.current}
          renderItem={({item}) => <Card navigation={navigation} item={item} />}
        />
        <View className="flex-row flex-1">
          {Data.map(({}, ind) => {
            return (
              <TouchableOpacity
                key={ind}
                onPress={() => scrollToIndex(ind)}
                className="w-2 h-2 mx-1 rounded-full mt-2"
                style={{
                  backgroundColor: ind == currentIndex ? 'black' : 'lightgray',
                }}
              />
            );
          })}
        </View>
      </View>
    </>
  );
};

export default CompletedCard;

const Card = ({navigation, item}) => {
  return (
    <Pressable
      onPress={() => navigation.navigate('Details', {item})}
      className="flex-1"
      style={{width: width, paddingHorizontal: 12}}>
      <View className="border rounded-xl border-zinc-200 mt-3 bg-white">
        {/* <View className="bg-gray-200 rounded-t-xl p-1 px-2 py-2">
          <Text className="text-black font-WorksansRegular">
            {item.match.seriesName}
          </Text>
        </View> */}
        <View className="flex-row px-3 py-2">
          <Competitor1 team={item?.match?.team1} />
          <Status matchStatus={item.matchStatus} time={item.match.startDate} />
          <Competitor2 team={item?.match?.team2} />
        </View>
        {/* <View className="border-t my-2  border-gray-200" /> */}
        {/* <View className="flex-row px-3 pb-3">
          <Text className="font-WorksansRegular text-gray-600">
            {item.totalTeams} Team {item.totalContestsJoined} Contest
          </Text>
        </View> */}
      </View>
    </Pressable>
  );
};

const Competitor1 = ({team}) => {
  return (
    <View>
      <View className="flex-row items-center">
        {team?.imageLink && (
          <Image
            source={{uri: team?.imageLink}}
            className="w-14 h-14 mr-1"
            resizeMode="contain"
          />
        )}
        <Text className="text-xl font-WorksansSemiBold text-black">
          {team?.teamSName}
        </Text>
      </View>
      <Text
        ellipsizeMode="tail"
        className="text-sm font-WorksansRegular text-black ">
        {team?.teamName.slice(0, 15)}
      </Text>
    </View>
  );
};

export const Status = ({matchStatus, time}) => {
  return (
    <View className="flex-1 self-center items-center">
      <Text className="text-base font-WorksansMedium text-black ml-2">
        {matchStatus}
      </Text>
      <Text className="text-xs font-WorksansMedium text-black ml-2">
        {moment(time).format('D MMM h:mm A')}
      </Text>
    </View>
  );
};

const Competitor2 = ({team}) => {
  return (
    <View>
      <View className="flex-row items-center">
        <Text className="text-xl font-WorksansSemiBold text-black">
          {team?.teamSName}
        </Text>
        {team?.imageLink && (
          <Image
            source={{uri: team?.imageLink}}
            className="w-14 h-14 ml-1"
            resizeMode="contain"
          />
        )}
      </View>
      <Text
        ellipsizeMode="tail"
        className="text-sm font-WorksansRegular text-black  text-right ">
        {team?.teamName.slice(0, 15)}
      </Text>
    </View>
  );
};
