import React, { Component } from 'react';
import '../../styles/css/components/BirdInfo.css';
// import BirdWings from '../../img/BirdWings.svg';
import BirdWings from '../icons/BirdWings';

const BirdProfile = (birdInfo) => {
		let locations= '';
		if(birdInfo.birdInfo.get('location')) {
			birdInfo.birdInfo.get('location').forEach((val, key) => {
				locations += `${val} `;
			})			
		}
		return(
			<div className="birdinfo">
				<div className="birdinfo__hero" style={{'backgroundImage': `url(${birdInfo.birdInfo.get('imageUrl')})`}}>
					
				</div>
				<div className="birdinfo__card">
					<div className="birdinfo__facts">
						<div className="birdinfo__wings">
							{/*	<img src={BirdWings} alt="Bird Wings"/> */}
							<BirdWings /> 
						</div>
						<div className="birdinfo__heading">
							<h2>{birdInfo.birdInfo.get('name')}</h2>							
						</div>
						<p><strong>Species: </strong>{birdInfo.birdInfo.get('species')}</p>
						<p>
							<strong>Locations: </strong>
							{locations}
						</p>
						<p><strong>Conservation Status: </strong>{birdInfo.birdInfo.get('conservationStatus')}</p>
						<p>{birdInfo.birdInfo.get('comments')}</p>
					</div>
				</div>				
				<div className="birdinfo__body">		

				</div>	
			</div>
		)
}


export default BirdProfile;