import React from 'react';
import { Button } from 'antd';
const {fire} = require('../redux-firebase/firebaseControl');

class SignOut extends React.Component {

  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <div>
        <Button type="danger" onClick={this.logout}>Sign Out</Button>
      </div>
    )
  }
}

export default SignOut;