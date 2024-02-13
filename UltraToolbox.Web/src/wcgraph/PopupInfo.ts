import { Point } from "./Point";
import { TextAlignment } from "./TextAlignment";

export class PopupInfo {
    constructor(public text: string, public basePoint: Point, public alignment: TextAlignment) { }
}