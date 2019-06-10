import React, { Component } from 'react';
import './cssFile/App.css';
import firebase from 'firebase';
import SiderDemo from './Component/SiderDemo'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      
    }
  }
  componentDidMount(){

  }

  render(){
    return (
      <div className="App">
        Hello
        World

        <SiderDemo/>
      </div>
    );
  }
}

export default App;

