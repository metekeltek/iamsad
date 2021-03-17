import {useAuth} from '../controller/AuthContext'
import {Button, Container, Row,Col,Dropdown,Navbar } from 'react-bootstrap'
import {firestore} from '../firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import ListItemPost from '../components/ListItemPost'
import style from '../../src/style.css'



export function Home(){
    const {signOut, currentUser} = useAuth();
    const postsRef = firestore.collection('posts')
    const query = postsRef.orderBy('created').limit(50);

    const [posts] = useCollectionData(query, {idField:'id'});
    

    async function logout(){
        await signOut()
    }

    return (
        <div>
            <HomeHeader />
            {currentUser && currentUser.email}<br/>
            <Button onClick={logout}>logout</Button>
            <div>
                {posts && posts.map(item => <ListItemPost key={item.id} post={item}/>)}
            </div>
        </div>
        
       
    )
}

function HomeHeader(){
    return (
        <div >
            <Row className={style.stickyHeader}>
                <Col sm={3} style={{backgroundColor:'blue'}}>
                    <FilterPostsButton />
                </Col>
                <Col sm={1} style={{backgroundColor:'green'}}>
                    2
                </Col>
                <Col lg style={{backgroundColor:'yellow'}}>
                    3
                </Col>
                <Col sm={1} style={{backgroundColor:'purple'}}>
                    4
                </Col>
                <Col sm={1} style={{backgroundColor:'red'}}>
                    5
                </Col>
                <Col sm={1} style={{backgroundColor:'orange'}}>
                    6
                </Col>
            </Row>
        </div>
                
    )
}

function FilterPostsButton(){
return (
    <Dropdown size="md" block>
        <Dropdown.Toggle size="md" variant="light" id="dropdown-basic" block>
            Show all
        </Dropdown.Toggle>

        <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Show all</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Show mine</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
)
}

function AddPostButton() {
    return (
        <div></div>
    )
}