import React from 'react';
import { Button, Avatar, Popover } from 'antd';
import { connect } from 'react-redux';
const {fire} = require('../redux-firebase/firebaseControl');

class SignOut extends React.Component {

  logout() {
    fire.auth().signOut();
    this.props.dispatch({
      type: 'SET_USER',
      payload: null
    })
  }

  showDrawer = () => {
    this.props.dispatch({
      type: 'SET_VISIBLEINPUTDRAWER',
      payload: true
    });
  };
  
  render() {
    
    const content = (
      <div>
        <p><Button type="primary" onClick={this.showDrawer}>Create New Quiz</Button></p>
        <p><Button type="primary" >My Created Quiz</Button></p>
        <p><Button type="primary" >Already Done Quiz</Button></p>
        <Button type="danger" onClick={this.logout}>Sign Out</Button>
      </div>
    );
    return (
      <div>
        
          <Popover placement="bottom"  content={content} onClick='click' >
          <Avatar  style={{ backgroundColor: '#87d068'}} size="large" icon="user"/>
          </Popover>
        
        
        {/* <Button type="danger" onClick={this.logout}>Sign Out</Button> */}
      </div>
    )
  }
}

export default connect()(SignOut);