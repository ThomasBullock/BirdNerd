import React, { Component } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Field, reduxForm } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { updateLocation } from '../../ducks/photo';

const AutocompleteItem = ({ formattedSuggestion }) => (
	<div>
		<strong>{ formattedSuggestion.mainText }</strong>{' '}
		<small>{ formattedSuggestion.secondaryText }</small>
	</div>
)

class PlaceField extends Component {
	constructor(props) {
    super(props)
    this.state = {
      address: '',
      geocodeResults: null,
      loading: false
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this)
    this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this)
	}
	
  handleSelect(address) {
    this.setState({
      address,
      loading: true
    })
    
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('Success Yay', { lat, lng });
        this.props.dispatch(updateLocation({lat, lng}));
        this.setState({
          geocodeResults: this.renderGeocodeSuccess(lat, lng),
          loading: false
        })
      })
      .catch((error) => {
        console.log('Oh no!', error)
        this.setState({
          geocodeResults: this.renderGeocodeFailure(error),
          loading: false
        })
      })    	
  }
	
  handleChange(address) {
    this.setState({
      address,
      geocodeResults: null
    })
  }
  
  renderGeocodeFailure(err) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {err}
      </div>
    )
  }

  renderGeocodeSuccess(lat, lng) {
  	console.log(lat, lng)
    return (
      <div className="alert alert-success" role="alert">
        <strong>Success!</strong> Geocoder found latitude and longitude: <strong>{lat}, {lng}</strong>
      </div>
    )
  }  

 render() {
    const cssClasses = {
      root: 'form-group',
      input: 'Demo__search-input',
      autocompleteContainer: 'Demo__autocomplete-container',
    }

    // const AutocompleteItem = ({ formattedSuggestion }) => (
    //   <div className="Demo__suggestion-item">
    //     <i className='fa fa-map-marker Demo__suggestion-icon'/>
    //     <strong>{formattedSuggestion.mainText}</strong>{' '}
    //     <small className="text-muted">{formattedSuggestion.secondaryText}</small>
    //   </div>)

    const inputProps = {
      type: "text",
      value: this.state.address,
      onChange: this.handleChange,
      onBlur: () => { console.log('Blur event!'); },
      onFocus: () => { console.log('Focused!'); },
      autoFocus: true,
      placeholder: "Search Places",
      name: 'Demo__input',
      id: "my-input-id",
    }

    return (
      <div className='page-wrapper'>
          <PlacesAutocomplete
            onSelect={this.handleSelect}
            autocompleteItem={AutocompleteItem}
            onEnterKeyDown={this.handleSelect}
            classNames={cssClasses}
            inputProps={inputProps}
          />
          {this.state.loading ? <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" /></div> : null}
          {!this.state.loading && this.state.geocodeResults ?
            <div className='geocoding-results'>{this.state.geocodeResults}</div> :
          null}
      </div>
    )
  }
}

// 	render() {
// 		console.log(this.props)
// 		console.log(this.value);
// 		const inputProps = {
// 		  value: this.props.location, // `value` is required
// 		  onChange: (value) => {
// 		    console.log('change!')
// 		    this.props.handleChange()
// 		  }, // `onChange` is required
// 		  onBlur: () => {
// 		    console.log('blur!')
// 		  },
// 		  type: 'search',
// 		  placeholder: this.props.placeholder,
// 		  autoFocus: true,
// 		}


// 		return (
// 				<PlacesAutocomplete
// 					inputProps={inputProps}
// 					typeAhead={false}
// 					name='location'
// 					autocompleteItem={AutocompleteItem}
// 				/>
// 		);		
// 	}
// }

export default connect()(PlaceField);

// export const PlaceField = ({ input, placeholder, meta: { touched, error }, ...rest }) => {
// 	console.log(input)
// 	console.log(rest)
// 	// const hasError = touched && error;
// 	const inputProps = {
// 	  value: input.value, // `value` is required
// 	  onChange: () => {
// 	    console.log('change!')
// 	  }, // `onChange` is required
// 	  onBlur: () => {
// 	    console.log('blur!')
// 	  },
// 	  type: 'search',
// 	  placeholder: 'Search Places...',
// 	  autoFocus: true,
// 	}

// 	return (
// 			<PlacesAutocomplete
// 				inputProps={inputProps}
// 				typeAhead={false}
// 				inputName={input.name}
// 				autocompleteItem={AutocompleteItem}
// 			/>
// 	);
// }