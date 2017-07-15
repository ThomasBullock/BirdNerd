import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TopBar from './TopBar';
import Home from './Home/Home';
import Birds from './Bird/Birds';

const Main = () => (
  <main>
    <TopBar />
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/bird' component={Birds}/>
    </Switch>
  </main>
);

export default Main;
