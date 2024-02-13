import { Point } from "./Point";
import { Rect } from "./Rect";
import { IRect } from "./IRect";
import { IWcCoordinateSystem } from "./IWcCoordinateSystem";
import { IWcPoint } from "./IWcPoint";
import { IWcRect } from "./IWcRect";
import { WcPointF } from "./WcPointF";
import { WcRect } from "./WcRect";

export class WcNormalCoordinateSystem implements IWcCoordinateSystem {

    worldWindow: IWcRect;

    constructor(worldWindow: IWcRect, private viewport: IRect) {
        this.worldWindow = worldWindow as IWcRect;

        if (!this.worldWindow)
            throw new Error('Unsupported point type');
    }
    supports(point: IWcPoint): boolean {
        return point as WcPointF !== undefined;
    }

    worldPointToDevice(worldPoint: IWcPoint): Point {
        var window = this.worldWindow;
        var viewport = this.viewport;

        var width = window.getWidth();
        var height = window.getHeight();

        var scaleX = viewport.width / width;
        var scaleY = viewport.height / height;

        return new Point(viewport.x + (worldPoint.x - window.min.x) * scaleX,
            viewport.y + viewport.height - (worldPoint.y - window.min.y) * scaleY);
    }

    devicePointToWorld(devicePoint: Point): IWcPoint {
        var window = this.worldWindow;
        var viewport = this.viewport;

        var width = window.getWidth();
        var height = window.getHeight();

        var scaleX = width / viewport.width;
        var scaleY = height / viewport.height;

        return new WcPointF(window.min.x + (devicePoint.x - viewport.x) * scaleX,
            window.min.y + (devicePoint.y - viewport.y) * scaleY);
    }

    worldRectToDevice(worldRect: IWcRect): IRect {
        var start = this.worldPointToDevice(worldRect.min);
        var end = this.worldPointToDevice(worldRect.max);

        var min = new Point(Math.min(start.x, end.x), Math.min(start.y, end.y));
        var max = new Point(Math.max(start.x, end.x), Math.max(start.y, end.y));

        return new Rect(min, max);
    }

    deviceRectToWorld(deviceRect: IRect): IWcRect {
        var start = this.devicePointToWorld(new Point(deviceRect.x, deviceRect.y));
        var end = this.devicePointToWorld(new Point(deviceRect.x + deviceRect.width, deviceRect.y + deviceRect.height));

        var min = new WcPointF(Math.min(start.x, end.x), Math.min(start.y, end.y));
        var max = new WcPointF(Math.max(start.x, end.x), Math.max(start.y, end.y));

        return new WcRect(min, max);
    }
}
