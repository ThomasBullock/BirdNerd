import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TopBar from './TopBar';
import Home from './Home/Home';
import Birds from './Bird/Birds';
import BirdForm from './Bird/BirdForm';

const Main = () => (
  <main>
    <TopBar />
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/bird' component={Birds}/>
      <Route path="/bird/new" component={BirdForm}/>
    </Switch>
  </main>
);

export default Main;
