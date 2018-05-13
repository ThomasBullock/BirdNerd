import React, { Component } from 'react';
import { instanceOf, object, bool } from 'prop-types';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import {Helmet} from "react-helmet";

// import TopBar from '../TopBar';
import { protectedTest } from '../../ducks/auth';
import { requestPhotos, sortNewest, sortOldest, sortPopular, likePhoto } from '../../ducks/photos';
import { requestUsers } from '../../ducks/users';
import BirdFeed from '../../components/Bird/BirdFeed';
import Loader from '../../img/Ellipsis.svg';

class BirdFeedContainer extends Component {
  constructor(props) {
    super(props);
    // this.props.protectedTest(); // do we need this?
    this.handleSort = this.handleSort.bind(this);
  }

  componentWillMount() {
    if(this.props.birdNerds.size === 0) {
      this.props.requestUsers();      
    }
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
    // console.log(this.props)
    const { photos, loading, photosPerPage, feedPage } = this.props;
    const skip = photosPerPage * feedPage;
    const feedPhotos = Immutable.fromJS([...photos.slice( skip, (skip + photosPerPage) )]);
    // console.log(feedPhotos)
    return (
      <div>
        <BirdFeed photos={feedPhotos} sort={this.handleSort} user={this.props.user} likeHandler={this.props.likePhoto} totalPhotos={this.props.photos.size}/>
        <Helmet>
            <title>BirdFeed</title>
        </Helmet>
      </div>
    );
  }
}

BirdFeedContainer.propTypes = {
  photos: instanceOf(Immutable.List).isRequired,
  user: object,
  loading: bool.isRequired
}

function mapStateToProps(state, props) {
  return { 
    content: state.getIn(['auth', 'content']),
    photos: state.get('photos'),
    user: state.getIn(['auth', 'user']),
    loading: state.getIn(['loading', 'currentState']),
    message: state.getIn(['loading', 'message']),
    birdNerds: state.get('users'),
    feedPage: state.getIn(['ui', 'feedPage']),
    photosPerPage: state.getIn(['ui', 'photosPerPage']),
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestPhotos: (query) => dispatch(requestPhotos(query)),
    sortNewest: () => dispatch(sortNewest()),
    sortOldest: () => dispatch(sortOldest()),
    sortPopular: () => dispatch(sortPopular()),
    likePhoto: (photo) => dispatch(likePhoto(photo)),
    requestUsers: () => dispatch(requestUsers()),    
  }; // here we're mapping actions to props 
}

export default connect(mapStateToProps, mapDispatchToProps)(BirdFeedContainer);