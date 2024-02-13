import { Brush } from "../../wcgraph/Brush";
import { IRenderer } from "../../wcgraph/IRenderer";
import { IWcView } from "../../wcgraph/IWcView";
import { Pen } from "../../wcgraph/Pen";
import { Point } from "../../wcgraph/Point";
import { WcFigure } from "../../wcgraph/WcFigure";
import { WcPointF } from "../../wcgraph/WcPointF";
import { Category } from "./model/Category";
import { WheelSettings } from "./WheelSettings";
import { IDrawCommand } from "../../wcgraph/IDrawCommand";
import { Arc } from "../../wcgraph/ArcTo";
import { ColorInfo } from "../../palette/ColorInfo";
import { TextAlignment } from "../../wcgraph/TextAlignment";



export class WcWheelSector extends WcFigure {
    private brush: Brush;
    private pen: Pen;
    constructor(private center: WcPointF, private startAngle: number, private endAngle: number, private category: Category, color: ColorInfo, private settings: WheelSettings) {
        super();

        this.brush = new Brush(color.mediumHex);
        this.pen = new Pen(color.darkHex, 1);
    }

    //drawLine(renderer: IRenderer, view: IWcView, startX: number, startY: number, endX: number, endY: number): void {
    //    let startPoint: Point = view.worldPointToDevice(new WcPointF(startX, startY));
    //    let endPoint: Point = view.worldPointToDevice(new WcPointF(endX, endY));

    //    renderer.drawLine(startPoint, endPoint, this.settings.gridLine);
    //}

    //private calcPoint(center: WcPointF, radius: number, angle: number): WcPointF {
    //    const x = center.x + radius * Math.cos(angle)
    //    const y = center.y + radius * Math.sin(angle)

    //    return new WcPointF(x, y);
    //}

    public draw(renderer: IRenderer, view: IWcView): void {
        const radiusRange = this.settings.maxRadius - this.settings.minRadius;
        const score: number = Math.min(this.category.score, this.settings.maxScore)
        const scoreRadius = this.settings.minRadius + radiusRange * (score / this.settings.maxScore);

        const center: Point = view.worldPointToDevice(this.center);

        //renderer.debugPoint(center);

        const innerStart = view.worldPointToDevice(this.settings.calcPoint(this.center, this.settings.minRadius, this.startAngle));
        const outerStart = view.worldPointToDevice(this.settings.calcPoint(this.center, scoreRadius, this.startAngle));
        //const outerEnd = view.worldPointToDevice(this.calcPoint(center, outerRadius, this.endAngle));
        //const innerEnd = view.worldPointToDevice(this.calcPoint(center, innerRadius, this.endAngle));

        //renderer.debugPoint(innerStart);
        //renderer.debugPoint(outerStart);

        const innerRadius = center.distanceTo(innerStart);
        const outerRadius = center.distanceTo(outerStart);

        const commands: IDrawCommand[] = [];

        commands.push(new Arc(center.x, center.y, outerRadius, this.startAngle, this.endAngle));
        commands.push(new Arc(center.x, center.y, innerRadius, this.endAngle, this.startAngle));


        renderer.drawPath(commands, this.brush, this.pen);

        const labelLocation = view.worldPointToDevice(this.settings.calcPoint(this.center, this.settings.maxRadius + this.settings.labelOffset, (this.startAngle + this.endAngle) / 2));

        const labelAngle = this.settings.calcTextAngle((this.startAngle + this.endAngle) / 2);

        renderer.drawRotatedText(this.category.label, labelLocation, this.settings.labelFont, this.settings.labelBrush, TextAlignment.CenterMiddle, labelAngle);
        
    }
}