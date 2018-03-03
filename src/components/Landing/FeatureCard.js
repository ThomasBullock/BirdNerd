import React from 'react';
import IconBird from '../icons/IconBird';
import IconCamera from '../icons/IconCamera';
import IconBinoculars from '../icons/IconBinoculars';
import IconUsers from '../icons/IconUsers';


const getIcon = (icon) => {
	switch (icon) {
		case 'IconBird':
			return (<IconBird />);
		case 'IconCamera': 
			return (<IconCamera />);
		case 'IconBinoculars':
			return (<IconBinoculars />);	
		case 'IconUsers':
			return (<IconUsers />);				
		default:
			return (<IconBird />);	
	}
}

const getIconClassnames = (color) => {
	return `feature-card__icon feature-card__icon--${color}`
}

const FeatureCard = (props) => {
	const { title, text, icon, color } = props;
	return(
	<div className="feature-card">
    <div className={getIconClassnames(color)}>
     {getIcon(icon)}
    </div>
    <div className="feature-card__content">
      <h2 className="feature-card__title">{title}</h2>
      <p>{text}</p>
      </div>
  </div>  
	)
}

export default FeatureCard;