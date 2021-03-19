import React from 'react'
import {Button,Row,Col,Dropdown, Container} from 'react-bootstrap'
import style from '../custom.module.scss'



export default function ListItemPost(props) {
    const {text,title,created} = props.post
    return (
            <Row id={style.listItemPost}>
                <Col sm={10}>
                        <Row><h3>{title}</h3></Row>
                        <Row><h5 className={style.cutText}>{text}</h5></Row>
                </Col>
                <Col sm={2}>
                    <div className={style.center}>
                        30min ago
                    </div>
                </Col>
            </Row>
            
    )
}
