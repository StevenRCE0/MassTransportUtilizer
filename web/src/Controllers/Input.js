import React from "react";
import "./style.css"

class Input extends React.Component {
    render() {
        return(
            <div className={'InputFunction'}>
                <label>
                    {this.props.children}
                </label>
                <input/>
            </div>
        )
    }
}

export default Input