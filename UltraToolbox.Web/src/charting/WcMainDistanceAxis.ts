import { Brush } from "../wcgraph/Brush";
import { Font } from "../wcgraph/Font";
import { IRenderer } from "../wcgraph/IRenderer";
import { IWcView } from "../wcgraph/IWcView";
import { Pen } from "../wcgraph/Pen";
import { Point } from "../wcgraph/Point";
import { TextAlignment } from "../wcgraph/TextAlignment";
import { WcFigure } from "../wcgraph/WcFigure";
import { WcPointF } from "../wcgraph/WcPointF";
import { IChartAxis } from "./IChartAxis";

class LabelSettings {
    public font: Font = new Font("Arial", 12);
    public fill: Brush = new Brush("#BBBBBB");
    public stroke: Pen = new Pen("Gray", 1);
    public majorSize: number = 50;
    public minorSize: number = 10;
    public axisStroke: Pen = new Pen("#BBBBBB", 3);
}

export class WcMainDistanceAxis extends WcFigure {
    private settings: LabelSettings = new LabelSettings();

    constructor(private axis: IChartAxis) {
        super();
    }

    public draw(renderer: IRenderer, view: IWcView): void {
        let minPoint: Point = view.worldPointToDevice(new WcPointF(this.axis.min, 0));
        let maxPoint: Point = view.worldPointToDevice(new WcPointF(this.axis.max, 0));

        renderer.drawLine(minPoint, maxPoint, this.settings.axisStroke);

        for (var pos: number = this.axis.min + this.axis.gridMinor; pos <= this.axis.max; pos += this.axis.gridMinor) {
            let location: Point = view.worldPointToDevice(new WcPointF(pos, 0));

            let isMajor: boolean = this.axis.major(pos);

            let size = isMajor ? this.settings.majorSize: this.settings.minorSize;

            let startPoint: Point = new Point(location.x, location.y);
            let endPoint: Point = new Point(location.x, location.y - size); 

            renderer.drawLine(startPoint, endPoint, this.settings.stroke);

            let prefix: boolean = true;// pos == this.axis.min;

            if (isMajor) {
                renderer.drawText(this.axis.format(pos, prefix), endPoint, this.settings.font, this.settings.fill, TextAlignment.CenterBottom);
            }
        }


    }
}