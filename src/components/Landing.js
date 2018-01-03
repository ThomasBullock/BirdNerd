import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestPhotos } from '../ducks/photos';
import '../styles/css/components/Landing.css';

import { cloudinaryUrlModify } from '../clientHelpers';

class Landing extends Component {
	constructor(props) {
		super(props);
		
		// this.getImages = this.getImages.bind(this);
	}

	componentWillMount() {

	}
	
	componentDidMount() {
    this.props.dispatch(requestPhotos());
		// if(this.props.user) {
		// 	this.props.history.push('/home');
		// }      		
	}
	
	getImage(aspect, index) {
		// const requestedAspects = Array.from(arguments)
		// requestedAspects.map(aspect => {
			// console.log(this.props.photosLandscape)
				const image = (aspect === 'Landscape') ? this.props.photosLandscape.getIn([index, 'imageUrl'])
				: this.props.photosPortrait.getIn([index, 'imageUrl']) ;
				const aspectModifier = (aspect === 'Landscape') ? 'landing__grid-image landing__grid-image--aspect4x3' : 'landing__grid-image landing__grid-image--aspect3x4'
				return(
					<div className={aspectModifier}> 
						<img src={image && cloudinaryUrlModify(image.split('/'), 'w_500') }/>
					</div>
				)

		// })
	}
	
	render() {
		return(
			<div className="landing">
				<div className="landing__screen"></div>
				<div className="landing__hero-grid">
					{this.getImage('Portrait', 0)}
					{this.getImage('Landscape', 1)}
					{this.getImage('Landscape', 3)}
					{this.getImage('Landscape', 8)}										
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
					{this.getImage('Landscape', 7)}
					{this.getImage('Portrait', 3)}					
				</div>										
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		photosLandscape: state.get('photos').filter(photoInfo => photoInfo.get('imageAspect') === 'Landscape').sort((a, b) => b.get('likes').size - a.get('likes').size),
		photosPortrait: state.get('photos').filter(photoInfo => photoInfo.get('imageAspect') === 'Portrait').sort((a, b) => b.get('likes').size - a.get('likes').size),		
    user: state.getIn(['auth', 'user'])	
	}
}

export default connect(mapStateToProps)(Landing);