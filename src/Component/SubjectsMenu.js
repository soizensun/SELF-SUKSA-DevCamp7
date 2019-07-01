import React, { Component } from 'react';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';

import { connect } from 'react-redux'

const { SubMenu }  = Menu;

export class SubjectsMenu extends Component {

    handleButon = (tag) => {
        this.props.dispatch({
            type: 'SET_SUBJECT',
            payload: tag.key
        })
      }

    render() {
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} >
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="mail" /> 
                            <span>prepare for exam</span>
                        </span>
                    }
                >
                    <Menu.Item key="PAT1" onClick={this.handleButon}>
                        <Icon type="file-excel" />
                        <span className="nav-text" >PAT1</span>
                    </Menu.Item>
                    <Menu.Item key="PAT2" onClick={this.handleButon}>
                        <Icon type="thunderbolt" />
                        <span className="nav-text">PAT2</span>
                    </Menu.Item>
                    <Menu.Item key="GAT" onClick={this.handleButon}>
                        <Icon type="flag" />
                        <span className="nav-text">GAT</span>
                    </Menu.Item>
                    <Menu.Item key="O-NET" onClick={this.handleButon}>
                        <Icon type="code" />
                        <span className="nav-text">O-NET</span>
                    </Menu.Item>
                </SubMenu>

                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <Icon type="mail" /> 
                            <span>classroom</span>
                        </span>
                    }
                >
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
                </SubMenu>
                <SubMenu
                    key="sub3"
                    title={
                        <span>
                            <Icon type="mail" /> 
                            <span>living room</span>
                        </span>
                    }
                >
                    <Menu.Item key="other" onClick={this.handleButon}>
                        <Icon type="file-excel" />
                        <span className="nav-text" >other</span>
                    </Menu.Item>
                    <Menu.Item key="life" onClick={this.handleButon}>
                        <Icon type="thunderbolt" />
                        <span className="nav-text">life</span>
                    </Menu.Item>
                </SubMenu>

            </Menu>
        )
    }
}

export default connect()(SubjectsMenu);