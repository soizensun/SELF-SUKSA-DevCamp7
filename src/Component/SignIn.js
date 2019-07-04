import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Modal, Button, Form, Icon, Input, Checkbox, message } from 'antd';
import '../cssFile/Layout.css';
import SignUp from './SignUp';
const { fire } = require('../redux-firebase/firebaseControl');


class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            signUpVisible: false
        };
        // this.authListener = this.authListener.bind(this);
    }
    // authListener() {
    //     fire.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //             this.props.dispatch({
    //                 type: 'SET_USER',
    //                 payload: user 
    //             });
    //         }
    //     })
    // }
    componentDidMount() {
        // this.authListener();
    }

    
    login =(email, password)=> {
        // console.log(this.state)
        fire.auth().signInWithEmailAndPassword(email, password)
            .then((data) => {
                this.props.dispatch({
                    type: 'SET_USER',
                    payload: data.user
                })
                message.success('Login success');
                console.log('Successfully Logged In: ', data.user.uid);
            })
            .catch((err) => {
                message.error('Login Failed');
                console.log('Error: ' + err.toString());
            })
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.login(values.email, values.password);
            }
        });
    };

    closeModal = () => {
        this.setState({
            visible: false,
        });
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    toggleSignUp = () => {
        this.setState({
            signUpVisible: !this.state.signUpVisible,
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Sign in
                </Button>
                <Modal
                    title="Sign in"
                    visible={this.state.visible && !this.state.signUpVisible}
                    onCancel={this.closeModal}
                    footer={null}
                    style={{display: 'flex', justifyContent: 'center'}}
                >
                    <Form className="login-form" onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [{ required: true, message: 'Please input your email!' }],
                                // onChange: (e) => this.handleEmail(e),
                            })(
                                <Input
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="E-mail"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                                // onChange: (e) => this.handlePassword(e),
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}

                        </Form.Item>
                        <Form.Item>
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <div>
                                    <Button type="primary" onClick={() => this.toggleSignUp()}>
                                        Sign Up
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={this.closeModal}>
                                        Cancel
                                    </Button>
                                    <Button htmlType="submit" type="primary">
                                        Login
                                    </Button>
                                </div>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
                <SignUp signUpVisible={this.state.signUpVisible} toggleSignUp={this.toggleSignUp} closeModal={this.closeModal}/>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Signin);
export default connect()(WrappedNormalLoginForm);