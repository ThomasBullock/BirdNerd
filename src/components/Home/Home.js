import React, { Component } from 'react';
import { connect } from 'react-redux';

import TopBar from '../TopBar';
import { protectedTest } from '../../ducks/auth';

class Home extends Component {
  constructor(props) {
    super(props);
    this.props.protectedTest();
  }

  renderContent() {
    if(this.props.content) {
      return (
        <p>{this.props.content}</p>
      );
    }
  }
  render() {
    return (
      <div>
        { this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { content: state.getIn(['auth', 'content']) };
}

export default connect(mapStateToProps, { protectedTest })(Home);