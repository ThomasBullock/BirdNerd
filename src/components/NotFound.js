import React, { Component } from 'react';
import Message from './Message';

class NotFound extends Component {
	render() {
		return(
			<Message heading="Sorry that page doesn't exist" />
		)
	}
}

export default NotFound;