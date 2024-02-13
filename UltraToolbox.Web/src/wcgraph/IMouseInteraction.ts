import { WcMouseEventArgs } from "./WcMouseEventArgs";

export interface IMouseInteraction {
    onMouseMove(args: WcMouseEventArgs): boolean;
}