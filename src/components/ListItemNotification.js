
import style from '../custom.module.scss'
import moment from 'moment';
import pepe from '../assets/pepe.png'


export default function ListItemNotification(props) {
    const {type,created} = props.notification

    return (
        <>
            <div className={style.messageBody}>
                <img src={pepe} className={style.commentPepe} /> {type === 'commentedPost' ? ' commented your post' : ' mentioned you in a comment'}                <p>{props.text}</p>
            </div>
            <div className={style.messageFooter}>
               <b>{created && moment(created.toDate()).fromNow()}</b>
            </div>
            <hr id={style.zeroPaddingzeroMargin}/>
        </>
    )
}
