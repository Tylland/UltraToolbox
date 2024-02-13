import { IRenderer } from "./IRenderer";
import { IWcView } from "./IWcView";

export abstract class WcFigure {
    public abstract draw(renderer: IRenderer, view: IWcView): void;
}
