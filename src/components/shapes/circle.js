import Shape from "./shape.js";
export default class Circle extends Shape {
    constructor({startX, startY, color, alpha}) {
        super({startX, startY, color, alpha});
    }
    draw(ctx, x, y) {
        this._setColor(ctx);
        this._setAlpha(ctx);
        ctx.beginPath();
        const xComp = x-this.startX;
        const yComp = y-this.startY;
        const xCenter = this.startX + xComp / 2;
        const yCenter = this.startY + yComp / 2;
        const radius = Math.sqrt(Math.pow(xComp, 2) + Math.pow(yComp, 2))/2;
        ctx.arc(xCenter, yCenter, radius, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.stroke();
        this._setEndPoint(x, y);
    }
    restore(ctx) {
        this.draw(ctx, this.endX, this.endY);
    }
}