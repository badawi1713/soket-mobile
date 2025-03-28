import Root from '@/app/routes';
import {SETTINGS} from '@/constants/settings';
import {AuthProvider} from '@/context/AuthContext';
import store from '@/store';
import axios from 'axios';
import React from 'react';
import {Provider} from 'react-redux';
import './gesture-handler';
import './global.css';

const App = () => {
  axios.defaults.baseURL = SETTINGS.baseUrl;

  return (
    <AuthProvider>
      <Provider store={store}>
        <Root />
      </Provider>
    </AuthProvider>
  );
};

export default App;
