import { Font } from "./Font";
import { IDevice } from "./IDevice";
import { IRect } from "./IRect";
import { Rect } from "./Rect";

export class CanvasDevice implements IDevice {
    public onInvalidated: () => void;

    private ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement, public viewport: IRect) {
        this.onInvalidated = () => { };
        this.ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
    }

    invalidate(): void {
        this.onInvalidated();
    }

    measureText(text: string, font: Font): IRect {
        this.ctx.font = this.getFont(font);
        var metrics = this.ctx.measureText(text);

        return Rect.create(0, metrics.actualBoundingBoxAscent, metrics.width, metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
    }

    getFont(font: Font): string {
        return font.size + "px " + font.family;
    }
}