import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyPhotos from '../../components/Photo/MyPhotos';

class MyPhotosContainer extends Component {
  render() {
    const { photos } = this.props;
  	return(
      <div >
  		  {photos ? (<MyPhotos photos={photos}/>) : (
          <h2>Loading</h2>
        )}
      </div>
  	)
  }
}

const mapStateToProps = (state) => {
  console.log(state.getIn(['auth', 'user']))
	return {
     // state.get('photos').filter(photoInfo => photoInfo.get('birdSlug') === props.match.params.birdSlug)

	   photos: state.get('photos').filter(photoInfo => photoInfo.get('user') === state.getIn(['auth', 'user']) ),
	}
}

export default connect(mapStateToProps)(MyPhotosContainer);