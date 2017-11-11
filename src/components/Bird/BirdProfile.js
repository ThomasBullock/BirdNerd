import React, { Component } from 'react';
import '../../styles/css/components/BirdInfo.css';
// import BirdWings from '../../img/BirdWings.svg';
import BirdWings from '../icons/BirdWings';
import DeleteIcon from '../icons/IconCross';
import EditIcon from '../icons/IconFeather';
import BirdCard from './BirdCard';

const BirdProfile = ({birdInfo, photos, user}) => {
		const userRole = user.get('role');
		console.log(userRole);
		const photoCards = photos && photos.map( (item, i) => {
			return(
				<BirdCard 
					key={i}
					id={item.get('_id')}
					orientation={item.get('imageAspect')}
					slug={item.get('birdSlug')}
					likes={item.get('likes')}
					comments={item.get('comments').length}
					img={item.get('imageUrl')}
					user={userRole}
				/>
			)
		})
		let locations= '';
		if(birdInfo.get('location')) {
			birdInfo.get('location').forEach((val, key) => {
				locations += `${val} `;
			})			
		}
		return(
			<div className="birdinfo">
				<div className="birdinfo__hero">
					<div className="birdinfo__gradient birdinfo__gradient--left"></div>
					<div className="birdinfo__hero-img" style={{'backgroundImage': `url(${birdInfo.get('imageUrl')})`}}></div>
					<div className="birdinfo__gradient birdinfo__gradient--right"></div>
				</div>
				<div className="birdinfo__card">
					<div className="birdinfo__facts">
						<div className="birdinfo__wings">
							<BirdWings /> 
						</div>
						<div className="birdinfo__header">
							{userRole === 'moderator' && <div className="birdinfo__btn">
								<EditIcon className="birdinfo__edit"/>
							</div>
							}			
							<div className="birdinfo__heading">
								<h2>{birdInfo.get('name')}</h2>							
							</div>
							{ userRole === 'moderator' && <div className="birdinfo__btn">
								<DeleteIcon />
							</div>	
								
							}
						
						</div>

						<p><strong>Species: </strong>{birdInfo.get('species')}</p>
						{birdInfo.get('order') !== 'false' &&
							
						<p><strong>Order: </strong>{birdInfo.get('order')}</p>
						}						
						<p>
							<strong>Locations: </strong>
							{locations}
						</p>
						<p><strong>Conservation Status: </strong>{birdInfo.get('conservationStatus')}</p>
						<p>{birdInfo.get('comments')}</p>
					</div>
				</div>				
				<div className="birdinfo__body">
					<h2>Photos of {birdInfo.get('name')+'s'}</h2>
					<div className="container">		
					{photoCards}
					</div>
				</div>	
			</div>
		)
}


export default BirdProfile;