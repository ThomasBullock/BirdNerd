import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import BirdCard from './BirdCard';
import BirdFormContainer from '../../containers/Bird/BirdFormContainer';
import BirdForm from './BirdForm';
import BirdProfileContainer from '../../containers/Bird/BirdProfileContainer';
import BirdListContainer from '../../containers/Bird/BirdListContainer';
import RequireAuth from '../Auth/RequireAuth';
import ModeratorAuth from '../Auth/ModeratorAuth';
import MyPhotosContainer from '../../containers/Photo/MyPhotosContainer';
import PhotoFormContainer from '../../containers/Photo/PhotoFormContainer';
import { requestBirdList } from '../../ducks/bird';
import { requestPhotos } from '../../ducks/photos';
import { withRouter } from 'react-router-dom'

class Birds extends Component {
  componentDidMount() {
    console.log('getting birdList and myPhotos')
    this.props.dispatch(requestBirdList());
    this.props.dispatch(requestPhotos());  // problem when on birdprofile this means on only users birdphotos are available
  }
  render() {
    return (
      <Switch>
        <Route exact path='/bird' component={BirdListContainer}/>  
        <Route exact path='/bird/new' component={ModeratorAuth(BirdFormContainer)}/>
        <Route exact path='/bird/mybirds' component={RequireAuth(MyPhotosContainer)}/>
        <Route exact path="/bird/mybirds/new" component={RequireAuth(PhotoFormContainer)}/>
        <Route exact path='/bird/:birdSlug' component={BirdProfileContainer}/>
        <Route exact path='/bird/:birdSlug/edit' component={ModeratorAuth(BirdFormContainer)}/>        
      </Switch>
    )
  }
}

export default connect( )(Birds);
