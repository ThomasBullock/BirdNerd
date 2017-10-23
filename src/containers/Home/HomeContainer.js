import React, { Component } from 'react';
import { connect } from 'react-redux';

// import TopBar from '../TopBar';
import { protectedTest } from '../../ducks/auth';
import { requestPhotos } from '../../ducks/photos';
import HomePage from '../../components/Home/HomePage';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    // this.props.protectedTest(); // do we need this?
    this.orderBirdCards = this.orderBirdCards.bind(this);
  }

  componentDidMount() {
    console.log('we\'ll get a bunch of photos');
    // if props.params.path === '/' get recent 
    console.log(this.props.match.path);
    if(this.props.match.path === '/') {
      this.props.getRecent('recent');
    } else {
      this.props.getRecent('recent');
    }
    
    // otherwise get props.params.path
  }
  
  orderBirdCards(query) {
    this.props.getRecent(query)
  }

  renderContent() {
    if(this.props.content) {
      return (
        <p>{this.props.content}</p>
      );
    }
  }
  render() {
    const { photos } = this.props;
    return (
      <div >
        {photos ? (<HomePage photos={photos} sort={this.orderBirdCards}/>) : (
          <h2>Loading</h2>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    content: state.getIn(['auth', 'content']),
    photos: state.get('photos') 
    
  };
}

const mapDispatchToProps = (dispatch) => {
  console.log(dispatch);
  return {
    getRecent: (query) => dispatch(requestPhotos(query))
  }; // here we're mapping actions to props 
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);