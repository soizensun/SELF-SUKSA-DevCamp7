import React, { Component } from 'react'
import 'antd/dist/antd.css';
import '../cssFile/SiderDemo.css';
import AllQuestion from './AllQuestion';
import InputQuestion from './InputQuestion';
import { Layout, Icon, Drawer, Button } from 'antd';
import SubjectsMenu from './SubjectsMenu';
import SignIn from './SignIn';
import SignOut from './SignOut';
import '../cssFile/Layout.css';
const {fire} = require('../redux-firebase/firebaseControl');

const { Header, Content, Footer , Sider} = Layout;

export class SiderDemo extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      tag: "",
      user:{},
    }
    this.authListener = this.authListener.bind(this);
  }
  componentDidMount() {
    this.authListener();
  }

  //==================================== DrawerAction
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  //=================================================

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        console.log('user: ', user);
        
      } else {
        this.setState({ user: null });
      }
    })
  }
  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      
    <div className= "header_tool">
        <nav className= "header_bar">
          <div className= "header_logo">
              APP NAME
          </div>
          <div className= "login">
            { this.state.user ? <SignOut/> : ( <SignIn /> ) }
          </div>
        </nav>
            
        <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
          >
            <SubjectsMenu/>
          </Sider>
          
          <Layout>
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 1000 }}>
                {/* <i class="fas fa-biohazard fa-5x"></i> */}
                <AllQuestion />
                <Button type="primary" onClick={this.showDrawer}>
                  <Icon type="plus" /> add new question
                </Button>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>footer</Footer>
          </Layout>

        </Layout>


        <Drawer
          title="Create a new account"
          width={'65%'}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <InputQuestion />
          <div
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              // borderTop: '1px solid #e9e9e9',
              padding: '10px 16px',
              background: '#fff',
              textAlign: 'right',
            }}
          >
          </div>
        </Drawer>

      </div>
    )
  }
}

export default SiderDemo;