import React, { Component } from 'react'
import { Modal, Button, Form, Icon, Input, Checkbox, message } from 'antd';
import '../cssFile/Layout.css';
import SignUp from './SignUp';
const { fire } = require('../redux-firebase/firebaseControl');


class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            visible: false,
            signUpVisible: false
        };
        this.authListener = this.authListener.bind(this);
    }

    // signUp=()=> {
    //     fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    //         .then((u) => {
    //             console.log('Successfully Signed Up');
    //         })
    //         .catch((err) => {
    //             console.log('Error: ' + err.toString());
    //         })
    // }

    login =()=> {
        console.log(this.state)
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((data) => {
                message.success('Login success');
                console.log('Successfully Logged In: ', data.user.getIdToken());
            })
            .catch((err) => {
                message.error('Login Failed');
                console.log('Error: ' + err.toString());
                console.log('test')
            })
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

    handleEmail = e => {
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
                <Button type="primary" onClick={this.showModal}>
                    Sign in
                </Button>
                <Modal
                    title="Sign in"
                    visible={this.state.visible && !this.state.signUpVisible}
                    onCancel={this.closeModal}
                    footer={[
                        <Button key="back" onClick={this.closeModal}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.login}>
                            Login
                        </Button>,
                    ]}
                >
                    <Form className="login-form">
                        <Form.Item>
                            {getFieldDecorator('e-mail', {
                                rules: [{ required: true, message: 'Please input your email!' }],
                                onChange: (e) => this.handleEmail(e),
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
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={() => this.toggleSignUp()}>
                                Sign Up
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <SignUp signUpVisible={this.state.signUpVisible} toggleSignUp={this.toggleSignUp} closeModal={this.closeModal}/>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Signin);
export default WrappedNormalLoginForm;
