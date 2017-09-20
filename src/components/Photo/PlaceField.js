import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Field, reduxForm } from 'redux-form/immutable';

const AutocompleteItem = ({ formattedSuggestion }) => (
	<div>
		<strong>{ formattedSuggestion.mainText }</strong>{' '}
		<small>{ formattedSuggestion.secondaryText }</small>
	</div>
)

class PlaceField extends Component {
	constructor(props) {
		super(props)
	}


	render() {
		console.log(this.props)
		const inputProps = {
		  value: 'Melbourne', // `value` is required
		  onChange: () => {
		    console.log('change!')
		  }, // `onChange` is required
		  onBlur: () => {
		    console.log('blur!')
		  },
		  type: 'search',
		  placeholder: this.props.placeholder,
		  autoFocus: true,
		}


		return (
				<PlacesAutocomplete
					inputProps={inputProps}
					typeAhead={false}
					name='location'
					autocompleteItem={AutocompleteItem}
				/>
		);		
	}
}

export default PlaceField;

// export const PlaceField = ({ input, placeholder, meta: { touched, error }, ...rest }) => {
// 	console.log(input)
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