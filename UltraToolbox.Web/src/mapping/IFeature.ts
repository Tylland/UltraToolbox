import { IGeometry } from "./IGeometry";

export interface IFeature {
    type: string;
    geometry: IGeometry;
}
