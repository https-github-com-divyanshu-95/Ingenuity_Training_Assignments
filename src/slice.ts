import { Graphics, DEG_TO_RAD, Text, Container } from "pixi.js";
//extends sir's Graphics lecture
export class Slice extends Graphics{
    constructor(
        count: number,
        radius: number,
        sliceDegree: number, 
        sliceColor: number,
        points: string, 
    ){
        super();

        const g = new Graphics();
        g.beginFill(sliceColor);
        g.lineStyle(5, 0xffffff, 1)
        g.moveTo(0, 0);
        g.arc(0, 0, radius, DEG_TO_RAD * (270 + count * sliceDegree), DEG_TO_RAD * (270 + (count + 1) * sliceDegree));
        g.closePath()
        g.endFill()

        var text = new Text(points, {
            align: "left"
        })
        text.pivot.set(-90, 15)
        text.rotation = DEG_TO_RAD * (270 + count * sliceDegree + sliceDegree / 2);
        
        this.addChild(g, text)
    }
}