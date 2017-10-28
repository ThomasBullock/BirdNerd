import React, { Component } from 'react';
import '../../styles/css/components/BirdCard.css';
import { Link } from 'react-router-dom';
import IconLocation from '../icons/IconLocation';
import IconHeart from '../icons/IconHeart';
import IconBubble from '../icons/IconBubble';
import IconBird from '../icons/IconBird';

class BirdCard extends Component {
    //console.log(props.match.params);
		render() {
			const userImg = 'http://3.bp.blogspot.com/-dXOvZOVDhes/Ts99nTenjtI/AAAAAAAAA2A/It9Ymliw4t4/s1600/26.jpg';
			const orientation = this.props.orientation;
			return(
				<div className={`birdcard birdcard--${orientation}`}>
					<div className={`birdcard__photo birdcard__photo--${orientation}`}>
						<button style={{'backgroundImage': `url(${userImg})`}} className="birdcard__button birdcard__button--user"></button>
						<img src={this.props.img} alt={this.props.name}/>
					</div>
					<div className={`birdcard__stats birdcard__stats--${orientation}`}>
						<button className="birdcard__button">
							<IconLocation/>
						</button>
						<button className="birdcard__button">
							<IconHeart/>
							<span className="birdcard__number">{this.props.likes}</span>
						</button>
						<button className="birdcard__button">
							<IconBubble/>
							<span className="birdcard__number">{this.props.comments}</span>
						</button>
						<Link to={`/bird/${this.props.slug}`} className="birdcard__button">
							<IconBird/>
						</Link>					
					</div>				
				</div>
			)
		}
}

export default BirdCard;
