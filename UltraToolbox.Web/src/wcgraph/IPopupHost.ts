import { IHittable } from "./IHittable";
import { IWcView } from "./IWcView";
import { PopupInfo } from "./PopupInfo";

export interface IPopupHost extends IHittable {
    getPopupInfo(view: IWcView): PopupInfo;
}