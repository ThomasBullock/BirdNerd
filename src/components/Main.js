import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TopBar from './TopBar';
import Home from './Home/Home';
import Register from './Auth/Register';  
import Login from './Auth/Login'; 
import Birds from './Bird/Birds';
import RequireAuth from './Auth/RequireAuth';

const Main = () => (
  <main>
    <TopBar />
    <Switch>
      <Route exact path='/' component={RequireAuth(Home)}/>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path='/bird' component={Birds}/>
    </Switch>
  </main>
);

export default Main;
