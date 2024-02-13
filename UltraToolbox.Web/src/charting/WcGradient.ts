import { Brush } from "../wcgraph/Brush"
import { Font } from "../wcgraph/Font"
import { IRect } from "../wcgraph/IRect"
import { IRenderer } from "../wcgraph/IRenderer"
import { IWcView } from "../wcgraph/IWcView"
import { Pen } from "../wcgraph/Pen"
import { Point } from "../wcgraph/Point"
import { TextAlignment } from "../wcgraph/TextAlignment"
import { WcFigure } from "../wcgraph/WcFigure"
import { WcPointF } from "../wcgraph/WcPointF"
import { WcRect } from "../wcgraph/WcRect"
import { BoxSettings } from "./settings/BoxSettings"
import { LabelSettings } from "./settings/LabelSettings"
import { IExpandable } from "../wcgraph/IExpandable"
import { Rect } from "../wcgraph/Rect"


class Settings {
    public box: BoxSettings = new BoxSettings(new Brush("#222222"), new Pen("#808080", 1));
    public boxHighlight: BoxSettings = new BoxSettings(new Brush("#111111"), new Pen("#AAAAAA", 2));
    public label: LabelSettings = new LabelSettings(new Font("Arial", 14), new Brush("Gray"));
    public labelHighlight: LabelSettings = new LabelSettings(new Font("Arial", 14), new Brush("White"));
}

export class WcGradient extends WcFigure implements IExpandable {
    private settings: Settings = new Settings();
    public expanded: boolean = false;

    private gradientString: string;
    constructor(private start: number, private end: number, private height: number, gradient: number) {
        super();

        this.gradientString = (gradient * 100).toFixed(1).toString();
    }
    
    getDeviceRect(view: IWcView): IRect {
        return view.worldRectToDevice(new WcRect(new WcPointF(this.start, 0), new WcPointF(this.end, this.height)));
    }

    private drawGradient(renderer: IRenderer, rect: IRect, boxSettings: BoxSettings, labelSettings: LabelSettings): void {
        renderer.drawRect(rect, boxSettings.fill, boxSettings.stroke);
        renderer.drawText(this.gradientString, rect.getCenter(), labelSettings.font, labelSettings.fill, TextAlignment.CenterMiddle);
    }

    public draw(renderer: IRenderer, view: IWcView): void {
        var rect = this.getDeviceRect(view);

        if (this.expanded) {
            let center = rect.getCenter();
            let textSize: IRect = view.device.measureText(this.gradientString, this.settings.labelHighlight.font);

            let width = Math.max(rect.width, textSize.width);
            let height = Math.max(rect.height, textSize.height);

            rect = Rect.create(center.x - width / 2, center.y - height / 2, width, height);

            this.drawGradient(renderer, rect, this.settings.boxHighlight, this.settings.labelHighlight);
        }
        else {
            this.drawGradient(renderer, rect, this.settings.box, this.settings.label);
        }
    }

    public hitTest(view: IWcView, point: Point, foundFigures: WcFigure[]): boolean {
        var rect = this.getDeviceRect(view);

        if (rect.contains(point)) {
            foundFigures.push(this);

            return true;
        }

        return false;
    }

}