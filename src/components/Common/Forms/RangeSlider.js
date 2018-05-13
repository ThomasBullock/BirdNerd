import React, { Component, Fragment} from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

class RangeSlider extends Component {
  
    render() {
        const { input: { value, onChange, name }, label, type, className, placeholder, meta: { touched, error }  } = this.props;
        const minOrMax = name.split("-")[1]
        return (
            <Fragment>
                <input {...this.props.input} className={className} type="range" value={value} name={name} id="wingspan-min"  min="6" max="365" onChange={onChange}/>
                <span className={`form__dual-slider--${minOrMax}`}> {this.props.input.value}</span>
            </Fragment>
      );
    }
  }

export default RangeSlider;