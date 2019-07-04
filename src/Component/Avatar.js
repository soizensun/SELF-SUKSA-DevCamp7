import React from 'react';
import { Button, Avatar, Popover, Icon } from 'antd';
import { connect } from 'react-redux';
const {fire} = require('../redux-firebase/firebaseControl');

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

class SignOut extends React.Component {
  state = { visible: false };

  logout = () => {
    fire.auth().signOut();
    this.props.dispatch({
      type: 'SET_USER',
      payload: null
    });
  };

  showDrawer = () => {
    this.props.dispatch({
      type: 'SET_VISIBLEINPUTDRAWER',
      payload: true
    });
    this.showPopover();
  };
  

  showPopover = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    
    const content = (
      <ul style={{margin: '-10px' }}>
        <li ><Button type="primary" onClick={this.showDrawer} style={{margin:'5px', width: '95%'}}>
                <Icon type="plus" />Create New Quiz</Button></li>
        <li><Button type="primary" style={{margin:'5px',width: '95%'}}>
                <Icon type="folder" />My Created Quiz</Button></li>
        <li><Button type="primary"  style={{margin:'5px',width: '95%'}}>
                <Icon type="file-protect" />Already Done Quiz</Button></li>
        <li><Button type="danger"  style={{margin:'5px', width: '95%'}} onClick={this.logout}>
                <Icon type="export" />Sign Out</Button></li>
      </ul>
    );
    return (
      <div>
        
          <Popover placement="bottom"  content={content} visible={this.state.visible}>
          <Avatar  style={{ backgroundColor: '#87d068'}} size="large" icon="user" onClick={()=>this.showPopover()}/>
          </Popover>
        
        
        {/* <Button type="danger" onClick={this.logout}>Sign Out</Button> */}
      </div>
    )
  }
}

export default connect(mapStateToProps)(SignOut);