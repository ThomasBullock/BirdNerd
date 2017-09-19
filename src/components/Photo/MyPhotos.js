import React from 'react';
import '../../styles/css/components/FullBird.css';
import { Link } from 'react-router-dom';

import BirdCard from '../Bird/BirdCard';

const MyPhotos = (props) => {
    return (
    	<div className="container">
    		<button className="button--upload"><Link to={`/mybirds/new`}>Submit Photo</Link></button>
    		<div className="container">
	        <BirdCard 
		  			orientation="landscape"
		  			img="http://www.australiananimallearningzone.com/wp-content/uploads/2012/03/Rainbow-Lorikeet-Pictures.jpg"
		  			>
		  		</BirdCard>
		  		<BirdCard orientation="portrait"
		  			img="http://www.blaize.net/wp-content/uploads/2011/02/Bird-3.jpg"
		  		>
		  		</BirdCard>
		  		<BirdCard 
		  			orientation="landscape"
		  			img="https://upload.wikimedia.org/wikipedia/commons/7/72/Alcedo_azurea_-_Julatten.jpg"
		  			>
		  		</BirdCard>
		  		<BirdCard 
		  			orientation="portrait"
		  			img="https://perthzoo.wa.gov.au/sites/default/files/animal/images/Southern%20Cassowary%20Image1.jpg"
		  			>
		  		</BirdCard>
	  		</div>	  	  			  		
	  	</div>	
    );
}

export default MyPhotos;
