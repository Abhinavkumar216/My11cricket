import React, {useContext} from 'react';
import {
  Provider as PaperProvider,
  MD3LightTheme,
  configureFonts,
  MD3DarkTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import {AuthContext} from '../Services/AuthContext';
import NavigationServices from '../Services/NavigationServices';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import Splash from '../screens/Splash';
import {useColorScheme} from 'react-native';
import {useMaterial3Theme} from '@pchmn/expo-material3-theme';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

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

  const {LightTheme, DarkTheme} = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDefaultTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      ...LightTheme.colors,
    },
  };
  const CombinedDarkTheme = {
    ...MD3DarkTheme,
    ...DarkTheme,
    colors: {
      ...MD3DarkTheme.colors,
      ...DarkTheme.colors,
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
      }}
      // theme={CombinedDefaultTheme}
      >
      <NavigationContainer
        // theme={CombinedDefaultTheme}
        ref={ref => {
          NavigationServices.setTopLevelNavigator(ref), (navigationRef = ref);
        }}>
        {userToken ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </PaperProvider>
  );
}
