import React from 'react'
import {Button,Row,Col,Dropdown, Container} from 'react-bootstrap'
import style from '../custom.module.scss'
import moment from 'moment';

export default function ListItemPost(props) {
    const {text,title,created} = props.post

    function convertTime(time){
        
       console.log(moment(time.toDate()).fromNow())
    }
    return (
            <Row id={style.listItemPost}>
                <Col sm={10}>
                        <Row><h3>{title}</h3></Row>
                        <Row><h5 className={style.cutText}>{text}</h5></Row>
                </Col>
                <Col sm={2}>
                    <div className={style.center}>
                        {created && moment(created.toDate()).fromNow()}
                    </div>
                </Col>
            </Row>
            
    )
}
