import React from 'react';
import ReactDOM from 'react-dom';
import App  from "./components/app/app";
import { Provider } from 'react-redux';
import store from "./services";
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
