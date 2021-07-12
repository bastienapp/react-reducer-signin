import React, { useState } from 'react';
import { signIn, signOut } from '../services/auth';

function SignIn() {
  const [userForm, setUserForm] = useState({
    email: 'email@test.com',
    password: 'test123456',
  });
  const [userConnected, setUserConnected] = useState(null);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(null);

  const { email, password } = userForm;

  const onChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoad(true);
    setError(null);

    signIn(email, password)
      .then((response) => {
        setLoad(false);
        setUserConnected(response);
      })
      .catch((err) => {
        setLoad(false);
        setError(err.message);
      });
  };

  const onDisconnect = () => {
    signOut().then(() => {
      setUserConnected(null);
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
