import { Brush } from "./Brush";
import { IRenderer } from "./IRenderer";
import { IWcPoint } from "./IWcPoint";
import { IWcView } from "./IWcView";
import { Pen } from "./Pen";
import { WcFigure } from "./WcFigure";

export class WcPolygon extends WcFigure {
    constructor(private points: IWcPoint[], private fill: Brush, private stroke: Pen) {
        super();   
    }

    public draw(renderer: IRenderer, view: IWcView): void {

        var devicePoints = this.points.map(p => view.worldPointToDevice(p));

        renderer.drawPolygon(devicePoints, this.fill, this.stroke);
    }
}