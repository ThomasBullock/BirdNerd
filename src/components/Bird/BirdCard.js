import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import IconLocation from '../icons/IconLocation';
import IconHeart from '../icons/IconHeart';
import IconBubble from '../icons/IconBubble';
import IconBird from '../icons/IconBird';
import DeleteIcon from '../icons/IconCross';
import { deletePhoto } from  '../../ducks/photos';
import { cloudinaryUrlModify } from '../../clientHelpers';

class BirdCard extends Component {
		constructor(props) {
			super(props);
			this.handleDelete = this.handleDelete.bind(this);
		}

		handleDelete() {
			this.props.dispatch(deletePhoto(this.props.public_id));
		}
		render() {
			const userImg = 'http://3.bp.blogspot.com/-dXOvZOVDhes/Ts99nTenjtI/AAAAAAAAA2A/It9Ymliw4t4/s1600/26.jpg';
			const orientation = this.props.orientation;
			const image = (orientation === 'Portrait') ? 
				this.props.img && cloudinaryUrlModify(this.props.img.split('/'), 'w_640') :
				this.props.img && cloudinaryUrlModify(this.props.img.split('/'), 'w_720')
			return(
				<div className={`birdcard birdcard--${orientation}`}>
					<div className={`birdcard__photo birdcard__photo--${orientation}`}>
						<button style={{'backgroundImage': `url(${this.props.gravatar})`}} className="birdcard__button--user"></button>
						{this.props.owner && <button onClick={this.handleDelete} className="birdcard__button birdcard__button--delete">
							<DeleteIcon />
						</button>
						}
						<img src={image} alt={this.props.name}/>
					</div>
					<div className={`birdcard__stats birdcard__stats--${orientation}`}>
						<button className="birdcard__button">
							<IconLocation/>
						</button>
						<button className="birdcard__button" onClick={ () => this.props.likeHandler(this.props.id)}>
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

export default connect()(BirdCard);
