import React, { Component } from 'react';
import '../../styles/css/components/BirdInfo.css';
// import BirdWings from '../../img/BirdWings.svg';
import BirdWings from '../icons/BirdWings';

const BirdProfile = (birdInfo) => {
		console.log(birdInfo);
		const locations = birdInfo.birdInfo.location.join(', '); 
		const heroImg = `url(${birdInfo.birdInfo.imageUrl})`;
		// console.log(heroImg);
		// temp info object

		return(
			<div className="birdinfo">
				<div className="birdinfo__hero" style={{'backgroundImage': `url(${birdInfo.birdInfo.imageUrl})`}}>
					
				</div>
				<div className="birdinfo__card">
					<div className="birdinfo__facts">
						<div className="birdinfo__wings">
							{/*	<img src={BirdWings} alt="Bird Wings"/> */}
							<BirdWings /> 
						</div>
						<div className="birdinfo__heading">
							<h2>{birdInfo.birdInfo.name}</h2>							
						</div>
						<p><strong>Species: </strong>{birdInfo.birdInfo.species}</p>
						<p><strong>Locations: </strong>{locations}</p>
						<p><strong>Conservation Status: </strong>{birdInfo.birdInfo.conservationStatus}</p>
						<p>{birdInfo.birdInfo.comments}</p>
					</div>
				</div>				
				<div className="birdinfo__body">		

				</div>	
			</div>
		)
}


export default BirdProfile;