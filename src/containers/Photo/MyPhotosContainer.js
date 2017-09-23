import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyPhotos from '../../components/Photo/MyPhotos';

import {
    requestPhotos
} from '../../ducks/photos';



class MyPhotosContainer extends Component {
	constructor(props) {
		super(props)
	}
	
  componentDidMount() {
      this.props.requestPhotos('user');
  }	

  render() {
    const myPhotos = (this.props.photos.get('1')) ? this.props.photos.get('1') : null;
    console.log(myPhotos); 
  	return(
      <div >
  		  {myPhotos ? (<MyPhotos myPhotos={myPhotos}/>) : (
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

const mapDispatchToProps = (dispatch) => {
	return{
        requestPhotos: (query) => dispatch(requestPhotos(query))  		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPhotosContainer);