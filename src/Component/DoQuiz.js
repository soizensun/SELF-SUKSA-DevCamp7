import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {Tag, Card, Button, Modal, Steps, message} from 'antd';

const { Step } = Steps;
const steps = [
    {
      title: 'First',
      content: 'First-content',
    },
    {
      title: 'Second',
      content: 'Second-content',
    },
    {
      title: 'Last',
      content: 'Last-content',
    },
];

class DoQuiz extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            current: 0,
        }
    }

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
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
      }
    
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }  
      
    render(){
        return(
            <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <div className="steps-content" style={{backgroundColor:"red", width:"100%", height:"400px"}}>{steps[this.state.current].content}</div>
                <div className="steps-action">
                    {this.state.current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                        Next
                        </Button>
                    )}
                    {this.state.current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                        </Button>
                    )}
                    {this.state.current > 0 && (
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                        Previous
                        </Button>
                    )}
                </div>
            </Modal>
        );
    }

}
export default DoQuiz;