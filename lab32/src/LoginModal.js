import React, { Component } from 'react';
import './LoginModal.css';

class LoginModal extends Component{
  constructor(props){
    super(props)
    this.state ={
      landingTxt: "< QUIZ OF LEGENDS >"
    }
  }
  render(){
    return(
      <div className="modalWrap">
        <h4>{this.state.landingTxt}</h4>
      </div>
    )
  }
}

export default LoginModal;
