import React, { Component } from 'react';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import { Input } from 'antd';

import { connect } from 'react-redux'

const { SubMenu }  = Menu;
const { Search } = Input;

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
                <br/>
                <div style={{padding: 8 }}>
                    <Search
                        placeholder="search your tag"
                        onSearch={value => console.log(value)}
                        style={{ width: 183 }}
                    />
                </div>

                <SubMenu
                    key="sub1"
                    title={
                        <span>
                            <Icon type="mail" /> 
                            <span>Prepare-Exam</span>
                        </span>
                    }
                >
                    <Menu.Item key="PAT1" onClick={this.handleButon}>
                        <Icon type="file-text" />
                        <span className="nav-text" >PAT1</span>
                    </Menu.Item>
                    <Menu.Item key="PAT2" onClick={this.handleButon}>
                     <Icon type="file-text" />
                        <span className="nav-text">PAT2</span>
                    </Menu.Item>
                    <Menu.Item key="PAT3" onClick={this.handleButon}>
                        <Icon type="file-text" />
                        <span className="nav-text">PAT3</span>
                    </Menu.Item>
                    <Menu.Item key="PAT4" onClick={this.handleButon}>
                        <Icon type="file-text" />
                            
                    </Menu.Item>
                    <Menu.Item key="PAT5" onClick={this.handleButon}>
                        <Icon type="file-text" />
                        <span className="nav-text">PAT5</span>
                    </Menu.Item>
                    <Menu.Item key="PAT6" onClick={this.handleButon}>
                        <Icon type="file-text" />
                        <span className="nav-text">PAT6</span>
                    </Menu.Item>
                    <Menu.Item key="PAT7" onClick={this.handleButon}>
                        <Icon type="file-text" />
                        <span className="nav-text">PAT7</span>
                    </Menu.Item>
                    <Menu.Item key="GAT" onClick={this.handleButon}>
                        <Icon type="flag" />
                        <span className="nav-text">GAT</span>
                    </Menu.Item>
                    <Menu.Item key="O-NET" onClick={this.handleButon}>
                        <Icon type="code" />
                        <span className="nav-text">O-NET</span>
                    </Menu.Item>
                    <Menu.Item key="Self-Evaluation" onClick={this.handleButon}>
                        <Icon type="file-search" />
                        <span className="nav-text">Self-Evaluation</span>
                    </Menu.Item>
                    
                </SubMenu>

                <SubMenu
                    key="sub2"
                    title={
                        <span>
                            <Icon type="mail" /> 
                            <span>Practice</span>
                        </span>
                    }
                >
                    <Menu.Item key="Math" onClick={this.handleButon}>
                        <Icon type="line-chart" />
                        <span className="nav-text" >Math</span>
                    </Menu.Item>
                    <Menu.Item key="Physics" onClick={this.handleButon}>
                        <Icon type="thunderbolt" />
                        <span className="nav-text">Physics</span>
                    </Menu.Item>
                    <Menu.Item key="Chemistry" onClick={this.handleButon}>
                        <Icon type="experiment" />
                        <span className="nav-text">Chemistry </span>
                    </Menu.Item>
                    <Menu.Item key="Biology" onClick={this.handleButon}>
                        <Icon type="cluster" /> 
                        <span className="nav-text">Biology</span>
                    </Menu.Item>
                    <Menu.Item key="Language" onClick={this.handleButon}>
                        <Icon type="flag" />
                        <span className="nav-text">Language</span>
                    </Menu.Item>
                    <Menu.Item key="History" onClick={this.handleButon}>
                        <Icon type="search" />
                        <span className="nav-text">History</span>
                    </Menu.Item>
                    <Menu.Item key="programming" onClick={this.handleButon}>
                        <Icon type="code" />
                        <span className="nav-text">Programming</span>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        )
    }
}
export default connect()(SubjectsMenu);