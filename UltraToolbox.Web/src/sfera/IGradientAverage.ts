import { IGradientAverageChange } from "./IGradientAverageChange";
import { IGradientAverageStart } from "./IGradientAverageStart";

export interface IGradientAverage {
    GradientAverageStart: IGradientAverageStart;
    GradientAverageChange: IGradientAverageChange[];
}