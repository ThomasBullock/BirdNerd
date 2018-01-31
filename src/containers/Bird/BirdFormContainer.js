import React, { Component } from 'react';
import { instanceOf, func, bool } from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import Loader from '../../img/Ellipsis.svg';

import {
  //requestBird,
  createBird,
  updateBird,
} from '../../ducks/bird';

import BirdForm from '../../components/Bird/BirdForm';

class BirdFormContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { createBird, loading } = this.props;
        //const last = this.props.birds.get(-1);
        //const uploading = (last.uploading) ? true : false;
        return (
          <div className="container">
            {loading ? (
              <div className="loader" >
                <h2 className="loader__heading">Uploading Image</h2>
                <img src={Loader}/>
              </div>  
            
            ) : (
              <BirdForm createBird={createBird}/>
            )}
          </div>
        );
    }
}

BirdFormContainer.propTypes = {
  birds: instanceOf(Immutable.List).isRequired,
  loading: bool.isRequired,
  createBird: func.isRequired,
  updateBird: func.isRequired
}

const mapStateToProps = (state) => {
  return {
    birds: state.get('bird'),
    loading: state.getIn(['loading', 'currentState']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //requestBird: () => dispatch(requestBird()),
    createBird: (bird) => dispatch(createBird(bird)),
    updateBird: (bird) => dispatch(updateBird(bird))
  }; // here we're mapping actions to props
}

export default connect(mapStateToProps, mapDispatchToProps)(BirdFormContainer);