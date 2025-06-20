import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from "@auth0/auth0-react";
import dotenv from 'dotenv';

dotenv.config();

ReactDOM.render(
  
  <React.StrictMode>
    <Auth0Provider
    domain={process.env.DOMAIN}
    clientId={process.env.CLIENT_ID}
    redirectUri={window.location.origin}
    audience={process.env.AUDIENCE}
    scope="create:customer read:customer edit:customer delete:customer create:receipt read:receipt edit:receipt delete:receipt"
    >
    <App />
  </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
