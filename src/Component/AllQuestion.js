import React from 'react';
import {Tag, Card} from 'antd'
import fire from '../Config';

class AllQuestion extends React.Component {
    constructor(){
        super();
        this.state = {
            allData: [],
        }
    }
    componentDidMount(){
        // this.interval = setInterval(() => this.getData(), 1000);
        this.getData();   
    }

    getData = () => {
        const db = fire.firestore();
        var wholeData = [];
        db.collection('question').get()
        .then(snapshot => {
        snapshot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data());
            // console.log(doc.data().topic + doc.data().detail);
            // console.log(doc.id);

            let temp = []
            temp.push(doc.id)
            temp.push(doc.data())
            
            wholeData.push(temp)
            // wholeData.push(doc.id)
            });
            console.log(wholeData)  
            this.setState({allData: wholeData})
            // console.log(this.state.allData)
        })
        .catch(error => {
            console.log('Error!', error);
        })
    }
    
    render(){
        var listOfQuestion = this.state.allData.map((val)=>{
            // console.log("id : " + val[0]);            
            
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
                        type => {type}<br/>
                        {detail}
                    </Card>
            return (
            <div> {component} <br/> </div>
            ) 
        })

        return(
            <div>
                <ul> { listOfQuestion } </ul>
            </div>
        );
    }
}

export default AllQuestion;