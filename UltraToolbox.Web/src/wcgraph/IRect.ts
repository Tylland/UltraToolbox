import { Margin } from "./Margin";
import { Point } from "./Point";

export interface IRect {
    min: Point;
    max: Point;
    x: number;
    y: number;
    width: number;
    height: number;

    apply(margin: Margin): IRect;
    getCenter(): Point;
    contains(point: Point): boolean;
}
