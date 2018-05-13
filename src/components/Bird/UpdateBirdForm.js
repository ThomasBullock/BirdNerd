import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import Dropzone from 'react-dropzone';
import { birdGroups, birdFamilies } from '../../clientHelpers';
import RenderField from '../Common/Forms/RenderField';
import RangeSlider from '../Common/Forms/RangeSlider';
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

const birdFamilyOptions = (order) => {
  console.log(birdFamilies);
  const familyArray = birdFamilies[order];
  console.log(familyArray);
  if(familyArray) {
    return familyArray.map( (family, i) => {
      return (
        <option key={i} value={family}>{family}</option>
      )
    })
  } else {
    return null;
  }

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
        <label>Image File (leave blank to keep existing image)</label>{field.meta.touched && field.meta.error && <span style={{color: '#e82c75' }}>{field.meta.error}</span> }
      </div>  
        <Dropzone
          name={field.name}
          multiple={false}
          onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
        >

        <div>Try dropping some files here, or click to select files to upload. </div>
      </Dropzone>
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
}

let UpdateBirdForm = ({ handleSubmit, updateBird, bird, initialValues, hasOrder}) => {
  const orderOptions = birdGroupsOptions(birdGroups);
  const familyOptions = birdFamilyOptions(hasOrder);
  const name = bird && bird.get('name') || '';
  const birdId = bird && bird.get('_id');
  return (
    <div>
      <form className="form" onSubmit={handleSubmit((vals) => updateBird(vals, birdId))}>
        <div className="form__title">
          <h2>Edit {name}</h2>
        </div>  

        <Field name="name" component={renderField} type="text" placeholder="Name" label="Name" className="form__input--half" />
        <Field name="species" component={renderField} type="text" placeholder="Species" label="Species" className="form__input--half" />
        <Field name="order" component={renderSelectField} type="select" placeholder="" label="Bird Group (Order)" className="form__input--half" children={orderOptions} />
        <Field name="family" component={renderSelectField} type="select" placeholder="" label="Bird Family" className="form__input--half" children={familyOptions} />
        <div className="form__dual-slider">
          <label className="form__dual-slider-label">Adult Wingspan range (cm)</label>
          <div className="form__dual-slider-container">
            <Field 
              name="wingspan-min" component={RangeSlider}     
              type="range" label="Wingspan Min" className="form__range form__range---min" />
            <Field 
              name="wingspan-max" component={RangeSlider}     
            type="range" label="Wingspan Max" className="form__range form__range--max" />
           </div>
        </div>  
            <Field 
              name="conservationStatus" 
              component={renderSelectField} 
              type="select" placeholder="" label="Conservation Status"
              className="form__input--half" 
              children={conservationOptions()}
            />
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
            Save Changes
          </button>
        </div> 
      </form>
    </div>  
  )
}


UpdateBirdForm =  reduxForm({
    form: 'updatebirdForm',
    validate,
})(UpdateBirdForm);

// const selector = formValueSelector('updatebirdForm')
// You have to connect() to any reducers that you wish to connect to yourself
UpdateBirdForm = connect(
  state => {
    // console.log(state)
    // can select values individually
    // console.log(selector)
    const hasOrder = state.getIn(['form', 'updatebirdForm', 'values', 'order'])// selector(state, 'order')
    // const hasFamily = selector(state, 'family')
    // console.log(hasOrder);
    return {
      hasOrder,
      // initialValues: state.get('groups'), // pull initial values from account reducer
      enableReinitialize: true,      
    }
  }  
)(UpdateBirdForm)

export default UpdateBirdForm;
