import React from 'react';
import '../../styles/css/components/Home.css';
import { Link } from 'react-router-dom';

import BirdCard from '../Bird/BirdCard';

const userPermission = (user, photo) => {
	if(user && user.get('role') === 'moderator') {
		return true;
	} else if (user && photo.getIn(['user', '_id']) === user.get('_id')) {
		return true;
	} else {
		return false;
	}
}


const HomePage = ({ photos, sort, user }) => {
		// console.log(user)

		const birdPhotos = photos.map( (item, i) => {
			return (
				<BirdCard 
					key={i}
					id={item.get('_id')}
					name={item.get('birdName')}					
					orientation={item.get('imageAspect')}
					slug={item.get('birdSlug')}
					likes={item.get('likes')}
					comments={item.get('comments').length}
					img={item.get('imageUrl')}
					public_id={item.get('public_id')}
					owner={userPermission(user, item)} // would it be more efficient to pass _id's directly rather then maps??
					userID={item.getIn(['user', '_id'])}
					gravatar={item.getIn(['user', 'gravatar'])}			
				/>	
			)
		})
    return (
    	<div className="container">
    		<ul className="nav-tabs">
				  <li className="tab-header-and-content">
				    { /* <a href="#" className="nav-tabs__link">Newest Photos</a> */}
				    <button className="button--upload" onClick={() => sort('Newest')}>Newest Photos</button>
				  </li>
				  <li className="tab-header-and-content">
				    <button className="button--upload" onClick={() => sort('Oldest')}>Oldest Photos</button>
				  </li>
				  <li className="tab-header-and-content">
				    <button className="button--upload" onClick={() => sort('Popular')}>Most Popular</button>
				  </li>
				</ul>
    		
    		<div className="container">
    			{birdPhotos}
	  		</div>	  	  			  		
	  	</div>	
    );
}

export default HomePage;
