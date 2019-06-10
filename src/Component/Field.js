import React, {Component} from 'react';
// import { withStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
// import MenuItem from '@material-ui/core/MenuItem';
import fire from '../Config';


class Field extends React.Component {
    state = {
        topic: '',
        detail: '',
        allData: []
    }
    
    updateInput = e => {
      // console.log(e.target.name);
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    addData = e => {
      e.preventDefault();
      const db = fire.firestore();

      db.settings({
        timestampsInSnapshots: true
      });

      db.collection('question').add({
        topic: this.state.topic,
        detail: this.state.detail
      });

      this.setState({
        topic: '',
        detail: ''
      });
    };
    
    render(){
        return (
          <div>
              <form onSubmit={this.addData}>
                <input
                  type="text"
                  name="topic"
                  placeholder="Input your name..."
                  onChange={this.updateInput}
                  // value={this.state.topic}
                />
                <br/>
                <input
                  type="text"
                  name="detail"
                  placeholder="detail"
                  onChange={this.updateInput}
                  // value={this.state.age1}
                />
                <br/>
                <button type="submit">Submit</button>
              </form>

              {/* <button onClick={this.getData}>
                Get Data
              </button> */}
             </div>
        );
    }
}

export default Field;