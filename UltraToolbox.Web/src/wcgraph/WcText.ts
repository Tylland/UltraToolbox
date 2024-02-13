import { Brush } from "./Brush";
import { Font } from "./Font";
import { IRenderer } from "./IRenderer";
import { IWcPoint } from "./IWcPoint";
import { IWcView } from "./IWcView";
import { TextAlignment } from "./TextAlignment";
import { WcFigure } from "./WcFigure";

export class WcText extends WcFigure {
    constructor(private text: string, private location: IWcPoint, private font: Font, private fill: Brush, private alignment: TextAlignment) {
        super();   
    }

    public draw(renderer: IRenderer, view: IWcView): void {

        const devicePoint = view.worldPointToDevice(this.location);

        renderer.drawText(this.text, devicePoint, this.font, this.fill, this.alignment);
    }
}