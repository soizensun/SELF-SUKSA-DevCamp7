import React, {Component} from 'react';
import fire from '../Config';

class AllQuestion extends React.Component {
    constructor(){
        super();
        this.state = {
            allData: [],
        }
    }

    getData = () => {
        const db = fire.firestore();
        db.settings({
          timestampsInSnapshots: true
        });
        var wholeData = [];
        db.collection('question').orderBy('desc').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            // console.log(doc.id, '=>', doc.data());
            // console.log(doc.data().name + doc.data().age);
            console.log(doc.data());
            wholeData.push(doc.data())
          });
          console.log(wholeData)
          this.setState({allData: wholeData})
          console.log(this.state.allData)
        })
        .catch(error => {
          console.log('Error!', error);
        })
      }

    render(){

        var listOfQuestion = this.state.allData.map((val, i)=>{
            var topic = val.topic
            var detail = val.detail
            return (
              <li key={i}>{topic} ({detail})</li>
            ) 
        })


        return(
            <div>
                <button onClick={this.getData}>
                Get Data
                </button>
                <ul>{listOfQuestion}</ul>
            </div>
        );
    }
}

export default AllQuestion;