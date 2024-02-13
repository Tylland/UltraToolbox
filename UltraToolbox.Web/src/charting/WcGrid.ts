import { IRenderer } from "../wcgraph/IRenderer";
import { IWcView } from "../wcgraph/IWcView";
import { Pen } from "../wcgraph/Pen";
import { Point } from "../wcgraph/Point";
import { WcFigure } from "../wcgraph/WcFigure";
import { WcPointF } from "../wcgraph/WcPointF";
import { IChartAxis } from "./IChartAxis";

export class WcGrid extends WcFigure {
    private stroke: Pen = new Pen("Gray", 1);

    constructor(private horizontalAxis: IChartAxis, private verticalAxis: IChartAxis) {
        super();
    }

    drawLine(renderer: IRenderer, view: IWcView, startX: number, startY: number, endX: number, endY: number): void {
        let startPoint: Point = view.worldPointToDevice(new WcPointF(startX, startY));
        let endPoint: Point = view.worldPointToDevice(new WcPointF(endX, endY));

        renderer.drawLine(startPoint, endPoint, this.stroke);
    }

    public draw(renderer: IRenderer, view: IWcView): void {


        for (var y: number = this.verticalAxis.min; y <= this.verticalAxis.max; y = y + this.verticalAxis.gridMinor) {

            this.drawLine(renderer, view, this.horizontalAxis.min, y, this.horizontalAxis.max, y);

            //var altitudeLine: Snap.Element = paper.line(chartArea.x - 35, altitudePoint.y, chartArea.x - 20, altitudePoint.y);

            //if (altitudeMajor) {
            //    altitudeLine.attr({ stroke: "#231F20", strokeWidth: 2 });
            //    Text.render(paper, data.altitudeAxis.format(altitude, false), new Point(chartArea.x - 45, altitudePoint.y), Alignment.rightMiddle, { fontSize: "24px", fill: "#515151", fontFamily: "Biko" });
            //} else {
            //    altitudeLine.attr({ stroke: "#A4A3A3", strokeWidth: 1 });
            //}

        }

        this.drawLine(renderer, view, this.horizontalAxis.min, this.verticalAxis.max, this.horizontalAxis.max, this.verticalAxis.max);

        for (var x: number = this.horizontalAxis.min; x <= this.horizontalAxis.max; x += this.horizontalAxis.gridMinor) {

            this.drawLine(renderer, view, x, this.verticalAxis.min, x, this.verticalAxis.max);

        //    var distanceMajor: boolean = data.distanceAxis.major(distance);

        //    var top: number = chartArea.y + chartArea.height;

        //    var distanceLine: Snap.Element = paper.line(distancePoint.x, top + 10, distancePoint.x, top + 20);

        //    if (distanceMajor) {
        //        distanceLine.attr({ stroke: "#231F20", strokeWidth: 2 });
        //        Text.render(paper, data.distanceAxis.format(distance, distance === data.distanceAxis.min), new Point(distancePoint.x, top + 30), Alignment.centerTop, { fontSize: "24px", fill: "#515151", fontFamily: "Biko" });
        //    } else {
        //        distanceLine.attr({ stroke: "#A4A3A3", strokeWidth: 1 });
        //    }
        }

        this.drawLine(renderer, view, this.horizontalAxis.max, this.verticalAxis.min, this.horizontalAxis.max, this.verticalAxis.max);


    }
}