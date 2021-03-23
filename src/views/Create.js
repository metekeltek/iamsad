import {useRef, useState} from 'react'
import {useAuth} from '../controller/AuthContext'
import firebase, {firestore} from '../firebase'
import {Form, Button, Alert, Modal} from 'react-bootstrap'
import style from '../custom.module.scss'
import {RiCloseFill} from 'react-icons/ri';

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
    id={style.modalCreatePostView}
    contentClassName={style.roundedCorners}
    show={props.show}
    onHide={() => props.setShow(false)}
    aria-labelledby="create Post"
    centered>
        <div className={style.modalCreatePostHeaderSection}>
            <div className={style.closeButton} onClick={()=>props.setShow(false)}><RiCloseFill  size="20"  /></div>
            <h4>Create Post</h4>
        </div>
        <hr id={style.zeroPaddingzeroMargin}/>

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
                <Button disabled={loading} className={style.roundedCornersCreateButton} type="submit">
                    create
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
    )
}