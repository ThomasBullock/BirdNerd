import React, { Component } from 'react';
import { func, bool, string, object } from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import Reset from '../../components/Auth/Reset';
import Message from '../../components/Message';

import { resetPasswordRequest, changePassword } from '../../ducks/auth';

class ResetPasswordContainer extends Component {
	constructor(props) {
		super(props)
	}
	
	componentDidMount() {
		const token = this.props.match.params.token
		this.props.resetPassword(token)
	}
	
	
	render() {
		const { changePassword, user } = this.props;
		
		let content = null;
		if(this.props.authenticated && this.props.message === '') {
			content = <Reset changePassword={changePassword} user={user} />;
			// content = <Message text="Your Password has been succesfully updated"/>
		} else if (this.props.authenticated && this.props.message === 'Password succesfully updated') {
			console.log('password updated we are going to prompt')
			content = <Message heading="Password updated" text="Your Password has been succesfully updated" link='/login' label='Return to login'/>
		}
		
		return(
			<div className="container">
				{content}
			{/*	{ this.props.authenticated && 
									<Reset changePassword={changePassword} user={user} />
				}  */}

			
			</div>
		)
	}
} 

ResetPasswordContainer.propTypes = {
  authenticated: bool.isRequired,
  message: string,
  user: object.isRequired,
  resetPassword: func.isRequired,
  changePassword: func.isRequired
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
 		message: state.getIn(['auth', 'message']),
 		user: state.getIn(['auth', 'user'])
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer)