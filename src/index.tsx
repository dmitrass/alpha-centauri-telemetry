import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import { Provider } from "react-redux";
import store from './store/store';
import {BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App/>
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
)
