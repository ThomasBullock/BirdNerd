// import React from 'react';
import React, { Component } from 'react';
import '../../styles/css/components/BirdCard.css';

import IconLocation from '../icons/IconLocation';
import IconHeart from '../icons/IconHeart';
import IconBubble from '../icons/IconBubble';
import IconBird from '../icons/IconBird';

class BirdCard extends Component {
    //console.log(props.match.params);
		render() {
			const orientation = this.props.orientation;
			return(
				<div className={`birdcard birdcard--${orientation}`}>
					<div className={`birdcard__photo birdcard__photo--${orientation}`}>
						<img src={this.props.img}/>
					</div>
					<div className={`birdcard__stats birdcard__stats--${orientation}`}>
						<span>
							<IconLocation/>
						</span>
						<span>
							<IconHeart/>
						</span>
						<span>
							<IconBubble/>
						</span>
						<span>
							<IconBird/>
						</span>					
					</div>				
				</div>
			)
		}
}

export default BirdCard;
