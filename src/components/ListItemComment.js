import style from '../custom.module.scss'
import moment from 'moment';
import pepe from '../assets/pepe.png'


export default function ListItemComment(props) {
    if(props.text.includes('@')){
        var ätindex = props.text.indexOf('@')
        var commentatorId = props.text.substr(ätindex,2) 
        if(commentatorId == '@O'){
            commentatorId = '@OP'
       }
       if(commentatorId == '@o'){
        commentatorId = '@op'
        }
    }
    

    return (
        <>
            <div className={style.messageBody}>
                <img src={pepe} className={style.commentPepe} /> <b>{props.authId === props.uid ? props.commentatorId + " (You)" : props.createdBy === props.uid ? "OP" :  props.commentatorId}</b>
                <p dangerouslySetInnerHTML={{ __html: props.text.replace(commentatorId, '<b style=color:green>'+commentatorId+'</b>') }}></p>
            </div>
            <div className={style.messageFooter}>
               <b>{props.created && moment(props.created.toDate()).fromNow()}</b>
            </div>
            <hr id={style.zeroPaddingzeroMargin}/>
        </>
    )
}
