import { IRenderer } from "../wcgraph/IRenderer";
import { IWcView } from "../wcgraph/IWcView";
import { Pen } from "../wcgraph/Pen";
import { Point } from "../wcgraph/Point";
import { WcFigure } from "../wcgraph/WcFigure";
import { WcPointF } from "../wcgraph/WcPointF";
import { WcRect } from "../wcgraph/WcRect";


export class WcSegmentBorder extends WcFigure {
    constructor(private location: number) {
        super();
    }

    public draw(renderer: IRenderer, view: IWcView): void {
        var deviceRect = view.worldRectToDevice(new WcRect(new WcPointF(this.location, view.window.min.y), new WcPointF(this.location, view.window.max.y)));

        renderer.drawLine(new Point(deviceRect.x, deviceRect.y), new Point(deviceRect.x, deviceRect.y + deviceRect.height), new Pen("Red", 1));
    }
}
