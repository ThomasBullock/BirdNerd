import React, { Component } from 'react';
import Camera from './Camera';

import { Link } from 'react-router-dom';

import * as Scroll from 'react-scroll';
import { Link as SmoothLink, DirectLink, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

import IconCircleDown from '../icons/IconCircleDown';
import IconSignUp from '../icons/IconSignUp'; 
import IconLogIn from '../icons/IconLogIn'; 

class Hero extends Component {
	render() {
		return(
				<div className="hero">
					<Camera />
					<div className="hero__intro-container">
						<p className="lead">
							BirdNerd is a free photo sharing site for Birdwatchers. Within this site you can view photos, sighting locations and general bird information.
						</p>
						<div className="hero__cta-container">
							<div className="hero__cta-buttons">
								<Link to="/register">
									<button className="landing__btn">
										<IconSignUp />
										Sign up
									</button>								
								</Link>
								<Link to="/login">
									<button className="landing__btn">
										<IconLogIn />
										Log in
									</button>								
								</Link>

							</div>								
							<p className="hero__cta-text">Sign up to share your favourite birdwatching photos.</p>
						</div>							
					</div>
					<div className="hero__learn-more">
						<SmoothLink className="hero__learn-more-link" spy={true} smooth={true} duration={500} to="features">
							<IconCircleDown />
						</SmoothLink>
					</div>
				</div>			
		)
	}
}

export default Hero;
