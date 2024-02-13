import { WheelParser } from "./WheelParser";


const parserInstance = new WheelParser();

const BaseWheelVisitor = parserInstance.getBaseCstVisitorConstructor();

interface IWheelNode {
    categories: Array<any>;
}

interface ICategoryNode {
    StringLiteral: any;
    Score: any;
}

export class JsonWheelVisitor extends BaseWheelVisitor {
    constructor() {
        super()
        // The "validateVisitor" method is a helper utility which performs static analysis
        // to detect missing or redundant visitor methods
        this.validateVisitor()
    }

    /* Visit methods go here */

    wheel(node: IWheelNode) {

        let categories: Array<any> = [];

        if (node.categories != undefined)
            categories = node.categories.map(category => this.visit(category));

        console.log('wheel');

        return {
            categories: categories,
        };
    }

    categories(node: ICategoryNode) {
        let label: string = '';
        let score: number = 5;

        if (node.StringLiteral != undefined) {
            label = node.StringLiteral[0].image;
            label = label.substring(1, label.length - 1);
        }

        if (node.Score != undefined)
            score = parseFloat(node.Score[0].image);

        return {
            label: label,
            score: score,
        }
    }
}
