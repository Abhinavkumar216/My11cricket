import NavigationServices from './NavigationServices';
import notifee, {AuthorizationStatus} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

export async function checkNotificationPermission() {
  const settings = await notifee.getNotificationSettings();
  if (settings.authorizationStatus == AuthorizationStatus.AUTHORIZED) {
    // console.log('Notification permissions has been authorized');
    getToken();
  } else if (settings.authorizationStatus == AuthorizationStatus.DENIED) {
    // console.log('Notification permissions has been denied');
    NavigationServices.navigate('Permission', {Screen: 'Notification'});
  }
}

export const getToken = async () => {
  try {
    const token = await messaging().getToken();
    await messaging().registerDeviceForRemoteMessages();
    // console.log('Token:', token);
  } catch (error) {
    console.error('Error getting token');
  }
};
