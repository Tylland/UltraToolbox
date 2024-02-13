import { ISP_Characteristics } from "./ISP_Characteristics";
import { ISP_ContextInformation } from "./ISP_ContextInformation";
import { ISP_Points } from "./ISP_Points";

export interface ISegmentProfile {
    SP_ID: string;
    SP_Length: number;
    SP_Points: ISP_Points;
    SP_Characteristics: ISP_Characteristics;
    SP_ContextInformation: ISP_ContextInformation;
}