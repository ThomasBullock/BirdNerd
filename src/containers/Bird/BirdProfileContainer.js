import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  requestBird,
  createBird,
  updateBird,
  removeBird
} from '../../ducks/bird';

import BirdProfile from '../../components/Bird/BirdProfile';

class BirdProfileContainer extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			mounted: null
		}
	}
	
	componentDidMount() {
		const slug = this.props.match.params.birdSlug;
		this.props.requestBird(slug);
		this.setState({
			mounted: true
		})			
	}
	
	render() {
		
		const birdInfo = (this.state.mounted) ? this.props.bird.get('1') : null;
		return (
			<div>
			{birdInfo ? (
				<BirdProfile birdInfo={birdInfo}/>
			) :  (
				<h2>Loading</h2>
			)
				
			}
				</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		bird: state.get('bird')
	}
}

const mapDispatchToProps = (dispatch) => {
	// console.log(dispatch);
  return {
    requestBird: (bird) => dispatch(requestBird(bird)),
    createBird: (bird) => dispatch(createBird(bird)),
    updateBird: (bird) => dispatch(updateBird(bird)),
    removeBird: (bird) => dispatch(removeBird(bird))
  }; // here we're mapping actions to props	
}

export default connect(mapStateToProps, mapDispatchToProps)(BirdProfileContainer);