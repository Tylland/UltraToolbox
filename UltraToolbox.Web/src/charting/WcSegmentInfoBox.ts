import { WcInfoBox } from "./WcInfoBox"


export class WcSegmentInfoBox extends WcInfoBox {

    constructor(start: number, end: number, height: number, segtmentId: string) {
        super(start, end, height, segtmentId);
    }
}