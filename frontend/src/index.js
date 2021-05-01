import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom'
import App from './app/app'
import { AuthProvider } from './context/auth'
import { StateProvider } from './context/state'
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <StateProvider>
          <App />
        </StateProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
