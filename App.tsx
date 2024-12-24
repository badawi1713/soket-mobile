import Root from '@/app/routes';
import axios from 'axios';
import React from 'react';
import './gesture-handler';
import './global.css';

const App = () => {
  axios.defaults.baseURL = process.env.API_SOKET_ENDPOINT;

  return <Root />;
};

export default App;
