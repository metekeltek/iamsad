import {useRef, useState} from 'react'
import {useAuth} from '../controller/AuthContext'
import firebase, {firestore} from '../firebase'
import {Form, Button, Alert, Modal} from 'react-bootstrap'
import style from '../custom.module.scss'

export default function Create(props){
    const {currentUser} = useAuth();
    const postsRef = firestore.collection('posts')
    const titleRef = useRef()
    const textRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e){
        e.preventDefault()

        if(!loading){
            try{
                setError('')
                setLoading(true)
                await postsRef.add({
                    title: titleRef.current.value,
                    text: textRef.current.value,
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                    uid: currentUser.uid
                })
                props.setShow(false)
            }catch(e){
                setError('Failed to create Post')
            } 
            setLoading(false)
        }
        
   }
    return(
        <Modal
        id={style.createPost}
        show={props.show}
        onHide={() => props.setShow(false)}
        aria-labelledby="create Post"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Create Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="titleRef">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="title" ref={titleRef} required />
                </Form.Group>
                <Form.Group id="textRef">
                    <Form.Label>Text</Form.Label>
                    <Form.Control as="textarea" ref={textRef} rows={5} />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                    create
                </Button>
            </Form>
        </Modal.Body>
      </Modal>
    )
}