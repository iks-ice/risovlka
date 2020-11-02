export default class Shape {
    constructor({startX, startY, color, alpha, lineWidth}) {
        this.startX = startX;
        this.startY = startY;
        this.color = color;
        this.alpha = alpha;
        this.lineWidth = lineWidth;
        // this.isDrawn = false;
    }
    // _setDrawn() {
    //     setTimeout(() => this.isDrawn = true, 1000);
    //     this.isDrawn = true
    // }
    _setEndPoint(x, y) {
        this.endX = x;
        this.endY = y;
    }
    _setColor(ctx, color = this.color) {
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
    }
    _setAlpha(ctx, alpha = this.alpha) {
        ctx.globalAlpha = alpha;
    }
    setSelected(val) {
        this.selected = val;
    }
    _drawLine = (ctx, from, to) => {
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.closePath();
        ctx.stroke();
    }
    setColor(color) {
        this.color = color;
    }
    _setLineWidth(ctx) {
        ctx.lineWidth = this.lineWidth;
    }
}