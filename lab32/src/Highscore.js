import React, {Component} from 'react';
import './score.css'


class Highscore extends Component{
  render(){
    const listNames = this.props.AllUsers.map(
      u =>  <div className="scoreWrapper" key={u.uniqueID}>
              <div className="userInfo">{u.name}</div>
              <div>{u.score}</div>
            </div>


    )

    return(
      <div>
        <div>{listNames}</div>
      </div>
    );
  }
}

export default Highscore;
