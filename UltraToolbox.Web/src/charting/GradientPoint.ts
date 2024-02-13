import { GradientDirection } from "../sfera/GradientDirection";

export class GradientPoint {
    public static create(location: number, gradientValue: number, gradientDirection: number): GradientPoint {

        var gradient = gradientValue * 0.01;

        if (gradientDirection === GradientDirection.Downhill)
            gradient *= -1;

        return new GradientPoint(location, gradient); 
    }

    constructor(public location: number, public gradient: number) { }
}