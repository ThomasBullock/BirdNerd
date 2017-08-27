import React from 'react';
import { Switch, Route } from 'react-router-dom';

import FullBird from './FullBird';
import BirdCard from './BirdCard';
import BirdFormContainer from '../../containers/Bird/BirdFormContainer';
import BirdForm from './BirdForm';
import BirdInfo from './BirdInfo';
import RequireAuth from '../Auth/RequireAuth';

const Birds = () => (
  <Switch>
    <Route exact path='/bird' component={FullBird}/>
    <Route exact path='/bird/new' component={RequireAuth(BirdFormContainer)}/>

    {/* <Route path='/bird/:birdId' component={BirdCard}/> */}
    <Route path='/bird/:birdId' component={BirdInfo}/>
  </Switch>
);

export default Birds;
