import React from 'react'

import './Card.css'

const Card = (props) => {
    return (
        <article className='Card'>
            <h3>{props.title}</h3>
            {props.content}
        </article>
    )
}

export default Card