import React from 'react';
import '../../styles/css/components/Home.css';
import { Link } from 'react-router-dom';

import BirdCard from '../Bird/BirdCard';

const HomePage = ({ photos, sort }) => {
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
