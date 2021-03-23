import style from '../custom.module.scss'
import moment from 'moment';
import pepe from '../assets/pepe.png'


export default function ListItemComment(props) {
    return (
        <>
            <div className={style.messageBody}>
                <img src={pepe} className={style.commentPepe} /> <b>{props.authId === props.uid ? props.commentatorId + " (You)" : props.createdBy === props.uid ? "OP" :  props.commentatorId}</b>
                <p>{props.text}</p>
            </div>
            <div className={style.messageFooter}>
               <b>{props.created && moment(props.created.toDate()).fromNow()}</b>
            </div>
            <hr id={style.zeroPaddingzeroMargin}/>
        </>
    )
}
