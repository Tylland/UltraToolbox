import { Brush } from "../wcgraph/Brush";
import { Font } from "../wcgraph/Font";
import { IRenderer } from "../wcgraph/IRenderer";
import { IWcView } from "../wcgraph/IWcView";
import { Pen } from "../wcgraph/Pen";
import { Rect } from "../wcgraph/Rect";
import { TextAlignment } from "../wcgraph/TextAlignment";
import { WcFigure } from "../wcgraph/WcFigure";
import { WcPointF } from "../wcgraph/WcPointF";
import { KmBoard } from "./KmBoard";
import { BoxSettings } from "./settings/BoxSettings";
import { LabelSettings } from "./settings/LabelSettings";



class Settings {
    //    public body: BoxSettings = new BoxSettings(new Brush("Gray"), new Pen("White", 1));
    public body: BoxSettings = new BoxSettings(new Brush("#555555"), new Pen("Gray", 1));
    public label: LabelSettings = new LabelSettings(new Font("Arial", 12), new Brush("Gray"));
    public size: number = 20;
}


export class WcKmBoard extends WcFigure {
    private settings: Settings = new Settings();

    public draw(renderer: IRenderer, view: IWcView): void {
        var basePoint = view.worldPointToDevice(new WcPointF(this.kmBoard.location, view.window.min.y));

        var topPoint = basePoint.offsetVertical(-this.settings.size)

        let headSize: number = this.settings.size / 2;
        let footSize: number = this.settings.size / 2;

        renderer.drawLine(basePoint, basePoint.offsetVertical(-footSize), this.settings.body.stroke);


        renderer.drawRect(Rect.create(basePoint.x - (headSize / 2), topPoint.y, headSize, headSize), this.settings.body.fill, this.settings.body.stroke);

        renderer.drawText(this.kmBoard.km.toFixed(0).toString(), topPoint, this.settings.label.font, this.settings.label.fill, TextAlignment.CenterBottom);
    }

    constructor(private kmBoard: KmBoard) {
        super();
    }
}
