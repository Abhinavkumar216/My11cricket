import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
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


  return (
    <PaperProvider theme={{dark: false}}>
      <NavigationContainer
        ref={ref => {
          NavigationServices.setTopLevelNavigator(ref), (navigationRef = ref);
        }}>
        {userToken ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </PaperProvider>
  );
}
