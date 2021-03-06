import React from 'react';
import { Link } from 'react-router-dom';
import { indexBy } from '../../clientHelpers';
import moment from 'moment';

import UserListComponent from '../Common/UserListComponent'; 
import IconButton from '../Common/IconButton';

import IconLocation from '../icons/IconLocation';
import IconHeart from '../icons/IconHeart';
import IconBubble from '../icons/IconBubble';
import IconBird from '../icons/IconBird';
import IconCalendar from '../icons/IconCalendar';
import DeleteIcon from '../icons/IconCross';


const renderComments = (comments) => {
	return comments.map( (comment, i) => {
		return(
				<li key={i} className="stats-bar__comments-item">
					<IconButton 
						type="bird"
					/>			
					<span>{comment.get('text')}</span>
				</li>
			)		
	})
}

const PhotoStatsBar = (props) => {
	const { likes, comments, likeHandler, slug, id, user, birdData, location, camera, dateTaken, birdNerds } = props;
	const commentsVisible = (comments.size > 0) ? true : false;
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
						{(birdData) ? (
							<span className="stats-bar__text">{birdData.get('name')} ({birdData.get('species')})</span>
						) : (
							<span className="stats-bar__text">Unknown</span>
						)
													
						}

					</div>
					<div className="stats-bar__stat">			
						<IconButton 
							type="likes"
							number={likes.size}
							handler={likeHandler}
							id={id}
							/>
						{likes && <UserListComponent user={user} likers={likes}/>
						}
					</div>
					<div className="stats-bar__stat">		
						<IconButton 
							type="camera"
							id={id}
						/>
						{(!camera) ? (
							<span className="stats-bar__text">No camera info available for this photo</span>	
							) : (
						<span className="stats-bar__text">This photo was taken with a {camera}</span>	
						)
						
						}
																
					</div>										
				</div>
				<div className="stats-bar__right">
					<div className="stats-bar__stat">		
						<IconButton 
							type="location"
							id={id}
						/>
						<span className="stats-bar__text">{location.get('address')}</span>											
					</div>
					<div className="stats-bar__stat">		
						<IconButton 
							type="calendar"
							id={id}
						/>
						{(dateTaken) ? (
							<span className="stats-bar__text">{moment(dateTaken).format('MMMM Do YYYY, h:mm a')}</span> 
						) : ( 
							<span className="stats-bar__text">No date available</span>
						)
						}										
					</div>									
				</div>
				<div className="stats-bar__comments">
					<div className="stats-bar__stat--last">	
						<IconButton 
							type="comments"
							number={comments.size}
							id={id}
							/>
						<span className="stats-bar__text">{comments.size} BirdNerds have commented on this photo</span>
					</div>
					{commentsVisible && 
						<ul className="stats-bar__comments-list">
							{renderComments(comments)}
						</ul>
					}
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