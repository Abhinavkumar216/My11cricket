import React from 'react';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import RootNavigation from './src/Navigation/RootNavigation';
import { AuthProvider } from './src/Services/AuthContext';
import { store } from './src/Services/Store';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RootNavigation />
        <Toast />
      </AuthProvider>
    </Provider>
  );
};

export default App;
