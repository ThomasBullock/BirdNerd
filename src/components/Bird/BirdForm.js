import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import Dropzone from 'react-dropzone';
import '../../styles/css/components/Forms.css';

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
    errors.species = 'Must be 60 characters or less'
  }
  return errors
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
        <div className="form__input--half">
          <label>Bird Group (Order)</label>
          <div>
            <Field name="order" component="select">
              <option value="false">Not Sure</option>
              <option value="Procellariiformes">Albatrosses and Petrels (Order Procellariiformes)</option>
              <option value="Falconiformes">Birds of Prey (Order Falconiformes)</option>
              <option value="Turniciformes">Buttonquails (Order Turniciformes)</option>
              <option value="Casuariiformes">Cassowaries and Emus (Order Casuariiformes)</option>
              <option value="Gruiformes">Cranes, Coots and Rails (Order Gruiformes)</option>
              <option value="Cuculiformes">Cuckoos and Turacos (Order Cuculiformes)</option>
              <option value="Phoenicopteriformes">Flamingos (Order Phoenicopteriformes)</option>
              <option value="Galliformes">Gamebirds (Order Galliformes)</option> 
              <option value="Podicipediformes">Grebes (Order Podicipediformes)</option> 
              <option value="Ciconiiformes">Herons and Storks (Order Ciconiiformes)</option> 
              <option value="Apodiformes">Hummingbirds and Swifts (Order Apodiformes)</option> 
              <option value="Coraciiformes">Kingfishers (Order Coraciiformes)</option>
              <option value="Apterygiformes">Kiwis (Order Apterygiformes)</option>
              <option value="Gaviiformes">Loons (Order Gaviiformes)</option>
              <option value="Coliiformes">Mousebirds (Order Coliiformes)</option>
              <option value="Caprimulgiformes">Nightjars and Frogmouths (Order Caprimulgiformes)</option>
              <option value="Struthioniformes">The Ostrich (Order Struthioniformes)</option>
              <option value="Strigiformes">Owls (Order Strigiformes)</option> 
              <option value="Psittaciformes">Parrots and Cockatoos (Order Psittaciformes)</option> 
              <option value="Pelecaniformes">Pelicans, Cormorants and Frigatebirds (Order Pelecaniformes)</option> 
              <option value="Sphenisciformes">Penguins (Order Sphenisciformes)</option> 
              <option value="Passeriformes">Perching Birds (Order Passeriformes)</option>
              <option value="Columbiformes">Pigeons and Doves (Order Columbiformes)</option>
              <option value="Rheiformes">Rheas (Order Rheiformes)</option> 
              <option value="Pteroclidiformes">Sandgrouses (Order Pteroclidiformes)</option> 
              <option value="Tinamiformes">Tinamous (Order Tinamiformes)</option> 
              <option value="Trogoniformes">Trogons and Quetzals (Order Trogoniformes)</option> 
              <option value="Anseriformes">Waterfowl (Order Anseriformes)</option>
              <option value="Piciformes">Woodpeckers and Toucans (Order Piciformes)</option>                                                                                                                           
            </Field>
          </div>
        </div>
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
    form: 'birdForm',
    validate
})(BirdForm);
