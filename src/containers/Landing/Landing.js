import React, { Component } from 'react';
import { instanceOf, func, bool } from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
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
    this.props.dispatch(requestPhotos());
	}

  scrollTo() {
    scroll.scrollTo(document.querySelector('#features'));
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
				<div className="landing__viewport">
					<h1 className="landing__heading"> Welcome to Birdnerd</h1>
					<Hero />
				</div>				
				<Features />
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