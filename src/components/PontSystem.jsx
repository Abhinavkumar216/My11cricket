import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {useSharedValue} from 'react-native-reanimated';

const PontSystem = ({title, data}) => {
  const [expanded, setExpanded] = useState(false);

  const handlePress = () => {
    setExpanded(prev => !prev);
  };
  return (
    <>
      <Pressable
        onPress={handlePress}
        className="my-3 bg-slate-300 border-zinc-300 rounded-md flex-row justify-between px-3 py-3">
        <Text className=" font-WorksansMedium text-black text-base ml-1">
          {title}
        </Text>
        <Icon
          name={!expanded ? 'caret-down-outline' : 'caret-up-outline'}
          size={21}
          color={'#181928'}
        />
      </Pressable>
      <Animated.FlatList
        data={data}
        style={{height: expanded ? 'auto' : 0}}
        // className='bg-slate-300'
        // ItemSeparatorComponent={<View className="border-t border-zinc-400" />}
        renderItem={({item}) => <BowlingSection item={item} />}
      />
    </>
  );
};

export default PontSystem;

const BowlingSection = ({item}) => {
  return (
    <View className="border mx-2 rounded-md border-zinc-200">
      <View className=" border-zinc-200 rounded-md px-4 py-2 flex-row justify-between">
        <Text className="font-WorksansRegular text-base text-black">
          {item.title}
        </Text>
        <Text className="font-WorksansMedium text-base text-green-600">
          + {item.data} pts
        </Text>
      </View>
    </View>
  );
};
