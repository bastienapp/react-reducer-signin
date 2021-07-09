import React, { useReducer } from 'react';
import {
  reducer,
  SIGNIN_CHANGE,
  SIGNIN_FAILURE,
  SIGNIN_LOAD,
  SIGNIN_SUCCESS,
  SIGNOUT,
} from '../reducers/signInReducer';
import { signIn, signOut } from '../services/auth';

function SignIn() {
  const [state, dispatch] = useReducer(reducer, {
    email: 'email@test.com',
    password: 'test123456',
    load: false,
    error: null,
    user: null,
  });

  const { email, password, load, error, user } = state;

  const onChange = (e) => {
    dispatch({
      type: SIGNIN_CHANGE,
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: SIGNIN_LOAD });

    signIn(email, password)
      .then((response) => {
        dispatch({
          type: SIGNIN_SUCCESS,
          payload: response,
        });
      })
      .catch((err) => {
        dispatch({
          type: SIGNIN_FAILURE,
          payload: err.message,
        });
      });
  };

  const onDisconnect = () => {
    signOut().then(() => {
      dispatch({ type: SIGNOUT });
    });
  };

  return (
    <>
      <h1>Sign in</h1>
      {load && <p>Loading...</p>}
      {!load && !user && (
        <form onSubmit={onSubmit}>
          <label htmlFor="email">
            <span>Email: </span>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
            />
          </label>
          <label htmlFor="password">
            <span>Password: </span>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </label>
          {error && <p>{error}</p>}
          <input type="submit" value="Sign In" />
        </form>
      )}
      {user && (
        <div>
          <p>Welcome {user.name}</p>
          <button type="button" onClick={onDisconnect}>
            Disconnect
          </button>
        </div>
      )}
    </>
  );
}

export default SignIn;
