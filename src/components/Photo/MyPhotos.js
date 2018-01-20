import React from 'react';
import { Link } from 'react-router-dom';

import BirdCard from '../Bird/BirdCard';

// Duplicate code also in Homepage to be improved!
const userPermission = (user, photo) => {
	if(user && user.get('role') === 'moderator') {
		return true;
	} else if (photo.getIn(['user', '_id']) === user.get('_id')) {
		return true;
	} else {
		return false;
	}
}

const MyPhotos = ({ photos, user, likeHandler }) => {
		const userRole = user.get('role');
		const birdPhotos = photos.map( (item, i) => {
			return (
				<BirdCard 
					key={i}
					id={item.get('_id')}
					name={item.get('birdName')}					
					orientation={item.get('imageAspect')}
					slug={item.get('birdSlug')}
					likes={item.get('likes') ? item.get('likes').size : 0 }
					comments={item.get('comments').length}
					img={item.get('imageUrl')}
					public_id={item.get('public_id')}
					owner={userPermission(user, item)} // would it be more efficient to pass _id's directly rather then maps??
					userID={item.getIn(['user', '_id'])}
					gravatar={item.getIn(['user', 'gravatar'])}
					likeHandler={likeHandler}						
				/>	
			)
		})
    return (
    	<div className="container">
	    	<ul className="nav-tabs">
	    		<li>
    				<button className="nav-tabs__button"><Link to={`/bird/mybirds/new`}>Submit Photo</Link></button>
    			</li>
    		</ul>		
    		<div className="cards-wrapper">
    			{birdPhotos}
	  		</div>	  	  			  		
	  	</div>	
    );
}

export default MyPhotos;
