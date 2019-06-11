import React, { Component } from 'react';
import Menu from 'antd/lib/menu'
import Icon from 'antd/lib/icon'

export class SubjectsMenu extends Component {

    handleButon = (res) => {
        console.log(res.key);
        // console.log(this.state.tag)
        // this.setState({
        //   tag : res.key
        // })
      }

    render() {
        return (
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
        )
    }
}

export default SubjectsMenu;