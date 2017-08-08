import React from 'react';
import { Switch, Route } from 'react-router-dom';

import FullBird from './FullBird';
import BirdCard from './BirdCard';
import BirdFormContainer from '../../containers/Bird/BirdFormContainer';
import BirdForm from './BirdForm';
import BirdInfo from './BirdInfo';

const Birds = () => (
  <Switch>
    <Route exact path='/bird' component={FullBird}/>
    <Route exact path='/bird/new' component={BirdFormContainer}/>

    {/* <Route path='/bird/:birdId' component={BirdCard}/> */}
    <Route path='/bird/:birdId' component={BirdInfo}/>
  </Switch>
);

export default Birds;
