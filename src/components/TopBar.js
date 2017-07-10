import React, { Component } from 'react';
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
							<li className="topbar__link-item"><a href="/">Home</a></li>
							<li className="topbar__link-item"><a href="/birds">Birds</a></li>
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
							<li className="topbar__link-item"><a href="/">Register</a></li>
							<li className="topbar__link-item"><a href="/birds">Log In</a></li>
						</ul>	
					</div>										
				</nav>


			</header>

		)
	}

}

export default TopBar;