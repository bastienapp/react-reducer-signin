import Profile from './components/Profile';
import SignIn from './components/SignIn';
import { UserContextProvider } from './contexts/UserContext';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Profile />
        <SignIn />
      </UserContextProvider>
    </div>
  );
}

export default App;
