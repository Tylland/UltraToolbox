import { IStaticSpeedProfileChange } from "./IStaticSpeedProfileChange";
import { IStaticSpeedProfileStart } from "./IStaticSpeedProfileStart";

export interface IStaticSpeedProfile {
    StaticSpeedProfileStart: IStaticSpeedProfileStart;
    StaticSpeedProfileChange: IStaticSpeedProfileChange[];
}