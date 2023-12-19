import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import {
  Provider as PaperProvider,
  MD3LightTheme,
  configureFonts,
} from 'react-native-paper';
import {AuthContext} from '../Services/AuthContext';
import NavigationServices from '../Services/NavigationServices';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import Splash from '../screens/Splash';

export default function RootNavigation() {
  // const navigationRef = useNavigationContainerRef();
  const {suspense, userToken, AccessTokenError} = useContext(AuthContext);

  // useFlipper(navigationRef);

  if (suspense == null) {
    return <Splash />;
  }

  if (suspense) {
    return <Splash />;
  }
  if (AccessTokenError) {
    return <Splash />;
  }

  const theme = {
    ...MD3LightTheme,

    // Specify a custom property
    dark: false,

    // Specify a custom property in nested object
    colors: {
      ...MD3LightTheme.colors,
      primary:'#181928'
    },
  };

  const fontConfig = {
    android: {
      regular: {
        fontFamily: 'WorkSans-Regular',
      },
      medium: {
        fontFamily: 'WorkSans-Medium',
      },
      light: {
        fontFamily: 'WorkSans-Light',
      },
    },
  };

  return (
    <PaperProvider
      theme={{
        isV3: true,
        dark: false,
        fonts: configureFonts({config: fontConfig, isV3: true}),
      }}>
      <NavigationContainer
        ref={ref => {
          NavigationServices.setTopLevelNavigator(ref), (navigationRef = ref);
        }}>
        {userToken ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </PaperProvider>
  );
}
