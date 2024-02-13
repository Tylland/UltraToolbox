import { IWcRect } from "./IWcRect";
import { WcWorld } from "./WcWorld";
import { IWcView } from "./IWcView";
import { Point } from "./Point";
import { IRect } from "./IRect";
import { IWcCoordinateSystem } from "./IWcCoordinateSystem";
import { IWcPoint } from "./IWcPoint";
import { IDevice } from "./IDevice";

export class WcView implements IWcView{
   
    constructor(public readonly world: WcWorld, public readonly window: IWcRect, public readonly coordinateSystem: IWcCoordinateSystem, public readonly device: IDevice) {
    }

    invalidate(): void {
        this.device.invalidate();
    }

    worldPointToDevice(worldPoint: IWcPoint): Point { return this.coordinateSystem.worldPointToDevice(worldPoint); }
    devicePointToWorld(devicePoint: Point): IWcPoint { return this.coordinateSystem.devicePointToWorld(devicePoint); }
    worldRectToDevice(worldRect: IWcRect): IRect { return this.coordinateSystem.worldRectToDevice(worldRect); }
    deviceRectToWorld(deviceRect: IRect): IWcRect { return this.coordinateSystem.deviceRectToWorld(deviceRect); }
}

