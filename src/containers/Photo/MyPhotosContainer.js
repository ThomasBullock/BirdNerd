import React, { Component } from 'react';
import { connect } from 'react-redux';
import MyPhotos from '../../components/Photo/MyPhotos';

import {
    requestMyPhotos
} from '../../ducks/myPhotos';



class MyPhotosContainer extends Component {
	constructor(props) {
		super(props)
	}
	
  componentDidMount() {
      console.log('mounted and requesting photos')
      this.props.requestMyPhotos();
  }	

  render() {
    const myPhotos = (this.props.myPhotos.get('1')) ? this.props.myPhotos.get('1') : null;
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
	   myPhotos: state.get('myPhotos'),
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
        requestMyPhotos: () => dispatch(requestMyPhotos())  		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPhotosContainer);