import { ITP_Name } from "./ITP_Name";

export interface ITimingPoint{
    TP_ID: string;
    TP_Name: ITP_Name[];
    StationTrack: string;
    Location: number;
}