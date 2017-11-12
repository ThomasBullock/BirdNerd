import React from 'react';
import '../../styles/css/components/FullBird.css';
import { Link } from 'react-router-dom';

import BirdCard from '../Bird/BirdCard';

const MyPhotos = ({ photos, user }) => {
		const userRole = user.get('role');
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
					user={userRole}
				/>	
			)
		})
    return (
    	<div className="container">
    		<button className="button--upload"><Link to={`/bird/mybirds/new`}>Submit Photo</Link></button>
    		<div className="container">
    			{birdPhotos}
	  		</div>	  	  			  		
	  	</div>	
    );
}

export default MyPhotos;
