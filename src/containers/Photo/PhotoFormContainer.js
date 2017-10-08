import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    uploadPhoto
} from '../../ducks/photos';

import PhotoForm from '../../components/Photo/PhotoForm';

class PhotoFormContainer extends Component {
    render() {
        //const birdList = this.props.birdList.last();
        const { uploadPhoto, location, bird } = this.props;

    	return(
    		<PhotoForm 
                uploadPhoto={uploadPhoto}
                bird={bird}
                //handleChange={this.handleChange}
            />
    	)
    }	
}

const mapDispatchToProps = (dispatch) => {
	return{
        uploadPhoto: (photo) => dispatch(uploadPhoto(photo)),		
	}
}

const mapStateToProps = (state) => {
	return {
	   photo: state.get('photo'),
       bird: state.get('bird'),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoFormContainer);