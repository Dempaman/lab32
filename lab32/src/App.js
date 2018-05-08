import React, { Component } from 'react';
import './App.css';
import Nav from './Nav.js';
import firebase, { auth, provider } from './firebase.js';


class App extends Component {
  constructor(props) {
    super(props);


    this.state = {
      user: null,
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

  }
  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }
  //Google Login
  login() {
    auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({user});
      console.log('Välkommen: ', this.state.user.displayName)
      this.addUserInfoToFirebase();
    });
  }


  addUserInfoToFirebase(uidUser){
    firebase.database().ref().child('/users/').once('value').then(function(snapshot) {
      let listt = [];
      snapshot.forEach(function(child) {
        listt.push(child.val().uid);
      });
      if(listt.includes(this.state.user.uid)){
        console.log("User already in database");
      }else{
        console.log("New user - Added to database");
        firebase.database().ref('users/').push({
          'name': this.state.user.displayName,
          'img': this.state.user.photoURL,
          'score': 0,
          'uid': this.state.user.uid,
        });
      }
    }.bind(this));
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  render() {
    return (
      <div>
        <div className="containerLoggedIn">
          {this.state.user ?
            <Nav src={this.state.user.photoURL} onClick={this.logout}/>
            :
            <div>
            <button className="buttonLog" onClick={this.login}>Log In</button>
              <p>You must be logged in to see the potluck list and submit to it.</p>
            </div>
          } {/**  Checks if user is logged in or not **/}
        </div> {/**  End of containerLoggedIn **/}
      </div>
    );
  }
}


export default App;
