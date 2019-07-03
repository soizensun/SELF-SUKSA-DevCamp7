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
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((u) => {
                console.log('Successfully Signed Up');
                
            })
            .catch((err) => {
                
                console.log('Error: ' + err.toString());
            })
            this.props.closeModal();
    
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

    handleEmail = e => {
        console.log(e.target.value)
        this.setState({ email: e.target.value })
    }
    handlePassword = e => {
        let temp = e.target.value
        console.log(e.target.value)
        this.setState({ password: temp })
    }
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback("The passwords you entered don't match!");
        } else {
          callback();
        }
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
                                rules: [{ required: true, 
                                message: 'Please input your Username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" 
                                    style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="username"
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('e-mail', {
                                rules: [{ required: true, 
                                message: 'Please input your email!' }],
                                onChange: (e) => this.handleEmail(e),
                            })(
                                <Input
                                    prefix={<Icon type="mail" 
                                    style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="E-mail"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, 
                                message: 'Please input your Password!' },
                                {validator: this.validateToNextPassword,},
                                ],
                                onChange: (e) => this.handlePassword(e),
                                
                            })(
                                <Input
                                    onBlur={this.handleConfirmBlur}
                                    prefix={<Icon type="lock" 
                                    style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item >
                            {getFieldDecorator('confirm-password', {
                                rules: [{required: true,
                                message: 'Please confirm your password!',},
                                {validator: this.compareToFirstPassword},
                                ],})
                                (<Input 
                                    prefix={<Icon type="lock" 
                                    style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Confirm-Password"/>)}
                        </Form.Item>
                    </Form>

                </Modal>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(SignUp);
export default WrappedNormalLoginForm;
