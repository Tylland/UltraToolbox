import { IHittable } from "./IHittable";

export interface IExpandable extends IHittable {
	expanded: boolean;
}