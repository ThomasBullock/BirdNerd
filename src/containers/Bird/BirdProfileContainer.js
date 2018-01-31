import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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

import { likePhoto } from '../../ducks/photos';

import BirdProfile from '../../components/Bird/BirdProfile';

class BirdProfileContainer extends Component {
	componentWillMount() {
		console.log('componentWillMount')
		console.log(this.props);
		
		// if(!this.props.birdInfo) {
		// 	store.dispatch(requestBirdList());
		// }
	}
	
	componentDidMount() {
		console.log('componentDidMount')
		console.log(this.props);		
	}
	
	
	componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps')
		console.log(nextProps)
	}
	
	render() {
		console.log('this.props.birdInfo in render ==== ' + this.props.birdInfo)
		const birdSlug = this.props.match.params.birdSlug;
		return (
			<div className="container">
			{this.props.birdInfo && this.props.photos ? (
				<BirdProfile 
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

const mapStateToProps = (state, props) => {
	return {
		birdInfo: state.get('bird').filter(birdInfo => birdInfo.get('slug') === props.match.params.birdSlug).get(0),
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