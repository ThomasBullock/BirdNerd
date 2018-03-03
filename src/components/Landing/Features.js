import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FeatureCard from './FeatureCard';

import IconBird from '../icons/IconBird';
import IconSignUp from '../icons/IconSignUp'; 


const Features = () => {
	return(
		<div id="features" className="features">
			<h2 className="features__heading">A comprehensive resource for birdwatchers</h2>
			<div className="features__cards-wrapper">
				<FeatureCard 
					title="Share"
					text="Share your bird photos 
					with other birdwatchers from around the world."
					icon="IconCamera"
					color="blue"
				/>
				<FeatureCard 
					title="Locations"
					text="Find locations of latest bird watching photos."
					icon="IconBinoculars"
					color="yellow"
				/>
				<FeatureCard 
					title="Browse"
					text="Browse our database
					of birds from around the world."
					icon="IconBird"
					color="pink"
				/>
				<FeatureCard 
					title="Community"
					text="Connect with other birdwatchers."
					icon="IconUsers"
					color="magenta"
				/>																			
			</div>
			<div className="features__cta">
				<div className="features__cta-database">
					<p>Explore our database of bird species.</p>
        	<Link to="/bird">
        		<button className="landing__btn" >
        			<IconBird />
        			Bird database	
        		</button>
        	</Link>			
				</div>
				<div className="features__cta-signup">
					<p>I've heard enough sign me up!</p>
					<Link to="/register">
						<button className="landing__btn">
							<IconSignUp />
							Sign up
						</button>								
					</Link>
				</div>						
			</div>
		</div>		
	)
}

export default Features;