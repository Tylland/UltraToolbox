import { DrawCommandType, IDrawCommand } from "./IDrawCommand";

export class Arc implements IDrawCommand {
    public type: DrawCommandType = 'arc';
    public counterClockwise: boolean;
    constructor(public x: number, public y: number, public radius: number, public startAngle: number, public endAngle: number) {
        this.counterClockwise = startAngle > endAngle;
    }


}