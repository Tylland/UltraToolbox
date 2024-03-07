import * as React from "react";
import { WheelLexer, WheelParser } from "./WheelParser";
import { JsonWheelVisitor } from "./JsonWheelVisitor";
import { Wheel } from "./model/Wheel";


type WheelInputProps = {
    onLoaded(wheel: Wheel): void;
    initialValue: string | undefined;
}

export class WheelInput extends React.Component<WheelInputProps, { inputText: string }> {
    private parser: WheelParser;
    private textAreaRef: React.RefObject<HTMLTextAreaElement>;
    constructor(props: WheelInputProps) {
        super(props);


        this.textAreaRef = React.createRef<HTMLTextAreaElement>();

        this.parser = new WheelParser();

        let initialValue = '"Endurance" : 6';

        if (this.props.initialValue != undefined) {
            initialValue = atob(this.props.initialValue);
            this.loadInput(initialValue);
        }

        this.state = {
            inputText: initialValue
        };


        this.loadText = this.loadText.bind(this);
    }

    loadInput(text: string) {
        this.parser.input = WheelLexer.tokenize(text).tokens;

        const cst = this.parser.wheel();

        if (this.parser.errors.length > 0) {
            for (let index = 0; index < this.parser.errors.length; index++) {
                console.warn(this.parser.errors[index].message);
            }

        }
        else {
            const visitor = new JsonWheelVisitor();

            const ast = visitor.visit(cst);

            console.log(ast);

            this.props.onLoaded(ast);
        }
    }

    loadText(changeArgs: React.ChangeEvent<HTMLTextAreaElement>) {
        const text: string = changeArgs.currentTarget.value;

        this.loadInput(text);
        this.updateNavigation(text);
    }

    updateNavigation(text: string) {
        const scribble = btoa(text);

        window.history.pushState({}, '', '/wheel/' + encodeURI(scribble));


        this.state = {
            inputText: text
        };
    }

    render() {
        return (<>
            <textarea id="wheelInput" ref={this.textAreaRef} rows={12} defaultValue={this.state.inputText} onChange={this.loadText} ></textarea>
        </>);
    }
}
 

