import * as React from 'react';
import { reducer } from './reducer';
import { initialState } from './initial-state';

export const Store = React.createContext();

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  // For debug purpose only
  if (process.env.NODE_ENV === 'development') {
    window.__app_store = state;
  }

  return <Store.Provider value={value}>{children}</Store.Provider>;
};
