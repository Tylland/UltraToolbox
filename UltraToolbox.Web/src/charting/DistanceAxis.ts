import { ChartAxis } from "./ChartAxis";
import { DistanceUnit } from "./DistanceUnit";

export class DistanceAxis extends ChartAxis {
    public unit: DistanceUnit;
    public decimals: number;
    public roundValue: number;

    format(distance: number, withSuffix: Boolean): string {
        distance = distance / this.unit.value;
        distance = Math.floor(distance / this.roundValue) * this.roundValue;

        var res: string = parseFloat(distance.toFixed(this.decimals)).toString();

        if (withSuffix)
            res += " " + this.unit.suffix;

        return res;
    }

    constructor(min: number, max: number) {

        var log10Max: number = Math.floor(Math.log(max - min) / Math.LN10);
        var remainderMax: number = Math.floor((max - min) / Math.pow(10, log10Max));

        var unit = log10Max < 3 ? DistanceUnit.meter : DistanceUnit.kilometer;

        var log10Unit = unit === DistanceUnit.kilometer ? 3 : 0;

        var log10Values = log10Max - log10Unit - 2;

        var gridFactor = ChartAxis.calcGridFactor(remainderMax);

        var gridMinor = Math.pow(10, Math.max(log10Max - 1, 0)) * gridFactor;
        var gridMajor = Math.pow(10, Math.max(log10Max - 1, 0)) * ChartAxis.calcGridBigFactor(gridFactor);

        super(min, max, gridMinor, gridMajor);

        this.unit = unit;
        this.roundValue = Math.pow(10, log10Values);
        this.decimals = log10Values < 0 ? Math.abs(log10Values) : 0;
    }
}
