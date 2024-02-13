import { ValueRange } from "../wcgraph/ValueRange";
import { DistanceAxis } from "./DistanceAxis";
import { SpeedAxis } from "./SpeedAxis";
import { SpeedSegment } from "./SpeedSegment";

export class MainChart {
    public speedAxis: SpeedAxis;
    public distanceAxis: DistanceAxis;


    constructor(public speedSegments: SpeedSegment[], private totalLength: number) {

        var speedRange = new ValueRange([0]);

        this.speedSegments.forEach(ss => {
            speedRange.containValue(ss.value);
        });

        this.speedAxis = new SpeedAxis(0, speedRange.max);
        this.distanceAxis = new DistanceAxis(0, this.totalLength);
    }
}