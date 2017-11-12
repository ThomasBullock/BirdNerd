import React from 'react';
import '../styles/css/components/Message.css';

const Message = ({heading, text}) => {
	console.log(heading)
	return (
		<div className="message">
			<div className="message__panel">
				<h2 className="message__heading">{heading}</h2>
				<p className="message__text">{text}</p>
			</div>	
		</div>	
	)
}

export default Message;