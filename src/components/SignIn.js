import React, {useRef, useState} from 'react'
import {Form, Card, Button, Alert} from 'react-bootstrap'
import {useAuth} from '../controller/AuthContext'

export default function SignIn(props) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const {signIn} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    async function handleSubmit(e){
        e.preventDefault()
   
        if(!loading){
            try{
                setError('')
                setLoading(true)
                await signIn(emailRef.current.value, passwordRef.current.value)
            }catch(e){
                setError('Failed to sign in')
            } 
            setLoading(false)
        }
        
   }
    return (
     <> 
     <Card>
         <Card.Body>
             <h2 className="text-center mb-4">Sign In</h2>
             {error && <Alert variant="danger">{error}</Alert>}
             <Form onSubmit={handleSubmit}>
                 <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                 </Form.Group>
                 <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                 </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                    Sign In
                </Button>
             </Form>
             <div className="d-flex justify-content-center mt-2">
             <Button variant="link" onClick={()=> props.onChange("forgotPassword")} >Forgot Password?</Button>
             </div>
            
         </Card.Body>
     </Card>
        <div className="w-100 text-center mt-2">
        
        Have no Account?<Button className="mt-0 pt-0" variant="link" onClick={()=> props.onChange("signup")}>Sign Up</Button>
        </div>
     </>    
    )
}
