import { ChartAxis } from "./ChartAxis";

export class AltitudeAxis extends ChartAxis {
    public unit: number;
    public decimals: number;
    public roundValue: number;

    format(altitude: number, withSuffix: Boolean): string {
        altitude = Math.floor(altitude / this.roundValue) * this.roundValue;

        var res: string = altitude.toFixed(this.decimals).toString();

        if (withSuffix)
            res += " m";

        return res;
    }

    private static calcMin(minAltitude: number, gridMajor: number): number {
        var roundFactor: number = gridMajor;
        var minBase: number = Math.min(minAltitude, 0);

        return Math.max(Math.floor(minAltitude / roundFactor) * roundFactor, minBase);
    }

    private static calcMax(maxAltitude: number, gridMajor: number): number {
        var roundFactor: number = gridMajor;

        return Math.ceil(maxAltitude / roundFactor) * roundFactor;
    }

    constructor(minAltitude: number, maxAltitude: number) {
        var spanAltitude: number = maxAltitude - minAltitude;

        var padding: number = spanAltitude != 0 ? 2000 / spanAltitude : 10;

        var minBase: number = Math.min(minAltitude, 0);

        minAltitude = Math.max(minAltitude - 3 * padding, minBase);
        maxAltitude = maxAltitude + padding;

        var altitudeSpan: number = maxAltitude - minAltitude;

        var log10Max: number = Math.floor(Math.log(altitudeSpan) / Math.LN10);
        var remainderMax: number = Math.floor(altitudeSpan / Math.pow(10, log10Max));

        var log10Unit = 0;

        var log10Values = log10Max - log10Unit - 2;
        var log10Grid = Math.max(log10Max - 1, 0);

        var gridFactor = ChartAxis.calcGridFactor(remainderMax);

        var gridMinor = Math.pow(10, log10Grid) * gridFactor;
        var gridMajor = Math.pow(10, log10Grid) * ChartAxis.calcGridBigFactor(gridFactor);

        var min = AltitudeAxis.calcMin(minAltitude, gridMajor);
        var max = AltitudeAxis.calcMax(maxAltitude, gridMajor);

        super(min, max, gridMinor, gridMajor);

        this.unit = 1;
        this.roundValue = Math.pow(10, log10Values);
        this.decimals = 0;
    }
}
