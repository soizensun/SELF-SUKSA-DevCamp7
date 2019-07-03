import React, { Component } from 'react'
import { Modal, Button, Form, Icon, Input, Checkbox } from 'antd';
const { fire } = require('../redux-firebase/firebaseControl');


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
        };
        this.authListener = this.authListener.bind(this);
    }

    signUp=()=> {
        // fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        //     .then((u) => {
        //         // fire.auth().currentUser.sendEmailVerification();
        //         alert('Email Verification Sent ! Please check your email address')
        //         console.log('Successfully Signed Up');
        //     })
        //     .catch((err) => {
                
        //         console.log('Error: ' + err.toString());
        //     })
            this.props.toggleSignUp();
    }

    componentDidMount() {
        this.authListener();
        console.log(this.state)
    }

    authListener() {
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user });
            } else {
                // this.setState({ user: null });
            }
        })
    }

    handleUserName = e => {
        console.log(e.target.value)
        this.setState({ email: e.target.value })
    }
    handlePassword = e => {
        let temp = e.target.value
        console.log(e.target.value)
        this.setState({ password: temp })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Modal
                    title="Sign Up"
                    visible={this.props.signUpVisible}
                    onCancel={()=>{this.props.closeModal(); this.props.toggleSignUp()}}
                    footer={[
                        <Button key="back" onClick={()=>this.props.toggleSignUp()}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={()=>this.signUp()}>
                            Sign up
                        </Button>
                    ]}
                >
                    <Form className="login-form">
                    <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your Username!' }],
                                onChange: (e) => this.handlePassword(e),
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="username"
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('e-mail', {
                                rules: [{ required: true, message: 'Please input your email!' }],
                                onChange: (e) => this.handleUserName(e),
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
                                onChange: (e) => this.handlePassword(e),
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                    </Form>

                </Modal>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(SignUp);
export default WrappedNormalLoginForm;
