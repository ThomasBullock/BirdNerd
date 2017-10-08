import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import BirdCard from './BirdCard';
import BirdFormContainer from '../../containers/Bird/BirdFormContainer';
import BirdForm from './BirdForm';
import BirdProfileContainer from '../../containers/Bird/BirdProfileContainer';
import BirdListContainer from '../../containers/Bird/BirdListContainer';
import RequireAuth from '../Auth/RequireAuth';
import MyPhotosContainer from '../../containers/Photo/MyPhotosContainer';
import PhotoFormContainer from '../../containers/Photo/PhotoFormContainer';
import { requestBirdList } from '../../ducks/bird';
import { requestPhotos } from '../../ducks/photos';

class Birds extends Component {
  componentDidMount() {
    this.props.dispatch(requestBirdList());
    this.props.dispatch(requestPhotos('user'));
  }
  render() {
    return (
      <Switch>
        <Route exact path='/bird' component={BirdListContainer}/>  
        <Route exact path='/bird/new' component={RequireAuth(BirdFormContainer)}/>
        <Route exact path='/bird/mybirds' component={MyPhotosContainer}/>
        <Route exact path="/bird/mybirds/new" component={RequireAuth(PhotoFormContainer)}/>
        <Route path='/bird/:birdSlug' component={BirdProfileContainer}/>
      </Switch>
    )
  }
}

export default connect( )(Birds);
