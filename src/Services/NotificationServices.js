// import notifee, {AndroidImportance, AndroidStyle} from '@notifee/react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import Permission from '../screens/App/Home/Permission';
import NavigationServices from './NavigationServices';
// import NavigationServices from '../navigation/NavigationServices';

export const GetPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const permissions = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (!!permissions && permissions == 'granted') {
        console.log('Permission granted', permissions);
      } else {
        console.log('notification permission else', permissions);
        NavigationServices.navigate("Permission",{Screen:"Notification"})
      }
    } catch (error) {
      console.error('Failed to request permissions',error);
    }
  } else {
    console.error('Device is not an Android device');
  }
};
