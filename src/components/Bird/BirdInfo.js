import React, { Component } from 'react';
import '../../styles/css/components/BirdInfo.css';

class BirdInfo extends Component {

	render() {
		// temp info object
		const birdInfo = {
			name: 'Wedge Tailed Eagle',
			species: 'Aquila audax',
			location: ['Australia', 'Papua New Guinea'],
			conservationStatus: 'Least Concern',
			image: 'http://www.richardhallphotography.com/wp-content/uploads/galleries/post-1432/full/2013-09-30_IMG_7547_Wedge-tailed_Eagle_WEB_1200px.jpg',
			uploads: []
		}
		return(
			<div className="birdinfo">
				<div className="birdinfo__image-wrapper">
					<img src={birdInfo.image} alt=""/> 
				</div>
				<div className="birdinfo__facts">
					<h2>{birdInfo.name}</h2>
					<p><strong>Species: </strong>{birdInfo.species}</p>
					<p><strong>Locations: </strong>{birdInfo.location[0]}</p>
					<p><strong>Conservation Status: </strong>{birdInfo.conservationStatus}</p>
					<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, 
					by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, 
					you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet 
					tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
				</div>
			</div>
		)
	}
}


export default BirdInfo;