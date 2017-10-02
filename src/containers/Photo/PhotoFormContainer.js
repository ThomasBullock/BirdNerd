import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    uploadPhoto
} from '../../ducks/photos';
import {
    requestBirdList
} from '../../ducks/bird';

import PhotoForm from '../../components/Photo/PhotoForm';

class PhotoFormContainer extends Component {
    constructor(props) {
        super(props);
        
        
        // this.handleChange = this.handleChange.bind(this);
    }
    
    // handleChange(value) {
    //     console.log('change in container!');
    //     this.setState({
    //         location: value
    //     })
    // }
    
    componentDidMount() {
        this.props.requestBirdList();
    }
    
    render() {
        const birdList = this.props.birdList.last();
        console.log(this.props)
        const { uploadPhoto, location } = this.props;
        console.log(uploadPhoto);
    	return(
    		<PhotoForm 
                uploadPhoto={uploadPhoto}
                birdList={birdList}
                handleChange={this.handleChange}
            />
    	)
    }	
}

const mapStateToProps = (state) => {
    console.log(state)
	return {
	   photo: state.get('photo'),
       birdList: state.get('birdList')
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
        uploadPhoto: (photo) => dispatch(uploadPhoto(photo)),
        requestBirdList: () => dispatch(requestBirdList())  		
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoFormContainer);