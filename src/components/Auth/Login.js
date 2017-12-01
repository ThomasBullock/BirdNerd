// import { Field, reduxForm, SubmissionError } from 'redux-form/immutable';

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

// function submit(values) {
//   return sleep(1000).then(() => {
//     // simulate server latency
//     if (!['john', 'paul', 'george', 'ringo'].includes(values.username)) {
//       throw new SubmissionError({
//         username: 'User does not exist',
//         _error: 'Login failed!'
//       })
//     } else if (values.password !== 'redux-form') {
//       throw new SubmissionError({
//         password: 'Wrong password',
//         _error: 'Login failed!'
//       })
//     } else {
//       window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
//     }
//   })
// }

// export default submit

import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { Link } from 'react-router-dom';

import { loginRequest } from '../../ducks/auth';

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

let Login = props => {
  const { error, handleSubmit, pristine, reset, submitting, login } = props
  return (
    <div className="container">
    <form className="form" onSubmit={handleSubmit((vals) => login(vals))}>
      <div className="form__title">
        <h2>Welcome Back!</h2>
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
          Log In
        </button>
      </div>
    </form>
      <div className="form__reset-panel">
        <p>Forgotten your password? <Link to='/forgot'>Reset your password.</Link></p>
      </div>
    </div>
  )
}

Login = reduxForm({
  form: 'login' // a unique identifier for this form
})(Login);

const mapStateToProps = state => ({ error: state.getIn(['auth', 'error']) });

const mapDispatchToProps = dispatch => ({
    login: (user) => dispatch(loginRequest(user.toJS()))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);