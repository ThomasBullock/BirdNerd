import React from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

import moment from 'moment';

import IconButton from '../Common/IconButton';

import IconLocation from '../icons/IconLocation';
import IconHeart from '../icons/IconHeart';
import IconBubble from '../icons/IconBubble';
import IconBird from '../icons/IconBird';
import DeleteIcon from '../icons/IconCross';
import EditIcon from '../icons/IconFeather';


// Duplicate code also in Homepage to be improved!
const userPermission = (user, photo) => {
	console.log(user, photo)
	if(user && user.get('role') === 'moderator') {
		return true;
	} else if (user && photo.getIn(['user', '_id']) === user.get('_id')) {
		return true;
	} else {
		return false;
	}
}

const deleteAlert = (birdName, deleteHandler, id) => {
	swal({
	  title: "Are you sure?",
	  text: "Once deleted, you will not be able to recover this bird photo!",
	  icon: "warning",
	  buttons: true,
	  dangerMode: true,
	})
	.then((willDelete) => {
	  if (willDelete) {
			deleteHandler(id);	 
	  } else {
	    swal(`The ${birdName} photo is safe!`);
	  }
	});
}

const PhotoUserBar = (props) => {
	// console.log(props)
	// console.log(props.user.get('_id'))
	const { id, user, uploadDate, deleteHandler, birdName, slug, owner, photoUser } = props;
	// console.log(user.getIn([profile]))
	const userRole = (user) ? user.get('role') : null;
	return(
		<div className="user-bar">
			<div className="user-bar__wrapper">
				<button style={{'backgroundImage': `url(${photoUser.get('gravatar')})`, backgroundSize: 'cover' }} className="birdcard__button"></button>

				{ (userRole === 'moderator' || owner ) &&
					<button className="birdinfo__btn birdinfo__btn--edit">
							<Link to={`/bird/photo/${slug}/edit`}>
								<EditIcon />
							</Link>			
					</button>			
				}		
				<div className="user-bar__title">
					<h3>Uploaded by {photoUser.get('userName')} on {moment(uploadDate).format('MMMM Do YYYY')}</h3>	
				</div>
		


				{ (userRole === 'moderator' || owner ) &&
					<button className="birdinfo__btn" onClick={() => deleteAlert(birdName, deleteHandler, id) }>
							<DeleteIcon />
					</button>			
				}
			</div>	
		</div>
	)
}

export default PhotoUserBar;