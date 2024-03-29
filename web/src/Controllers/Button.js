import React from "react";
import {Button as MNButton} from '@material-ui/core';

const MNButtonStyle = {
    borderRadius: '999px',
    backgroundColor: 'var(--themeButtonBackground)',
    color: 'var(--themeColor)',
}

export class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            onClick: this.props.onClick,
            type: (this.props.type !== undefined) ? this.props.type : "",
            disabled: (this.props.disabled === true),
        }
    }

    render() {
        return(
            <MNButton variant={"contained"} style={MNButtonStyle} onClick={this.state.onClick} type={this.state.type} disabled={this.state.disabled}>
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