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
    <form onSubmit={handleSubmit((vals) => login(vals))}>
      <Field
        name="email"
        type="email"
        component={renderField}
        label="Email"
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
          Log In
        </button>
      </div>
    </form>
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