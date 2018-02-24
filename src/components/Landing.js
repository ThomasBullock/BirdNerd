import React, { Component } from 'react';
import { instanceOf, func, bool } from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
				<div className="landing__hero-wrapper">
					<div className="landing__camera-container">
						<div className="hero__bird-wrapper">
							<svg viewBox="0 0 100 100" className="hero__bird" preserveAspectRatio="xMidYMid slice">
								<defs>
					        <mask id="mask" maskUnits="userSpaceOnUse"
					              maskContentUnits="userSpaceOnUse">
					            <image className="hero__bird-image" xlinkHref="https://img-fotki.yandex.ru/get/15520/5091629.a4/0_8d416_118079e_orig" 
					                   width="100" height="100"></image>
					        </mask>
					        <linearGradient id="linear-gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100%" y2="100%" >
						      	<stop offset="0%" stopColor="#38aeF4" stopOpacity="100%"/>
						      	<stop offset="20%" stopColor="#a026bf" stopOpacity="100%"/>
						      	<stop offset="60%" stopColor="#e82c75" stopOpacity="100%"/>
						      	<stop offset="85%" stopColor="#FCEE21" stopOpacity="100%"/>
						      	<stop offset="95%" stopColor="#38aeF4" stopOpacity="100%"/>        
					      	</linearGradient>
								</defs>
								<g mask="url(#mask)" className="g-container">
		       				<rect fill="url(#linear-gradient)" width="100%" height="100%"></rect>
		        			<rect fill="url(#linear-gradient)" width="100%" height="100%"></rect>
		    				</g>
							</svg>
						</div>	
					</div>
					<div className="landing__intro-container">
						<p className="">
							BirdNerd is a free photo sharing site for Birdwatchers. Within this site you can view photos, sighting locations and general bird information.
						</p>
					</div>
					<div className="landing__cta-container">
						<button>Sign up</button>
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