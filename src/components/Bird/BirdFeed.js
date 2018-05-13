import React from 'react';
import { Link } from 'react-router-dom';
import { instanceOf, object, number, func } from 'prop-types';
import Immutable from 'immutable';
import BirdCard from '../Bird/BirdCard';
import PaginationMenu from '../Common/PaginationMenu';

const userPermission = (user, photo) => {
	if(user && user.get('role') === 'moderator') {
		return true;
	} else if (user && photo.getIn(['user', '_id']) === user.get('_id')) {
		return true;
	} else {
		return false;
	}
}

const BirdFeed = ({ photos, sort, user, likeHandler, totalPhotos }) => {
	const birdPhotos = photos.map( (item, i) => {
		return (
			<BirdCard 
				key={i}
				id={item.get('_id')}
				name={item.get('birdName')}					
				orientation={item.get('imageAspect')}
				slug={item.get('birdSlug')}
				likes={item.get('likes') ? item.get('likes').size : 0 }
				comments={item.get('comments').length}
				img={item.get('imageUrl')}
				public_id={item.get('public_id')}
				owner={userPermission(user, item)} // would it be more efficient to pass _id's directly rather then maps??
				userID={item.getIn(['user', '_id'])}
				likeHandler={likeHandler}			
			/>	
		)
	})
    return (
		<div className="container">
			<div style={{'display': 'flex', 'justifyContent': 'center', 'flexWrap': 'wrap' }}> 
				<PaginationMenu page="feedPage" totalPhotos={totalPhotos}/>
				<ul className="sort-tabs">
					<li className="tab-header-and-content">
						{ /* <a href="#" className="nav-tabs__link">Newest Photos</a> */}
						<button className="sort-tabs__button" onClick={() => sort('Newest')}>Newest Photos</button>
					</li>
					<li className="tab-header-and-content">
						<button className="sort-tabs__button" onClick={() => sort('Oldest')}>Oldest Photos</button>
					</li>
					<li className="tab-header-and-content">
						<button className="sort-tabs__button" onClick={() => sort('Popular')}>Most Popular</button>
					</li>
				</ul>
			</div>
    		<div className="cards-wrapper">	
    			{photos.size > 1 && birdPhotos}
	  		</div>	  	  			  		
	  	</div>	
    );
}

BirdFeed.propTypes = {
	photos: instanceOf(Immutable.List).isRequired,
	totalPhotos: number.isRequired,
	sort: func.isRequired,
}

export default BirdFeed;
