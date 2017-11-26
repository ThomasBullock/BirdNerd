import React, { Component } from 'react';
import { connect } from 'react-redux';
import { birdGroups } from '../../clientHelpers';

import BirdList from '../../components/Bird/BirdList';

class BirdListContainer extends Component {
	constructor(props) {
		super(props)
		this.buildBirdList = this.buildBirdList.bind(this);
	}
	
	buildBirdList(birds) {
		const groups = {};
		for (var prop in birdGroups) {
			groups[prop] = [];
		}
		
		birds.map( (bird) => {  // convert list/map to proper javascript :) !!!
			const order = bird.get('order');
			if(groups[`${order}`]) {
				// console.log(bird)
				groups[`${order}`].push(
					Array.from(bird).reduce((obj, [key, value]) => (
					  Object.assign(obj, { [key]: value }) // Be careful! Maps can have non-String keys; object literals can't.
					), {})
					)
								
			}
		});
		return groups;
	}
	
	render() {
		return(
			<div>
			{this.props.birdList.size > 0 ? (
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


export default connect(mapStateToProps)(BirdListContainer);
