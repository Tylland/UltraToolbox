import { ValueRange } from "../wcgraph/ValueRange";
import { WcPointF } from "../wcgraph/WcPointF";
import { AltitudeAxis } from "./AltitudeAxis";
import { DistanceAxis } from "./DistanceAxis";
import { GradientPoint } from "./GradientPoint";

export class SlopeChart {
    public altitudeAxis: AltitudeAxis;
    public distanceAxis: DistanceAxis;

    public points: WcPointF[];

    constructor(private gradients: GradientPoint[], private length: number) {
        this.points = SlopeChart.calcPoints(this.gradients, this.length);

        var altitudeRange = new ValueRange([]);

        this.points.forEach(p => altitudeRange.containValue(p.y));

        this.altitudeAxis = new AltitudeAxis(altitudeRange.min, altitudeRange.max);
        this.distanceAxis = new DistanceAxis(0, this.length);
    }

    getY(pt1: WcPointF, pt2: WcPointF, x: number): number {
        var k: number = (pt2.y - pt1.y) / (pt2.x - pt1.x);

        return pt1.y + k * (x - pt1.x);
    }

    public getAltitude(location: number): number {
        for (var i = 1; i < this.points.length; i++) {
            if (this.points[i - 1].x <= location && this.points[i].x >= location)
                return this.getY(this.points[i - 1], this.points[i], location);
        }

        return NaN;
    }

    getSlopeArea(): WcPointF[] {
        var slopeArea: WcPointF[] = [];

        slopeArea.push(new WcPointF(0, 0));
        slopeArea = slopeArea.concat(this.points);
        slopeArea.push(new WcPointF(this.length, 0));

        return slopeArea;
    }

    static calcPoints(gradients: GradientPoint[], length: number): WcPointF[] {
        var points: WcPointF[] = [];

        var altitude = 0.0;
        var altitudeRange = new ValueRange([altitude]);

        points.push(new WcPointF(0, altitude));

        for (var i = 1; i < gradients.length; i++) {
            let distance = gradients[i].location - gradients[i - 1].location;
            let height = distance * gradients[i - 1].gradient;

            altitude += height;

            altitudeRange.containValue(altitude);

            points.push(new WcPointF(gradients[i].location, altitude));
        }

        if (gradients.length == 0) {
                points.push(new WcPointF(length, altitude));
        }

        points.forEach(p => p.y -= altitudeRange.min);

        return points;
    }

}