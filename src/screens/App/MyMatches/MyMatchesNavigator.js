import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import CompletedMatches from './CompletedMatches';
import LiveMatches from './LiveMatches';
import UpcomingMatches from './UpcomingMatches';
import {SafeAreaView} from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

export default function MyMatchesNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="UpcomingMatches"
      tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="UpcomingMatches"
        component={UpcomingMatches}
        options={{title: 'Upcoming'}}
      />
      <Tab.Screen
        name="LiveMatches"
        component={LiveMatches}
        options={{title: 'Live'}}
      />
      <Tab.Screen
        name="CompletedMatches"
        component={CompletedMatches}
        options={{title: 'Completed'}}
      />
    </Tab.Navigator>
  );
}

function MyTabBar({state, descriptors, navigation, position}) {
  return (
    <>
      <View style={styles.container}>
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
              style={[styles.ItemWrap]}>
              {isFocused ? (
                <Animated.Text
                  style={[
                    styles.Text,
                    {opacity},
                    {color: '#181928', fontSize: 16},
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // borderWidth: 1,
    width: '100%',
    marginHorizontal: 10,
    alignSelf: 'center',
    backgroundColor: '#181928',
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
