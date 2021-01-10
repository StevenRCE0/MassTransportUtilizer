import React from "react";
import "./style.css";

class MapSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            "allOptions": this.props.switchOptions,
        }
    }
    componentDidMount() {
        this.setState({"activated": this.state.allOptions[0]})
    }
    enumOptions(props, setState) {
        let optionsController = []
        this.state.allOptions.forEach(
            function (perOption) {
                let acClass = ""
                console.log(props.activated)
                if (props.activated === perOption) {
                    acClass = "activatedR"
                }
                optionsController.push(
                    <button
                        onClick={() => (
                            setState({"activated": perOption})
                        )}
                        className={acClass}
                    >
                        {perOption}
                    </button>
                )
            }
        )
        return optionsController
    }

    render() {
        return(
            <div className={"SwitchBase"}>
                {this.enumOptions(this.props.state, this.props.setState)}
            </div>
        )
    }
}

export default MapSwitch;