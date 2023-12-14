import React from 'react';
import {View, Button} from 'react-native';
import notifee from '@notifee/react-native';
import Confirmation from '../../../components/Confirmation';

const Notification = () => {
  const notificationConfig = async (type, channelId) => {
    switch (type) {
      case 'largeIcon':
        notifee.displayNotification({
          title: 'Chat with Joe Bloggs',
          body: 'A new message has been received from a user.',
          android: {
            channelId,
            largeIcon: require('../../../../assets/images/Images/notification.png'),
          },
        });
        break;

      case 'smallIcon':
        notifee.displayNotification({
          title: 'Small Icon',
          body: 'A notification using the small icon!.',
          android: {
            channelId,
            smallIcon: 'ic_launcher',
          },
        });
        break;

      default:
        notifee.displayNotification({
          title: 'Small Icon',
          body: 'A notification using the small icon!.',
          android: {
            channelId,
            smallIcon: 'ic_launcher',
          },
        });
        break;
    }
  };

  async function onDisplayNotification() {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: 'default1',
      name: 'Default Channel1',
      badge:true,
      sound:'default',
    });
    notificationConfig('largeIcon', channelId);
  }

  return (
    <View className='flex-1'>
      <Confirmation/>
    </View>
  );
};

export default Notification;
