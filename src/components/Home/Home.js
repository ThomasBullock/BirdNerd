import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import HomeContainer from '../../containers/Home/HomeContainer';

class Home extends Component {
  render() {
    return(
      <Switch>
        <Route exact path='/' component={HomeContainer}/>
      </Switch>
    )
  }
}


export default connect( )(Home);