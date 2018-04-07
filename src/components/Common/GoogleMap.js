import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import IconBird from '../icons/IconBird';

const AnyReactComponent = ({ text }) => <div className="map__label">{text}</div>;
const Marker = () => (
  <svg className="map__marker">
    <path d="M40 99.5 C-22.5 57.5 0 0 40 0.5 C80 0 102.5 57.5 40 99.5z" strokeWidth="3" stroke="#333" fill="rgba(255, 255, 255, .5)"/>
    <IconBird x="5%" y="10%"/>
  </svg>)

const GoogleAPI = process.env.GOOGLE_MAPS_API;

class PhotoMap extends Component {
  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 10
  };

  render() {
    console.log(typeof this.props.location.get('coordinates').get(0));
    const center = {
      lat: this.props.location.get('coordinates').get(1),
      lng: this.props.location.get('coordinates').get(0)
    }
    console.log(this.props.center, center)
    return (
      <div className="map__wrapper">
        <GoogleMapReact
          bootstrapURLKeys={{ key: [GoogleAPI] }}
          defaultCenter={center}
          defaultZoom={11}
        >
          <AnyReactComponent 
            text={this.props.location.get('address')}
          />
          <Marker 
            lat={center.lat}
            lng={center.lng}
          />
        </GoogleMapReact>
      </div>  
    );
  }
}

export { PhotoMap };