import React from 'react';
import '../../styles/css/components/FullBird.css';

import BirdCard from './BirdCard';

const FullBird = (props) => {
    return (
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
    );
}

export default FullBird;
