import Root from '@/app/routes';
import axios from 'axios';
import React from 'react';
import './gesture-handler';
import './global.css';
import { SETTINGS } from '@/constants/settings';

const App = () => {
  axios.defaults.baseURL = SETTINGS.baseUrl;

  return <Root />;
};

export default App;
