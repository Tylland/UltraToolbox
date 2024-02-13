import { Point } from "./Point";
import { IRect } from "./IRect";
import { IWcPoint } from "./IWcPoint";
import { IWcRect } from "./IWcRect";

export interface IWcTransformation
{
    worldPointToDevice(worldPoint: IWcPoint): Point;
    devicePointToWorld(devicePoint: Point): IWcPoint;

    worldRectToDevice(worldRect: IWcRect): IRect;
    deviceRectToWorld(deviceRect: IRect): IWcRect;
}