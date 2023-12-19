import React, {useContext} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {DrawerItem, createDrawerNavigator} from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import Profile from '../Profile/Profile';
import Home from './Home';
import {useSelector} from 'react-redux';
import {userstate} from '../../../Services/State/userSlice';
import {AuthContext} from '../../../Services/AuthContext';
import Refer from '../Profile/Refer';
import BottomNavigator from '../BottomNavigation/BottomNavigator';
import Rules from '../BottomNavigation/Rules';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      // screenOptions={{headerShown: false}}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="BottomHome"
        component={BottomNavigator}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerStyle: {backgroundColor: '#181928'},
          // headerTitleStyle: {color: '#fff'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'WorkSans-Medium',
          },
          headerTitle: 'My Profile',
        }}
      />
      <Drawer.Screen
        name="Refer"
        component={Refer}
        options={{
          headerStyle: {backgroundColor: '#181928'},
          // headerTitleStyle: {color: '#fff'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'WorkSans-Medium',
          },
          headerTitle: 'Invite Friends',
        }}
      />
      <Drawer.Screen
        name="Rules"
        component={Rules}
        options={{
          headerStyle: {backgroundColor: '#181928'},
          // headerTitleStyle: {color: '#fff'},
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontFamily: 'WorkSans-Medium',
          },
          headerTitle: 'Rules',
        }}
      />
    </Drawer.Navigator>
  );
}

const CustomDrawer = props => {
  const {logout} = useContext(AuthContext);
  const user = useSelector(userstate);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: '#181928', paddingVertical: 25}}>
        <Image
          source={{uri: user?.avatar}}
          style={styles.sideMenuProfileIcon}
          onProgress={() => <ActivityIndicator size={'small'} color={'#181928'} />}
        />
        <Text
          style={{
            fontFamily: 'WorkSans-Medium',
            fontSize: 21,
            color: '#fff',
            textAlign: 'center',
            marginTop: 10,
          }}>
          {user?.name}
        </Text>
        <Text
          style={{
            fontFamily: 'WorkSans-Medium',
            fontSize: 16,
            color: '#fff',
            textAlign: 'center',
          }}>
          Score : {user?.score}
        </Text>
      </View>

      <DrawerItem
        label="Home"
        icon={() => <Image source={require('../../../../assets/icons/home.png')} style={{width:28, height:28}}/>}
        labelStyle={styles.Items}
        onPress={() => props.navigation.navigate('Home')}
        style={{marginTop: 25}}
      />
      <DrawerItem
        label="My Profile"
        icon={() => <Image source={require('../../../../assets/icons/user.png')} style={{width:28, height:28}}/>}
        labelStyle={styles.Items}
        onPress={() => props.navigation.navigate('Profile')}
        // style={{marginTop: 25}}
      />
      <DrawerItem
        label="Rules"
        icon={() => <Image source={require('../../../../assets/icons/book.png')} style={{width:28, height:28}}/>}
        labelStyle={styles.Items}
        onPress={() =>  props.navigation.navigate('Rules')}
        // style={{ marginTop:25}}
      />
      <DrawerItem
        label="Refer & Earn"
        icon={() => <Image source={require('../../../../assets/icons/refer.png')} style={{width:28, height:28}}/>}
        labelStyle={styles.Items}
        onPress={() => props.navigation.navigate('Refer')}
        // style={{ marginTop:25}}
      />
      <DrawerItem
        label="Logout"
        icon={() => <Image source={require('../../../../assets/icons/logout.png')} style={{width:28, height:28}}/>}
        labelStyle={styles.Items}
        onPress={logout}
        // style={{ marginTop:25}}
      />
      {/* <DrawerContentScrollView {...props}>

        <View style={styles.customItem}>
          <Text
            onPress={() => {
              Linking.openURL('https://aboutreact.com/');
            }}>
            Rate Us
          </Text>
          <Image
            source={{uri: BASE_PATH + 'star_filled.png'}}
            style={styles.iconStyle}
          />
        </View>
      </DrawerContentScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: 125,
    height: 125,
    alignSelf: 'center',
    borderRadius: 100,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Items: {fontFamily: 'WorkSans-Medium', fontSize: 16, color: '#181928'},
});
