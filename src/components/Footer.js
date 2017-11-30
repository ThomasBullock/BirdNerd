import React, { Component } from 'react';
import BirdWings from './icons/BirdWings';

import '../styles/css/components/Footer.css'

class Footer extends Component {
  constructor(props){
    super(props);
    
  }
  
  render() {
    return(
      <footer className="footer" role="contentinfo">
        <div className="footer__logo">
            <BirdWings />
        </div>
        <div className="footer__links">
          <ul>
            <li><a href="javascript:void(0)">About</a></li>
            <li><a href="javascript:void(0)">Contact</a></li>
          </ul>
          <ul>
            <li><a href="javascript:void(0)">Terms and Conditions</a></li>
            <li><a href="javascript:void(0)">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer__bottom">
          <hr/>

          <p>Disclaimer area lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, nostrum repudiandae saepe.</p>
        </div>
      </footer>   
    )
  }
}

export default Footer;

