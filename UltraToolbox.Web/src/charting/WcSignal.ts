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
import { Signal } from "./Signal";



class Settings {
    //    public body: BoxSettings = new BoxSettings(new Brush("Gray"), new Pen("White", 1));
    public body: BoxSettings = new BoxSettings(new Brush("#333333"), new Pen("#DDDDDD", 1));
    public label: LabelSettings = new LabelSettings(new Font("Arial", 14), new Brush("White"));
    public size: number = 30;
}


export class WcSignal extends WcFigure implements IPopupHost {
    private settings: Settings = new Settings();

    constructor(private signal: Signal) {
        super();
    }

    public draw(renderer: IRenderer, view: IWcView): void {
        var basePoint = view.worldPointToDevice(new WcPointF(this.signal.location, view.window.min.y));

        var topPoint = basePoint.offsetVertical(-this.settings.size)

        let headSize: number = this.settings.size / 2;
        let footSize: number = this.settings.size / 2;

        renderer.drawLine(basePoint, basePoint.offsetVertical(-footSize), this.settings.body.stroke);


        renderer.drawEllipse(Rect.create(basePoint.x - (headSize / 4), topPoint.y, headSize / 2, headSize), this.settings.body.fill, this.settings.body.stroke);

        renderer.drawText(this.signal.locationSignature + " " + this.signal.number, topPoint, this.settings.label.font, this.settings.label.fill, TextAlignment.CenterBottom);
    }

    public hitTest(view: IWcView, point: Point, _foundFigures: WcFigure[]): boolean {
        var basePoint = view.worldPointToDevice(new WcPointF(this.signal.location, view.window.min.y));

        var topPoint = basePoint.offsetVertical(-this.settings.size)

        let headSize: number = this.settings.size / 2;


        var hitArea: HitArea = new HitArea();

        hitArea.addArea(Rect.create(basePoint.x - (headSize / 4), topPoint.y, headSize / 2, headSize));

        var textSize: IRect = view.device.measureText(this.signal.locationSignature + " " + this.signal.number, this.settings.label.font);

        hitArea.addArea(Rect.create(basePoint.x - (textSize.width / 2), topPoint.y - textSize.height, textSize.width, textSize.height));


        return hitArea.hitted(point);
    }

    getPopupInfo(view: IWcView): PopupInfo {
        var basePoint = view.worldPointToDevice(new WcPointF(this.signal.location, view.window.min.y));

        var topPoint = basePoint.offsetVertical(-this.settings.size)

        return new PopupInfo(this.signal.locationSignature + "\r\n" + this.signal.number + "\r\n @" + this.signal.location.toFixed(2), topPoint, TextAlignment.CenterBottom);
    }
}
