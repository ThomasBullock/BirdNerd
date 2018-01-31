import React, { Component }from 'react';
import { bool, string } from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';

import history from '../../history';
export default function(ComposedComponent) {
    class Authentication extends Component {
    
        componentWillMount() {
          if(!this.props.authenticated) {
            history.push('/login');
          } else {
              console.log('Role:============', this.props.role);
            if(this.props.role !== 'moderator') {
                history.push('/bird');
            }
          }
        }
    
        componentWillUpdate(nextProps) {
          if(!nextProps.authenticated) {
            history.push('/login');
          } else {
            console.log('Role:============', this.props.role);
            if(this.props.role !== 'user') {
                history.push('/bird');
            }
          }
        }
    
        render() {
          return <ComposedComponent {...this.props} />
        }
      }

      Authentication.propTypes = {
        authenticated: bool.isRequired,
        role: string.isRequired  /// array of options
      }

      function mapStateToProps(state) {
        return { 
            authenticated: state.getIn(['auth', 'authenticated']),
            role: state.getIn(['auth', 'user', 'role']),
        };
      }
    
      return connect(mapStateToProps)(Authentication);
}