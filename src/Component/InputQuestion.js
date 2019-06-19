import React from 'react';
import 'antd/dist/antd.css';
import { message, Input, Tag, Tooltip, Icon, Form, Select, Button, Radio  } from 'antd';
import fire from '../Config';
import ColumnGroup from 'antd/lib/table/ColumnGroup';

const { TextArea } = Input;
const { Option, OptGroup } = Select;
let id = 0;


class InputQuestion extends React.Component {
  constructor(){
    super();    
    this.state = {
      topic: '',
      detail: '',
      type: '',
      ////////////////////
      question: [],
      choice1: [],
      reason1: [],
      choice2: [],
      reason2: [],
      choice3: [],
      reason3: [],
      choice4: [],
      reason4: [],
   ///////////////////////////////////
      tags: [],
      inputVisible: false,
      inputValue: '',

      test: 0,
      value: [],
    }
  }

  onChangeRadio = e => {
    // console.log(e.target.value);
    this.setState({
      value: this.state.value.concat(e.target.value)
    });
    console.log(this.state.value);
  };

  remove = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(id++);
    form.setFieldsValue({
      keys: nextKeys,
    });
  };

  smallSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var checkQuestion = true;
        values.question.map((res) =>{if(res == undefined){checkQuestion = false}})
        var checkChoice1 = true; 
        values.choice1.map((res) =>{if(res == undefined){checkChoice1 = false}})
        var checkChoice2 = true;
        values.choice2.map((res) =>{if(res == undefined){checkChoice2 = false}})
        var checkChoice3 = true;
        values.choice3.map((res) =>{if(res == undefined){checkChoice3 = false}})
        var checkChoice4 = true;
        values.choice4.map((res) =>{if(res == undefined){checkChoice4 = false}})
        
        var checkReason1 = true;
        values.reason1.map((res) =>{if(res == undefined){checkReason1 = false}})
        var checkReason2 = true;
        values.reason2.map((res) =>{if(res == undefined){checkReason2 = false}})
        var checkReason3 = true;
        values.reason3.map((res) =>{if(res == undefined){checkReason3 = false}})
        var checkReason4 = true;
        values.reason4.map((res) =>{if(res == undefined){checkReason4 = false}})

        // var checkCorrectChoice = true;
        // (this.state.value).map((res) => {if(res == ''){ checkCorrectChoice = false }})

        if(checkQuestion == true && checkChoice1 == true && checkChoice2 == true && checkChoice3 == true && checkChoice4 == true &&
          checkReason1 == true && checkReason2 == true && checkReason3 == true && checkReason4 == true){
            message.success('confirm question', 2.5)    
            this.setState({
              test: 1,
            });
            this.setState({
              question : values.question,
              choice1: values.choice1,
              reason1: values.reason1,
              choice2: values.choice2,
              reason2: values.reason2,
              choice3: values.choice3,
              reason3: values.reason3,
              choice4: values.choice4,
              reason4: values.reason4,
            })
          }
          else{ message.error('Please fill in all of form'); }
      }
      else { message.error('error'); }
    });
  };

  updateInput = e => { this.setState({ [e.target.name]: e.target.value }); }
  handleDropdown = e =>{ this.setState({ type : e }) }

  handleSubmit = e => {
    e.preventDefault();
    const db = fire.firestore();
    db.settings({ timestampsInSnapshots: true });
    if ( this.state.topic !== "" && this.state.detail !== "" && this.state.type !== "" &&  this.state.question !== "" &&
    this.state.choice1 !== "" && this.state.choice2 !== "" && this.state.choice3 !== "" && this.state.choice4 !== "" &&
    this.state.reason1 !== "" && this.state.reason2 !== "" && this.state.reason3 !== "" && this.state.reason4 !== "" && this.state.value != "" ){
      message.loading('saving your question', 1.0).then(() => message.success('already submit', 2.5))
      db.collection('question').add({
        topic: this.state.topic,
        detail: this.state.detail,
        tag : this.state.tags,
        type : this.state.type,

        question: this.state.question,
        choice1: this.state.choice1,
        reason1: this.state.reason1,
        choice2: this.state.choice2,
        reason2: this.state.reason2,
        choice3: this.state.choice3,
        reason3: this.state.reason3,
        choice4: this.state.choice4,
        reason4: this.state.reason4,
        // correctChoice: this.state.value,
      });
      this.setState({
        topic: '',
        detail: '',
        tag: '',
        type: this.state.type,
      });
    }
    else { message.error('Please fill in all of from'); }
  };

