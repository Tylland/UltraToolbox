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
    public majorWidth: number = 10;
    public minorWidth: number = 5;
}

export class WcAxis extends WcFigure {
    private settings: LabelSettings = new LabelSettings();

    constructor(private axis: IChartAxis) {
        super();
    }

    public draw(renderer: IRenderer, view: IWcView): void {

        for (var y: number = this.axis.min; y <= this.axis.max; y = y + this.axis.gridMinor) {
            let location: Point = view.worldPointToDevice(new WcPointF(0, y));

            let isMajor: boolean = this.axis.major(y);

            let width = isMajor ? this.settings.majorWidth : this.settings.minorWidth;

            let startPoint: Point = new Point(location.x, location.y);
            let endPoint: Point = new Point(location.x - width, location.y); 

            renderer.drawLine(startPoint, endPoint, this.settings.stroke);

            let prefix: boolean = false; // y == this.axis.min;

            if (isMajor) {
                renderer.drawText(this.axis.format(y, prefix), endPoint, this.settings.font, this.settings.fill, TextAlignment.RightMiddle);
            }
        }
    }

}