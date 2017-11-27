import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import history from '../history';
import { unAuthUser } from '../ducks/auth';

import '../styles/css/components/TopBar.css'

import search from '../img/search.png';

class TopBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mounted: false,
			loggedIn: false
		}
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
		this.setState({
			mounted: true
		})
	}

	logout() {
		this.props.unAuthUser();
		window.sessionStorage.removeItem('token');
		history.push('/dashboard');
	}

	render() {
		const { authenticated, role } = this.props;
		const notLoginLeft = <ul className="topbar__menu">
			{/* <li className="topbar__link-item"><Link to='/dashboard'>BIRDNERD</Link></li>*/}
			<li className="topbar__link-item"><Link to='/bird'>Birds</Link></li>
		</ul>;

		const loginLeft = <ul className="topbar__menu">
			{/*<li className="topbar__link-item"><Link to='/dashboard'>BIRDNERD</Link></li> */}
			<li className="topbar__link-item"><Link to='/'>Home</Link></li>
			<li className="topbar__link-item"><Link to='/bird'>Birds</Link></li>
			{role === 'moderator' && <li className="topbar__link-item"><Link to='/bird/new'>Submit Bird</Link></li>}
			<li className="topbar__link-item"><Link to='/bird/mybirds'>My Photos</Link></li>
		</ul>;

		return(
			<header className="topbar">
				<nav className="topbar__nav">
					<div className="topbar__nav-component topbar__nav-component--menu">
						{ !authenticated ? (notLoginLeft) : (loginLeft) }
					</div>
					<div className="topbar__nav-component topbar__nav-component--search">
						<form className="topbar__search-form">
							<input type="text" placeholder="search..." disabled/>
							<button className="topbar__search-btn" type="submit">
            		<img src={search} alt="Search Icon"/>
          		</button> 
						</form>
					</div>
					<div className="topbar__nav-component topbar__nav-component--login">
						{ !authenticated ? (<ul className="topbar__menu">
							<li className="topbar__link-item"><Link to='/register'>Register</Link></li>
							<li className="topbar__link-item"><Link to='/login'>Login</Link></li>
						</ul>) : (<ul className="topbar__menu">
							<li className="topbar__link-item " onClick={this.logout}><Link to=''>Logout</Link></li>
						</ul>) }	
					</div>										
				</nav>


			</header>

		)
	}

}

const mapStateToProps = (state) => {
	return ({
		authenticated: state.getIn(['auth', 'authenticated']),
		role: state.getIn(['auth', 'user', 'role']),
	});
}

export default connect(mapStateToProps, { unAuthUser })(TopBar);