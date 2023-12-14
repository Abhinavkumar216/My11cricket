import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CompletedDetailsNavigation from '../screens/App/CompletedDetails/CompletedDetailsNavigation';
import LeaderboardPanel from '../screens/App/CompletedDetails/LeaderboardPanel';
import DrawerNavigator from '../screens/App/Home/DrawerNavigator';
import Notification from '../screens/App/Home/Notification';
import Wallet from '../screens/App/Home/Wallet';
import MyMatchesNavigator from '../screens/App/MyMatches/MyMatchesNavigator';
import Profile from '../screens/App/Profile/Profile';
import UpcomingMatchNavigator from '../screens/App/UpcomingMatches/UpcomingMatchNavigator';
import SelectTeams from '../screens/App/UpcomingMatches/SelectTeams';
import Permission from '../screens/App/Home/Permission';
import TransferCoin from '../screens/App/Home/TransferCoin';
import PlayerProfile from '../screens/App/UpcomingMatches/PlayerProfile';
import Lineup from '../screens/App/UpcomingMatches/Lineup';

const Stack = createNativeStackNavigator();


const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {backgroundColor: '#000'},
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'WorkSans-Medium',
          fontSize: 18,
        },
        animation: 'simple_push',
      }}>
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={CompletedDetailsNavigation}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="MyMatches"
        component={MyMatchesNavigator}
        options={{animation: 'slide_from_right', headerTitle: 'My Matches'}}
      />
      <Stack.Screen
        name="UpcomingMatches"
        component={UpcomingMatchNavigator}
        options={{animation: 'slide_from_right', title: 'Upcoming Matches'}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          animation: 'slide_from_left',
          animationDuration: 500,
          gestureDirection: 'horizontal',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          animation: 'slide_from_bottom',
          animationDuration: 500,
        }}
      />
      <Stack.Screen
          name="Wallet"
          component={Wallet}
          options={{
            animation: 'slide_from_bottom',
            animationDuration: 500,
            headerShown: false,
            gestureDirection: 'vertical',
            fullScreenGestureEnabled: true,
            animationTypeForReplace: 'push',
          }}
        />

      <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
        <Stack.Screen
          name="LeaderboardPanel"
          component={LeaderboardPanel}
          options={{
            animation: 'slide_from_bottom',
            animationDuration: 500,
            headerShown: false,
          }}
        />
        
        <Stack.Screen
          name="SelectTeams"
          component={SelectTeams}
          options={{
            animation: 'slide_from_bottom',
            animationDuration: 500,
            headerShown: false,
            gestureDirection: 'vertical',
            fullScreenGestureEnabled: true,
            animationTypeForReplace: 'push',
            presentation: 'fullScreenModal',
          }}
        />
        <Stack.Screen
          name="Lineup"
          component={Lineup}
          options={{
            animation: 'slide_from_bottom',
            animationDuration: 500,
            headerShown: true,
            gestureDirection: 'vertical',
            fullScreenGestureEnabled: true,
            animationTypeForReplace: 'push',
            presentation: 'fullScreenModal',
          }}
        />

        <Stack.Screen
          name="PlayerProfile"
          component={PlayerProfile}
          options={{
            animation: 'slide_from_bottom',
            animationDuration: 500,
            headerShown: false,
            gestureDirection: 'vertical',
            fullScreenGestureEnabled: true,
            animationTypeForReplace: 'push',
            presentation: 'fullScreenModal',
          }}
        />
        <Stack.Screen
          name="TransferCoin"
          component={TransferCoin}
          options={{
            animation: 'slide_from_bottom',
            animationDuration: 500,
            headerShown: false,
            gestureDirection: 'vertical',
            fullScreenGestureEnabled: true,
            animationTypeForReplace: 'push',
            presentation: 'fullScreenModal',
          }}
        />

        <Stack.Screen
          name="Permission"
          component={Permission}
          options={{
            animation: 'slide_from_bottom',
            animationDuration: 500,
            headerShown: false,
            gestureDirection: 'vertical',
            fullScreenGestureEnabled: true,
            animationTypeForReplace: 'push',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppNavigator;
