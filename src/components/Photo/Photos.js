import React from 'react';
import { Switch, Route } from 'react-router';

import MyPhotos from './MyPhotos';
import PhotoFormContainer from '../../containers/Photo/PhotoFormContainer';
import RequireAuth from '../Auth/RequireAuth';

const Photos = () => {
	return(
		<Switch>
			<Route exact path='/mybirds' component={MyPhotos}/>
			<Route exact path="/mybirds/new" component={RequireAuth(PhotoFormContainer)}/>
		</Switch>
	);
}

export default Photos;