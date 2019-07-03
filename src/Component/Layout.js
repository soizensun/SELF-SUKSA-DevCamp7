import React, { Component } from 'react'
import 'antd/dist/antd.css';
import '../cssFile/SiderDemo.css';
import AllQuestion from './AllQuestion';
import InputQuestion from './InputQuestion';
import { Layout, Icon, Drawer, Button } from 'antd';
import SubjectsMenu from './SubjectsMenu';
import SignIn from './SignIn';
import Avatar from './Avatar';
import '../cssFile/Layout.css';
import { connect } from 'react-redux';
const {fire} = require('../redux-firebase/firebaseControl');

const { Header, Content, Footer , Sider} = Layout;

const mapStateToProps = (state) => {
  return {
    visibleInputDrawer: state.visibleInputDrawer 
  }
}

export class SiderDemo extends Component {
  constructor() {
    super();
    this.state = {
      user:{},
    }
    this.authListener = this.authListener.bind(this);
  }
  componentDidMount() {
    this.authListener();
  }

  //==================================== DrawerAction
  
  onClose = () => {
    this.props.dispatch({
      type: 'SET_VISIBLEINPUTDRAWER',
      payload: false
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
          <div className= "logout">
            { this.state.user ? <div><Avatar/></div> : ( <SignIn /> ) }
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
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>footer</Footer>
          </Layout>

        </Layout>


        <Drawer
          title="Create a new account"
          width={'65%'}
          onClose={this.onClose}
          visible={this.props.visibleInputDrawer}
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

export default connect(mapStateToProps)(SiderDemo);