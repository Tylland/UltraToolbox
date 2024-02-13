import { IWcView } from "./IWcView";
import { Point } from "./Point";
import { WcFigure } from "./WcFigure";

export interface IHittable {
	hitTest(view: IWcView, point: Point, foundFigures: WcFigure[]): boolean;
}