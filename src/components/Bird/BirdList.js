import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/css/components/BirdList.css';
import { birdGroups } from '../../clientHelpers';

const BirdList = (birdList) => {
	
	birdList && console.log(birdList);
	
	// const birds = birdList.toJS();
	// console.log(birds);
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
								<div key={i} className="birdlist__item">
									<Link className="birdlist__link" to={`/bird/${item.slug}`}>{item.name} <i>({item.species})</i></Link>
								</div>							
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

		// if array.length then
			// render group heading
			// group entries
	
	
	
	// const birds = birdList.birdList.map( (item, i) => {
	// 	return (
	// 		<div key={i} className="birdlist__item">
	// 			<Link className="birdlist__link" to={`/bird/${item.slug}`}>{item.name} <i>({item.species})</i></Link>
	// 		</div>
	// 	)
	// })
	return(
		<div className="birdlist">
			<h2 className="birdlist__title">The Bird List</h2>
			{birdsByGroup()}
		</div>
	)
}

export default BirdList;