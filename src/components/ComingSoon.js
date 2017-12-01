import React, { Component } from 'react';
import Message from './Message';

class ComingSoon extends Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return(
			<div className="container">
				<div className="wrapper">
					<Message heading="Coming Soon" text="We are still putting the finishing touches on that part. Stay tuned!" />
				</div>	
			</div>
			
		)
	}
}

export default ComingSoon 