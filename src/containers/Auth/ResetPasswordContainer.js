import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import Reset from '../../components/Auth/Reset';

import { resetPasswordRequest, changePassword } from '../../ducks/auth';

class ResetPasswordContainer extends Component {
	constructor(props) {
		super(props)
	}
	
	componentDidMount() {
		const token = this.props.match.params.token
		// console.log(token)
		this.props.resetPassword(token)
		console.log(this.props)
	}
	
	render() {
		const { changePassword, user } = this.props;
		return(
			<div>
				{ this.props.authenticated && 
									<Reset changePassword={changePassword} user={user} />
				}

			
			</div>
		)
	}
} 

const mapDispatchToProps = (dispatch) => {

	return {
		resetPassword: (token) => dispatch(resetPasswordRequest(token)),
		changePassword: (password, user) => dispatch(changePassword(password, user))		
	}

}

const mapStateToProps = (state) => {
	return {
 		authenticated: state.getIn(['auth', 'authenticated']),
 		user: state.getIn(['auth', 'user'])
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer)