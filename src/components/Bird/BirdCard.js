import React, { Component } from 'react';
import { instanceOf, object, string, number, func, bool } from 'prop-types';
import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import IconLocation from '../icons/IconLocation';
import IconHeart from '../icons/IconHeart';
import IconBubble from '../icons/IconBubble';
import IconBird from '../icons/IconBird';
import DeleteIcon from '../icons/IconCross';
import { deletePhoto } from  '../../ducks/photos';
import { cloudinaryUrlModify } from '../../clientHelpers';
import swal from 'sweetalert';

// const deleteAlert = (birdInfo, deleteBird) => {
// 	console.log(deleteBird)
// 	// deleteBird(birdId)
// 	swal({
// 	  title: "Are you sure?",
// 	  text: "Once deleted, you will not be able to recover this bird profile!",
// 	  icon: "warning",
// 	  buttons: true,
// 	  dangerMode: true,
// 	})
// 	.then((willDelete) => {
// 	  if (willDelete) {
// 	    // swal("Poof! Your imaginary file has been deleted!", {
// 	    //   icon: "success",
// 	    // });
// 	    console.log(' will delete')
// 			deleteBird(birdInfo.get('_id'));	 
// 	  } else {
// 	    swal(`The ${birdInfo.get('name')} profile is safe!`);
// 	  }
// 	});
// }

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
