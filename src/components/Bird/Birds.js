import React from 'react';
import { Switch, Route } from 'react-router-dom';

import FullBird from './FullBird';
import BirdCard from './BirdCard';
import BirdFormContainer from '../../containers/Bird/BirdFormContainer';

const Birds = () => (
  <Switch>
    <Route exact path='/bird' component={FullBird}/>
    <Route exact path='/bird/new' component={BirdFormContainer}/>
    <Route path='/bird/:birdId' component={BirdCard}/>
  </Switch>
);

export default Birds;
