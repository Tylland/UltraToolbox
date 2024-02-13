import { ISpecificSSP } from "./ISpecificSSP";

export interface IStaticSpeedProfileChange {
    SSP_Speed: number;
    SpecificSSP: ISpecificSSP;
    Location: number;
}