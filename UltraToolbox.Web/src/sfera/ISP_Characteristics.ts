import { IGradientAverage } from "./IGradientAverage";
import { IStaticSpeedProfile } from "./IStaticSpeedProfile";

export interface ISP_Characteristics {
    StaticSpeedProfile: IStaticSpeedProfile[];
    GradientAverage: IGradientAverage;
}