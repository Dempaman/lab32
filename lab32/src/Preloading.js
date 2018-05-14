import React, { Component } from 'react';
import './preloading.css'
class Preloading extends Component{
  render(){
    return(
      <div className="backgroundCover">
        <div className="spinner">
          <div className="dot1"></div>
          <div className="dot2"></div>
        </div>
      </div>
    )
  }
}

export default Preloading;
