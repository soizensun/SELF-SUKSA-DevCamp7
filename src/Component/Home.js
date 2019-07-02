import React from 'react';
const {fire} = require('../redux-firebase/firebaseControl');


class Home extends React.Component {

  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        You Are Logged In
        <button onClick = {this.logout}>Logout</button>
      </div>
    )
  }
}

export default Home;