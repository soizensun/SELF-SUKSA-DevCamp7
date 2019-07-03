import React from 'react';
import { Tag, Card, Button, Modal, Steps, message, Row, Col } from 'antd';
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
            allData: [],
            visible: false,
            current: 0,
            aQuiz: [],
            checkReasonPage: false,
        }
    }

    componentDidMount() {
        this.getData();
    }

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

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

    onSelectChoice = (e) => {
        console.log(e.target.value);
        
    }

    showReason = () => {
        console.log("click show reason");
        
    }

    showModal = (id) => {
        console.log(this.state.checkReasonPage);
        
        let aQuiz = [];
        db.collection(`User/user3/Quiz/${id}/Questions`).get()
            .then((res) => {
                res.forEach(doc => {
                    aQuiz.push(doc.data())
                    console.log(doc.id);
                })
                aQuiz.map((item) => {
                    var question = item.question
                    var correctChoice = item.correctChoice
                    var choices = item.choices
                    // var reasons = item.reasons;
                    steps.push(
                        {
                            content:
                                <div>
                                    <div className="box">
                                        {question}
                                    </div>
                                    {/* {correctChoice} */}
                                    <div style={{ marginTop: "10px" }}>
                                        <Row gutter={8} style={{ width: "565px" }}>
                                            <Col span={10}><button value="1" onClick={this.onSelectChoice} className="bottonChoice">{choices[0]}</button></Col>
                                            <Col span={10}><button value="2" onClick={this.onSelectChoice} className="bottonChoice">{choices[1]}</button></Col>
                                        </Row>
                                        <Row gutter={8} style={{ width: "565px" }}>
                                            <Col span={10}><button value="3" onClick={this.onSelectChoice} className="bottonChoice">{choices[2]}</button></Col>
                                            <Col span={10}><button value="4" onClick={this.onSelectChoice} className="bottonChoice">{choices[3]}</button></Col>
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

    getData = () => {
        let wholeData = [];
        db.collection('User/user3/Quiz').get()
            .then((res) => {
                res.forEach(doc => {
                    var temp = [];
                    temp.push(doc.id)
                    temp.push(doc.data())
                    wholeData.push(temp)
                });
                this.setState({ allData: wholeData })
            })
    }

    render() {
        const { current } = this.state;
        // console.log(this.state.allData)
        var listOfQuestion = this.state.allData.map((val, index) => {
            // console.log(val[0]);
            var id = val[0]
            var type = val[1].type
            var topic = val[1].topic
            var detail = val[1].topicDetail
            let tag = val[1].tags.length > 0 ? (val[1].tags.map((tag, index) => {
                return <Tag color="cyan" key={index}>{tag}</Tag>
            })) : 2

            var component =
                <Card
                    hoverable
                    style = {{ width: '95%' }}
                    title = {topic}
                    extra = {[
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
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={null}
                    style={{}}
                    styteBody={{height: "500px"}}
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
                    <div className="steps-action">
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
                        {current > 0 && (
                            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                Previous
                            </Button>
                        )}
                        <Button style={{ marginLeft: 8 }} onClick={this.showReason}>Show reason</Button>
                    </div>
                </Modal>
                {/* <DoQuiz/> */}

                <ul> {listOfQuestion} </ul>
                <h1>{this.props.test}</h1>
            </div>
        );
    }
}

export default connect(mapStateToProps)(AllQuestion);