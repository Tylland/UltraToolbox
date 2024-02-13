import { IChartAxis } from "./IChartAxis";

export class ChartAxis implements IChartAxis {
    static calcGridBigFactor(gridFactor: number): number {

        if (gridFactor <= 1) {
            return 2;
        }

        if (gridFactor <= 2) {
            return 5;
        }

        if (gridFactor <= 5) {
            return 10;
        }

        return 10;
    }

    static calcGridFactor(remainderMax: number): number {

        if (remainderMax > 5) {
            return 5;
        }

        if (remainderMax > 2) {
            return 2;
        }

        return 1;
    }

    getSpan(): number {
        return this.max - this.min;
    }

    public major(value: number): boolean {
        return (value % this.gridMajor) === 0;
    }

    constructor(public min: number, public max: number, public gridMinor: number, public gridMajor: number) {
    }

    format(altitude: number, withSuffix: Boolean): string {
        var str = altitude.toString();

        if (withSuffix)
            str += ' moh';

        return str;
    }


}