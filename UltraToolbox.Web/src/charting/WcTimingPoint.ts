import { Brush } from "../wcgraph/Brush";
import { Font } from "../wcgraph/Font";
import { HitArea } from "../wcgraph/HitArea";
import { IPopupHost } from "../wcgraph/IPopupHost";
import { IRect } from "../wcgraph/IRect";
import { IRenderer } from "../wcgraph/IRenderer";
import { IWcView } from "../wcgraph/IWcView";
import { Pen } from "../wcgraph/Pen";
import { Point } from "../wcgraph/Point";
import { PopupInfo } from "../wcgraph/PopupInfo";
import { Rect } from "../wcgraph/Rect";
import { TextAlignment } from "../wcgraph/TextAlignment";
import { WcFigure } from "../wcgraph/WcFigure";
import { WcPointF } from "../wcgraph/WcPointF";
import { BoxSettings } from "./settings/BoxSettings";
import { LabelSettings } from "./settings/LabelSettings";
import { TimingPoint } from "./TimingPoint";



class Settings {
    //    public body: BoxSettings = new BoxSettings(new Brush("Gray"), new Pen("White", 1));
    public body: BoxSettings = new BoxSettings(new Brush("Black"), new Pen("White", 2));
    public label: LabelSettings = new LabelSettings(new Font("Arial", 14), new Brush("White"));
    public line: Pen = new Pen("DDDDDD", 1)
    public size: number = 30;
}


export class WcTimingPoint extends WcFigure implements IPopupHost { 
    private settings: Settings = new Settings();

    constructor(private timingPoint: TimingPoint) {
        super();
    }

    getPopupInfo(view: IWcView): PopupInfo {
        var basePoint = view.worldPointToDevice(new WcPointF(this.timingPoint.location, view.world.boundary.min.y));

        var topPoint = basePoint.offsetVertical(-this.settings.size)

        return new PopupInfo(this.timingPoint.name + " @" + this.timingPoint.location.toFixed(2), topPoint, TextAlignment.CenterBottom);
    }

    hitTest(view: IWcView, point: Point, _foundFigures: WcFigure[]): boolean {
        var basePoint = view.worldPointToDevice(new WcPointF(this.timingPoint.location, view.world.boundary.min.y));

        let headSize: number = this.settings.size / 2;

        var topPoint = basePoint.offsetVertical(-headSize * 4);

        var hitArea: HitArea = new HitArea();

        hitArea.addArea(Rect.create(basePoint.x - headSize / 2, basePoint.y - headSize / 2, headSize, headSize));

        var textSize: IRect = view.device.measureText(this.timingPoint.id, this.settings.label.font);

        hitArea.addArea(Rect.create(basePoint.x - (textSize.width / 2), topPoint.y - textSize.height, textSize.width, textSize.height));

        return hitArea.hitted(point);
    }

    public draw(renderer: IRenderer, view: IWcView): void {
        var basePoint = view.worldPointToDevice(new WcPointF(this.timingPoint.location, view.world.boundary.min.y));

        let headSize: number = this.settings.size / 2;
        var topPoint = basePoint.offsetVertical(-headSize * 4);

        renderer.drawLine(basePoint, topPoint, this.settings.line);

        renderer.drawEllipse(Rect.create(basePoint.x - headSize / 2, basePoint.y - headSize / 2, headSize, headSize), this.settings.body.fill, this.settings.body.stroke);
        renderer.drawEllipse(Rect.create(basePoint.x - headSize / 4, basePoint.y - headSize / 4, headSize / 2, headSize / 2), this.settings.body.fill, this.settings.body.stroke);


        renderer.drawText(this.timingPoint.id, topPoint, this.settings.label.font, this.settings.label.fill, TextAlignment.CenterBottom);


    //    var textSize: IRect = view.device.measureText(this.timingPoint.id, this.settings.label.font);
    //    renderer.drawRect(Rect.create(basePoint.x - (textSize.width / 2), topPoint.y, textSize.width, textSize.height), Brush.none, this.settings.body.stroke);  
    }
  
}
