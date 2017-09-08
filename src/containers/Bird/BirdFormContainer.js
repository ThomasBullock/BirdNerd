import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  requestBird,
  createBird,
  updateBird,
  removeBird
} from '../../ducks/bird';

import BirdForm from '../../components/Bird/BirdForm';

class BirdFormContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { createBird } = this.props;
        return (
            <BirdForm 
                createBird={createBird}
            />
        );
    }
}

const mapStateToProps = (state) => {
  return {
    birds: state.get('birds'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestBird: () => dispatch(requestBird()),
    createBird: (bird) => dispatch(createBird(bird)),
    updateBird: (bird) => dispatch(updateBird(bird)),
    removeBird: (bird) => dispatch(removeBird(bird))
  }; // here we're mapping actions to props
}

export default connect(mapStateToProps, mapDispatchToProps)(BirdFormContainer);