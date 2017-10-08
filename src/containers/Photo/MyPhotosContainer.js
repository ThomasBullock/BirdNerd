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
	return {
	   photos: state.get('photos'),
	}
}

export default connect(mapStateToProps)(MyPhotosContainer);