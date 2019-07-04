import React from 'react';
import { Tag, Card, Button, Modal, Steps, message, Row, Col, notification } from 'antd';
import '../cssFile/AllQuestion.css';
import { connect } from 'react-redux';
import SignIn from './SignIn';
const { Step } = Steps;

let score = 0;
let quizId = "";
const steps = [];
const { fire, pushQuizToAlreadyDone } = require('../redux-firebase/firebaseControl');
const db = fire.firestore();
const mapStateToProps = (state) => {
    return {
        typeSubject: state.subject,
        questionType: state.questionType,
        user: state.user
    }
}

class AllQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quizs: [],
            visible: false,
            current: 0,
            canShow: false,
            currentQuestions: [],
            checkReasonBox: true,
            canConfirm: true,
            isDisabledNextBtn: false,
            checkOnSelectBtn: [false, false, false, false],
            // notiKey: ""
            isShow: false,
            correctChoiceArray: [],
        }
    }

    componentDidMount() {
        this.getQuizs();
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.typeSubject != this.props.typeSubject) {
            this.getQuizs(nextProps.typeSubject)
        }
    }
    getQuizs = (typeSubject) => {
        let quizsRef = db.collection('Quizs');
        const setStateQuizs = (res) => {
            let quizs = [];
            res.forEach(doc => {
                var quiz = {
                    id: doc.id,
                    data: doc.data()
                }
                quizs.push(quiz)
            });
            this.setState({ quizs: quizs })
        }
        if (!typeSubject) {
            quizsRef.get()
                .then((res) => { setStateQuizs(res) })
        } else {
            quizsRef.where('type', '==', typeSubject).get()
                .then((res) => { setStateQuizs(res) })
        }
    }
    handleCancel = e => {
        while (steps.length > 0) {
            steps.pop();
        }
        notification.close('reason')
        notification.close(`open${Date.now()}`)
        this.setState({
            visible: false,
            current: 0,
            isDisabledNextBtn: false,
        });
        score = 0;
    };
    next() {
        notification.close('reason')
        const current = this.state.current + 1;
        this.setState({
            isDisabledNextBtn: false,
            checkOnSelectBtn: [false, false, false, false],
            isShow: true,
            current
        }, () => {
            this.state.checkOnSelectBtn.map((value, index) => {
                console.log(value);

                if (value) {
                    document.getElementById(`choice${index + 1}`).className = "bottonChoiceSelected"
                }
                else {
                    document.getElementById(`choice${index + 1}`).className = "bottonChoice"
                }
            })
        })

        // this.setState({ current });
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
            key: 'reason'
        })
    }
    onSelectChoice2 = (val) => {
        notification.open({
            duration: 0,
            placement: "topRight",
            message: "choice 2's reason",
            description: val,
            key: 'reason'
        })
    }
    onSelectChoice3 = (val) => {
        notification.open({
            duration: 0,
            placement: "bottomLeft",
            message: "choice 3's reason",
            description: val,
            key: 'reason'
        })
    }
    onSelectChoice4 = (val) => {
        notification.open({
            duration: 0,
            placement: "bottomRight",
            message: "choice 4's reason",
            description: val,
            key: 'reason'
        })
    }


    showReasonWithShowReasonBtn = (index) => {
        this.setState({
            isDisabledNextBtn: true,
            isShow: true,
        })


        this.onSelectChoice1(this.state.currentQuestions[index].reasons[0])
        this.onSelectChoice2(this.state.currentQuestions[index].reasons[1])
        this.onSelectChoice3(this.state.currentQuestions[index].reasons[2])
        this.onSelectChoice4(this.state.currentQuestions[index].reasons[3])
        console.log(this.state.correctChoiceArray[index]);
        var greenCss = this.state.correctChoiceArray[index]
        document.getElementById(`choice${greenCss}`).className = "bottonCorrectChoice"


    }

    showReasonWithChoice = (index, check, selectChoice) => {
        let temp = [false, false, false, false]
        this.setState({
            isDisabledNextBtn: false,
            checkOnSelectBtn: temp,
            isShow: true,
        })

        let temp1 = [false, false, false, false]
        temp1[selectChoice] = true
        this.setState({ checkOnSelectBtn: temp1, isShow: true }, () => {
            this.state.checkOnSelectBtn.map((value, index) => {
                if (value) {
                    document.getElementById(`choice${index + 1}`).className = "bottonChoiceSelected"
                }
                else {
                    document.getElementById(`choice${index + 1}`).className = "bottonChoice"
                }
            })
        })

        switch (check) {
            case true:
                if (this.state.canConfirm === true) {

                    const key = `open${Date.now()}`;
                    this.setState({
                        canConfirm: false,
                        // notiKey: key
                    })
                    const onCancle = () => {
                        this.setState({ canConfirm: true })
                    }
                    const onConfirm = () => {
                        this.setState({
                            canConfirm: true,
                            isDisabledNextBtn: true,
                        })
                        var aCorrectChoice = this.state.correctChoiceArray[index]
                        document.getElementById(`choice${aCorrectChoice}`).className = "bottonCorrectChoice"
                        // console.log(this.state.correctChoiceArray[index]);
                        // console.log(selectChoice + 1);

                        if (aCorrectChoice == (selectChoice + 1)) {
                            score = score + 1
                        }
                        this.onSelectChoice1(this.state.currentQuestions[index].reasons[0])
                        this.onSelectChoice2(this.state.currentQuestions[index].reasons[1])
                        this.onSelectChoice3(this.state.currentQuestions[index].reasons[2])
                        this.onSelectChoice4(this.state.currentQuestions[index].reasons[3])
                    }
                    const btn = (
                        <Button type="primary" size="small" onClick={() => notification.close(key)}>
                            Confirm
                        </Button>
                    );
                    notification.warning
                        ({
                            duration: 0,
                            placement: "topRight",
                            message: "Are you sure to answer this choice",
                            description: "Please confirm the choice that you cerect",
                            btn,
                            key,
                            onClose: onCancle,
                            onClick: onConfirm,
                        })
                }
                else if (this.state.canConfirm === false) {
                    return
                }
                break
        }
    }

    checkSignIn = (id) => {
        if(this.props.user){
            this.showModal(id)
        } else {
            this.props.dispatch({
                type: 'SET_VISIBLESIGNIN',
                payload: true
            })
        }
    }

    showModal = (quizId) => {
        let questions = [];
        var temp = []
        db.collection(`Quizs/${quizId}/Questions`).get()
            .then((res) => {
                res.forEach(doc => {
                    questions.push(doc.data())
                })
                this.setState({ currentQuestions: questions })
                questions.map((item, index) => {
                    var question = item.question
                    var correctChoice = item.correctChoice
                    var choices = item.choices
                    var reasons = item.reasons;

                    console.log(correctChoice);

                    temp.push(correctChoice)
                    this.setState({ correctChoiceArray: temp })
                    steps.push({
                        content:
                            <div>
                                <div className="box" style={{ fontSize: "25px" }}>
                                    {question}
                                </div>
                                <div style={{ marginTop: "10px", fontSize: "25px", color: "white" }}>
                                    <Row gutter={8} style={{ width: "565px" }}>
                                        <Col span={10}>
                                            <button id="choice1" value={index} className="bottonChoice"
                                                onClick={() => this.showReasonWithChoice(index, this.state.checkReasonBox, 0)}
                                            >
                                                {choices[0]}
                                            </button>
                                        </Col>
                                        <Col span={10}>
                                            <button id="choice2" value={index} className="bottonChoice"
                                                onClick={() => this.showReasonWithChoice(index, this.state.checkReasonBox, 1)}
                                            >
                                                {choices[1]}
                                            </button>
                                        </Col>
                                    </Row>
                                    <Row gutter={8} style={{ width: "565px" }}>
                                        <Col span={10}>
                                            <button id="choice3" value={index} className="bottonChoice"
                                                onClick={() => this.showReasonWithChoice(index, this.state.checkReasonBox, 2)}
                                            >
                                                {choices[2]}
                                            </button></Col>
                                        <Col span={10}>
                                            <button id="choice4" value={index} className="bottonChoice"
                                                onClick={() => this.showReasonWithChoice(index, this.state.checkReasonBox, 3)}
                                            >
                                                {choices[3]}
                                            </button>
                                        </Col>
                                    </Row>
                                    {/* </form> */}

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
                    style={{ width: '95%', backgroundColor: 'white', fontSize: '17px' }}
                    title={topic}
                    extra={[
                        <Button type="primary" onClick={() => this.checkSignIn(id)}>start doing !!</Button>
                    ]}
                >
                    {tag} <br /><br />
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
                            <Button disabled={!this.state.isDisabledNextBtn} type="primary" onClick={() => this.next()}>
                                Next
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button disabled={!this.state.isDisabledNextBtn} type="primary" onClick={() => message
                                .loading('Saving your score', 1)
                                .then(() => {
                                    message.success('Loading finished', 2);
                                    notification.close('reason');
                                    this.setState({
                                        checkOnSelectBtn: [false, false, false, false]
                                    })
                                    console.log(score);
                                    console.log(this.state.quizs);
                                    
                                    // pushQuizToAlreadyDone(userId,  ,score)
                                    score = 0;
                                })}
                            >
                                Done
                            </Button>
                        )}
                        <Button style={{ marginLeft: 8 }} onClick={() => this.showReasonWithShowReasonBtn(current, !this.state.checkReasonBox)}>
                            Show reason
                        </Button>
                    </div>
                </Modal>
                <ul> {cardOfQuiz} </ul>
                {/* <h1>{this.props.test}</h1> */}
            </div>
        );
    }
}

export default connect(mapStateToProps)(AllQuestion);