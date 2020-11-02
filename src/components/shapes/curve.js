import Shape from "./shape.js";
export default class Curve extends Shape {
    constructor({startX, startY,color, alpha, lineWidth}) {
        super({startX, startY, color, alpha, lineWidth});
        this.coord = [{x: startX, y: startY}];
        this._setEndPoint(startX, startY);
    }
    draw(ctx, x, y) {
        this._setColor(ctx);
        this._setAlpha(ctx);
        this.coord.push({x, y});
        this._drawLine(ctx, {x: this.endX, y: this.endY}, {x, y});
        this._setEndPoint(x, y);
    }
    restore(ctx) {
        let i = 0;
        this._setColor(ctx);
        this._setAlpha(ctx);
        while (i < this.coord.length - 1) {
            const startX = this.coord[i].x;
            const startY = this.coord[i].y;
            const endX = this.coord[i+1].x;
            const endY = this.coord[i+1].y;
            this._drawLine(ctx, {x: startX, y: startY}, {x: endX, y: endY});
            i++;
        }
    }
}