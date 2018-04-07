import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import BirdCard from './BirdCard';
import BirdFormContainer from '../../containers/Bird/BirdFormContainer';
import BirdForm from './BirdForm';
import BirdProfileContainer from '../../containers/Bird/BirdProfileContainer';
import Photo from '../../containers/Photo/Photo';
import BirdListContainer from '../../containers/Bird/BirdListContainer';
import BirdFeedContainer from '../../containers/Bird/BirdFeedContainer';
import RequireAuth from '../Auth/RequireAuth';
import ModeratorAuth from '../Auth/ModeratorAuth';
import MyPhotosContainer from '../../containers/Photo/MyPhotosContainer';
import PhotoFormContainer from '../../containers/Photo/PhotoFormContainer';
import { requestBirdList } from '../../ducks/bird';
import { requestPhotos } from '../../ducks/photos';
import ComingSoon from '../ComingSoon';

import Loader from '../../img/Ellipsis.svg';

class Birds extends Component {
  componentWillMount() {
    if(this.props.birdList.size === 1 && this.props.birdList.get(0).get('name') === null) {
      // console.log('requesting birdList')
      this.props.dispatch(requestBirdList());
    }
    if(this.props.photos.size === 1 && this.props.photos.get(0).get('created_at') === null) {
      // console.log('requesting photos')
      this.props.dispatch(requestPhotos());
    } 
  }

  render() {
    return (
      (this.props.loading) ? 
      ( <div className="loader" >
            <h2 className="loader__heading">{this.props.message}</h2>
            <img src={Loader}/>
          </div>  ) : 
      (<Switch>
        <Route exact path='/bird' component={BirdListContainer}/>  
        <Route exact path='/bird/feed' component={RequireAuth(BirdFeedContainer)}/>          
        <Route exact path='/bird/new' component={BirdFormContainer}/>
        <Route exact path='/bird/mybirds' component={RequireAuth(MyPhotosContainer)}/>
        <Route exact path="/bird/mybirds/new" component={RequireAuth(PhotoFormContainer)}/>
        <Route exact path='/bird/:birdSlug' component={BirdProfileContainer}/>
        <Route exact path='/bird/:birdSlug/edit' component={ModeratorAuth(BirdFormContainer)}/>
        <Route exact path="/bird/:birdSlug/photo/:id" component={Photo} />   /bird/photo/pacific-reef-heron/edit     
        <Route exact path='/bird/photo/:id/edit' component={ComingSoon}/>
      </Switch>)
    )
  }
}

const mapStateToProps = (state) => {
  return {
        birdList: state.get('bird'),
        photos: state.get('photos'),
        loading: state.getIn(['loading', 'currentState']),
        message: state.getIn(['loading', 'message'])
  }
}

export default connect(mapStateToProps)(Birds);
