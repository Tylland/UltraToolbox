export class DistanceUnit {
    static meter: DistanceUnit = new DistanceUnit(1, "m");
    static kilometer: DistanceUnit = new DistanceUnit(1000, "km");

    constructor(public value: number, public suffix: string) {
    }
}