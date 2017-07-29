import React from 'react';
import { connect } from 'react-redux';
// import '../styles/css/components/App.css';
import {
  fetchBird,
  createBird,
  updateBird,
  removeBird
} from '../ducks/birds';
import Main from './Main';

function mapStateToProps(state) {
  return {
    birds: state.birds,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchBird: () => dispatch(fetchBird()),
    createBird: (bird) => dispatch(createBird(bird)),
    updateBird: (bird) => dispatch(updateBird(bird)),
    removeBird: (bird) => dispatch(removeBird(bird))
  }; // here we're mapping actions to props
}

const App = connect(mapStateToProps, mapDispatchToProps)(Main);


export default App;