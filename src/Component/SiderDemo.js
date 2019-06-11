
import React from 'react';
import 'antd/dist/antd.css';
import '../cssFile/SiderDemo.css';
import AllQuestion from './AllQuestion';
import Field from './Field';
import { Layout, Menu, Icon,  Drawer, Button } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

class SiderDemo extends React.Component{
  constructor(){
    super();
    this.state = {
      visible: false,

      tag : ""
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

  handleButon = (res) => {
    console.log(res.key);
    // console.log(this.state.tag)
    // this.setState({
    //   tag : res.key
    // })
  }

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
                 
              </div>

              <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} >

                <Menu.Item key="math" onClick={this.handleButon}>
                  <Icon type="file-excel" />
                  <span className="nav-text" >math</span>
                </Menu.Item>
                <Menu.Item key="science" onClick={this.handleButon}>
                <Icon type="thunderbolt" />
                  <span className="nav-text">science</span>
                </Menu.Item>
                <Menu.Item key="language" onClick={this.handleButon}>
                <Icon type="flag" />
                  <span className="nav-text">language</span>
                </Menu.Item>
                <Menu.Item key="programming" onClick={this.handleButon}>
                  <Icon type="code" />
                  <span className="nav-text">programming</span>
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
                  <AllQuestion/>
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
          width={500}
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
            }}
          >             
          </div>
        </Drawer>

      </div>
      
    );
  }
}


export default SiderDemo