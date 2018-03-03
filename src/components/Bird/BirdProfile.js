import React, { Component } from 'react';
import {Helmet} from "react-helmet";

import BirdWings from '../icons/BirdWings';
import DeleteIcon from '../icons/IconCross';
import EditIcon from '../icons/IconFeather';
import BirdCard from './BirdCard';
import ScrollToTopOnMount from '../ScrollToTopOnMount';
import { Link } from 'react-router-dom';
import { cloudinaryUrlModify } from '../../clientHelpers';
import swal from 'sweetalert';

// Duplicate code also in Homepage to be improved!
const userPermission = (user, photo) => {
	if(user && user.get('role') === 'moderator') {
		return true;
	} else if (user && photo.getIn(['user', '_id']) === user.get('_id')) {
		return true;
	} else {
		return false;
	}
}

const deleteAlert = (birdInfo, deleteBird) => {
	swal({
	  title: "Are you sure?",
	  text: "Once deleted, you will not be able to recover this bird profile!",
	  icon: "warning",
	  buttons: true,
	  dangerMode: true,
	})
	.then((willDelete) => {
	  if (willDelete) {
	    // swal("Poof! Your imaginary file has been deleted!", {
	    //   icon: "success",
	    // });
	    console.log(' will delete')
			deleteBird(birdInfo.get('_id'));	 
	  } else {
	    swal(`The ${birdInfo.get('name')} profile is safe!`);
	  }
	});
}

const BirdProfile = ({birdSlug, birdInfo, photos, user, likeHandler, deleteBird}) => {
		const userRole = (user) ? user.get('role') : null;
		const photoCards = photos && photos.map( (item, i) => {
			return(
				<BirdCard 
					key={i}
					id={item.get('_id')}
					orientation={item.get('imageAspect')}
					slug={item.get('birdSlug')}
					likes={item.get('likes') ? item.get('likes').size : 0 }
					comments={item.get('comments').length}
					img={item.get('imageUrl')}
					public_id={item.get('public_id')}
					owner={userPermission(user, item)} // would it be more efficient to pass _id's directly rather then maps??
					userID={item.getIn(['user', '_id'])}
					gravatar={item.getIn(['user', 'gravatar'])}
					likeHandler={likeHandler}								
				/>
			)
		})
		let locations= '';
		if(birdInfo.get('location')) {
			birdInfo.get('location').forEach((val, key) => {
				locations += `${val} `;
			})			
		}
		const image = birdInfo.get('imageUrl') && cloudinaryUrlModify(birdInfo.get('imageUrl').split('/'), 'w_1048');
		return(
			<div className="birdinfo">
				<ScrollToTopOnMount />
				<Helmet>
					<title>Bird:{birdSlug}</title>
				</Helmet>
				<div className="birdinfo__hero">
					<div className="birdinfo__gradient birdinfo__gradient--left"></div>
					<div className="birdinfo__hero-img" style={{'backgroundImage': `url(${image})`}}></div>
					<div className="birdinfo__gradient birdinfo__gradient--right"></div>
				</div>
				<div className="birdinfo__card">
					<div className="birdinfo__facts">
						<div className="birdinfo__wings">
							<BirdWings className="birdinfo__svg"/> 
						</div>
						<div className="birdinfo__header">

							{ userRole === 'moderator' &&
								<button className="birdinfo__btn birdinfo__btn--edit">
										<Link to={`/bird/${birdInfo.get('slug')}/edit`}>
											<EditIcon />
										</Link>			
								</button>			
							}										
							<div className="birdinfo__heading">
								<h2>{birdInfo.get('name')}</h2>							
							</div>
							{ userRole === 'moderator' &&
								<button className="birdinfo__btn" onClick={() => deleteAlert(birdInfo, deleteBird) }>
										<DeleteIcon />
								</button>			
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
					<div className="cards-wrapper">		
					{photoCards}
					</div>
				</div>	
			</div>
		)
}


export default BirdProfile;