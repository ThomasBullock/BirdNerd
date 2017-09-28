import React, { Component } from 'react';
import { connect } from 'react-redux';
import { birdGroups } from '../../clientHelpers';

import {
  requestBirdList,
} from '../../ducks/birdList';

import BirdList from '../../components/Bird/BirdList';

class BirdListContainer extends Component {
	constructor(props) {
		super(props)
		
		this.buildBirdList = this.buildBirdList.bind(this);
	}
	
	componentDidMount() {
		this.props.requestBirdList();
	}
	
	buildBirdList(birds) {
		
		// console.log(birdGroups);
		const groups = {};
		for (var prop in birdGroups) {
			// console.log(prop)
			groups[prop] = [];
		}
		
		birds.map( (bird) => {
			const order = bird.order;
			if(groups[`${bird.order}`]) {
				groups[`${bird.order}`].push(bird);				
			}
		})
		console.log(groups);
		return groups;
	}
	
	render() {
		const birdList = (this.props.birdList.get('1')) ? this.buildBirdList(this.props.birdList.get('1')) : null;
		// if(birdList) {
		// 	this.buildBirdList(birdList);	
		// }
		console.log(birdList)
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
