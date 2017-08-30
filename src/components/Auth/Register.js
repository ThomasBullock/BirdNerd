import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import { signUpRequest } from '../../ducks/auth';

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

let Register = props => {
  const { error, handleSubmit, pristine, reset, submitting, register } = props;
  return (
    <form className="form" onSubmit={handleSubmit((vals) => register(vals))}>
      <div className="form__title">
        <h2>Register with BirdNerd</h2>
      </div>
      <div className="form__input--half">  
        <Field
          name="firstName"
          type="text"
          component={renderField}
          label="First Name"
        />
      </div>
      <div className="form__input--half">    
        <Field
          name="lastName"
          type="text"
          component={renderField}
          label="Last Name"
        />
      </div>          
      <div className="form__input">
        <Field
          name="email"
          type="email"
          component={renderField}
          label="Email"
        />
      </div>
      <div className="form__input">
        <Field
          name="password"
          type="password"
          component={renderField}
          label="Password"
        />
      </div>  
      {error &&
        <strong>
          {error}
        </strong>}
      <div>
        <button type="submit" disabled={submitting}>
          Register
        </button>
      </div>
    </form>
  )
}

Register = reduxForm({
  form: 'login' // a unique identifier for this form
})(Register);

const mapStateToProps = state => ({ error: state.getIn(['auth', 'error']) });

const mapDispatchToProps = dispatch => ({
    register: (user) => dispatch(signUpRequest(user.toJS()))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);