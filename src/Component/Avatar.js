import React from 'react';
import { Button, Avatar, Popover } from 'antd';
const {fire} = require('../redux-firebase/firebaseControl');


class SignOut extends React.Component {

  logout() {
    fire.auth().signOut();
  }
  
  render() {
    const content = (
      <div>
        <p><Button type="primary" >Create New Quiz</Button></p>
        <p><Button type="primary" >My Created Quiz</Button></p>
        <p><Button type="primary" >Already Done Quiz</Button></p>
        <Button type="danger" onClick={this.logout}>Sign Out</Button>
      </div>
    );
    return (
      <div>
        
          <Popover placement="bottom"  content={content} trigger="click" >
          <Avatar  style={{ backgroundColor: '#87d068',padding: 8 }} size="large" icon="user"/>
          </Popover>
        
        
        {/* <Button type="danger" onClick={this.logout}>Sign Out</Button> */}
      </div>
    )
  }
}

export default SignOut;