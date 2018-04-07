import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import { connect } from 'react-redux';

import Immutable from 'immutable';

class UserListComponent extends Component {
	constructor(props){
		super(props)
	}

	renderLikers() {
		// need to create list of likers to iterate through with You(user) put at begining of list!

		// console.log('in render likers')
		// console.log(this.props.user.get('_id'));
		// console.log(this.props.likers);
		let text = '';
		if(this.props.likers.size === 0) {
			return(
				<span>Click the button to like this photo</span>
			)
		}
		if(this.props.likers.includes(this.props.user.get('_id'))) {
			text += `You `
		}
		this.props.likers.map( (item, i, array ) => {
			if(this.props.user.get('_id') !== item && i !== array.size - 1) {
				// console.log(`${i} still less than ${array.size}`)
				text += `${this.props.birdNerds.getIn([item, 'profile', 'userName'])} `
			} else if (i === array.size - 1) {
				// console.log(`${i} end` );
				// if(this.props.user.get('_id') !== item) {
					if(this.props.likers.size > 1) {
						text += ` and`;
					}
					text += ` ${(this.props.user.get('_id') !== item) ? this.props.birdNerds.getIn([item, 'profile', 'userName']) : ''} `					
				// }			

			}
		})

		text += `like${(this.props.likers.size === 1 && !this.props.likers.includes(this.props.user.get('_id'))) ? 's': ''} this photo`
		return(
			<span>{text}</span>
		)		
	}

	render() {
		return(
			<span className="stats-bar__text">
				{this.renderLikers()}
			</span>
		)
	}
}

UserListComponent.propTypes = {
	user: instanceOf(Immutable.Map),
	likers: instanceOf(Immutable.List).isRequired,

}

const mapStateToProps = (state) => {
	return {
			user: state.getIn(['auth', 'user']),
			birdNerds: state.get('users'),

	}
}

export default connect(mapStateToProps)(UserListComponent);