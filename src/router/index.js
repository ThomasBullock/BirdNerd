import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import Home from '../components/Home/Home';
import About from '../components/About/About';

export default (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About} />
        </Switch>
	</BrowserRouter>
);