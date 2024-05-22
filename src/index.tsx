
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { store, StoreContext } from './app/stores/store';
import { BrowserRouter as Router } from 'react-router-dom';
// import {createBrowserHistory} from 'history'; 
import './index.css';

// export const history = createBrowserHistory();
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StoreContext.Provider value={store}>
    <Router>
      <App />
    </Router>
  </StoreContext.Provider>
);

