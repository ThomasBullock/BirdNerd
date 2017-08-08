import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import Dropzone from 'react-dropzone';

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
    <form onSubmit={handleSubmit((vals) => createBird(vals))}>
      <div>
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
      <div>
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
      <div>
        <label>Location</label>
        <div>
          <Field
            name="location"
            component="input"
            type="text"
            placeholder="Location"
          />
        </div>
      </div>
      <div>
        <label>Conservation Status</label>
        <div>
          <Field name="conservationStatus" component="textarea" />
        </div>
      </div>
        <div>
            <label htmlFor={FILE_FIELD_NAME}>Files</label>
            <Field
                name={FILE_FIELD_NAME}
                component={renderDropzoneInput}
            />
        </div>
      <div>
        <button type="submit">
          Submit
        </button>
      </div>
    </form>
  )
}


export default reduxForm({
    form: 'birdForm'
})(BirdForm);
