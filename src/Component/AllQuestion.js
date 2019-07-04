import React from 'react';
import { Tag, Card, Button, Modal, Steps, message, Row, Col, notification } from 'antd';
// import 'antd/dist/antd.css';
import '../cssFile/AllQuestion.css';
import { connect } from 'react-redux';
const { Step } = Steps;
// import DoQuiz from './DoQuiz';

const { fire } = require('../redux-firebase/firebaseControl');
const db = fire.firestore();

const mapStateToProps = (state) => {
    return {
        test: state.subject,
        questionType: state.questionType
    }
}

const steps = [];
class AllQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizs: [],
            visible: false,
            current: 0,
            canShow: false,
            currentQuestions: []
        }
    }

    componentDidMount() {
        this.getQuizs();
    }  

    getQuizs = () => {
        let quizs = [];
        db.collection('Quizs').get()
            .then((res) => {
                res.forEach(doc => {
                    var quiz = {
                        id: doc.id,
                        data: doc.data()
                    }
                    quizs.push(quiz)
                });
                this.setState({ quizs: quizs })
            })
    }
/////////////////////////////////////////////
    handleCancel = e => {
        while (steps.length > 0) {
            steps.pop();
        }
        this.setState({
            visible: false,
            current: 0,

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

    onSelectChoice1 = (val) => {
        notification.open({
            duration: 0,
            placement: "topLeft",
            message: "choice 1's reason ",
            description: val,
        })
    }
    onSelectChoice2 = (val) => {
        notification.open({
            duration: 0,
            placement: "topRight",
            message: "choice 2's reason ",
            description: val,
        })
    }
    onSelectChoice3 = (val) => {
        notification.open({
            duration: 0,
            placement: "bottomLeft",
            message: "choice 3's reason ",
            description: val,
        })
    }
    onSelectChoice4 = (val) => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" onClick={() => notification.close(key)}>
              Confirm
            </Button>
          );
        notification.open({
            duration: 0,
            placement: "bottomRight",
            message: "choice 4's reason ",
            description: val,
            btn,
        })
    }

    showReason = (index) => {
        this.onSelectChoice1(this.state.currentQuestions[index].reasons[0]);
        this.onSelectChoice2(this.state.currentQuestions[index].reasons[1]);
        this.onSelectChoice3(this.state.currentQuestions[index].reasons[2]);
        this.onSelectChoice4(this.state.currentQuestions[index].reasons[3]);
    }

    showModal = (quizId) => {
        let questions = [];
        db.collection(`Quizs/${quizId}/Questions`).get()
            .then((res) => {
                res.forEach(doc => {
                    questions.push(doc.data())
                })
                this.setState({currentQuestions: questions})
                questions.map((item, index) => {
                    var question = item.question
                    var correctChoice = item.correctChoice
                    var choices = item.choices
                    var reasons = item.reasons;
                    
                    steps.push({
                        content :  
                        <div>
                            <div className="box">
                                {question}
                            </div>
                        
                            <div style={{ marginTop: "10px" }}>
                                <Row gutter={8} style={{ width: "565px" }}>
                                    <Col span={10}><button value={index} onClick={() => this.showReason()} className="bottonChoice">{choices[0]}</button></Col>
                                    <Col span={10}><button value={index} onClick={() => this.showReason()} className="bottonChoice">{choices[1]}</button></Col>
                                </Row>
                                <Row gutter={8} style={{ width: "565px" }}> 
                                    <Col span={10}><button value={index} onClick={() => this.showReason()} className="bottonChoice">{choices[2]}</button></Col>
                                    <Col span={10}><button value={index} onClick={() => this.showReason()} className="bottonChoice">{choices[3]}</button></Col>
                                </Row>
                            </div>
                        </div> 
                    })
                })
                this.setState({
                    visible: true,
                });
            })
    };

    render() {
        const { current } = this.state;
        var cardOfQuiz = this.state.quizs.map((val, index) => {
            var id = val.id
            var type = val.data.type
            var topic = val.data.topic
            var detail = val.data.detail
            let tag = val.data.tags.map((tag, index) => {
                return <Tag color="cyan" key={index}>{tag}</Tag>
            })
            var component =
                <Card
                    hoverable
                    style={{ width: '95%' }}
                    title={topic}
                    extra={[
                        <Button type="primary" onClick={() => this.showModal(id)}>start doing !!</Button>
                    ]}
                >
                    {tag} <br />
                    type => {type}<br />
                    {detail}
                </Card>

            return (
                <div key={index}> {component} <br /> </div>
            )
        })

        return (
            <div>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}  
                >
                    <Steps current={current}>
                        {steps.map(item => (<Step key={item.title} title={item.title} />))}
                    </Steps>
                    {
                        steps[current] !== undefined &&
                        (
                            <div className="steps-content" style={{ width: "900px", height: "350px" }}>
                                {steps[current].content}
                            </div>
                        )
                    }
                    <div className="steps-action-button">
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => this.next()}>
                                Next
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button type="primary" onClick={() => message
                                .loading('Saving your score', 1)
                                .then(() => message.success('Loading finished', 2))}
                            >
                                Done
                            </Button>
                        )}
                        {/* {current > 0 && (
                            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                Previous
                            </Button>
                        )} */}
                        <Button style={{ marginLeft: 8 }} onClick={() => this.showReason(current)}>Show reason</Button>
                    </div>
                </Modal>
                <ul> {cardOfQuiz} </ul>
                {/* <h1>{this.props.test}</h1> */}
            </div>
        );
    }
}

export default connect(mapStateToProps)(AllQuestion);