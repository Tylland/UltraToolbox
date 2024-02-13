import { IRenderer } from './IRenderer';
import { IWcRect } from './IWcRect';
import { IWcView } from './IWcView';
import { WcFigure } from './WcFigure';

export class WcWorld {

    private figures: WcFigure[];

    constructor(public boundary: IWcRect) {
        this.figures = [];
    }

    public clearFigures(): void {
        this.figures = [];
    }

    public addFigure(figure: WcFigure): void {
        this.figures.push(figure);
    }

    public draw(renderer: IRenderer, view: IWcView): void {
        this.figures.forEach(f => f.draw(renderer, view));
    }
}