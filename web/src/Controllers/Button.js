import React from "react";
import './style.css';

class Button extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <button>
                {this.props.children}
            </button>
        )
    }
}

export default Button