import { Brush } from "./Brush";
import { IRenderer } from "./IRenderer";
import { IWcPoint } from "./IWcPoint";
import { IWcView } from "./IWcView";
import { Pen } from "./Pen";
import { Rect } from "./Rect";
import { WcFigure } from "./WcFigure";

export class WcCircle extends WcFigure {
    constructor(public location: IWcPoint, public radius: number, public fill: Brush, public stroke: Pen) {
        super();
    }

    public draw(renderer: IRenderer, view: IWcView): void {
        var point = view.worldPointToDevice(this.location);

        renderer.drawEllipse(Rect.fromRadius(point, this.radius), this.fill, this.stroke);
    }
}