import React from 'react';
import { Switch, Route } from 'react-router-dom';

import FullBird from './FullBird';
import BirdCard from './BirdCard';
import BirdForm from './BirdForm';

const Birds = () => (
  <Switch>
    <Route exact path='/bird' component={FullBird}/>
    <Route exact path='/bird/new' component={BirdForm}/>
    <Route path='/bird/:birdId' component={BirdCard}/>
  </Switch>
);

export default Birds;
