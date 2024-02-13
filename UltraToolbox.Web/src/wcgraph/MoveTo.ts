import { DrawCommandType, IDrawCommand } from "./IDrawCommand";

export class MoveTo implements IDrawCommand{
    public type: DrawCommandType = 'moveTo';

    constructor(public x: number, public y: number) {
    }
}