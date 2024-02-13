import { Brush } from "../wcgraph/Brush";
import { Font } from "../wcgraph/Font";
import { IRenderer } from "../wcgraph/IRenderer";
import { IWcView } from "../wcgraph/IWcView";
import { Pen } from "../wcgraph/Pen";
import { Point } from "../wcgraph/Point";
import { TextAlignment } from "../wcgraph/TextAlignment";
import { WcFigure } from "../wcgraph/WcFigure";
import { WcPointF } from "../wcgraph/WcPointF";
import { WcRect } from "../wcgraph/WcRect";
import { BorderSettings } from "./settings/BorderSettings";
import { BoxSettings } from "./settings/BoxSettings";
import { LabelSettings } from "./settings/LabelSettings";
import { SpeedSegment } from "./SpeedSegment";


class Settings {
    public box: BoxSettings = new BoxSettings(new Brush("Gray"), Pen.none);
    public label: LabelSettings = new LabelSettings(new Font("Arial", 48), new Brush("White"));
    public border: BorderSettings = new BorderSettings(new Pen("#888888", 1));
}

export class WcSpeedSegment extends WcFigure {
    private settings: Settings = new Settings();

    constructor(private speedSegment: SpeedSegment) {
        super();
    }

    public draw(renderer: IRenderer, view: IWcView): void {
        var topRect = view.worldRectToDevice(new WcRect(new WcPointF(this.speedSegment.startLocation, this.speedSegment.value), new WcPointF(this.speedSegment.endLocation, view.window.max.y)));
        var allRect = view.worldRectToDevice(new WcRect(new WcPointF(this.speedSegment.startLocation, view.window.min.y), new WcPointF(this.speedSegment.endLocation, view.window.max.y)));

        renderer.drawRect(topRect, this.settings.box.fill, this.settings.box.stroke);
        renderer.drawLine(new Point(allRect.x, allRect.y), new Point(allRect.x, allRect.y + allRect.height), this.settings.border.stroke);
        renderer.drawLine(new Point(allRect.x + allRect.width, allRect.y), new Point(allRect.x + allRect.width, allRect.y + allRect.height), this.settings.border.stroke);
        renderer.drawText(this.speedSegment.value.toString(), topRect.getCenter(), this.settings.label.font, this.settings.label.fill, TextAlignment.CenterMiddle);
    }
}
