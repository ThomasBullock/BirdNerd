import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  requestBirdList,
} from '../../ducks/birdList';

import BirdList from '../../components/Bird/BirdList';

class BirdListContainer extends Component {
	
	componentDidMount() {
		this.props.requestBirdList();
	}
	
	render() {
		const birdList = (this.props.birdList.get('1')) ? this.props.birdList.get('1') : null;

		return(
			<div>
			{birdList ? (
					<BirdList birdList={birdList}/>
				) : (
					<h2>Loading</h2>
				)
			}
			</div>
			
		)		
	}
	
}

const mapStateToProps = (state) => {
	return {
		birdList: state.get('birdList')
	}
}

const mapDispatchtoProps = (dispatch) => {
	return {
		requestBirdList: () => dispatch(requestBirdList())
	}
}

export default connect(mapStateToProps, mapDispatchtoProps)(BirdListContainer)
