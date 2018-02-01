import React, { Component } from 'react';
import { instanceOf, object, bool } from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { protectedTest } from '../../ducks/auth';
import { requestPhotos, sortNewest, sortOldest, sortPopular, likePhoto } from '../../ducks/photos';
import BirdFeed from '../../components/Bird/BirdFeed';
import Loader from '../../img/Ellipsis.svg';

class BirdFeedContainer extends Component {
  constructor(props) {
    super(props);
    // this.props.protectedTest(); // do we need this?
    this.handleSort = this.handleSort.bind(this);
  }

  componentWillMount() {
    // console.log('we\'ll get a bunch of photos');
    // if(this.props.photos.size === 1 && this.props.photos.get(0).get('created_at') === null) {
    //   console.log('requesting photos loader === ' + this.props.loading)
    //   this.props.requestPhotos();
    // }    
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
    const { photos, loading } = this.props;
    return (
      <div>
        <BirdFeed photos={photos} sort={this.handleSort} user={this.props.user} likeHandler={this.props.likePhoto}/>
      </div>
    );
  }
}

BirdFeedContainer.propTypes = {
  photos: instanceOf(Immutable.List).isRequired,
  user: object,
  loading: bool.isRequired
}

function mapStateToProps(state) {
  return { 
    content: state.getIn(['auth', 'content']),
    photos: state.get('photos'),
    user: state.getIn(['auth', 'user']),
    loading: state.getIn(['loading', 'currentState']),
    message: state.getIn(['loading', 'message']) 
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

export default connect(mapStateToProps, mapDispatchToProps)(BirdFeedContainer);