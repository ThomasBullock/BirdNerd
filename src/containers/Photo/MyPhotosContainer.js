import React, { Component } from 'react';
import { instanceOf, func, object } from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import MyPhotos from '../../components/Photo/MyPhotos';
import { likePhoto } from '../../ducks/photos';

class MyPhotosContainer extends Component {
  render() {
    const { photos } = this.props;
  	return(
      <div>
  		  <MyPhotos photos={photos} user={this.props.user} likeHandler={this.props.likePhoto}/>
      </div>
  	)
  }
}

MyPhotosContainer.propTypes = {
  photos: instanceOf(Immutable.List).isRequired,
  user: object,
  likePhoto: func.isRequired
}

const mapStateToProps = (state) => {
	return {
    // state.get('photos').filter(photoInfo => photoInfo.get('birdSlug') === props.match.params.birdSlug)

	  photos: state.get('photos').filter(photoInfo => photoInfo.getIn(['user', '_id']) === state.getIn(['auth', 'user', '_id']) ),
    user: state.getIn(['auth', 'user'])
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    likePhoto: (photo) => dispatch(likePhoto(photo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPhotosContainer);