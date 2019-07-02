import React from 'react';
import {Tag, Card, Button, Modal, Steps, message} from 'antd';
// import 'antd/dist/antd.css';
import { connect } from 'react-redux';
// import DoQuiz from './DoQuiz';

const { Step } = Steps;
const {fire} = require('../redux-firebase/firebaseControl');

const mapStateToProps = (state) => {
   return {
       test: state.subject,
       questionType: state.questionType
   }
}
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
  

class AllQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allData: [],
            visible: false,
            current: 0,
        }
    }

    componentDidMount(){
        // this.interval = setInterval(() => this.getData(), 1000);
        this.getData();
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

    getData = () => {
        const db = fire.firestore();
        var wholeData = [];
        db.collection('question').get()
        .then((snapshot) => {   
            snapshot.forEach(doc => {
                let temp = []
                temp.push(doc.id)
                temp.push(doc.data())
                wholeData.push(temp)
            });
            console.log(wholeData)
            this.setState({allData: wholeData})
        })
    }

    
    render(){
        const { current } = this.state;
        var listOfQuestion = this.state.allData.map((val)=>{          
            var type = val[1].type
            var topic = val[1].topic
            var detail = val[1].topicDetail
            var tag = val[1].tag.map((tag) => {
                return <Tag color="cyan">{tag}</Tag>
            })
            var component = 
                    <Card 
                        hoverable 
                        style={{ width: '95%' }}
                        title = {topic}
                        extra = {[<Button type="primary" onClick={this.showModal}>do</Button>]} 
                    >   
                        {tag} <br/>
                        type => {type}<br/>
                        {detail}
                    </Card>
                
            return (
            <div> {component} <br/> </div>
            ) 
        })

        return(
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className="steps-content" style={{backgroundColor:"red", width:"100%", height:"400px"}}>{steps[current].content}</div>
                    <div className="steps-action">
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={() => this.next()}>
                            Next
                            </Button>
                        )}
                        {current === steps.length - 1 && (
                            <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                            </Button>
                        )}
                        {current > 0 && (
                            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Previous
                            </Button>
                        )}
                    </div>
                </Modal>
                {/* <DoQuiz/> */}

                <ul> { listOfQuestion } </ul>
                <h1>{this.props.test}</h1>
            </div>
        );
    }
}

export default connect(mapStateToProps)(AllQuestion);