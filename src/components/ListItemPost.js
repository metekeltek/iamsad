import React from 'react'

export default function ListItemPost(props) {
    const {text,uid} = props.post
    return (
        <p>{text}</p>
    )
}
