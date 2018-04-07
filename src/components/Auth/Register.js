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
  } else if (values.get('firstName').length > 30) {
    errors.firstName = '30 characters or less'
  } 
  if (!values.get('lastName')) {
    errors.lastName = 'Required'
  } else if (values.get('lastName').length > 30) {
    errors.lastName = '30 characters or less'
  }       
  if (!values.get('userName')) {
    errors.userName = 'Required'
  } else if (values.get('userName') && values.get('userName').length < 4) {
    errors.userName = 'userName too short'
  } else if (values.get('userName') && values.get('userName').length > 30) {
    errors.userName = 'userName too long'
  }     

  if (!values.get('country')) {
    errors.country = 'Required'
  }      
  if (!values.get('email')) {
    errors.email = 'Required'
  }         
  if (!values.get('password')) {
    errors.password = 'Required'
  } else if (values.get('password') && values.get('password').length < 8) {
    errors.password = 'Password too short'
  } else if (values.get('password') && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g.test(values.get('password')) ) {
    errors.password = 'Must contain at least one uppercase letter, one lowercase letter and one number'
  }   

  return errors;
}

const countryOptions = () => {
    return(
      <Fragment>
        <option value="Australia" key={0}>Australia</option>
        <option value="Canada" key={1}>Canada</option>         
        <option value="India" key={2}>India</option>
        <option value="New Zealand" key={3}>New Zealand</option>                
        <option value="United Kingdom" key={4}>United Kingdom</option>
        <option value="United States" key={5}>United States</option>
        <option value="Other" key={6}>Other</option>             
      </Fragment>
    )
}

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
            component={RenderField}
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