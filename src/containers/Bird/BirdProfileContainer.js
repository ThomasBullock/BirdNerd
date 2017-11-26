import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  createBird,
  updateBird,
  deleteBird
} from '../../ducks/bird';

import { likePhoto } from '../../ducks/photos';

import BirdProfile from '../../components/Bird/BirdProfile';

class BirdProfileContainer extends Component {
	render() {
		const birdSlug = this.props.match.params.birdSlug;
		return (
			<div>
			{this.props.birdInfo && this.props.photos ? (
				<BirdProfile 
					birdInfo={this.props.birdInfo} 
					photos={this.props.photos} 
					user={this.props.user} 
					likeHandler={this.props.likePhoto}
					deleteBird={this.props.deleteBird}
				/>
			) : (
				<h2>Loading...</h2>
			)
				
			}
				</div>
		)
	}
}


const mapStateToProps = (state, props) => {
	console.log(props.match.params.birdSlug)
	return {
		birdInfo: state.get('bird').filter(birdInfo => birdInfo && birdInfo.get('slug') === props.match.params.birdSlug).get(0),
		photos: state.get('photos').filter(photoInfo => photoInfo.get('birdSlug') === props.match.params.birdSlug),
		user: state.getIn(['auth', 'user'])
	}
}

const mapDispatchToProps = (dispatch) => {
	// console.log(dispatch);
  return {
    createBird: (bird) => dispatch(createBird(bird)),
    updateBird: (bird) => dispatch(updateBird(bird)),
    deleteBird: (_id) => dispatch(deleteBird(_id)),
    likePhoto: (photo) => dispatch(likePhoto(photo))
  }; // here we're mapping actions to props	
}

export default connect(mapStateToProps, mapDispatchToProps)(BirdProfileContainer);