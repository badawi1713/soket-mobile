import Root from '@/app/routes';
import React from 'react';
import './global.css';
import './gesture-handler';
import axios from 'axios';

const App = () => {

	axios.defaults.baseURL = process.env.REACT_APP_SERVICE_ENDPOINT;


	return <Root />;
};

export default App;
