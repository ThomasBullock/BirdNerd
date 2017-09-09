import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/css/components/BirdList.css';

const BirdList = (birdList) => {
	// console.log(birdList)
	const birds = birdList.birdList.map( (item, i) => {
		return (
			<div key={i} className="birdlist__item">
				<Link className="birdlist__link" to={`/bird/${item.slug}`}>{item.name} <i>({item.species})</i></Link>
			</div>
		)
	})
	return(
		<div className="birdlist">
			<h2 className="birdlist__title">The Bird List</h2>
			{birds}
		</div>
	)
}

export default BirdList;