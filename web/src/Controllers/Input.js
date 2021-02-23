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
                <input type={this.state.type}/>
            </div>
        )
    }
}

export default Input