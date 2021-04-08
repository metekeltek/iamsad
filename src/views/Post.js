import {useRef, useState} from 'react'
import {useAuth} from '../controller/AuthContext'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import ListItemComment from '../components/ListItemComment'
import firebase, {firestore} from '../firebase'
import {Form, Button, Alert, Modal, Row, Col, Container} from 'react-bootstrap'
import style from '../custom.module.scss'
import moment from 'moment';
import {RiCloseFill} from 'react-icons/ri';

export default function Post(props){
    const {currentUser} = useAuth()
    const commentsRef = firestore.collection( 'posts/' + props.id + '/comments')
    const query = commentsRef.orderBy('created', 'asc')
    const [comments] = useCollectionData(query, {idField:'id'})

    const notificationsRef = firestore.collection( 'notifications/' + props.uid + '/notificationList')

    const commentRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const dummy = useRef()
    var commentators = []

    


    function calculateCommentatorId(commentCreator, postCreator){
        if(postCreator === commentCreator){
            return "OP"
        }

        if(!commentators.includes(commentCreator)){
            commentators.push(commentCreator)
            return commentators.length
        }

        return commentators.indexOf(commentCreator)+1
    }

    async function handleSubmit(e){
        e.preventDefault()

        if(!loading){
            try{
                setError('')
                setLoading(true)
                await commentsRef.add({
                    text: commentRef.current.value,
                    created: firebase.firestore.FieldValue.serverTimestamp(),
                    uid: currentUser.uid
                })
                if(currentUser && props.uid != currentUser.uid){
                    await notificationsRef.add({
                        postId: props.id,
                        created: firebase.firestore.FieldValue.serverTimestamp(),
                        type: 'commentedPost'
                    })
                }

                if(commentRef.current.value.includes('@')){
                    var taggedUser = commentRef.current.value.indexOf('@')+1 
                    var commentatorId = commentRef.current.value.substr(taggedUser, 1) 
                    var commentatorFirestoreId = commentators[commentatorId-1]
                    if(commentatorId == 'O'){
                         commentatorFirestoreId = props.uid
                    }
                    if(commentatorId == 'o'){
                        commentatorFirestoreId = props.uid
                   }

                    if(commentatorFirestoreId !== '' || commentatorFirestoreId !== null){
                        var notificationsRef2 = firestore.collection( 'notifications/' + commentatorFirestoreId + '/notificationList')

                        await notificationsRef2.add({
                            postId: props.id,
                            created: firebase.firestore.FieldValue.serverTimestamp(),
                            type: 'mentionedComment'
                        })
                    }
                }
                
                commentRef.current.value = ''
                dummy.current.scrollIntoView({behavior:'smooth'})
            }catch(e){
                setError('Failed to create Post')
            } 
            setLoading(false)
        }    
   }

    return(
    <Modal 
    id={style.modalPostView}
    contentClassName={style.roundedCorners}  
    show={props.show} 
    onHide={() => props.setShow(false)} 
    centered>
            <div className={style.modalPostBody}>
            
                <div className={style.modalPostHeaderSection}>
                    <div className={style.closeButton} onClick={()=>props.setShow(false)}><RiCloseFill  size="20"  /></div>
                    <h3>{props.title}</h3>
                        {props.text}
                </div>
                <div className={style.messageFooter}>
                    <b>{props.created && moment(props.created.toDate()).fromNow()}</b>
                </div>
                <hr id={style.zeroPaddingzeroMargin}/>
                <div className={style.modalPostCommentSection}>
                    {currentUser && comments && comments.map(item => <ListItemComment key={item.id} text={item.text} created={item.created} uid={item.uid} authId={currentUser.uid} createdBy={props.uid} commentatorId={calculateCommentatorId(item.uid,props.uid)} /> )}
                    <div ref={dummy}></div>
                </div>
            </div>
            <div className={style.modalPostInputSection}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col lg={11}>
                                <Form.Group id="commentRef">
                                    <Form.Control type="text" ref={commentRef} required />
                                </Form.Group>
                            </Col>
                            <Col lg={1}>
                                <Button className={style.roundedCorners} disabled={loading}  type="submit">
                                    send
                                </Button>
                            </Col>
                        </Row>
                </Form>
            </div>
    </Modal>
    )
}