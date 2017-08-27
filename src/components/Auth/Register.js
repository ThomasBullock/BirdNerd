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
    <form onSubmit={handleSubmit((vals) => register(vals))}>
      <Field
        name="email"
        type="email"
        component={renderField}
        label="Email"
      />
      <Field
        name="firstName"
        type="text"
        component={renderField}
        label="First Name"
      />
      <Field
        name="lastName"
        type="text"
        component={renderField}
        label="Last Name"
      />
      <Field
        name="password"
        type="password"
        component={renderField}
        label="Password"
      />
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