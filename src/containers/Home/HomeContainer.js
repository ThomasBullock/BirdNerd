import React, { Component } from 'react';
import { connect } from 'react-redux';

// import TopBar from '../TopBar';
import { protectedTest } from '../../ducks/auth';
import { requestPhotos, sortNewest, sortOldest, sortPopular, likePhoto } from '../../ducks/photos';
import HomePage from '../../components/Home/HomePage';

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    // this.props.protectedTest(); // do we need this?
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    console.log('we\'ll get a bunch of photos');
    this.props.requestPhotos();
    // this.props.sortNewest();

  }
  
  handleSort(sort) {
    switch(sort) {
      case 'Newest': 
        this.props.sortNewest();
        break;
      case 'Oldest':
        this.props.sortOldest();
        break;
      case 'Popular': 
        this.props.sortPopular();
        break;       
      default:
        this.props.sortNewest();
    }
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
      <div>
        {photos ? (<HomePage photos={photos} sort={this.handleSort} user={this.props.user} likeHandler={this.props.likePhoto}/>) : (
          <h2>Loading</h2>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    content: state.getIn(['auth', 'content']),
    photos: state.get('photos'),
    user: state.getIn(['auth', 'user']) 
    
  };
}

const mapDispatchToProps = (dispatch) => {
  // console.log(dispatch);
  return {
    requestPhotos: (query) => dispatch(requestPhotos(query)),
    sortNewest: () => dispatch(sortNewest()),
    sortOldest: () => dispatch(sortOldest()),
    sortPopular: () => dispatch(sortPopular()),
    likePhoto: (photo) => dispatch(likePhoto(photo))
  }; // here we're mapping actions to props 
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);