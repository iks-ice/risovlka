import Line from "./line.js";
export default class Rectangle {
    constructor({startX, startY, color, alpha, lineWidth}) {
        this.line = new Line({startX, startY, color, alpha, lineWidth});
    }
    draw(ctx, x, y) {
        this.line._setColor(ctx);
        this.line._setAlpha(ctx);
        this.line._setEndPoint(x, y);
        this.line._drawLine(ctx, {x: this.line.startX, y: this.line.startY}, {x, y: this.line.startY});
        this.line._drawLine(ctx, {x: this.line.startX, y: this.line.startY}, {x: this.line.startX, y});
        this.line._drawLine(ctx, {x: this.line.startX, y}, {x, y});
        this.line._drawLine(ctx, {x, y: this.line.startY}, {x, y});
    }
    restore(ctx) {
        this.draw(ctx, this.line.endX, this.line.endY);
    }
}