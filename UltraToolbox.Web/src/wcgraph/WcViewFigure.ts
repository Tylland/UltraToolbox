import { IWcView } from "./IWcView";
import { Point } from "./Point";

export class WcViewFigure {
    constructor(public view: IWcView, public figure: any, public point: Point) { }
}