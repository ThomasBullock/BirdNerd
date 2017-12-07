import React from 'react';

import { Field, reduxForm } from 'redux-form/immutable';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import PlaceField from './PlaceField';
import PlacesAutocomplete from 'react-places-autocomplete';

const FILE_FIELD_NAME = 'files';

const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
    const errors = {};
  if (!values.get('name')) {
    errors.name = 'Required'; 
  }
  if(!values.get('camera')) {
    errors.camera = 'Required'
  }
  if(!values.get('files')) {
    errors.location = 'Required'
  }   
  return errors;
}    

const notSure = () => {
  return(
    <option value='Unknown' key={-1}>Other or Not Sure</option>
  )
}

const birdSelect = (bird) => {
  let options = bird && bird.map( (item, i) => {
    if(item !== null) {
      return(
        <option value={item.get('name')} key={i}>{item.get('name')} ({item.get('species')})</option>
      )      
    }
  })
  const optionsWithNotSure = options.insert(0, notSure())
  // console.log(options)
  
  return(
    <Field name="name" component="select">
      {optionsWithNotSure}
    </Field>
  )
}

// const renderSelect = (props) => (
//   <div>
    
//   </div>
// ) 


const renderField = props => {
  console.log(props)
    return (
    // console.log(props)
    <div>
      <div className="form__label"> 
        <label>{props.placeholder}</label>{props.meta.touched && props.meta.error && <span>{props.meta.error}</span>}
      </div>
      <div>
        <input name={props.input.name} type={props.input.type}/>
        
      </div>
    </div>
  )
}

const renderDropzoneInput = (field) => {
  console.log(field)
  const files = field.input.value;
  return (
    <div>
      <div className="form__label">
        <label>Image File</label>{field.meta.error && <span>{field.meta.error}</span>}
      </div>
      <Dropzone
        name={field.name}
        multiple={false}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
}

let PhotoForm = ({ handleSubmit, bird, createPhoto, location, handleChange, errors }) => {
  const props = {
    location: location, // `value` is required
    onChange: handleChange, // `onChange` is required
    onBlur: () => {
      console.log('blur!')
    }
  }
	return(
		<div>
			<form className="form" onSubmit={handleSubmit((vals) => createPhoto(vals))}>
			  <div className="form__title">
          <h2>Upload a Bird Photo</h2>
        </div>
        <div className="form__input">
          <label>Location</label>
          <div>
            <Field
              name="location"
              placeholder="location the photo was taken"
              onChange={handleChange}
              component={ PlaceField }
              props={props}
           />
          </div>          
        </div>        
        <div className="form__input">
        	<label>Name</label>
        	<div>
            {birdSelect(bird)}
        	</div>
          {props.touched && props.error && <span>{props.error}</span>}
      	</div>
        <div className="form__input--half">
          <label>Location Lat</label>
          <div>
            <Field
              name="lat"
              component="input"
              type="text"
           />
          </div>          
        </div>
        <div className="form__input--half">
          <label>Location Lng</label>
          <div>
            <Field
              name="lng"
              component="input"
              type="text"
           />
          </div>          
        </div>
        <div className="form__input">

          <Field
            name="camera"
            component={renderField}
            placeholder="Camera Model"              
            type="text"
         />
       
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

PhotoForm = reduxForm({
    form: 'uploadPhotoForm',
    validate
})(PhotoForm); 

// You have to connect() to any reducers that you wish to connect to yourself
PhotoForm = connect(
  state => ({
    initialValues: state.getIn(['location', 'currentLocation']), // pull initial values from account reducer
    enableReinitialize: true,
  })
)(PhotoForm)

export default PhotoForm;
