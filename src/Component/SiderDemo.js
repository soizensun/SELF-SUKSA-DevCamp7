
import React from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../cssFile/SiderDemo.css';
import Field from './Field';
import { Layout, Menu, Icon,  Drawer, Button } from 'antd';
import { rgbToHex } from '@material-ui/core/styles';
import { borderColor } from '@material-ui/system';

// const { Option } = Select;
const { Header, Content, Footer, Sider } = Layout;

class SiderDemo extends React.Component{
  constructor(){
    super();
    this.state = {
      visible: false,
    }
  }
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

  

  render(){
    return(
      <div>
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
              <div className="logo">
                <i class="fas fa-biohazard fa-2x" style={{color: "#FFE361" }}></i>
              </div>

              <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>

                <Menu.Item key="1">
                  <Icon type="user" />
                  <span className="nav-text">nav 1</span>
                </Menu.Item>
                <Menu.Item key="2">
                  <Icon type="video-camera" />
                  <span className="nav-text">nav 2</span>
                </Menu.Item>
                <Menu.Item key="3">
                  <Icon type="upload" />
                  <span className="nav-text">nav 3</span>
                </Menu.Item>
                <Menu.Item key="4">
                  <Icon type="user" />
                  <span className="nav-text">nav 4</span>
                </Menu.Item>

              </Menu>
            </Sider>

            <Layout>
              <Header style={{ background: '#fff', padding: 0, marginLeft: 0 }} >
                <div style={{  marginLeft: 20, fontSize: 20 }}>
                    APP NAME
                </div>
              </Header>

              <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 1000 }}>
                  {/* <i class="fas fa-biohazard fa-5x"></i> */}
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
          width={700}
          onClose={this.onClose}
          visible={this.state.visible}
        >
            <Field/>
            <div  
              style = {{            
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                // borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
            }}>
              <Button type = 'danger' onClick={this.onClose} style={{ marginRight: 10, marginBottom: 10 }}>
                Cancel
              </Button>
              <Button onClick={this.onClose} style={{ marginRight: 10, marginBottom: 10, backgroundColor: '#FFE361',  borderColor: '#FFE361'  }}>
                Submit
              </Button>
            </div>
        </Drawer>

      </div>
      
    );
  }
}


export default SiderDemo