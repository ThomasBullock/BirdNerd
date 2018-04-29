import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = (props) => {
    const { heading, subHeading, img, link } = props;
    return(
    <div className="list-item">
        <div style={{'backgroundImage': `url(${img})`, backgroundSize: 'cover' }} className="list-item__img"></div>
        <div className="list-item__content">
            <Link className="list-item__link" to={link}>{heading}</Link>
            <div className="list-item__description"><i>{subHeading}</i></div>
        </div>
    </div>
    )
}

export default ListItem;