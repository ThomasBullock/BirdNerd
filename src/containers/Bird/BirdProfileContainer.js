import React, { Component } from 'react';
import { instanceOf, object, bool } from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import Loader from '../../img/Ellipsis.svg';
import { push } from 'react-router-redux';
import store from '../../store';
import NotFound from '../../components/NotFound';  

import {
  createBird,
  updateBird,
  deleteBird,
  requestBirdList
} from '../../ducks/bird';

import { likePhoto, requestPhotos } from '../../ducks/photos';

import BirdProfile from '../../components/Bird/BirdProfile';

class BirdProfileContainer extends Component {
	// componentDidMount() {
	// 	console.log(this.props);
	// 	if(this.props.photos.size === 1 && this.props.photos.get(0).get('created_at') === null) {		
	// 		console.log('we get the photos we need')
	// 		this.props.requestPhotos('sort=created_asc', this.props.birdInfo.get('_id'));
	// 	}
	// }

	// shouldComponentUpdate(nextProps, nextState) {
	// 	console.log('current', this.props);
	// 	console.log('next', nextProps);
	// 	return false;		

	// }

	// componentDidUpdate(){
	// 	console.log('component update')
	// }

	render() {
		const birdSlug = this.props.match.params.birdSlug;
		return (
			<div className="container">
			{this.props.birdInfo && this.props.photos ? (
				<BirdProfile 
					birdSlug={birdSlug}
					birdInfo={this.props.birdInfo} 
					photos={this.props.photos} 
					user={this.props.user} 
					likeHandler={this.props.likePhoto}
					deleteBird={this.props.deleteBird}
				/>
			) : (
				<NotFound />
			)
				
			}
				</div>
		)
	}
}

BirdProfileContainer.propTypes = {
  birdInfo: instanceOf(Immutable.Map),
  photos: instanceOf(Immutable.List).isRequired,
  user: instanceOf(Immutable.Map) 	
}

const mapStateToProps = (state, props) => {
	return {
		birdInfo: state.get('bird').filter(birdInfo => birdInfo.get('slug') === props.match.params.birdSlug).get(0),
		photos: state.get('photos').filter(photoInfo => photoInfo.get('birdSlug') === props.match.params.birdSlug),
		user: state.getIn(['auth', 'user'])
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    createBird: (bird) => dispatch(createBird(bird)),
    updateBird: (bird) => dispatch(updateBird(bird)),
    deleteBird: (_id) => dispatch(deleteBird(_id)),
		likePhoto: (photo) => dispatch(likePhoto(photo)),
		requestPhotos: (query, id) => dispatch(requestPhotos(query, id))
  }; // here we're mapping actions to props	
}

export default connect(mapStateToProps, mapDispatchToProps)(BirdProfileContainer);