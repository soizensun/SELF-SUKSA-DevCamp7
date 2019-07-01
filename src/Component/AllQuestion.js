import React from 'react';
import {Tag, Card, Carousel,Icon} from 'antd';
// import 'antd/dist/antd.css';
import { connect } from 'react-redux';

const {fire} = require('../redux-firebase/firebaseControl');

const mapStateToProps = (state) => {
   return {
       test: state.subject,
       questionType: state.questionType
   }
}

class AllQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allData: [],
        }
        this.carousel = React.createRef();
    }

    componentDidMount(){
        // this.interval = setInterval(() => this.getData(), 1000);
        this.getData();
    }

    getData = () => {
        const db = fire.firestore();
        var wholeData = [];
        db.collection('question').onSnapshot((snapshot) => {   
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

        const props = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        var listOfQuestion = this.state.allData.map((val)=>{
            // console.log("id : " + val[0]);            
            var next = () => {
                console.log(this.state.carousel);
                
                this.carousel.next();
            }
            var previous = () => {
                this.carousel.prev();
            }
            var type = val[1].type
            var topic = val[1].topic
            var detail = val[1].topicDetail
            var tag = val[1].tag.map((tag) => {
                return <Tag color="cyan">{tag}</Tag>
            })
            var component = 
                    <Card 
                        hoverable 
                        style={{ width: '100%' }}
                        title = {topic}
                        extra = {tag}
                    >   
                        <Carousel ref={node => (this.carousel = node)} {...props}>
                            <div>
                                type => {type}<br/>
                                {detail}
                                <Icon type="left-circle" onClick={previous} />
                                <Icon type="right-circle" onClick={next} />
                            </div>
                            <div>
                                <h3>2</h3>
                                <Icon type="left-circle" onClick={previous} />
                                <Icon type="right-circle" onClick={next} />
                            </div>
                            <div>
                                <h3>3</h3>
                                <Icon type="left-circle" onClick={previous} />
                                <Icon type="right-circle" onClick={next} />
                            </div>
                            <div>
                                <h3>4</h3>
                                <Icon type="left-circle" onClick={previous} />
                                <Icon type="right-circle" onClick={next} />
                            </div>
                        </Carousel>
                    </Card>
                
            return (
            <div> {component} <br/> </div>
            ) 
        })

        return(
            <div>
                <ul> { listOfQuestion } </ul>
                <h1>{this.props.test}</h1>
            </div>
        );
    }
}

export default connect(mapStateToProps)(AllQuestion);