import React from "react";
import {Button as MNButton} from '@material-ui/core';

const MNButtonStyle = {
    borderRadius: '999px',
    backgroundColor: 'rgba(80, 80, 80, 0.1)'
}

export class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onClick: this.props.onClick,
        }
    }

    render() {
        return(
            <MNButton variant={"contained"} style={MNButtonStyle} onClick={this.state.onClick}>
                {this.props.children}
            </MNButton>
        )
    }
}

export class ButtonDone extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onClick: this.props.onClick,
        }
    }
    render() {
        return(
            <button className={"button Done"} onClick={this.state.onClick}>
                好
            </button>
        )
    }
}

export default Button