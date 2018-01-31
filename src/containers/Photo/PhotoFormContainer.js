import React, { Component } from 'react';
import { instanceOf, func, object, bool } from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import Loader from '../../img/Ellipsis.svg';

import {
    createPhoto
} from '../../ducks/photos';

import PhotoForm from '../../components/Photo/PhotoForm';

class PhotoFormContainer extends Component {
    render() {
    const { createPhoto, location, bird, loading } = this.props;
    //const last = this.props.photos.get(-1);
    //const uploading = (last.uploading) ? true : false;
    return(
      <div className="container">
        {loading ? (
          <div className="loader" >
            <h2 className="loader__heading">Uploading Image</h2>
            <img src={Loader}/>
          </div>        
        ) : (
          <PhotoForm 
              createPhoto={createPhoto}
              bird={bird}
              //handleChange={this.handleChange}
          />
          )}
      </div>                     
    	)
    }	
}

PhotoFormContainer.propTypes = {
  createPhoto: func.isRequired,
  photos: instanceOf(Immutable.List).isRequired, // do we need this?
  loading: bool.isRequired,
}

const mapDispatchToProps = (dispatch) => {
	return{
    createPhoto: (photo) => dispatch(createPhoto(photo)),		
	}
}

const mapStateToProps = (state) => {
	return {
        photos: state.get('photos'),
        bird: state.get('bird'),
        loading: state.getIn(['loading', 'currentState']),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoFormContainer);