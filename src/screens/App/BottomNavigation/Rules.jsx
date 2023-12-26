import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {FlatList, ScrollView, Text, View} from 'react-native';
import PontSystem from '../../../components/PontSystem';

const BattingData = [
  {
    title: 'Run',
    data: '1',
  },
  {
    title: 'Boundary',
    data: '1',
  },
  {
    title: 'Six',
    data: '2',
  },
  {
    title: 'Half Century',
    data: '4',
  },
  {
    title: 'Century',
    data: '8',
  },
];
const BowlingData = [
  {
    title: 'Wicket',
    data: '25',
  },
  {
    title: '4 Wicket Bonus',
    data: '4',
  },
  {
    title: '5 Wicket Bonus',
    data: '8',
  },
  {
    title: 'Maiden Over',
    data: '4',
  },
];
const FeildingData = [
  {
    title: 'Catch',
    data: '8',
  },
  {
    title: '3 catch Bonus',
    data: '4',
  },
];
const OtherData = [
  {
    title: 'Captain',
    data: '2x',
  },
  {
    title: 'vice-captain',
    data: '1.5x',
  },
];
const EPS = [
  {
    title: 'Below 3 RPO',
    data: '6',
  },
  {
    title: '3 - 4 RPO',
    data: '4',
  },
  {
    title: '4 - 5 RPO',
    data: '6',
  },
  {
    title: '5 - 6 RPO',
    data: '6',
  },
];
const STP = [
  {
    title: 'Above 140',
    data: '6',
  },
  {
    title: '120  - 140',
    data: '4',
  },
  {
    title: '100  - 120 ',
    data: '2',
  },
];
const Rules = () => {
  return (
    <View className="p-2 mx-2">
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return (
            <>
              <View className=" my-4 flex-row justify-between">
                <Text className="font-WorksansMedium text-black text-lg">
                  Fantasy Points System
                </Text>
                <Icon name="caret-down-outline" size={21} color={'#181928'} />
              </View>
              <TopSection />
              <PontSystem data={BattingData} title={'Batting Points'} />
              <PontSystem data={BowlingData} title={'Bowling Points'} />
              <PontSystem data={FeildingData} title={'Fielding Points'} />
              <PontSystem data={EPS} title={'Economy Point '} />
              <PontSystem data={STP} title={'Strike Rate '} />
              <PontSystem data={OtherData} title={'Other Points'} />
            </>
          );
        }}
      />
    </View>
  );
};

export default Rules;

const TopSection = () => {
  return (
    <View className=" border rounded-md border-zinc-400 mb-5">
      <View className="border-b border-zinc-400 rounded-md px-4 py-3 flex-row justify-between">
        <Text className="font-WorksansRegular text-base text-black">
          Wicket
        </Text>
        <Text className="font-WorksansMedium text-base text-green-600">
          + 25 pts
        </Text>
      </View>
      <View className="border-b border-zinc-400 rounded-md px-4 py-3  flex-row justify-between">
        <Text className="font-WorksansRegular text-base text-black">
          Century Bonus
        </Text>
        <Text className="font-WorksansMedium text-base text-green-600">
          + 8 pts
        </Text>
      </View>
      <View className=" rounded-md px-4 py-3  flex-row justify-between">
        <Text className="font-WorksansRegular text-base text-black">
          5 Wicket Bonus
        </Text>
        <Text className="font-WorksansMedium text-base text-green-600">
          + 8 pts
        </Text>
      </View>
    </View>
  );
};
// rules for result in my11cricket
// ------------------------------

// Batting
// -------
// run  =>  1
// boundary => 1
// six => 2
// half century => 4
// century => 8

// Bowling
// -------
// wicket => 25
// 4 wicket bonus => 4
// 5 wicket bonus => 8
// maiden over => 4

// Fielding ( catch )
// --------
// catch => 8
// 3 catch bonus => 4

// other
// -----
// captain  => 2x
// vice-captain  => 1.5x

// Economy points system ( minimum 3 overs bowled )
// ---------------------

// Below 3 rpo => 6
// 3 - 4 rpo => 4
// 4 - 5 rpo  => 3
// 5 - 6 rpo  => 2

// Strike Rate points system ( minimum 12 balls played )
// -------------------------

// above 140  => 6
// 120  - 140  => 4
// 100  - 120  => 2
