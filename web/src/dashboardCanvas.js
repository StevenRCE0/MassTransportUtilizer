import React from 'react'
import Portal from "./Portal";
import {Layer, Rect, Stage} from "react-konva";
import {CircularProgress} from "@material-ui/core";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {size: 300, rounded: 20, circle0: '#A00'}
    }
    render() {
        return (
            <Stage width={this.state.size} height={this.state.size}>
                <Layer>
                    <Rect
                        x={10} y={10} width={this.state.size - 20} height={this.state.size - 20}
                        fill={'#EEE'}
                        shadowBlur={10}
                        cornerRadius={this.state.rounded}
                    />
                </Layer>
                <Layer>
                    <Portal>
                        <CircularProgress
                            style={{
                                position: 'absolute',
                                
                                top: this.state.rounded,
                                left: this.state.rounded,
                            }}
                            variant={'determinate'}
                            value={70}
                        />
                    </Portal>
                </Layer>
            </Stage>
        )
    }
}

export default Dashboard