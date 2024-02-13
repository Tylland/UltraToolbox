import { Font } from "./Font";
import { IRect } from "./IRect";

export interface IDevice {
    viewport: IRect;
    invalidate(): void;
    measureText(text: string, font: Font): IRect;
}