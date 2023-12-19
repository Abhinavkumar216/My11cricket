import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import Home from '../Home/Home';
import Icon from 'react-native-vector-icons/Ionicons';
import Profile from '../Profile/Profile';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import React, {useEffect} from 'react';
import MyMatchesNavigator from '../MyMatches/MyMatchesNavigator';
import Rules from './Rules';
import MyContest from '../CompletedDetails/MyContest';
import CenterIcon from './CenterIcon';

const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <MyBottomnavigator {...props} />}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#181928',
        },
        headerTintColor: '#fff',
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="Logo"
        component={CenterIcon}
        options={{tabBarButton: props => <CenterIcon {...props} />}}
      />
      <Tab.Screen
        name="MyMatches"
        component={MyMatchesNavigator}
        options={{headerShown: true, headerTitle: 'My Matches'}}
      />
    </Tab.Navigator>
  );
}

function MyBottomnavigator({state, descriptors, navigation}) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const translateY = useSharedValue(0);

        const handlePressIn = () => {
          translateY.value = withSpring(translateY.value - 30);
        };
        const handlePressOut = () => {
          translateY.value = withSpring((translateY.value = 0));
        };
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        // console.log("route =>", route , index)
        useEffect(() => {
          if (isFocused) {
            handlePressIn();
          } else {
            handlePressOut();
          }
        }, [isFocused]);

        const onPress = () => {
          if (route.name == 'Logo') {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: 'Home', merge: true});
            }
          } else {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const BottomTabIcon = () => {
          let iconName;
          if (route.name === 'Home') {
            iconName = isFocused ? 'grid' : 'grid-outline';
          } else if (route.name === 'MyMatches') {
            iconName = isFocused ? 'trophy' : 'trophy-outline';
          }
          if (route.name === 'Logo') {
            return (
              <View className="w-12 h-12">
                <Image
                  source={require('../../../../assets/icons/round.png')}
                  style={{height: 75, width: 75, marginBottom:60}}
                />
              </View>
            );
          }

          return (
            <Icon
              name={iconName}
              size={24}
              color={isFocused ? '#fff' : '#eee'}
            />
          );
        };
        return (
          <Animated.View
            style={{transform: [{translateY}]}}
            key={index + Math.floor(Math.random())}>
            <Pressable
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.wrap,
                {backgroundColor: isFocused ? '#E55604' : null},
              ]}>
              <BottomTabIcon />
            </Pressable>
          </Animated.View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#181928',
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    borderRadius: 12,
  },
  wrap: {
    padding: 12,
    borderRadius: 100,
  },
});
