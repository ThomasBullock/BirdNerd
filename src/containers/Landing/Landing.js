import React, { Component } from 'react';
import { instanceOf, func, bool } from 'prop-types';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import { requestPhotos } from '../../ducks/photos';

import * as Scroll from 'react-scroll';
import { Link as SmoothLink, DirectLink, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


import Hero from '../../components/Landing/Hero';
import Features from '../../components/Landing/Features';

import { cloudinaryUrlModify } from '../../clientHelpers';

class Landing extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
    // this.props.dispatch(requestPhotos());
	}

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