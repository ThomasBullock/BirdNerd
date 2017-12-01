import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import { forgotPasswordRequest } from '../../ducks/auth';
import Message from '../Message';

const renderField = ({ input, label, type, meta: { touched, error } }) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        error &&
        <span>
          {error}
        </span>}
    </div>
  </div>

let Forgot = props => {
  const { error, handleSubmit, pristine, reset, submitting, forgotPassword, message, submitSucceeded } = props
  if(submitSucceeded && message ==='password reset email sent') {
    return(
      <div className="container">
        <Message heading="Email Sent" text="A reset link has been sent to your email address" />
      </div>  
    )
  } else {
    return(
      <div className="container">
        <form className="form" onSubmit={handleSubmit((vals) => forgotPassword(vals))}>
          <div className="form__input">
            <Field
              name="email"
              type="email"
              component={renderField}
              label="Email"
            />
          </div>
          {error &&
            <strong>
              {error}
            </strong>}
          <div>
            <button type="submit" disabled={submitting}>
              Reset Password
            </button>
          </div>          
        </form>
      </div>
    )     
  }

}

Forgot = reduxForm({
  form: 'resetPassword' // a unique identifier for this form
})(Forgot);




const mapStateToProps = state => ({ 
  error: state.getIn(['auth', 'error']),
  message: state.getIn(['auth', 'message']) 
});

const mapDispatchToProps = dispatch => ({
    forgotPassword: (user) => dispatch(forgotPasswordRequest(user.toJS()))
});

export default connect(mapStateToProps, mapDispatchToProps)(Forgot);