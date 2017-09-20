import React from 'react';

import { Field, reduxForm } from 'redux-form/immutable';
import Dropzone from 'react-dropzone';
import PlaceField from './PlaceField';
import PlacesAutocomplete from 'react-places-autocomplete';

const FILE_FIELD_NAME = 'files';

const validate = values => {
  // IMPORTANT: values is an Immutable.Map here!
    const errors = {};
  return errors;
}    

const birdSelect = (birdList) => {
  const options = birdList.map( (item, i) => {
    console.log(item)
    if(item !== null) {
      return(
        <option value={item.name} key={i}>{item.name} ({item.species})</option>
      )      
    }
  })
  return(
    <Field name="name" component="select">
      {options}
    </Field>
  )
}

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    <div>
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

const PhotoForm = ({ handleSubmit, birdList, uploadPhoto, location, handleChange }) => {
  console.log(handleChange);
  const input = {
  value: location, // `value` is required
  onChange: (value) => {
    console.log('change!')
  }, // `onChange` is required
  onBlur: () => {
    console.log('blur!')
  }
}
	return(
		<div>
			<form className="form" onSubmit={handleSubmit((vals) => uploadPhoto(vals))}>
			  <div className="form__title">
          <h2>Upload a Bird Photo</h2>
        </div>
        <div className="form__input">
        	<label>Name</label>
        	<div>
            {birdSelect(birdList)}
        	</div>
      	</div>
        <div className="form__input">
          <label>Location</label>
          <div>
            <Field
              name="location"
              placeholder="location the photo was taken"
              onChange={handleChange}
              value={location}
              component={ PlaceField }
           />
          </div>          
        </div>
        <div className="form__input--half">
          <label>Location Lat</label>
          <div>
            <Field
              name="latitude"
              component="input"
              type="text"
           />
          </div>          
        </div>
        <div className="form__input--half">
          <label>Location Lng</label>
          <div>
            <Field
              name="longitude"
              component="input"
              type="text"
           />
          </div>          
        </div>
        <div className="form__input">
          <label>Camera Model</label>
          <div>
            <Field
              name="camera"
              component="input"
              placeholder="Camera used to take the photo"              
              type="text"
           />
          </div>          
        </div>                           
        <div className="form__dropzone">
            <label htmlFor={FILE_FIELD_NAME}>Files</label>
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
    form: 'uploadPhotoForm',
    validate
})(PhotoForm); 