import WheelGraph from './WheelGraph';
import React from 'react';
import { WheelInput } from '../graphs/wheel/WheelInput';
import { Wheel } from '../graphs/wheel/model/Wheel';

class WheelComponent extends React.Component {
    private graphRef: React.RefObject<WheelGraph>;

    constructor(props: any) {
        super(props);

        this.graphRef = React.createRef<WheelGraph>();

        this.state = {
            loadedJson: "", 
        };

        //    this.loadedJson = json;

    }

    handleLoadedObject = (wheel: Wheel): void => {
        this.graphRef.current?.loadObject(wheel);
    }

    handleLoadedJson = (json: string): void => {
        this.graphRef.current?.loadJson(json);

        this.setState({
            loadedJson: json,
        });
    }

    render() {
                
        return (<>
            <div>
                <WheelInput onLoaded={this.handleLoadedObject}></WheelInput>
                <WheelGraph ref={this.graphRef} width={1000} height={1000} ></WheelGraph>
            {/*    <JsonInput onLoaded={this.handleLoadedJson}></JsonInput>*/}
            </div>
        </>);
    }
};

export default WheelComponent;