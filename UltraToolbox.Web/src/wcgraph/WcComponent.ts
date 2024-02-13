import { IDevice } from "./IDevice";
import { IRenderer } from "./IRenderer";
import { IWcView } from "./IWcView";
import { WcWorld } from "./WcWorld";

export class WcComponent {
    constructor(public name: string, public device: IDevice, public world: WcWorld, public view: IWcView) { }

    public draw(renderer: IRenderer) {
        this.world.draw(renderer, this.view);
    }
}