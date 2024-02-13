import { Brush } from "../wcgraph/Brush";
import { Font } from "../wcgraph/Font";
import { IRenderer } from "../wcgraph/IRenderer";
import { IWcView } from "../wcgraph/IWcView";
import { Pen } from "../wcgraph/Pen";
import { PopupInfo } from "../wcgraph/PopupInfo";
import { Rect } from "../wcgraph/Rect";
import { WcFigure } from "../wcgraph/WcFigure";
import { BoxSettings } from "./settings/BoxSettings";
import { LabelSettings } from "./settings/LabelSettings";

class Settings {
    public box: BoxSettings = new BoxSettings(new Brush("White"), new Pen("Black", 1));
    public label: LabelSettings = new LabelSettings(new Font("Arial", 16), new Brush("Black"));
    public padding: number = 10;
}

export class WcPopupWindow extends WcFigure {
    private settings: Settings = new Settings();
    public visible: boolean = false;

    constructor(public popupInfo: PopupInfo | undefined) {
        super();
    }

    public show(popupInfo: PopupInfo) {
        this.visible = true;

        this.popupInfo = popupInfo;
    }

    public draw(renderer: IRenderer, _view: IWcView): void {
        if (this.popupInfo !== undefined && this.visible) {
            var textSize = renderer.measureText(this.popupInfo.text, this.settings.label.font);

            var box = Rect.create(this.popupInfo.basePoint.x - textSize.width / 2 - this.settings.padding, this.popupInfo.basePoint.y - textSize.height - this.settings.padding, textSize.width + 2 * this.settings.padding, textSize.height + 2 * this.settings.padding);

            renderer.drawRoundRect(box, 4, this.settings.box.fill, this.settings.box.stroke);
            renderer.drawText(this.popupInfo.text, this.popupInfo.basePoint, this.settings.label.font, this.settings.label.fill, this.popupInfo.alignment);
        }
    }
}