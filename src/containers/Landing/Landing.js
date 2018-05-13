import React, { Component } from 'react';
import { requestPhotos } from '../../ducks/photos';

import * as Scroll from 'react-scroll';
import { Link as SmoothLink, animateScroll as scroll } from 'react-scroll'


import Hero from '../../components/Landing/Hero';
import Features from '../../components/Landing/Features';


class Landing extends Component {

	scrollTo() {
		scroll.scrollTo(document.querySelector('#features'));
	}
	
	
	
	render() {
		return(
			<div className="landing">
				<div className="landing__viewport">
					<h1 className="landing__heading"> Welcome to Birdnerd</h1>
					<Hero />
				</div>				
				<Features />
			</div>
		)
	}
}



export default Landing;