import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './firebase.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      uid: []
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
    this.addUserInfoToFirebase();
    });
  }

  addUserInfoToFirebase(){
    let db = firebase.database();

    db.ref('users/').on('child_added', function(snapshot) {
      let val = snapshot.val()
      let valuid = val.uid;
      let newArray = this.state.uid.slice();

      newArray.push(valuid);
      this.setState({uid:newArray})

      //console.log("this.state.user.uid -->", this.state.uid)



      if(valuid.indexOf(this.state.user.uid)){
      //  console.log("loop?")
        //this.userInfo();
        return
      }


    }.bind(this));

  }

  userInfo(){
    let db = firebase.database();
    db.ref('users/').push({
    'name': this.state.user.displayName,
    'img': this.state.user.photoURL,
    'score': 0,
    'uid': this.state.user.uid,
    });
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
        <div>
          {this.state.user ?
            <button onClick={this.logout}>Log Out</button>
            :
            <button onClick={this.login}>Log In</button>
          }
        </div>
        <div>
        {this.state.user ?
          <div>
            <div>
              <img src={this.state.user.photoURL} alt="finns ingen bild hehhe"/>
            </div>
          </div>
          :
          <div>
            <p>You must be logged in to see the potluck list and submit to it.</p>
          </div>
        }
        </div>

      </div>

    );
  }
}


export default App;
