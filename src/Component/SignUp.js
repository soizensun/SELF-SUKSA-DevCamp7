import React, { Component } from 'react'
import {connect} from 'react-redux'
import '../cssFile/Layout.css';
import { Modal, Button, Form, Icon, Input, Tooltip } from 'antd';
const { fire, createAccount } = require('../redux-firebase/firebaseControl');


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false,
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

    signUp = (username, email, password) => {
        fire.auth().createUserWithEmailAndPassword(email, password)
            .then((data) => {
                this.props.dispatch({
                    type: 'SET_USER',
                    payload: data.user
                })
                console.log('Successfully Signed Up');
                return data.user
            }).then((user) => {
                createAccount(username, email, user.uid);
            })
            .catch((err) => {
                console.log('Error: ' + err.toString());
            })
        this.props.closeModal();

    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.signUp(values.username, values.email, values.password);
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: { xs: { span: 24 }, sm: { span: 8 }, },
            wrapperCol: { xs: { span: 24 }, sm: { span: 16 }, },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0, }, sm: { span: 16, offset: 8, },
            },
        };

        return (
            <Modal
                title="Create a new account"
                visible={this.props.signUpVisible}
                onCancel={() => { this.props.closeModal(); this.props.toggleSignUp() }}
                footer={null}
                style={{display: 'flex', justifyContent: 'center'}}
            >
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className='signup-form'>
                    <Form.Item
                        label={
                            <span>
                                Username&nbsp;
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        }
                    >
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Password" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                    min: 6
                                },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="Confirm Password" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                    min: 6
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                    
                    <Form.Item {...tailFormItemLayout}>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                            <Button onClick={() => this.props.toggleSignUp()}>
                                Cancel
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(SignUp);
export default connect()(WrappedNormalLoginForm);