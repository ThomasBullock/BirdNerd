import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import Dropzone from 'react-dropzone';
import { birdGroups } from '../../clientHelpers';
import { conservationStatus } from '../../clientHelpers';

const FILE_FIELD_NAME = 'files';

const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
  const errors = {}
  if (!values.get('name')) {
    errors.name = 'Required'
  } else if (values.get('name').length > 60) {
    errors.name = 'Must be 60 characters or less'
  }
  if (!values.get('species')) {
    errors.species = 'Required'
  } else if (values.get('species').length > 60) {
    errors.species = '60 characters or less'
  }
  if(!values.get('order')) {
    errors.order = 'Required';
  }
  if(!values.get('files')) {
    errors.files = 'Required';
  }
  if(!values.get('username')) {
    errors.username = 'Required';
  }  
  return errors
}

const mySelectOptions = [
  {label: '', value: '' },
	{ label: 'Business', value: 'Business' },
	{ label: 'Individual', value: 'Individual' },
];

const birdGroupsOptions = (birdsGroups) => {
  return Object.keys(birdsGroups).map( (group, i) => {
    return(
      <option key={i} value={group}>{birdsGroups[group]} (Order {group})</option>
    )
  })
}

const conservationOptions = () => {
  return conservationStatus.map( (item, i)  => {
    return(
      <option value={item} key={i}>{item}</option>
    )
  })
}

const renderField = ({ input, textarea, label, type, className, meta: { touched, error } }) => {
  const textareaType = <textarea {...input} type={type} placeholder={label}  />;
  const inputType = <input {...input} placeholder={label} type={type} />;
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

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    <div>
      <div className="form__label">
        <label>Image File</label>{field.meta.touched && field.meta.error && <span style={{color: '#e82c75' }}>{field.meta.error}</span> }
      </div>  
        <Dropzone
          name={field.name}
          multiple={false}
          onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
        >

        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
}

const UpdateBirdForm = ({ handleSubmit, createBird, bird , initialValues}) => {
  console.log(initialValues)
  const orderOptions = birdGroupsOptions(birdGroups);
  const name = bird && bird.get('name') || '';
  return (
    <div>
      <form className="form" onSubmit={handleSubmit((vals) => createBird(vals))}>
        <div className="form__title">
          <h2>Edit {name}</h2>
        </div>  

        <Field name="name" component={renderField} type="text" placeholder="Name" label="Name" className="form__input--half" />
        <Field name="species" component={renderField} type="text" placeholder="Species" label="Species" className="form__input--half" />

       { /* <Field name="username" component={renderSelectField} label="Username">
          { mySelectOptions.map(option => <option value={option.value}>{option.label}</option>) }
        </Field> */}
        <Field name="order" component={renderSelectField} type="select" placeholder="" label="Bird Group (Order)" className="form__input--half" children={orderOptions} />

            <Field 
              name="conservationStatus" 
              component={renderSelectField} 
              type="select" placeholder="" label="Conservation Status"
              className="form__input--half" 
              children={conservationOptions()}
            />
            {/*
        <div className="form__input--half">
          <label>Conservation Status</label>
          <div>
            <Field name="conservationStatus" component="select" >
              <option />
              <option value="Least Concern">Least Concern</option>
              <option value="Conservation Dependent">Conservation Dependent</option>
              <option value="Near Threatened">Near Threatened</option>
              <option value="Vulnerable">Vulnerable</option>
              <option value="Endangered">Endangered</option>
              <option value="Critically Endangered">Critically Endangered</option>
              <option value="Extinct in the Wild">Extinct in the Wild</option>                                   
            </Field>
          </div>
        </div> */}

        <Field name="location" component={renderField} type="text" placeholder="Seperate multiple locations with comma" label="Locations" className="form__input" />

        <div className="form__input form__input--comments">
          <label>Comments</label>
          <div>
            <Field
              name="comments"
              component="textarea"
              type="text"
              placeholder="Infomation about this bird"
              rows="6"
            />
          </div>
        </div>        
        <div className="form__dropzone">
          <Field
              className="form__dropzone-box"
              name={FILE_FIELD_NAME}
              component={renderDropzoneInput}
          />
        </div>
        <div className="form__submit">
          <button type="submit">
            Submit
          </button>
        </div> 
      </form>
    </div>  
  )
}


export default reduxForm({
    form: 'updatebirdForm',
    validate,
})(UpdateBirdForm);
