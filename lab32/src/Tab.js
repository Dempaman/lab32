import React, { Component } from 'react';
import './tabs.css'
import Profile from './Profile.js';
import Highscore from './Highscore';

class Tab extends Component{
  constructor(props){
    super(props);
    this.renderLabels = this.renderLabels.bind(this);

    this.tabList = {
      tab1:{
        label: 'Tab One',
        content: "Profile"
      },

      tab2:{
        label: 'Tab Two',
        content: "Highscore"
      },

      tab3:{
        label: 'Tab Three',
        content: false
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
            passUserImg={this.props.passUserImg}
            passUserName={this.props.passUserName}
            passUserId={this.props.passUserId}/>
          case 'Highscore':
          return <Highscore AllUsers={this.props.AllUsers}/>
        default:
          return console.log("Här ska sista delen vara");
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
