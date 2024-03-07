import * as React from "react"
import { WcRect } from "../wcgraph/WcRect";
import { WcWorld } from "../wcgraph/WcWorld";
import { WcPointF } from "../wcgraph/WcPointF";
import { CanvasRenderer } from "../wcgraph/CanvasRenderer";
import { WcRectangle } from "../wcgraph/WcRectangle";
import { IDevice } from "../wcgraph/IDevice";
import { IRect } from "../wcgraph/IRect";
import { Rect } from "../wcgraph/Rect";
import { Point } from "../wcgraph/Point";
import { WcView } from "../wcgraph/WcView";
import { Font } from "../wcgraph/Font";
import { IJsonLoadable } from "../definitions/IJsonLoadable";
import { WcComponent } from "../wcgraph/WcComponent";
import { CanvasDevice } from "../wcgraph/CanvasDevice";
import { WcWheelGrid } from "../graphs/wheel/WcWheelGrid";
import { WheelSettings } from "../graphs/wheel/WheelSettings";
import { WcWheelSector } from "../graphs/wheel/WcWheelSector";
import { WcWindowsCoordinateSystem } from "../wcgraph/WcWindowsCoordinateSystem";
import { TangoPalette } from "../palette/TangoPalette";
import { Wheel } from "../graphs/wheel/model/Wheel";
import { WcText } from "../wcgraph/WcText";
import { TextAlignment } from "../wcgraph/TextAlignment";


type WheelGraphProps = {
    width: number;
    height: number;
}

class WheelGraph extends React.Component<WheelGraphProps> implements IDevice, IJsonLoadable {
    private settings: WheelSettings = new WheelSettings();

    private titleComponent?: WcComponent; 
    private wheelComponent?: WcComponent;
    private wheel: Wheel = { title: '', categories: [] };
    
    canvasRef: React.RefObject<HTMLCanvasElement>;

    constructor(props: WheelGraphProps) {
        super(props);

        this.viewport = new Rect(new Point(0, 0), new Point(props.width, props.height))

        this.canvasRef = React.createRef<HTMLCanvasElement>();
    }

    measureText(_text: string, _font: Font): IRect {
        throw new Error("Method not implemented.");
    }

    viewport: IRect;


    render() {
        return (<>
            <canvas id="wcgraph" ref={this.canvasRef} width={this.props.width} height={this.props.height} onClick={this.handleClick} onMouseMove={this.handleMouseMove}></canvas>
        </>);
    }

    componentDidMount() {
        this.initializeChart();

        this.draw();
    }

    handleClick = (): void => {
        window.requestAnimationFrame(this.draw);
    }

    handleMouseMove = (_args: any): void => {
    }

    public loadJson = (json: string): void => {
        console.log(json);

        this.loadObject(JSON.parse(json).wheel);
    }

    public loadObject = (wheel: Wheel): void => {

        this.wheel = wheel;

        if (this.canvasRef.current) {
            this.initializeChart();

            this.draw();
        }
    }

    invalidate(): void {
        window.requestAnimationFrame(this.draw);
    }

    draw = (): void => {
        const canvas = this.canvasRef.current; // document.getElementById("wcgraph") as HTMLCanvasElement;

        if (canvas) {
            const renderer = new CanvasRenderer(canvas as HTMLCanvasElement);

            this.titleComponent?.draw(renderer);
            this.wheelComponent?.draw(renderer);
        }
    }

    createComponent(name: string, worldBoundary: WcRect, viewpoint: IRect): WcComponent {
        const canvas = this.canvasRef.current;

        const device = new CanvasDevice(canvas as HTMLCanvasElement, viewpoint);
        device.onInvalidated = this.invalidate;

        const world = new WcWorld(worldBoundary);

        const view = new WcView(world, worldBoundary, new WcWindowsCoordinateSystem(worldBoundary, device.viewport), device);

        return new WcComponent(name, device, world, view);
    }

    initializeChart(): void {

        const chartArea: IRect = new Rect(
            new Point(this.settings.chartMargin.left, this.settings.chartMargin.bottom),
            new Point(this.props.width - this.settings.chartMargin.right, this.props.height - this.settings.chartMargin.top));

        //const labelArea: IRect = new Rect(new Point(chartArea.x, chartArea.y),
        //    new Point(chartArea.x + chartArea.width, chartArea.y + this.settings.labelHeight));

        //const labelWorldBoundary: WcRect = new WcRect(new WcPointF(0, 0), new WcPointF(1000, 200));

        //this.titleComponent = this.createComponent("Wheel", labelWorldBoundary, labelArea)

        //this.titleComponent.world.addFigure(new WcText('Wheel of Ultra', new WcPointF(500, 100), this.settings.titleFont, this.settings.titleBrush, TextAlignment.CenterMiddle))

        //const graphArea: IRect = new Rect(new Point(chartArea.x, chartArea.y + this.settings.labelHeight),
        //    new Point(chartArea.x + chartArea.width, chartArea.y + chartArea.height - this.settings.labelHeight));


        const wheelCenter: Point = chartArea.getCenter();
        const wheelSize: number = Math.min(chartArea.width, chartArea.height);  

        const wheelArea: IRect = new Rect(new Point(wheelCenter.x - wheelSize / 2, wheelCenter.y - wheelSize / 2),
            new Point(wheelCenter.x + wheelSize / 2, wheelCenter.y + wheelSize / 2));

        const wheelWorldBoundary: WcRect = new WcRect(new WcPointF(0, 0), new WcPointF(1000, 1000));

        this.wheelComponent = this.createComponent("Wheel", wheelWorldBoundary, wheelArea)


        this.wheelComponent.world.addFigure(new WcRectangle(wheelWorldBoundary, this.settings.chartBackground, this.settings.chartBorder));
        this.wheelComponent.world.addFigure(new WcText(this.wheel.title, new WcPointF(0, 1000), this.settings.titleFont, this.settings.titleBrush, TextAlignment.LeftBottom));
        this.wheelComponent.world.addFigure(new WcWheelGrid(new WcPointF(500, 500), this.wheel.categories, this.settings));


        const palette: TangoPalette = new TangoPalette();

        const sectorAngle: number = 2 * Math.PI / this.wheel.categories.length;
        let sectorCount: number = 0;
        
        this.wheel.categories.forEach(category => {
            if (this.wheelComponent) {
                this.wheelComponent.world.addFigure(new WcWheelSector(new WcPointF(500, 500), this.settings.calcAngle(sectorCount, sectorAngle), this.settings.calcAngle(sectorCount + 1, sectorAngle), category, palette.getColor(sectorCount), this.settings));
                sectorCount++;
            }
        });

    }
}

export default WheelGraph
