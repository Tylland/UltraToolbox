import { Extent } from "./Extent";
import { Point } from "./Point";
import { IRect } from "./IRect";

export class HitArea {
    private areas: IRect[] = [];
    public boundary: Extent = new Extent([]);

    public addArea(area: IRect) {
        this.areas.push(area);

        this.boundary.containPoint(area.min);
        this.boundary.containPoint(area.max);
    }

    public hitted(point: Point): boolean {

        if (this.boundary.toRectangle().contains(point))
            return true;

        if(this.areas.find(a => a.contains(point)))
            return true;

        return false;
    }
}