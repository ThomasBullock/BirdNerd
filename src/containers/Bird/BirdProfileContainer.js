import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  createBird,
  updateBird,
  removeBird
} from '../../ducks/bird';

import BirdProfile from '../../components/Bird/BirdProfile';

class BirdProfileContainer extends Component {
	render() {
		const birdSlug = this.props.match.params.birdSlug;
		return (
			<div>
			{this.props.birdInfo && this.props.photos ? (
				<BirdProfile birdInfo={this.props.birdInfo} photos={this.props.photos} />
			) : (
				<h2>Loading...</h2>
			)
				
			}
				</div>
		)
	}
}


const mapStateToProps = (state, props) => {
	return {
		birdInfo: state.get('bird').filter(birdInfo => birdInfo && birdInfo.get('slug') === props.match.params.birdSlug).get(0),
		photos: state.get('photos').filter(photoInfo => photoInfo.get('birdSlug') === props.match.params.birdSlug)
	}
}

const mapDispatchToProps = (dispatch) => {
	// console.log(dispatch);
  return {
    createBird: (bird) => dispatch(createBird(bird)),
    updateBird: (bird) => dispatch(updateBird(bird)),
    removeBird: (bird) => dispatch(removeBird(bird)),
  }; // here we're mapping actions to props	
}

export default connect(mapStateToProps, mapDispatchToProps)(BirdProfileContainer);