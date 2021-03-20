import React, {useRef, useState} from 'react'
import {Form, Card, Button, Alert} from 'react-bootstrap'
import {useAuth} from '../controller/AuthContext'

export default function ForgotPassword(props) {
    const emailRef = useRef()
    const {forgotPassword} = useAuth()
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)


    async function handleSubmit(e){
        e.preventDefault()
   
        if(!loading){
            try{
                setError('')
                setSuccess('')
                setLoading(true)
                await forgotPassword(emailRef.current.value)
                setSuccess('We have send you a email to reset your password')
            }catch(e){
                setSuccess('')
                setError('Failed to send password reset mail')
            } finally{
            }
            setLoading(false)
        }   
   }
    return (
     <> 
     <Card>
         <Card.Body>
             <h2 className="text-center mb-4">Forgot Password?</h2>
             {error && <Alert variant="danger">{error}</Alert>}
             {success && <Alert variant="success">{success}</Alert>}
             <Form onSubmit={handleSubmit}>
                 <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                 </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                    Send reset mail
                </Button>
             </Form>
         </Card.Body>
     </Card>
        <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={()=> props.onChange("signin")} >Go back</Button>
        </div>
     </>    
    )
}
