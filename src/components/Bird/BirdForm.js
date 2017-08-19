import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import Dropzone from 'react-dropzone';
import '../../styles/css/components/Forms.css';
import BirdWings from '../icons/BirdWings';

const FILE_FIELD_NAME = 'files';

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

const BirdForm = ({ handleSubmit, createBird }) => {
  return (
    <div>
      <form className="form" onSubmit={handleSubmit((vals) => createBird(vals))}>
        <div className="form__title">
          <h2>Add New Bird</h2>
        </div>  
        <div className="form__input--half">
          <label>Name</label>
          <div>
            <Field
              name="name"
              component="input"
              type="text"
              placeholder="Name"
            />
          </div>
        </div>
        <div className="form__input--half">
          <label>Species</label>
          <div>
            <Field
              name="species"
              component="input"
              type="text"
              placeholder="Species"
            />
          </div>
        </div>
        <div className="form__input">
          <label>Locations</label>
          <div>
            <Field
              name="location"
              component="input"
              type="text"
              placeholder="Seperate multiple locations with comma"
            />
          </div>
        </div>
        <div className="form__input">
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
    form: 'birdForm'
})(BirdForm);
