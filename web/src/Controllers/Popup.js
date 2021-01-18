import React from "react";
import './popup.css';

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const title = "Box"
        return(
            <div className={'BackdropClear'}>
                <div className={'Panel'}>
                    <div className={'Title'}>
                        {this.props.title}
                    </div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Popup