import { IWcPoint } from "./IWcPoint";
import { IWcView } from "./IWcView";

export class WcMouseEventArgs {
    constructor(public x: number, public y: number, public point: IWcPoint, public view: IWcView) { }
}