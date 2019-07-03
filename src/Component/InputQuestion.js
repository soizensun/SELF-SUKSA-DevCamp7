import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import { message, Input, Icon, Form, Select, Button, Radio } from 'antd';
import TagsInput from './TagsInput';

const { fire, createQuiz } = require('../redux-firebase/firebaseControl');
const { TextArea } = Input;
const { Option, OptGroup } = Select;

const mapStateToProps = (state) => {
  return {
    tags: state.tagsInput
  }
}

class InputQuestion extends React.Component {

  handleAddQuestion = () => {
    const { form } = this.props;
    let keysQuestionArr = form.getFieldValue('keysOfQuestionObjs');
    keysQuestionArr = keysQuestionArr.concat(keysQuestionArr.length)

    form.setFieldsValue({
      keysOfQuestionObjs: keysQuestionArr,
    });
  };
  handleRemoveQuestion = k => {
    const { form } = this.props;
    const keys = form.getFieldValue('keysOfQuestionObjs');
    if (keys.length === 1) {
      return;
    }
    form.setFieldsValue({
      keysOfQuestionObjs: keys.filter(key => key !== k),
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        // console.log('values.questionObjs: ',values.questionObjs);
         
        createQuiz(values.topic, values.detail, values.type, this.props.tags, values.questionObjs);
        message.loading('saving your question', 1.0).then(() => message.success('already submit', 2.5))
      }
    })
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 4 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 20 } }
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 20, offset: 4 } }
    };

    getFieldDecorator("keysOfQuestionObjs", { initialValue: [] });
    const keysOfQuestionObjs = getFieldValue("keysOfQuestionObjs");
    const questionForm = keysOfQuestionObjs.map((key, index) => (
      <Form.Item
        label={`Questions ${index + 1}`}
        required={false}
        key={key}
      >
        {getFieldDecorator(`questionObjs[${key}].correctChoice`, {
          validateTrigger: ["onChange", "onBlur"],
          rules: [{ required: true, message: "Please select your CORRECT CHOICE !" }]
        })(
          <Radio.Group>
            {getFieldDecorator(`questionObjs[${key}].question`, {
              validateTrigger: ["onChange", "onBlur"],
              rules: [{ required: true, message: "Please select your QUESTION !" }]
            })(
              <Input
                allowClear
                placeholder="Please enter a question."
                style={{ width: "76%", marginRight: 8, marginLeft: 22 }}
              />
            )}
            {keysOfQuestionObjs.length > 1 ? (
              <Icon
                className="dynamic-delete-button"
                type="minus-circle-o"
                onClick={() => this.handleRemoveQuestion(key)}
                style={{ alignSelf: 'flex-start' }}
              />
            ) : null}
            {getFieldDecorator(`questionObjs[${key}].choices[0]`, {
              validateTrigger: ["onChange", "onBlur"],
              rules: [{ required: true, message: "Please select your CHOICE 1 !" }]
            })(
              <div>
                <div>Choice 1</div>
                <Input
                  placeholder="Please enter a choice."
                  style={{ width: "76%", marginRight: 8, marginLeft: 22 }}
                />
              </div>
            )}
            {getFieldDecorator(`questionObjs[${key}].reasons[0]`, {
              validateTrigger: ["onChange", "onBlur"],
              rules: [{ required: true, message: "What is REASON of this choice !" }]
            })(
              <div>
                <TextArea
                  autosize
                  placeholder="Please enter a reason of this choice."
                  style={{ width: "76%", marginRight: 8, marginLeft: 22 }}
                />

                <Radio value={1} style={{ marginLeft: 22 }}>
                  This choice is correct.
                  </Radio>

              </div>
            )}
            {getFieldDecorator(`questionObjs[${key}].choices[1]`, {
              validateTrigger: ["onChange", "onBlur"],
              rules: [{ required: true, message: "Please select your CHOICE 2 !" }]
            })(
              <div>
                <div>Choice 2</div>
                <Input
                  placeholder="Please enter a choice."
                  style={{ width: "76%", marginRight: 8, marginLeft: 22 }}
                />
              </div>
            )}
            {getFieldDecorator(`questionObjs[${key}].reasons[1]`, {
              validateTrigger: ["onChange", "onBlur"],
              rules: [{ required: true, message: "What is REASON of this choice !" }]
            })(
              <div>
                <TextArea
                  autosize
                  placeholder="Please enter a reason of this choice."
                  style={{ width: "76%", marginRight: 8, marginLeft: 22 }}
                />

                <Radio value={2} style={{ marginLeft: 22 }}>
                  This choice is correct.
                  </Radio>

              </div>
            )}
            {getFieldDecorator(`questionObjs[${key}].choices[2]`, {
              validateTrigger: ["onChange", "onBlur"],
              rules: [{ required: true, message: "Please select your CHOICE 3 !" }]
            })(
              <div>
                <div>Choice 3</div>
                <Input
                  placeholder="Please enter a choice."
                  style={{ width: "76%", marginRight: 8, marginLeft: 22 }}
                />
              </div>
            )}
            {getFieldDecorator(`questionObjs[${key}]reasons[2]`, {
              validateTrigger: ["onChange", "onBlur"],
              rules: [{ required: true, message: "What is REASON of this choice !" }]
            })(
              <div>
                <TextArea
                  autosize
                  placeholder="Please enter a reason of this choice."
                  style={{ width: "76%", marginRight: 8, marginLeft: 22 }}
                />

                <Radio value={3} style={{ marginLeft: 22 }}>
                  This choice is correct.
                  </Radio>

              </div>
            )}
            {getFieldDecorator(`questionObjs[${key}].choices[3]`, {
              validateTrigger: ["onChange", "onBlur"],
              rules: [{ required: true, message: "Please select your CHOICE 4 !" }]
            })(
              <div>
                <div>Choice 4</div>
                <Input
                  placeholder="Please enter a choice."
                  style={{ width: "76%", marginRight: 8, marginLeft: 22 }}
                />
              </div>
            )}
            {getFieldDecorator(`questionObjs[${key}].reasons[3]`, {
              validateTrigger: ["onChange", "onBlur"],
              rules: [{ required: true, message: "What is REASON of this choice !" }]
            })(
              <div>
                <TextArea
                  autosize
                  placeholder="Please enter a reason of this choice."
                  style={{ width: "76%", marginRight: 8, marginLeft: 22 }}
                />

                <Radio value={4} style={{ marginLeft: 22 }}>
                  This choice is correct.
                  </Radio>

              </div>
            )}
          </Radio.Group>
        )}
      </Form.Item>
    ));

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <TagsInput />
        <Form.Item label="TOPIC: " hasFeedback>
          {getFieldDecorator("topic", {
            rules: [{ required: true, message: "Please enter your TOPIC !" }]
          })(<Input allowClear placeholder="Please enter a TOPIC." />)}
        </Form.Item>
        <Form.Item label="DETAIL: " hasFeedback>
          {getFieldDecorator("detail", {
            rules: [{ required: true, message: "Please enter your DETAIL !" }]
          })(<TextArea allowClear placeholder="Please enter a DETAIL." />)}
        </Form.Item>
        <Form.Item label="TYPE: " hasFeedback>
          {getFieldDecorator("type", {
            rules: [{ required: true, message: "Please select your TYPE !" }]
          })(
            <Select placeholder="Please select a TYPE.">
              <OptGroup label="เตรียมสอบ">
                <Option value="PAT1">
                  <Icon type="file-excel" />
                  <span className="nav-text"> PAT1 </span>
                </Option>
                <Option value="PAT2">
                  <Icon type="thunderbolt" />
                  <span className="nav-text"> PAT2 </span>
                </Option>
                <Option value="GAT">
                  <Icon type="thunderbolt" />
                  <span className="nav-text"> GAT </span>
                </Option>
                <Option value="O-NET">
                  <Icon type="thunderbolt" />
                  <span className="nav-text"> O-NET </span>
                </Option>
                <Option value="ประเมินตนเอง">
                  <Icon type="thunderbolt" />
                  <span className="nav-text"> ประเมินตนเอง </span>
                </Option>
              </OptGroup>
              <OptGroup label="แบบฝึกหัด">
                <Option value="Math">
                  <Icon type="flag" />
                  <span className="nav-text"> Math </span>
                </Option>
                <Option value="Science">
                  <Icon type="code" />
                  <span className="nav-text"> Science </span>
                </Option>
                <Option value="Language">
                  <Icon type="thunderbolt" />
                  <span className="nav-text"> Language </span>
                </Option>
                <Option value="Programming">
                  <Icon type="thunderbolt" />
                  <span className="nav-text"> Programming </span>
                </Option>
              </OptGroup>
            </Select>
          )}
        </Form.Item>
        <hr />
        {questionForm}
        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button
            type="dashed"
            onClick={this.handleAddQuestion}
            style={{ width: "60%" }}
          >
            <Icon type="plus" /> Add field
          </Button>
        </Form.Item>

        <Form.Item {...formItemLayoutWithOutLabel}>
          <Button type="primary" onClick={this.handleSubmit}>
            Submit quiz
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const InputQuestion1 = Form.create({ name: 'dynamic_form_item' })(InputQuestion);

export default connect(mapStateToProps)(InputQuestion1);