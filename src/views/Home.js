import {useState} from 'react'
import {useAuth} from '../controller/AuthContext'
import {Button,Row,Col} from 'react-bootstrap'
import {firestore} from '../firebase'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import ListItemPost from '../components/ListItemPost'
import style from '../custom.module.scss'
import {BiHelpCircle} from 'react-icons/bi';
import {HiOutlineLogout} from 'react-icons/hi';
import {RiNotificationLine,RiAddFill,RiFilterLine,RiFilterOffLine} from 'react-icons/ri';
import Create from './Create'


//*Main
export function Home(){
    const {currentUser} = useAuth();
    const [showAll, setShowAll] = useState(true)
    const postsRef = firestore.collection('posts')
    const query = postsRef.orderBy('created','desc').limit(50);
    const [posts] = useCollectionData(query, {idField:'id'});
    
    return (
        <>
            <HomeHeader showAll={showAll} setShowAll={setShowAll}/>
            { showAll ? posts && posts.map(item => <ListItemPost key={item.id} post={item}/> ) : posts && posts.map(item => item.uid === currentUser.uid ? <ListItemPost key={item.id} post={item}/> : null ) }
        </>
    )
}

//*Components
function HomeHeader(props){
    return (
        <Row className={style.stickyHeader}>
                <Col xs={5} sm={5} md={4} lg={3}>
                    <div className={style.center}>
                        <FilterPostButton showAll={props.showAll} setShowAll={props.setShowAll}/>
                    </div>
                </Col>
                <Col xs={0}>
                    <div className={style.center}>
                        <AddPostButton/>
                    </div>
                </Col>
                <Col xs={0}>
                    <div className={style.center}>
                        <NotificationButton/>
                    </div>
                </Col>
                <Col xs={0}>
                    <div className={style.center}>
                        <HelpButton/>
                    </div>
                </Col>
                <Col xs={0}>
                    <div className={style.center}>
                        <LogoutButton/>
                    </div>
                </Col>
            </Row>
        
        )
}
//*Buttons
function FilterPostButton(props){
    return (
        <Button onClick={()=>props.setShowAll(!props.showAll)}  id={style.filterPostButton}>
            {props.showAll ? <><RiFilterLine size="20" className={style.showAllIcon}/> Show all</> : <><RiFilterOffLine size="20" className={style.showAllIcon}/> Show mine</>}
        </Button>
    )
}

function AddPostButton() {
    const [show, setShow] = useState(false);
    return (
        <>
        <Button onClick={() => setShow(true)} id={style.addPostButton} >
            <div className={style.center}>
                <RiAddFill size="25"  />
            </div>
        </Button>
        <Create show={show} setShow={setShow}/>
        </>        
    )
}

function NotificationButton() {
    return (
        <Button id={style.notificationButton}>
            <div className={style.center}>
                <RiNotificationLine size="25"  />
            </div>
        </Button>        
    )
}

function HelpButton() {
    return (
        <Button id={style.helpButton}>
            <div className={style.center}>
                <BiHelpCircle size="25" />
            </div>
        </Button>        
    )
}

function LogoutButton() {
    const {signOut} = useAuth();

    async function logout(){
        await signOut()
    }

    return (
        <Button onClick={logout} id={style.logoutButton}>
            <div className={style.center}>
                <HiOutlineLogout size="25" />
            </div>
        </Button>        
    )
}