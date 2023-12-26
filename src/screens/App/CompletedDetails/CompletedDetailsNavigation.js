import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyContest from './MyContest';
import MyTeams from './MyTeams';
import Scorecard from './Scorecard';
import React, {useState, useEffect} from 'react';
import CompletedDetails from './CompletedDetails';
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Leaderboard from './Leaderboard';
import {useRoute} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

export default function CompletedDetailsNavigation() {
  const {
    params: {
      item: {
        match: {matchId},
      },
    },
  } = useRoute();

  const {
    params: {item:{matchStatus}},
  } = useRoute();
  // console.log('Completed Details Navigation params =>', item);

  return (
    <Tab.Navigator
      initialRouteName="MyContest"
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="MyContest"
        component={MyContest}
        options={{title: 'My Contests',}}
        initialParams={{matchId,matchStatus}}
      />
      <Tab.Screen
        name="MyTeams"
        component={MyTeams}
        options={{title: 'My Teams'}}
        initialParams={{matchId,matchStatus}}
      />
      <Tab.Screen
        name="Scorecard"
        component={Scorecard}
        options={{title: 'Scorecard'}}
        initialParams={{matchId,matchStatus}}
      />
      {/* <Tab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{title: 'Leaderboard'}}
        initialParams={{matchId,matchStatus}}
      /> */}
    </Tab.Navigator>
  );
}

function MyTabBar({state, descriptors, navigation, position}) {
  return (
    <View>
      <CompletedDetails />
      <View
        style={styles.container}
        showsHorizontalScrollIndicator={false}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_, i) => i);

          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
          });

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              key={index}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.ItemWrap}>
              {isFocused ? (
                <Animated.Text
                  style={[
                    styles.Text,
                    {opacity},
                    {color: '#181928', fontFamily: 'WorkSans-Medium'},
                  ]}>
                  {label}
                </Animated.Text>
              ) : (
                <Animated.Text
                  style={[styles.Text, {opacity}, {color: '#181928'}]}>
                  {label}
                </Animated.Text>
              )}
            </TouchableOpacity>
          );
        })}
        {/* <TabBarIndicator state={state} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // flex:1,
    width:'100%',
    elevation:0,
    // borderWidth:1,
    backgroundColor:"White"
  },
  ItemWrap: {
    // borderWidth: 1,
    // marginHorizontal: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 15,
    flex: 1,
    // borderBottomWidth: 2,
  },
  Text: {
    fontSize: 16,
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'WorkSans-Medium',
  },
});
