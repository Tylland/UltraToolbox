export interface IChartAxis {
    min: number;
    max: number;
    gridMinor: number;
    gridMajor: number;
    major(value: number): boolean;
    format(altitude: number, withSuffix: Boolean): string;
}