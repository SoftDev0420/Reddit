import React from 'react';
import { Provider } from 'react-redux';
import createStore from './config/configStore';
import Root from './config/router';

const Reddit = () => {
  const store = createStore();
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default Reddit;
