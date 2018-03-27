import React from 'react';
import { Link } from 'react-router-dom';

import IconButton from '../Common/IconButton';

import IconLocation from '../icons/IconLocation';
import IconHeart from '../icons/IconHeart';
import IconBubble from '../icons/IconBubble';
import IconBird from '../icons/IconBird';
import DeleteIcon from '../icons/IconCross';

const PhotoStatsBar = (props) => {
	console.log(props)
	const { likes, comments, likeHandler, slug, id, user, birdName, location } = props;
	return(
		<div className="stats-bar">
			<div className="stats-bar__wrapper">
				<div className="stats-bar__left">
					<div className="stats-bar__stat">
						<IconButton 
							type="bird"
							id={id}
							slug={slug}
						/>
						<span className="stats-bar__text">{birdName}(species)</span>
					</div>
					<div className="stats-bar__stat">			
						<IconButton 
							type="likes"
							number={likes}
							handler={likeHandler}
							id={id}
							/>
					</div>				
				</div>
				<div className="stats-bar__right">
					<div lassName="stats-bar__stat">		
						<IconButton 
							type="location"
							id={id}
						/>
						<span className="stats-bar__text">{location.get('address')}</span>											
					</div>			
				</div>
				<div className="stats-bar__comments">
					<div lassName="stats-bar__stat">	
						<button className="birdcard__button">
							<IconBubble/>
							<span className="birdcard__number">{comments}</span>
						</button>
					</div>
				</div>
			</div>								
			
		
			{/* <button className="birdcard__button" onClick={ () => likeHandler(this.props.id)}>
				<IconHeart/>
				<span className="birdcard__number">{likes}</span>
			</button>
		*/}


		{/*	<Link to={`/bird/${slug}`} className="birdcard__button">
				<IconBird/>
			</Link>						
		*/}

		</div>
	)
}

export default PhotoStatsBar;