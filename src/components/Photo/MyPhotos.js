import React from 'react';
import '../../styles/css/components/FullBird.css';
import { Link } from 'react-router-dom';

import BirdCard from '../Bird/BirdCard';

const MyPhotos = (myPhotos) => {
		console.log(myPhotos)
		const photos = myPhotos.myPhotos.map( (item, i) => {
			console.log(item)
			return (
	        <BirdCard 
	        	key={i}
	        	id={item._id}
		  			orientation={item.imageAspect}
		  			slug={item.birdSlug}
		  			likes={item.likes}
		  			comments={item.comments.length}
		  			img={item.imageUrl}
		  			>
		  		</BirdCard>		
			)
		})
	
    return (
    	<div className="container">
    		<button className="button--upload"><Link to={`/mybirds/new`}>Submit Photo</Link></button>
    		<div className="container">
    			{photos}
	  		</div>	  	  			  		
	  	</div>	
    );
}

export default MyPhotos;
