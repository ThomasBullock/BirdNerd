import React, { Component }from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import store from '../../store';
import history from '../../history';
export default function(ComposedComponent) {
    class Authentication extends Component {
    
        componentWillMount() {
          if(!this.props.authenticated) {
            store.dispatch(push('/login')) // history.push('');
          } else {
              console.log('Role:============', this.props.role);
            if(this.props.role !== 'moderator') {
              store.dispatch(push('/bird')) // history.push('/bird');
            }
          }
        }
    
        componentWillUpdate(nextProps) {
          if(!nextProps.authenticated) {
            store.dispatch(push('/login'));
          } else {
            console.log('Role:============', this.props.role);
            if(this.props.role !== 'user') {
              store.dispatch(push('/bird')) // history.push('/bird');
            }
          }
        }
    
        render() {
          return <ComposedComponent {...this.props} />
        }
      }
    
      function mapStateToProps(state) {
        return { 
            authenticated: state.getIn(['auth', 'authenticated']),
            role: state.getIn(['auth', 'user', 'role']),
        };
      }
    
      return connect(mapStateToProps)(Authentication);
}