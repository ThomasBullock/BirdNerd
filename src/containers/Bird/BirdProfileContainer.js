import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchBird,
  createBird,
  updateBird,
  removeBird
} from '../../ducks/bird';

import BirdProfile from '../../components/Bird/BirdProfile';

class BirdProfileContainer extends Component {
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		console.log(this.props.match.params.birdSlug);
		// dispatch(fetchBird(this.props.match.params.birdId));
		// console.log(this.props.bird);
		// this.props.dispatch(fetchBird( 'type': 'FETCH_BIRD', this.props.match.params.birdId));
		console.log(fetchBird('eagle'));
		console.log(this)
	}
	
	render() {
		const birdInfo = {
			name: 'Wedge Tailed Eagle',
			species: 'Aquila audax',
			locations: ['Australia', 'Papua New Guinea'],
			conservationStatus: 'Least Concern',
			image: 'http://cdn.natgeotv.com.au/factsheets/thumbnails/wedgetailedeagle_wedgetailedeagle.jpg?v=27&azure=false&scale=both&width=1024&height=560&mode=crop',
			uploads: []
		}		
		// console.log(birdInfo);
		return (
			<BirdProfile birdInfo={birdInfo}/>
		)
	}
}

const mapStateToProps = (state) => {
	console.log(state.get('bird'))
	return {
		bird: state.get('bird')
	}
}

const mapDispatchToProps = (dispatch) => {
	// console.log(dispatch);
  return {
    fetchBird: () => dispatch(fetchBird()),
    createBird: (bird) => dispatch(createBird(bird)),
    updateBird: (bird) => dispatch(updateBird(bird)),
    removeBird: (bird) => dispatch(removeBird(bird))
  }; // here we're mapping actions to props	
}

export default connect(mapStateToProps, mapDispatchToProps)(BirdProfileContainer);