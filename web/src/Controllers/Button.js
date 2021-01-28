import React from "react";
import {Button as MNButton} from '@material-ui/core/Button';
import './style.css';

class Button extends React.Component {
    render() {
        return(
            <MNButton>
                {this.props.children}
            </MNButton>
        )
    }
}

export class ButtonDone extends React.Component {
    render() {
        return(
            <button className={"Done"}>
                好
            </button>
        )
    }
}

export default Button