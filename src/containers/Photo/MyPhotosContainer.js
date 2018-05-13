import React, { Component } from 'react';
import { instanceOf, func, object } from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import MyPhotos from '../../components/Photo/MyPhotos';
import { likePhoto, sortNewest, sortOldest, sortPopular } from '../../ducks/photos';
import { requestUsers } from '../../ducks/users';

class MyPhotosContainer extends Component {
  componentWillMount() {
    if(this.props.birdNerds.size === 0) {
      this.props.requestUsers();      
    }
  }

  handleSort = (sort) => {
    switch(sort) {
      case 'Newest': 
        this.props.sortNewest();
        break;
      case 'Oldest':
        this.props.sortOldest();
        break;
      case 'Popular': 
        this.props.sortPopular();
        break;       
      default:
        this.props.sortNewest();
    }
  }

  render() {
    const { photos, loading, photosPerPage, feedPage } = this.props;
    const skip = photosPerPage * feedPage;
    const myPhotos = Immutable.fromJS([...photos.slice( skip, (skip + photosPerPage) )]);
  	return(
      <div>
  		  <MyPhotos photos={myPhotos} user={this.props.user} likeHandler={this.props.likePhoto} sort={this.handleSort} totalPhotos={this.props.photos.size}/>
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
	  photos: state.get('photos').filter(photoInfo => photoInfo.getIn(['user', '_id']) === state.getIn(['auth', 'user', '_id']) ),
    user: state.getIn(['auth', 'user']),
    birdNerds: state.get('users'),
    feedPage: state.getIn(['ui', 'myPhotosPage']),
    photosPerPage: state.getIn(['ui', 'photosPerPage']),
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
    likePhoto: (photo) => dispatch(likePhoto(photo)),
    sortNewest: () => dispatch(sortNewest()),
    sortOldest: () => dispatch(sortOldest()),
    sortPopular: () => dispatch(sortPopular()),    
    requestUsers: () => dispatch(requestUsers()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPhotosContainer);