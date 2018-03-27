import React, { Component } from 'react';
import { instanceOf, object, string, number, func, bool } from 'prop-types';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import IconButton from '../Common/IconButton';
import IconBubble from '../icons/IconBubble';
import IconBird from '../icons/IconBird';
import DeleteIcon from '../icons/IconCross';
import { deletePhoto } from  '../../ducks/photos';
import { cloudinaryUrlModify, aspectRatio, aspectRatioClass } from '../../clientHelpers';
import swal from 'sweetalert';


class BirdCard extends Component {
		constructor(props) {
			super(props);
			this.handleDelete = this.handleDelete.bind(this);
		}

		handleDelete() {
			// console.log(deleteBird)
			swal({
			  title: "Are you sure?",
			  text: "Once deleted, you will not be able to recover this photo!",
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
					this.props.dispatch(deletePhoto(this.props.public_id));
			  } else {
			    swal(`This ${this.props.name} photo is safe!`);
			  }
			});			

		}
		render() {
			const userImg = 'http://3.bp.blogspot.com/-dXOvZOVDhes/Ts99nTenjtI/AAAAAAAAA2A/It9Ymliw4t4/s1600/26.jpg';
			const orientation = this.props.orientation;
			const aspect = aspectRatioClass(this.props.orientation);
			const image = (orientation === 'Portrait') ? 
				this.props.img && cloudinaryUrlModify(this.props.img.split('/'), 'w_640') :
				this.props.img && cloudinaryUrlModify(this.props.img.split('/'), 'w_720')
			return(
				<div className={`birdcard birdcard--${aspect}`}>
					<div className={`birdcard__photo birdcard__photo--${aspect}`}>
						<button style={{'backgroundImage': `url(${this.props.gravatar})`}} className="birdcard__button--user"></button>
						{this.props.owner && <button onClick={this.handleDelete} className="birdcard__button birdcard__button--delete">
							<DeleteIcon />
						</button>
						}
						<Link to={`/bird/photo/${this.props.id}`} >
							<img src={image} alt={this.props.name}/>
						</Link>
					</div>
					<div className={`birdcard__stats birdcard__stats--${aspect}`}>
						<IconButton 
							type="location"
							id={this.props.id}
						/>	
						<IconButton 
							type="likes"
							number={this.props.likes}
							handler={this.props.likeHandler}
							id={this.props.id}							
						/>
						<button className="birdcard__button">
							<IconBubble/>
							<span className="birdcard__number">{this.props.comments}</span>
						</button>	
						<IconButton 
							type="bird"
							id={this.props.id}
							slug={this.props.slug}
						/>			
					</div>				
				</div>
			)
		}
}

BirdCard.propTypes = {
	id: string.isRequired,
	orientation: string.isRequired,
	slug: string.isRequired,
	likes: number.isRequired,
	img: string.isRequired,
	public_id: string.isRequired,
	owner: bool.isRequired, // would it be more efficient to pass _id's directly rather then maps??
	userID: string.isRequired,
	gravatar: string.isRequired,
	likeHandler: func.isRequired		
}

export default connect()(BirdCard);
