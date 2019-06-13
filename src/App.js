import React from 'react';
import './cssFile/App.css';
import Layout from './Component/Layout'

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
        <Layout/>
      </div>
    );
  }
}

export default App;

