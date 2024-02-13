import { IWcPoint } from "./IWcPoint";
import { IWcTransformation } from "./IWcTransformation";

export interface IWcCoordinateSystem extends IWcTransformation {
    supports(point: IWcPoint): boolean;
}