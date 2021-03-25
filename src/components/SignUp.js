import React, {useRef, useState} from 'react'
import {Form, Card, Button, Alert} from 'react-bootstrap'
import {useAuth} from '../controller/AuthContext'

export default function SignUp(props) {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signUp} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    async function handleSubmit(e){
        e.preventDefault()

        if(!loading){
            if(passwordRef.current.value !== passwordConfirmRef.current.value){
                return setError('Passwords do not match')
            }
       
            try{
                setError('')
                setLoading(true)
                await signUp(emailRef.current.value, passwordRef.current.value)
            }catch(e){
                setError('Failed to create an account')
            } 
            setLoading(false)
        }
   }
    return (
     <> 
     <div>
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
                 <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type="password" ref={passwordConfirmRef} required />
                 </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                    Sign Up
                </Button>
             </Form>
     </div>
        <div className="w-100 text-center mt-2">
            Already have an Account?<Button variant="link" className="mt-0 pt-0" onClick={()=> props.onChange("signin")}>Sign In</Button>
        </div>
     </>    
    )
}
