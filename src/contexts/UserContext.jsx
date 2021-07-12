import { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { reducer, initialState } from '../reducers/signInReducer';

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
