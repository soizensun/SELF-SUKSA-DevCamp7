import React, {Component} from 'react';
import fire from '../Config';

class AllQuestion extends React.Component {
    constructor(){
        super();
        this.state = {
            allData: [],
        }
    }
    componentDidMount(){
        this.interval = setInterval(() => this.getData(), 1000);
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
        var listOfQuestion = this.state.allData.map((val, i)=>{
            // console.log(val);
            var topic = val.topic
            var detail = val.detail
            return (
              <li key={i}>{topic} {detail}</li>
            ) 
        })

        return(
            <div>
                {/* <button onClick={this.getData}>
                Get Data
                </button> */}
                <ul>{listOfQuestion}</ul>
            </div>
        );
    }
}

export default AllQuestion;