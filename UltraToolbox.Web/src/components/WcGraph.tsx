import * as React from "react"
import { WcRect } from "../wcgraph/WcRect";
import { WcWorld } from "../wcgraph/WcWorld";
import { WcPointF } from "../wcgraph/WcPointF";
import { CanvasRenderer } from "../wcgraph/CanvasRenderer";
import { WcRectangle } from "../wcgraph/WcRectangle";
import { IRect } from "../wcgraph/IRect";
import { Rect } from "../wcgraph/Rect";
import { Point } from "../wcgraph/Point";
import { WcView } from "../wcgraph/WcView";
import { WcNormalCoordinateSystem } from "../wcgraph/WcNormalCoordinateSystem";
import { IDevice } from "../wcgraph/IDevice";
import { Font } from "../wcgraph/Font";
import { Brush } from "../wcgraph/Brush";
import { Pen } from "../wcgraph/Pen";


type WcGraphProps = {
    width: number;
    height: number;
}

class WcGraph extends React.Component<WcGraphProps> implements IDevice {
    public world: WcWorld;
    public view: WcView;

    canvasRef: React.RefObject<HTMLCanvasElement>;

    constructor(props: WcGraphProps) {
        super(props);


        this.viewport = new Rect(new Point(0, 0), new Point(props.width, props.height))

        const worldBoundary = new WcRect(new WcPointF(0, 0), new WcPointF(300, 300));

        this.world = new WcWorld(worldBoundary);

        this.view = new WcView(this.world, worldBoundary, new WcNormalCoordinateSystem(worldBoundary, this.viewport), this);

        this.canvasRef = React.createRef<HTMLCanvasElement>();

        this.world.addFigure(new WcRectangle(new WcRect(new WcPointF(50, 50), new WcPointF(250, 200)), new Brush('#333333'), new Pen('#555555', 1)));
    }

    measureText(_text: string, _font: Font): IRect {
        throw new Error("Method not implemented.");
    }

    viewport: IRect;


    render() {
        return (<>
            <button onClick={this.draw}>Draw</button>
            <h2>Canvas comes here!</h2>
            <canvas id="wcgraph" ref={this.canvasRef} width={this.props.width} height={this.props.height} onClick={this.handleClick} onMouseMove={this.handleMouseMove}></canvas>
        </>);
    }

    handleClick = (): void => {
        window.requestAnimationFrame(this.draw);
    }

    handleMouseMove= (_args: any): void => {
    }

    invalidate(): void {
        window.requestAnimationFrame(this.draw);
    }

    draw = (): void => {
        const canvas = this.canvasRef.current; // document.getElementById("wcgraph") as HTMLCanvasElement;

        if (canvas) {
            const renderer = new CanvasRenderer(canvas as HTMLCanvasElement);

            this.world.draw(renderer, this.view);
        }
    }
}
//function WcGraph() {
 
//    return (
//        <>
//            <canvas id="wcgraph" width="300" height="300"></canvas>
//        </>
//    )
//}

export default WcGraph
