import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';

const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
    const errors = {};
  if (!values.get('password')) {
    errors.password = 'Required'; 
  }
  if(!values.get('confirm_password')) {
    errors.confirm_password = 'Required'
  }
  if(values.get('password') !== values.get('confirm_password')) {
  	errors.confirm_password = 'Passwords must match!'
  } 
  return errors;
}    

let Reset = ( { handleSubmit, changePassword, user } ) => {
	return(
		<div>
			<form className="form" onSubmit={handleSubmit((vals) => changePassword(vals, user))} >
	      <div className="form__input"> 
	        <label>New Password</label>       
	        <Field
	          name="password"
	          type="password"
	          component="input"
	          label="Password"
	        />
	      </div>
	      <div className="form__input">
	        <label>Confirm Password</label>         
	        <Field
	          name="confirm_password"
	          type="password"
	          component="input"
	          label="Confirm Password"
	        />
	      </div>
        <div className="form__submit">
          <button type="submit">
          	Save Password
          </button>
        </div> 	        	        				
			</form>
		</div>		
	)
}

export default reduxForm({
	form: 'changePassword',
	validate
})(Reset);