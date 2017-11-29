import React from 'react';
import { Switch, Route } from 'react-router-dom';

import TopBar from './TopBar';
import Footer from './Footer';
import Home from './Home/Home';
import Register from './Auth/Register';
import NotFound from './NotFound';  
import Login from './Auth/Login'; 
import Forgot from './Auth/Forgot'; 
import ResetPasswordContainer from '../containers/Auth/ResetPasswordContainer';

import Birds from './Bird/Birds';

import RequireAuth from './Auth/RequireAuth';

const Main = () => (
  <main>
    <TopBar />
    <Switch>
      <Route exact path='/' component={RequireAuth(Home)}/>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/forgot" component={Forgot} />
      <Route path="/account/reset/:token" component={ResetPasswordContainer} />      
      <Route path='/bird' component={Birds}/> 
      <Route path='/404' component={NotFound} />
    </Switch>
    <Footer />
  </main>
);

export default Main;
