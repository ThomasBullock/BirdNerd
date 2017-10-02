import React, { Component } from 'react';
import '../../styles/css/components/BirdInfo.css';
// import BirdWings from '../../img/BirdWings.svg';
import BirdWings from '../icons/BirdWings';
import BirdCard from './BirdCard';

const BirdProfile = (birdInfo) => {
		const photoCards = birdInfo.photos.map( (item, i) => {
			return(
				<BirdCard 
	        	key={i}
	        	id={item && item._id}
		  			orientation={item && item.imageAspect}
		  			slug={item && item.birdSlug}
		  			likes={item && item.likes}
		  			//comments={item && item.comments.length}
		  			img={item && item.imageUrl}
				/>
			)
		})
	
		let locations= '';
		if(birdInfo.birdInfo.get('location')) {
			birdInfo.birdInfo.get('location').forEach((val, key) => {
				locations += `${val} `;
			})			
		}
		return(
			<div className="birdinfo">
				<div className="birdinfo__hero">
					<div className="birdinfo__gradient birdinfo__gradient--left"></div>
					<div className="birdinfo__hero-img" style={{'backgroundImage': `url(${birdInfo.birdInfo.get('imageUrl')})`}}></div>
					<div className="birdinfo__gradient birdinfo__gradient--right"></div>
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
						{birdInfo.birdInfo.get('order') !== 'false' &&
							
						<p><strong>Order: </strong>{birdInfo.birdInfo.get('order')}</p>
						}						
						<p>
							<strong>Locations: </strong>
							{locations}
						</p>
						<p><strong>Conservation Status: </strong>{birdInfo.birdInfo.get('conservationStatus')}</p>
						<p>{birdInfo.birdInfo.get('comments')}</p>
					</div>
				</div>				
				<div className="birdinfo__body">
					<h2>Photos of {birdInfo.birdInfo.get('name')+'s'}</h2>
					<div className="container">		
					{photoCards}
					</div>
				</div>	
			</div>
		)
}


export default BirdProfile;