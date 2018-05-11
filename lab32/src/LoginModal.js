import React, { Component } from 'react';
import './LoginModal.css';

class LoginModal extends Component{
  constructor(props){
    super(props)
    this.state ={
      landingTxt: "QUIZ OF LEGENDS"
    }
  }
  render(){
    return(
      <div>
        <div className="txtWrap">
          <h4>{this.state.landingTxt}</h4>
        </div >
        <div className="loginWrap">
          <button className="loginBtn" onClick={this.props.passLogin}>Log in</button>
        </div>
      </div>
    )
  }
}

export default LoginModal;