////////////////////// TAG CONTROL ///////////////////
    handleClose = removedTag => {
      const tags = this.state.tags.filter(tag => tag !== removedTag);
      console.log(tags);
      this.setState({ tags });
    };
    showInput = () => { this.setState({ inputVisible: true }, () => this.input.focus()); };
    handleInputChange = e => { this.setState({ inputValue: e.target.value }); };
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
    checkStatus = () => {
      if(this.state.test == 0){
        return(
          <div>
            <Button disabled type="primary" onClick={this.handleSubmit} style={{padding: '100', width: '155%', marginLeft: 0}}>
              Submit quiz
            </Button>
          </div>
        );
      }
      else {
        return(
          <div>
            <Button  type="primary" onClick={this.handleSubmit} style={{padding: '100', width: '155%', marginLeft: 0}}>
            Submit quiz
            </Button>
          </div>
        );
      }
    }
    render(){
      const { tags, inputVisible, inputValue } = this.state;
      const { getFieldDecorator } = this.props.form;
      const { getFieldValue } = this.props.form;

      const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 4 }, },
        wrapperCol: { xs: { span: 24 }, sm: { span: 20 }, },
      };
      const formItemLayoutWithOutLabel = {
        wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 19, offset: 5 }, },
      };

      var submitQuiz =  this.checkStatus();

      getFieldDecorator('keys', { initialValue: [] });
      const keys = getFieldValue('keys');
      const formItems = keys.map((k, index) => (
        <Radio.Group onChange={this.onChangeRadio} >
        <Form.Item
          {...( formItemLayout )}
          label={index + 1}
          required={false}
          key={k}
        >

          {
            getFieldDecorator(`question[${k}]`,  { validateTrigger: ['onChange', 'onBlur'] })
            (
              <Input placeholder="question" style={{ width: '76%', marginRight: 8, marginLeft: 22 }} />
            ) 
          }
          { 
            getFieldDecorator(`choice1[${k}]]`,  { validateTrigger: ['onChange', 'onBlur'] })
            (
              <div><div>choice1</div>
                <Input placeholder="choice 1" style={{ width: '76%', marginRight: 8, marginLeft: 22 }} />
              </div>
            )
          }
          { 
            getFieldDecorator(`reason1[${k}]`,  { validateTrigger: ['onChange', 'onBlur'] })
            (
              <div>
                <TextArea autosize placeholder="reason 1" style={{ width: '76%', marginRight: 8, marginLeft: 22 }}/>
                <Radio value={1} style={{ marginLeft: 22 }}>choice 1 is correct choice</Radio>
              </div>
            )
          }
          { 
            getFieldDecorator(`choice2[${k}]`,  { validateTrigger: ['onChange', 'onBlur'] })
            (
              <div><div>choice2</div>
                <Input placeholder="choice 2" style={{ width: '76%', marginRight: 8, marginLeft: 22 }} />
              </div>
            )
          }
          { 
            getFieldDecorator(`reason2[${k}]`,  { validateTrigger: ['onChange', 'onBlur'] })
            (
              <div>
                <TextArea autosize  placeholder="reason 2" style={{ width: '76%', marginRight: 8, marginLeft: 22 }}/>
                <Radio value={2} style={{ marginLeft: 22 }}>choice 2 is correct choice</Radio>
              </div>
            )
          }
          { 
            getFieldDecorator(`choice3[${k}]`,  { validateTrigger: ['onChange', 'onBlur'] })
            (
              <div><div>choice3</div>
                <Input placeholder="choice 3" style={{ width: '76%', marginRight: 8, marginLeft: 22 }} />
              </div>
            )
          }
          { 
            getFieldDecorator(`reason3[${k}]`,  { validateTrigger: ['onChange', 'onBlur'] })
            (
              <div>
                <TextArea autosize  placeholder="reason 3" style={{ width: '76%', marginRight: 8, marginLeft: 22 }}/>
                <Radio value={3} style={{ marginLeft: 22 }}>choice 3 is correct choice</Radio>
              </div>
            )
          }
          { 
            getFieldDecorator(`choice4[${k}]`,  { validateTrigger: ['onChange', 'onBlur'] })
            (
              <div><div>choice4</div>
                <Input placeholder="choice 4" style={{ width: '76%', marginRight: 8, marginLeft: 22 }} />
              </div>
            )
          }
          { 
            getFieldDecorator(`reason4[${k}]`,  { validateTrigger: ['onChange', 'onBlur'] })
            (
              <div>
                <TextArea autosize  placeholder="reason 4" style={{ width: '76%', marginRight: 8, marginLeft: 22 }}/>
                <Radio value={4} style={{ marginLeft: 22 }}>choice 4 is correct choice</Radio>
              </div>
            )
          }
          {
              keys.length > 1 ? (
                <div>
                  <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    onClick={() => this.remove(k)}
                  />
                  <hr/>
                </div>
            ) : null
          }
        </Form.Item>
        </Radio.Group>
      ));

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

            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>

               <Form.Item label="TOPIC" style = {{margin: 0}}>
                    <Input allowClear 
                      placeholder="your topic" 
                      onChange={this.updateInput} 
                      value={this.state.topic} 
                      name="topic"
                    />
               </Form.Item>

               <Form.Item label="DETAIL" style = {{margin: 0}}>
                    <TextArea autosize
                      name="detail"
                      placeholder="detail"
                      onChange={this.updateInput}
                      value={this.state.detail}
                    />
               </Form.Item>

               <Form.Item label="TYPE" style = {{margin: 0}}>
                 {getFieldDecorator('gender', {
                   rules: [{ required: false, message: 'Please select your type!' }],
                 })(
                   <Select
                     placeholder="Select your type of question"
                     onChange={this.handleDropdown}
                     value={this.state.type}
                  >
                    <OptGroup label="test1">
                      <Option value="PAT1">  
                        <Icon type="file-excel" />
                        <span className="nav-text">    PAT1</span>
                      </Option>
                      <Option value="PAT2">
                        <Icon type="thunderbolt" />
                        <span className="nav-text">    PAT2</span>
                      </Option>
                    </OptGroup>
                    <OptGroup label="test2">
                      <Option value="GAT">
                          <Icon type="flag" />
                          <span className="nav-text">    GAT</span>
                      </Option>
                      <Option value="O-NET">
                          <Icon type="code" />
                          <span className="nav-text">    O-NET</span>
                      </Option>  
                    </OptGroup>
                        

                  </Select>,
                )}
              </Form.Item>
              <hr/>
              <Form>
                {formItems}
                <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button type="dashed" onClick={this.add} style={{ width: '80%' }}>
                    <Icon type="plus" /> Add field
                  </Button>
                </Form.Item>
                <Form.Item {...formItemLayoutWithOutLabel}>
                  <Button type="ghost" onClick={this.smallSubmit} style={{ marginLeft: 150}}>
                    confirm question
                  </Button>
                </Form.Item>
              </Form>

              <Form.Item wrapperCol={{ span: 10, offset: 5 }}>
                {submitQuiz}
              </Form.Item>
            </Form>
          </div>
        );
    }
}

const InputQuestion1 = Form.create({ name: 'dynamic_form_item' })(InputQuestion);

export default InputQuestion1;