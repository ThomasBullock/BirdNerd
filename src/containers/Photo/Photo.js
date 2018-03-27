import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';

import { instanceOf, func, bool } from 'prop-types';

import { PhotoMap } from '../../components/Common/GoogleMap';
import NotFound from '../../components/NotFound';
import PhotoStatsBar from '../../components/Photo/PhotoStatsBar'; 
import PhotoUserBar from '../../components/Photo/PhotoUserBar';   

import {
  likePhoto,
  deletePhoto
} from '../../ducks/photos';

const userPermission = (user, photo) => {
	if(user && user.get('role') === 'moderator') {
		return true;
	} else if (user && photo.getIn(['user', '_id']) === user.get('_id')) {
		return true;
	} else {
		return false;
	}
}

class Photo extends Component {
	static contextTypes = {
	  router: PropTypes.shape({
	    history: PropTypes.shape({
	      push: PropTypes.func.isRequired,
	      replace: PropTypes.func.isRequired
	    }).isRequired,
	    staticContext: PropTypes.object
	  }).isRequired
	};	
	
	render(){
		const styles = {
			wrapper: {
				background: `url('${this.props.photo && this.props.photo.get('imageUrl')}')`,								
			}

			
		}
		return(
			<div className="photo">
				{this.props.photo ? (
				<div>	
					<div className="photo__image-wrapper">
						<img src={this.props.photo.get('imageUrl')} style={styles.image} className="photo__image" alt={this.props.photo.get('birdName')}/>
						<div className="photo__image-background" style={styles.wrapper}></div>
					</div>
					<PhotoUserBar 
						user={this.props.user}
						photoUser={this.props.photo.get('user')}
						birdName={this.props.photo.get('birdName')}						
						uploadDate={this.props.photo.get('created_at')}
						id={this.props.photo.get('public_id')}
						slug={this.props.photo.get('birdSlug')}
						owner={userPermission(this.props.user, this.props.photo)}						
						deleteHandler={this.props.deletePhoto}			
					/>
					<PhotoStatsBar
						id={this.props.photo.get('_id')}
						birdName={this.props.photo.get('birdName')}
						likes={this.props.photo.get('likes').size}
						comments={this.props.photo.get('comments')} 
						slug={this.props.photo.get('birdSlug')}
						likeHandler={this.props.likePhoto}
						user={this.props.photo.get('user')}
						location={this.props.photo.get('location')}															
					/>
					<PhotoMap location={this.props.photo.get('location')}/>
				</div>) : 
				(
					<NotFound />
				)				
				}

			</div>
		)
	}
}

Photo.propTypes = {
	photo: instanceOf(Immutable.Map).isRequired
}

const mapStateToProps = (state, props) => {
	return {
		photo: state.get('photos').filter( (photo) => photo.get('_id') === props.match.params.id).get(0),
		// birdData: state.get('birds').filter( (bird) => bird.get('_id')) need tp restructure url to give bird slug
		user: state.getIn(['auth', 'user'])		
	}
}

const mapDispatchToProps = (dispatch) => {
	// console.log(dispatch);
  return {
    deletePhoto: (_id) => dispatch(deletePhoto(_id)),
    likePhoto: (photo) => dispatch(likePhoto(photo))
  }; // here we're mapping actions to props	
}



export default connect(mapStateToProps, mapDispatchToProps)(Photo);