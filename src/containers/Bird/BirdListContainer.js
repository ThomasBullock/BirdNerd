import React, { Component } from 'react';
import { connect } from 'react-redux';
import { birdGroups } from '../../clientHelpers';

import {
  requestBirdList,
} from '../../ducks/bird';

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
		console.log(birds)
		
		birds.map( (bird) => {  // convert list/map to proper javascript :) !!!
			console.log(bird)
			const order = bird.get('order');
			if(groups[`${order}`]) {
				console.log(bird)
				groups[`${order}`].push(
					Array.from(bird).reduce((obj, [key, value]) => (
					  Object.assign(obj, { [key]: value }) // Be careful! Maps can have non-String keys; object literals can't.
					), {})
					)
								
			}
		})
		console.log(groups);
		return groups;
	}
	
	render() {
		console.log(this.props.birdList.size)
		//const birdList = (this.props.birdList.get('1')) ? this.buildBirdList(this.props.birdList.get('1')) : null;
		// if(birdList) {
		// 	this.buildBirdList(birdList);	
		// }
		console.log(this.props.birdList)
		return(
			<div>
			{this.props.birdList.size > 2 ? (
					<BirdList birdList={this.buildBirdList(this.props.birdList)}/>
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
		birdList: state.get('bird')
	}
}

const mapDispatchtoProps = (dispatch) => {
	return {
		requestBirdList: () => dispatch(requestBirdList())
	}
}

export default connect(mapStateToProps, mapDispatchtoProps)(BirdListContainer)
