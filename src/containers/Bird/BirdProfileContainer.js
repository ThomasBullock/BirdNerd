import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  requestBird,
  createBird,
  updateBird,
  removeBird
} from '../../ducks/bird';

import {
	requestPhotos
} from '../../ducks/photos';

import BirdProfile from '../../components/Bird/BirdProfile';

class BirdProfileContainer extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			mounted: null
		}
	}
	
	componentDidMount() {
		const slug = this.props.match.params.birdSlug;
		this.props.requestBird(slug);
		this.props.requestPhotos(slug);
		// this.setState({
		// 	mounted: true
		// })			
	}
	
	render() {
		//const birdInfo = (this.state.mounted) ? this.props.bird.last() : null;
		//const photos = (this.state.mounted) ? this.props.photos.last() : null;

		// console.log(photos)
		console.log('Birds : ', this.props.birds);
		return (
			<div>
			{this.props.bird && this.props.photos} ? (
				<BirdProfile birdInfo={this.props.bird} photos={this.props.photos} />
			) :  (
				<h2>Loading</h2>
			)
				
			}
				</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		bird: state.get('bird'),
		photos: state.get('photos')
	}
}

const mapDispatchToProps = (dispatch) => {
	// console.log(dispatch);
  return {
    requestBird: (bird) => dispatch(requestBird(bird)),
    createBird: (bird) => dispatch(createBird(bird)),
    updateBird: (bird) => dispatch(updateBird(bird)),
    removeBird: (bird) => dispatch(removeBird(bird)),
    requestPhotos: (query) => dispatch(requestPhotos(query))
  }; // here we're mapping actions to props	
}

export default connect(mapStateToProps, mapDispatchToProps)(BirdProfileContainer);