import * as React from "react";


type JsonInputProps = {
    onLoaded(inputJson: any): void;
    }

export class JsonInput extends React.Component<JsonInputProps, { inputJson: any }> {

    constructor(props: JsonInputProps) {
        super(props);

        this.state = {
            inputJson: '{   "wheel": {                 "label": "Testar",                 "spokes": [{ "label": "Endurance", "score": 5 }, { "label": "Energy", "score": 7 }, { "label": "Strength", "score": 8 }]             }        }' };
    }

    render() {
        return (<>
            <textarea rows={8} value={this.state.inputJson} onChange={this.handleChange} ></textarea>
            <button onClick={this.load}>Load</button>
            </>);
    }

    handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        this.setState({ inputJson: e.target.value });
    }

    load = (): void => {
        this.props.onLoaded(this.state.inputJson);
    }

}