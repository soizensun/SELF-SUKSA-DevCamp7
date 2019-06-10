import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { message, Input } from 'antd';
import fire from '../Config';
const { TextArea } = Input;

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
      if ( this.state.topic != "" && this.state.detail != "" ){
        message.loading('saving your question', 1.0).then(() => message.success('already ask', 2.5))
        db.collection('question').add({
          topic: this.state.topic,
          detail: this.state.detail
        });
        this.setState({
          topic: '',
          detail: ''
        });
      }
      else {
        message.error('Please fill in all of textField');
      }
    };
    
    render(){
        return (
          <div>
            <form onSubmit={this.addData}>
              <Input 
                size="large"
                placeholder="your topic" 
                allowClear 
                onChange={this.updateInput} 
                value={this.state.topic} 
                name="topic"
              />
                <br/>
              <TextArea 
                name="detail"
                placeholder="detail"
                onChange={this.updateInput}
                value={this.state.detail}
                autosize
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