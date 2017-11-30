import React, { Component } from 'react';
import BirdWings from './icons/BirdWings';
import { Link } from 'react-router-dom';

import '../styles/css/components/Footer.css'

class Footer extends Component {
  constructor(props){
    super(props);
    
  }
  
  render() {
    const date = (new Date().getFullYear());
    return(
      <footer className="footer" role="contentinfo">
        {/*<div className="footer__logo">
            <BirdWings />
        </div>*/}
        <div className="footer__links">
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <ul>
            <li><Link to="/terms">Terms and Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="footer__bottom">
          <hr/>
          <p>&#xa9;{date} BirdNerd.</p>
        </div>
      </footer>   
    )
  }
}

export default Footer;

