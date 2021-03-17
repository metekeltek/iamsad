import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import { Container } from 'react-bootstrap'
import {useState} from 'react'
import ForgotPassword from '../components/ForgotPassword';



export default function Welcome() {
  const [welcomeState, setWelcomeState] = useState("signin")
  
    return(
      <Container className="d-flex align-items-center justify-content-center" style={{minHeight:"100vh" }}>
        <div className="w-100" style={{maxWidth:"400px"}}>
          {welcomeState==="signin" ? <SignIn onChange={(value) => setWelcomeState(value)} />  : welcomeState==="signup" ? <SignUp onChange={(value) => setWelcomeState(value)} /> : <ForgotPassword onChange={(value) => setWelcomeState(value)} />}
        </div>
      </Container>
    )
  }