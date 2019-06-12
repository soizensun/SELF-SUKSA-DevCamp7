import React, {Component} from 'react';
import {Tag} from 'antd'
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
            // console.log(doc.data());
            wholeData.push(doc.data())
            });
            // console.log(wholeData)
            this.setState({allData: wholeData})
            // console.log(this.state.allData)
        })
        .catch(error => {
            console.log('Error!', error);
        })
    }
    

    render(){

        var listOfQuestion = this.state.allData.map((val)=>{
            var topic = val.topic
            var detail = val.detail
            var tag = val.tag.map((tag) => {
                return <Tag>{tag}</Tag>
            })
            var component = <li>
                                {tag}<br/>
                                topic => {topic}<br/>
                                detail => {detail}
                            </li>
            return (
              <div>
                  {component}<br/>
              </div>
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