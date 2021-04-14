import React from "react";
import "./style.css"

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: (this.props.type !== undefined) ? this.props.type : "text"
        }
    }

    render() {
        return(
            <div className={'InputFunction'}>
                <label>
                    {this.props.children}
                </label>
                <input className={'coilsInput'} type={this.state.type} onChange={(event => this.props.handler(event))}/>
            </div>
        )
    }
}

export default Input