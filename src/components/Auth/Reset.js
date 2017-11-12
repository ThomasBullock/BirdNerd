import React from 'react';

import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';

// const renderField = ({ input, label, type, meta: { touched, error } }) =>
//   <div>
//     <label>
//       {label}
//     </label>
//     <div>
//       <input {...input} placeholder={label} type={type} />
//       {touched &&
//         error &&
//         <span>
//           {error}
//         </span>}
//     </div>
//   </div>
  

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
	form: 'changePassword'
})(Reset);