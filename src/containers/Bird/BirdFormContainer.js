import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../img/Ellipsis.svg';
import Immutable, { fromJS } from 'immutable';

import {
  //requestBird,
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
          conservationStatus: bird && bird.get('onservationStatus'),
          location: bird && bird.get('location').reduce( (accum, item) => `${accum}, ${item}`),
          comments: bird && bird.get('comments')
        })
        // console.log(bird)
        return(
          <UpdateBirdForm initialValues={initialValues} updateBird={updateBird} bird={bird}/>
        )        
      } else {
        return(
           <BirdForm createBird={createBird}/>
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

const mapStateToProps = (state) => {
  return {
    birds: state.get('bird'),
    loading: state.getIn(['loading', 'currentState']),
    initialValues: fromJS({ name: 'blablab' })
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