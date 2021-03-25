import {useAuth} from '../controller/AuthContext'
import {firestore} from '../firebase'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {Modal} from 'react-bootstrap'
import style from '../custom.module.scss'
import {RiCloseFill} from 'react-icons/ri';
import ListItemNotification from '../components/ListItemNotification';

export default function Notification(props){
    const {currentUser} = useAuth();
    const notificationsRef = currentUser ? firestore.collection('notifications/' +  currentUser.uid + '/notificationList' ) : null
    const query = currentUser ? notificationsRef.orderBy('created','desc').limit(50) : null
    const [notifications] = useCollectionData(query, {idField:'id'});

    return(
    <Modal
    id={style.modalCreatePostView}
    contentClassName={style.roundedCorners}
    show={props.show}
    onHide={() => props.setShow(false)}
    aria-labelledby="Notification"
    centered>
        <div className={style.modalCreatePostHeaderSection}>
                <div className={style.closeButton} onClick={()=>props.setShow(false)}><RiCloseFill  size="20"  /></div>
                <h4>Notifications</h4>
        </div>
        <hr id={style.zeroPaddingzeroMargin}/>
        <div className={style.modalPostBody}>
            <div className={style.modalPostCommentSection}>
                {currentUser && notifications && notifications.map(item => <ListItemNotification key={item.id} notification={item}/>)}           
            </div>
        </div>
       
    </Modal>
    )

}