import React, { Component } from 'react';
import './App.css';
import Nav from './Nav.js';
import firebase, { auth, provider } from './firebase.js';
import Profile from './Profile.js'
import './login.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loggedInUserId: '',
      name: ''
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
        listt.push(child.val().uniqueID);
      });
      if(listt.includes(this.state.user.uid)){
        console.log("User already in database");
      }else{
        console.log("New user - Added to database");
        firebase.database().ref('users/'+ this.state.user.uid).set({
          'name': this.state.user.displayName,
          'img': this.state.user.photoURL,
          'score': 0,
          'uniqueID': this.state.user.uid,
        });
      }
    }.bind(this));
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        this.setState({loggedInUserId: this.state.user.uid })
        //Takes a snapshot of the database and prints the username if there is someone logged in
        firebase.database().ref().child('/users/' + this.state.user.uid).once('value').then(function(snapshot) {
          let snap = snapshot.val()
          /*console.log('Välkommen: ', snap);
          this.setState({name: snap.name})*/
        }.bind(this));
      }
    });

    //Takes a snapshot of the database if triggered and changes your profile name on the website
    firebase.database().ref('/users/' + this.state.loggedInUserId).on('child_changed',function(snapshot) {
      let snap = snapshot.val()
      console.log('Välkommen: ', snap.name);
      this.setState({name: snap.name  });
    }.bind(this));
  }

  render() {
    return (
      <div>
        <div className="containerLoggedIn">
          {this.state.user ?
            <Nav
            src={this.state.user.photoURL}
            onClick={this.logout}>
            {this.state.user.displayName}
            </Nav>

            :
            <div>
            <button className="buttonLog" onClick={this.login}>Log In</button>
              <p>You must be logged in to see the potluck list and submit to it.</p>
            </div>
          } {/**  Checks if user is logged in or not **/}
        </div> {/**  End of containerLoggedIn **/}
        <Profile passUserInfo={this.state.loggedInUserId}/>
      </div>
    );
  }
}


export default App;
