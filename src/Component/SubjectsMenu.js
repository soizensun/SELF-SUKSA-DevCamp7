import React, { Component } from 'react';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import fire from '../Config'

const { SubMenu }  = Menu;

export class SubjectsMenu extends Component {
    constructor(){
        super();
        this.state = {
            allData: [],
        }
    }

    handleButon = (res) => {
        console.log(res.key);
        // console.log(this.state.tag)
        // this.setState({
        //   tag : res.key
        // })


        const db = fire.firestore();
        var wholeData = [];
        db.collection('question').get()
        .then(snapshot => {
        snapshot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data());
            // console.log(doc.data().topic + doc.data().detail);
            // console.log(doc.data());
            wholeData.push(doc.data())
            });
            // console.log(wholeData)
            this.setState({allData: wholeData})
            // console.log(this.state.allData)
        })
        .catch(error => {
            console.log('Error!', error);
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
                            <span>Navigation One</span>
                        </span>
                    }>
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

            </Menu>
        )
    }
}

export default SubjectsMenu;