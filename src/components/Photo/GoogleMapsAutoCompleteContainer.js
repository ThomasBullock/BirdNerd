import React, {Component, PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class GoogleMapsAutoCompleteContainer extends Component {
  constructor (props) {
    super(props)
    
    this.autocomplete = null
    this.state = {errorText: '', autoCompleted: false}
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this)
  }
	
}