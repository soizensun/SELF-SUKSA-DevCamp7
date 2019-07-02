import React, { Component } from 'react'
import { Modal, Button, Form, Icon, Input, Checkbox } from 'antd';
const { fire } = require('../redux-firebase/firebaseControl');

class Login extends React.Component {
    state = { visible: false };

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
        };
        this.authListener = this.authListener.bind(this);
    }

    signUp=()=> {
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) => {
                console.log('Successfully Signed Up');
            })
            .catch((err) => {
                console.log('Error: ' + err.toString());
            })
    }

    login =()=> {
        console.log(this.state)
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) => {
                console.log('Successfully Logged In');
            })
            .catch((err) => {
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
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

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
                <Button type="primary" onClick={this.showModal}>
                    Sign in
                </Button>
                <Modal
                    title="Sign in"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="back" onClick={this.signUp}>
                            Signup
                        </Button>,
                        <Button key="submit" type="primary" onClick={this.login}>
                            Login
                        </Button>,
                    ]}
                >
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                                onChange: (e) => this.handleUserName(e),
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
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
                    </Form>

                </Modal>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm;
