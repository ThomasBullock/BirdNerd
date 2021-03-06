import React from 'react';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import ListItem from '../Common/ListItem';
import { cloudinaryUrlModify } from '../../clientHelpers';
	// <div key={i} className="birdlist__item">
	// 	<Link className="birdlist__link" to={`/bird/${item.slug}`}>{item.name} <i>({item.species})</i></Link>
	// </div>	
import { birdGroups } from '../../clientHelpers';

const BirdList = (birdList) => {
	// cycle through props of obj
	const birdsByGroup = () => {
		return Object.keys(birdList.birdList).map( (group, i) => {
			return(
				<div key={i}>
					<section className="birdlist__group">
					<h3>{birdGroups[group]}</h3>
					{ birdList.birdList[group].length > 0 ? (
						birdList.birdList[group].map ( (item, i) => {
							return(
								<ListItem 
									key={i} 
									heading={item.name} 
									subHeading={item.species} 
									link={`/bird/${item.slug}`} 
									img={cloudinaryUrlModify(item.imageUrl.split('/'), 'w_100')} />
							)
						}) ) : (
							<p>No Listings Yet</p>
					)
					}
				</section>
				</div>
			)
		})	
	}
	return(
		<div className="birdlist">
			<Helmet>
            	<title>Bird Lists</title>
        	</Helmet>
			<h2 className="birdlist__title">The Bird List</h2>
			{birdsByGroup()}
		</div>
	)
}

export default BirdList;