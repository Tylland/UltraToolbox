import { DrawCommandType, IDrawCommand } from "./IDrawCommand";

export class LineTo implements IDrawCommand {
    public type: DrawCommandType = 'lineTo';

    constructor(public x: number, public y: number) {
    }
}