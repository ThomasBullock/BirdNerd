import React from 'react';
import TopBar from '../TopBar';
import BirdCard from '../BirdCard';

import '../../styles/css/components/Home.css';

const Home = () => (
  <div>
  	<TopBar></TopBar>
  	<main>
  		<h2>This is the home page</h2>
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
	  	</div>	
  	</main>

  </div>
)

export default Home;