import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { signIn, signOut } from '../services/auth';

function SignIn() {
  const { state, dispatch } = useContext(UserContext);
  const { email, password, load, error, userConnected } = state;

  const onChange = (e) => {
    dispatch({
      type: 'FORM_UPDATED',
      payload: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'LOADING' });

    signIn(email, password)
      .then((response) => {
        // {id: 1, email: "..."}
        dispatch({ type: 'SIGNIN_SUCCESS', payload: response });
      })
      .catch((err) => {
        dispatch({ type: 'SIGNIN_FAILED', payload: err.message });
      });
  };

  const onDisconnect = () => {
    signOut().then(() => {
      dispatch({ type: 'DISCONNECT' });
    });
  };

  return (
    <div className="SignIn">
      <h1>Sign in</h1>
      {load && <p>Loading...</p>}
      {!load && !userConnected && (
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
      {userConnected && (
        <div>
          <p>Welcome {userConnected.name}</p>
          <button type="button" onClick={onDisconnect}>
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

export default SignIn;
