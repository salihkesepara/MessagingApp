import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
import Routes from './src/routes';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

export default App;
