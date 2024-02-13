import { ISignalInformation } from "./ISignalInformation";
import { ISignal_ID } from "./ISignal_ID";

export interface ISignal {
    Signal_ID: ISignal_ID;
    SignalInformation: ISignalInformation;
}