import { Home } from '../src/views/Home'
import { auth } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import SignIn from './components/SignIn';

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header">
     
      </header>

      <section>
        {user ? <Home /> : <SignIn />}
      </section>
    </div>
  );
}



export default App;
