import {useState} from 'react'
import {Row,Col} from 'react-bootstrap'
import style from '../custom.module.scss'
import moment from 'moment';
import Post from '../views/Post'


export default function ListItemPost(props) {
    const {text,title,created, id, uid} = props.post
    const [show, setShow] = useState(false);

    return (
        <>
            <Row onClick={() => setShow(true)} id={style.listItemPost}>
                <Col xs={8} sm={10}>
                        <Row><h3 className={style.cutText}>{title}</h3></Row>
                        <Row><h5 className={style.cutText}>{text}</h5></Row>
                </Col>
                <Col xs={4} sm={2}>
                    <div className={style.center}>
                        {created && moment(created.toDate()).fromNow()}
                    </div>
                </Col>
            </Row>
            <Post show={show} setShow={setShow} title={title} text={text} id={id} uid={uid} created={created} />
        </>  
    )
}
