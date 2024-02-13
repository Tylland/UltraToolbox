import { IWcCoordinateSystem } from "./IWcCoordinateSystem";
import { IDevice } from "./IDevice";
import { IWcRect } from "./IWcRect";
import { IWcTransformation } from "./IWcTransformation";
import { WcWorld } from "./WcWorld";

export interface IWcView extends IWcTransformation {
    readonly world: WcWorld;
    readonly window: IWcRect;
    readonly coordinateSystem: IWcCoordinateSystem;
    readonly device: IDevice;
    invalidate(): void;
}