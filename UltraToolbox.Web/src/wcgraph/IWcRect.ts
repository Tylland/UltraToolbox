import { IWcPoint } from "./IWcPoint";

export interface IWcRect
{
    min: IWcPoint;
    max: IWcPoint;

    getWidth(): number;
    getHeight(): number;
}