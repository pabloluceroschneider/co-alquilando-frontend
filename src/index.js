import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './styles/index.css';
import App from './routes';
import Amplify from 'aws-amplify';
import config from './config.json'
import * as serviceWorker from './serviceWorker';

Amplify.configure({
  Auth: {
    mandatorySignId: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
})

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
