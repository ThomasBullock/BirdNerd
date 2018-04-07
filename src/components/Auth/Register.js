import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import RenderField from '../Common/Forms/RenderField';
import {Helmet} from "react-helmet";

import { signUpRequest } from '../../ducks/auth';

const validate = (values) => {
  const errors = {};
  if (!values.get('firstName')) {
    errors.firstName = 'Required'
  }  
  if (!values.get('lastName')) {
    errors.lastName = 'Required'
  }    
  if (!values.get('userName')) {
    errors.userName = 'Required'
  }  
  return errors;
}

const countryOptions = () => {
    return(
      <Fragment>
        <option value="Australia" key={0}>Australia</option>
        <option value="United States" key={1}>United States</option>
        <option value="Canada" key={2}>Canada</option>      
      </Fragment>
    )
}

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

const renderSelectField = ({ input, label, type, className, meta: { touched, error }, children }) => (
  <div className={className}>
    <div className="form__label"> 
      <label>{label}</label>
      {touched && error && <span>{error}</span>}
    </div>      
    <div>
      <select {...input}>
        {children}
      </select>
    </div>
  </div>
)

let Register = props => {
  const { error, handleSubmit, pristine, reset, submitting, register } = props;
  return (
    <div className="container">
      <Helmet>
          <title>Register</title>
      </Helmet>
      <form className="form" onSubmit={handleSubmit((vals) => register(vals))}>
        <div className="form__title">
          <h2>Sign Up with BirdNerd</h2>
        </div>

        <Field
          className="form__input--half"
          name="firstName"
          type="text"
          component={RenderField}
          label="First Name"
        />

  
        <Field
          className="form__input--half"
          name="lastName"
          type="text"
          component={RenderField}
          label="Last Name"
        />

   
        <Field
          className="form__input--half"
          name="userName"
          type="text"
          component={RenderField}
          label="Username"
        />

        <div className="form__input--half">    
          <Field
            name="country"
            type="select"
            component={renderSelectField}
            label="Country"
            children={countryOptions()}
          />
        </div>                             

        <Field
          className="form__input"
          name="email"
          type="email"
          component={RenderField}
          label="Email"
        />
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
            Sign Up
          </button>
        </div>
      </form>
    </div>  
  )
}

Register = reduxForm({
  form: 'register', // a unique identifier for this form
  validate
})(Register);

const mapStateToProps = state => ({ error: state.getIn(['auth', 'error']) });

const mapDispatchToProps = dispatch => ({
    register: (user) => dispatch(signUpRequest(user.toJS()))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);