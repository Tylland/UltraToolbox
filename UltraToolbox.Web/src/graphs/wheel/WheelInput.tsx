import * as React from "react";
import { WheelLexer, WheelParser } from "./WheelParser";
import { JsonWheelVisitor } from "./JsonWheelVisitor";
import { Wheel } from "./model/Wheel";


type JsonInputProps = {
    onLoaded(wheel: Wheel): void;
}

export class WheelInput extends React.Component<JsonInputProps, { inputText: string }> {
    private parser: WheelParser;
    private textAreaRef: React.RefObject<HTMLTextAreaElement>;
    constructor(props: JsonInputProps) {
        super(props);


        this.textAreaRef = React.createRef<HTMLTextAreaElement>();

        this.state = {
            inputText: '"Endurance" : 6'
        };

        this.parser = new WheelParser();

        this.parse = this.parse.bind(this);
    }

    parse(changeArgs: React.ChangeEvent<HTMLTextAreaElement>) {
        const text: string = changeArgs.currentTarget.value;

        this.parser.input = WheelLexer.tokenize(changeArgs.currentTarget.value).tokens;

        var cst = this.parser.wheel();

        if (this.parser.errors.length > 0) {
            for (let index = 0; index < this.parser.errors.length; index++) {
                console.warn(this.parser.errors[index].message);
            }

        }
        else {
            var visitor = new JsonWheelVisitor();

            var ast = visitor.visit(cst);

            console.log(ast);

            this.props.onLoaded(ast);
        }

        this.state = {
            inputText: text
        };
    }

    render() {
        return (<>
            <textarea id="wheelInput" ref={this.textAreaRef} rows={12} defaultValue={this.state.inputText} onChange={this.parse} ></textarea>
        </>);
    }
}
 

