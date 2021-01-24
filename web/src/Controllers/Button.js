import React from "react";
import './style.css';

class Button extends React.Component {
    render() {
        return(
            <button>
                {this.props.children}
            </button>
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