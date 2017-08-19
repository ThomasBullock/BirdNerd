import React, { Component } from 'react';
import '../../styles/css/components/BirdInfo.css';
// import BirdWings from '../../img/BirdWings.svg';
import BirdWings from '../icons/BirdWings';

class BirdInfo extends Component {

	render() {
		// temp info object
		const birdInfo = {
			name: 'Wedge Tailed Eagle',
			species: 'Aquila audax',
			locations: ['Australia', 'Papua New Guinea'],
			conservationStatus: 'Least Concern',
			image: 'http://cdn.natgeotv.com.au/factsheets/thumbnails/wedgetailedeagle_wedgetailedeagle.jpg?v=27&azure=false&scale=both&width=1024&height=560&mode=crop',
			uploads: []
		}
		const locations = birdInfo.locations.join(', ') 
		const heroImg = `url(${birdInfo.image})`;
		console.log(heroImg);
		return(
			<div className="birdinfo">
				<div className="birdinfo__hero" style={{'backgroundImage': `url(${birdInfo.image})`}}>
					
				</div>
				<div className="birdinfo__card">
					<div className="birdinfo__facts">
						<div className="birdinfo__wings">
							{/*	<img src={BirdWings} alt="Bird Wings"/> */}
							<BirdWings /> 
						</div>
						<div className="birdinfo__heading">
							<h2>{birdInfo.name}</h2>							
						</div>
						<p><strong>Species: </strong>{birdInfo.species}</p>
						<p><strong>Locations: </strong>{locations}</p>
						<p><strong>Conservation Status: </strong>{birdInfo.conservationStatus}</p>
						<p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, 
						by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, 
						you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet 
						tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.</p>
					</div>
				</div>				
				<div className="birdinfo__body">		

				</div>	
			</div>
		)
	}
}


export default BirdInfo;