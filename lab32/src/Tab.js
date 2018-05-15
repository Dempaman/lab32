import React, { Component } from 'react';
import './tabs.css'
import Profile from './Profile.js';
//import Highscore from './Highscore'
import Quiz from './Quiz.js';

class Tab extends Component{
  constructor(props){
    super(props);
    this.renderLabels = this.renderLabels.bind(this);

    this.tabList = {
      tab1:{
        label: 'Profile',
        content: "Profile"
      },

    /*  tab2:{
        label: 'Tab Two',
        content: "Highscore"
      }, */

      tab3:{
        label: 'Quiz',
        content: "Quiz"
      },
    };

    const activeTabs = 'tab1';

    this.state = {
      tabItem: this.tabList[activeTabs],
      active: activeTabs,
    };
  }

    changeTab(item, activeTabs) {
     this.setState({
       tabItem: item, //Ojbect tab1={}, tab2={} eller tab3={}
       active: activeTabs,
     });
   }

    renderLabels(event) {
      const label = Object.keys(this.tabList).map((value, index) => {

        /*
        console.log("this.state.tabItem ", this.state.tabItem)
        console.log("this.state.active ", this.state.active)
        console.log("value på våra tabs: ", value)
        console.log("index nummret på array: ",index)
        console.log("this.tabList : ", this.tabList);
        console.log("Object.keys ", Object.keys(this.tabList))
        console.log(" this.tabList[value], ",  this.tabList[value],)
        console.log(" ")
        console.log("this.tabList[value].label ", this.tabList[value].label)

        <Highscore AllUsers={this.props.AllUsers}/>

        */

        let status = '';
        if(value === this.state.active){
          status = 'active';
        }
        return (
          <div className={status} onClick={this.changeTab.bind(this, this.tabList[value], value)} key={this.tabList[value].label}>
            {this.tabList[value].label}
          </div>
        )
      });
      return label;
    }

    renderSwitch(param) {
      switch(param) {
        case 'Profile':
          return <Profile
                    passAvatars={this.props.passAvatars}
                    passUserEmail={this.props.passUserEmail}
                    passUserScore={this.props.passUserScore}
                    passUserImg={this.props.passUserImg}
                    passUserName={this.props.passUserName}
                    passUserId={this.props.passUserId}/>

          case 'Highscore':
          return //<Highscore AllUsers={this.props.AllUsers}/>

          case 'Quiz':
          return <Quiz
                  passUserScore={this.props.passUserScore}
                  passUserId={this.props.passUserId}
                  />

        default:
          return console.log("Nu var de slut...");
      }
    }

  render(){
    return(
      <div className = "wrap">
        <div className = "tabStyle" >
          <div className = "labels">{this.renderLabels()}</div>
        </div>
            {this.renderSwitch(this.state.tabItem.content)}
      </div>
    )
  }
}

export default Tab;
