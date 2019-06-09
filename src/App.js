import React, { Component } from 'react';
import './cssFile/App.css';
import firebase from 'firebase';
import App1 from './Component/App1';
import SiderDemo from './Component/SiderDemo'
// import {CONFIGfirebase} from './Config.js';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      name: "millizenn"
    }
  }

  componentDidMount(){
    // connect firebase in react ref
    // child has not an attribute
    const rootRef1 = firebase.database().ref().child('child_reactTable1');
    const rootRef2 = firebase.database().ref().child('child_reactTable2');

    // maybe name of attribute
    const nameRef = rootRef1.child('name');
    const petRef = rootRef2.child('pet');

    // on for allow sync database on realtime
    nameRef.on('value', snap => {
      this.setState({
        name : snap.val()
      })
    });
  }

  render(){
    return (
      <div className="App">
        {/* this name is {this.state.name} */}
        {/* <App1/> */}
        <SiderDemo/>
      </div>
    );
  }

}

export default App;

