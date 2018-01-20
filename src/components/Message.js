import React from 'react';
import { Link } from 'react-router-dom';

const Message = ({heading, text, link, label}) => {
	console.log(heading)
	return (
		<div className="message">
			<div className="message__panel">
				<h2 className="message__heading">{heading}</h2>
				<p className="message__text">{text}</p>
				{link && <button>
								   <Link to={link}>{label}</Link>
								 </button>}
			</div>	
		</div>	
	)
}

export default Message;