import { ISignal } from "./ISignal";
import { ITimingPoint } from "./ITimingPoint";
import { IVirtualBalise } from "./IVirtualBalise";

export interface ISP_Points {
    TimingPoint: ITimingPoint[];
    Signal: ISignal[];
    VirtualBalise: IVirtualBalise[];
}