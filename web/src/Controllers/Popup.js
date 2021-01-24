import React from "react";
import './popup.css';
import { ButtonDone } from "./Button";

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div className={'BackdropClear'}>
                <div className={'Panel'}>
                    <div className={'Title'}>
                        {this.props.title}
                    </div>
                    {this.props.children}
                    <ButtonDone />
                </div>
            </div>
        )
    }
}

export default Popup