import React, { Component } from 'react';
import './login.css'

class Login extends Component{
  constructor(props){
    super(props);
    this.loginClick = this.loginClick.bind(this);
    this.logoutClick = this.logoutClick.bind(this);

    this.state = {isLoggedIn: false}
  }

  loginClick(){
    this.setState({isLoggedIn: true});
  }

  logoutClick(){
    this.setState({isLoggedIn: false});
  }

  render(){
    let isLoggedIn = this.state.isLoggedIn
    let button = null;
    if(isLoggedIn){
      button = <LogoutButton onClick = {this.logoutClick} />
    }else{
      button = <LoginButton onClick = {this.loginClick} />
    }

    return(
      <div >
        <div className = "loginDiv" > {button} </div>
      </div>

    );
  }
}

function LoginButton(props){
  return (
    <button className = "loginStyle" onClick={props.onClick}>Login </button>
  );
}

function LogoutButton(props){
  return (
    <button className = "loginStyle" onClick={props.onClick}>Logout</button>
  );
}


export default Login;
