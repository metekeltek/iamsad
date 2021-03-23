import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import {Container,Row} from 'react-bootstrap'
import {useState} from 'react'
import ForgotPassword from '../components/ForgotPassword';
import pepe from '../assets/pepeee.png'
import style from '../custom.module.scss'

export default function Welcome() {
  const [welcomeState, setWelcomeState] = useState("signin")
  
    return(
        <div className={style.center}>
          <div className={style.welcomePepe}>
            <img src={pepe}/> <h3>iamsad.club</h3>
          </div>
            
          <div className={style.welcomeSigning}>
            {welcomeState==="signin" ? <SignIn onChange={(value) => setWelcomeState(value)} />  : welcomeState==="signup" ? <SignUp onChange={(value) => setWelcomeState(value)} /> : <ForgotPassword onChange={(value) => setWelcomeState(value)} />}
          </div>
        </div>

    )
  }