import { GeoLocation } from "./GeoLocation";

export class GeoExtent {
    public minLongitude: number = Number.MAX_VALUE;
    public maxLongitude: number = -Number.MAX_VALUE;
    public minLatitude: number = Number.MAX_VALUE;
    public maxLatitude: number = -Number.MAX_VALUE;


    containLocation(longitude: number, latitude: number): void {
        this.minLongitude = Math.min(this.minLongitude, longitude);
        this.maxLongitude = Math.max(this.maxLongitude, longitude);
        this.minLatitude = Math.min(this.minLatitude, latitude);
        this.maxLatitude = Math.max(this.maxLatitude, latitude);
    }

    containLocations(locations: number[][]): void {
        for (let i: number = 0; i < locations.length; i++) {
            this.containLocation(locations[i][0], locations[i][1]);
        }
    }

    public getCenter(): GeoLocation {
        return new GeoLocation((this.maxLongitude + this.minLongitude) / 2.0, (this.maxLatitude + this.minLatitude) / 2.0);
    }
}