import React, { Component } from 'react';
import { connect } from 'react-redux';
import "antd/dist/antd.css";
import { Tag, Input, Tooltip, Icon } from "antd";

export class TagsInput extends Component {
    constructor() {
        super();
        this.state = {
            tags: [],
            inputVisible: false,
            inputValue: '',
        }
    }
    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        this.state.tags = tags;
    };

    showInput = () => { this.setState({ inputVisible: true }, () => this.input.focus()); };

    handleInputChange = e => { this.setState({ inputValue: e.target.value }); };

    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        this.props.dispatch({
            type: 'SET_TAGSINPUT',
            payload: tags
        });
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };
    saveInputRef = input => (this.input = input);
    render() {
        const { tags, inputVisible, inputValue } = this.state;
        return (
            <div>
                {tags.map((tag, index) => {
                    const isLongTag = tag.length > 10;
                    const tagElem = (
                        <Tag key={tag} closable={true} onClose={() => this.handleClose(tag)}>
                            {isLongTag ? `${tag.slice(0, 10)}...` : tag}
                        </Tag>
                    );

                    return isLongTag ?
                        (
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
        )
    }
}

export default connect()(TagsInput)
