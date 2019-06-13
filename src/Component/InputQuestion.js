import React, {Component} from 'react';
import 'antd/dist/antd.css';
import { message, Input, Tag, Tooltip, Icon, Menu, Dropdown, Form, Select, Button } from 'antd';
import fire from '../Config';

const { TextArea } = Input;
const { Option } = Select;

class InputQuestion extends React.Component {
  constructor(){
    super();    
    this.state = {
      topic: '',
      detail: '',
      type: '',
      allData: [],

      tags: [],
      inputVisible: false,
      inputValue: '',
    }
  }

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = e => {
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
        type : this.state.type,
      });
      this.setState({
        topic: '',
        detail: '',
        tag: '',
        type: '',
      });
    }
    else {
      message.error('Please fill in all of textField');
    }
  };

////////////////////// TAG CONTROL ///////////////////
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
////////////////////////////////////////////////////////

      handleSelectChange = (res) => {
        // console.log(type)
        this.setState({
          type : res
        })
      };


    render(){
      const { tags, inputVisible, inputValue } = this.state;
      const { getFieldDecorator } = this.props.form;

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

            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>

               <Form.Item label="TOPIC">
                  {getFieldDecorator('topic', {
                    rules: [{ required: true, message: 'Please input your TOPIC !' }],
                  })(
                    <Input allowClear 
                      placeholder="your topic" 
                      onChange={this.updateInput} 
                      value={this.state.topic} 
                      name="topic"
                    />
                  )}
               </Form.Item>

               <Form.Item label="DETAIL">
                  {getFieldDecorator('detail', {
                    rules: [{ required: true, message: 'Please input your DETAIL !' }],
                  })(
                    <TextArea autosize
                      name="detail"
                      placeholder="detail"
                      onChange={this.updateInput}
                      value={this.state.detail}
                    />
                  )}
               </Form.Item>

               <Form.Item label="TYPE">
                 {getFieldDecorator('gender', {
                   rules: [{ required: true, message: 'Please select your type!' }],
                 })(
                   <Select
                     placeholder="Select your type of question"
                     onChange={this.handleSelectChange}
                     style={{}}
                     value={this.state.type}
                  >
                    <Option value="PAT1">  
                      <Icon type="file-excel" />
                      <span className="nav-text">    PAT1</span>
                     </Option>
                    <Option value="PAT2">
                      <Icon type="thunderbolt" />
                      <span className="nav-text">    PAT2</span>
                    </Option>
                    <Option value="GAT">
                        <Icon type="flag" />
                        <span className="nav-text">    GAT</span>
                    </Option>
                    <Option value="O-NET">
                        <Icon type="code" />
                        <span className="nav-text">    O-NET</span>
                    </Option>    

                  </Select>,
                )}
              </Form.Item>

              <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
    }
}

const InputQuestion1 = Form.create({ name: 'coordinated' })(InputQuestion);

export default InputQuestion1;