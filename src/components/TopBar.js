import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/css/components/TopBar.css'

import search from '../img/search.png';

class TopBar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mounted: false,
			loggedIn: false
		}
	}

	componentDidMount() {
		this.setState({
			mounted: true
		})
	}

	render() {
		return(
			<header className="topbar">
				<nav className="topbar__nav">
					<div className="topbar__nav-component topbar__nav-component--menu">
						<ul className="topbar__menu">
							<li className="topbar__link-item"><Link to='/'>Home</Link></li>
							<li className="topbar__link-item"><Link to='/bird'>Birds</Link></li>
						</ul>						

					</div>
					<div className="topbar__nav-component topbar__nav-component--search">
						<form className="topbar__search-form">
							<input type="text" placeholder="search..."/>
							<button className="topbar__search-btn" type="submit">
            		<img src={search} alt="Search Icon"/>
          		</button> 
						</form>
					</div>
					<div className="topbar__nav-component topbar__nav-component--login">
						<ul className="topbar__menu">
							<li className="topbar__link-item"><Link to='/'>Register</Link></li>
							<li className="topbar__link-item"><Link to='/'>Login</Link></li>
						</ul>	
					</div>										
				</nav>


			</header>

		)
	}

}

export default TopBar;