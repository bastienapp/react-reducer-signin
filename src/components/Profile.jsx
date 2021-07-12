import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

function Profile() {
  const { state } = useContext(UserContext);
  const { userConnected } = state;

  return (
    <div>
      <p>{JSON.stringify(userConnected)}</p>
    </div>
  );
}

export default Profile;
