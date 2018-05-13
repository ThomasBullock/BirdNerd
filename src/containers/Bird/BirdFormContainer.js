import React, { Component } from 'react';
import { instanceOf, func, bool } from 'prop-types';
import Immutable, { fromJS } from 'immutable';
import { connect } from 'react-redux';
import Loader from '../../img/Ellipsis.svg';

import {
  createBird,
  updateBird,
} from '../../ducks/bird';

import BirdForm from '../../components/Bird/BirdForm';
import UpdateBirdForm from '../../components/Bird/UpdateBirdForm';

class BirdFormContainer extends Component {
    constructor(props) {
        super(props);
    }
    
    createForm(params) {
      if(params.birdSlug) {
        // console.log(params.birdSlug)
        const bird = this.props.birds.filter( bird => bird.get('slug') === params.birdSlug ).get(0);
        const initialValues = fromJS({
          name: bird && bird.get('name'),
          species: bird && bird.get('species'),
          order: bird && bird.get('order'),
          family: bird && bird.get('family'),
          conservationStatus: bird && bird.get('conservationStatus'),
          location: bird && bird.get('location').reduce( (accum, item) => `${accum}, ${item}`),
          comments: bird && bird.get('comments')
        })
        // const birdId = bird && bird.get('_id')
        // console.log(bird)
        return(
          <UpdateBirdForm initialValues={initialValues} updateBird={this.props.updateBird} bird={bird}/>
        )        
      } else {
        return(
           <BirdForm createBird={this.props.createBird}/>
        )
      }  
    }

    render() {
        const { createBird, loading, match } = this.props;
        return (
          <div className="container">
            {loading ? (
              <div className="loader" >
                <h2 className="loader__heading">Uploading Image</h2>
                <img src={Loader}/>
              </div>  
            
            ) : this.createForm(match.params) }
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
    updateBird: (bird, birdId) => dispatch(updateBird(bird, birdId))
  }; // here we're mapping actions to props
}

export default connect(mapStateToProps, mapDispatchToProps)(BirdFormContainer);