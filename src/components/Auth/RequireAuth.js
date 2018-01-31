import React, { Component }from 'react';
import { bool } from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import history from '../../history';
export default function(ComposedComponent) {
    class Authentication extends Component {
    
        componentWillMount() {
          if(!this.props.authenticated) {
            history.push('/welcome');
          }
        }
    
        componentWillUpdate(nextProps) {
          if(!nextProps.authenticated) {
            history.push('/welcome');
          }
        }
    
        render() {
          return <ComposedComponent {...this.props} />
        }
      }

      Authentication.propTypes = {
        authenticated: bool.isRequired,
      }
    
      function mapStateToProps(state) {
        return { authenticated: state.getIn(['auth', 'authenticated']) };
      }
    
      return connect(mapStateToProps)(Authentication);
}
