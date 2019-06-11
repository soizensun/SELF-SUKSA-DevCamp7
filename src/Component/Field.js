import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { message, Input, Tag, Tooltip, Icon } from 'antd';
import fire from '../Config';
const { TextArea } = Input;

class Field extends React.Component {
    state = {
      topic: '',
      detail: '',
      allData: [],

      tags: [],
      inputVisible: false,
      inputValue: '',
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
          detail: this.state.detail,
          tag : this.state.tags,
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
////////////////////// tag ///////////////////
    handleClose = removedTag => {
      const tags = this.state.tags.filter(tag => tag !== removedTag);
      console.log(tags);
      this.setState({ tags });
    };
  
    showInput = () => {
      this.setState({ inputVisible: true }, () => this.input.focus());
    };
  
    handleInputChange = e => {
      this.setState({ inputValue: e.target.value });
    };
  
    handleInputConfirm = () => {
      const { inputValue } = this.state;
      let { tags } = this.state;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      console.log(tags);
      this.setState({
        tags,
        inputVisible: false,
        inputValue: '',
      });
    };

    saveInputRef = input => (this.input = input);
////////////////////////////////////////////////
    render(){
      const { tags, inputVisible, inputValue } = this.state;
        return (
          <div>
                  <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 10;
          const tagElem = (
            <Tag key={tag} closable={index !== -1} onClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> New Tag
          </Tag>
        )}
      </div>
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