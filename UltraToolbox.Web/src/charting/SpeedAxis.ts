import { ChartAxis } from "./ChartAxis";

export class SpeedAxis extends ChartAxis {
    public unit: number;
    public decimals: number;
    public roundValue: number;

    format(spped: number, withSuffix: Boolean): string {
        spped = Math.floor(spped / this.roundValue) * this.roundValue;

        var res: string = spped.toFixed(this.decimals).toString();

        if (withSuffix)
            res += " km/h";

        return res;
    }

    static calcMax(speed: number): number {
        if (speed <= 40)
            return 80;

        if (speed <= 80)
            return 100;

        if (speed <= 100)
            return 120;

        if (speed <= 120)
            return 160;

        return 300;
    } 

    constructor(minSpeed: number, maxSpeed: number) {
        let max = SpeedAxis.calcMax(maxSpeed);

        let gridMinor = 5;
        let gridMajor = 10;

        if (max >= 100) {
            gridMinor = 10;
            gridMajor = 20;
        }

        super(minSpeed, max, gridMinor, gridMajor);

        this.unit = 1;
        this.roundValue = 5;
        this.decimals = 0;
    }
}