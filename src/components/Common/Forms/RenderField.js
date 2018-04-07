import React from 'react';

const RenderField = ({ input, textarea, label, type, className, placeholder, meta: { touched, error } }) => {
  const textareaType = <textarea {...input} type={type} placeholder={label}  />;
  const inputType = <input {...input} placeholder={placeholder || label} type={type} />;
  return (
    <div className={className}>
      <div className="form__label"> 
        <label>{label}</label>
        {touched &&
        ((error && <span>{error}</span>))}        
      </div>  
      <div>
        {textarea ? textareaType : inputType}

      </div>
    </div>
  );
};

export default RenderField;