import WheelGraph from './WheelGraph';
import React from 'react';
import { WheelInput } from '../graphs/wheel/WheelInput';
import { Wheel } from '../graphs/wheel/model/Wheel';
import { useParams } from 'react-router-dom';


type WheelComponentProps = {
    scribble: string | undefined;
}

export class WheelComponent extends React.Component<WheelComponentProps> {
    private graphRef: React.RefObject<WheelGraph>;
    private pendingWheel: Wheel | undefined;
    constructor(props: any) {
        super(props);

        this.graphRef = React.createRef<WheelGraph>();

    }

    handleLoadedObject = (wheel: Wheel): void => {
        if (this.graphRef.current) {
            this.graphRef.current?.loadObject(wheel);
        }
        else {
            this.pendingWheel = wheel;
        }
    }

    componentDidMount() {
        if (this.pendingWheel) {
            this.graphRef.current?.loadObject(this.pendingWheel);
        }
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
                <WheelInput onLoaded={this.handleLoadedObject} initialValue={this.props.scribble}></WheelInput>
                <WheelGraph ref={this.graphRef} width={1000} height={1000} ></WheelGraph>
            </div>
        </>);
    }
};



function WheelComponentWithParameter() { 
    console.log("Rendering WheelComponentWithScribble...");

    //console.log(props.match.params.scribble);

    const { scribble } = useParams();

    return (
        <WheelComponent scribble = { scribble } />
    );
};

export default WheelComponentWithParameter;