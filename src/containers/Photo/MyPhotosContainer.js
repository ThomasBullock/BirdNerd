import React, { Component } from 'react';
import { instanceOf, func, object } from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import MyPhotos from '../../components/Photo/MyPhotos';
import { likePhoto } from '../../ducks/photos';
import { requestUsers } from '../../ducks/users';

class MyPhotosContainer extends Component {
  componentWillMount() {
    if(this.props.birdNerds.size === 0) {
      this.props.requestUsers();      
    }
  }

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
    user: state.getIn(['auth', 'user']),
    birdNerds: state.get('users'),
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    likePhoto: (photo) => dispatch(likePhoto(photo)),
    requestUsers: () => dispatch(requestUsers()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPhotosContainer);