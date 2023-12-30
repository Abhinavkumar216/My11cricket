import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import RootNavigation from './src/Navigation/RootNavigation';
import {AuthProvider} from './src/Services/AuthContext';
import codePush from 'react-native-code-push';
import {store} from './src/Services/Store';

let codePushOption = {checkFrequency: codePush.CheckFrequency.MANUAL};

const App = () => {
  useEffect(() => {
    codePush.sync({
      installMode: codePush.InstallMode.ON_NEXT_RESTART,
      updateDialog: true,
    });
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <RootNavigation />
        <Toast />
      </AuthProvider>
    </Provider>
  );
};
export default codePush(codePushOption)(App);
