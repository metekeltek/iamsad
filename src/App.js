import {Home} from '../src/views/Home'
import {auth} from './firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import Welcome from './views/Welcome'
import {AuthProvider} from './controller/AuthContext';

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <section>
          <AuthProvider>
            {user ? <Home /> : <Welcome />}
          </AuthProvider>
      </section>
    </div>
  );
}



export default App;
