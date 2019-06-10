import React, { Component } from 'react';
import { Button } from 'antd';


class App1 extends React.Component {
    constructor(){
        super();

        this.state = {
            text : "button",
            key : "value"
        }

    }
    
    changeName = () => {
        this.setState({
            text : "already set state"
        });
    }

    render(){
        return(
            <div>
                <Button type="primary"> {this.state.text} </Button>

                <button onClick={this.changeName}>
                    setState
                </button>
            </div>
        );
    }
}

export default App1;