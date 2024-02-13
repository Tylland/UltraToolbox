import { Point } from "./Point";
import { IRenderer } from "./IRenderer";
import { IWcRect } from "./IWcRect";
import { IWcView } from "./IWcView";
import { WcFigure } from "./WcFigure";
import { Brush } from "./Brush";
import { Pen } from "./Pen";

export class WcRectangle implements WcFigure {
    constructor(public rect: IWcRect, private fill: Brush, private stroke: Pen) { }

    public draw(renderer: IRenderer, view: IWcView): void {
        const rect = view.worldRectToDevice(this.rect);

        renderer.drawRect(rect, this.fill, this.stroke);
    }

    public hitTest(view: IWcView, point: Point, _foundFigures: WcFigure[]): boolean {
        const rect = view.worldRectToDevice(this.rect);

        //return false;

        return rect.contains(point);
    }
}