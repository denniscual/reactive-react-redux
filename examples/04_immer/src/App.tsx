import * as React from 'react';
import { StrictMode } from 'react';
import { createStore } from 'redux';

import { Provider } from 'reactive-react-redux';

import { reducer } from './state';

import Counter from './Counter';
import Person from './Person';

const store = createStore(reducer);

const App = () => (
  <StrictMode>
    <Provider store={store}>
      <h1>Counter</h1>
      <Counter />
      <Counter />
      <h1>Person</h1>
      <Person />
      <Person />
    </Provider>
  </StrictMode>
);

export default App;
