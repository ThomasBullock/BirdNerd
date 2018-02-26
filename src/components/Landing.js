import React, { Component } from 'react';
import { instanceOf, func, bool } from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";

import { requestPhotos } from '../ducks/photos';
import IconBird from './icons/IconBird';

import { cloudinaryUrlModify } from '../clientHelpers';

class Landing extends Component {
	constructor(props) {
		super(props);
		
		// this.getImages = this.getImages.bind(this);
	}

	componentWillMount() {
    this.props.dispatch(requestPhotos());
	}
	
	
	getImage(aspect, index) {
				const image = (aspect === 'Landscape') ? this.props.photosLandscape.getIn([index, 'imageUrl'])
				: this.props.photosPortrait.getIn([index, 'imageUrl']) ;
				const aspectModifier = (aspect === 'Landscape') ? 'landing__grid-image landing__grid-image--aspect4x3' : 'landing__grid-image landing__grid-image--aspect3x4'
				return(
					<div className={aspectModifier}> 
						<img src={image && cloudinaryUrlModify(image.split('/'), 'w_300') }/>
					</div>
				)
	}
	
	render() {
		return(
			<div className="landing">
				<Helmet>
            		<title>BirdNerd App</title>
					<meta name="description"        content="$OG_DESCRIPTION" />
					<meta property="og:title"       content="BirdNerd App" />
					<meta property="og:description" content="BirdNerd is a free photo sharing site for Birdwatchers. Within this site you can view photos, sighting locations and general bird information." />
					<meta property="og:image"       content="https://cdn.dribbble.com/users/224707/screenshots/1966613/birdnerd.jpg" />
        		</Helmet>
				<div className="landing__screen"></div>
				<div className="landing__hero-grid">
					{this.getImage('Portrait', 0)}
					{this.getImage('Landscape', 1)}
					{this.getImage('Landscape', 3)}
					{this.getImage('Landscape', 8)}
					{this.getImage('Landscape', 0)}																	
				</div>
				<div className="landing__hero-grid">
					{this.getImage('Portrait', 1)}
					{this.getImage('Landscape', 4)}
					{this.getImage('Portrait', 2)}
					{this.getImage('Portrait', 4)}					
					{this.getImage('Landscape', 5)}					
				</div>
				<div className="landing__hero-grid">
					{this.getImage('Landscape', 6)}
					{this.getImage('Portrait', 3)}							
					{this.getImage('Landscape', 7)}
					{this.getImage('Portrait', 5)}					
				</div>
				<div className="landing__panel">
					<div className="form">
		        <div className="form__title">
		          <h2>Welcome to BirdNerd</h2>
		        </div>
		        <div>
		        	<p className="landing__intro">BirdNerd is a free photo sharing site for Birdwatchers. Within this site you can view photos, sighting locations and general bird information.</p>
		        </div>
		        <div className="landing__cta--no-margin">
		        	<div className="landing__cta-btns">
		        		<button className="nav-tabs__button landing__bird-btn" >
		        			<IconBird />
		        			<Link to="/bird">Explore our bird database</Link>
		        		</button>
		        	</div>	
		        </div>			        
		        <div className="landing__cta">
		        	<p>Sign up to share your favourite birdwatching photos.</p>
		        	<div className="landing__cta-btns">
		        		<button className="nav-tabs__button" >
		        			<Link to="/register">Sign up</Link>
		        		</button>
		        		<button className="nav-tabs__button" >
		        			<Link to="/login">Login</Link>
		        		</button>
		        	</div>	
		        </div>		        
					</div>
				</div>										
			</div>
		)
	}
}

Landing.propTypes = {
  photosLandscape: instanceOf(Immutable.List).isRequired,
  photosPortrait: instanceOf(Immutable.List).isRequired
}

const mapStateToProps = (state) => {
	return {
		photosLandscape: state.get('photos').filter(photoInfo => photoInfo.get('imageAspect') === 'Landscape').sort((a, b) => b.get('likes').size - a.get('likes').size),
		photosPortrait: state.get('photos').filter(photoInfo => photoInfo.get('imageAspect') === 'Portrait').sort((a, b) => b.get('likes').size - a.get('likes').size),		
	}
}

export default connect(mapStateToProps)(Landing);