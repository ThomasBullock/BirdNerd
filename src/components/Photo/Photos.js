import React from 'react';
import { Switch, Route } from 'react-router';
import MyPhotos from './MyPhotos';
import PhotoFormContainer from '../../containers/Photo/PhotoFormContainer';
import MyPhotosContainer from '../../containers/Photo/MyPhotosContainer';
import RequireAuth from '../Auth/RequireAuth';

const Photos = () => {
	return(
		<Switch>
			<Route exact path='/mybirds' component={MyPhotosContainer}/>
			<Route exact path="/mybirds/new" component={RequireAuth(PhotoFormContainer)}/>
		</Switch>
	);
}

export default Photos;