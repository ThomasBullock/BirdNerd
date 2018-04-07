import React, { Fragment } from 'react';
import { func, number, string } from 'prop-types';
import { Link } from 'react-router-dom';

import IconLocation from '../icons/IconLocation';
import IconHeart from '../icons/IconHeart';
import IconBubble from '../icons/IconBubble';
import IconBird from '../icons/IconBird';
import IconCamera from '../icons/IconCamera';
import IconCalendar from '../icons/IconCalendar';


// 			{ /*  */}

const getIcon = (type) => {
	switch(type) {
		case 'likes':
			return <IconHeart/>;
		case 'comments':
			return <IconBubble/>;
		case 'bird':
			return <IconBird/>;									
		case 'location':
			return <IconLocation/>;		
		case 'camera':
			return <IconCamera/>;	
		case 'calendar':
			return <IconCalendar/>;									
		default:
			return <IconBird/>;
	}
}

const getNumber = (number) => {
	return (number) ? <span className="birdcard__number">{number}</span> : null;
}



const IconButton = (props) => {
	const { type, func, handler, number, id, slug } = props;
	const checkHandler = (handler) ? () => handler(id) : null;
	return(
		<Fragment>
		{slug ? (
			<Link className="birdcard__button" to={`/bird/${slug}`} >
				{getIcon(type)}
			</Link>
		)	: (
			<button className="birdcard__button" onClick={checkHandler}>
			{getIcon(type)}
			{getNumber(number)}
			</button>		
		)

		}
		</Fragment>	
	)
}

IconButton.propTypes = {
	id: string,
	type: string.isRequired,
	icon: string,
	handler: func,
	number: number
}

export default IconButton;